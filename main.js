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

  var buttonEn = document.getElementById("button-en")
  var buttonDe = document.getElementById("button-de")

  for (let i = 0; i < spracheEn.length; i++) {
    if (sprache === 'en') {
      console.log("EN gegklickt");
      spracheEn[i].style.display = "block";
      buttonEn.style.fontWeight = "900";
    } else {
      spracheEn[i].style.display = "none";
      buttonEn.style.fontWeight = "500";
    }
  }

  for (let i = 0; i < spracheEn.length; i++) {
    if (sprache === 'en') {
      console.log("DE gegklickt");
      spracheDe[i].style.display = "none";
      buttonDe.style.fontWeight = "500";
    } else {
      spracheDe[i].style.display = "block";
      buttonDe.style.fontWeight = "900";
    }
  }
}

// Einfaden der Elemente 
// Inspiration: https://youtu.be/T33NN_pPeNI
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
    // else wird benötigt, wenn man mehr als einmal die Elemente einfaden lassen möchte
    // Ich denke das wird an dieser Stelle aber zu viel und sorgt für zu viel Unruhe
    // else {
    //   entry.target.classList.remove("show");
    // }
  });
});

const boxenEinfaden = document.querySelectorAll(".ueberschrift, .bild, .text, .boxen, .untereinander-bild-text, .h2-p-box, .eingabe, .zitat");
boxenEinfaden.forEach((element) => observer.observe(element));

function datenuebernahme() {
  var widerstandKupferOhm = 0.0175;

  var stromstaerkeDe = document.getElementById("maxstrom-de").value;
  var kabellaengeDe = document.getElementById("kabellaenge-de").value * 2;
  var verlustfaktorDe = document.getElementById("verlustfaktor-de").value / 100;

  var stromstaerkeEn = document.getElementById("maxstrom-en").value;
  var kabellaengeEn = document.getElementById("kabellaenge-en").value * 2;
  var verlustfaktorEn = document.getElementById("verlustfaktor-en").value / 100;

  let rueckgabe = "";

  var querschnittDe = (stromstaerkeDe * widerstandKupferOhm * kabellaengeDe) / (verlustfaktorDe * 12);

  console.log(querschnittDe);

  if (querschnittDe < 0.7) {
    rueckgabe = "0,75";
  } else if (querschnittDe >= 0.7 && querschnittDe < 1.4) {
    rueckgabe = "1,5";
  } else if (querschnittDe >= 1.4 && querschnittDe < 3.8) {
    rueckgabe = "4";
  } else if (querschnittDe >= 3.8 && querschnittDe < 5) {
    rueckgabe = "6";
  } else if (querschnittDe >= 5 && querschnittDe < 8) {
    rueckgabe = "10";
  } else if (querschnittDe >= 8 && querschnittDe < 143) {
    rueckgabe = "16";
  } else if (querschnittDe >= 14 && querschnittDe < 23) {
    rueckgabe = "25";
  } else if (querschnittDe >= 23 && querschnittDe < 33) {
    rueckgabe = "35";
  } else if (querschnittDe >= 33 && querschnittDe < 45) {
    rueckgabe = "50";
  } else if (querschnittDe >= 45 && querschnittDe < 65) {
    rueckgabe = "70";
  } else if (querschnittDe >= 65 && querschnittDe < 90) {
    rueckgabe = "95";
  } else if (querschnittDe >= 90 && querschnittDe < 145) {
    rueckgabe = "150";
  } else if (querschnittDe >= 145 && querschnittDe < 290) {
    rueckgabe = "300";
  }

  document.getElementById("berechnet-de").innerHTML = "Dein Kabelquerschnitt sollte mindestens " + rueckgabe + " mm betragen";
  console.log("datenuebernahme");
}
