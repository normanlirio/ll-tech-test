import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import CommunicatorMini from '../pageobjects/communicatormini.page'
import { CHAT_MESSAGE, LINK_REVATION, USER_STATUS } from '../utils/constant'


describe('Message via Mini mode', () => {

    beforeEach(async () => {
        await browser.setWindowSize(767,800)
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await Communicator.dismissModal()
    })

    it('should allow user to send message using mini mode', async () => {

        await CommunicatorMini.conversationsTab.click()
        await CommunicatorMini.selectUserStatus(USER_STATUS)
        await CommunicatorMini.contactsTab.click()
        await Communicator.waitForOnlineStatus(LINK_REVATION)
        await Communicator.clickContact(LINK_REVATION)
        
        await Communicator.selectPopUpOption(1)

        await expect(Communicator.headerTitle).toHaveText('Messaging')

        await Communicator.typeMessage(CHAT_MESSAGE)

        await expect(Communicator.latestChatMessage).toHaveText(CHAT_MESSAGE)

    })
})