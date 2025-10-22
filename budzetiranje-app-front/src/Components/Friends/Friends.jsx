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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this friend?')) return;

    try {
      await axios.delete(`/api/users/${id}`);
      setFriends((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = async (id, oldName) => {
    const newName = prompt('Enter new name:', oldName);
    if (!newName || newName.trim() === '') return;

    try {
      await axios.put(`/api/users/${id}`, { name: newName });
      setFriends((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
      );
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  console.log(friends);

  return (
    <div className="friends-container">
      <h1>Ovo su moji frendovi:</h1>
      {friends.map((friend) => (
        <OneFriend
          friend={friend}
          key={friend.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default Friends;
