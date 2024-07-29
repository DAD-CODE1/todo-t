import React, { useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaTruckFast } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess('Registration successful');
      setError('');
      console.log(response.data);
      navigate('/main'); // توجيه المستخدم إلى الصفحة المطلوبة
    } catch (error) {
      setError('Registration failed');
      setSuccess('');
      console.log(error);
    }
  };

  const togglePasswordVisibility = (setter) => {
    setter(prevState => !prevState);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <a className="navbar-brand" href="#">To DO <span> <FaTruckFast size={35} />  APP </span></a>
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link fw-bold" to={'/login'}>LOGIN</Link>
              <Link className="nav-link fw-bold" to={'/'}>REGISTER</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="basic-header">
        <div className="login-form card">
          <h1>Register</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} aria-describedby="nameHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input type={showPassword1 ? "text" : "password"} className="form-control" id="password" value={formData.password} onChange={handleInputChange} />
                <span className="eye-icon" onClick={() => togglePasswordVisibility(setShowPassword1)}>
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input type={showPassword2 ? "text" : "password"} className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                <span className="eye-icon" onClick={() => togglePasswordVisibility(setShowPassword2)}>
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="d-flex mt-5">
              <button type="submit" className="btn">Register</button>
              <div className="ms-auto">
                <Link to={'/login'} className="link-ring">Already Have An Account?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
