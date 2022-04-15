const express = require("express")  , http = require('http');;
const path = require("path")

const app = express()
const server = http.createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/strona")));

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", "Użytkownik " + username + " dołączył do czatu")
    })
    socket.on("exiting", function (username) {
        socket.broadcast.emit("update", "Użytkownik " + username + " opuścił czat")
    })
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message)
    })
})

server.listen(process.env.PORT || 3000, () => console.log("Server działa..."))