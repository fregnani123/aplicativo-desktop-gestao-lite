const mongoose = require('mongoose');

const serialKeySchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  serialKey: { type: String, required: true, unique: true },  // Campo serialKey
  startedDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  at: { type: Boolean, required: true },
}, { collection: 'serialKeySchema' });  // Definindo explicitamente o nome da coleção

// Modelo de Licença com o nome correto da coleção
const Licenca = mongoose.model('Licenca', serialKeySchema);  // 'Licenca' é o nome do modelo

module.exports = Licenca;
