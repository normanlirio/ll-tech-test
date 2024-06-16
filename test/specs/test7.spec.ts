import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import CommunicatorMini from '../pageobjects/communicatormini.page'


describe('Message via Mini mode', () => {

    beforeEach(async () => {
        await browser.setWindowSize(767,800)
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await Communicator.dismissModal()
    })

    it('should allow user to send message using mini mode', async () => {
        // await expect(CommunicatorMini.contactsTab).toBeDisplayed()
        await browser.pause(5000)
        await CommunicatorMini.conversationsTab.click()

        await browser.pause(5000)
        await CommunicatorMini.selectUserStatus('Online')

        await browser.pause(10000)
        await CommunicatorMini.contactsTab.click()
        await Communicator.waitForOnlineStatus('link.revation.com')
        await Communicator.clickContact('link.revation.com')
        
        await Communicator.selectPopUpOption(1)

        await expect(Communicator.headerTitle).toHaveText('Messaging')

        await Communicator.typeMessage('Hey Hey Hey test')

        await expect($('//div[contains(@class, "messages mine")][last()]//div[contains(@class, "message")]')).toHaveText('Hey Hey Hey test')

        await browser.pause(10000)
    })
})