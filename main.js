// Funktion für das Ausklappen der Menüleiste
var navig = document.getElementById("ankertags");

function toggle() {
  console.log("toggle wird geklickt")
  if (navig.style.display === "none") {
    console.log("klick")
    navig.style.display = "block";
  } else {
    console.log("hier")
    navig.style.display = "none";
  }

}

var x = window.matchMedia("(max-width: 1200px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

function myFunction(x) {
  if (x.matches) { // If media query matches
    navig.style.display = "none";
  } else {
   navig.style.display = "block";
  }
}


// Funktion für die Übersetzung
// Seite wird als erstes auf Deutsch geladen, kann per Buttonklick auf Englisch übersetzt werden
// ist man im englsichen Modus und man wechselt die html-Seiten, so wird die neu geöffnete Seite auch inital
// auf deutsch angezeigt. TODO: Sprache Seitenübergreifend ändern
function trans(sprache) {
  var spracheEn = document.getElementsByClassName("en");
  var spracheDe = document.getElementsByClassName("de");

  for (let i = 0; i < spracheEn.length; i++) {
    if (sprache === 'en') {
      console.log("EN gegklickt");
      spracheEn[i].style.display = "block";
    } else {
      spracheEn[i].style.display = "none";
    }
  } 
  
  for (let i = 0; i < spracheEn.length; i++) {
    if (sprache === 'en') {
      console.log("DE gegklickt");
      spracheDe[i].style.display = "none";
    } else {
      spracheDe[i].style.display = "block";
    }
  }
}