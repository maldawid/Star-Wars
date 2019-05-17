import React from "react";
import ArrowButton from "../../components/Buttons/Arrow";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";
import styles from "./AddMovie.module.scss";

const AddMovie = () => {
  return (
    <li className={styles.title} key="addMovie">
      <div
        className={`${grid.row} ${grid["no-gutters"]} ${grid[""]} ${
          grid["d-flex"]
        } ${grid["flex-row"]} ${grid["align-items-center"]} `}
      >
        <h2 className={`${styles.title__h2} ${grid["col-11"]}   `}>
          {" "}
          Add movie{" "}
        </h2>

        <ArrowButton planets={"addmovie"} />
      </div>
    </li>
  );
};

export default AddMovie;
