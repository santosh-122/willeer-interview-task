import React, { useState } from 'react';
import Input from 'common/components/atoms/Input';
import Button from 'common/components/atoms/Button';
import './LoginForm.scss';
import Text from 'common/components/atoms/Text';
import { Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [error, setError] = useState<string>('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put('https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/login', {
        email: form.values.email,
        password: form.values.password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        onLogin();
      } else {
        setError(response.data.message); 
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        placeholder="Enter your email"
        label="Email"
        type="email"
        {...form.getInputProps('email')}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        type="password"
        {...form.getInputProps('password')}
      />
      <Anchor href="/forgot-password">
        <Text ta="right" color="blue.5" td="underline" fw={700} fz="xxs">
          Forgot Password
        </Text>
      </Anchor>
      {error && <Text color="red">{error}</Text>} 
      <div className="button-wrapper">
        <Button fullWidth type="submit">
          Submit
        </Button>
      </div>
      <div className="register-link">
        <span>Not a member? </span>
        <Link to="/register" className="signup-link">Sign up now</Link>
      </div>
    </form>
  );
};

export default LoginForm;

