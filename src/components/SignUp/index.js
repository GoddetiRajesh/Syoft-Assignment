import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class SignUp extends Component {
  state = {
    firstname: '',
    password: '',
    email: '',
    phoneNo: '',
    required: '',
  }

  updateFirstname = event => {
    this.setState({firstname: event.target.value})
  }

  updateEmail = event => {
    this.setState({email: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updatePhoneNo = event => {
    this.setState({phoneNo: event.target.value})
  }

  formValidations = () => {
    const {firstname, email, password, phoneNo} = this.state

    if (firstname === '' || email === '' || password === '' || phoneNo === '') {
      this.setState({required: true})
    } else {
      this.setState({required: false})
    }
  }

  onSubmitForm = async event => {
    await this.formValidations()
    event.preventDefault()
    const {required, email, phoneNo, firstname, password} = this.state
    // console.log(required)
    if (
      required === false &&
      email.endsWith('@gmail.com') &&
      phoneNo.length === 10
    ) {
      const userDetails = {
        user_firstname: firstname,
        user_email: email,
        user_phone: phoneNo,
        user_password: password,
        user_lastname: 'Doe',
        user_city: 'Hyderabad',
        user_zipcode: '500072',
      }
      const url =
        'https://syoft.dev/Api/user_registeration/api/user_registeration'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      // const data = await response.json()
      // console.log(data)
      if (response.ok) {
        const {history} = this.props
        history.replace('/login')
      }
    }
  }

  render() {
    const {firstname, email, password, phoneNo, required} = this.state
    return (
      <div className="register-container">
        <img
          className="banner-image"
          src="https://res.cloudinary.com/dtomajdlh/image/upload/v1722390585/register-banner.png"
          alt="register-banner"
        />
        <form onSubmit={this.onSubmitForm} className="form-container">
          <h1 className="heading">Sign Up</h1>
          <p className="already-text">
            Already have an account?
            <Link to="/login" className="sign-link">
              Sign in
            </Link>
          </p>
          <div className="input-container">
            <label htmlFor="firstName" className="label-text">
              First name *
              <input
                id="firstName"
                onChange={this.updateFirstname}
                type="text"
                className="text-input"
                placeholder="Enter your firstname"
                value={firstname}
              />
            </label>
            {required === true && firstname === '' && (
              <p className="required-msg">*Required</p>
            )}
          </div>
          <div className="input-container">
            <label className="label-text" htmlFor="email">
              Email *
              <input
                onChange={this.updateEmail}
                type="text"
                id="email"
                className="text-input"
                placeholder="Enter your email"
                value={email}
              />
            </label>
            {required === true && email === '' && (
              <p className="required-msg">*Required</p>
            )}
            {required === false && !email.endsWith('@gmail.com') && (
              <p className="required-msg">Provide valid maid Id</p>
            )}
          </div>
          <div className="input-container">
            <label className="label-text" htmlFor="password">
              Password *
              <input
                onChange={this.updatePassword}
                type="password"
                id="password"
                className="text-input"
                placeholder="Enter your email"
                value={password}
              />
            </label>
            {required === true && password === '' && (
              <p className="required-msg">*Required</p>
            )}
          </div>
          <div className="input-container">
            <label className="label-text" htmlFor="phoneNo">
              Phone Number *
              <input
                onChange={this.updatePhoneNo}
                type="text"
                id="phoneNo"
                className="text-input"
                placeholder="Enter your phoneNo"
                value={phoneNo}
              />
            </label>
            {required === true && phoneNo === '' && (
              <p className="required-msg">*Required</p>
            )}
            {required === false && phoneNo.length < 10 && (
              <p className="required-msg">Provide valid number</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp
