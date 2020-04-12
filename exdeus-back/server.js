let app = require('express')();
var httpServer;


var devPort = 2020;
var port = process.env.PORT || devPort;



let http = require('http');
httpServer = http.Server(app);
let io = require('socket.io')(httpServer, { pingTimeout: 15000 });
const ONE_MINUTE = 60000;

var connectedPlayers = [];
var ongoingGames = [];

PLAYERSTATE = {
    MENU:1,
    LOBBY: 2,
    INGAME:3
}

class Player {
    constructor(socket, id) {
        this.socket = socket;
        this.id = id;
        this.name = "Unknown player " + id;
        this.game = null;
    }
}

io.on("connection", socket => {
    console.log("New player connected!");
    let id;
    id = Math.floor(Math.random()*Math.pow(2, 31));
    let player = new Player(socket, id);

    socket.on("rename", function (name) {
        console.log(player.name + " changes their name to " + name);
        player.name = name;
    })
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
httpServer.listen(port, function () {
    console.log(`The Ex Deus Game room is open on port ${port}`);
});

app.get("/api/connections", function (req, res) {
    res.send("Diagnosing!");
});