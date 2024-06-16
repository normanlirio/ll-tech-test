import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import MessageCenter from '../pageobjects/appList/messagecenter.page'
import { EmailDetails } from '../types/inputPayload'
import { EMAIL_ACTION_REPLY, EMAIL_BODY } from '../utils/constant'

describe('User reply', () => {

    beforeEach(async () => {
        browser.throttleCPU(5)
        await Login.open('/')
    })

    it('should send an Email to another user', async () => {
        await Login.login('jh-interview-user2@revation.com', 'Summer2022!')
        await Communicator.dismissModal()

        const emailDetails: EmailDetails = {
            recipient: 'jh-interview-user@revation.com',
            subject: 'Link Live Test',
            emailBody: 'Link Live Technical Assessment'
        }

        await Communicator.gotoMessageCenter()
        await expect(MessageCenter.composeMessageButton).toBeDisplayed()

        await MessageCenter.clickComposeNewMessageButton()
        await MessageCenter.fillToAndSubject(emailDetails)
        await MessageCenter.addEmailBody(emailDetails.emailBody)

        await expect(MessageCenter.sendButton).toBeClickable()

        await MessageCenter.sendEmail()
    })

    it('should allow user to reply to an email', async () => {
        await Login.login('jh-interview-user@revation.com', 'Summer2022!')
        await Communicator.gotoMessageCenter()
        await MessageCenter.mailInbox.click()
        await MessageCenter.openLatestEmail()
        await MessageCenter.performEmailAction(EMAIL_ACTION_REPLY)
        await MessageCenter.addEmailBody(EMAIL_BODY)
        await MessageCenter.sendEmail()

    })

    it('should verify the reply of the other user', async () => {
        await Login.login('jh-interview-user2@revation.com', 'Summer2022!')
        await Communicator.gotoMessageCenter()
        await MessageCenter.openLatestEmail()
        
        await expect(MessageCenter.readerEmailSender).toHaveText('From: jh-interview-user@revation.com')
        await expect(MessageCenter.readerEmailSubject).toHaveText('RE: Link Live Test')
    })

})