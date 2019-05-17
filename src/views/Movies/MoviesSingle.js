import React from "react";
import ArrowButton from "../../components/Buttons/Arrow";
import styles from "./MoviesSingle.module.scss";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";

const MoviesSingle = ({ title, id, planets }) => {
  return (
    <li className={styles.title} key={id}>
      <div
        className={`${grid.row} ${grid["no-gutters"]} ${grid[""]} ${
          grid["d-flex"]
        } ${grid["flex-row"]} ${grid["align-items-center"]} `}
      >
        <h2 className={`${styles.title__h2} ${grid["col-11"]}   `}>{title} </h2>
        <ArrowButton planets={planets} />
      </div>
    </li>
  );
};

export default MoviesSingle;
