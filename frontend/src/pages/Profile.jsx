import React from 'react';
import CarForm from '../components/CarForm';

const Profile = () => {
  return (
    <div>
      <h1>Edit Your Car Details</h1>
      <CarForm isEdit={true} />
    </div>
  );
};

export default Profile;
