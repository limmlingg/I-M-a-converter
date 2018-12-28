// --------------------------------------------------------------------|
// --------------------------------------------------------------------|
//                                                                     |
//                 TEMPERATURE CONVERSION METHODS                      |
//                                                                     |
// --------------------------------------------------------------------|
// --------------------------------------------------------------------|

function celsiusToFahrenheit(celsius) {
	var fahrenheit = parseFloat((celsius * 9.0/5.0) + 32);

	if (isNaN(fahrenheit)) {
		console.log("Error: non numeric fahrenheit calculated for " + celsius + " celsius. Calculated value = " + fahrenheit);
		return null;
	} else {
		return fahrenheit;
	}
}

function celsiusToKelvin(celsius) {
	var kelvin = parseFloat(celsius + 273.15);

	if (isNaN(kelvin)) {
		console.log("Error: non numeric kelvin calculated for " + celsius + " celsius. Calculated value = " + kelvin);
		return null;
	} else {
		return kelvin;
	}
}

function fahrenheitToCelsius(fahrenheit) {
	var celsius = parseFloat((fahrenheit - 32) * 5.0/9.0);

	if (isNaN(celsius)) {
		console.log("Error: non numeric celsius calculated for " + fahrenheit + " fahrenheit. Calculated value = " + celsius);
		return null;
	} else {
		return celsius;
	}
}

function fahrenheitToKelvin(fahrenheit) {
	var kelvin = parseFloat(((fahrenheit - 32) * 5.0/9.0) + 273.15);

	if (isNaN(kelvin)) {
		console.log("Error: non numeric kelvin calculated for " + fahrenheit + " fahrenheit. Calculated value = " + kelvin);
		return null;
	} else {
		return kelvin;
	}
}

function kelvinToCelsius(kelvin) {
	var celsius = parseFloat(kelvin - 273.15);

	if (isNaN(celsius)) {
		console.log("Error: non numeric celsius calculated for " + kelvin + " kelvin. Calculated value = " + celsius);
		return null;
	} else {
		return celsius;
	}
}

function kelvinToFahrenheit(kelvin) {
	var fahrenheit = parseFloat(((kelvin - 273.15) * 9.0/5.0) + 32);

	if (isNaN(fahrenheit)) {
		console.log("Error: non numeric fahrenheit calculated for " + kelvin + " kelvin. Calculated value = " + fahrenheit);
		return null;
	} else {
		return fahrenheit;
	}
}
