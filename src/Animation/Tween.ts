import {EaseType} from './EaseType'
import {Sprite} from 'Display/Sprite'
import {EventType} from 'Events/EventType'
import {Tweener} from './Tweener'
import {Pool} from 'Utils/Pool'
import {EventDispatcher} from 'Events/EventDispatcher'

export class Tween extends EventDispatcher {
    public static _pool: Pool<Tween> = new Pool<Tween>(10, Tween)

    public static get pool(): Pool<Tween> {
        return this._pool
    }

    private _sprite: Sprite

    private _startX: number
    private _startY: number
    private _destinationX: number
    private _destinationY: number

    private _startAlpha: number
    private _destinationAlpha: number

    private _startScaleX: number
    private _destinationScaleX: number
    private _startScaleY: number
    private _destinationScaleY: number

    private _startRotation: number
    private _destinationRotation: number

    private _isPlaying: boolean = false
    private _time: number
    private _targetTime: number

    private _easeType: EaseType = EaseType.LINEAR

    public get isPlaying(): boolean {
        return this._isPlaying
    }

    public set isPlaying(value: boolean) {
        this, (this._isPlaying = value)
    }

    public reset(): void {
        this._startX = 0
        this._destinationX = 0
        this._startY = 0
        this._destinationY = 0

        this._startAlpha = 0
        this._destinationAlpha = 0

        this._startScaleX = 0
        this._destinationScaleX = 0
        this._startScaleY = 0
        this._destinationScaleY = 0

        this._startRotation = 0
        this._destinationRotation = 0

        this._isPlaying = false

        this._time = 0
        this._targetTime = 0

        this._easeType = EaseType.LINEAR
        this.setEaseFunction()
    }

    public start(): void {
        if (this._isPlaying == false) {
            this.dispatchEvent(new Event(EventType.STARTED))
            this._isPlaying = true
        }
    }

    public get easeType(): EaseType {
        return this._easeType
    }

    public get sprite(): Sprite {
        return this._sprite
    }

    // internal
    public set sprite(value: Sprite) {
        this._sprite = value
    }

    public get startX(): number {
        return this._startX
    }

    public set startX(value: number) {
        this._startX = value
    }

    public get startY(): number {
        return this._startY
    }

    public set startY(value: number) {
        this._startY = value
    }

    public get destinationX(): number {
        return this._destinationX
    }

    public set destinationX(value: number) {
        this._destinationX = value
    }

    public get startAlpha(): number {
        return this._startAlpha
    }

    public set startAlpha(value: number) {
        this._startAlpha = value
    }

    public get destinationAlpha(): number {
        return this._destinationAlpha
    }

    public set destinationAlpha(value: number) {
        this._destinationAlpha = value
    }

    public get startScaleX(): number {
        return this._startScaleX
    }

    public set startScaleX(value: number) {
        this._startScaleX = value
    }

    public get startScaleY(): number {
        return this._startScaleY
    }

    public set startScaleY(value: number) {
        this._startScaleY = value
    }

    public get destinationScaleX(): number {
        return this._destinationScaleX
    }

    public set destinationScaleX(value: number) {
        this._destinationScaleX = value
    }

    public get destinationScaleY(): number {
        return this._destinationScaleY
    }

    public set destinationScaleY(value: number) {
        this._destinationScaleY = value
    }

    public get startRotation(): number {
        return this._startRotation
    }

    public set startRotation(value: number) {
        this._startRotation = value
    }

    public get destinationRotation(): number {
        return this._destinationRotation
    }

    public set destinationRotation(value: number) {
        this._destinationRotation = value
    }

    public duration(time: number): Tween {
        this._targetTime = time
        return this
    }

    public scale(
        startScaleX: number,
        destinationScaleX: number,
        startScaleY: number,
        destinationScaleY: number
    ): Tween {
        this._startScaleX = startScaleX
        this._destinationScaleX = destinationScaleX
        this._startScaleY = startScaleY
        this._destinationScaleY = destinationScaleY
        return this
    }

    public rotate(startRotation: number, destinationRotation: number): Tween {
        this._startRotation = startRotation
        this._destinationRotation = destinationRotation
        return this
    }

    public translate(
        startX: number,
        destinationX: number,
        startY: number,
        destinationY: number
    ): Tween {
        this._startX = startX
        this._destinationX = destinationX
        this._startY = startY
        this._destinationY = destinationY
        return this
    }

    public alpha(startAlpha: number, destinationAlpha: number): Tween {
        this._startAlpha = startAlpha
        this._destinationAlpha = destinationAlpha
        return this
    }

