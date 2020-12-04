import React, { Component } from 'react';
import './App.css';

class ChangePassword extends Component {
  render() {
    return (
      <div className="App">
      <br/>
        <h1 style={{fontFamily: "Libre Franklin", fontSize: "60px", fontWeight: "900"}}>SUBADRA</h1>

        <div className="loginBox">
        <p>Old Password</p>
        <input type="password" value={this.props.oldPassword} onChange={this.props.handleOldPassword}/>
        <p>New Password</p>
        <input type="password" value={this.props.newPassword} onChange={this.props.handleNewPassword}/>
        <br/><br/><br/>
        <button className="midnight-blue-flat-button" onClick={this.props.changePassword}>Change Password</button>
        </div>

      </div>
    );
  }
}

export default ChangePassword;
