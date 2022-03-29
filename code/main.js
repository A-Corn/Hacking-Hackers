import kaboom from "kaboom"

// initialize context
kaboom({
  background: [70, 92, 122],
  width: 320,
  height: 240,
  scale: 2,
});

// load assets
loadRoot("sprites/");
loadAseprite("player", "HuntressMoves.png", "HuntressMoves.json");
loadAseprite("enemy", "EvilWizardMoves.png", "EvilWizardMoves.json");


// This start scene is where the start menu is located.
scene("start", () => {
  add([
    text("Press enter to start", { size: 24 }),
    pos(vec2(160, 120)),
    origin("center"),
    color(255, 255, 255),
  ]);

  onKeyRelease("enter", () => {
    go("game");
  })
});

go("start");

// This game scene is where the game is located. 
scene("game", () => {

  // layers() allows each item to go on their designated layer to avoid problems with collision. 
  layers([
    "bg",
    "game",
    "ui",
  ], "game");

  // This is where we generate the player character in the game.
  // loadSpriteAtlas("HuntressMoves.png", "HuntressMoves.json")

  const player = add([
    sprite("player"),
    pos(10, 48),
    area(),
    body(),
    layer("game"),
    state("Idle", ["Attack2", "Attack3", "Death", "Idle", "Jump", "Run", "TakeHit"]),
  ])

player.onStateUpdate("jump", () => {
  player.play("Jump");
  player.jump()
})


  player.onGround(() => {
    player.play("Idle");
  })

  // add platform
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(1),
    area(),
    solid(),
    color(127, 200, 255),
    layer("game"),
  ])

    //Define Gravity
    gravity(3400);
    
  //movement controls
  const SPEED = 120;
  
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      // player.enterState("jump")
        player.play("Jump");
        player.jump()
    }
  });
    // Player Attack
 
    // Player Movement
  const movePlayer = (isLeft) => {
    const multiplier = isLeft ? -1 : 1;
    player.flipX(isLeft);
    if (player.isGrounded) {
      player.enterState("Run")
    }
    player.move(SPEED * multiplier, 0);
  }
  
  onKeyDown("right", () => {
    movePlayer(false);
  });

  onKeyDown("left", () => {
    movePlayer(true);
  });

});

  // Custom functions will go here.