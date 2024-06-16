
import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import MessageCenter from '../pageobjects/appList/messagecenter.page'
import { LINK_REVATION, LINK_REVATION_MAIL, NOREPLY_EMAIL, SEND_SECURE_MAIL } from '../utils/constant'

describe('Send Secure Mail', () => {
    beforeEach(async () => {
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await Communicator.dismissModal()
    })

    it('should bring the user to Message Center upon selecting Send Secure Mail to a specific User', async () => {
        await Communicator.clickContact(LINK_REVATION)
        await Communicator.selectPopUpOption(SEND_SECURE_MAIL)
        await expect(MessageCenter.composeMessageButton).toBeDisplayed()
     
        await MessageCenter.selectEmailForSending(NOREPLY_EMAIL, 'OK')
        const recipientEmail =  await MessageCenter.getPrefilledEmail()
        await expect(recipientEmail).toEqual(LINK_REVATION_MAIL)

    })

})