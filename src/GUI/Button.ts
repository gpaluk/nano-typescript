import {Container} from 'Display/Container'
import {Sprite} from 'Display/Sprite'
import {AnchorType} from 'Display/AnchorType'
import {Stage} from 'Display/Stage'
import {Point} from 'Geom/Point'
import {EventType} from 'Events/EventType'

export class Button extends Container {
    protected _upState: Sprite
    protected _overState: Sprite = null
    protected _downState: Sprite = null

    protected _activeState: Sprite

    private _isMouseDown: boolean
    private _isMouseOver: boolean
    private _isClickTarget: boolean

    constructor(upState: Sprite, overState?: Sprite, downState?: Sprite) {
        super()

        this._upState = upState
        this._upState.anchorType = AnchorType.CENTER

        if (overState != null) {
            this._overState = overState
            this._overState.anchorType = AnchorType.CENTER
        }

        if (downState != null) {
            this._downState = downState
            this._downState.anchorType = AnchorType.CENTER
        }

        this._activeState = this._upState

        Stage.context.canvas.onmousedown = e => this.onMouseDown(e)
        Stage.context.canvas.onmousemove = e => this.onMouseMove(e)
        Stage.context.canvas.onmouseup = e => this.onMouseUp(e)

        // TODO [GJP] Add
        this.update()
        this.addChild(this._activeState)
    }

    // TODO dispose()

    public intersectsPoint(point: Point): boolean {
        return this._activeState.intersectsPoint(point)
    }

    public intersectsXY(x: number, y: number): boolean {
        return this._activeState.intersectsXY(x, y)
    }

    public forceUpState(): void {
        this.setMouseOut()
    }

    public setMouseOut(): void {
        this._activeState = this._upState
        this.removeAllChildren()
        this.addChild(this._upState)
    }

    public setMouseOver(): void {
        if (this._overState) {
            this._activeState = this._overState
            this.removeAllChildren()
            this.addChild(this._overState)
        }
    }

    public setMouseDown(): void {
        if (this._downState) {
            this._activeState = this._downState
            this.removeAllChildren()
            this.addChild(this._downState)
        }
    }

    public updateMouseState() {
        if (this._isMouseOver && this._isMouseDown) {
            if (this._downState) {
                this.setMouseDown()
            } else if (this._overState) {
                this.setMouseOver()
            } else {
                this.setMouseOut()
            }
        } else if (this._isMouseDown) {
            if (this._downState) {
                this.setMouseDown()
            } else {
                this.setMouseOut()
            }
        } else if (this._isMouseOver) {
            if (this._overState) {
                this.setMouseOver()
            } else {
                this.setMouseOut()
            }
        } else {
            this.setMouseOut()
        }
    }

    private onMouseMove(e: Event) {
        let evt: MouseEvent = e as MouseEvent

        if (this._activeState.intersectsXY(evt.layerX, evt.layerY)) {
            if (!this._isMouseOver) {
                this._isMouseOver = true
                this.updateMouseState()

                this.dispatchEvent(new Event(EventType.MOUSE_OVER))
            }
            Stage.instance.canvas.style.cursor = 'pointer'
        } else {
            if (this._isMouseOver) {
                this._isMouseOver = false
                this.updateMouseState()

                this.dispatchEvent(new Event(EventType.MOUSE_OUT))
            }
            Stage.instance.canvas.style.cursor = 'auto'
        }
    }

    private onMouseDown(e: Event): void {
        let evt: MouseEvent = e as MouseEvent

        if (this._activeState.intersectsXY(evt.layerX, evt.layerY)) {
            this._isClickTarget = true
            this._isMouseDown = true
            this.updateMouseState()

            this.dispatchEvent(new Event(EventType.MOUSE_DOWN))
        } else {
            this._isClickTarget = false
        }
    }

    private onMouseUp(e: Event): void {
        let evt: MouseEvent = e as MouseEvent

        Stage.instance.canvas.style.cursor = 'auto'
        this._isMouseDown = false
        this.updateMouseState()

        if (this._activeState.intersectsXY(evt.layerX, evt.layerY)) {
            this.dispatchEvent(new Event(EventType.CLICK))
        } else if (this._isClickTarget) {
            this.dispatchEvent(new Event(EventType.MOUSE_UP))
        }

        this._isClickTarget = false
    }

    public dispose() {
        // remove event listeners

        super.dispose()
    }
}
