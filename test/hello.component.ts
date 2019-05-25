import {HelloService} from './hello-service.interface'

export class HelloComponent {
    private helloService: HelloService

    public constructor(helloService: HelloService) {
        this.helloService = helloService
    }

    public sayHello(): string {
        return this.helloService.sayHello()
    }
}
