import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import TheatreList from './TheatreList';
import Bookings from './Bookings';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const TabItems = [
    {
      key: '1',
      label: "Theatres",
      children: <TheatreList />
    },
    {
      key: '2',
      label: "Bookings",
      children: <Bookings />
    },
  ];

  return (
    <div>
      <h1>Welcome {user.name}! to your Profile</h1>
      <Tabs defaultActiveKey='2' items={TabItems}/>
    </div>
  );
}

export default Profile;