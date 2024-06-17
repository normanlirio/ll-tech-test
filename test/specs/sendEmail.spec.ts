import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import MessageCenter from '../pageobjects/appList/messagecenter.page'
import { EmailDetails } from '../types/inputPayload'
import { LOGIN_URL } from '../utils/constant'
import credentialsConfig from '../types/credentials'

describe('Send Email', () => {

    beforeEach(async () => {
        await Login.open(LOGIN_URL)
    })

    it('should successfully send an Email', async () => {
        await Login.login(credentialsConfig.email2, credentialsConfig.password)
        await Communicator.dismissModal()

        const emailDetails: EmailDetails = {
            recipient: credentialsConfig.email1,
            subject: 'Link Live Test',
            emailBody: 'Link Live Technical Assessment'
        }

        await Communicator.gotoMessageCenter()
        await expect(MessageCenter.composeMessageButton).toBeDisplayed()

        await MessageCenter.clickComposeNewMessageButton()
        await MessageCenter.fillToAndSubject(emailDetails)
        await MessageCenter.addEmailBody(emailDetails.emailBody)
        await MessageCenter.chooseFileToUpload()

        await expect(MessageCenter.attachedFile).toHaveText('linklive.txt')
        await expect(MessageCenter.sendButton).toBeClickable()

        await MessageCenter.sendEmail()

        await expect(MessageCenter.latestEmail).toBeDisplayed()
    })

    it('verify sent Email', async () => {
        await Login.login(credentialsConfig.email1, credentialsConfig.password)
        await Communicator.gotoMessageCenter()
        await MessageCenter.mailInbox.click()

        await expect(MessageCenter.latestEmailSender).toHaveText(credentialsConfig.email2)
        await expect(MessageCenter.latestEmailSender).toHaveAttr('class', 'unread')
    })
})