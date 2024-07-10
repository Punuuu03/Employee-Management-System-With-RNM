import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/delete_employee/` + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload(); 
                } else {
                    alert(result.data.Error);
                }
            });
    };

    return (
        <div className="employee-container">
            <div>
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="add-employee-link">Add Employee</Link>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(e => (
                            <tr key={e.id}>
                                <td>{e.name}</td>
                                
                                <td><img src={`http://localhost:3000/Images/` + e.image} alt="" className="employee-image" /></td>
                            
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.salary}</td>
                                <td>
                                    <Link to={'/dashboard/edit_employee/' + e.id} className="edit-button">Edit</Link>
                                    <button onClick={() => handleDelete(e.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;
