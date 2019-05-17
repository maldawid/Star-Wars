import React, { Component } from "react";
import MoviesSingle from "../../views/Movies/MoviesSingle";
import loader from "../../assets/images/LOADER.svg";
import { connect } from "react-redux";
import styles from "./Movies.module.scss";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitleArray: [],
      movieTitleAdded: [],
      planets: [],
      movieTitleStorage: [],
      planetsStorage: [],
      isDelete: false
    };
  }

  componentDidMount() {
    this.fetchData();
    this.checkLocalStorage();

    window.addEventListener("beforeunload", this.saveToLocalStorage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.state.movieTitle !== prevProps.state.movieTitle) {
      var movieTitleAdded = this.props.state.movieTitle;
      var planets = this.props.state.planets;

      if (this.state.isDelete === false) {
        this.setState(prevState => ({
          movieTitleAdded: [
            ...this.state.movieTitleStorage,
            ...movieTitleAdded
          ],
          planets: [...this.state.planetsStorage, ...planets]
        }));
      }
      if (this.state.isDelete === true) {
        var lastAddedMovie = [];
        var lastAddedPlanets = [];
        lastAddedMovie = [movieTitleAdded[movieTitleAdded.length - 1]];
        lastAddedPlanets = [planets[planets.length - 1]];

        this.setState(prevState => ({
          movieTitleAdded: [...prevState.movieTitleAdded, lastAddedMovie],
          planets: [...prevState.planets, lastAddedPlanets]
        }));
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveToLocalStorage
    );
  }

  saveToLocalStorage = () => {
    localStorage.setItem("selectedPlanets", JSON.stringify(this.state.planets));
    localStorage.setItem("title", JSON.stringify(this.state.movieTitleAdded));
  }

  checkLocalStorage() {
    if (localStorage.getItem("selectedPlanets") !== null) {
      var selectedPlanetsStorage = localStorage.getItem("selectedPlanets");
      var titleStorage = localStorage.getItem("title");

      selectedPlanetsStorage = JSON.parse(selectedPlanetsStorage);
      titleStorage = JSON.parse(titleStorage);

      this.setState({
        movieTitleAdded: titleStorage,
        planets: selectedPlanetsStorage,
        movieTitleStorage: titleStorage,
        planetsStorage: selectedPlanetsStorage
      });
    }
  }

  fetchData() {
    fetch("https://swapi.co/api/films/")
      .then(res => res.json())
      .then(json =>
        this.setState({
          movieTitleArray: json,
          isLoaded: true
        })
      );
  }

  deleteMovies = event => {
    event.preventDefault();

    this.setState({
      movieTitleAdded: [],
      planets: [],
      movieTitleStorage: [],
      planetsStorage: [],
      isDelete: true
    });
  };

  render() {
    var { movieTitleArray, isLoaded, movieTitleAdded, planets } = this.state;

    if (!isLoaded) {
      return (
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      );
    } else {
      if (movieTitleAdded.length > 0) {
        var addedMovies = [];

        movieTitleAdded.map(
          (item, id) =>
            (addedMovies[id] = { movieTitle: item, planets: planets[id] })
        );
      }

      return (
        <>
          {movieTitleArray.results.map((item, id) => (
            <MoviesSingle
              key={id}
              title={item.title}
              id={id}
              planets={item.planets}
            />
          ))}
          {movieTitleAdded.length > 0 &&
            addedMovies.map((item, id) => (
              <MoviesSingle
                key={`added${id}`}
                title={item.movieTitle}
                id={id}
                planets={item.planets}
              />
            ))}
          {movieTitleAdded.length > 0 && (
            <div className={`${grid.row} ${grid["justify-content-center"]}`}>
              {" "}
              <button
                className={`${styles.deleteMovies} ${grid["col-auto"]} `}
                onClick={this.deleteMovies}
              >
                {" "}
                Delete added movies{" "}
              </button>
            </div>
          )}
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(Movies);
