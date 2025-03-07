const URL='//localhost:5000/api/accounts';
let currentUser;

const routes = {
  '/login': { templateId: 'login', title:"Login"},
  '/dashboard': { templateId: 'dashboard', title:"Dashboard",init: refresh, onShow:()=>console.log("Dashboard is shown") },
  '/credits':{templateId: 'credits',title:"Credits"}
};

function showCredits(){
  navigate('/credits');
}

function backToDashboard(){
  navigate('/dashboard');
}

let state = Object.freeze({
  account: null
});
const storageKey = 'savedAccount';

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];
    if (!route) {
    return navigate('/login');
  }
  document.title = route.title;
  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view);

  if (typeof route.init === 'function') {
    route.init();
  }

}


function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
}


  
// Take the data from registration form and creates a new account
async function register() {
  const registerForm = document.getElementById('registerForm');
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);
  const result = await createAccount(jsonData);
  if (result.error) {
    return updateElement('registerError', result.error);
  }
  currentUser = data.user;
  console.log('Account created!', result);
  updateState('account', result);
  navigate('/dashboard');
  console.log("Dashboard is shown")
}

// To add a transaction
async function addTransactions(event){
  console.log(`${currentUser}`)
  const content = document.getElementById('content');
  const contentFormData = new FormData(content);
  const transactionData = Object.fromEntries(contentFormData);
  const transactionJsonData = JSON.stringify(transactionData);
  event.preventDefault();
  const apiURL=`${URL}/${currentUser}/transactions`;
  const result = await sendRequest(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: transactionJsonData
  });

  if (!result.error) {
    await refresh();
  }

  return result;
}


async function sendRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
}


// Sends a POST request to create a new account
async function createAccount(account) {
  return sendRequest(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: account
  });
}

//Retrieves account data
async function getAccount(user) {
  return sendRequest(`${URL}/${user}`);
}


window.onpopstate = () => updateRoute();
updateRoute();

async function login() {
  const loginForm = document.getElementById('loginForm')
  const user = loginForm.user.value;
  currentUser=user;
  const data = await getAccount(user);
  
  if (data.error) 
  {
    return updateElement('loginError', data.error);
  }
    
  updateState('account', data);
  navigate('/dashboard');
  console.log('Dashboard is shown');
}

  
function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  element.textContent = '';
  element.append(textOrNode);
  }


function updateDashboard() {
  const account = state.account;
  if (!account) {
    return logout();
  }
  updateElement('showuser',currentUser)
  updateElement('description', account.description);
  updateElement('balance', account.balance.toFixed(2));
  updateElement('currency', account.currency);
  const transactionsRows = document.createDocumentFragment();
  for (const transaction of account.transactions) 
  {
    const transactionRow = createTransactionRow(transaction);
    transactionsRows.appendChild(transactionRow);
  }
  updateElement('transactions', transactionsRows); 
}

function createTransactionRow(transaction) {
  const template = document.getElementById('transaction');
  const transactionRow = template.content.cloneNode(true);
  const tr = transactionRow.querySelector('tr');
  tr.children[0].textContent = transaction.date;
  tr.children[1].textContent = transaction.object;
  tr.children[2].textContent = transaction.amount.toFixed(2);
  return transactionRow;
}

function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData
    });
  if (property === 'account' && newData)
  {
    localStorage.setItem(storageKey, JSON.stringify({ user: newData.user }));
  } else if (property === 'account' && !newData) 
    {
      localStorage.removeItem(storageKey);
    }
}
function logout() {
  updateState('account', null);
  currentUser=null;
  navigate('/login');
}

function init() {
  const savedAccount = localStorage.getItem(storageKey);
  if (savedAccount) {
    const { user } = JSON.parse(savedAccount);
    currentUser = user;
    updateAccountData(); // Fetch fresh account data from the server
  }
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();


async function updateAccountData() {
  const account = state.account;
  if (!account) 
  {
    return logout();
  }
  
  const data = await getAccount(account.user);
  if (data.error) {
    return logout();
  }
  
  updateState('account', data);
}

async function refresh() {
  await updateAccountData();
  updateDashboard();
}


// To open and close the 'Add Transactions' dialogue
const transactionBox = document.getElementById("tbox");
const transactionButton = document.getElementById("tbutton");
const span = document.getElementById("close");
function openBox() {
  transactionBox.style.display = "block";
}
function closeBox(){
  transactionBox.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == transactionBox) {
    transactionBox.style.display = "none";
  }
}



