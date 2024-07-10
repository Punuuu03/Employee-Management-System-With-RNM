import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: '',
    });

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
                setEmployee({
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                });
            }).catch(err => console.log(err));

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/employee');
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    return (
        <div className="edit-employee-container">
            <div>
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='inputName'><strong>Name:</strong></label>
                        <input type='text' name='inputName' id='inputName' placeholder='Enter your name' value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputEmail'><strong>Email:</strong></label>
                        <input type='email' name='inputEmail' id='inputEmail' placeholder='Enter your email' value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputSalary'><strong>Salary:</strong></label>
                        <input type='text' name='inputSalary' id='inputSalary' placeholder='Enter your salary' value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputAddress'><strong>Address:</strong></label>
                        <input type='text' name='inputAddress' id='inputAddress' placeholder='Enter your address' value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='category'><strong>Category:</strong></label>
                        <select
                            name="category"
                            id="category"
                            value={employee.category_id}
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                        >
                            {category.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type='submit'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
