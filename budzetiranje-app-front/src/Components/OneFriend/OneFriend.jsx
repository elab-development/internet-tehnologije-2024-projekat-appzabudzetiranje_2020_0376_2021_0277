import React, { useState } from 'react';
import './OneFriend.css';
import { Trash2, Pencil, X } from 'lucide-react';

const OneFriend = ({ friend, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(friend.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(friend.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="one-friend-container">
      <div className="one-friend-card">
        <div>
          <h2>{friend.name}</h2>
          <h3>{friend.email}</h3>
        </div>

        <div className="one-friend-button-container">
          {/* 🗑️ Delete Button */}
          <button onClick={() => onDelete(friend.id)}>
            <Trash2 />
          </button>

          <br />

          {/* ✏️ Edit Button */}
          <button onClick={() => setIsEditing(true)}>
            <Pencil />
          </button>
        </div>
      </div>

      {/* 🪟 Modal for editing */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Friend</h3>
              <button className="close-btn" onClick={() => setIsEditing(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneFriend;
