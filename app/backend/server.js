const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Habilitar CORS para todos os hosts
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Endpoint GET /health-check
app.get('/health-check', (req, res) => {
  res.json({ msg: 'OK' });
});

// Endpoint GET /api/products
app.get('/api/products', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);
    
    console.log(`[${new Date().toISOString()}] GET /api/products - ${products.length} produtos retornados`);
    
    res.json(products);
  } catch (error) {
    console.error('Erro ao ler produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📦 Endpoint disponível: http://localhost:${PORT}/api/products`);
});
