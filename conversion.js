// $(document).ready(function() {
// 	$(document).on("change", function() {
// 		getText();
// 		addFahrenheitTitles();
// 	})
// });

var pageText;

addTemperatureTitles();


// Get the entire text of the webpage
function getText() {
	pageText = document.body.innerText;
	//console.log(pageText);
}

// Add title attributes for temperatures in fahrenheit and celsius
function addTemperatureTitles() {
	addFahrenheitTitles();
	addCelsiusTitles();

	// No implementation (yet) for Kelvin as it is difficult to figure out whether a number with a 'K' unit is referring to Kelvin or thousands.
}

// Look through the entire text of the webpage and add title attributes with other temperature units
function addFahrenheitTitles() {
	getText();
	// Search for an optional negate sign, at least 1 digit, an optional space and at least one digit after, an optional space, and the fahrenheit unit
	// /g to search for all matches
	var matches = pageText.match(/[−|-]?\d+(\.\d+)?[\s]?°F/g);

	// Remove all duplicates so that replacing the text in setTitle() will not cause multiple spans for a duplicate
	matches = Array.from(new Set(matches));

	for (var i = 0; i < matches.length; i++) {
		//console.log("match " + i + ": " + matches[i]);

		var occurrence = matches[i];
		var fahrenheit = extractTemperatureNum(occurrence);

		if (fahrenheit != null) {
			var celsius = fahrenheitToCelsius(fahrenheit);
			var kelvin = fahrenheitToKelvin(fahrenheit);
			setTitle(occurrence, makeTemperatureTitle(fahrenheit, celsius, kelvin));
		}
	}
}

// Look through the entire text of the webpage and add title attributes with other temperature units
function addCelsiusTitles() {
	getText();
	// Search for an optional negate sign, at least 1 digit, an optional space and at least one digit after, an optional space, and the celsius unit
	// /g to search for all matches
	var matches = pageText.match(/[−|-]?\d+(\.\d+)?[\s]?°C/g);

	// Remove all duplicates so that replacing the text in setTitle() will not cause multiple spans for a duplicate
	matches = Array.from(new Set(matches));

	for (var i = 0; i < matches.length; i++) {

		//console.log("match " + i + ": " + matches[i]);

		var occurrence = matches[i];
		var celsius = extractTemperatureNum(occurrence);

		if (celsius != null) {
			var fahrenheit = celsiusToFahrenheit(celsius);
			var kelvin = celsiusToKelvin(celsius);
			setTitle(occurrence, makeTemperatureTitle(fahrenheit, celsius, kelvin));

			//console.log("fah = " + fahrenheit);
			//console.log("fah = " + kelvin);
		}
	}
}

// Given a string with 1 temperature value (including units), returns the number 
function extractTemperatureNum(str) {
	var num = str.match(/[−|-]?\d+(\.\d+)?/g);

	if (num == null) {
		console.log("Error: could not parse number for string \"" + str + "\"");
	}

	if (num.length > 1) {
		console.log("Error: more than one numeric part found for text \"" + str + "\"");
		return null;
	}

	// Replace the negative sign with a hyphen so that parseFloat() can parse it as a negative number
	num[0] = num[0].replace("−", "-");

	var floatNum = parseFloat(num[0]);

	if (isNaN(floatNum)) {
		console.log("Error: could not parse float for " + num[0]);
		return null;
	} else {
		return parseFloat(num[0]);
	}
}

// Returns the titles for temperature conversions
function makeTemperatureTitle(fahrenheit, celsius, kelvin) {
	return String(fahrenheit.toFixed(2)) + "°F = " + String(celsius.toFixed(2)) + "°C = " + String(kelvin.toFixed(2)) + "K";
}

// Replace the original text in the webpage's HTML to underline the original text and display the given title when hovered over
// TODO: Fix all the bugs :(
function setTitle(original, title) {

	//console.log(title);
	//console.log(original);
	//console.log("<f2ctag style=\"border-bottom: 2px solid #fea\" title=\"" + title + "\"> " + original + "</f2ctag>");

	document.body.innerHTML = document.body.innerHTML.replace(new RegExp(original, "g"), "<f2ctag style=\"border-bottom: 2px solid #fea\" title=\"" + title + "\"> " + original + "</f2ctag>");

	//$("body:contains(original)").html(function(_, html) {
	//	return html.replace(original, "<f2ctag style=\"border-bottom: 2px solid #fea\" title=\"" + title + "\"> " + $1 + "</f2ctag>")
	//})
}
