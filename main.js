const mainState = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the images and sounds
  },

  create: function() {
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.
  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    // Task 1
  },

  jump: function() {
    // Task 3
    // Task 5
  },

  restartGame: function() {
    // Task 2
  },
  addOnePipe: function(x, y) {},

  addRowOfPipes: function() {
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Task 4
  }
};

// Initialize Phaser, and create a 400px by 490px game
const game = new Phaser.Game(400, 490);

game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main");
