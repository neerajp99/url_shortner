import React, { Component } from "react";
import InputFieldGroup from "./commons/InputFieldGroup";
import axios from "axios";

class Homepage extends Component {
  state = {
    baseUrl: "https://localhost",
    initialUrl: "",
    shortUrl: "",
    newurl: "",
    updatedAt: "",
    createdAt: ""
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.initialUrl);
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/url/url", {
        initialUrl: this.state.initialUrl,
        baseUrl: this.state.baseUrl
      })
      .then(res => {
        console.log(res.data.newUrl);
      })
      .catch(error => {
        console.log(error);
      });
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
            <button onClick={this.onSubmit}> Submit </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
