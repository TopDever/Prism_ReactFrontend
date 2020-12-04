import React, { Component } from 'react';
import './App.css';

class Login extends Component {


  handleInput(event){
    console.log(event.target.name); // the name of the form element
    console.log(event.target.value); // the value of the form element
    var site = this.state.currentProperty;
    site[event.target.name] = event.target.value;
    this.setState({currentProperty: site})
  }


  render() {
    return (
      <div className="App">
      <br/>
        <h1 style={{fontFamily: "Libre Franklin", fontSize: "60px", fontWeight: "900"}}>SUBADRA</h1>

        <div className="loginBox">
        <p>Username</p>
        <input onChange={this.props.handleUsername} value={this.props.username}/>
        <p>Password</p>
        <input onChange={this.props.handlePassword} value={this.props.password} type="password"/>
        <br/><br/><br/>
        <button className="midnight-blue-flat-button" onClick={this.props.login}>Login</button>
        </div>

      </div>
    );
  }
}

export default Login;
