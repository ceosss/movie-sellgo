import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Item from "./Components/Item/Item.component";
import { setMovies } from "./Redux/Action";
import axios from "axios";

import arraySort from "array-sort";

axios.defaults.withCredentials = false;

const App = () => {
  const movies = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ by: "Title", type: true });
  const searchMovie = () => {
    axios
      .get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${search}`)
      .then((response) => dispatch(setMovies(response.data.data)));
  };
  const handleDelete = (imdbID) => {
    const filtered = movies.filter((movie) => movie.imdbID !== imdbID);
    dispatch(setMovies(filtered));
  };
  useEffect(() => {
    function sortMovie() {
      let sortedMovies = [...movies];

      if (sort.type) {
        // ASC
        sortedMovies = arraySort(movies, sort.by);

        dispatch(setMovies(sortedMovies));
      } else {
        // DSC
        sortedMovies = arraySort(movies, sort.by, { reverse: true });

        dispatch(setMovies(sortedMovies));
      }
    }
    sortMovie();
  }, [sort, movies, dispatch]);

  return (
    <div className="App">
      <h1>
        MOVIE <img src={require("./sellgo.png")} alt="sellgo" />
        ELLGO
      </h1>
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
            placeholder="Search Movies Title"
          />
          <button type="submit">
            <i className="fas fa-lg fa-search"></i>
          </button>
        </form>
      </div>
      <div className="heading">
        <p>
          Title
          <i
            className="fas fa-sort"
            onClick={() => setSort({ by: "Title", type: !sort.type })}
          ></i>
        </p>
        <p>
          Year
          <i
            className="fas fa-sort"
            onClick={() => setSort({ by: "Year", type: !sort.type })}
          ></i>
        </p>
        <p>
          imdbID
          <i
            className="fas fa-sort"
            onClick={() => setSort({ by: "imdbID", type: !sort.type })}
          ></i>
        </p>
        <p></p>
      </div>
      <div className="item-div">
        {movies.length
          ? movies.map((movie) => (
              <Item
                data={movie}
                key={movie.imdbID}
                handleDelete={handleDelete}
                className="items"
              />
            ))
          : null}
      </div>
      <footer>
        <h3>
          MADE WITH{" "}
          <span role="img" aria-label="emoji">
            🧡
          </span>{" "}
          by
          <a href="https://github.com/ceosss/" target="blank">
            ceo.sss
          </a>
        </h3>
      </footer>
    </div>
  );
};

export default App;
