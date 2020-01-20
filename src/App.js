import React, { useState, useEffect } from "react";
import Beers from "./components/Beers";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [beername, setBeername] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [beersPerPage] = useState(15);

  const onKeyPress = e => {
    // if enter key pressed, do the search
    if (e.which === 13) {
      searchHandler(e);
    }
  };

  const fetchBeers = async bname => {
    setLoading(true);
    console.log("fetching Beers");
    const res = await axios.get(
      `http://localhost:8000/api/beers/?bname=${beername}`
    );
    setBeers(res.data);
    setLoading(false);
  };

  const searchHandler = e => {
    e.preventDefault();
    fetchBeers();
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  // Get current beers
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = beers.slice(indexOfFirstBeer, indexOfLastBeer);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Beers</h1>
      <div>
        <label htmlFor="beername">Search for Beer:</label>
        <input
          onChange={e => setBeername(e.target.value)}
          value={beername}
          name="beername"
          onKeyPress={onKeyPress}
          type="text"
          className="beername"
        />
        <button onClick={searchHandler}>Search</button>
      </div>

      <Beers beers={currentBeers} loading={loading} beername={beername} />
      <Pagination
        beersPerPage={beersPerPage}
        totalBeers={beers.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
