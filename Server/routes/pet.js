const express = require('express');
// const { response } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Pets;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Pets: resultado })
            }
        );
    });
});

module.exports = router;