var lbasket = 0;
var rbasket = 0;
var timer;
var current = 120000;
var scoreText;
var scoreText2;
var player1;
var player2;
var basketball;
var ground;
var left;
    var leftbackboard;
    var leftrim;
    var leftgoal;
var right;
    var rightbackboard;
    var rightrim;
    var rightgoal;
var zcounter = 0;
var ycounter = 0;
var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'StreetBall', { preload: preload, create: create, update: update, render: render});
function preload() {
game.load.spritesheet('Player1', 'assets/Mario.gif', 29.083, 29);
game.load.image('player2', 'assets/labron.gif');
game.load.image('ball', 'assets/basketball.gif');
game.load.image('background', 'assets/sky.jpg');
game.load.image('ground', 'assets/ground.gif');
game.load.image('hoopleft', 'assets/lefthoop.gif');
game.load.image('hoopright', 'assets/righthoop.gif');
game.load.image('Lbackboard', 'assets/lefthoop/backboard.gif')
game.load.image('Rbackboard', 'assets/righthoop/backboard.gif')
game.load.image('Lrim', 'assets/lefthoop/hoop.gif')
game.load.image('Rrim', 'assets/lefthoop/hoop.gif')
game.load.image('Lgoal', 'assets/lefthoop/goal.gif')
game.load.image('Rgoal', 'assets/lefthoop/goal.gif')
}	



function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.sprite(0,0,'background');
left = game.add.sprite(25,239,'hoopleft');
    leftbackboard = game.add.sprite(35,239,'Lbackboard');
    leftrim = game.add.sprite(97,303,'Lrim');
    leftgoal = game.add.sprite(43,303,'Lgoal');
right = game.add.sprite(1100,239,'hoopright');
    rightbackboard = game.add.sprite(1170,239,'Rbackboard');
    rightrim = game.add.sprite(1100,303,'Rrim');
    rightgoal = game.add.sprite(1100,303,'Rgoal');
ground = game.add.sprite(0,584,'ground');
basketball = game.add.sprite(game.world.centerX-35,30,'ball');
player1 = game.add.sprite(50, 480, 'Player1');
    
    player1.scale.x = 4;
    player1.scale.y = 4;
    player1.animations.add('idle',[6]);
    player1.animations.add('left',[0,1,2,3,4]);
    player1.animations.add('right',[8,9,10,11,12]);
    
player2 = game.add.sprite(1150, 480, 'player2');
game.physics.enable( [ basketball, player1, player2, ground, leftbackboard, rightbackboard, leftrim, rightrim, leftgoal, rightgoal], Phaser.Physics.ARCADE);

leftbackboard.body.immovable = true;
rightbackboard.body.immovable = true;
leftbackboard.body.allowGravity = false;
rightbackboard.body.allowGravity = false;
    
leftrim.body.immovable = true;
rightrim.body.immovable = true;
leftrim.body.allowGravity = false;
rightrim.body.allowGravity = false;
    
leftgoal.body.immovable = true;
rightgoal.body.immovable = true;
leftgoal.body.allowGravity = false;
rightgoal.body.allowGravity = false;
    
ground.body.immovable = true;
ground.body.allowGravity = false;
player1.body.gravity.set(0, 400);
player2.body.gravity.set(0,400);
basketball.body.gravity.set(0, 400);
basketball.body.bounce.set(.5);
player1.anchor.set(0.5);
player1.body.collideWorldBounds = true;
player2.anchor.set(0.5);
player2.body.collideWorldBounds = true;
basketball.body.collideWorldBounds = true;
    
scoreText = game.add.text(16, 16, 'score:' + rbasket, { fontSize: '32px', fill: '#000' });
scoreText2 = game.add.text(1000, 16, 'score:' + lbasket, { fontSize: '32px', fill: '#000' });
    
    timer = game.time.create(false);
    timer.add(120000, endgame, this);
    timer.start();
}



function update() {
    game.physics.arcade.collide(basketball, ground);
    game.physics.arcade.collide(ground, player1);
    game.physics.arcade.collide(ground, player2);
    game.physics.arcade.collide(player1, player2);
    game.physics.arcade.collide(leftbackboard, basketball);
    game.physics.arcade.collide(rightbackboard, basketball);
    game.physics.arcade.collide(leftrim, basketball);
    game.physics.arcade.collide(rightrim, basketball);
    player2.body.velocity.x = 0;
    player1.body.velocity.x = 0;
    if(zcounter == 0) {
        basketball.body.velocity.x = 0;
    }
    if(ycounter == 0 ) {
        basketball.body.velocity.x = 0;   
    }
   game.physics.arcade.overlap(basketball, rightgoal, Rscore, null, this);
    game.physics.arcade.overlap(basketball, leftgoal, Lscore, null, this);

    game.physics.arcade.overlap(player1, basketball, grabball, null, this);
    game.physics.arcade.overlap(player2, basketball, grabball2, null, this);
    normal2();
    normal();
}

 

function grabball(player1, basketball) {
    basketball.body.velocity.x = 0;
    basketball.body.gravity.y = 0;
    basketball.body.position.y = player1.body.position.y;
    zcounter = zcounter + 1;
     if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        basketball.body.velocity.x = -150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        basketball.body.velocity.x = 150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        basketball.body.velocity.y = -150; 
    }  
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
        shoot();
    }
}
    function grabball2(player2, basketball) {
    basketball.body.velocity.x = 0;
    basketball.body.gravity.y = 0;
    basketball.body.position.y = player2.body.position.y;
    ycounter = ycounter + 1;
     if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        basketball.body.velocity.x = -150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        basketball.body.velocity.x = 150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.G))
    {
        basketball.body.velocity.y = -150; 
    }  
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.H)) {
        shoot2();
    }
    
}



function normal() {
    player1.animations.play('idle',10,true);
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player1.body.velocity.x = -150;
        player1.animations.play('left',10,true);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player1.body.velocity.x = 150;
        player1.animations.play('right',10,true);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        player1.body.velocity.y = -150; 
    }
}

    function normal2() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        player2.body.velocity.x = -150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        player2.body.velocity.x = 150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        player2.body.velocity.y = -150; 
    }
}


function shoot() {
    if(zcounter != 0) {
        basketball.body.gravity.y = 180;
        basketball.body.velocity.x = 300;
        zcounter = zcounter - 1;
    }
}
    function shoot2() {
    if(ycounter != 0) {
        basketball.body.gravity.y = 180;
        basketball.body.velocity.x = -300;
        ycounter = ycounter - 1;
    }

}

function Lscore(basketball, leftgoal) {
    lbasket += 1;
    scoreText2.text = 'Mario Score: ' + lbasket;
   
 }
function Rscore(basketball, rightgoal) {
    rbasket += 1;
    scoreText.text = 'Koby Score: ' + rbasket;
}

function endgame() {
    if(lbasket>rbasket) {
           game.add.text(game.world.centerX-15, 16, 'Koby Wins', { fontSize: '32px', fill: '#000' });
    }
    if(rbasket>lbasket){
        game.add.text(game.world.centerX-15, 16, 'Mario Wins', { fontSize: '32px', fill: '#000' });
    }
    if(lbasket == rbasket) {
        game.add.text(game.world.centerX-300, 16, 'You are both terrible at this game!!!!', { fontSize: '32px', fill: '#000' });
    }
}

function render() {
game.debug.text("Time Remaining: " + timer.duration.toFixed(0), game.world.centerX+10, 20);   }