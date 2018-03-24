card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
//leer numero de serie
var serie = card.sendApdu(0x00, 0xB0, 0x00, 0x00, 8);
print(serie);
print("Código SW: " + card.SW.toString(16));
dieciseis = 16;
var resta = dieciseis - serie.length;
var faltan = ByteString.valueOf(0, resta);
//
serie = serie.concat(faltan);
print("cifrar: "+serie);

//Clave clonado
var crypto = new Crypto();
var key2 = new ByteString("C1C2C3C4C5C6C7C8D1D2D3D4D5D6D7D8",HEX);
var deskey2 = new Key();
deskey2.setComponent(Key.AES,key2);

var serieClon = card.sendApdu(0x00, 0xB0, 0x00, 0x40, 16);
var serieDes = crypto.decrypt(deskey2,Crypto.AES_ECB,serieClon);
print("serial desc: "+serieDes);

//Clave cifrado
var crypto = new Crypto();
var key1 = new ByteString("D1D2D3D4D5D6D7D8C1C2C3C4C5C6C7C8",HEX);
var deskey1 = new Key();
deskey1.setComponent(Key.AES,key1);
var iv = new ByteString("00000000000000000000000000000000", HEX);

if(serieDes.toString() == serie.toString()){
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
}else{
	print("Tarjeta Clonada");
}