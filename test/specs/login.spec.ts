import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'
import { ERROR_INVALID_CREDENTIALS, ERROR_CHECK_URL } from '../utils/constant'


describe('User Login', () => {

    beforeEach(async () => {
        await Login.open('/')
    })

    it('should a user to login successfully with valid credentials', async () => {
        await Login.typeEmail('jh-interview-user2@revation.com')
        await Login.typePassword('Summer2022!')
        
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(browser).toHaveUrl(expect.stringContaining('communicator'))
        await expect(Communicator.contacts).toBeDisplayed()
        
    })

    it('should show error cards when user enters invalid credentials', async () => {
        await Login.typeEmail('invalid-user@revation.com')
        await Login.typePassword('invalid-password')
        
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(Login.getErrorMessage(ERROR_INVALID_CREDENTIALS)).toBeDisplayed()
        await expect(Login.getErrorMessage(ERROR_CHECK_URL)).toBeDisplayed()
    
    })
})