import React from "react";

const Beers = ({ beers, loading, beername }) => {
  if (loading) {
    return <h3 className="loading">Loading Beers...</h3>;
  }
  if (!beers.length) {
    return <h3 className="nobeer">No Beers found with name: {beername}...</h3>;
  }
  return (
    <ul className="list-group mb-4">
      {beers.map(beer => (
        <li key={beer.id} className="list-group-item">
          <label>{beer.id}</label> <span className="name">{beer.name}</span>
          <span className="info">
            <span className="abv">Abv: {beer.abv}</span>
            <span className="volume">
              Volume: {beer.volume.value} {beer.volume.unit}
            </span>
            <span className="ingredients">
              Ingredients: {beer.ingredientsList.join(", ")}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Beers;
