import React from 'react';
import './OneFriend.css';

const OneFriend = ({ friend }) => {
  return (
    <div>
      {friend.name} : {friend.email}
    </div>
  );
};

export default OneFriend;
