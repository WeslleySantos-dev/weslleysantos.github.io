const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'select * from commonquestions where status = 0 order by id desc',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                console.log(resultado)
                return res.status(200).json({ Questions: resultado, Respostas: resultado })

            }
        );
    });
});

router.get('/admin', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'select * from commonquestions order by id desc',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                console.log(resultado)
                return res.status(200).json({ Questions: resultado, Respostas: resultado })

            }
        );
    });
});

router.post('/newquestions', async (req, res) => {
    const { Pergunta, Resposta, Type, Fk } = req.body
    var query = ''
    console.log('entrou')
    console.log(Resposta, Pergunta, Type, Fk)

    if (Type == 'P') {
        console.log('1')
        query = 'INSERT INTO commonquestions (Pergunta, RorP, status)'
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(query + ' values (?, ?, ?);',
                [Pergunta, Type, '1'],
                (error, resultado, field) => {
                    conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                    if (error) {
                        console.log(error)
                        console.log(error.sqlMessage)
                        return res.status(500).send({ error: error })
                    }
                    return res.status(201).send({
                        mensagem: 'Pergunta cadastrado com sucesso!' + '\n' + 'Por politicas de segurança será verificado e inserido no cadastro de Perguntas frequentes',
                        Id: resultado.insertId
                    })
                }
            )
        })
    } else {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query('update commonquestions set status=1 where Fk=' + Fk,
                (error, resultado, field) => {
                    if (error) {
                        console.log(error)
                        console.log(error.sqlMessage)
                        return res.status(500).send({ error: error })
                    }
                    mysql.getConnection((error, conn) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        conn.query('update commonquestions set status=0 where id=' + Fk,
                            (error, resultado, field) => {
                                if (error) {
                                    console.log(error)
                                    console.log(error.sqlMessage)
                                    return res.status(500).send({ error: error })
                                }
                            }
                        )
                    })
                    query = 'INSERT INTO commonquestions (Resposta,RorP,Fk, status)'

                    if (error) { return res.status(500).send({ error: error }) }
                    conn.query(query + ' values (?, ?, ?, ?);',
                        [Resposta, Type, Fk, '0'],
                        (error, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (error) {
                                console.log(error)
                                console.log(error.sqlMessage)
                                return res.status(500).send({ error: error })
                            }
                            return res.status(201).send({
                                mensagem: 'Resposta cadastrado com sucesso!',
                                Id: resultado.insertId
                            })
                        }
                    )

                }
            )
        });

    }


});

module.exports = router;