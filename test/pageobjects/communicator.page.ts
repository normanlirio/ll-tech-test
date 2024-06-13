import Base from "./base.page"

class Communicator extends Base {

    get contacts() { return $('div#contacts') }
    get startMessaging() { return $$('.popover-viewport ion-item') }
    get conversationsPane() { return $('.rev-sessions-container')}
    get activeSessions() { return $('.rev-active-sessions div:last-child') }
    get internalLabel() { return this.activeSessions.$('session-participant-label') }
    get timer() { return this.activeSessions.$('div.details')}

    async clickContact(contactName: string) {
        // await $('ion-card-title*=Loading').waitForDisplayed({ reverse : true})
        await $(`span.rev-contact-name*=${contactName}`).waitForExist()
        await $(`span.rev-contact-name*=${contactName}`).click()
    }

    async clickStartMessagingOption() {
        await this.startMessaging[0].click()
       
    }
}

export default new Communicator()