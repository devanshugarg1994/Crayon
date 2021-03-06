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

[Level Class and Refactor](../../tree/381677ed31d640e866c48e87033de39ada91bea0)<br/><br/>

[Collision](../../tree/7aafc822ed6fb121f1826c04ebb6471471babd44)<br/>
We have create 2 classes TIleCollider and TileResolver <br/>
TileResolver : contain function that connvert or map position into scene matrix indexes and vice versa.<br/>
TileCollider : Contain TileResolver instance as a data member and logic of collision.<br/>
Level contain TileCollider instance as data memeber and check for collision for evey frame.<br/><br/>

[Collision Optimize and Refactor](../../tree/66d6b24860ad27d7126ef365be8e5cd99cdb376f)<br/>
Now we will only check boder of entity (mario) for collision.<br/>

[Camera](../../tree/98ef68f066d872b97e7ad9ec170ccd962e24024c)<br/>
Added Camera component. Camera is just component which determine the position on the canvas of other component to be darwn like background ,entity (mario). <br/>
When camera shift we just shift the position of other component accordingly.
<br/>

[JSON Restructure and Spriteloader Refactor](../../tree/b69ea8fe92bf7ed4a02c51fd53ebc86bb066ee76)<br/>
JSON is restructured to store the data more efficiently.<br/>
A utility function to load spriteSheet which take basic information from JSON
<br/>

[Scrolling X-axis](../../tree/d0bba6891d8b7ac9893ffc4578d2d2403dff3712)<br/>
We have taken 16 pixel buffer. We render the scene and when camera is moved we check the index (map with matrix)
and use the new indexes to update the scene buffer.<br/>
When we update scene Buffer we change x co-ordinate such that every time tile are drawn from (0, 0) on scene buffer, then this scene buffer is render on the screen on draw call.<br/>
When we draw the scene Buffer on screen we check for camera position. if it become more than mod 16 we free the buffer part which is not visible and this part is used to draw the new (upcoming) tiles.
<br/>

[Basic Animation](../../tree/4d3e6beb220ff3ca9200a1d8d334ad77271ea850)<br/>
Created a function which return the callback which when called(callback) return the frame (of the animation)
depending on the timeElapsed in the game(level.TotalTime) or distance cover by character(in case of mario).
<br/>

[Mario Drag and it's Animation](../../tree/1e3a3fe47a37717ec50c077dec873d44f6657e4a)<br/>
We have change mario constant speed on button press with a acceleration from 0 speed. We are dragging the mario on every
update call which depend on the speed.
Also A break frame is also added when mario instantaneously change it's direction. 
<br/>

[Mario Mechanics](../../tree/61b297b11f3c11ca9f3bcbbb2031d263b8ffc767)<br/>
Mario Jump Improve
<br/>


[Background Layering](../../tree/e4d6b667fc14c7218fd43f5f5df1f0b69dd0604d)<br/>
Till now we are rendering and calculating collision in a single layer<br/>
Now we have break the rendering into multi layer system<br/>
For collision we store the data of all layer in a single matrix  then check for collision.
<br/>

[Refactor createMario function](../../tree/3cd71b470613691344dc6dd738ea767e81414df0)<br/>
We have separated
Loading of spriteSheet and creation of entites which are asynchronous earlier. Now creation of entites are now synchronous as now thenable return a function which is used in script to create the object(entities).<br/>
Loading of sprite is still asynchronous.<br/>
Refactor createMario function.

<br/>

[Koopa and Goomba entity added](../../tree/32ad405bc21571bf914ace36ebcd0779889804a8)<br/>
We have added Koopa and Goomba entity. Both entities have `pendulumWalk` trait.

<br/>


[Bounding Box](../../tree/260db2f60bc85874177477b60dee5f1deb445ec7)<br/>
We have added bounds which are updated when collision happen.<br/>
Earlier we are updating entity(mario) position when we are checking for collision.<br/>
But now we are updating the bounds<br/>
Here BoundingBox take care us of the position, size of entity and the offset. 
<br/>

[Bounding Box2](../../tree/6547a5ea3270cc80401e87dde7d4c7ef2ace6ef2)<br/>
Fix some errors
<br/>

[Factory created for creation of entites](../../tree/3041d43dc48b01d50561ef61d82cba35a145b3f9)<br/>
Created Factory which will create the entity<br/>
Creation of entity include loading of spritesheet and ceartion of ib=nstance of the entity and setting property.
<br/>
A function is return by the promise which now can craete entity by using key(entity name). 
<br/>

[Mario Goomba Interaction](../../tree/c2b170096e83d3f5a6ca1ab5afd018561f3833d4)<br/>
We have include killable trait and collision effect between mario and goomba.
<br/>
Animation of goomba are updated and even killed when mario and goomb interact.  
<br/>

[Player Controller](../../tree/60a3002d270512b9a6e252c16716fd22d96839ab)<br/>
When mario die we need to revive it. For that we need a controller which will handle the inclusion of mario again in GameScene.<br/>
Player controller control the inclusion and position of enity when the scene start.
<br/>

[Koopa Intreaction](../../tree/44d5de163ac224a71c84b75d01cedc0995d51341)<br/>
Koopa has multiple state on which the intreaction depends.<br/>

<br/>

[Queue Task](../../tree/8206376a20f2ce7d913d61d59ede10106ac0a4c1)<br/>
There are certain task that need to be formed at the end of update cycle<br/>
But all these are spread across many classes and function. So we enqueue these task in a array `tasks' and excute these at the end of updation cycle.
<br/>

[Solid and  Physics](../../tree/91f6284e4e5a2b6800225e140dce13a0ecef6d49)<br/>
We have created 2 traits which control the the physics and collision of entity wih the enviornment.
Physics tarit check the coliision and provide gravity to entity.<br/>
Solid tarit check the collision with enviornment. Disabling this trait will make entity non-intreative with surrounding.
<br/>

[Game Presentation](../../tree/02599f20cc83fb99153a93322d4350527f1f4f24)<br/>
<img src="https://github.com/devanshugarg1994/Crayon/blob/master/Docs/GamePresenatation.png" />
<br/>
Game rendering is pixlated(using CSS propety) and  cover 100% of view port. Game is centred w.rt. screen.
<br/>


[Refator Layer.js](../../tree/df58d23e092472ac5afb82769e72778520f53ac4)<br/>
<br/>
Break Layer.js into multiple files
<br/>

[Font](../../tree/ae62501ec77d9ec9837dcbd07fc9a175a107e9e1)<br/>
<br/>
Added Dashboad.js that handle the rendering of dashBoard on screen.<br/>
We have loader function function to load fond and map the sprite with text in it with aprropriate frame size and position

<br/>



