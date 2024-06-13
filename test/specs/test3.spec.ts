import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'

describe('Chat Session', () => {

    beforeEach(async () => {
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

    })

    it.only('should allow user to start a chat', async () => {
        await Communicator.clickContact('link.revation.com')
        await Communicator.clickStartMessagingOption()
        await expect(Communicator.activeSessions).toBeDisplayed()
        await expect(Communicator.activeSessions)
        await browser.pause()
    })
})