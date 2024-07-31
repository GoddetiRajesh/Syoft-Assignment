import {Link} from 'react-router-dom'

import './index.css'

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  // console.log(userData)
  const updatedData = {
    userCity: userData.user_city,
    userEmail: userData.user_email,
    userFirstName: userData.user_firstname,
    userId: userData.user_id,
    userLastName: userData.user_lastname,
    userPassword: userData.user_password,
    userPhone: userData.user_phone,
    userZipCode: userData.user_zipcode,
  }
  const {
    userCity,
    userEmail,
    userFirstName,
    userPhone,
    userZipCode,
  } = updatedData
  return (
    <div className="dashboard-container">
      <div className="card-container">
        <h1 className="dashboard-heading">Welcome To Your Dashboard</h1>
        <Link to="/" className="link">
          <button type="button" className="custom-button">
            Sign-In
          </button>
        </Link>
      </div>
      <img
        className="profile-image"
        src="https://res.cloudinary.com/dtomajdlh/image/upload/v1722418477/profile-image.png"
        alt="profile"
      />
      <p className="main-text">
        Name: <span className="text">{userFirstName}</span>
      </p>
      <p className="main-text">
        Email: <span className="text">{userEmail}</span>
      </p>
      <p className="main-text">
        Phone Number: <span className="text">{userPhone}</span>
      </p>
      <p className="main-text">
        City: <span className="text">{userCity}</span>
      </p>
      <p className="main-text">
        Zipcode: <span className="text">{userZipCode}</span>
      </p>
    </div>
  )
}

export default Dashboard
