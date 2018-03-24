card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
clainsp1p2lg = new ByteString("0020000003", HEX);
PIN = new ByteString("FFFFFF", HEX);
apdu = clainsp1p2lg.concat(PIN);
resp = card.plainApdu(apdu);

//leer num serie
var serie = card.sendApdu(0x00, 0xB0, 0x00, 0x00, 8);
print(serie);
print("Código SW: " + card.SW.toString(16));
dieciseis = 16;
var resta = dieciseis - serie.length;
var faltan = ByteString.valueOf(0, resta);
//
serie = serie.concat(faltan);
print("cifrar: "+serie);


//Clonado
var crypto = new Crypto();
var key2 = new ByteString("C1C2C3C4C5C6C7C8D1D2D3D4D5D6D7D8",HEX);
var deskey2 = new Key();
deskey2.setComponent(Key.AES,key2);
var cifAes = crypto.encrypt(deskey2,Crypto.AES_ECB,serie);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x40, cifAes);

//Clave cifrado

var key1 = new ByteString("D1D2D3D4D5D6D7D8C1C2C3C4C5C6C7C8",HEX);
var deskey1 = new Key();
deskey1.setComponent(Key.AES,key1);
var iv = new ByteString("00000000000000000000000000000000", HEX);

//Fecha de salida 14/02/2018
//Fecha entrada 10/02/2018

var dateIn = new ByteString("31 30 30 32 32 30 31 38",HEX);
var dateOut = new ByteString("31 34 30 32 32 30 31 38",HEX);
var room = new ByteString("31 31 31 31",HEX);
var user = new ByteString("42 61 72 72 69 6f 20 53 61 6e 74 6f 73 20 49 67 6e 61 63 69 6f",HEX);
var cifrar = dateIn.concat(dateOut).concat(room).concat(user);

ochenta = 80;
var resta = ochenta - cifrar.length;
//resta son los octetos que faltan por rellenar
print("Faltan por rellenar a ceros: " +  + resta);
print();
faltan = ByteString.valueOf(0, resta);
//valueOf genera un ByteString del primer parámetro y del número de octetos del segundo parámetro
//ver documentación.
print(faltan);
//
cifrar = cifrar.concat(faltan);
print("cifrar: "+cifrar);

var cifrado = crypto.encrypt(deskey1,Crypto.AES_CBC,cifrar,iv);
print("cifrado: "+cifrado);
resp = card.sendApdu(0x00, 0xD6, 0x00, 0x80, cifrado);

print("Cï¿½digo SW 4: " + card.SW.toString(16)); 
print();
NBYTES = 0x00;
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x00, NBYTES);
print(resp);
print("Código SW: " + card.SW.toString(16));