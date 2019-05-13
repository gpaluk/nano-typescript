import { Stage } from "Display/Stage"
import { Color } from "Display/Color";
import { Sprite } from "Display/Sprite";
import { BlendMode } from "Display/BlendMode";

//TODO assign domElement via let root = document.querySelector("#nano-root");

let clearColor:Color = new Color(0.3, 0.6, 0.9, 1);
let stage:Stage = Stage.init(800, 600, clearColor, 30, true);

let sprite:Sprite = new Sprite();
sprite.blendMode = BlendMode.DARKEN;
sprite.smoothing = false;
sprite.graphics.fillStyle = '#0000FF';
sprite.graphics.fillRect(0, 0, 50, 50);
sprite.rotate((Math.PI / 180) * 50);
sprite.scale(2, 2);
sprite.translate(150, 100);
sprite.image.src = "./assets/bunny.png";
sprite.rotationSpeed = 1;

stage.root.addChild(sprite);