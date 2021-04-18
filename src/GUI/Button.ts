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

    public constructor(
        upState: Sprite,
        overState?: Sprite,
        downState?: Sprite
    ) {
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

    public dispose(): void {
        // remove event listeners
        this.removeChild(this._activeState)
        this._activeState.dispose()
        this._upState.dispose()

        if (this._downState) {
            this._downState.dispose()
        }

        if (this._overState) {
            this._overState.dispose()
        }

        Stage.context.canvas.onmousedown = null
        Stage.context.canvas.onmousemove = null
        Stage.context.canvas.onmouseup = null

        this._activeState = null
        this._upState = null
        this._downState = null
        this._overState = null

        super.dispose()
    }

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

    public updateMouseState(): void {
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

    private onMouseMove(e: MouseEvent): void {
        if (this._activeState.intersectsXY(e.clientX, e.clientY)) {
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

    private onMouseDown(e: MouseEvent): void {
        let evt: MouseEvent = e as MouseEvent

        if (this._activeState.intersectsXY(evt.clientX, evt.clientY)) {
            this._isClickTarget = true
            this._isMouseDown = true
            this.updateMouseState()

            this.dispatchEvent(new Event(EventType.MOUSE_DOWN))
        } else {
            this._isClickTarget = false
        }
    }

    private onMouseUp(e: MouseEvent): void {
        Stage.instance.canvas.style.cursor = 'auto'
        this._isMouseDown = false
        this.updateMouseState()

        if (this._activeState.intersectsXY(e.clientX, e.clientY)) {
            this.dispatchEvent(new Event(EventType.CLICK))
        } else if (this._isClickTarget) {
            this.dispatchEvent(new Event(EventType.MOUSE_UP))
        }

        this._isClickTarget = false
    }
}
