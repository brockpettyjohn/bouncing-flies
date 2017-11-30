const game = new Phaser.Game(960, 540, Phaser.AUTO)

const GameState = {
    preload: function () {
        game.load.image('background', 'assets/blue-background.jpg')
        game.load.image('firefly', 'assets/firefly.png')
        game.load.image('rhino', 'assets/rhino.png')
    },
    create: function () {
       

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true
        this.background = this.game.add.sprite(0, 0, 'background')
        this.firefly = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly2 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly3 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly4 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly5 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)

        this.game.physics.startSystem(Phaser.Physics.Arcade)
        this.game.physics.enable([this.firefly, this.firefly2, this.firefly3, this.firefly3, this.firefly4, this.firefly5], Phaser.Physics.ARCADE)
        this.game.physics.arcade.collide(this.firefly, this.firefly2, this.firefly3, this.firefly4, this.firefly5)
        bounceHouse(this.firefly)
        bounceHouse(this.firefly2)
        bounceHouse(this.firefly3)
        bounceHouse(this.firefly4)
        bounceHouse(this.firefly5)
    },
    update: function () {
       
        this.game.physics.arcade.collide(this.firefly, this.firefly2);
        this.game.physics.arcade.collide(this.firefly, this.firefly3);
        this.game.physics.arcade.collide(this.firefly, this.firefly4);
        this.game.physics.arcade.collide(this.firefly, this.firefly5);
        this.game.physics.arcade.collide(this.firefly2, this.firefly3);
        this.game.physics.arcade.collide(this.firefly2, this.firefly4);
        this.game.physics.arcade.collide(this.firefly2, this.firefly5);
        this.game.physics.arcade.collide(this.firefly3, this.firefly4);
        this.game.physics.arcade.collide(this.firefly3, this.firefly5);
        this.game.physics.arcade.collide(this.firefly4, this.firefly5);
    }
}

function placeSprite(x, y, name, scale = 1, anchor = .5) {
    var sprite = game.add.sprite(x, y, name)
    sprite.scale.setTo(scale)
    sprite.anchor.setTo(anchor)
    return sprite
}

function bounceHouse(name) {
    name.body.velocity.setTo(50, 50);
    name.body.collideWorldBounds = true;
    name.body.bounce.setTo(1, 1)
}

game.state.add('GameState', GameState)
game.state.start('GameState')