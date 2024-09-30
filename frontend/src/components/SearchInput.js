import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", this.state.query); 
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className="search-input">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchInput;
