import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordForm.scss';
import Input from 'common/components/atoms/Input';
import Button from 'common/components/atoms/Button';
import Text from 'common/components/atoms/Text';
import { Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FiCheckCircle } from 'react-icons/fi'; 

interface ForgotPasswodFormProps {
  onForgotPasswod: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswodFormProps> = ({ onForgotPasswod }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm({
    initialValues: {
      email: '',
    },
  });

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put('https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/password/forgot', {
        email: form.values.email,
      });
      onForgotPasswod();
      setShowPopup(true);
      console.log('Password reset email sent successfully');
    } catch (error) {
      
      setError('An error occurred while reset');
    }
  };

  return (
   
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <Input
          placeholder="Enter your email"
          label="Email"
          type="email"
          {...form.getInputProps('email')}
        />
         {error && <Text color="red">{error}</Text>}
        <div className="button-wrapper">
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </div>
        <Anchor href={'/login'}>
          <Text ta={'right'} color="blue.5" td={'underline'} fw={700} fz={'xxs'}>
            Back to Login
          </Text>
        </Anchor>
        
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <FiCheckCircle className="tick-icon" /> 
            <p>Password reset email has been sent to your email.<br/> Please check your inbox.</p>
            <Button onClick={() => setShowPopup(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};
  

export default ForgotPasswordForm;
