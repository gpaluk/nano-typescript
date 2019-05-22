import {Pool} from 'Utils/Pool'
import {EventDispatcher} from 'Events/EventDispatcher'
import {Sprite} from 'Display/Sprite'
import {EaseType} from './EaseType'
import {EventType} from 'Events/EventType'
import {Tween} from './Tween'

export class Tweener {
    private static _removeList: Array<Tween> = new Array<Tween>()
    private static _pendingTweens: Array<Tween> = new Array<Tween>()
    private static _tweenList: Array<Tween> = new Array<Tween>()

    private static isActive: boolean = true

    public static update(dt: number) {
        if (this._pendingTweens.length > 0) {
            for (let i = 0; i < this._pendingTweens.length; ++i) {
                this._tweenList.push(this._pendingTweens[i])
            }
            this._pendingTweens.length = 0
        }

        for (let tween of this._removeList) {
            this.removeTween(tween, this._pendingTweens)
            this.removeTween(tween, this._tweenList)
            Tween.pool.release(tween)
        }

        this._removeList.length = 0

        if (!this.isActive) {
            return
        }

        for (let tween of this._tweenList) {
            tween.update(dt)
        }
    }

    public static create(sprite: Sprite): Tween {
        let tween: Tween = Tween.pool.get()
        tween.reset()

        tween.sprite = sprite

        this._pendingTweens.push(tween)
        return tween
    }

    public static remove(tween: Tween): void {
        this._removeList.push(tween)
    }

    public static removeTween(tween: Tween, list: Array<Tween>) {
        let pos = list.indexOf(tween)
        if (pos > -1) {
            list.splice(pos, 1)
        }
    }
}
