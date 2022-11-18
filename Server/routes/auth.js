const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        res.token = decode;
        res.status(200).send({ decode })
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }
}