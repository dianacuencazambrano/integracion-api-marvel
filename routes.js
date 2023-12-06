const express = require('express');
const marvelController = require('./controllers/marvelController');

const router = express.Router();

// Todos los personajes
router.get('/marvel/characters/:nameWith', marvelController.getAllMarvelCharacters);

// Personaje por ID
router.get('/marvel/character/:id', marvelController.getMarvelCharacter);

module.exports = router;
