import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    errMsg: '',
    showPassword: false,
    required: '',
  }

  updateUserEmail = event => {
    this.setState({userEmail: event.target.value})
  }

  updateUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  updateShowPassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  formValidations = () => {
    const {userEmail, userPassword} = this.state

    if (userEmail === '' || userPassword === '') {
      this.setState({required: true})
    } else {
      this.setState({required: false})
    }
  }

  onSubmitForm = async event => {
    await this.formValidations()
    event.preventDefault()
    const {required, userEmail, userPassword} = this.state
    if (required === false && userEmail.endsWith('.com')) {
      const userDetails = {
        user_email: userEmail,
        user_password: userPassword,
      }
      const url = 'https://syoft.dev/Api/userlogin/api/userlogin'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      // console.log(data)
      if (data.status === true) {
        const userData = JSON.stringify(data.user_data[0])
        // console.log(userData)
        localStorage.setItem('userData', userData)
        const {history} = this.props
        history.replace('/dashboard')
      } else {
        const errMsg = data.msg
        this.setState({errMsg})
      }
    }
  }

  render() {
    const {userEmail, userPassword, errMsg, showPassword, required} = this.state

    return (
      <div className="login-page-container">
        <form onSubmit={this.onSubmitForm} className="login-container">
          <img
            className="login-image"
            src="https://res.cloudinary.com/dtomajdlh/image/upload/v1722407736/login-banner.png"
            alt="login"
          />
          <div className="details-container">
            <label htmlFor="username" className="username-label">
              UserEmail
              <input
                onChange={this.updateUserEmail}
                id="username"
                type="text"
                className="username-input"
                placeholder="Enter UserEmail"
                value={userEmail}
              />
            </label>
            {required === true && userEmail === '' && (
              <p className="required-msg">*Required</p>
            )}
            {required === false && !userEmail.endsWith('.com') && (
              <p className="required-msg">Provide valid maid Id</p>
            )}
          </div>
          <div className="details-container">
            <label htmlFor="password" className="username-label">
              Password
              <input
                onChange={this.updateUserPassword}
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="username-input"
                placeholder="Enter Password"
                value={userPassword}
              />
            </label>
            {required === true && userPassword === '' && (
              <p className="required-msg">*Required</p>
            )}
          </div>
          <div className="show-container">
            <label htmlFor="showPassword" className="show-label">
              <input
                onClick={this.updateShowPassword}
                type="checkbox"
                id="showPassword"
                className="checkbox-input"
              />
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errMsg !== '' && <p className="error-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
