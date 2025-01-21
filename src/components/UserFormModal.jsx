import React from 'react';

function UserFormModal({ newUser, setNewUser, onSubmit, onClose, editingUser }) {
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="form-container">
        <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newUser.department}
          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button onClick={onSubmit}>{editingUser ? 'Update User' : 'Add User'}</button>
      </div>
    </div>
  );
}

export default UserFormModal;
