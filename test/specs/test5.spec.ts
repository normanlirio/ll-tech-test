
import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import MessageCenter from '../pageobjects/appList/messagecenter.page'

describe('Send Secure Mail', () => {
    beforeEach(async () => {
        await Login.open('/')

        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await Communicator.dismissModal()
    })

    it('should bring the user to Message Center upon selecting Send Secure Mail to a specific User', async () => {

        await Communicator.clickContact('link.revation.com')
        await Communicator.selectPopUpOption(3)
        await expect(MessageCenter.composeMessageButton).toBeDisplayed()
     
        await MessageCenter.selectEmailForSending('noreply@company.com', 'OK')
        const recipientEmail =  await MessageCenter.getPrefilledEmail()
        await expect(recipientEmail).toEqual('link@secure.revation.com')
        await browser.pause()
    })

})