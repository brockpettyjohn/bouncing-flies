const game = new Phaser.Game(960, 540, Phaser.AUTO)

const GameState = {
    preload: function () {
        game.load.image('background', 'assets/blue-background.jpg')
        game.load.image('firefly', 'assets/firefly.png')
        game.load.image('banana', 'assets/banana.jpg')
        game.load.image('apple', 'assets/apple.jpg')
        game.load.image('grape', 'assets/grape.jpg')
        game.load.image('orange', 'assets/orange.jpg')
        game.load.image('strawberry', 'assets/strawberry.jpg')
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true
        this.background = this.game.add.sprite(0, 0, 'background')
        this.firefly = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly.inputEnabled = true
        this.firefly.input.onHold = true
        this.firefly.events.onInputDown.add(() => {this.flyAway(fireflyObj, this.firefly)}, this)
        this.firefly2 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly3 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly4 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)
        this.firefly5 = placeSprite(this.game.world.randomX, this.game.world.randomY, 'firefly', .15, .5)

        const fireflyObj = [{
            name: this.firefly
        },
        {
            name: this.firefly2
        },
        {
            name: this.firefly3
        },
        {
            name: this.firefly4
        },
        {
            name: this.firefly5
        }]

        this.game.physics.startSystem(Phaser.Physics.Arcade)
        this.game.physics.enable([this.firefly, this.firefly2, this.firefly3, this.firefly3, this.firefly4, this.firefly5], Phaser.Physics.ARCADE)
        this.game.physics.arcade.collide(this.firefly, this.firefly2, this.firefly3, this.firefly4, this.firefly5)
        bounceHouse(fireflyObj)

        this.firefly.addChild(makeChild(0, 0, 'banana', 1.25))
        this.firefly2.addChild(makeChild(0, 0, 'apple', 1.25))
        this.firefly3.addChild(makeChild(0, 0, 'orange', 1.25))
        this.firefly4.addChild(makeChild(0, 0, 'grape', 1.25))
        this.firefly5.addChild(makeChild(0, 0, 'strawberry', 1.25))
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
    },
    flyAway: function (arr, clickedFirefly) {
        
        arr.map(element => {
            console.log(element.name)
            element.name.body.velocity.setTo(0)
            if(element.name != clickedFirefly){
                const laterGator = game.add.tween(element.name)
                laterGator.to({y: -550 - element.name.height}, 500)
                laterGator.start()
                element.name.body.collideWorldBounds = false;
            }
        });
    }
}

function placeSprite(x, y, name, scale = 1, anchor = .5) {
    var sprite = game.add.sprite(x, y, name)
    sprite.scale.setTo(scale)
    sprite.anchor.setTo(anchor)
    return sprite
}

function makeChild(x, y, name, scale = 1) {
    var childSprite = game.make.sprite(x, y, name)
    childSprite.scale.setTo(scale)
    childSprite.anchor.setTo(.5, 0)
    return childSprite
}

function bounceHouse(arr) {
    arr.map(element => {
        element.name.body.velocity.setTo(75, 75);
        element.name.body.collideWorldBounds = true;
        element.name.body.bounce.setTo(1, 1)
    })
    
}



game.state.add('GameState', GameState)
game.state.start('GameState')