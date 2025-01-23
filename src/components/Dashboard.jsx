import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import UserFormModal from './UserFormModal';
import Pagination from './Pagination';
import Loader from './Loader';

const API_URL = 'https://678eb673a64c82aeb1212fef.mockapi.io/users';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '', age: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0 });
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { page: pagination.page, limit: pagination.limit },
      });
      setUsers(response.data);

      setPagination((prev) => ({ ...prev, total: 20 }));
    } catch (error) {
      alert('Error fetching users');
    }
    setLoading(false);
  };

  const handleAddOrUpdateUser = async () => {
    setLoading(true);
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, newUser);
      } else {
        await axios.post(API_URL, newUser);
      }
      setNewUser({ name: '', email: '', department: '', age: '' });
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      alert(`Error ${editingUser ? 'updating' : 'adding'} user`);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      alert('Error deleting user');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.limit]);

  return (
    <div className="content-container">
      <h1>User Management Dashboard</h1>

      {loading && <Loader />}
      
      <div className="button-container">
        <button onClick={() => setShowForm(true)}>Add New User</button>
      </div>

      <UserTable
        users={users}
        onEdit={(user) => {
          setEditingUser(user);
          setNewUser(user);
          setShowForm(true);
        }}
        onDelete={handleDeleteUser}
      />

      <Pagination
        pagination={pagination}
        onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
      />

      {showForm && (
        <UserFormModal
        newUser={newUser}
        setNewUser={setNewUser}
        onSubmit={handleAddOrUpdateUser}
        onClose={() => {
          setNewUser({ name: '', email: '', department: '', age: '' }); // Reset form
          setEditingUser(null); // Clear editing state
          setShowForm(false);
        }}
        editingUser={editingUser}
        users={users} // Pass the current users for duplicate email validation
      />
      )}
    </div>
  );
}

export default Dashboard;
