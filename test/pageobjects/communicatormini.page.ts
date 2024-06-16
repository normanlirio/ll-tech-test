import Base from "./base.page"

class CommunicatorMini extends Base {

    get contactsTab() { return $('//ion-tab-button[ion-label[text()="Contacts"]]') }
    get conversationsTab() { return $('//ion-tab-button[ion-label[text()="Conversations"]]') }

}

export default new CommunicatorMini()