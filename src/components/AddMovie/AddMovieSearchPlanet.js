import React, { Component } from "react";
import styles from "./AddMovieSearchPlanet.module.scss";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";

class AddMovieSearchPlanet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetSearch: props.planetSearchField,
      searchPlanetResult: [],
      searchPlanetResultLoaded: false
    };
    this.mounted = false;
    this.controller = new AbortController()
    this.signal = this.controller.signal

  }

  componentDidMount() {
    this.mounted = true;
    this.fetchDataPlanet(this.props.planetSearchField);

  }

  componentDidUpdate(prevProps) {

    if (
      this.props.planetSearchField !== prevProps.planetSearchField &&
      !this.props.planetSearchField.length
      ) {
        this.setState({
          planetSearch: '',
          searchPlanetResult: []
        });
      }

    if (
      this.props.planetSearchField !== prevProps.planetSearchField &&
      this.props.planetSearchField.length > 0
    ) {
      this.setState({
        planetSearch: this.props.planetSearchField,
        searchPlanetResult: [],
        searchPlanetResultLoaded: false
      });

      this.fetchDataPlanet(this.props.planetSearchField);

    }

  }

  fetchDataPlanet(searchPlanethandle) {

    if (searchPlanethandle) {

      var fetchLink =
        "https://swapi.co/api/planets/?search=" + searchPlanethandle;
      var numberOfPlanets = 0;

      fetch(fetchLink)
        .then(res => res.json())
        .then(json => {
          numberOfPlanets = json.count;
          var iteration = Math.ceil(numberOfPlanets / 10);

          if (iteration === 0) {
            this.setState({
              searchPlanetResultLoaded: true,
            })
          }

          for (let i = 1; i <= iteration; i++) {
            var newfetchLink =
              `https://swapi.co/api/planets/?page=${i}&search=` +
              searchPlanethandle;
            fetch(newfetchLink)
              .then(res => res.json())
              .then(json => {
                json.results.forEach(item => {
                  if (
                    item.name
                      .toLowerCase()
                      .indexOf(searchPlanethandle.toLowerCase()) === 0
                  ) {
                      return this.mounted && this.setState(prevState => ({
                      searchPlanetResult: [
                        ...prevState.searchPlanetResult,
                        item
                      ],
                      searchPlanetResultLoaded: true
                    }));
                  }
                });
              })
          }
        })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    var { searchPlanetResult, searchPlanetResultLoaded, planetSearch } = this.state;

    if (searchPlanetResultLoaded === false ) {
      return (
        <>
          <div className={`${styles.listPlanet} ${styles.searching} ${grid.row} ${grid["d-flex"]}`}>
            Searching...
          </div>
        </>
      )
    }

    if (searchPlanetResult.length > 0 ) {
      return (
        <>
          <div className={`${styles.listPlanet} ${grid.row} ${grid["d-flex"]}`}>
            {searchPlanetResult.map((item, id) => {
              return (
                <li className={`${grid["col-12"]}`}>
                  <button
                    className={styles.SearchPlanet}
                    onClick={this.props.selectedPlanet}
                    value={item.url}
                    name={item.name}
                    alt={item.name}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </div>
        </>
      );
    }

    if (planetSearch === "update") {
      return (
        <>
        </>
      )
    }

    if (searchPlanetResultLoaded && searchPlanetResult.length === 0 && planetSearch !== "update" ) {
      return (
        <>
          <div className={`${styles.listPlanet} ${styles.warning} ${grid.row} ${grid["d-flex"]}`}>
            There is no such planet in the SWAPI database.
          </div>
        </>
      )
    }

  }

}

export default AddMovieSearchPlanet;
