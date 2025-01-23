import React, { useState, useEffect } from 'react';

function UserFormModal({ newUser, setNewUser, onSubmit, onClose, editingUser, users }) {
  const [errors, setErrors] = useState({ email: '', age: '' });
  const [touched, setTouched] = useState(false);

  // Validation for email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (
      users.some(
        (user) => user.email === email && (!editingUser || user.id !== editingUser.id)
      )
    )
      return 'Email is already in use.';
    return '';
  };

  // Validation for age
  const validateAge = (age) => {
    if (!age || age <= 18 || age > 120) return 'Age must be between 18 and 120.';
    return '';
  };

  // Form validation
  useEffect(() => {
    const emailError = validateEmail(newUser.email);
    const ageError = validateAge(newUser.age);
    setErrors({ email: emailError, age: ageError });
  }, [newUser]);

  const handleSubmit = () => {
    setTouched(true);
    const emailError = validateEmail(newUser.email);
    const ageError = validateAge(newUser.age);
    setErrors({ email: emailError, age: ageError });

    if (!emailError && !ageError && newUser.name.trim() !== '' && newUser.department.trim() !== '') {
      onSubmit();
    }
  };

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
        {touched && !newUser.name.trim() && <p className="error-message">Name is required</p>}

        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {touched && errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="text"
          placeholder="Department"
          value={newUser.department}
          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
        />
        {touched && !newUser.department.trim() && <p className="error-message">Department is required</p>}

        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value, 10) || '' })}
        />
        {touched && errors.age && <p className="error-message">{errors.age}</p>}

        <div className="button-group">
          <button onClick={handleSubmit}>
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
