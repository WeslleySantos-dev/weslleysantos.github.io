const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const saltRounds = 10;

//Login--------------------------------------------------------------
router.post('/', (req, res, next) => {
    mysql.getConnection(async (error, conn) => {
        const { Login, password } = req.body;
        const salt = await bcrypt.genSalt(saltRounds)
        verify = Boolean
        conn.query(
            'Select id, Nome, Usuario,PassUser,email from users where login = ? or email =?;', [Login, Login], async (error, resultado, fields) => {
                conn.release();
                if (resultado) {
                    user = resultado[0];
                    hash = [user.PassUser].toString();
                }
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    if (resultado == "") {
                        res.status(404).send({
                            messagem: 'Acesso não autorizado!'
                        })
                    } else {
                        bcrypt.compare(password, hash, function (err, result) {
                            console.log(result);
                            verify = result
                            if (err) { return res.status(401).send({ Mensagem: 'Falha na Autenticação' }) }
                            if (!verify) { return res.status(401).send({ Mensagem: 'Falha na Autenticação' }) }
                            if (verify) {
                                let token = jwt.sign({
                                    id: user.id,
                                    email: user.email,
                                    usuario: user.Usuario
                                }, process.env.JWT_KEY,
                                    {
                                        expiresIn: "2h"
                                    });
                                return res.status(200).send({
                                    token: token,
                                    Usuario: user
                                });
                            }
                        });
                    }
                }
            })
    })
});


module.exports = router;