card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);

//Clave cifrado
var crypto = new Crypto();
var key1 = new ByteString("D1D2D3D4D5D6D7D8C1C2C3C4C5C6C7C8",HEX);
var deskey1 = new Key();
deskey1.setComponent(Key.AES,key1);
var iv = new ByteString("00000000000000000000000000000000", HEX);

//Fecha actual 13/02/2018
var dateNow = new Date(2018,02,13);
var roomReal = new ByteString("1111",ASCII);
//leer num habitacion
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x80, 80);
var descifrado = crypto.decrypt(deskey1, Crypto.AES_CBC,resp,iv);
print("habitacion: "+descifrado.bytes(16,4).toString(ASCII));
print("habitacionProbada: "+roomReal.toString(ASCII));
print("Código SW: " + card.SW.toString(16));
if(descifrado.bytes(16,4).toString(ASCII) == roomReal.toString(ASCII)){
	//leer fecha salida
	print("fSal0: "+descifrado.bytes(8,2).toString(ASCII));
	print("fSal: "+descifrado.bytes(10,2).toString(ASCII));
	print("fSal2: "+descifrado.bytes(12,4).toString(ASCII));
	print("Código SW: " + card.SW.toString(16));
	//Parsear fecha salida
	var dateSal = new Date(descifrado.bytes(12,4).toString(ASCII),descifrado.bytes(10,2).toString(ASCII),descifrado.bytes(8,2).toString(ASCII));
	print("fecha1: "+dateSal.toString());
	print("fecha2: "+dateNow.toString());
	if(dateSal >= dateNow){
		print("Abierto");
	}else{
		print("Cerrado");
	}
}else{
	print("Habitacion incorrecta");
}