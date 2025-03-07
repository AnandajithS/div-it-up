# Challenge

* 1. Disabled the `input` event listener using `removeEventListener`and when the button is clicked, it is added again using `addEventListener`

* 2. The textbox is disabled when the game ends using the `disabled` property which is set to `true`.

* 3. First, I created a `div` in index.html to display the modal box. The modal box is not displayed when we start as the `display` property in CSS is set to `none`. After we complete the game, the modal box will popup as the `display` property is changed to `block` and will show you the congratulatory message.

* 4. The high score is stored and retrieved using id `highScore`. We us `localstorage.getItem` method for it.

# Assignment

For my assignment, I made a quiz game. A question will be displayed on the screen and you have to answer it within the specified time. If you answer it incorrectly or fail to answer it within the time limit, the game will end. The questions are displayed randomly by generating an index and then pushing it to the `usedQuestions` array. When generating an index, it will make sure that the index is not in usedQuetions. When length of the `usedQuestions` becomes equal to the length of `questions` array (where our questions and answers are stored), the game will end and the modal box will pop up, congradulating you.



