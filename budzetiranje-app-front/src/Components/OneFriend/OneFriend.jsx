import React from 'react';
import './OneFriend.css';
import { Trash2, Pencil } from 'lucide-react';

const OneFriend = ({ friend }) => {
  return (
    <div className="one-friend-container">
      <div className="one-friend-card">
        <div>
          <h2>{friend.name}</h2>
          <h3>{friend.email}</h3>
        </div>
        <div className="one-friend-button-container">
          <button>
            <Trash2 />
          </button>

          <br />
          <button>
            <Pencil />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneFriend;
