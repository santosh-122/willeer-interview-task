import RegistrationForm from 'common/components/molecules/RegistrationForm/RegistrationFrom';
import React from 'react';

const RegistrationSection: React.FC = () => {
  const handleRegistration = () => {
    console.log('User registered successfully.');
  };

  return (
    <div>
      <RegistrationForm onRegistration={handleRegistration} />
    </div>
  );
};

export default RegistrationSection;
