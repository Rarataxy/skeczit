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


module.exports = {
    createRoom
};