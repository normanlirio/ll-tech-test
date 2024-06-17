import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import { LINK_REVATION, LOGIN_URL, START_MESSAGING } from '../utils/constant'
import credentialsConfig from '../types/credentials'

describe('Chat Session', () => {

    beforeEach(async () => {
        await Login.open(LOGIN_URL)
        await Login.login(credentialsConfig.email2, credentialsConfig.password)
        await Communicator.dismissModal()
    })

    it('should allow user to start a chat', async () => {
        await Communicator.waitForOnlineStatus(LINK_REVATION)
        await Communicator.clickContact(LINK_REVATION)
        await Communicator.selectContactAction(START_MESSAGING)

        await expect(Communicator.activeSessions).toBeDisplayed()
        await expect(Communicator.internalLabel).toBeDisplayed()

        await expect(Communicator.timer).toBeDisplayed()
    })
})