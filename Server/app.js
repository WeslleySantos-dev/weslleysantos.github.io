const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

const rotaPets = require('./routes/pets');
const rotaPet = require('./routes/pet');
const rotaLogin = require('./routes/login');
const rotaUpdate = require('./routes/update');
const auth = require('./routes/auth');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //ACEITA APENAS DADOS SIMPLES
app.use(bodyParser.json()); //JSON DE ENTRADA NO BODY

app.use(cors());
app.use((req, res, next) => {

    req.header('Acces-Control-Allow-Origin', '*') //ACESSIVEL A TODOS SERVERS '*'
    req.header('Acces-control-Allow-Header', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE');
        return res.status(200).send({});
    }
    next();
}

)

app.use('/login', cors(), rotaLogin);
app.use('/pets', cors(),  rotaPets);
app.use('/pet', cors(), auth, rotaPet);
app.use('/update', cors(), rotaUpdate);
app.use('/auth', cors(), auth);

app.use((req, res, next) => {
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            Messagem: error.message
        }
    })
})

module.exports = app;