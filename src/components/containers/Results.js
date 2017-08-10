import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchResults, storeTerm, storeSearchedTerm }  from '../../data/modules/searchResults'
import ResultsHeadline from '../presentational/ResultsHeadline'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import { parseQueryString } from '../../data/utils'
import ReactSVG from 'react-svg'
import './Results.css';
import loader from '../../images/loader.svg'

const showLoader = isFetching => (isFetching && <Flexbox flexBasis="100%" justifyContent="center"><ReactSVG path={loader} /></Flexbox>)

const showResults = (results, isFetching) => (!isFetching && (
  <Flexbox maxWidth="100%" flexWrap="wrap" justifyContent="center">
      {results.map((result, idx) => (
        <Flexbox key={result.id} order={idx}>
          <Product product={result} />
        </Flexbox>
      ))}
  </Flexbox>
))

class ResultsContainer extends Component {

  componentDidMount() {
    // set searchedTerm and fetch results at page load
    const queries = parseQueryString(this.props.history.location.search);
    let term = queries['q'];

    if (term) {
      term = term.split(',')
      this.props.fetchResults(term)
    }
  }

  componentWillReceiveProps(nextProps) {
    // set searchedTerm and fetch results at form submission
    if (this.props.searchedTerm !== nextProps.searchedTerm) {
      this.props.fetchResults(nextProps.searchedTerm)
    }
  }

  render() {
    const {term, storeTerm, searchedTerm, results, fetchResults} = this.props

    return (
      <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">
        <ResultsHeadline type="results" term={this.props.searchedTerm} />
        { showLoader(this.props.isFetching) }
        { showResults(this.props.results, this.props.isFetching) }
      </Flexbox>
    )
  }
}

ResultsContainer.propTypes = {
  term : PropTypes.array.isRequired,
  searchedTerm : PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term,
    searchedTerm: state.searchResults.searchedTerm,
    results: state.searchResults.results,
    isFetching: state.searchResults.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: term => {
      dispatch(fetchResults(term))
    },
    storeTerm: term => {
      dispatch(storeTerm(term))
    },
    storeSearchedTerm: term => {
      dispatch(storeSearchedTerm(term))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
