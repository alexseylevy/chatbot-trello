const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();

// Criação do cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Autenticação local para evitar necessidade de login constante
});

// Exibir o QR Code no terminal quando o cliente solicitar login
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code gerado. Escaneie no WhatsApp para conectar.');
});

// Notificar quando o WhatsApp estiver conectado
client.on('ready', () => {
    console.log('WhatsApp conectado!');
});

// Ouvir mensagens e responder a comando específico
client.on('message_create', message => {
    if (message.body === '!teste') {
        client.sendMessage(message.from, 'certo'); // Resposta ao comando '!teste'
    }
});

// Inicializar o cliente do WhatsApp
client.initialize();

// Criar rota para verificar se o servidor está rodando (usado pelo Railway)
app.get('/', (req, res) => {
    res.send('Servidor rodando - WhatsApp conectado!');
});

// Escutar na porta fornecida pelo Railway (ou localmente na porta 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
