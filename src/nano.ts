import { Stage } from "Display/Stage"
import { Color } from "Display/Color";
import { Sprite } from "Display/Sprite";
import { BlendMode } from "Display/BlendMode";

//TODO assign domElement via let root = document.querySelector("#nano-root");

let clearColor:Color = new Color(0.3, 0.6, 0.9, 1);
let stage:Stage = Stage.init(800, 600, clearColor, 30, true);

let sprite:Sprite = new Sprite();
sprite.blendMode = BlendMode.COLOR_BURN;
sprite.alpha = 0.5;
sprite.smoothing = false;
sprite.graphics.fillStyle = '#FF00FF';
sprite.graphics.fillRect(0, 0, 100, 100);
sprite.rotate((Math.PI / 180) * 50);
sprite.scale(.5, .5);
sprite.translate(300, 300);
sprite.image.src = "./assets/bunny.png";
sprite.mask.src = "./assets/star.png";
sprite.tint = new Color(1, 0, 0, .8);
sprite.rotationSpeed = 1;
stage.root.addChild(sprite);