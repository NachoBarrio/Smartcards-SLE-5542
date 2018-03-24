card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
clainsp1p2lg = new ByteString("0020000003", HEX);
PIN = new ByteString("FFFFFF", HEX);
apdu = clainsp1p2lg.concat(PIN);
resp = card.plainApdu(apdu);
//Cuanto es el mínimo de bytes a pasar?
DATA = new ByteString("49 67 6e 61 63 69 6f 20 42 61 72 72 69 6f 20 53 61 6e 74 6f 73", HEX);
//atentos no hace falta el segundo parï¿½metro (Lc)
resp = card.sendApdu(0x00, 0xD6, 0x00, 0xAB, DATA);
//
print("Cï¿½digo SW: " + card.SW.toString(16));
print();
NBYTES = 0x00;
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x00, NBYTES);
print(resp);
print("Código SW: " + card.SW.toString(16));