import React, { Component } from "react";
import { connect } from "react-redux";

import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";
import styles from "./AddMovieForm.module.scss";

import AddMovieTitleWarning from "../../views/AddMovie/AddMovieTitleWarning";
import AddMovieSearchPlanet from "./AddMovieSearchPlanet";

import { addMovieTitle } from "../../actions/AddMovieTitle";
import { addPlanets } from "../../actions/AddPlanets";
import { bindActionCreators } from "redux";

import { debounce } from "lodash";


class AddMovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPlanetResult: [],
      isLoaded: true,
      planetSearchField: [],
      selectedPlanetsUrl: [],
      selectedPlanetsName: [],
      selectedPlanetsAll: [],
      warningCapitalLetterVisible: false,
      warningColor: "#555555",
      submitButtonColor: "#E0E6EE",
      submitButton: false
    };

    this.searchInput = React.createRef();
    this.timeout = 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.planetSearchField === "update") {
      this.setState({
        planetSearchField: []
      });
    }
  }

  titleChange = (event) => {
    var movieTitleChange = event.target.value;

    if (movieTitleChange.length > 0) {
      if (
        movieTitleChange[0] === movieTitleChange[0].toLowerCase() ||
        movieTitleChange.length < 3
      ) {
        this.setState({
          warningCapitalLetterVisible: true,
          warningColor: "#FF1616",
          submitButtonColor: "#E0E6EE",
          submitButton: false
        });
      }
      if (
        movieTitleChange[0] === movieTitleChange[0].toUpperCase() &&
        movieTitleChange.length > 2
      ) {
        this.setState({
          warningCapitalLetterVisible: false,
          warningColor: "#555555",
          submitButtonColor: "#1BA1BE",
          submitButton: true
        });
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.submitButton === true) {
      var movieTitle = event.target[0].value;
      this.props.addMovieTitle(movieTitle);
      this.props.addPlanetsUrl(this.state.selectedPlanetsUrl);

      this.setState({
        selectedPlanetsUrl: [],
        selectedPlanetsAll: []
      });
      event.target[0].value = "";
    }
  };

  addPlanetSearch = debounce((text) => {
    var searchFieldValue = text;
    this.setState({ planetSearchField: searchFieldValue });
  }, 500);


  selectedPlanet = (event) => {
    var newSelectedPlanetsUrl = event.target.value;
    var newSelectedPlanetName = event.target.name;
    var selectedPlanetsAll = [];

    selectedPlanetsAll = {
      selectedPlanetsName: newSelectedPlanetName,
      selectedPlanetsUrl: newSelectedPlanetsUrl
    };

    this.setState(prevState => ({
      selectedPlanetsUrl: [
        ...prevState.selectedPlanetsUrl,
        newSelectedPlanetsUrl
      ],
      selectedPlanetsName: [
        ...prevState.selectedPlanetsName,
        newSelectedPlanetName
      ],
      selectedPlanetsAll: [...prevState.selectedPlanetsAll, selectedPlanetsAll],
      planetSearchField: "update"
    }));

    this.searchInput.current.value = "";
  };

  removeSelectedPlanets = (event) => {
    event.preventDefault();

    var removePlanetUrl = event.target.value;
    var selectedPlanetsUrl = this.state.selectedPlanetsUrl;
    var selectedPlanetsAll = this.state.selectedPlanetsAll;

    const selectedPlanetsUrlUpdated = selectedPlanetsUrl.filter(item => item !== removePlanetUrl)
    const selectedPlanetsAllUpdated = selectedPlanetsAll.filter(item => item.selectedPlanetsUrl !== removePlanetUrl)

    this.setState({
      selectedPlanetsAll: selectedPlanetsAllUpdated,
      selectedPlanetsUrl: selectedPlanetsUrlUpdated
    });
  };

  componentWillUnmount() {
    this.addPlanetSearch.cancel();
  }


  render() {
    var {
      warningColor,
      warningCapitalLetterVisible,
      selectedPlanetsAll,
      planetSearchField,
      value,
      name,
      submitButtonColor
    } = this.state;

    return (
      <form
        className={`${styles.form} ${grid.container}  `}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <label
          className={`label2 ${styles.form__label} ${grid.row} ${
            grid["no-gutters"]
          }`}
          style={{ color: warningColor }}
        >
          Movie title:{" "}
        </label>

        <input
          className={`movieTitle ${styles.form__text} ${grid.row} ${
            grid["no-gutters"]
          }`}
          placeholder="Please enter the tittle of the movie"
          name="movieTitle"
          onChange={this.titleChange}
        />

        {warningCapitalLetterVisible && <AddMovieTitleWarning />}

        {selectedPlanetsAll.length > 0 &&
          selectedPlanetsAll.map((item, id) => (
            <div className={`${styles.selectedPlanet}`}>
              {item.selectedPlanetsName}
              <button
                className={` ${grid["col-auto"]} ${styles["form__button--x"]} `}
                onClick={this.removeSelectedPlanets}
                value={item.selectedPlanetsUrl}
              >
                x
              </button>
            </div>
          ))}

        <label
          className={`${styles.form__label} ${grid.row} ${grid["no-gutters"]}`}
        >
          Add Planet:{" "}
        </label>

        <input
          className={`${styles.form__text} ${grid.row} ${grid["no-gutters"]}`}
          placeholder="Search for the planet in database"
          onChange={event => this.addPlanetSearch(event.target.value)}
          name="addPlanet"
          ref={this.searchInput}
        />


         { (planetSearchField.length > 0) && <AddMovieSearchPlanet
          planetSearchField={planetSearchField}
          selectedPlanet={this.selectedPlanet}
          value={value}
          name={name}
        />}

        <div
          className={`${grid.row} ${grid["justify-content-end"]} ${
            grid["d-flex"]
          }`}
        >
          <button
            className={`${styles.form__button} ${grid["col-auto"]} `}
            style={{ background: submitButtonColor }}
            type="submit"
          >
            ADD MOVIE
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    movieTitle: state.movieTitle,
    planets: state.planets
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      addMovieTitle: addMovieTitle,
      addPlanetsUrl: addPlanets
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMovieForm);
