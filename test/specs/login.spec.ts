import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import Constants from '../utils/constant'

describe('User Login', () => {

    beforeEach(async () => {
        await Login.open('/')
    })

    it('should a user to login successfully with valid credentials', async () => {
        await Login.login('jh-interview-user2@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(browser).toHaveUrl(expect.stringContaining('communicator'))
        await expect(Communicator.contacts).toBeDisplayed()
        
    })

    it('should show error cards when user enters invalid credentials', async () => {
        await Login.login('invalid-login@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(Login.getErrorMessage(Constants.ERROR_INVALID_CREDENTIALS)).toBeDisplayed()
        await expect(Login.getErrorMessage(Constants.ERROR_CHECK_URL)).toBeDisplayed()
    
    })
})