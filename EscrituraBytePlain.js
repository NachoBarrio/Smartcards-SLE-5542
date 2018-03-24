card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
clainsp1p2lg = new ByteString("0020000003", HEX);
PIN = new ByteString("FFFFFF", HEX);
apdu = clainsp1p2lg.concat(PIN);
resp = card.plainApdu(apdu);
//Cuanto es el mínimo de bytes a pasar?
DATA = new ByteString("CF FF FF FF", HEX);
//atentos no hace falta el segundo parï¿½metro (Lc)

var clain = new ByteString("00 D6 00 AA 01 CF",HEX);
resp = card.plainApdu(clain);
print("Cï¿½digo SW: " + card.SW.toString(16));
print();

resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();
