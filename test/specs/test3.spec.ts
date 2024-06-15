import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'

describe('Chat Session', () => {
//TODO: Improve Login
    beforeEach(async () => {
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await Communicator.dismissModal()
    })

    it('should allow user to start a chat', async () => {
        await Communicator.waitForOnlineStatus('link.revation.com')
        await Communicator.clickContact('link.revation.com')
        await Communicator.selectPopUpOption(0)
        await expect(Communicator.activeSessions).toBeDisplayed()
        await expect(Communicator.internalLabel).toBeDisplayed()
        await expect(Communicator.timer).toBeDisplayed() 
        await browser.pause()
    })
})