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
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/url/url", {
        initialUrl: this.state.initialUrl,
        baseUrl: this.state.baseUrl
      })
      .then(res => {
        if (res.data.newUrl) {
          this.setState({
            shortUrl: res.data.shortUrl,
            listOfUrl: [
              ...this.state.listOfUrl,
              [res.data.shortUrl, res.data.newUrl, res.data.initialUrl]
            ],
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

  openLink = event => {
    event.preventDefault();
    axios.get();
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
              {this.state.listOfUrl &&
                this.state.listOfUrl.map(url => (
                  <div key={this.state.listOfUrl.indexOf(url)}>
                    <h5 className="text-muted">{url[2]}</h5>
                    <h4>{url[0]}</h4>
                    <CopyToClipboard
                      text={url[0]}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <button onClick={this.copyToClipboard}> Copy </button>
                    </CopyToClipboard>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        axios
                          .get(`/api/url/url/${url[1]}`)
                          .then(data => {
                            console.log(data.data.data.initialUrl);
                            // window.location.href = data.data.data.initialUrl;
                            window.open(data.data.data.initialUrl, "_blank");
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      }}
                    >
                      Open
                    </button>
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
