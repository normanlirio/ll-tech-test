import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import { ERROR_INVALID_CREDENTIALS, ERROR_CHECK_URL, LOGIN_URL, INVALID_EMAIL, INVALID_PASSWORD } from '../utils/constant'
import credentialsConfig from '../types/credentials'


describe('User Login', () => {

    beforeEach(async () => {
        await Login.open(LOGIN_URL)
    })

    it('should a user to login successfully with valid credentials', async () => {
        await Login.typeEmail(credentialsConfig.email2)
        await Login.typePassword(credentialsConfig.password)

        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(browser).toHaveUrl(expect.stringContaining('communicator'))
        await expect(Communicator.contacts).toBeDisplayed()

    })

    it('should show error cards when user enters invalid credentials', async () => {
        await Login.typeEmail(INVALID_EMAIL)
        await Login.typePassword(INVALID_PASSWORD)

        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(Login.getErrorMessage(ERROR_INVALID_CREDENTIALS)).toBeDisplayed()
        await expect(Login.getErrorMessage(ERROR_CHECK_URL)).toBeDisplayed()

    })
})