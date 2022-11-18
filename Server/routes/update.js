const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const response = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10;


//ATUALIZA CONTA DE USUARIO
router.patch('/:parameters/:id', (req, res, next) => {
    const { parametro } = req.body
    const id = req.params.id
    const tpquery = req.params.parameters
    switch (tpquery) {
        case "nome":
            query = 'update users set nome = ? where id =?'
            break;
        case "login":
            query = 'update users set login = ? where id =?'
            break;
        case "email":
            query = 'update users set email = ? where id =?'
            break;
        case "password":
            query = 'update users set passuser = ? where id =?'
            break;
        case "fone":
            query = 'update users set fone = ? where id =?'
            break;
        case "pessoa":
            query = 'update users set pessoa = ? where id =?'
            break;
    }
    mysql.getConnection(async (error, conn) => {
        const salt = await bcrypt.genSalt(saltRounds)
        const Password = await bcrypt.hash(parametro, salt)
        conn.query('Select nome from users where  id =?;', [id], (error, resultado, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (resultado == "") {
                conn.release();
                return res.status(404).send({
                    mensagem: "Este usuario não existe",
                })
            } else if (tpquery == "login") {
                conn.query('Select nome from users where  login =?;', [parametro], (error, resultado, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    if (resultado != "") {
                        conn.release();
                        return res.status(404).send({
                            mensagem: "Este login já está sendo utilizado por outro usuario",
                            tpquery,
                            parametro,
                            resultado
                        })
                    } else {
                        conn.query(query, [parametro, id], (error, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                messagem: 'Atualizado ' + tpquery + ' com Sucesso!',
                                resultado
                            })
                        }
                        )
                    }
                })

            } else if (tpquery == "email") {
                conn.query('Select nome from users where  email =?;', [parametro], (error, resultado, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    if (resultado != "") {
                        conn.release();
                        return res.status(404).send({
                            mensagem: "Este email já está sendo utilizado por outro usuario",
                        })
                    } else {
                        conn.query(query, [parametro, id], (error, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                messagem: 'Atualizado ' + tpquery + ' com Sucesso!',
                                resultado
                            })
                        }
                        )
                    }
                })

            } else if (tpquery == "fone") {
                conn.query('Select nome from users where  fone =?;', [parametro], (error, resultado, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    if (resultado != "") {
                        conn.release();
                        return res.status(404).send({
                            mensagem: "Este fone já está sendo utilizado por outro usuario",
                        })
                    } else {
                        conn.query(query, [parametro, id], (error, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                messagem: 'Atualizado ' + tpquery + ' com Sucesso!',
                                resultado
                            })
                        })
                    }
                })
            } else if (tpquery == "password") {
                conn.query(query, [Password, id], (error, resultado, field) => {
                    conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                    if (error) { return res.status(500).send({ error: error }) }
                    res.status(201).send({
                        messagem: 'Atualizado ' + tpquery + ' com Sucesso!',
                        resultado, Password

                    })
                })
            } else {
                conn.query(query, [parametro, id], (error, resultado, field) => {
                    conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                    if (error) { return res.status(500).send({ error: error }) }
                    res.status(201).send({
                        messagem: 'Atualizado ' + tpquery + ' com Sucesso!',
                        resultado
                    })
                })
            }
        })
    })
});


//Novo Usuario
router.post('/newuser', (req, res, next) => {
    mysql.getConnection(async (error, conn) => {
        const { Nome, Sobrenome, Email, Fone, Usuario, Login, PassUser, Pessoa, CpfCnpj } = req.body
        const salt = await bcrypt.genSalt(saltRounds)
        const password = await bcrypt.hash(PassUser, salt)

        if (error) { return res.status(500).send({ error: error }) }
        conn.query('Select id from users where  login =?;', [Login], (error, resultado, fields) => {
            if (resultado == !"") {
                conn.release();
                return res.status(404).send({
                    mensagem: "Este login já está sendo utilizado por outro usuario",
                })
            } else {
                conn.query('Select id from users where  email =?;', [Email], (error, resultado, fields) => {
                    if (resultado != "") {
                        conn.release();
                        return res.status(404).send({
                            mensagem: "Este Email já está sendo utilizado por outro usuario"
                        })
                    } else {
                        conn.query('Select id from users where  Fone =?;', [Fone], (error, resultado, fields) => {
                            if (resultado != "") {
                                conn.release();
                                return res.status(404).send({
                                    mensagem: "Este fone já está sendo utilizado por outro usuario"
                                })
                            } else if (password != "") {
                                conn.query(
                                    'INSERT INTO users (Nome, Sobrenome, Email, Fone, Usuario,  Pessoa, CpfCnpj, Login, PassUser) values (?,?, ?, ?, ?, ?, ?, ?, ?);',
                                    [Nome, Sobrenome, Email, Fone, Usuario, Pessoa, CpfCnpj, Login, PassUser,],
                                    (error, resultado, field) => {
                                        conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                                        if (error) { return res.status(500).send({ error: error }) }
                                        res.status(201).send({
                                            messagem: 'Inserido usuario com Sucesso!',
                                            Id_Usuario: resultado.insertId.id,
                                            password

                                        })
                                    }
                                )
                            }
                        })
                    }
                })
            }
        })
    })
});

router.delete('/', (req, res, next) => {
    const { id } = req.body
    mysql.getConnection((error, conn) => {
        conn.query(
            'Select * from Users where id=?;', [id],
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error: error }) } else {
                    user = resultado
                    conn.query(
                        'Delete from users where id = ?;', [id],
                        (erro, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (erro) {

                            }
                            res.status(201).send({
                                messagem: 'Pet Deletado com Sucesso!',
                                usuario: user
                            })
                        }
                    )
                }
            }
        )
    }
    )
});

router.post('/users', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('select * from users', (error, resultado, field) => {
            res.status(201).send({
                response: resultado
            })
        })

    })
});


module.exports = router;