const Room = require('../models/Room');
const asyncHandler = require("express-async-handler");

const createRoom = asyncHandler(async (req, res, next) => {
    const { roomId, maxPlayers, maxRounds, password } = req.body;

    const newRoom = new Room({
        roomId,
        maxPlayers,
        maxRounds,
        password
    });

    await newRoom.save();
    res.send("Room created successfully")
})

const joinRoom = asyncHandler(async (req, res, next) => {
    const { room_id } = req.params;
    const { player, password } = req.body;

    const room = await Room.findOne({ roomId: room_id });

    if (!room) {
      return res.status(404).send('Room not found');
    }

    if (room.password && room.password !== password) {
      return res.status(403).send('Incorrect password');
    }

    if (room.currentPlayers >= room.maxPlayers) {
      return res.status(400).send('Room is full');
    }

    room.players.push(player);
    room.currentPlayers++;
    await room.save();
    res.send(`Player ${player} joined room ${room_id}`);
})

module.exports = {
    createRoom,
    joinRoom
};