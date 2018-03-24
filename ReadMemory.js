card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
//NUMERO DE BYTES A LEER DE LA MEMORIA

NBYTES = 0x00;
//NBYTES = 256;
//TAMBIEN FUNCIONA CON:
//NBYTES = 256;
//SE ENVIA A LA TARJETA
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x00, NBYTES);
print(resp);
print("Código SW: " + card.SW.toString(16));

var resp = card.sendApdu(0x00, 0xD0, 0x00, 0xAA,Data);


card = new Card();
clainsp1p2lg = new ByteString("0020000003", HEX);
PIN = new ByteString("FFFFFF", HEX);
apdu = clainsp1p2lg.concat(PIN);
resp = card.plainApdu(apdu);
print(resp);

var resp = card.sendApdu(0x00, 0xD0, 0x00, 0xAA,Data);
print(resp);
print("Cï¿½digo SW: " + card.SW.toString(16));
print();