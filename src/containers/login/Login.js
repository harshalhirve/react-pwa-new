import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../actions/userActions";
import * as cacheActions from "../../actions/cacheActions";
import image1 from "../../assets/images/img1.jpg";

class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "hh@hh.com",
      emailErr: false,
      password: "password1234",
      passwordErr: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.checkQuota();
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      ...(name === "email" && { emailErr: false }),
      ...(name === "password" && { passwordErr: false })
    });
  }

  async validateForm() {
    return new Promise(resolve => {
      this.setState(
        {
          emailErr: this.state.email.trim() === "" ? true : false,
          passwordErr: this.state.password.trim() === "" ? true : false
        },
        () => {
          this.state.emailErr || this.state.passwordErr
            ? resolve(false)
            : resolve(true);
        }
      );
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.props.connection) {
      if (await this.validateForm()) {
        await this.props.validateLogin({
          email: this.state.email,
          password: this.state.password
        });
      }
    }
  }

  render() {
    const { loggedIn, loading, connection, cache } = this.props;
    if (loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard"
          }}
        />
      );
    } else {
      let loadingTr = "";
      if (loading) {
        loadingTr = (
          <tr>
            <td colSpan="2" align="center">
              ...Processing
            </td>
          </tr>
        );
      }
      return (
        <table
          border="0"
          align="center"
          cellPadding="0"
          cellSpacing="0"
          width="100%"
        >
          <tbody>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <form name="form1" onSubmit={this.handleSubmit}>
                  <table
                    border="0"
                    align="center"
                    cellPadding="2"
                    cellSpacing="2"
                    className="dataTable"
                  >
                    <tbody>
                      {!connection && (
                        <tr>
                          <td align="center" colSpan="2" className="offlineMsg">
                            You are offline! Please check your connection.
                          </td>
                        </tr>
                      )}
                      {cache.warning && (
                        <tr>
                          <td align="center" colSpan="2" className="offlineMsg">
                            {cache.message}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan="2" align="center">
                          <img src={image1} width="100" />
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            maxLength="200"
                            className={
                              this.state.emailErr ? "textBoxErr" : "textBox"
                            }
                            onChange={this.handleChange}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Password</td>
                        <td>
                          <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            maxLength="20"
                            className={
                              this.state.emailErr ? "textBoxErr" : "textBox"
                            }
                            onChange={this.handleChange}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" align="center">
                          <input
                            type="submit"
                            value={loading ? "Processing..." : "Login"}
                            className="button"
                            disabled={!connection || loading ? true : false}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
}

function mapStateToProps(state) {
  //console.log("user state = ", state.user);
  return {
    ...state.user,
    cache: state.cache,
    loading: state.loading,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      Object.assign({}, userActions, cacheActions),
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
