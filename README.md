# Cut-Up

A nodejs app that creates poetry 'cut-ups' by visiting fairly random websites and cutting snippets of text.
This repo contains both client and server folders. 
The server opens a websocket waiting for client connections. It processes creation of text snippets to send back to the client.
The client is a simple browser page that accepts snippet messages from the server and appends them to the Cutup poem displayed on the page.

## Run this app
1. Clone this repo
2. Start the websocket server with `node server/server.js` (from project root folder).
3. Open the client in browser either by 'open with <browser of choice>' or using something like vscode live server.
4. Click 'start' to set a new cutup going. Click stop to finish it. Click Start again to create a new one
5. Watch your Cut-up get created!
