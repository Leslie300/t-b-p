import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../containers/Search'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './HomePage.css'


class HomePage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
            <Search />
            <USP />
        </Flexbox>

        {/* <Results /> */}
        <Footer />
      </Flexbox>
    )
  }
}

export default HomePage;