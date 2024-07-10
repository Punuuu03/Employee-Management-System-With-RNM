import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="add-category-container">
            <div>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='category'><strong>Category:</strong></label>
                        <input
                            type='text'
                            name='category'
                            placeholder='Enter your category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add Category</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
