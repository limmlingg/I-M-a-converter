// $(document).ready(function() {
// 	$(document).on("change", function() {
// 		getText();
// 		addFahrenheitTitles();
// 	})
// });

var pageText;

addFahrenheitTitles();

// Get the entire text of the webpage
function getText() {
	pageText = document.body.innerText;
	//console.log(pageText);
}

// Look through the entire text of the webpage and add title attributes with the celcius units
// In the future, if extending this plugin, each unit conversion should have its own method
function addFahrenheitTitles() {
	getText();
	// Search for an optional negate sign, at least 1 digit, an optional space and at least one digit after, an optional space, and the fahrenheit unit
	// /g to search for all matches
	var matches = pageText.match(/[−|-]?\d+(\.\d+)?[\s]?°F/g);

	// if (matches == null) {
	// 	console.log("didn't find anything");
	// }

	// Remove all duplicates so that replacing the text in setTitle() will not cause multiple spans for a duplicate
	matches = Array.from(new Set(matches));

	for (var i = 0; i < matches.length; i++) {
		//console.log("match " + i + ": " + matches[i]);

		var occurrence = matches[i];
		var fahrenheit = extractFahrenheitNum(occurrence);

		if (fahrenheit != null) {
			var celsius = fahrenheitToCelsius(fahrenheit);
			setTitle(occurrence, makeFahrenheitTitle(fahrenheit, celsius));
		}
	}
}

// Given a string with 1 fahrenheit value (including units), returns the number 
function extractFahrenheitNum(str) {
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
function makeFahrenheitTitle(fahrenheit, celsius) {
	return String(fahrenheit.toFixed(2)) + "°F = " + String(celsius.toFixed(2)) + "°C"
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
