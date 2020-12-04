import React, { Component } from 'react';
import './App.css';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelNumber: 0,
      editable: false,
      token: "",
      currentProperty: {property: "Test", foo: "123", bar: "456"},
      toggle: false,
      userData: {},
      tableData: [{property: "Test", foo: "123", bar: "456"}]
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(nextProp){
    this.setState({currentProperty: nextProp.currentProperty});
  }

  componentWillMount(){
    this.setState({currentProperty: this.props.currentProperty});
    if(this.props.currentProperty.username == ""){
      this.setState({editable: true})
    }
  }

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
        {this.state.editable ?
        <input name="username" onChange={this.handleInput} value={this.state.currentProperty.username}/>
        :
        <input disabled name="username" onChange={this.handleInput} value={this.state.currentProperty.username}/>
        }
        <p>Password</p>
        <input type="password" name="password" onChange={this.handleInput} value={this.state.currentProperty.password}/>
        <br/><br/><br/>
        <select value={this.state.currentProperty.role} onChange={this.handleSelectChange}>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
        <br/><br/><br/>
        <button className="midnight-blue-flat-button" onClick={() => this.props.save(this.state.currentProperty)}>Save User</button>
        </div>

      </div>
    );
  }
}

export default Edit;
