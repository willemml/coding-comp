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

// characters[i] = [name, basehealth, health, baseattack, attackone, attacktwo, attackunlim, imagename, posx, posy, attackthree (optional), attackfour (optional), strengthened]
// attack* = [name, damage]

characters[0] = ['Hammer Guy', 200, 200, 'Sword', '10', 'Hammer Smash', '50', 'Lightning', '100', 'Slam Drop', '30', 'hammer-guy.png', 30, 50, false]
characters[1] = ['Magic Girl', 100, 100, 'Knife', '10', 'Icicle Launch', '40', 'Freeze', '70', 'Flash Blind', '20', 'magic-girl.png', 30, 150, false]
characters[2] = ['Heal Dude', 150, 150, 'Scalpel', '10', 'Organ Removal', '30', 'Scalpel Rain', '50', 'Scissor Attack', '20', 'heal-dude.png', 30, 250, false, 'Heal', '50', 'Give Strength', '50']

enemies[0] = ['Troll', 200, 200, 'Club', '10', 'Boulder Throw', '50', 'Ground Smash', '100', 'ogre.png', 300, 50]
enemies[1] = ['Goblin', 100, 100, 'Sword', '10', 'Fire Ball', '40', 'Burn', '70', 'goblin.png', 300, 150]
enemies[2] = ['Elf', 150, 150, 'Spear', '10', 'Bow', '30', 'Snare', '50', 'elf.png', 300, 250]

function setHealthBars() {
  for (var i = 0; i < characters.length; i++) {
    var healthpercent = characters[i][2] / characters[i][1] * 100
    var color = ''
    if (healthpercent > 74) {
      color = 'green'
    } else if (healthpercent < 75) {
      color = 'orange'
    } else if (healthpercent < 25) {
      color = 'red'
    }
    healthpercent += '%'
    $('#char' + i + 'hbart').html(characters[i][2] + '/' + characters[i][1])
    $('#char' + i + 'hbar').attr('style', 'background-color:' + color + ';width:' + healthpercent)
  }
  for (var i = 0; i < enemies.length; i++) {
    var healthpercent = (enemies[i][1] * 100) / enemies[i][2]
    var color = ''
    if (healthpercent > 74) {
      color = 'green'
    } else if (healthpercent < 75) {
      color = 'orange'
    } else if (healthpercent < 25) {
      color = 'red'
    }
    healthpercent += '%'
    $('#en' + i + 'hbart').html(characters[i][2] + '/' + characters[i][1])
    $('#en' + i + 'hbar').attr('style', 'background-color:' + color + ';width:' + healthpercent)
  }
}
setHealthBars()

function setPlayerNames() {
  for (var i = 0; i < characters.length; i++) {
    $('#char' + i + 'name').html(characters[i][0])
  }
  for (var i = 0; i < characters.length; i++) {
    $('#en' + i + 'name').html(enemies[i][0])
  }
}
setPlayerNames()

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
  setHealthBars()
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
