import React, { Component } from 'react';
import Movies from '../../components/Movies/Movies';
import AddMovie from '../../views/AddMovie/AddMovie';
import Footer from '../Footer/Footer';

import logo from '../../assets/images/LOGO.svg';
import '../../assets/global-styles/style.scss';
import grid from '../../assets/global-styles/bootstrap-grid.min.module.css';
import styles from './App.module.scss';


class App extends Component {
  render() {
    return (
      <div className={`${grid.container} ${styles.container}  ${grid['flex-sm-row']} ${grid['flex-row']} `}>
        <div className={`${styles.logo} ${grid['flex-sm-row']} ${grid['flex-row']} ${grid['row']} ${grid['justify-content-center']} `}>
          <img src={logo} alt="logo"></img>
        </div>
        <Movies />

        <svg width="100%" height="2" viewBox="0 0 790 2" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="8.74228e-08" y1="1" x2="790" y2="1.00007" stroke="white" strokeWidth="2" strokeDasharray="16 8"/></svg>

        <AddMovie />
        <Footer />

     </div>
    );
  }
}

export default App;
