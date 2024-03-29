# Cut-Up

A nodejs app that creates poetry 'cut-ups' by visiting fairly random websites and cutting snippets of text.
(A url created from up to 10 random letters and a tld extension selected from the 12 most popular - e.g. xyzabc.ua or google.com)
This repo contains both client and server folders.
The server opens a websocket waiting for client connections. It processes creation of text snippets to send back to the client.
The client is a simple browser page that accepts snippet messages from the server and appends them to the Cutup poem displayed on the page.

## Run this app

1. Clone this repo
2. You'll need a fairly recent node version installed.
3. Run `npm i` in the server folder to install its node modules (only uses 'ws' package currently)
4. Start the websocket server with `node server/server.js` (from project root folder).
5. Open the client in browser either by 'open with (yourbrowser of choice)' or using something like vscode live server.
6. Click 'start' to set a new cutup going. Click stop to finish it. Click Start again to create a new one
7. Watch your Cut-ups get created!

## Improvements

* Currently the client sends the just made cut-up back to the websocket server when the stop button is clicked and connection severed. These could easily be stored in a persistent database and a second browser page created to display historical cut-ups, with the main cut-up stream page altered to only display the current creation.
* The snippet of text from a site will usually be text only, but will sometimes offer up a surprise like a whole page of css. This could be more tightly controlled.
* It seems like the vast majority of pages are advertisements that the domain is for sale - particularly when pinging very random addresses. In the spirit of randomness perhaps this is ok, but it does make repetitive poetry. Maybe there is a way to tighten this as well.
