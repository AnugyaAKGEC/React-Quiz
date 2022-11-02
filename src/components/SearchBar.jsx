import React from "react";
import { Form, FormControl } from "react-bootstrap";

class SearchBar extends React.Component {
  render() {
    return (
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search for question..."
          className="mr-sm-2"
          onChange={this.props.onSearch}
        />
      </Form>
    );
  }
}

export default SearchBar;
