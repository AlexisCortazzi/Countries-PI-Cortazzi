import React from "react";
import s from "./Paginado.module.css"
import { useSelector } from "react-redux";

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pages = Math.ceil(allCountries/countriesPerPage)
    const pageNumbers = []

    const currentPage = useSelector((state) => state.currentPage);

    for (let i=1; i <= pages; i++){
        pageNumbers.push(i)
    }

    return(
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
    )

}

