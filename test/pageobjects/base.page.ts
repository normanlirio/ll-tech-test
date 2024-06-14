import AppList from "./applist.page"

export default class Base {

    private readonly appList: AppList

    get dismissButton() { return $('app-version-notification div.rev-custom-footer ion-button:nth-child(2)') }
    
    constructor() {
        this.appList = new AppList()
     }

     async gotoMessageCenter() {
        await this.appList.messageCenter.click()
     }

    async open(url: string) {
        await browser.url(url)
    }

    async dismissModal() {
        await this.dismissButton.click()
    }

    async waitUntil(locator: ChainablePromiseElement, expected: string, errorMessage: string) {
        const elem = await locator
        await elem.waitUntil(async function () {
            console.log('Status: ' +(await elem.getText()).toString())
            return (await elem.getText()) === expected
        }, {
            timeout: 10000, // Adjust the timeout as needed
            timeoutMsg: errorMessage
        })
    }
}