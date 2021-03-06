const express = require('express');
const router = express.Router();
const db = require('../../config/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all departments
router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
    });
});

router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];
  
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
});

router.post('/department', ({ body }, res) => {
    const errors = inputCheck(body, 'name');

    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }
    
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [body.name];
  
    db.run(sql, params, function(err, data) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: body,
        id: this.lastID
      });
    });
});

router.put('/department/:id', (req, res) => {
    const errors = inputCheck(req.body, 'name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    
    const sql = `UPDATE department SET name = ? WHERE id = ?`;
    const params = [req.body.name, req.params.id];
    // use ES5 function, not arrow to use this 
    db.run(sql, params, function(err, data) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: req.body,
        changes: this.changes
      });
    });
});
  
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
  
    db.run(sql, req.params.id, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({ message: 'deleted', changes: this.changes });
    });
});

module.exports = router;