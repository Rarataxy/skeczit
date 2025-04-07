const express = require('express');
const router = express.Router();

router.get("/rooms", (req, res) => {
    res.send('List of rooms\nblah\blah\blah\n>;v');
})

router.post("/rooms/create", (req, res) => {
    res.send('Room created c;');
})

router.post("/rooms/:room_id/join", (req, res) => {
    res.send('Join a room >.<');
})

router.post("/rooms/:room_id/leave", (req, res) => {
    res.send('Left a room ;C');
})

router.post("/rooms/:room_id/start", (req, res) => {
    res.send('Game started!!!');
})

router.get("/rooms/:room_id/status", (req, res) => {
    res.send('Room status :|');
})

router.post("/rooms/:room_id/next_round", (req, res) => {
    res.send('The furure is now old man');
})

router.post("/rooms/:room_id/end_game", (req, res) => {
    res.send('Game OVER');
})

module.exports = router;