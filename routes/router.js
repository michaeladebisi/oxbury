"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/api/beers/", (req, res) => {
  const page = req.query.page || 1;
  const per_page = req.query.per_page || 15;
  const bname = req.query.bname || null;
  let url = `https://api.punkapi.com/v2/beers`;
  url = bname !== null ? (url += `?bname=${bname}`) : url;
  let beers = [];

  const fetchBeers = async () => {
    console.log("running fetchBeers");
    const axBeers = await axios.get(url);
    if (axBeers.status === 200 && axBeers.data && axBeers.data.length) {
      axBeers.data.map(beer => {
        beers.push({
          id: beer.id,
          name: beer.name,
          abv: beer.abv,
          volume: beer.volume,
          ingredientsList: Object.keys(beer.ingredients)
          //ingredients: beer.ingredients
        });
      });
    }
  };
  // call the fetchBeers fuction
  fetchBeers()
    .then(() => {
      if (beers.length) {
        // do search here
        if (bname) {
          beers = beers.filter(b => {
            return b.name.toLowerCase() == bname.toLowerCase();
          });
        }
        res.status(200).json(beers);
      }
    })
    .catch(err => {
      console.log("Error", err);
    });
});

module.exports = router;
