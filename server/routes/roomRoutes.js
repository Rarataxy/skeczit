const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get("/", (req, res) => {
    res.send('List of rooms\nblah\blah\blah\n>;v');
})

router.post("/create", roomController.createRoom);

router.post("/:room_id/join", (req, res) => {
    res.send('Join a room >.<');
})

router.post("/:room_id/leave", (req, res) => {
    res.send('Left a room ;C');
})

router.post("/:room_id/start", (req, res) => {
    res.send('Game started!!!');
})

router.get("/:room_id/status", (req, res) => {
    res.send('Room status :|');
})

router.post("/:room_id/next_round", (req, res) => {
    res.send('The furure is now old man');
})

router.post("/:room_id/end_game", (req, res) => {
    res.send('Game OVER');
})

module.exports = router;