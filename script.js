/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

const veldBreedte = 1280;
const veldHoogte = 720;
const aantalBalletjes = 5;
var balletjes = [];


var nextID = 0;

class Balletje {
  constructor() {
    this.x = random(100,veldBreedte - 100);
    this.y = random(100,veldHoogte - 100);
    this.snelheidX = random(5,6);
    this.snelheidY = random(5,6);
    this.straal = random(50,100);
    this.kleur = [random(0,255),random(0,255),random(0,255)];
    this.id = nextID++;
  }

  update() {
    // collison met randen
    var collideOnder = collideLineCircle(0,veldHoogte,veldBreedte,veldHoogte,this.x,this.y,this.straal);
    var collideBoven = collideLineCircle(0,0,veldBreedte,0,this.x,this.y,this.straal);
    if(collideOnder || collideBoven) {
      this.snelheidY = -this.snelheidY;
    }

    var collideLinks = collideLineCircle(0,0,0,veldHoogte,this.x,this.y,this.straal);
    var collideRechts = collideLineCircle(veldBreedte,0,veldBreedte,veldHoogte,this.x,this.y,this.straal);
    if(collideLinks || collideRechts) {
      this.snelheidX = -this.snelheidX;
    }
    
    // collison met andere bal
    var collide = false;
    var x = this.x;
    var y = this.y;
    var straal = this.straal;
    var id = this.id;
    balletjes.forEach(function(b) {
      if(collideCircleCircle(x,y,straal,b.x,b.y,b.straal) && b.id !== id) {
        collide = true;
      }
    })
    if(collide) {
      this.snelheidX = -this.snelheidX;
      this.snelheidY = -this.snelheidY;
      console.log("Collide");
    }

    // balletje laten bewegen elk frame
    this.x += this.snelheidX;
    this.y += this.snelheidY;

  }

  teken() {
    fill(this.kleur[0],this.kleur[1],this.kleur[2]);
    ellipse(this.x,this.y,this.straal,this.straal);
  }

}

// function balletjeToevoegen() {
//   var x = random(0,veldBreedte);
//   var y = random(0,veldHoogte);
//   var snelheidX = random(1,4);
//   var snelheidY = random(1,4);
//   balletjes.push([x,y,snelheidX,snelheidY]);
// }

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(veldBreedte, veldHoogte);

  for(var i = 0;i < aantalBalletjes; i++) {
    let balletje = new Balletje();
    balletjes.push(balletje);
  }
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // stel vulkleur in
  fill("yellow");

  // teken een cirkel
  ellipse(50,50,80,80);

  background('blue');

  balletjes.forEach(function(balletje) {
    balletje.update();
    balletje.teken();
  });
}
