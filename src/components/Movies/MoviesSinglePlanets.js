import React, { Component } from "react";
import styles from "./MoviesSinglePlanets.module.scss";
import grid from "../../assets/global-styles/bootstrap-grid.min.module.css";
import loader from "../../assets/images/LOADER.svg";

class MoviesSinglePlanets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: props.planets,
      planetsData: [],
      planetsDataFetch: {
        name: [],
        rotation_period: [],
        orbital_period: [],
        diameter: [],
        climate: [],
        surface_water: [],
        population: []
      },
      arrowSortStatusIncrease: false,
      arrowSortStatusDecrease: false,
      activeSortKey: "",
      width: window.innerWidth,
      isLoaded: false
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.state.planets.map(item => this.fetchDataPlanets(item));
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.setState({
      isLoaded: false
    });
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  fetchDataPlanets(fetchplanet) {
    fetch(fetchplanet)
      .then(res => res.json())
      .then(json => {
        this.setState({
          planetsDataFetch: {
            name: json.name,
            rotation_period: json.rotation_period,
            orbital_period: json.orbital_period,
            diameter: json.diameter,
            climate: json.climate,
            surface_water: json.surface_water,
            population: json.population
          },
          isLoaded: true
        });
        this.setState(prevState => ({
          planetsData: [...prevState.planetsData, this.state.planetsDataFetch]
        }));
      });
  }

  dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      property = property.substr(1);
      sortOrder = -1;
      this.setState(prevState => ({
        arrowSortStatusDecrease: !prevState.arrowSortStatusDecrease
      }));
    } else {
      this.setState(prevState => ({
        arrowSortStatusIncrease: !prevState.arrowSortStatusIncrease
      }));
    }

    if (property[0] === "S") {
      property = property.substr(1);
      return function(a, b) {
        if (sortOrder === -1) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      };
    }

    if (property[0] === "N") {
      property = property.substr(1);
      return function(a, b) {
        if (sortOrder === -1) {
          return b[property] - a[property];
        } else {
          return a[property] - b[property];
        }
      };
    }
  }

  sortPlanetsData = (sortkey) => {
    this.setState(prevState => ({
      planetsData: prevState.planetsData.sort(this.dynamicSort(sortkey)),
      activeSortKey: sortkey
    }));
  }

  render() {
    var { isLoaded } = this.state;

    const { width } = this.state;
    const isMobile = width <= 768;

    if (!isLoaded) {
      return (
        <div className={styles.loader}>
          <img src={loader} alt="Loading..." />
        </div>
      );
    } else {
      var { planetsData, activeSortKey } = this.state;

      const planetsDataName = [
        { name: "Planet Name", sortKey: "Sname" },
        { name: "Rotation period", sortKey: "Nrotation_period" },
        { name: "Orbital period", sortKey: "Norbital_period" },
        { name: "Diameter", sortKey: "Ndiameter" },
        { name: "Climate", sortKey: "Sclimate" },
        { name: "Surface water", sortKey: "Nsurface_water" },
        { name: "Population", sortKey: "Npopulation" }
      ];

      if (isMobile) {
        return (
          <div className={`${styles.planets} ${grid.row} ${grid["flex-row"]} `}>
            {planetsData.map((planeta, id) => {
              return (
                <>
                  <ul className={`${styles.planets__ul} ${grid["col-6"]}  `}>
                    {planetsDataName.map(item => {
                      return (
                        <li
                          className={`${styles.planets__mobile}  ${grid.row} ${
                            grid["no-gutters"]
                          }  ${grid["align-items-start"]} ${
                            grid["justify-content-start"]
                          }`}
                        >
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                  <ul className={`${styles.planets__ul} ${grid["col-6"]}  `}>
                    {Object.entries(planeta).map(item => {
                      return (
                        <>
                          <li
                            className={`${styles.planets__mobile} ${grid.row} ${
                              grid["no-gutters"]
                            } ${grid["col-12"]} ${grid["align-self-start"]} ${
                              grid["justify-content-start"]
                            } ${grid["align-items-center"]} ${
                              grid["text-center"]
                            } `}
                          >
                            {item[1]}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </>
              );
            })}
          </div>
        );
      } else {
        return (
          <div className={`${styles.planets}  `}>
            <ul className={`${styles.planets__ul} ${grid.row} `}>
              {planetsDataName.map((item, id) => {
                return (
                  <li
                    key={`li${id}`}
                    className={`${
                      activeSortKey.replace("-", "") === item.sortKey
                        ? "li__activeSort"
                        : ""
                    } ${styles.planets__sortTitle} ${grid.col} ${grid.row} ${
                      grid["no-gutters"]
                    }  ${grid["align-items-center"]} ${
                      grid["justify-content-center"]
                    }`}
                  >
                    <div
                      key={`name${id}`}
                      className={`${grid["col"]} ${grid["px-1"]} `}
                    >
                      {" "}
                      {item.name}{" "}
                    </div>
                    <div
                      key={`sort${id}`}
                      className={`${styles.planets__sortButton} ${
                        grid["col"]
                      } ${grid["px-1"]}`}
                    >
                      <svg
                        className={`${
                          activeSortKey === item.sortKey
                            ? "li__activeSort"
                            : "li__inActiveSort"
                        } ${grid.row} ${grid["no-gutters"]} `}
                        onClick={ () => this.sortPlanetsData(item.sortKey)}
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 0L0 5.14286H6L3 0Z" fill="#474747" />
                      </svg>
                      <svg
                        className={`${
                          activeSortKey === `-${item.sortKey}`
                            ? "li__activeSort"
                            : "li__inActiveSort"
                        } ${grid.row} ${grid["no-gutters"]}`}
                        onClick={ () => this.sortPlanetsData(`-${item.sortKey}`)}
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6L6 0.857143L8.7024e-07 0.857142L3 6Z"
                          fill="#474747"
                        />
                      </svg>
                    </div>
                  </li>
                );
              })}
            </ul>
            {planetsData.map((planeta, id) => {
              return (
                <ul key={id} className={`${styles.planets__ul} ${grid.row}  `}>
                  {Object.entries(planeta).map((item, id) => {
                    var parameterName = item[0];
                    var parameterValue = item[1];

                    return (
                      <>
                        <li
                          key={id}
                          className={`${
                            activeSortKey.replace("-", "").substr(1) ===
                            parameterName
                              ? "li__activeSort"
                              : ""
                          } ${grid.col} ${grid["no-gutters"]} ${
                            grid["align-self-center"]
                          } ${grid["justify-content-center"]} ${
                            grid["align-items-center"]
                          } ${grid["text-center"]} `}
                        >
                          {parameterValue}
                        </li>
                      </>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        );
      }
    }
  }
}

export default MoviesSinglePlanets;
