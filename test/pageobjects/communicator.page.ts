import Base from "./base.page"

class Communicator extends Base {

    get contacts() { return $('div#contacts') }
    get startMessaging() { return $$('.popover-viewport ion-item') }
    get conversationsPane() { return $('.rev-sessions-container')}
    get activeSessions() { return $('.rev-active-sessions div:last-child') }
    get internalLabel() { return this.activeSessions.$('div[qa-automation="session-participant-label"]') }
    get timer() { return this.activeSessions.$('//div[@class="details"]//span[contains(text(), "Timer")]')}
    
    async getContactStatus(contactName: string) {
        return await $(`span.rev-contact-name*=${contactName}`).nextElement()
    }

    async clickContact(contactName: string) {
        await super.waitUntil(
                $(`span.rev-contact-name*=${contactName}`).nextElement(),
                'Online 0m',
                contactName + ' is currently Offline.')

        await $(`span.rev-contact-name*=${contactName}`).click()
    }


    async clickStartMessagingOption() {
        await this.startMessaging[0].click()
       
    }
}

export default new Communicator()