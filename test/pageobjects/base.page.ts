import AppList from "./applist.page"

export default class Base {

    private readonly appList: AppList

    get dismissButton() { return $('app-version-notification div.rev-custom-footer ion-button:nth-child(2)') }
    get headerTitle() { return $('//app-communicator/ion-header//ion-title')}
    get userStatus() { return $('//app-communicator/ion-header/ion-toolbar/ion-buttons[app-status-selector]//ion-button') }
    get statusPopUp() { return $('//app-status-list')}

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

    async selectUserStatus(status: string) {
        await this.userStatus.click()
        const statusToSelect = await $(`//app-status-list/ion-list[@role="menu"]//ion-item[ion-label[text()="${status}"]]`)
        await statusToSelect.click()
    }

    //TODO: REMOVE?
    async waitUntil(locator: ChainablePromiseElement, expected: string, errorMessage: string) {
        const elem = await locator
        await elem.waitUntil(async function () {
            console.log('Status: ' +(await elem.getText()).toString())
            return (await elem.getText()) === expected
        }, {
            timeout: 220000, // Adjust the timeout as needed
            timeoutMsg: errorMessage
        })
    }
}