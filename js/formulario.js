const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	ipOrigen: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	ipDestino: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	usuario: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,///^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	usuario2: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	umt: /^\d{1,10}$/, // 1 a 14 numeros.
	datagrama: /^\d{1,10}$/, // 1 a 14 numeros.
}

const campos = {

	ipOrigen: false,
	ipDestino: false,
	umt: false,
	datagrama: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "ipOrigen":
			validarCampo(expresiones.ipOrigen, e.target, 'ipOrigen');
			break;
		case "ipDestino":
			validarCampo(expresiones.ipDestino, e.target, 'ipDestino');
			break;

		case "umt":
			validarCampo(expresiones.umt, e.target, 'umt');
			break;
		case "datagrama":
			validarCampo(expresiones.datagrama, e.target, 'datagrama');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.ipOrigen && campos.ipDestino && campos.umt && campos.datagrama) {
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


/**
 * Funcion encargada de recibir los valores que el usuario ingreso en el HTML y de asignar los valoresfijoss.
 */
function cargar() {

	var umt = parseInt(document.getElementById('umt').value);
	var data = parseInt(document.getElementById('datagrama').value);
	const version = 4;
	const longitudCab = 5;
	const servicioDiferenciado = 0;
	var longitudTotal;
	var identificacion = Math.floor(Math.random() * 65535) + 0;
	var desplazamiento;  //f,df,mf, desplaza
	var ttl = Math.floor(Math.random() * 255) + 0;
	var protocolo = capturarProtocolo();
	var sumaComprobacion = 0;
	var direcIpOri = document.getElementById('ipOrigen').value;
	direcIpOri = dividirOctetosDeDireccion(direcIpOri);
	var derecIpDest = document.getElementById('ipDestino').value;
	derecIpDest = dividirOctetosDeDireccion(derecIpDest);




	var arrDato = [version, longitudCab, servicioDiferenciado, longitudTotal, identificacion, desplazamiento,
		ttl, protocolo, sumaComprobacion, direcIpOri[0], direcIpOri[1], direcIpOri[2], direcIpOri[3], derecIpDest[0], derecIpDest[1],
		derecIpDest[2], derecIpDest[3]];


	fragmentar(arrDato, umt, data);
}

function ejemplo() {

	var umt = Math.floor(Math.random() * 1500) + 0;
	var data = Math.floor(Math.random() * 5000) + 0;
	const version = 4;
	const longitudCab = 5;
	const servicioDiferenciado = 0;
	var longitudTotal;
	var identificacion = Math.floor(Math.random() * 65535) + 0;
	var desplazamiento;
	var ttl = Math.floor(Math.random() * 255) + 0;
	var protocolo = 1;
	var sumaComprobacion = 0;
	var direcIpOri = [];
	direcIpOri[0] = Math.floor(Math.random() * 255) + 1;
	direcIpOri[1] = Math.floor(Math.random() * 255) + 0;
	direcIpOri[2] = Math.floor(Math.random() * 255) + 0;
	direcIpOri[3] = Math.floor(Math.random() * 255) + 0;

	var derecIpDest = [];
	derecIpDest[0] = Math.floor(Math.random() * 255) + 1;
	derecIpDest[1] = Math.floor(Math.random() * 255) + 0;
	derecIpDest[2] = Math.floor(Math.random() * 255) + 0;
	derecIpDest[3] = Math.floor(Math.random() * 255) + 0;



	var arrDato = [version, longitudCab, servicioDiferenciado, longitudTotal, identificacion, desplazamiento,
		ttl, protocolo, sumaComprobacion, direcIpOri[0], direcIpOri[1], direcIpOri[2], direcIpOri[3], derecIpDest[0], derecIpDest[1],
		derecIpDest[2], derecIpDest[3]];

	document.getElementById('WiresharK1').innerHTML = "<h4> Ejemplo aleatorio </h4>"
		+ " MTU=" + umt
		+ "</br> Longitud=" + data
		+ "</br> Ip origen:" + direcIpOri[0] + "." + direcIpOri[1] + "." + direcIpOri[2] + "." + direcIpOri[2]
		+ " </br> Ip destino:" + derecIpDest[0] + "." + derecIpDest[1] + "." + derecIpDest[2] + "." + derecIpDest[2]
		+ "</br> Protocolo=" + protocolo
		+ "</br>-----------------------------------------------------------------------------------------------------------------------------------------------------------"
		+ "<h4></h4>";


	document.getElementById('binario1').innerHTML = "<h4> Ejemplo aleatorio </h4>"
		+ " MTU=" + umt
		+ "</br> Longitud=" + data
		+ "</br> Ip origen:" + direcIpOri[0] + "." + direcIpOri[1] + "." + direcIpOri[2] + "." + direcIpOri[2]
		+ " </br> Ip destino:" + derecIpDest[0] + "." + derecIpDest[1] + "." + derecIpDest[2] + "." + derecIpDest[2]
		+ "</br> Protocolo=" + protocolo
		+ "</br>-----------------------------------------------------------------------------------------------------------------------------------------------------------"
		+ "<h4>  </h4>";


	document.getElementById('hexa1').innerHTML = "<h4> Ejemplo aleatorio </h4>"
		+ " MTU=" + umt
		+ "</br> Longitud=" + data
		+ "</br> Ip origen:" + direcIpOri[0] + "." + direcIpOri[1] + "." + direcIpOri[2] + "." + direcIpOri[2]
		+ " </br> Ip destino:" + derecIpDest[0] + "." + derecIpDest[1] + "." + derecIpDest[2] + "." + derecIpDest[2]
		+ "</br> Protocolo=" + protocolo
		+ "</br>-----------------------------------------------------------------------------------------------------------------------------------------------------------"
		+ "<h4>  </h4>";



	fragmentar(arrDato, umt, data);
}




/**
 * Funcion encargada de de seleccionar el tipo de protocolo.
 * @returns 
 */
function capturarProtocolo() {
	var icmp = document.getElementById('icmp');
	var udp = document.getElementById('udp');
	var tcp = document.getElementById('tcp');
	if (icmp.checked == true) {
		icmp = 1;

		return icmp;
	} else if (udp.checked == true) {
		udp = 17;

		return udp;

	} else if (tcp.checked == true) {
		tcp = 6;

		return tcp;
	}
	else {
		alert("seleccione un protocolo");
	}
}


/**
 * Funcion encargada de convertir los fragmentos en hexadecimal.
 * @param {*} arrDato 
 * @returns 
 */
function cambiarHex(arrDato) {





	var array = [
		arrDato[0].toString(16),                        //version                       x1
		arrDato[1].toString(16),                        //encabezado                    x1
		arrDato[2].toString(16).padStart(2, 0),         //servicios diferenciados       x2
		arrDato[3].toString(16).padStart(4, 0),         //longitud total                x4
		arrDato[4].toString(16).padStart(4, 0),         //identificacion                x4
		arrDato[5].toString(16).padStart(4, 0),         //f,df,mf y desplazamiento      x4
		arrDato[6].toString(16).padStart(2, 0),         //TTL                           x2
		arrDato[7].toString(16).padStart(2, 0),        //protocolo                      x2
		arrDato[8].toString(16).padStart(4, 0),        //Suma de compr                  x4
		arrDato[9].toString(16).padStart(2, 0),						//primer cuarteto de direccion ip 
		arrDato[10].toString(16).padStart(2, 0),
		arrDato[11].toString(16).padStart(2, 0),
		arrDato[12].toString(16).padStart(2, 0),
		arrDato[13].toString(16).padStart(2, 0),
		arrDato[14].toString(16).padStart(2, 0),
		arrDato[15].toString(16).padStart(2, 0),
		arrDato[16].toString(16).padStart(2, 0)];






	var s = "";
	for (let index = 0; index < array.length; index++) {
		s += "" + array[index];
	}
	return s;

}

/**
 * Funcion encargada de convertir los fragmentos en Binario.
 * @param {*} arrDato 
 * @returns 
 */
function cambiarBinario(arrDato) {


	var array = [
		arrDato[0].toString(2).padStart(4, 0),
		arrDato[1].toString(2).padStart(4, 0),
		arrDato[2].toString(2).padStart(8, 0),
		arrDato[3].toString(2).padStart(16, 0),
		arrDato[4].toString(2).padStart(16, 0),
		arrDato[5].toString(2).padStart(16, 0),
		arrDato[6].toString(2).padStart(8, 0),
		arrDato[7].toString(2).padStart(8, 0),
		arrDato[8].toString(2).padStart(16, 0),
		arrDato[9].toString(2).padStart(4, 0),
		arrDato[10].toString(2).padStart(4, 0),
		arrDato[11].toString(2).padStart(4, 0),
		arrDato[12].toString(2).padStart(4, 0),
		arrDato[13].toString(2).padStart(4, 0),
		arrDato[14].toString(2).padStart(4, 0),
		arrDato[15].toString(2).padStart(4, 0),
		arrDato[16].toString(2).padStart(4, 0)];

		



	var s = "";
	for (let index = 0; index < array.length; index++) {
		s += " " + array[index];
	}
	return s;
}

/**
 * Funcion encargada de fragmentar los datagramas.
 * @param {*} arreglo 
 * @param {*} umt 
 * @param {*} data 
 */
function fragmentar(arreglo, umt, data) {




	if (data <= umt) {

		arreglo[3] = data;
		arreglo[5] = 0; // desplazamiento
		arreglo[8] = sumaComprobacion(arreglo);


		document.getElementById('WiresharK').innerHTML += "</br> Informacion de la Fragmentacion : " + "</br>"
			+ 'version: IPv' + arreglo[0] 
			+ '</br> Longitud de encabezado: ' + (arreglo[1] * 4) + " Bytes"
			+ '</br> servicio diferenciados: ' + arreglo[2]
			+ '</br> longitud total : ' + arreglo[3]
			+ '</br> identificacion: ' + arreglo[4]
			+ '</br> d:   0'
			+ '</br> df:  1'
			+ '</br> mf:  0'
			+ '</br> desplazamiento: 0'
			+ '</br> ttl: ' + arreglo[6]
			+ '</br> protocolo: ' + arreglo[7]
			+ '</br> suma de comprovacion: ' + arreglo[8]
			+ '</br> ip origen: ' + arreglo[9] + "." + arreglo[10] + "." + arreglo[11] + "." + arreglo[12]
			+ '</br> ip destino: ' + arreglo[13] + "." + arreglo[14] + "." + arreglo[15] + "." + arreglo[16]
			+ "</br> </br> </br>";



		document.getElementById('binario').innerHTML += "</br> fragmento" + "</br>" + cambiarBinario(arreglo) + " </br>  </br>";
		document.getElementById('hexa').innerHTML += "</br> fragmento" + "</br>" + cambiarHex(arreglo) + " </br>  </br>";





	} else {


		var can = Math.ceil(data / umt);
		var fragmentos = [];
		var desplazamiento = [];
		arreglo[5] = 0; 
		desplazamiento[-1] = 0;
		

		for (let index = 0; index < can; index++) {

			arreglo[8] = 0;
			
			informacion = calcularLongitudyDesplazamiento(data, umt, arreglo[5]);
			desplazamiento[index]  =informacion[2] + desplazamiento[index - 1];
				
			
			var df = calcularDf(data,umt);
			var mf = calcularMf(data,umt);
			

			arreglo[3] = informacion[0];
			arreglo[5] = desplazamiento[index-1];
			arreglo[8]= sumaComprobacion(arreglo);

			
		



			fragmentos[index] = arreglo;
			data = informacion[1];

		

			document.getElementById('WiresharK').innerHTML += "</br> Informacion de la Fragmentacion : " + "</br>"
				+ 'version: ' + arreglo[0]
				+ '</br> Longitud de encabezado: ' + (arreglo[1] * 4) + " Bytes"
				+ '</br> servicio diferenciados: ' + arreglo[2]
				+ '</br> longitud total : ' + arreglo[3]+ " Bytes"
				+ '</br> identificacion: ' + arreglo[4]
				+ '</br> d: 0'
				+ '</br> df: ' + df
				+ '</br> mf: ' + mf
				+ '</br> desplazamiento: ' + arreglo[5]
				+ '</br> ttl: ' + arreglo[6]
				+ '</br> protocolo: ' + arreglo[7]
				+ '</br> suma de comprovacion: ' + arreglo[8]
				+ '</br> ip origen: ' + arreglo[9] + "." + arreglo[10] + "." + arreglo[11] + "." + arreglo[12]
				+ '</br> ip destino: ' + arreglo[13] + "." + arreglo[14] + "." + arreglo[15] + "." + arreglo[16]
				+ "</br> </br> </br>";


				


			document.getElementById('binario').innerHTML += " </br> fragmento" + (index + 1) + "</br>" +cambiarBinario(arreglo) + " </br>  </br>";
			document.getElementById('hexa').innerHTML += " </br> fragmento" + (index + 1) + "</br>" + cambiarHex(arreglo) + " </br>  </br>";


		}

	}
}



/**
 * Metodo encargado de realizar el calculo de la longitud del datagrama.
 * @param {*} data: parametro de la longitud del fragmento. 
 * @param {*} umt: MTU del datagrama.
 * @returns : retorna un arreglo con dos valores, el peso calculado y el reto de peso que falta calcular.
 */
function calcularLongitudyDesplazamiento(data, umt, desplazamiento) {

	var aux = data - umt; 
	var act = data - aux; 
	var retorno;

	var f = "0";
	var df = "0"
	var mf = "0"


	var b2 = f.toString(2) + df.toString(2) + mf.toString(2) + desplazamiento.toString(2).padStart(13, 0);

	

	b2 = parseInt(b2, 2);

	desplazamiento = b2;

;

	if (data > umt) {

		var datos = act - 20

		if (datos % 8 == 0) {
			desplazamiento = (datos / 8);
			
			 retorno = [act, aux, desplazamiento];
			
			 return retorno;

		} else {
			act = (Math.trunc(datos / 8) * 8) + 20;
			desplazamiento = Math.trunc(datos / 8)
			aux = data - act;

			return retorno = [act, aux, desplazamiento];
		}
	} else {


		if (datos % 8 == 0) {
			desplazamiento = (datos / 8);
			return retorno = [data + 40, aux, desplazamiento];

		} else {
			act = (Math.trunc(datos / 8) * 8) + 20;
			desplazamiento = Math.trunc(datos / 8)
			aux = data - act;

			return retorno = [data + 40, aux, desplazamiento];
		}
	}

}

/**
 * Funcion encargada de asignar la bandera cuando un datagrama es fragmentable o no.
 * @param {*} data 
 * @param {*} umt 
 * @returns 
 */
function calcularDf(data, umt) {
	// 0 se puede fragmentar.
	// 1 no se puede fragmentar.

	if (data > umt) {
		return 0;
	} else {
		return 1;

	}
}



/**
 * Funcion encargada de asignar la bandera cuando un fragmento es el ultimo o no.
 * @param {*} data 
 * @param {*} umt 
 * @returns 
 */

function calcularMf(data, umt) {
	// 0 no hay mas fragmentos.
	// 1 hay mas fragmentar.

	if (data > umt) {
		return 1;
	} else {
		return 0;

	}
}


/**
 * Metodo encargado de hacer la suma de comprobacion.
 * @param {*} arreglo 
 */
function sumaComprobacion(arreglo) {


	var c = cambiarHex(arreglo);



	var valorFinal = "";
	var cuartetos = [];
	var acarreo;
	var total = 0;
	var suma16x = "";

	cuartetos[0] = c.slice(0, 4) + " ";
	cuartetos[1] = c.slice(4, 8) + " ";
	cuartetos[2] = c.slice(8, 12) + " ";
	cuartetos[3] = c.slice(12, 16) + " ";
	cuartetos[4] = c.slice(16, 20) + " ";
	cuartetos[5] = c.slice(20, 24) + " ";
	cuartetos[6] = c.slice(24, 28) + " ";
	cuartetos[7] = c.slice(28, 32) + " ";
	cuartetos[8] = c.slice(32, 36) + " ";
	cuartetos[9] = c.slice(36, 40) + " ";

	//alert(cuartetos);

	for (let i = 0; i < cuartetos.length; i++) {




		if (i != 5) {

			total = parseInt(cuartetos[i], 16) + total;
			suma16x = total.toString(16);


			if (suma16x.length === 5) {

				acarreo = parseInt(suma16x[0])
				suma16x = suma16x.substring(1);
				total = parseInt(suma16x, 16) + acarreo;
				suma16x = total.toString(16);

			}
		}

	}

	var binario1 = total.toString(2);
	for (let i = 0; i < binario1.length; i++) {

		if (binario1[i] == '1') {
			valorFinal += "0";
		} else {
			valorFinal += "1"
		}
	}
	var tem = parseInt(valorFinal, 2);
	valorFinal = tem.toString(16)
     //alert(valorFinal);

	return parseInt(valorFinal, 16);
}





/**
 * Este metodo se encarga de evaluar las direcciones ip y dividirlas en octetos.
 * @param {*} ipENcadena 
 * @returns 
 */
function dividirOctetosDeDireccion(ipENcadena) {

	ipENcadena += '.';
	var pocision = 0;
	var s = "";
	var ipDividida = [];

	for (let i = 0; i < ipENcadena.length; i++) {

		if (ipENcadena[i] != ".") {

			s += ipENcadena[i];
		} else {
			ipDividida[pocision] = s;
			pocision = pocision + 1;
			s = "";
		}
	}
	return ipDividida;
}







