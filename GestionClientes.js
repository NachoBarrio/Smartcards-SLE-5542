card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
clainsp1p2lg = new ByteString("0020000003", HEX);
PIN = new ByteString("FFFFFF", HEX);
apdu = clainsp1p2lg.concat(PIN);
resp = card.plainApdu(apdu);

//Fecha de salida 14/02/2018
//Fecha entrada 10/02/2018

var dateIn = new ByteString("31 30 30 32 32 30 31 38",HEX);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x80, dateIn);
print("Cï¿½digo SW 1: " + card.SW.toString(16));
print();
var dateOut = new ByteString("31 34 30 32 32 30 31 38",HEX);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x88, dateOut);
print("Cï¿½digo SW 2: " + card.SW.toString(16));
print();
var room = new ByteString("31 31 31 31",HEX);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x91, room);
print("Cï¿½digo SW 3: " + card.SW.toString(16));
print();
var user = new ByteString("42 61 72 72 69 6f 20 53 61 6e 74 6f 73 20 49 67 6e 61 63 69 6f",HEX);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x96, user);

print("Cï¿½digo SW 4: " + card.SW.toString(16)); 
print();
NBYTES = 0x00;
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x00, NBYTES);
print(resp);
print("Código SW: " + card.SW.toString(16));