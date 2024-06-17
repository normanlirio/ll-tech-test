import { EmailDetails } from "../../types/inputPayload"
const path = require('path')


class MessageCenter {

    get attachedFile() { return $('ion-icon[name="attach"]:first-child').nextElement() }
    get composeMessageButton() { return $('//app-email-main-menu/section/ion-button') }
    get emailBody() { return $('#iframe') }
    get emailSender() { return $('ion-select[formcontrolname="from"]') }
    get emailTo() { return $('p.emailTo:first-child') }
    get fileUploadInput() { return $('input[name="filename"]') }
    get mailInbox() { return $('[qa-automation="folder-name-inbox"]') }
    get latestEmail() { return $(`//*[@id="inbox-mail"]//app-email-item[contains(@class, 'ion-hide-md-down')][position()=1]`) }
    get latestEmailSender() { return $(`//*[@id="inbox-mail"]//app-email-item[contains(@class, 'ion-hide-md-down')][position()=1]//h3`) }
    get recipient() { return $('//*[@id="to"]/input') }
    get replyIcon() { return $('//app-email-reader//ion-footer//ion-buttons[@slot="end"]/ion-button[1]') }
    get sendButton() { return $('ion-button[id="saveDraftButton"]').nextElement() }
    get subject() { return $('//*[@id="subject"]/input') }
    get uploadButton() { return $('ion-button.custom-button') }
    get readerEmailSender() { return $('//app-email-reader-item//h2[contains(text(), "From")]') }
    get readerEmailSubject() { return $('//app-email-reader-item//h1') }

    async selectEmailForSending(email: string, action: string) {
        await this.emailSender.click()
        await $(`//*[@role="radiogroup"]/button//div[text()="${email}"]`).click();
        await $(`//*[@type="button"]/span[text()="${action}"]`).click()
    }

    async getPrefilledEmail() {
        await this.recipient.waitForDisplayed()
        const recipientEmail = await this.recipient.getValue()
        console.log("TEST: ==" + recipientEmail + "==")
        return recipientEmail
    }

    async clickComposeNewMessageButton() {
        await this.composeMessageButton.click()
    }

    async fillToAndSubject(emailDetails: EmailDetails) {
        await this.recipient.setValue(emailDetails.recipient)
        await this.subject.setValue(emailDetails.subject)
    }

    async addEmailBody(message: string) {

        await browser.waitUntil(async () => {
            return this.emailBody.isDisplayed();
        }, {
            timeout: 5000,
            timeoutMsg: 'iframe was not displayed'
        })

        // Switch to the iframe context
        const iframeElement = await this.emailBody;
        await browser.switchToFrame(iframeElement);

        // Verify that we have switched to the iframe by checking an element inside it
        const body = await browser.$('body') // Use a simple selector to locate the body element inside the iframe
        await browser.waitUntil(async () => {
            return body.isEnabled()
        }, {
            timeout: 5000,
            timeoutMsg: 'Body element inside iframe was not displayed'
        })
        // Set value inside the iframe's body
        await body.addValue(message)

        // Switch back to the main context
        await browser.switchToParentFrame()
    }

    //improve method name
    async performEmailAction(action: string) {
        await this.replyIcon.waitForClickable()
        await this.replyIcon.click()
        const emailMessageAction = $(`//button[contains(@class, "action-sheet-button ")][span[text()="${action}"]]`)
        await emailMessageAction.waitForClickable()
        await emailMessageAction.click()
    }


    async chooseFileToUpload() {
        const filePath = path.resolve(__dirname, '..', '..', '..', 'resources', 'linklive.txt')
        await this.fileUploadInput.addValue(filePath)
    }

    async sendEmail() {
        await this.sendButton.click()
    }

    async openLatestEmail() {
        await this.latestEmail.waitForStable()
        await this.latestEmail.click()
    }

}

export default new MessageCenter()