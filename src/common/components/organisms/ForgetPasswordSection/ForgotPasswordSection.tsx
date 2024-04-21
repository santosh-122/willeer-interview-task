import ForgotPasswordForm from 'common/components/molecules/ForgotPasswordForm';
import React from 'react';

const ForgotPasswodSection: React.FC = () => {
  console.log("jhgfdfghj")
  const handleForgotPasswod = () => {
    console.log(' successfully.');
  };

  return (
    <div>
      <ForgotPasswordForm onForgotPasswod={handleForgotPasswod} />
    </div>
  );
};

export default ForgotPasswodSection;
