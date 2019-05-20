export class EventDispatcher implements EventTarget {
    protected _delegate = document.createDocumentFragment()

    public addEventListener(...args: any): void {
        this._delegate.addEventListener.apply(this._delegate, args)
    }

    public dispatchEvent(...args: any): boolean {
        return this._delegate.dispatchEvent.apply(this._delegate, args)
    }

    public removeEventListener(...args: any): void {
        return this._delegate.removeEventListener.apply(this._delegate, args)
    }
}
