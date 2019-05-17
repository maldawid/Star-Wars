import React, { Component } from "react";
import arrowClose from "../../assets/images/ARROW CLOSE.svg";
import arrowOpen from "../../assets/images/ARROW OPEN.svg";
import MoviesSinglePlanets from "../Movies/MoviesSinglePlanets";
import AddMovieForm from "../AddMovie/AddMovieForm";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";

class ArrowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      planets: props.planets
    };
  }

  clickButton = () => {
    this.setState(state => ({ visible: !state.visible }));
  }

  render() {
    var { planets, visible } = this.state;

    if (planets === "addmovie") {
      return (
        <>
          <input
            width="18px"
            height="18px"
            className={`  ${grid["col-1"]} `}
            onClick={this.clickButton}
            type="image"
            src={visible ? arrowClose : arrowOpen}
            alt="Expand/Fold"
          />
          {visible && <AddMovieForm />}
        </>
      );
    } else {
      return (
        <>
          <input
            width="18px"
            height="18px"
            onClick={this.clickButton}
            type="image"
            className={`  ${grid["col-1"]} `}
            src={visible ? arrowClose : arrowOpen}
            alt="Expand/Fold"
          />
          {visible && <MoviesSinglePlanets planets={planets} />}
        </>
      );
    }
  }
}

export default ArrowButton;
