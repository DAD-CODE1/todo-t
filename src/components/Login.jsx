import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaTruckFast } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // استخدام hook للتنقل بين الصفحات

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { // تأكد من صحة عنوان URL
        email: formData.email,
        password: formData.password
      });
      setSuccess('Login successful');
      setError('');
      // افترض أن الرد يحتوي على توكن JWT
      localStorage.setItem('token', response.data.token); // تخزين التوكن في LocalStorage
      navigate('/main'); // توجيه المستخدم إلى صفحة أخرى بعد تسجيل الدخول بنجاح
    } catch (error) {
      setError('Login failed');
      setSuccess('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <Link className="navbar-brand" to={'/login'}>To DO <span><FaTruckFast size={35} /> APP </span></Link>
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
          <h1>Login</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={formData.password} onChange={handleInputChange} />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="d-flex mt-5">
              <button type="submit" className="btn">Login</button>
              <div className="ms-auto">
                <Link to={'/register'} className="link-ring">Register</Link>
                <Link to={'/forgetpass'} className="link-ring">Forgetpass</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
