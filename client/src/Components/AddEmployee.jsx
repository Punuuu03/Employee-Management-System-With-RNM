import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id);

        axios.post('http://localhost:3000/auth/add_employee', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="add-employee-container">
            <div>
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='inputName'><strong>Name:</strong></label>
                        <input type='text' name='inputName' id='inputName' placeholder='Enter your name'
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputEmail'><strong>Email:</strong></label>
                        <input type='email' name='inputEmail' id='inputEmail' placeholder='Enter your email'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputPassword'><strong>Password:</strong></label>
                        <input type='password' name='inputPassword' id='inputPassword' placeholder='Enter your password'
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputSalary'><strong>Salary:</strong></label>
                        <input type='text' name='inputSalary' id='inputSalary' placeholder='Enter your salary'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='inputAddress'><strong>Address:</strong></label>
                        <input type='text' name='inputAddress' id='inputAddress' placeholder='Enter your address'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='category'><strong>Category:</strong></label>
                        <select name="category" id="category"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {
                                category.map(c => {
                                    return <option key={c.id} value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='inputFile'><strong>Select Image:</strong></label>
                        <input type='file' id='inputFile' name="image"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} />
                    </div>
                    <button type='submit'>Add Employee</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee;
