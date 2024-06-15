import { EmailDetails } from "../../types/inputPayload"
const path = require('path')


class MessageCenter {

    get composeMessageButton() { return $('//app-email-main-menu/section/ion-button') }
    get mailInbox() { return $('[qa-automation="folder-name-inbox"]') }
    get emailSender() { return $('ion-select[formcontrolname="from"]') }
    get recipient() { return $('//*[@id="to"]/input') }
    get subject() { return $('//*[@id="subject"]/input') }
    get emailBody() { return $('#iframe') }
    get uploadButton() { return $('ion-button.custom-button') }
    get fileUploadInput() { return $('input[name="filename"]') }
    get attachedFile() { return $('ion-icon[name="attach"]:first-child').nextElement() }
    get sendButton() { return $('ion-button[id="saveDraftButton"]').nextElement() }
    get emailTo() { return $('p.emailTo:first-child') }


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

        await browser.pause(2000)
        // Set value inside the iframe's body
        await body.addValue(message)

        // Switch back to the main context
        await browser.switchToParentFrame()
    }

    //improve method name
    async replyToEmail() {
        await $('//app-email-reader//ion-footer//ion-buttons[@slot="end"]/ion-button[1]').waitForClickable()
        await $('//app-email-reader//ion-footer//ion-buttons[@slot="end"]/ion-button[1]').click()
        await $('//button[contains(@class, "action-sheet-button ")][span[text()="Reply"]]').waitForDisplayed()
        await $('//button[contains(@class, "action-sheet-button ")][span[text()="Reply"]]').waitForClickable()
        await $('//button[contains(@class, "action-sheet-button ")][span[text()="Reply"]]').click()
    }


    async chooseFileToUpload() {
        const filePath = path.resolve(__dirname, '..', '..', '..', 'resources', 'linklive.txt')
        await this.fileUploadInput.addValue(filePath)
    }

    async sendEmail() {
        await this.sendButton.click()
    }

    //: IMprove method name
    async emailFrom() {
        await $('//*[@id="inbox-mail"]').waitForDisplayed()
        //get number of app-email-item
        // divide into 2 then add 1 to get the first visible element
        const position = await this.getFirstVisibleElement()

        return $(`//*[@id="inbox-mail"]//app-email-item[position()=${position}]//h3`)
    }

    async openLatestEmail() {
        await $('//*[@id="inbox-mail"]').waitForDisplayed()
        await $('//*[@id="inbox-mail"]').waitForEnabled()
        const position = await this.getFirstVisibleElement()
        await $(`//*[@id="inbox-mail"]//app-email-item[position()=${position}]`).click()
    }

    private async getFirstVisibleElement() {
        const numberOfChildren = await $$('//*[@id="inbox-mail"]//app-email-item')
        return (numberOfChildren.length / 2) + 1
    }

}

export default new MessageCenter()