const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get("/", (req, res) => {
    res.send('List of rooms\nblah\blah\blah\n>;v');
})

router.post("/create", roomController.createRoom);

router.post("/:room_id/join", roomController.joinRoom)

router.post("/:room_id/leave", roomController.leaveRoom)

router.post("/:room_id/start", roomController.startGame)

router.get("/:room_id", roomController.getRoomStatus)

router.post("/:room_id/next_round", roomController.nextRound)

router.post("/:room_id/end_game", roomController.endGame)

module.exports = router;