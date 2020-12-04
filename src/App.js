import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main.js'
import Login from './Login.js'
import Edit from './Edit.js'
import ManageUsers from './ManageUsers'
import ChangePassword from './ChangePassword'
import EditUser from './EditUser'

const serverURL = "http://82.152.61.33:6001";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelNumber: 0,
      token: "",
      currentProperty: "",
      toggle: false,
      myAccount: {role: null},
      userData: {},
      username: "",
      password: "",
      role: "",
      oldPassword: "",
      newPassword: "",
      selectedUser: {},
      tableData: [{property: "Test", foo: "123", bar: "456"}]
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.editProperty = this.editProperty.bind(this);
    this.editUser = this.editUser.bind(this);
    this.getList = this.getList.bind(this);
    this.switchToTab = this.switchToTab.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleSelectChange(event){
    var user = this.state.selectedUser;
    user.role = event.target.value;
    this.setState({selectedUser: user})
  }

  handleUsername(event){
    this.setState({username: event.target.value})
  }

  handlePassword(event){
    this.setState({password: event.target.value})
  }

  handleOldPassword(event){
    this.setState({oldPassword: event.target.value})
  }


  handleNewPassword(event){
    this.setState({newPassword: event.target.value})
  }

  componentWillMount(){
    console.log(localStorage.getItem('session'))
    if(localStorage.getItem('session') != null){
      this.verifySession(localStorage.getItem('session') );
    }

  }

  getList(){
    fetch(serverURL + '/getList/',
    {
      method: 'get',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
    .then(data => {
      console.log("data" + data)
      this.setState({tableData: data})
    }).catch(function(err) {


    });
  }

  getUserList(){
    fetch(serverURL + '/getUsers/',
    {
      method: 'get',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
    .then(data => {
      console.log("data" + data)
      this.setState({userData: data})
    }).catch(function(err) {


    });
  }



  verifySession(session){
    fetch(serverURL + '/verifySession/',
    {
      method: 'post',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "session": session
    })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.username){
        this.setState({panelNumber: 1, myAccount: data});
      }
      this.getList();
      this.getUserList();
    }).catch(function(err) {


    });
  }

  login(){
    console.log("Loggingin")
    fetch(serverURL + '/login/',
    {
      method: 'post',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password
    })
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({panelNumber: 1, myAccount: data});
      localStorage.setItem('session', data.session);
      this.getList();
      this.getUserList();
    }).catch(function(err) {
      console.log(err)

    });
  //  this.setState({panelNumber: 1})
    // setter
//localStorage.setItem('myData', data);

// getter
/*
localStorage.getItem('myData');
this.getList();
this.getUserList();*/

  }

  logout(){
    this.setState({panelNumber: 0, token: null});
    localStorage.setItem('session', null);
  }

  editProperty(val){
    if(val.Start_Date)
    val.Start_Date = val.Start_Date.split("T")[0];
    this.setState({panelNumber: 2, currentProperty: val})
  }

  editUser(val){
    //val.password = "";
    this.setState({panelNumber: 5, selectedUser: val})
  }

  save(vals){
    fetch(serverURL + '/addItem/',
    {
      method: 'post',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "session": localStorage.getItem('session'),
        "data": vals
    })
    }).then(response => response.json())
    .then(data => {
      this.setState({panelNumber: 1});
      this.getList();
    }).catch(function(err) {


    });
  }

  saveUser(vals){
    console.log(vals)
    fetch(serverURL + '/register/',
    {
      method: 'post',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "session": localStorage.getItem('session'),
        "data": vals
    })
    }).then(response => response.json())
    .then(data => {
      this.setState({panelNumber: 3});
      this.getUserList();
    }).catch(function(err) {


    });
  }

  changePassword(vals){
    fetch(serverURL + '/setPass/',
    {
      method: 'post',
      //mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "session": this.state.myAccount.session,
        "password": this.state.oldPassword,
        "newPassword": this.state.newPassword
    })
    }).then(response => response.json())
    .then(data => {
      this.setState({panelNumber: 1});
      this.getList();
    }).catch(function(err) {


    });
  }

  toggleMenu(){
    var x = !this.state.toggle;
    this.setState({toggle: x})
  }

  switchToTab(val){
    this.setState({panelNumber: val})
  }


  render() {

    const panels = [
      <Login login={this.login} handleUsername={this.handleUsername} handlePassword={this.handlePassword} username={this.state.username} password={this.state.password}/>,
      <Main tableData={this.state.tableData} editProperty={this.editProperty}/>,
      <Edit currentProperty={this.state.currentProperty} save={this.save} tableData={this.state.tableData}/>,
      <ManageUsers tableData={this.state.userData} editUser={this.editUser}/>,
      <ChangePassword changePassword={this.changePassword} handleOldPassword={this.handleOldPassword} handleNewPassword={this.handleNewPassword} oldPassword={this.state.oldPassword} newPassword={this.state.newPassword}/>,
      <EditUser currentProperty={this.state.selectedUser} save={this.saveUser} handleSelectChange={this.handleSelectChange}/>
    ]
    return (
      <div className="App">
      <div style={{top: "0px", right: "0px", position: "absolute", display: (this.state.myAccount.role != null ? null : "none")}}>
      <div class={"burger " + (this.state.toggle == true ? "change" : null)} onClick={this.toggleMenu.bind(this)}>
       <div class="bar1"></div>
       <div class="bar2"></div>
       <div class="bar3"></div>
      </div>
      <br/><br/><br/>
      {this.state.toggle == true ?
        <div>
        <ul>
        <li onClick={() => this.switchToTab(4)}>Change Password</li>
        <li onClick={() => this.switchToTab(1)}>Manage Properties</li>
        {this.state.myAccount.role == "Admin" ? <li onClick={() => this.switchToTab(3)}>Manage Users</li> : null}
        <li onClick={this.logout}>Logout</li>
        </ul>
        </div> :
        <div></div>}
      </div>
        {panels[this.state.panelNumber]}

      </div>
    );
  }
}

export default App;
