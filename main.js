//Autor: "Elisabeth Edert"

// Funktionen für das Ausklappen der Menüleiste im responsive Design
var navig = document.getElementById("ankertags");
var mediaqu = window.matchMedia("(max-width: 1200px)") // Breite bei der umgesprungen werden soll

//Seitenmenü wird ab einer Breite nicht mehr sichtbar und wird zum ausklappen
function responsive(mediaqu) {
  if (mediaqu.matches) { // Wenn die Mediaqueries mit der Seitenbreite übereinstimmen 
    navig.style.display = "none";
  } else {
    navig.style.display = "block";
  }
}

responsive(mediaqu)
mediaqu.addListener(responsive) // addListener hinzufügen

// Hier wird das Mneü geöffnet, wenn auf die drei Balken geklickt wird
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

// Schließt das Menü im schmalen Format, wenn ein Kapitel ausgewählt wird
function toggleclose() {
  if (mediaqu.matches) {
    navig.style.display = "none";
  }
}

// Funktion für die Übersetzung
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
      console.log("DE gegklickt");
      spracheEn[i].style.display = "none";
      buttonEn.style.fontWeight = "500";
    }
  }

  for (let i = 0; i < spracheDe.length; i++) {
    if (sprache === 'en') {
      spracheDe[i].style.display = "none";
      buttonDe.style.fontWeight = "500";
    } else {
      spracheDe[i].style.display = "block";
      buttonDe.style.fontWeight = "900";
    }
  }
}

// Einfaden der Elemente, wenn sie auf dem Bildschirm angezeigt werden
// Inspiration: https://youtu.be/T33NN_pPeNI
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const boxenEinfaden = document.querySelectorAll(" .impr-text, .bild, .text, .boxen, .untereinander-bild-text, .h2-p-box, .eingabe, .zitat");
boxenEinfaden.forEach((element) => observer.observe(element));

// Berechnung des Kabelquerschnitts und Ausgabe eines genormten Formates
var widerstandKupferOhm = 0.0175;
var rueckgabe = "";

function datenuebernahme(sprache) {
  console.log("script datenübernahme");
  if (sprache === 'de') {
    var stromstaerke = document.getElementById("maxstrom-de").value;
    var kabellaenge = document.getElementById("kabellaenge-de").value * 2;
    var verlustfaktor = document.getElementById("verlustfaktor-de").value / 100;
  } else if (sprache === 'en') {
    var stromstaerke = document.getElementById("maxstrom-en").value;
    var kabellaenge = document.getElementById("kabellaenge-en").value * 2;
    var verlustfaktor = document.getElementById("verlustfaktor-en").value / 100;
  }

  //Querschnittsberechnung nach DIN abhängig von den Eingabeparametern
  var querschnitt = (stromstaerke * widerstandKupferOhm * kabellaenge) / (verlustfaktor * 12); //12 für 12 Volt
  console.log(querschnitt);

  //Rundung der Ausgabe auf einen im Baumarkt erhältlichen Querschnitt
  if (querschnitt < 0.7) {
    rueckgabe = "0,75";
  } else if (querschnitt >= 0.7 && querschnitt < 1.4) {
    rueckgabe = "1,5";
  } else if (querschnitt >= 1.4 && querschnitt < 3.8) {
    rueckgabe = "4";
  } else if (querschnitt >= 3.8 && querschnitt < 5) {
    rueckgabe = "6";
  } else if (querschnitt >= 5 && querschnitt < 8) {
    rueckgabe = "10";
  } else if (querschnitt >= 8 && querschnitt < 14) {
    rueckgabe = "16";
  } else if (querschnitt >= 14 && querschnitt < 23) {
    rueckgabe = "25";
  } else if (querschnitt >= 23 && querschnitt < 33) {
    rueckgabe = "35";
  } else if (querschnitt >= 33 && querschnitt < 45) {
    rueckgabe = "50";
  } else if (querschnitt >= 45 && querschnitt < 65) {
    rueckgabe = "70";
  } else if (querschnitt >= 65 && querschnitt < 90) {
    rueckgabe = "95";
  } else if (querschnitt >= 90 && querschnitt < 145) {
    rueckgabe = "150";
  } else if (querschnitt >= 145 && querschnitt <= 290) {
    rueckgabe = "300";
  } else if (querschnitt > 290) {
    rueckgabe = "zugroßeEingabe";
  } else if (isNaN(querschnitt)) {
    rueckgabe = "error";
  }
  // Rückgabe des Querschnitts in der entsprechenden Sprache
  if (sprache === 'de') {
    if (rueckgabe === "zugroßeEingabe") {
      document.getElementById("berechnet-de").innerHTML = "Checke nochmal deine Eingaben, das " +
        "Ergebnis ist zu groß für einen geeigneten Kabelquerschnitt.";
    } else
      document.getElementById("berechnet-de").innerHTML = "Dein Kabelquerschnitt sollte mindestens " + rueckgabe + " mm betragen.";
    console.log("datenuebernahme-de");

  } if (sprache === 'en') {
    if (rueckgabe === "zugroßeEingabe") {
      document.getElementById("berechnet-en").innerHTML = "Check your inputs, the result is too large " +
        "for a suitable cable cross section.";
    } else
      document.getElementById("berechnet-en").innerHTML = "Your cable cross section should be at least " + rueckgabe + " mm.";
    console.log("datenuebernahme-en");
  }
  console.log(rueckgabe);
}