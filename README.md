# Implementing Flappy-bird in Phaser.js

## What is Phaser.js?

Phaser is a free, open source, and awesome framework to make games playable in any web browser.

## Bird

Let's first focus on adding a bird to the game that will jump when we press the spacebar key. We will make changes in **main.js**

```javascript
{
preload: function() {
    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png');
},

create: function() {
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
},
}
```

### Task 1

If the bird is out of the screen (too high or too low) call the 'restartGame' function in **update()**.

### Task 2

Start the 'main' state, which restarts the game in **restartGame()**.

### Task 3

Make the bird jump. Add a vertical velocity to the bird in **jump()**. (Use velocity.y on bird).

Test it :)

## The Pipes

Load pipe sprite in **preload()**.

```javascript
this.pipes = game.add.group();
```

Create an empty group in **create()**.

```javascript
game.load.image("pipe", "assets/pipe.png");
```

For **addOnePipe(x,y)**:

```javascript
// Create a pipe at the position x and y
var pipe = game.add.sprite(x, y, "pipe");

// Add the pipe to our previously created group
this.pipes.add(pipe);

// Enable physics on the pipe
game.physics.arcade.enable(pipe);

// Add velocity to the pipe to make it move left
pipe.body.velocity.x = -200;

// Automatically kill the pipe when it's no longer visible
pipe.checkWorldBounds = true;
pipe.outOfBoundsKill = true;
```

For **addRowOfPipes**:

```javascript
addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1)
            this.addOnePipe(400, i * 60 + 10);
},
```

## Calling the function for pipe creation

To actually add pipes in our game we need to call the **addRowOfPipes()** function every 1.5 seconds. We can do this by adding a timer in the **create()** function.

```javascript
this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
```

## Scoring

We add this in the **create()** function to display the score in the top left.

```javascript
this.score = 0;
this.labelScore = game.add.text(20, 20, "0", {
  font: "30px Arial",
  fill: "#ffffff"
});
```

### Task 4

Modify **addRowOfPipes()** to increase the score by 1 each time new pipes are created. (**this.labelScore.text**)

## Collisions

Enable collisions in **update()**

```javascript
game.physics.arcade.overlap(
  this.bird,
  this.pipes,
  this.restartGame,
  null,
  this
);
```

Test it :)

## Sounds

Load sound in **preload()**

```javascript
game.load.audio("jump", "assets/jump.wav");
```

Add the sound in the game by putting in **create()**:

```javascript
this.jumpSound = game.add.audio("jump");
```

### Task 5

Modify code to play sound on every jump.
(use **play()**)

Test it :)
