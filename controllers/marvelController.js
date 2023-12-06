// controladores/marvelController.js
const axios = require('axios');
const marvelUtils = require('../utils/marvelUtils');

const getAllMarvelCharacters = async (req, res) => {
  try {
    const authParams = marvelUtils.getMarvelAuthParams();
    const apiUrl = marvelUtils.getMarvelApiUrl(`characters?nameStartsWith=${req.params.nameWith}`);

    const response = await axios.get(apiUrl, { params: authParams });

    const characters = response.data.data.results.map(character => {
      return {
        id: character.id,
        name: character.name,
      };
    });

    res.json(characters);
  } catch (error) {
    console.error('Error al obtener personajes de Marvel:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const getMarvelCharacter = async (req, res) => {
  try {
    const authParams = marvelUtils.getMarvelAuthParams();
    const apiUrl = marvelUtils.getMarvelApiUrl(`characters/${req.params.id}`);

    const response = await axios.get(apiUrl, { params: authParams });

    const { id, name, description, comics, series } = response.data.data.results[0];

    const comicNames = comics.items.map(comic => comic.name);
    const seriesNames = series.items.map(serie => serie.name);

    //se organiza la data como queremos
    const responseData = {
      id,
      name,
      description,
      comics: comicNames,
      series: seriesNames,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener datos del personaje:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  getAllMarvelCharacters,
  getMarvelCharacter,
};
