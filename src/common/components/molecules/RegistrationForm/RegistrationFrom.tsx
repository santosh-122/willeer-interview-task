import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './RegistrationForm.scss'; 

interface RegistrationFormProps {
  onRegistration: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistration }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

const navigate=useNavigate ()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include at least one uppercase,lowercase, digit, and special character.'
      );
      return;
    }
    try {
      const response = await axios.post<any>(
        'https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/register',
        formData
      );
      console.log('Registration successful:', response.data);
      onRegistration(); 
      navigate('/home')
    } catch (error) {
      setError('Registration failed. Please try again.'); 
      console.error('Error registering:', error);
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    return regex.test(password);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration</h2> 
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Enter your address"
        value={formData.address}
        onChange={handleChange}
      />
      <label htmlFor="phone">Phone</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />
      {passwordError && <div className="error-message">{passwordError}</div>}
      <button type="submit">Submit</button> 
      {error && <div>{error}</div>} 
      <p>
        Already have an account? <Link to="/login">Login</Link> 
      </p>
    </form>
  );
};

export default RegistrationForm;
