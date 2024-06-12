export default class Base {

    constructor() {}

    async open(url: string) {
        await browser.url(url)
    }

}

