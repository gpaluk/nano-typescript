import {EventDispatcher} from 'Events/EventDispatcher'
import {EventType} from 'Events/EventType'
import {Texture} from 'Display/Texture'
import {Sprite} from 'Display/Sprite'

export class AssetLoader extends EventDispatcher {
    constructor() {
        super()
    }

    private _paths: string[] = []
    private _imageMap: Map<string, HTMLImageElement> = new Map<
        string,
        HTMLImageElement
    >()
    private _audioMap: Map<string, HTMLAudioElement> = new Map<
        string,
        HTMLAudioElement
    >()
    private _jsonMap: Map<string, string> = new Map<string, string>()

    public add(path: string) {
        this._paths.unshift(path)
    }

    public get paths(): string[] {
        return this._paths
    }

    public getImage(path: string): HTMLImageElement {
        return this._imageMap.get(path)
    }

    public getTexture(path: string): Texture {
        return new Texture(this._imageMap.get(path))
    }

    public getSprite(path: string): Sprite {
        return new Sprite(this.getTexture(path))
    }

    public getAudio(path: string): HTMLAudioElement {
        return this._audioMap.get(path)
    }

    public getJson(path: string): string {
        return this._jsonMap.get(path)
    }

    public load() {
        this.loadItem(this._paths.shift())
    }

    private loadItem(path: string): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest()

        switch (this.getFileExtension(path)) {
            case 'json':
                xhr.responseType = 'text'
                break
            default:
                xhr.responseType = 'arraybuffer'
                break
        }

        xhr.onload = e => this.onAssetLoad(e, path)
        xhr.onerror = e => this.onAssetError(e, path)
        xhr.ontimeout = e => this.onAssetTimeout(e, path)

        xhr.open('GET', path, true)
        xhr.send()
    }

    private onAssetError(e: Event, path: string): void {
        dispatchEvent(new Event(EventType.ERROR))
    }

    private onAssetTimeout(e: Event, path: string): void {
        dispatchEvent(new Event(EventType.TIMEOUT))
    }

    private onAssetLoad(e: Event, path: string): void {
        let target: XMLHttpRequest = e.target as XMLHttpRequest

        if (target.status == 200) {
            let data: Uint8Array = new Uint8Array(target.response)
            let mimeType: string = this.getMimeType(data)

            if (!mimeType) {
                mimeType = this.getFileExtension(path)
            }

            switch (mimeType) {
                case 'image/png':
                    let png = document.createElement('img')
                    png.src = path
                    png.crossOrigin = 'anonymous'
                    png.height =
                        (data[20] << 24) |
                        (data[21] << 16) |
                        (data[22] << 8) |
                        data[23]
                    png.width =
                        (data[16] << 24) |
                        (data[17] << 16) |
                        (data[18] << 8) |
                        data[19]
                    this._imageMap.set(path, png)
                    break
                case 'image/jpeg':
                    let jpg = document.createElement('img')
                    jpg.src = path
                    jpg.crossOrigin = 'anonymous'

                    let offset: number = 0
                    for (let i: number = 0; i < data.length; i++) {
                        if (
                            data[i] == 0xff &&
                            (data[i + 1] == 0xc0 || data[i + 1] == 0xc2)
                        ) {
                            offset = i + 5
                            break
                        }
                    }

                    if (offset == 0) {
                        console.warn(
                            'JPEG SOF chunk not found. Cannot determine the width and height'
                        )
                    } else {
                        jpg.width = (data[offset] << 8) | data[offset + 1]
                        jpg.height = (data[offset + 2] << 8) | data[offset + 3]
                    }

                    this._imageMap.set(path, jpg)
                    break
                case 'audio/mpeg':
                    let audio = document.createElement('audio')
                    audio.crossOrigin = 'anonymous'
                    audio.src = path
                    audio.load() // force asset to refresh
                    this._audioMap.set(path, audio)
                    break
                case 'json':
                    this._jsonMap.set(path, target.responseText)
                    break
                default:
                    console.warn(`Unknown file type ${mimeType}`)
                    this.dispatchEvent(new Event(EventType.ERROR))
                    return
            }
        } else {
            // the file was not found
            this.dispatchEvent(new Event(EventType.ERROR))
            return
        }

        this.dispatchEvent(new Event(EventType.LOADED))

        if (this._paths.length > 0) {
            this.loadItem(this._paths.shift())
        } else {
            this.dispatchEvent(new Event(EventType.COMPLETE))
        }
    }

    private getMimeType(data: Uint8Array): string {
        let magic: number = (data[0] << 8) | data[1]

        switch (magic) {
            case 0x4944:
            case 0xfffb:
                return 'audio/mpeg'
            case 0x8950:
                return 'image/png'
            case 0x4749:
                return 'image/gif'
            case 0x2550:
                return 'application/pdf'
            case 0xffd8:
            case 0xddd8:
                return 'image/jpeg'
            case 0x504b:
                return 'application/zip'
            default:
                return null
        }
    }

    public getFileExtension(filePath: string) {
        return filePath.substr(
            filePath.lastIndexOf('.') + 1,
            filePath.length - 1
        )
    }
}
