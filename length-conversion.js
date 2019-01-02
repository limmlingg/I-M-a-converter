// -----------------------------------------------------------|
// -----------------------------------------------------------|
//                                                            |
//                 LENGTH CONVERSION METHODS                  |
//                                                            |
// -----------------------------------------------------------|
// -----------------------------------------------------------|

function feetToMetre(feet) {
	var m = parseFloat(feet / 3.281);

	if (isNaN(m)) {
		console.log("Error: non numeric metre calculated for " + feet + " feet. Calculated value = " + m);
		return null;
	} else {
		return m;
	}
}

function inchToMetre(inch) {
	var m = parseFloat(inch / 39.37);

	if (isNaN(m)) {
		console.log("Error: non numeric metre calculated for " + inch + " inches. Calculated value = " + m);
		return null;
	} else {
		return m;
	}
}

function feetAndInchToMetre(feet, inch) {
	var m = feetToMetre(feet) + ((inch == null) ? 0.0 : inchToMetre(inch));

	if (isNaN(m)) {
		console.log("Error: non numeric metre calculated for " + feet + " feet and " + inch + " inches. Calculated value = " + m);
		return null;
	} else {
		return m;
	}
}
