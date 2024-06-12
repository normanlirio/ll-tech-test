import Login from '../pageobjects/login.page'
import Communicator from '../pageobjects/communicator.page'

describe('User Login', () => {

    beforeEach(async () => {
        await Login.open('/')
    })

    it('should a user to login successfully with valid credentials', async () => {
        await Login.login('jh-interview-user@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect(browser).toHaveUrl(expect.stringContaining('communicator'))
        await expect(Communicator.contacts).toBeDisplayed()
        
    })

    it('should show error cards when user enters invalid credentials', async () => {
        await Login.login('invalid-login@revation.com','Summer2022!')
        await expect(Login.signIn).toBeEnabled()

        await Login.clickSignInButton()

        await expect($('ion-text.rev-text-alert*=Credentials')).toBeDisplayed()
        await expect($('ion-text.rev-text-alert*=URL')).toBeDisplayed()
    
    })
})