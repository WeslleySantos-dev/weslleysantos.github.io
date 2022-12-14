const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const response = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10;
var query = ''


//ATUALIZA CONTA DE USUARIO
router.patch('/', (req, res, next) => {
    const { Nome, Sobrenome, Email, Fone, Login, Id } = req.body
    const tpquery = req.params.parameters

    query = 'update users set  Nome = ?, Sobrenome = ?, Email = ?, Fone = ?, Login  = ?, where id =?'

    mysql.getConnection(async (error, conn) => {
        const salt = await bcrypt.genSalt(saltRounds)
        const Password = await bcrypt.hash(parametro, salt)
        conn.query('Select nome from users where  login =? and id<>?;', [Login, Id], (error, resultado, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (resultado != "") {
                return res.status(404).send({
                    mensagem: "Este login já está sendo utilizado por outro usuario"
                })
            } else {
                conn.query('Select nome from users where  email =?  and id<>?;', [Email, Id], (error, resultado, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    if (resultado != "") {
                        return res.status(404).send({
                            mensagem: "Este email já está sendo utilizado por outro usuario",
                        })
                    } else {
                        conn.query('Select nome from users where  fone =? and id<>?;', [Fone, Id], (error, resultado, fields) => {
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
                                        mensagem: 'Atualizado com Sucesso!',
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
})
});


//Novo Usuario
router.post('/newuser', (req, res, next) => {

    mysql.getConnection(async (error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        var { Nome, Sobrenome, Email, Fone, Login, PassUser, Pessoa, CpfCnpj } = req.body
        const salt = await bcrypt.genSalt(saltRounds)
        const password = await bcrypt.hash(PassUser, salt)
        console.log(Nome, Sobrenome, Email, Fone, Login, PassUser, Pessoa, CpfCnpj);
        if (CpfCnpj == '') {
            CpfCnpj = null
        }
        console.log(CpfCnpj);



        conn.query('Select id from users where  email =?;', [Email], (error, resultado, fields) => {
            console.log(Email);
            console.log(resultado);
            console.log(!!(resultado === ""));

            if (resultado != "") {
                return res.status(201).send({ mensagem: "Este Email já está sendo utilizado por outro usuario" })
            } else {
                conn.query('Select id from users where  Fone =?;', [Fone], (error, resultado, fields) => {
                    if (resultado != "") {
                        conn.release();
                        return res.status(201).send({ mensagem: "Este fone já está sendo utilizado por outro usuario" })
                    } else {
                        conn.query('Select id from users where  cpfcnpj =?;', [CpfCnpj], (error, resultado, fields) => {
                            if (resultado != "") {
                                conn.release();
                                return res.status(201).send({ mensagem: "O Cpf/Cnpj deve ser unico" })
                            } else {
                                conn.query('Select id from users where  login =?;', [Login], (error, resultado, fields) => {
                                    if (resultado != "") {
                                        conn.release();
                                        return res.status(201).send({ mensagem: "Este login já está sendo utilizado por outro usuario" })
                                    } else if (password != "") {
                                        conn.query(
                                            'INSERT INTO users (Nome, Sobrenome, Email, Usuario, Login, PassUser, Fone, Pessoa, CpfCnpj) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                                            [Nome, Sobrenome, Email, 'a', Login, password, Fone, Pessoa, CpfCnpj],
                                            (error, resultado, field) => {
                                                conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                                                if (error) { return res.status(500).send({ error: error }) }
                                                res.status(201).send({
                                                    mensagem: 'Inserido usuario com Sucesso!',
                                                    User: Login,
                                                    password: PassUser
                                                })
                                            }
                                        )
                                    }
                                })
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
                                mensagem: 'Pet Deletado com Sucesso!',
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

// router.post('/users', (req, res, next) => {
//     mysql.getConnection((error, conn) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         conn.query('select * from users', (error, resultado, field) => {
//             res.status(201).send({
//                 response: resultado
//             })
//         })

//     })
// });


module.exports = router;