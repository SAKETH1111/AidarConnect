import React from 'react';

const Welcome = () => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  const fullName = localStorage.getItem("fullName");

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl text-rose-900">
        {getGreeting()} {fullName}! Welcome to the Aidar Connect Custom Survey Form Builder.
      </p>
    </div>
  );
};

export default Welcome;
