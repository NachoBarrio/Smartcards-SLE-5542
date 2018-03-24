card = new Card();
atr = card.reset(Card.RESET_WARM);
print(atr);
clainsp1p2lg = new ByteString("0020000003", HEX);
//
//***LA SEGUNDA PARTE DE LA APDU ES EL PIN
PIN = new ByteString("FFFFFF", HEX);
//SE CONCATENA LA PRIMERA PARTE CON EL PIN PARA FORMA LA APDU COMPLETA
apdu = clainsp1p2lg.concat(PIN);
print(apdu);
print();
resp = card.plainApdu(apdu);

writing = new ByteString("FF D0 80 A0 CF",HEX);
resp = card.plainApdu(writing);
print(resp);
print("Código SW: " + card.SW.toString(16));


DATA = new ByteString("CF", HEX);
//atentos no hace falta el segundo parï¿½metro (Lc)
resp = card.sendApdu(0x00, 0xD6, 0x00, 0xAA, DATA);
print();