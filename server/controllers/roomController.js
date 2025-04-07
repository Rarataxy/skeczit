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

const leaveRoom = asyncHandler(async (req, res, next) => {
    const { room_id } = req.params;
    const { player } = req.body;

    const room = await Room.findOne({ roomId: room_id });

    if (!room) {
      return res.status(404).send('Room not found');
    }

    const playerIndex = room.players.indexOf(player);
    if (playerIndex === -1) {
      return res.status(400).send('Player not in room');
    }

    room.players.splice(playerIndex, 1);
    room.currentPlayers--;
    await room.save();
    res.send(`Player ${player} left room ${room_id}`);
})

const startGame = asyncHandler(async (req, res, next) => {
    const { room_id } = req.params;

    const room = await Room.findOne({ roomId: room_id });

    if (!room) {
      return res.status(404).send('Room not found');
    }

    if (room.currentPlayers < 2) {
      return res.status(400).send('Not enough players to start the game');
    }

    room.currentRound = 1;
    await room.save();
    res.send(`Game started in room ${room_id}`);
})

const nextRound = asyncHandler(async (req, res, next) => {
    const { room_id } = req.params;
    const room = await Room.findOne({ roomId: room_id });

    if (!room) {
      return res.status(404).send('Room not found');
    }

    if (room.currentRound === 0) {
      return res.status(400).send('Game has not started yet');
    }

    if (room.currentRound >= room.maxRounds) {
      return res.status(400).send('Maximum rounds reached'); //TODO
    }

    room.currentRound++;
    await room.save();
    res.send(`Round ${room.currentRound} started in room ${room_id}`);
})

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    nextRound
};