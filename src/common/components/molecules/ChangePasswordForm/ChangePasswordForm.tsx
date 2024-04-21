import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './ChangePasswordForm.scss';
import Input from 'common/components/atoms/Input';
import Button from 'common/components/atoms/Button';
import Text from 'common/components/atoms/Text';
import { Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FiCheckCircle } from 'react-icons/fi'; 

interface ChangePasswordFormProps {
  onChangePassword: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onChangePassword }) => {
  const { token } = useParams<{ token: string }>(); 
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const form = useForm({
    initialValues: {
      newPassword: '',
      oldPassword: '',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put('https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/password/reset', {
        password: form.values.newPassword,
        tokenId: token, 
      });
      onChangePassword();
      setShowPopup(true);
      setSuccessMessage('Password changed successfully');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <Input
        placeholder="Enter your old password"
        label="Old Password"
        type="password"
        {...form.getInputProps('oldPassword')}
      />
      <Input
        placeholder="Enter your new password"
        label="New Password"
        type="password"
        {...form.getInputProps('newPassword')}
      />
      <div className="button-wrapper">
        <Button type="submit" fullWidth>
          Reset
        </Button>
      </div>
      <Anchor href={'/login'}>
        <Text ta={'right'} color="blue.5" td={'underline'} fw={700} fz={'xxs'}>
          Back to Login
        </Text>
      </Anchor>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <FiCheckCircle className="tick-icon" />
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default ChangePasswordForm;
