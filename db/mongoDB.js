const mongoose = require('mongoose');
const Licenca = require('./model/modelMongo'); // Certifique-se de que o modelo é o correto

// Função para conectar ao MongoDB
const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.PASSWORD_MONGO_DB);  // Verifique a string de conexão
    console.log('Conexão com o MongoDB bem-sucedida!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
};

const getLicenca = async (req, res) => {
  try {
    const { userID, serialKey } = req.params;

    console.log('Parâmetros recebidos em req.params:', req.params);

    if (!userID || !serialKey) {
      return res.status(400).json({ message: 'Parâmetros incompletos' });
    }

    console.log('Buscando licença para os parâmetros:', { userID, serialKey });

    const document = await Licenca.findOne({ userID, serialKey });

    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    res.status(500).json({ message: 'Erro ao buscar os dados' });
  }
};

  

// Exporte todas as funções necessárias
module.exports = {
  conectarMongoDB,
  getLicenca,
};
