// $(document).ready(function() {
// 	$(document).on("change", function() {
// 		getText();
// 		addFahrenheitTitles();
// 	})
// });

addFahrenheitTitles();

var pageText;

// Get the entire text of the webpage
function getText() {
	pageText = document.body.innerText;
	console.log(pageText);
}

// Look through the entire text of the webpage and add title attributes with the celcius units
// In the future, if extending this plugin, each unit conversion should have its own method
function addFahrenheitTitles() {
	getText();
	// Search for at least 1 digit, an optional space and at least one digit after, an optional space, and the fahrenheit unit
	// /g to search for all matches
	//var fahreinheitRegex = /\d+(.\d+)?(\s)?°F/g;
	var matches = pageText.match(/\d+(.\d+)?(\s)?°F/g);

	if (matches == null) {
		console.log("didn't find anything");
	}

	console.log(matches[1]);

	// Remove all duplicates so that replacing the text in setTitle() will not cause multiple spans for a duplicate
	//for (occurrence : matches.filter(onlyUnique)) {
	for (var i = 0; i < matches.length; i++) {
		console.log("match " + i + ": " + matches[i]);

		var occurrence = matches[i];

		var fahrenheit = extractFahrenheitNum(occurrence);
		var celsius = fahrenheitToCelsius(fahrenheit);
		setTitle(occurrence, makeFahrenheitTitle(fahrenheit, celsius));
	}
}

// Given a string with 1 fahrenheit value (including units), returns the number 
function extractFahrenheitNum(str) {
	var num = str.match(/\d+(.\d+)?/g);
	if (num.length > 1) {
		console.log("Error: more than one numeric part found for text \"" + occurence + "\"");
		return null;
	}
	return parseFloat(num[0]);
}

function fahrenheitToCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5.0/9.0;
}

function makeFahrenheitTitle(fahrenheit, celsius) {
	return fahrenheit + "°F = " + celsius.toFixed(2) + "°C"
}

function setTitle(original, title) {
	document.body.innerHTML = document.body.innerHTML.replace(original, "<span title=\"" + title + "\"> " + original + "</span>")
}
