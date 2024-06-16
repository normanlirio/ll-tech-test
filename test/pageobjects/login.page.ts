import Base from './base.page'

//TODO: add Private group step?
class Login extends Base {

    get email() { return $('input[inputmode="email"]') }
    get password() { return $('input[type="password"]') }
    get signIn() { return $('ion-button.rev-login-button') }

   
    async typeEmail(email: string) {
        await this.email.setValue(email)
    }

    async typePassword(password: string) {
        await this.password.setValue(password)
    }

    async clickSignInButton() {
        await this.signIn.click()
    }

    async login(email: string, password: string) {
        await this.email.setValue(email)
        await this.password.setValue(password)
        await this.signIn.waitForEnabled()
        await this.signIn.click()
    }

    async open(url: string) {
        await super.open(url)
    }

    async getErrorMessage(errorMessage: string) {
        return $(`ion-text.rev-text-alert*=${errorMessage}`)
    }
 
}


export default new Login()