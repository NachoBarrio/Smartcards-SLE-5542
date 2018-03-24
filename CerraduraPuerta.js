card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
//Fecha actual 13/02/2018
var dateNow = new Date(2018,02,15);
var roomReal = new ByteString("31 31 31 31",HEX);
//leer num habitacion
resp = card.sendApdu(0x00, 0xB0, 0x00, 0x91, 4);
print("habitacion: "+resp);
print("habitacionProbada: "+roomReal);
print("Código SW: " + card.SW.toString(16));
if(resp.toString() == roomReal.toString()){
	//leer fecha salida
	resp = card.sendApdu(0x00, 0xB0, 0x00, 0x88, 8);
	print("fSal0: "+resp.bytes(0,2).toString(ASCII));
	print("fSal: "+resp.bytes(2,2).toString(ASCII));
	print("fSal2: "+resp.bytes(4,4).toString(ASCII));
	print("Código SW: " + card.SW.toString(16));
	//Parsear fecha salida
	var dateSal = new Date(resp.bytes(4,4).toString(ASCII),resp.bytes(2,2).toString(ASCII),resp.bytes(0,2).toString(ASCII));
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