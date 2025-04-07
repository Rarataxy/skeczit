const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true
    },
    maxPlayers: {
      type: Number,
      required: true
    },
    currentPlayers: {
      type: Number,
      default: 0
    },
    players: {
      type: [String],
      default: []
    },
    password: {
      type: String,
      default: null
    },
    maxRounds: {
      type: Number,
      required: true
    },
    currentRound: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
