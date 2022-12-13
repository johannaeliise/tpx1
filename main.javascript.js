/*
JavaScript main file for TPX1
- Relies on the file tpx1-functions.js for some functions.
*/


/* generic color swatch object constructor
   receives 4 arguments:
	 - sid = string of the HTML/CSS ID of the associated swatch element
	 - r = number from 0-255 for the color's red value; defaults to null
	 - g = number from 0-255 for the color's green value; defaults to null
	 - b = number from 0-255 for the color's blue value; defaults to null
*/
function ColorSwatch(sid, r, g, b) {
	
	// the HTML/CSS ID of this swatch element, as a string
	this.swatchID = sid;
	
	// set this object's r/g/b values to the passed or randomized values
	this.red = r;
	this.green = g;
	this.blue = b;
	
	// object method to display this object's color in the associated swatch ID
	this.displaySwatch = function() {
		
		// find the HTML element
		swatchObj = document.getElementById(this.swatchID);
		
		// convert the three R/G/B values of 0-255 into a hex value using the functions above
		swatchHex = rgbToHex(this.red, this.green, this.blue);
		
		// update the background color of this swatch
		swatchObj.style.backgroundColor = "#" + swatchHex;
		
		// find the inner <p> tag and update it to contain the hex code
		swatchText = document.querySelector("#" + this.swatchID + " p");
		swatchText.innerHTML = "#" + swatchHex;
		
		// add the hex code to the URL as the location hash, thus replacing previous one
		location.hash = swatchHex;

		// if the average of the three R/G/B values is under 128, make the hex text white instead of black
		colorAvg = (this.red + this.green + this.blue)/3;
		if (colorAvg < 128) swatchText.classList.add("lite");
		else swatchText.classList.remove("lite");
		
	} // end this.displaySwatch method
	
	
	// object method to randomize the R, G, and B values, then re-display
	this.randomColor = function() {
		this.red = randomColorVal();
		this.green = randomColorVal();
		this.blue = randomColorVal();
		this.displaySwatch();
	}
	
	// object method to lighten the color
	this.lightenColor = function() {
		// TPX1: insert code to lighten the color by increasing the R, G, and B values and then re-displaying
		this.displaySwatch();
	}
	
	// object method to darken the color
	this.darkenColor = function() {
		// TPX1: insert code to darken the color by decreasing the R, G, and B values and then re-displaying
		this.displaySwatch();
	}
	
} // end Colorswatch object constructor






// set up the page when the window loads
window.onload = function() {
	
	// get the URL # hash value, if there is one
	urlHex = location.hash;
	console.log("Passed hash: " + urlHex);
	
	// if the hash is not empty, convert it to R, G, and B values,
	// otherwise set the colors randomly
	if (urlHex != "") {
		urlHexConverted = hexToRgb(urlHex); // function returns an object
		passedRed = urlHexConverted.r;
		passedGreen = urlHexConverted.g;
		passedBlue = urlHexConverted.b;
	} else {
		passedRed = randomColorVal();
		passedGreen = randomColorVal();
		passedBlue = randomColorVal();
	}

	// make new Colorswatch with a specific ID and R, G, B values, then display it
	Swatch1 = new ColorSwatch("colorSwatch1", passedRed, passedGreen, passedBlue);
	Swatch1.displaySwatch();

  
	// attach an onclick event listener to randomize colors
	document.getElementById("colorSwatch1").onclick = function() {
		console.log("clicked");
		Swatch1.randomColor();
	}
  
   Swatch2 = new ColorSwatch("colorSwatch2", passedRed, passedGreen, passedBlue);
	Swatch2.displaySwatch();
  
  	document.getElementById("colorSwatch2").onclick = function() {
		console.log("clicked");
		Swatch2.randomColor();
	}
	
	// attach a function to the keydown event trigger for the whole window
	// https://keycode.info is a useful reference for keyCode values
	document.onkeydown = function(event) {
		k = event.keyCode; // check the ASCII value of the keypress
		if (k == 32) {
			console.log("key: space");
			Swatch1.randomColor();
		} else if (k == 38) {
			console.log("key: up arrow");
			Swatch1.lightenColor(); // TPX1: fill in that method
		} else if (k == 40) {
			console.log("key: down arrow");
			Swatch1.darkenColor(); // TPX1: fill in that method
		}
	} // end document.onkeydown function
	
} // end window.onload
