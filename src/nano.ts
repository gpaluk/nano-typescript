import { Stage } from "Display/Stage"
import { Color } from "Display/Color";
import { Sprite } from "Display/Sprite";

//TODO assign domElement via let root = document.querySelector("#nano-root");

let stage:Stage = Stage.init(800, 600, Color.RED, 30, true);

let sprite:Sprite = new Sprite();
sprite.image.src = "./assets/bunny.png";
stage.root.addChild(sprite);