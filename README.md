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
<br><br>

[KeyBoardInput and Traits](../../tree/dc47bebf8f5c80a7fe9dcc11da0c15f9606eb00b)<br/>

<img src="https://github.com/devanshugarg1994/Crayon/blob/master/Docs/Jump.png" /><br/>

[Level Class and Refactor](../../tree/381677ed31d640e866c48e87033de39ada91bea0)<br/>
[Collision](../../tree/7aafc822ed6fb121f1826c04ebb6471471babd44)<br/>
We have create 2 classes TIleCollider and TileResolver <br/>
TileResolver : contain function that connvert or map position into scene matrix indexes and vice versa.<br/>
TileCollider : Contain TileResolver instance as a data member and logic of collision.<br/><br/>
Level contain TileCollider instance as data memeber and check for collision for evey frame.
[Collision Optimize and Refactor](../../tree/66d6b24860ad27d7126ef365be8e5cd99cdb376f)<br/>
Now we will only check boder of entity (mario) for collision.



