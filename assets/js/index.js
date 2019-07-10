var characters = [
  [],
  [],
  []
]
var enemies = [
  [],
  [],
  []
]

var components = []
var canvdim = [1600, 900]

var myGameArea = {
  canvas: document.getElementById('myCanvas'),
  start: function() {
    this.canvas.x = 0
    this.canvas.y = 0
    this.canvas.width = canvdim[0]
    this.canvas.height = canvdim[1]
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateGameArea, 1)
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function Component(width, height, color, x, y) {
  this.width = width
  this.height = height
  this.x = x
  this.y = y
  this.update = function() {
    var ctx
    ctx = myGameArea.context
    ctx.fillStyle = color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// characters[i] = [name, basehealth, health, baseattack, attackone, attacktwo, attackunlim, imagename, posx, posy, attackthree (optional), attackfour (optional), strengthened]
// attack* = [name, damage]

characters[0] = ['Hammer Guy', 200, 200, 'Sword', '10', 'Hammer Smash', '50', 'Lightning', '100', 'Slam Drop', '30', 'hammer-guy.png', 20, 20, false]
characters[1] = ['Magic Girl', 100, 100, 'Knife', '10', 'Icicle Launch', '40', 'Freeze', '70', 'Flash Blind', '20', 'magic-girl.png', 20, 70, false]
characters[2] = ['Heal Dude', 150, 150, 'Scalpel', '10', 'Organ Removal', '30', 'Scalpel Rain', '50', 'Scissor Attack', '20', 'heal-dude.png', 20, 120, false, 'Heal', '50', 'Give Strength', '50']

enemies[0] = ['Troll', 200, 200, 'Club', '10', 'Boulder Throw', '50', 'Ground Smash', '100', 'ogre.png', 110, 20]
enemies[1] = ['Goblin', 100, 100, 'Sword', '10', 'Fire Ball', '40', 'Burn', '70', 'goblin.png', 110, 70]
enemies[2] = ['Elf', 150, 150, 'Spear', '10', 'Bow', '30', 'Snare', '50', 'elf.png', 110, 120]

function updateGameArea() {
  myGameArea.clear()
  var i
  for (i = 0; i < components.length; i++) {
    components[i].update();
  }
}

function drawHealthBarArea(x, y) {
  var bottomy = y + 6
  var rightx = x + 31
  components.push(new Component(32, 1, 'black', x, y))
  components.push(new Component(1, 6, 'black', x, y))
  components.push(new Component(32, 1, 'black', x, bottomy))
  components.push(new Component(1, 6, 'black', rightx, y))
}

function drawHealthBar(x, y, basehealth, health) {
  healthpercent = (health / basehealth) * 100
  if (healthpercent > 74) {
    components.push(new Component((healthpercent / 100) * 30, 5, 'green', x + 1, y + 1))
  } else if (healthpercent > 24) {
    components.push(new Component((healthpercent / 100) * 30, 5, 'orange', x + 1, y + 1))
  } else if (healthpercent < 25) {
    components.push(new Component((healthpercent / 100) * 30, 5, 'red', x + 1, y + 1))
  }
}

function drawChars() {
  components = []
  for (var i = 0; i < characters.length; i++) {
    components.push(new Component(20, 20, 'green', characters[i][12], characters[i][13]))
    drawHealthBarArea(characters[i][12] - 6, characters[i][13] - 10)
    drawHealthBar(characters[i][12] - 6, characters[i][13] - 10, characters[i][1], characters[i][2])
  }
  for (var i = 0; i < enemies.length; i++) {
    components.push(new Component(20, 20, 'red', enemies[i][10], enemies[i][11]))
    drawHealthBarArea(enemies[i][10] - 6, enemies[i][11] - 10)
    drawHealthBar(enemies[i][10] - 6, enemies[i][11] - 10, enemies[i][1], enemies[i][2])
  }
  myGameArea.start()
}
drawChars()

function killChar(chartokill) {

}

function checkHealth() {
  for (var i = 0; i < characters.length; i++) {
    if (characters[i][2] < 1) {
      killChar(characters[i])
    } else {
      if (characters[i][2] > characters[i][1]) {
        characters[i][2] = characters[i][1]
      }
    }
  }
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i][2] < 1) {
      killChar(enemies[i])
    } else {
      if (enemies[i][2] > enemies[i][1]) {
        enemies[i][2] = enemies[i][1]
      }
    }
  }
  drawChars()
}

function attack(attacked, attacker, attacknum) {
  var attackedstarthealth = attacked[2]
  var attackstrength = 0
  if (attacknum == 0) {
    attackstrength = parseInt(attacker[4])
    if (Math.floor((Math.random() * 100) + 1) > 50) {
      attackstrength = 0
    }
  }
  if (attacknum == 1) {
    attackstrength = parseInt(attacker[6])
    if (Math.floor((Math.random() * 100) + 1) > 90) {
      attackstrength = 0
    }
  }
  if (attacknum == 2) {
    attackstrength = parseInt(attacker[8])
    if (Math.floor((Math.random() * 100) + 1) > 80) {
      attackstrength = 0
    }
  }
  if (attacknum == 3) {
    attackstrength = parseInt(attacker[10])
    if (Math.floor((Math.random() * 100) + 1) > 30) {
      attackstrength = 0
    }
  }
  if (attacker.length >= 14) {
    if (attacker[13] == true) {
      attackstrength = attackstrength + (attackstrength / 100 * 10)
    }
  }
  attacked[2] = attackedstarthealth - attackstrength
  checkHealth()
}

function support(supportnum, target) {
  if (supportnum == 0) {
    var healby = parseInt(characters[2][16])
    if (characters[2][13] == true) {
      healby = healby + (healby / 100 * 10)
    }
    target[2] = target[2] + healby
  }
  if (supportnum == 1) {
    target[13] == true
  }
  checkHealth()
}
