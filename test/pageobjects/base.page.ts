import AppList from "./applist.page"

export default class Base {

    private readonly appList: AppList

    get dismissButton() { return $('app-version-notification div.rev-custom-footer ion-button:nth-child(2)') }
    get headerTitle() { return $('//app-communicator/ion-header//ion-title') }
    get userStatus() { return $('//app-communicator/ion-header/ion-toolbar/ion-buttons[app-status-selector]//ion-button') }
    get statusPopUp() { return $('//app-status-list') }

    constructor() {
        this.appList = new AppList()
    }

    async gotoMessageCenter() {
        await this.appList.messageCenter.click()
    }

    async gotoSettings() {
        await this.appList.settings.waitForClickable()
        await this.appList.settings.click()
    }

    async open(url: string) {
        await browser.url(url)
    }

    async dismissModal() {
        await this.dismissButton.click()
    }

    async selectUserStatus(status: string) {
        await this.userStatus.waitForClickable()
        await this.userStatus.click()
        const statusToSelect = await $(`//app-status-list/ion-list[@role="menu"]//ion-item[ion-label[text()="${status}"]]`)
        await statusToSelect.click()
    }

}