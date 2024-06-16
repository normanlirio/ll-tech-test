import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import { LINK_REVATION, START_MESSAGING } from '../utils/constant'

describe('Chat Session', () => {

    beforeEach(async () => {
        await Login.open('/')
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await Communicator.dismissModal()
    })

    it('should allow user to start a chat', async () => {
        await Communicator.waitForOnlineStatus(LINK_REVATION)
        await Communicator.clickContact(LINK_REVATION)
        await Communicator.selectPopUpOption(START_MESSAGING)

        await expect(Communicator.activeSessions).toBeDisplayed()
        await expect(Communicator.internalLabel).toBeDisplayed()
        await expect(Communicator.timer).toBeDisplayed() 

    })
})