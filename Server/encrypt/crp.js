const crypto = require("crypto");



const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "apus",
    tipo : "hex"
};

export default function descriptografar(senha) {
	const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
	return decipher.final();
};



export default function criptografar(senha) {
	const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	cipher.update(senha);
	return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