    public easing(easeType: EaseType): Tween {
        this._easeType = easeType
        this.setEaseFunction()
        return this
    }

    private _easeFunction: Function

    private setEaseFunction(): void {
        switch (this._easeType) {
            case EaseType.BACK_IN:
                this._easeFunction = this.backIn
                break
            case EaseType.BACK_IN_OUT:
                this._easeFunction = this.backInOut
                break
            case EaseType.BACK_OUT:
                this._easeFunction = this.backOut
                break
            case EaseType.BOUNCE_IN:
                this._easeFunction = this.bounceIn
                break
            case EaseType.BOUNCE_IN_OUT:
                this._easeFunction = this.bounceInOut
                break
            case EaseType.BOUNCE_OUT:
                this._easeFunction = this.bounceOut
                break
            case EaseType.CIRCULAR_IN:
                this._easeFunction = this.circularIn
                break
            case EaseType.CIRCULAR_IN_OUT:
                this._easeFunction = this.circularInOut
                break
            case EaseType.CIRCULAR_OUT:
                this._easeFunction = this.circularOut
                break
            case EaseType.CUBIC_IN:
                this._easeFunction = this.cubicIn
                break
            case EaseType.CUBIC_IN_OUT:
                this._easeFunction = this.cubicInOut
                break
            case EaseType.CUBIC_OUT:
                this._easeFunction = this.cubicOut
                break
            case EaseType.ELASTIC_IN:
                this._easeFunction = this.elasticIn
                break
            case EaseType.ELASTIC_IN_OUT:
                this._easeFunction = this.elasticInOut
                break
            case EaseType.ELASTIC_OUT:
                this._easeFunction = this.elasticOut
                break
            case EaseType.EXPONENTIAL_IN:
                this._easeFunction = this.exponentialIn
                break
            case EaseType.EXPONENTIAL_IN_OUT:
                this._easeFunction = this.exponentialInOut
                break
            case EaseType.EXPONENTIAL_OUT:
                this._easeFunction = this.exponentialOut
                break
            case EaseType.LINEAR:
                this._easeFunction = this.linear
                break
            case EaseType.QUADRATIC_IN:
                this._easeFunction = this.quadraticIn
                break
            case EaseType.QUADRATIC_IN_OUT:
                this._easeFunction = this.quadraticInOut
                break
            case EaseType.QUADRATIC_OUT:
                this._easeFunction = this.quadraticOut
                break
            case EaseType.QUARTIC_IN:
                this._easeFunction = this.quarticIn
                break
            case EaseType.QUARTIC_IN_OUT:
                this._easeFunction = this.quarticInOut
                break
            case EaseType.QUARTIC_OUT:
                this._easeFunction = this.quarticOut
                break
            case EaseType.QUINTIC_IN_OUT:
                this._easeFunction = this.quinticInOut
                break
            case EaseType.QUINTIC_OUT:
                this._easeFunction = this.quinticOut
                break
            case EaseType.SINOSOIDAL_IN:
                this._easeFunction = this.sinusoidalIn
                break
            case EaseType.SINOSOIDAL_IN_OUT:
                this._easeFunction = this.sinusoidalInOut
                break
            case EaseType.SINOSOIDAL_OUT:
                this._easeFunction = this.sinusoidalOut
                break
        }
    }

    // internal
    public update(dt: number): void {
        if (this._isPlaying) {
            this._time += dt

            // TODO [GJP] dispatch(new Event(EventType.UPDATE))

            let t: number = this._time / this._targetTime

            // TODO [GJP]] write clamp
            if (t > 1) {
                t = 1
            } else if (t < 0) {
                t = 0
            }

            if (this._sprite != null) {
                //let alpha: number = this.interpolateLinearFunc(this._startAlpha, this._destinationAlpha, t)

                if (this._startX != this._destinationX)
                    this._sprite.x = this.interpolateLinearFunc(
                        this._startX,
                        this._destinationX,
                        this._easeFunction(t)
                    )

                if (this._startY != this._destinationY)
                    this._sprite.y = this.interpolateLinearFunc(
                        this._startY,
                        this._destinationY,
                        this._easeFunction(t)
                    )

                if (this._startAlpha != this._destinationAlpha)
                    this._sprite.alpha = this.interpolateLinearFunc(
                        this._startAlpha,
                        this._destinationAlpha,
                        this._easeFunction(t)
                    )

                if (this._startScaleX != this._destinationScaleX)
                    this._sprite.scaleX = this.interpolateLinearFunc(
                        this._startScaleX,
                        this._destinationScaleX,
                        this._easeFunction(t)
                    )

                if (this._startScaleY != this._destinationScaleY)
                    this._sprite.scaleY = this.interpolateLinearFunc(
                        this._startScaleY,
                        this._destinationScaleY,
                        this._easeFunction(t)
                    )

                if (this._startRotation != this._destinationRotation)
                    this._sprite.rotation = this.interpolateLinearFunc(
                        this._startRotation,
                        this._destinationRotation,
                        this._easeFunction(t)
                    )
            }

            if (this._time >= this._targetTime) {
                this.dispatchEvent(new Event(EventType.COMPLETE))

                Tweener.remove(this)
            }
        }
    }

