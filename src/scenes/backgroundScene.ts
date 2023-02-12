import {config} from "../game";
import Particle = Phaser.GameObjects.Particles.Particle;

export default class BackgroundScene extends Phaser.Scene {
    static readonly SCENE_KEY = 'BACKGROUND_SCENE';
    private _background: Phaser.GameObjects.Shader;


    constructor() {
        super(BackgroundScene.SCENE_KEY);
    }

    get background(): Phaser.GameObjects.Shader {
        return this._background;
    }

    set background(value: Phaser.GameObjects.Shader) {
        this._background = value;
    }

    preload() {
        this.load.glsl('stars', 'assets/shaders/galaxy.frag');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    }

    create() {
        this._background = this.add.shader('stars', 0, 0, config.width, config.height).setOrigin(0);
        this.scene.launch('MAIN_SCENE');
    }

    update() {
        this.input.on('pointermove', function (pointer) {
            this.particles.setPosition(pointer.x, pointer.y);
        }, this);
    }

}
