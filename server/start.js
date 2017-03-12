'use strict'; // eslint-disable-line semi

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const PrettyError = require('pretty-error')
const finalHandler = require('finalhandler')
// PrettyError docs: https://www.npmjs.com/package/pretty-error

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP')
const app = express()


let players = [];

if (!pkg.isProduction && !pkg.isTesting) {
    // Logging middleware (dev only)
    app.use(require('volleyball'))
}

// Pretty error prints errors all pretty.
const prettyError = new PrettyError();

// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles();

// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express');


module.exports = app
// Session middleware - compared to express-session (which is what's used in the Auther workshop), cookie-session stores sessions in a cookie, rather than some other type of session store.
// Cookie-session docs: https://www.npmjs.com/package/cookie-session

    // Body parsing middleware
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())


    // Serve static files from ../public
    .use(express.static(resolve(__dirname, '..', 'public')))


    // Send index.html for anything else.
    .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

    // Error middleware interceptor, delegates to same handler Express uses.
    // https://github.com/expressjs/express/blob/master/lib/application.js#L162
    // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172
    .use((err, req, res, next) => {
        console.error(prettyError.render(err))
        finalHandler(req, res)(err)
    })

const server = app.listen(
    process.env.PORT || 1337,
    () => {
        console.log(`--- Started HTTP Server for ${pkg.name} ---`)
        const {address, port} = server.address()
        const host = address === '::' ? 'localhost' : address
        const urlSafeHost = host.includes(':') ? `[${host}]` : host
        console.log(`Listening on http://${urlSafeHost}:${port}`)
    }
)


const io = require('socket.io')(server);

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
     This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);


    socket.on('disconnect', function () {
        console.log("A client has left :'(");
    });

    socket.on('add', function(player){
        players.push(player);
        io.emit('addPlayer', players);
    })

    socket.on('updateLastRoll', function(num){
        io.emit('playerRoll', {roll:num});
    })

    socket.on('endTurn', function(player){
        let nextPlayerIndex = (player.index + 1) % players.length;
        let lastPlayerIndex = player.index;
        io.emit('endTurn', {nextPlayerIndex, lastPlayerIndex});
    })

    socket.on('start', function(client){
        let firstPlayer = players.sort(function(a, b){return b.initialRoll-a.initialRoll})[0];
        io.emit('startingPlayer', firstPlayer);
    })

    socket.on('playerBuyEstablishment', function(playerBuyObj){
        io.emit('playerBuy', playerBuyObj);
    })

    socket.on('playerReceive', function(playerAmountsToChange){
        io.emit('playerReceiveMoney', {playerAmountsToChange});
    })


});
