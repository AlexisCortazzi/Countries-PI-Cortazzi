case "FILTER_GAMES":
      let filterGames = state.allGames;
      // console.log(action.payload[0]);
      // console.log(action.payload[1]);
      // console.log(action.payload[2]);
      // console.log(filterGames);
      filterGames =
        action.payload.platform !== "all"
          ? filterGames.filter((game) =>
              game.platforms.includes(action.payload.platform)
            )
          : filterGames;
      // console.log(filterGames);
      filterGames =
        action.payload.genre !== "all"
          ? filterGames.filter((game) =>
              game.genres.includes(action.payload.genre)
            )
          : filterGames;
      // console.log(filterGames);
      filterGames =
        action.payload.source === "all"
          ? filterGames
          : action.payload.source === "api"
          ? filterGames.filter((g) => !g.createdInDb)
          : filterGames.filter((g) => g.createdInDb);

      return {
        ...state,
        games: filterGames.length === 0 ? ["empty"] : filterGames,
      };

      import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGenres,
  setFirstMount,
  getPlatforms,
  setCurrentPage,
  filterGames,
  order,
} from "../actions";

import Cards from "./Cards";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games);
  const allGames = useSelector((state) => state.allGames);
  const firstMount = useSelector((state) => state.firstMount);
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [orden, setOrden] = useState("");
  const [filter, setFilter] = useState({
    platform: "all",
    genre: "all",
    source: "all",
  });

  useEffect(() => {
    async function func() {
      if (firstMount) {
        dispatch(setCurrentPage(1));
        dispatch(setFirstMount(false));
        dispatch(getGenres());
        await dispatch(getGames(allGames));
        dispatch(getPlatforms());
      } else {
        dispatch(filterGames(filter));
      }
    }
    func();
  }, [dispatch, filter]);

  function handleFilter(e) {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    dispatch(setCurrentPage(1));
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(order(["name", e.target.value]));
    dispatch(setCurrentPage(1));
    setOrden(`Order by name: ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(order(["rating", e.target.value]));
    dispatch(setCurrentPage(1));
    setOrden(`Order by rating: ${e.target.value}`);
  }

  return (
    <div>
      <NavBar />
      <div className={s.main}>
        <div className={s.order_filter_search}>
          <div className={s.filter}>
            <h2>FILTER</h2>
            <div>
              <p>Platforms</p>
              <select
                onChange={(e) => handleFilter(e)}
                name="platform"
                disabled={games.length === 0 ? true : false}
              >
                <option value="all">All</option>
                {allPlatforms?.map((p, i) => (
                  <option value={p} key={i}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Genre</p>
              <select
                onChange={(e) => handleFilter(e)}
                name="genre"
                disabled={games.length === 0 ? true : false}
              >
                <option value="all">All</option>
                {allGenres?.map((g, i) => (
                  <option value={g} key={i}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Source</p>
              <select
                onChange={(e) => handleFilter(e)}
                name="source"
                disabled={games.length === 0 ? true : false}
              >
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="created">CREATED</option>
              </select>
            </div>
          </div>

          <div className={s.order}>
            <h2>ORDER</h2>
            <div>
              <p>Order by name</p>
              <select
                onChange={(e) => handleSortName(e)}
                defaultValue="-"
                disabled={games.length === 0 ? true : false}
              >
                <option disabled>-</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>

            <div>
              <p>Order by rating</p>
              <select
                onChange={(e) => handleSortRating(e)}
                defaultValue="-"
                disabled={games.length === 0 ? true : false}
              >
                <option disabled>-</option>
                <option value="asc">Asc</option>
                <option value="desc">Des</option>
              </select>
            </div>
            {<p>{orden}</p>}
          </div>

          <div className={s.search}>
            <h2>SEARCH</h2>
            <SearchBar />
          </div>
        </div>

        <div className={s.gameList}>
          <Cards />
        </div>
      </div>
    </div>
  );
}

return (
    <nav>
      <h3>Pages</h3>
      <ul>
        <div className={s.paginado}>
          {currentPage - 1 > 0 ? (
            <p
              onClick={() => paginado(currentPage - 1)}
              className={s.next_previous}
            >
              previous
            </p>
          ) : null}
          {pageNumbers &&
            pageNumbers.map((number, i) => (
              <li className="number" key={i}>
                {number === currentPage ? (
                  <button
                    onClick={() => paginado(number)}
                    className={s.current}
                  >
                    {number}
                  </button>
                ) : (
                  <button onClick={() => paginado(number)}>{number}</button>
                )}
              </li>
            ))}
          {pages > currentPage ? (
            <p
              onClick={() => paginado(currentPage + 1)}
              className={s.next_previous}
            >
              next
            </p>
          ) : null}
        </div>
      </ul>
    </nav>
  );
}

import React from "react";
import { useSelector } from "react-redux";

import s from "./Paginado.module.css";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
  const pages = Math.ceil(allGames / gamesPerPage);
  const pageNumbers = [];

  const currentPage = useSelector((state) => state.currentPage);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <h3>Pages</h3>
      <ul>
        <div className={s.paginado}>
          {currentPage - 1 > 0 ? (
            <p
              onClick={() => paginado(currentPage - 1)}
              className={s.next_previous}
            >
              previous
            </p>
          ) : null}
          {pageNumbers &&
            pageNumbers.map((number, i) => (
              <li className="number" key={i}>
                {number === currentPage ? (
                  <button
                    onClick={() => paginado(number)}
                    className={s.current}
                  >
                    {number}
                  </button>
                ) : (
                  <button onClick={() => paginado(number)}>{number}</button>
                )}
              </li>
            ))}
          {pages > currentPage ? (
            <p
              onClick={() => paginado(currentPage + 1)}
              className={s.next_previous}
            >
              next
            </p>
          ) : null}
        </div>
      </ul>
    </nav>
  );
}

import React from "react";
import styles from "./Paginado.module.css"
import { useSelector } from "react-redux";

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    const currentPage = useSelector((state) => state.currentPage);

    for (let i=0; i < Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav className={styles.nav}>
            
            <ul className={styles.paginado}>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li className={styles.numero} key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
            <button onClick={() => paginado(currentPage +1)}>Next</button>
        </nav>
    )

}