    private linear(k: number): number {
        return k
    }

    private quadraticIn(k: number): number {
        return k * k
    }

    private quadraticOut(k: number): number {
        return k * (2 - k)
    }

    private quadraticInOut(k: number): number {
        if ((k *= 2) < 1) {
            return 0.5 * k * k
        }

        return -0.5 * (--k * (k - 2) - 1)
    }

    private cubicIn(k: number): number {
        return k * k * k
    }

    private cubicOut(k: number): number {
        return --k * k * k + 1
    }

    private cubicInOut(k: number): number {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k
        }

        return 0.5 * ((k -= 2) * k * k + 2)
    }

    private quarticIn(k: number): number {
        return k * k * k * k
    }

    private quarticOut(k: number): number {
        return 1 - --k * k * k * k
    }

    private quarticInOut(k: number): number {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k
        }

        return -0.5 * ((k -= 2) * k * k * k - 2)
    }

    private quninticIn(k: number): number {
        return k * k * k * k * k
    }

    private quinticOut(k: number): number {
        return --k * k * k * k * k + 1
    }

    private quinticInOut(k: number): number {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k
        }

        return 0.5 * ((k -= 2) * k * k * k * k + 2)
    }

    private sinusoidalIn(k: number): number {
        return 1 - Math.cos((k * Math.PI) / 2)
    }

    private sinusoidalOut(k: number): number {
        return Math.sin((k * Math.PI) / 2)
    }

    private sinusoidalInOut(k: number): number {
        return 0.5 * (1 - Math.cos(Math.PI * k))
    }

    private exponentialIn(k: number): number {
        return k == 0 ? 0 : Math.pow(1024, k - 1)
    }

    private exponentialOut(k: number): number {
        return k == 1 ? 1 : 1 - Math.pow(2, -10 * k)
    }

    private exponentialInOut(k: number): number {
        if (k == 0) {
            return 0
        }

        if (k == 1) {
            return 1
        }

        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1)
        }

        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
    }

    private circularIn(k: number): number {
        return 1 - Math.sqrt(1 - k * k)
    }

    private circularOut(k: number): number {
        return Math.sqrt(1 - --k * k)
    }

    private circularInOut(k: number): number {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1)
        }

        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
    }

    private elasticIn(k: number): number {
        if (k == 0) {
            return 0
        }

        if (k == 1) {
            return 1
        }

        return -(Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI))
    }

    private elasticOut(k: number): number {
        if (k == 0) {
            return 0
        }

        if (k == 1) {
            return 1
        }

        return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1
    }

    private elasticInOut(k: number): number {
        if (k == 0) {
            return 0
        }

        if (k == 1) {
            return 1
        }

        k *= 2

        if (k < 1) {
            return -(
                0.5 *
                Math.pow(2, 10 * (k - 1)) *
                Math.sin((k - 1.1) * 5 * Math.PI)
            )
        }

        return (
            0.5 *
                Math.pow(2, -10 * (k - 1)) *
                Math.sin((k - 1.1) * 5 * Math.PI) +
            1
        )
    }

    private backIn(k: number): number {
        let s: number = 1.70158

        return k * k * ((s + 1) * k - s)
    }

    private backOut(k: number): number {
        let s: number = 1.70158

        return --k * k * ((s + 1) * k + s) + 1
    }

    private backInOut(k: number): number {
        let s: number = 1.70158 * 1.525

        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s))
        }

        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
    }

    private bounceIn(k: number): number {
        return 1 - this.bounceOut(1 - k)
    }

    private bounceOut(k: number): number {
        if (k < 1 / 2.75) {
            return 7.5625 * k * k
        } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75
        } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
        } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375
        }
    }

    private bounceInOut(k: number): number {
        if (k < 0.5) {
            return this.bounceIn(k * 2) * 0.5
        }

        return this.bounceOut(k * 2 - 1) * 0.5 + 0.5
    }

    private interpolateLinearFunc(p0: number, p1: number, t: number): number {
        return (p1 - p0) * t + p0
    }
}
