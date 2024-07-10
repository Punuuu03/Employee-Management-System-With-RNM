import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const Category = () => {
    const [category, setCategory] = useState([]);

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

    return (
        <div className="category-container">
            <div>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className="add-category-link">Add Category</Link>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
