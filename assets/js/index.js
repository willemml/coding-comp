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
var canvdim = [720, 480]

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
  this.update = function() {
    var ctx
    ctx = myGameArea.context
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }
}

function Text(font, text, color, x, y, center) {
  this.update = function() {
    var ctx
    ctx = myGameArea.context
    ctx.font = font
    if (center == true) {
      ctx.textAlign = 'center'
    } else {
      ctx.textAlign = 'start'
    }
    ctx.fillText(text, x, y)
  }
}

// characters[i] = [name, basehealth, health, baseattack, attackone, attacktwo, attackunlim, imagename, posx, posy, attackthree (optional), attackfour (optional), strengthened]
// attack* = [name, damage]

characters[0] = ['Hammer Guy', 200, 200, 'Sword', '10', 'Hammer Smash', '50', 'Lightning', '100', 'Slam Drop', '30', 'hammer-guy.png', 30, 50, false]
characters[1] = ['Magic Girl', 100, 100, 'Knife', '10', 'Icicle Launch', '40', 'Freeze', '70', 'Flash Blind', '20', 'magic-girl.png', 30, 150, false]
characters[2] = ['Heal Dude', 150, 150, 'Scalpel', '10', 'Organ Removal', '30', 'Scalpel Rain', '50', 'Scissor Attack', '20', 'heal-dude.png', 30, 250, false, 'Heal', '50', 'Give Strength', '50']

enemies[0] = ['Troll', 200, 200, 'Club', '10', 'Boulder Throw', '50', 'Ground Smash', '100', 'ogre.png', 300, 50]
enemies[1] = ['Goblin', 100, 100, 'Sword', '10', 'Fire Ball', '40', 'Burn', '70', 'goblin.png', 300, 150]
enemies[2] = ['Elf', 150, 150, 'Spear', '10', 'Bow', '30', 'Snare', '50', 'elf.png', 300, 250]

function updateGameArea() {
  myGameArea.clear()
  var i
  for (i = 0; i < components.length; i++) {
    components[i].update();
  }
}

function drawHealthBarArea(x, y) {
  var healthbarareawidth = 62
  var healthbarareaheight = 9
  var bottomy = y + healthbarareaheight
  var rightx = x + healthbarareawidth - 1
  components.push(new Component(healthbarareawidth, 1, 'black', x, y))
  components.push(new Component(1, healthbarareaheight, 'black', x, y))
  components.push(new Component(healthbarareawidth, 1, 'black', x, bottomy))
  components.push(new Component(1, healthbarareaheight, 'black', rightx, y))
}

function drawHealthBar(x, y, basehealth, health) {
  var healthbarwidth = 60
  var healthbarheight = 8
  healthpercent = (health / basehealth) * 100
  if (healthpercent > 74) {
    components.push(new Component((healthpercent / 100) * healthbarwidth, healthbarheight, 'green', x + 1, y + 1))
  } else if (healthpercent > 24) {
    components.push(new Component((healthpercent / 100) * healthbarwidth, healthbarheight, 'orange', x + 1, y + 1))
  } else if (healthpercent < 25) {
    components.push(new Component((healthpercent / 100) * healthbarwidth, healthbarheight, 'red', x + 1, y + 1))
  }
}

function drawChars() {
  components = []
  var displacement = [160, 50] // [x, y]
  for (var i = 0; i < characters.length; i++) {
    components.push(new Component(50, 50, 'green', characters[i][12] + displacement[0], characters[i][13] + displacement[1]))
    drawHealthBarArea(characters[i][12] - 6 + displacement[0], characters[i][13] - 14 + displacement[1])
    drawHealthBar(characters[i][12] - 6 + displacement[0], characters[i][13] - 14 + displacement[1], characters[i][1], characters[i][2])
  }
  for (var i = 0; i < enemies.length; i++) {
    components.push(new Component(50, 50, 'red', enemies[i][10] + displacement[0], enemies[i][11] + displacement[1]))
    drawHealthBarArea(enemies[i][10] - 6 + displacement[0], enemies[i][11] - 14 + displacement[1])
    drawHealthBar(enemies[i][10] - 6 + displacement[0], enemies[i][11] - 14 + displacement[1], enemies[i][1], enemies[i][2])
  }
  myGameArea.start()
}
drawChars()

function checkHealth() {
  for (var i = 0; i < characters.length; i++) {
    if (characters[i][2] < 1) {
      characters[i][2] = 0
    } else {
      if (characters[i][2] > characters[i][1]) {
        characters[i][2] = characters[i][1]
      }
    }
  }
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i][2] < 1) {
      enemies[i][2] = 0
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

function enemyAttack() {
  Math.floor((Math.random() * 3))
}
