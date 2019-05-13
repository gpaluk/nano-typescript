import { Stage } from "Display/Stage"
import { Color } from "Display/Color";
import { Sprite } from "Display/Sprite";

//TODO assign domElement via let root = document.querySelector("#nano-root");

let clearColor:Color = new Color(0.3, 0.6, 0.9, 1);
let stage:Stage = Stage.init(800, 600, clearColor, 30, true);

let sprite:Sprite = new Sprite();
sprite.graphics.fillStyle = '#FFFF00';
sprite.graphics.fillRect(0, 0, 50, 50);
sprite.x = 100;
sprite.y = 50;

stage.root.addChild(sprite);