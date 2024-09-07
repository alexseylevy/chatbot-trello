const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();

// Criação do cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Exibir o QR Code no terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Notificar quando o WhatsApp estiver conectado
client.on('ready', () => {
    console.log('WhatsApp Conectado!');
});

// Ouvir mensagens e responder a comando específico
client.on('message_create', message => {
    if (message.body === '!teste') {
        client.sendMessage(message.from, 'certo');
    }
});

// Inicializar o cliente do WhatsApp
client.initialize();

// Configurar servidor HTTP simples para manter a aplicação rodando no Vercel
app.get('/', (req, res) => {
    res.send('Servidor rodando - WhatsApp conectado!');
});

// Servidor escutando na porta especificada pelo Vercel ou localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
