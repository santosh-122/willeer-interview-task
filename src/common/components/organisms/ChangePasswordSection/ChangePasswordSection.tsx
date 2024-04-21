import ChangePasswordForm from 'common/components/molecules/ChangePasswordForm';
import React from 'react';

const ChangePasswordSection: React.FC = () => {
  console.log("jhgfdfghj")
  const handleChangePasswordSection = () => {
    console.log(' successfully.');
  };

  return (
    <div>
      <ChangePasswordForm onChangePassword={handleChangePasswordSection} />
    </div>
  );
};

export default ChangePasswordSection;
