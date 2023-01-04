// Funktionen für das Ausklappen der Menüleiste
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

var mediaqu = window.matchMedia("(max-width: 1200px)") // Breite bei der umgesprungen werden soll
responsive(mediaqu)
mediaqu.addListener(responsive) // addListener hinzufügen

function responsive(mediaqu) {
  if (mediaqu.matches) { // Wenn die Mediaqueries mit der Seitenbreite übereinstimmen
    navig.style.display = "none";
  } else {
    navig.style.display = "block";
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
      spracheEn[i].style.display = "none";
      buttonEn.style.fontWeight = "500";
    }
  }

  for (let i = 0; i < spracheDe.length; i++) {
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

// Einfaden der Elemente, wenn sie auf dem Bildschirm angezeigt werden
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

const boxenEinfaden = document.querySelectorAll(" .impr-text, .bild, .text, .boxen, .untereinander-bild-text, .h2-p-box, .eingabe, .zitat");
boxenEinfaden.forEach((element) => observer.observe(element));

// Berechnung des Kabelquerschnitts
function datenuebernahme(sprache) {
  console.log("script datenübernahme");
  var widerstandKupferOhm = 0.0175;
  var rueckgabe = "";

  if (sprache === 'de') {
    var stromstaerke = document.getElementById("maxstrom-de").value;
    var kabellaenge = document.getElementById("maxstrom-de").value * 2;
    var verlustfaktor = document.getElementById("verlustfaktor-de").value / 100;
  } else if (sprache === 'en') {
    var stromstaerke = document.getElementById("maxstrom-en").value;
    var kabellaenge = document.getElementById("kabellaenge-en").value * 2;
    var verlustfaktor = document.getElementById("verlustfaktor-en").value / 100;
  }
  
  var querschnitt = (stromstaerke * widerstandKupferOhm * kabellaenge) / (verlustfaktor * 12);
  console.log(querschnitt);

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
  } else if (querschnitt >= 8 && querschnitt < 143) {
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
    rueckgabe = "xxx";
  }

  if (sprache === 'de') {
    document.getElementById("berechnet-de").innerHTML = "Dein Kabelquerschnitt sollte mindestens " + rueckgabe + " mm betragen.";
    console.log("datenuebernahme-de");
    if (querschnitt > 290) {
      document.getElementById("berechnet-de").innerHTML = "Checke nochmal deine Eingaben, das " +
        "Ergebnis ist zu groß für einen geeigneten Kabelquerschnitt.";
    }
  } else if (sprache === 'en') {
    document.getElementById("berechnet-en").innerHTML = "Your cable cross section should be at least " + rueckgabe + " mm.";
    console.log("datenuebernahme-en");
    if (querschnitt > 290) {
      document.getElementById("berechnet-en").innerHTML = "Check your inputs, the result is too large " +
        "for a suitable cable cross section.";
    }
  }
  console.log(rueckgabe);
}