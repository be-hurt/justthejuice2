import React, { Component } from 'react';
import axios from 'axios';
import SignUpForm from './components/SignUpForm';


class SignUpPage extends Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      err: {},
      user_signup: {
        name: '',
        email: '',
        password: ''
      }
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user_signup = this.state.user_signup;
    user_signup[field] = event.target.value;

    this.setState({
      user_signup
    });
  }

  handleSubmit(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();
    let name = this.state.user_signup.name.trim();
    let email = this.state.user_signup.email.trim();
    let password = this.state.user_signup.password.trim();

    if (!name || !email || !password) {
      
      return;
    }
    this.handleUserSubmit({name: name, email: email, password: password});
    this.setState({ user_signup: {name: '', email: '', password: ''}});
    }

  handleUserSubmit(user) {
    axios.post('http://localhost:3001/api/users', user)
      .then(function (response) {
        //success!
        console.log(response);
        this.setState({
          err: {}
        });

        localStorage.setItem('successMessage');
      })
      .catch(function (error) {
        //failure
        console.log(error);
      });
  }

  // Render the component.//
  render() {
    return (
      <SignUpForm
        onSubmit={this.handleSubmit}
        onChange={this.changeUser}
        err={this.state.err}
        user_signup={this.state.user_signup}
      />
    );
  }

}

export default SignUpPage;