import Base from "./base.page"

class Communicator extends Base {

    get contacts() { return $('div#contacts') }
    get contactsTab() { return $('//ion-tab-button[ion-label[text()="Contacts"]]') }
    get conversationsTab() { return $('//ion-tab-button[ion-label[text()="Conversations"]]') }
    get conversationsPane() { return $('.rev-sessions-container') }
    get activeSessions() { return $('.rev-active-sessions div:last-child') }
    get internalLabel() { return this.activeSessions.$('div[qa-automation="session-participant-label"]') }
    get timer() { return this.activeSessions.$('//div[@class="details"]//span[contains(text(), "Timer")]') }
    get chatBox() { return $('.rev-message-div') }
    get latestChatMessage() { return $('//div[contains(@class, "messages mine")][last()]//div[contains(@class, "message")]') }

    async getContactStatus(contactName: string) {
        return await $(`span.rev-contact-name*=${contactName}`).nextElement()
    }

    async clickContact(contactName: string) {
        const contact = $(`span.rev-contact-name*=${contactName}`)
        await contact.waitForDisplayed()
        await contact.click()
    }

    async clickCContactsTab() {
        await this.contactsTab.waitForClickable()
        await this.contactsTab.click()
    }

    async clickConversationsTab() {
        await this.conversationsTab.waitForClickable()
        await this.conversationsTab.click()
    }

    async selectContactAction(action: string) {
        const contactAction = await $(`//*[@class="popover-viewport"]//ion-item[contains(text(), "${action}")]`)
        await contactAction.waitForStable()
        await contactAction.click()
    }

    async typeMessage(message: string) {
        await this.chatBox.setValue(message)
        await $('div.rev-message-input > div.relative > ion-button').click()
    }

    async waitForOnlineStatus(contactName: string) {
        await super.waitUntilOnline(
            $(`span.rev-contact-name*=${contactName}`).nextElement(),
            'Online 0m',
            contactName + ' is currently Offline, unable to proceed with the test.')
    }
}

export default new Communicator()