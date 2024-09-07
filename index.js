
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true});
});

client.on('ready', () => {
    console.log('WhatsApp Conectado!');
});

client.on('message_create', message => {
	if (message.body === '!teste') { //Mensagem de entrada
		client.sendMessage(message.from, 'certo'); // Mensagem de saida
	}
});

;
client.initialize();
