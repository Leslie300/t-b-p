import React, { Component } from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import TagAutocomplete from './TagAutocomplete'
import { isDeviceConsideredMobile } from '../../data/utils'
import './SearchForm.css'

const showMobileSearchForm = (props) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap"  flexDirection="column" className="SearchFormContainer">
      <Flexbox flexBasis="100%" className="SearchInputContainer" order={1}>
        <TagAutocomplete
          term={props.term}
          selectedTerms={props.selectedTerms}
          fetchOptions={props.fetchOptions}
          onChange={props.onChange}
        />
      </Flexbox>
      <Flexbox flexBasis="100%" className="SearchButtonContainer" alignSelf="flex-end" order={2}>
        <button className="SearchButton" type="submit">
          <Translate content="search.search" />
        </button>
      </Flexbox>
    </Flexbox>
  )
}

const showDesktopSearchForm = (props) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap">
      <Flexbox flexBasis="100%">
        <Flexbox flexBasis="5%" className="SearchIconContainer">
          <Flexbox flexBasis="100%" alignSelf="center" justifyContent="center">
            <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-search.svg`} />
          </Flexbox>
        </Flexbox>
        <Flexbox flexBasis="75%">
          <TagAutocomplete
            term={props.term}
            selectedTerms={props.selectedTerms}
            fetchOptions={props.fetchOptions}
            onChange={props.onChange}
          />
        </Flexbox>
        <Flexbox flexBasis="20%">
          <button className="SearchButton" type="submit">
            <Translate content="search.search" />
          </button>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  )
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this._handleSumbit = this._handleSumbit.bind(this)
  }

  _handleSumbit(e) {
    e.preventDefault()
    this.props.onSubmit(this.props.term)
  }

  render() {
    return (
      <Flexbox flexBasis="100%">
        <form className="SearchForm" onSubmit={this._handleSumbit}>
          {isDeviceConsideredMobile() ? showMobileSearchForm(this.props) : showDesktopSearchForm(this.props)}
        </form>
      </Flexbox>
    )
  }
}

export default SearchForm;
