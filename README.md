# Crayon
A light weight game engine to create game on canvas using JavaScript<br/><br/>
[Sprite Support and Background](../../tree/110f6e95ebf5794fc69feea9b39a933364996c95)<br/><br/>
<img src="https://github.com/devanshugarg1994/Crayon/blob/master/Docs/BG.png" />
<br/><br/>

[Layering](../../tree/a4c70cd1b39b82dec59546dbdc87d20db11e9a82)<br/><br/>

<img src="https://github.com/devanshugarg1994/Crayon/blob/master/Docs/Layers.png" />
<br/><br/>

[Timing and frameRate](../../tree/9ebc3e740c2b0caaf2c8c4a77d9b216667054de4)<br/>

Here we have create a class Timer which will take care of the framerate of the game running on diffrent machine with different refresh rate.
Also We have abstratcted the update method and requestanimationframe into class Timer
Now just have to mentioned the changes and call start to render and update the game.
