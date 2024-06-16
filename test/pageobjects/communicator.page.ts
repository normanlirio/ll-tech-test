import Base from "./base.page"

class Communicator extends Base {

    get contacts() { return $('div#contacts') }
    get conversationsPane() { return $('.rev-sessions-container')}
    get activeSessions() { return $('.rev-active-sessions div:last-child') }
    get internalLabel() { return this.activeSessions.$('div[qa-automation="session-participant-label"]') }
    get timer() { return this.activeSessions.$('//div[@class="details"]//span[contains(text(), "Timer")]')}
    get chatBox() { return $('.rev-message-div')}
    
    async getContactStatus(contactName: string) {
        return await $(`span.rev-contact-name*=${contactName}`).nextElement()
    }


    async clickContact(contactName: string) {
        await $(`span.rev-contact-name*=${contactName}`).click()
    }


    async selectPopUpOption(position: number) {
        const option = await $(`//*[@class="popover-viewport"]//ion-item[position()=${position}]`)
        await option.waitForStable()
        await option.waitForDisplayed()
        await option.click()
    }

    async typeMessage(message: string) {{
        await this.chatBox.setValue(message)
        await $('div.rev-message-input > div.relative > ion-button').click()
    }}

    async waitForOnlineStatus(contactName: string) {
        await super.waitUntil(
            $(`span.rev-contact-name*=${contactName}`).nextElement(),
            'Online 0m',
            contactName + ' is currently Offline.')
    }
}

export default new Communicator()