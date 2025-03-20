# Blockbuster connections demo

## Setup
* check the JavaScript file in 'js/code.js'
* change the GAME_ENTRY_CODE value for your game to a string you want users to type to unlock your game
* change the GAME_ID to a string which identifies your game
* send this info (unlock code and game id) to Tjerk

## Using it
* In this example you'll see two steps. One is entering a code to unlock the game. The second one is sending a message to our system so Tjerk can trigger a new email.
* In the 'onGameFinishClicked' you'll see the code that sends the message. This is the important part :)