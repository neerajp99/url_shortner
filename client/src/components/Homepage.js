import React, { Component } from "react";
import InputFieldGroup from "./commons/InputFieldGroup";
import axios from "axios";

class Homepage extends Component {
  state = {
    baseUrl: "https://localhost",
    initialUrl: "",
    shortUrl: "",
    newUrl: "",
    updatedAt: "",
    createdAt: "",
    listOfUrl: []
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
        this.setState({
          shortUrl: res.data.shortUrl,
          listOfUrl: [...this.state.listOfUrl, res.data.shortUrl],
          newUrl: res.data.newUrl,
          updatedAt: res.data.updatedAt,
          createdAt: res.data.createdAt
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    const urls = JSON.stringify(this.state.listOfUrl);
    localStorage.setItem("shortUrl", urls);
  }
  componentDidMount = () => {
    const jsonData = localStorage.getItem("shortUrl");
    const jsonParse = JSON.parse(jsonData);
    if (jsonData) {
      this.setState({
        listOfUrl: jsonParse
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="landing row">
          <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit}>
              <InputFieldGroup
                placeholder="Shorten your link"
                name="initialUrl"
                value={this.state.initialUrl}
                onChange={this.onChange}
              />
              <input type="submit" className="btn btn-info " />
            </form>
          </div>
          <br />
          <div className="col-md-8">
            <div className="col-md-4">
              {this.state.list && (
                <h3 className="text-sm-left text-muted">
                  {this.state.listUrl.map(url => ({ url }))}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
