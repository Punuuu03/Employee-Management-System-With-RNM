import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ loginStatus: false, Error: "Email and password are required" });
    }
  
    const sql = "SELECT * from admin where email=? and password=?";
    con.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("Query error in /adminlogin:", err);
        return res.json({ loginStatus: false, Error: "Query error" });
      }
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '10d' });
        res.cookie('token', token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({ loginStatus: false, Error: "Invalid email or password" });
      }
    });
  });



router.get('/category', (req, res) => {
    const sql = "SELECT * from category";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /category:", err);
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) {
            console.error("Query error in /add_category:", err);
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true });
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`name`,`email`,`password`,`address`,`salary`,`image`,`category_id`) VALUES (?,?,?,?,?,?,?)";
    con.query(sql, [req.body.name, req.body.email, req.body.password, req.body.address, req.body.salary, req.file.filename, req.body.category_id], (err, result) => {
        if (err) {
            console.error("Query error in /add_employee:", err.message);
            return res.json({ Status: false, Error: "Query error: " + err.message });
        }
        return res.json({ Status: true });
    });
});


router.get('/employee', (req, res) => {
    const sql = "SELECT * from employee";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /employee:", err);
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.get('/employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql = "SELECT * from employee WHERE id=?";
    con.query(sql,[id], (err, result) => {
        if (err) {
            console.error("Query error in /employee:", err);
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true, Result: result });
    });
    
});

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee SET name=?, email=?, salary=?, address=?, category_id=? WHERE id=?";

    con.query(sql, [req.body.name, req.body.email, req.body.salary, req.body.address, req.body.category_id, id], (err, result) => {
        if (err) {
            console.error("Query error in /edit_employee:", err);
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql = "DELETE FROM employee WHERE id=?"; 
    con.query(sql,[id], (err, result) => {
        if (err) {
            console.error("Query error in /delete_employee:", err);
            return res.json({ Status: false, Error: "Query error" });
            }
            return res.json({ Status: true, Result: result });  
            });

});

router.get('/admin_count',(req,res)=>{
    const sql = "SELECT COUNT(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /admin_count:", err);
            return res.json({ Status: false, Error: "Query error" });
            }
            return res.json({ Status: true, Result: result });
            });
});


router.get('/employee_count',(req,res)=>{
    const sql = "SELECT COUNT(id) as employee from employee";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /employee_count:", err);
            return res.json({ Status: false, Error: "Query error" });
            }
            return res.json({ Status: true, Result: result });
            });
});

router.get('/salary_count',(req,res)=>{
    const sql = "SELECT sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /salary_count:", err);
            return res.json({ Status: false, Error: "Query error" });
            }
            return res.json({ Status: true, Result: result });
            });
});


router.get('/admin_records',(req,res)=>{
    const sql = "SELECT * from admin";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query error in /salary_count:", err);
            return res.json({ Status: false, Error: "Query error" });
            }
            return res.json({ Status: true, Result: result });
            });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})

router.put('/edit_admin/:id', (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;
    const sql = "UPDATE admin SET email=?, password=? WHERE id=?";
  
    con.query(sql, [email, password, id], (err, result) => {
      if (err) {
        console.error("Query error in /edit_admin:", err);
        return res.json({ Status: false, Error: "Query error" });
      }
      return res.json({ Status: true });
    });
  });
  
  router.delete('/delete_admin/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM admin WHERE id=?";
  
    con.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Query error in /delete_admin:", err);
        return res.json({ Status: false, Error: "Query error" });
      }
      return res.json({ Status: true });
    });
  });
   

export { router as adminRouter };
