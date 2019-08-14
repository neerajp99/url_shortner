import React, { Component } from "react";
import InputFieldGroup from "./commons/InputFieldGroup";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Homepage extends Component {
  state = {
    baseUrl: "https://localhost",
    initialUrl: "",
    shortUrl: "",
    newUrl: "",
    updatedAt: "",
    createdAt: "",
    listOfUrl: [],
    copied: "false"
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
        if (res.data.newUrl) {
          this.setState({
            shortUrl: res.data.shortUrl,
            listOfUrl: [...this.state.listOfUrl, res.data.shortUrl],
            newUrl: res.data.newUrl,
            updatedAt: res.data.updatedAt,
            createdAt: res.data.createdAt
          });
          console.log("works");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    if (this.state.listOfUrl) {
      const urls = JSON.stringify(this.state.listOfUrl);
      localStorage.setItem("shortUrl", urls);
    }
  }
  componentDidMount() {
    const jsonData = localStorage.getItem("shortUrl");
    const jsonParse = JSON.parse(jsonData);
    if (jsonData) {
      this.setState({
        listOfUrl: jsonParse
      });
    }
  }

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
              {this.state.listOfUrl &&
                this.state.listOfUrl.map(url => (
                  <div key={this.state.listOfUrl.indexOf(url)}>
                    <h4>{url}</h4>
                    <CopyToClipboard
                      text={url}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <button onClick={this.copyToClipboard} url={url}>
                        {" "}
                        Copy{" "}
                      </button>
                    </CopyToClipboard>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
