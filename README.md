# Unit Translator
A chrome extension that automatically converts imperial units to metric and vice versa.

## Features

### Must-Haves
* Automatic conversion of all recognisable units, for example
  * °F to °C
  * ft to cm/m
  * miles to km
  * sqft to sqm
  * inches to cm/m
  * lbs to g/kg
* Hover over the underlined number on any webpage to see a tooltip of the conversions

![example.jpg](/docs/images/example.jpg)
  
### Nice-to-Haves
* Some NLP to easily recognise units (likely using an NLP library), for example
  * 30 °F
  * thirty degrees fahrenheit
  * fahrenheit 30
  * 30° Fahrenheit
* Detect or approximate what is being measured and what units to convert it to, for example
  * the area of a small studio apartment should not be converted to acres
  * the weight of a human person should be in kg, not g
* User preferences, such as
  * only convert temperature and length
  * only convert to kg
  * only convert from metric to imperial
  * change css styling of a translated number (text decoration, colour etc.)

## Release
This extension is very early in its development stage and no release date has been set yet. However, we plan to release this here on GitHub and on the [Chrome web store](https://chrome.google.com/webstore/category/extensions).

## Contributing
Contributions will be welcome after the extension is ready for initial release.
