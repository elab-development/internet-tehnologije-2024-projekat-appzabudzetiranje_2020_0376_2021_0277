import React from 'react';
import './Friends.css';
import OneFriend from '../OneFriend/OneFriend';
import axios from '../../axios';
import { useState, useEffect } from 'react';

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get('/api/users')
      .then((res) => setFriends(res.data))
      .catch((err) => {
        console.error('Error while getting users: ', err);
        setFriends([]); // u slučaju greške, postavi prazan niz
      });
  }, []);

  console.log(friends);

  return (
    <div className="friends-container">
      <h1>These are my friends:</h1>
      {friends.map((friend) => (
        <OneFriend friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

export default Friends;
