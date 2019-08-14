import React, { Component } from "react";
import InputFieldGroup from "./commons/InputFieldGroup";

class Homepage extends Component {
  state = {
    baseUrl: "localhost",
    initialUrl: "",
    shortUrl: "",
    newurl: "",
    updatedAt: "",
    createdAt: ""
  };

  onChange = event => {
    [event.target.name] = event.target.value;
  };
  
  render() {
    return (
      <div className="container">
        <div className="landing row">
          <div className="col-md-12 text-center">
            <InputFieldGroup
              placeholder="Shorten your link"
              name="initialUrl"
              value={this.state.initialUrl}
              onChange={this.onChange}
            />
            <button></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
