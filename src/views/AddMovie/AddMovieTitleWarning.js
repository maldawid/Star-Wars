import React from "react";
import styles from "./AddMovieTitleWarning.module.scss";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";

const AddMovieTitleWarning = () => {
  return (
    <div
      className={`${styles.warningCapitalLetter} ${grid.row} ${
        grid["no-gutters"]
      }`}
    >
      Movie tittle name must start with a capital letter and have at least 3
      letters
    </div>
  );
};

export default AddMovieTitleWarning;
