import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import MessageCenter from '../pageobjects/appList/messagecenter.page'
import { EmailDetails } from '../types/inputPayload'

describe('Send Email', () => {

    beforeEach(async () => {
        await Login.open('/')
    })

    it('should successfully send an Email', async () => {
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
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
        await MessageCenter.chooseFileToUpload()

        await expect(MessageCenter.attachedFile).toHaveText('linklive.txt')
        await expect(MessageCenter.sendButton).toBeClickable()

        await MessageCenter.sendEmail()
    
    })

    it('verify sent Email', async () => {
        await Login.login('jh-interview-user@revation.com','Summer2022!')
        await Communicator.gotoMessageCenter()
        await MessageCenter.mailInbox.click()
        
        await expect(MessageCenter.getSenderEmailElement()).toHaveText('jh-interview-user2@revation.com')
    })
})