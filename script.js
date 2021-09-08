/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

const veldBreedte = 1280;
const veldHoogte = 720;
const aantalBalletjes = 5;
var balletjes = [];

function randomNummer(o,b) {
  return Math.floor(Math.random() * (b - o + 1) + o);
}

function balletjeToevoegen() {
  var x = randomNummer(0,veldBreedte);
  var y = randomNummer(0,veldHoogte);
  var snelheidX = randomNummer(1,4);
  var snelheidY = randomNummer(1,4);
  balletjes.push([x,y,snelheidX,snelheidY]);
}

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(veldBreedte, veldHoogte);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  for(var i = 0;i < aantalBalletjes; i++) {
    balletjeToevoegen();
  }
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // stel vulkleur in
  fill(100, 100, 255);

  // teken een cirkel
  ellipse(50,50,80,80);

  balletjes.forEach(function(arr) {
    ellipse(arr[0],arr[1],80,80);
    arr[0] += arr[2];
    arr[1] += arr[3];
  });
}