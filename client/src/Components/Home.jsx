import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error("Error fetching admin records:", error);
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch(error => {
        console.error("Error fetching admin count:", error);
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      })
      .catch(error => {
        console.error("Error fetching employee count:", error);
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        }
      })
      .catch(error => {
        console.error("Error fetching salary count:", error);
      });
  };

  return (
    <div className="home-container">
      <div className="section">
        <div className='uppercontainer'>
          <div className='seperate'>
            <div className="subsection">
              <div className="title">
                <h4>Admin</h4>
              </div>
              <hr className="divider" />
              <div className="content">
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
              </div>
            </div>
          </div>
          <div className='seperate'>
            <div className="subsection">
              <div className="title">
                <h4>Employee</h4>
              </div>
              <hr className="divider" />
              <div className="content">
                <h5>Total</h5>
                <h5>{employeeTotal}</h5>
              </div>
            </div>
          </div>
          <div className='seperate'>
            <div className="subsection">
              <div className="title">
                <h4>Salary</h4>
              </div>
              <hr className="divider" />
              <div className="content">
                <h5>Total</h5>
                <h5>₹{salaryTotal}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='partition'>
        <div className="admins-list">
          <h3>List of Admins</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a, index) => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>{a.email === 'admin@gmail.com' && index === 0 ? 'Primary' : 'Secondary'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
