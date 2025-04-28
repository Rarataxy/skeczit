const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");

function generateName(){
  const adjectives = ["cute", "sussy", "gorgeous", "twisted", "broken", "smelly", "ugly", "wild", "fluffy", "shiny", "sweet", "creepy", "evil", "angry", "dirty", "sleepy", "bizarre", "weird", "messy", "hot", "cold", "grumpy", "soft", "hard", "stinky", "friendly", "lazy", "smooth", "rough", "bright", "dark", "sad", "happy", "funny", "flaky", "crazy", "clumsy", "dumb", "lazy", "sharp", "naughty", "fancy", "bad", "good", "cute", "serene", "smiling", "shy", "graceful", "cheerful", "shiny", "crystal", "mysterious", "innocent", "mellow", "beautiful", "serious", "awkward", "awkward", "bold", "confident", "fragile", "creepy", "gloomy", "fiery", "angelic", "demonic", "silly", "rich", "poor", "silent", "graceful", "hectic", "reckless", "heroic", "bubbly", "eccentric", "decayed", "twinkling", "cute", "dim", "reliable", "dangerous", "turbulent", "brilliant", "radiant", "hot", "sticky", "friendly", "irritating", "disastrous", "clean", "leaky", "creepy", "tender", "fluffy", "incredible", "intense", "clean", "warm", "soothing", "aggressive", "beautiful", "bitter", "refreshing", "toxic", "feisty", "spicy", "outgoing", "unstable", "sophisticated", "perfect", "nasty", "charming", "fashionable", "slimy"];
  const nouns = ["baka", "kitten", "fairy", "demon", "angel", "dragon", "ninja", "robot", "zombie", "vampire", "wizard", "unicorn", "puppy", "kitty", "prince", "princess", "witch", "vampire", "goblin", "troll", "elf", "pirate", "werewolf", "ghost", "sorcerer", "warrior", "mage", "soldier", "detective", "champion", "assassin", "spirit", "phoenix", "sprite", "mermaid", "cyclops", "cyclone", "monster", "cat", "dog", "cloud", "star", "moon", "sun", "fire", "water", "earth", "air", "chaos", "peace", "love", "hate", "fear", "hope", "power", "light", "darkness", "flame", "heart", "soul", "mind", "sword", "shield", "axe", "bow", "spear", "gun", "knife", "staff", "orb", "potion", "elixir", "spell", "curse", "portal", "battle", "arena", "dojo", "temple", "lair", "cave", "forest", "desert", "island", "mountain", "ocean", "lake", "river", "field", "meadow", "village", "town", "city", "castle", "palace", "kingdom", "empire", "throne", "trophy", "shield", "medal", "badge", "helmet", "armor", "glove", "boot", "sword", "map", "compass", "book", "tome", "scroll", "letter", "coin", "token", "treasure", "gem", "diamond", "ruby", "emerald", "pearl", "gold", "silver", "bronze", "platinum", "iron", "wood", "stone", "metal", "crystal", "dust", "sand", "snow", "rain", "wind", "cloud", "wave", "beach", "leaf", "flower", "tree", "bush", "vine", "forest", "boulder", "rock", "stone", "root"];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 99)

  return randomAdjective + randomNoun + randomNumber;
}

const createUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || 'default-avatar.png',
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
})

const showUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({username: req.params.username});
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    const user_safe = {
        username: user.username,
        avatar: user.avatar
    }
    res.json(user_safe);
})

const guestLogin = asyncHandler(async (req, res, next) => {
  const username = generateName();
  const user_safe = {
    "isGuest": true,
    "username": username
  }
  res.json(user_safe);
})

const loginUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'Bad email' });
  }

  const samePassword = await bcrypt.compare(password, user.password);

  if (samePassword) {
    const user_safe = {
      username: user.username,
      avatar: user.avatar
    }
    return res.json(user_safe);
  }
  return res.status(403).json({ msg: 'Bad credentials.'})
})

module.exports = {
    createUser,
    showUserDetails,
    guestLogin,
    loginUser
};