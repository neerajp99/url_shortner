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

  clearLocal = event => {
    event.preventDefault();
    this.setState({
      listOfUrl: ""
    });
    localStorage.removeItem("shortUrl");
    window.location.reload();
  };

  render() {
    return (
      <div className="landing row">
        <hr className="homeHr" />
        <div className="col-md-6 landing-text">
          <h4 className="landing-text-h4">
            Links that makes your url simpler.
          </h4>

          <br />
          <div className="urlForm">
            <form onSubmit={this.onSubmit}>
              <InputFieldGroup
                placeholder="Shorten your link"
                name="initialUrl"
                value={this.state.initialUrl}
                onChange={this.onChange}
              />
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button onClick={this.clearLocal} className="submit-button">
                {" "}
                Clear{" "}
              </button>
            </form>
          </div>
          <br />
          <br />
        </div>
        {this.state.listOfUrl.length > 0 && (
          <div className="url-display">
            {this.state.listOfUrl &&
              this.state.listOfUrl.map(url => (
                <div
                  className="url-list-div"
                  key={this.state.listOfUrl.indexOf(url)}
                >
                  <ul className="url-list">
                    <li>
                      <h5 className="text-muted url-initial">{url[2]}</h5>
                    </li>
                    <li>
                      <h3 className="url-new">{url[0]}</h3>
                    </li>
                    <li>
                      <CopyToClipboard
                        text={url[0]}
                        onCopy={() => this.setState({ copied: true })}
                      >
                        <button
                          onClick={this.copyToClipboard}
                          className="copy-button"
                        >
                          {" "}
                          Copy{" "}
                        </button>
                      </CopyToClipboard>
                    </li>
                    <li>
                      <button
                        className="open-button"
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
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Homepage;
