import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Item from "./Components/Item/Item.component";
import { setMovies } from "./Redux/Action";
import axios from "axios";

const App = () => {
  const movies = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchMovie = () => {
    axios
      .get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${search}`)
      .then((response) => dispatch(setMovies(response.data.data)));
  };
  const handleDelete = (imdbID) => {
    const filtered = movies.filter((movie) => movie.imdbID !== imdbID);
    dispatch(setMovies(filtered));
  };
  // const sortMovie = ({ type, prop }) => {
  //   console.log(type, prop);
  // };
  const sortMovie = ({ type, by }) => {
    let sortedMovies = [...movies];

    sortedMovies.sort(function (a, b) {
      console.log(`${a}.${type}`);
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
    });
    // console.log(sortedMovies);
    dispatch(setMovies(sortedMovies));
  };

  return (
    <div className="App">
      <h1>MOVIE-SELLGO</h1>
      <div className="search-box">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchMovie();
          }}
        >
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Enter Movie Name"
          />
        </form>
      </div>
      <div className="heading">
        <p>
          Title
          <i
            className="fas fa-sort"
            onClick={() => sortMovie({ type: "ASC", by: "Title" })}
          ></i>
        </p>
        <p>
          Year
          <i
            className="fas fa-sort"
            onClick={() => sortMovie({ type: "ASC", by: "Year" })}
          ></i>
        </p>
        <p>
          imdbID
          <i
            className="fas fa-sort"
            onClick={() => sortMovie({ type: "ASC", by: "imdbID" })}
          ></i>
        </p>
        <p></p>
      </div>
      {movies.length
        ? movies.map((movie) => (
            <Item data={movie} key={movie.imdbID} handleDelete={handleDelete} />
          ))
        : null}
    </div>
  );
};

export default App;
