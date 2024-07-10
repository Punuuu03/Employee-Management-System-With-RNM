import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Profile = () => {
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState({ id: null, email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_admin/${id}`)
      .then(result => {
        if (result.data.Status) {
          fetchAdminData();
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3000/auth/edit_admin/${editAdmin.id}`, editAdmin)
      .then(result => {
        if (result.data.Status) {
          fetchAdminData();
          setIsEditing(false);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="profile-container">
      <h3>Admin Profile</h3>
      {isEditing ? (
        <div className="edit-admin">
          <h4>Edit Admin</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={editAdmin.password}
                onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(admin)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(admin.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
