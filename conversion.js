// $(document).ready(function() {
// 	$(document).on("change", function() {
// 		getText();
// 		addFahrenheitTitles();
// 	})
// });

var pageText;

getText();
addTemperatureTitles();
addLengthTitles();

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

// Add title attributes for lengths
function addLengthTitles() {
	addFeetAndInchesTitles();
}

// Look through the entire text of the webpage and add title attributes with other temperature units
function addFahrenheitTitles() {
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

// Look through the entire text of the webapge and add title attributes with other length units
// TODO: Detect feet and inches that have decimal places (is it necessary?)
function addFeetAndInchesTitles() {
	// Search for a number of at least 1 digit, the ' sign, optional set of numbers behind it with an optional " for the second number
	// Currently only works for whole numbers
	var matches = pageText.match(/\d+'(\d+["]?)?/g);

	// Remove all duplicates so that replacing the text in setTitle() will not cause multiple spans for a duplicate
	matches = Array.from(new Set(matches));

	for (var i = 0; i < matches.length; i++) {

		//console.log("match " + i + ": " + matches[i]);

		var occurrence = matches[i];
		var feetAndInches = extractFeetAndInchesNum(occurrence);

		if (feetAndInches != null) {
			var metres = feetAndInchToMetre(feetAndInches[0], feetAndInches[1]);
			setTitle(occurrence, makeFeetAndInchTitle(feetAndInches[0], feetAndInches[1], metres));
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

// Given a string in feet (and possibly inches), returns the 2 numbers in an array
// If only the feet is specified, it will return an array with only 1 element
function extractFeetAndInchesNum(str) {
	var num = str.match(/\d+/g);

	if (num == null) {
		console.log("Error: could not parse number for string \"" + str + "\"");
	}

	if (num.length > 2) {
		console.log("Error: more than two numeric parts found for text \"" + str + "\"");
		return null;
	}

	var ans = [];

	var floatNum = parseFloat(num[0]);

	if (isNaN(floatNum)) {
		console.log("Error: could not parse float for " + num[0]);
		return null;
	} else {
		ans[0] = floatNum;
		floatNum = parseFloat(num[1]);
		if (isNaN(floatNum)) {
			//console.log("Error: could not parse float for " + num[1]);
		} else {
			ans[1] = floatNum;
		}
		return ans;
	}
}

// Returns the titles for temperature conversions
function makeTemperatureTitle(fahrenheit, celsius, kelvin) {
	return String(fahrenheit.toFixed(2)) + "°F = " + String(celsius.toFixed(2)) + "°C = " + String(kelvin.toFixed(2)) + "K";
}

// Returns the titles for the feet and inch to metre conversions
function makeFeetAndInchTitle(feet, inch, metre) {

	var inchPart = (inch == null) ? "" : String(inch) + "&quot;";

	// No toFixed() for feet and inches because only whole numbers are detected
	return String(feet) + "\'" + inchPart + " = " + String(metre.toFixed(2)) + "m";
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
