# CutUps

A nodejs app that creates poetry 'cutups' by visiting fairly random websites and cutting snippets of text.
This repo contains both client and server folders. 
The server opens a websocket waiting for client connections. It processes creation of snippets to send back to the client.
The client is a simple browser page that accepts snippet messages from the server and appends them to the Cutup poem on the page.

## Run this app
Clone this repo
start the websocket server with `node server/server.js` (from project root folder).
Open the client in browser either by 'open with <browser of choice>' or using something like vscode live server.
Watch your Cutup get created!
