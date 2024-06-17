import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import { CHAT_MESSAGE, HEADER_MESSAGING, LINK_REVATION, LOGIN_URL, START_MESSAGING } from '../utils/constant'
import credentialsConfig from '../types/credentials'

describe('Message via Mini mode', () => {

    beforeEach(async () => {
        await browser.setWindowSize(767, 800)
        await Login.open(LOGIN_URL)
        await Login.login(credentialsConfig.email2, credentialsConfig.password)
        await Communicator.dismissModal()
    })

    it('should allow user to send message using mini mode', async () => {
        await Communicator.clickCContactsTab()
        await Communicator.waitForOnlineStatus(LINK_REVATION)
        await Communicator.clickContact(LINK_REVATION)
        await Communicator.selectContactAction(START_MESSAGING)

        await expect(Communicator.headerTitle).toHaveText(HEADER_MESSAGING)

        await Communicator.typeMessage(CHAT_MESSAGE)

        await expect(Communicator.latestChatMessage).toHaveText(CHAT_MESSAGE)

    })
})