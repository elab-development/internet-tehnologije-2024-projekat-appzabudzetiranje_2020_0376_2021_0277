import React from 'react';
import './Friends.css';
import OneFriend from '../OneFriend/OneFriend';

const Friends = () => {
  let friends;
  return (
    <div>
      Ovo su moji frendovi:
      {friends.map((friend) => (
        <OneFriend friend={friend} />
      ))}
    </div>
  );
};

export default Friends;
