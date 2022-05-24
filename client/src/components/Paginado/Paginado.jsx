import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

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
        </nav>
    )

}

