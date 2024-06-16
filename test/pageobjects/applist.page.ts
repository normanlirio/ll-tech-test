

export default class AppList {

    get messageCenter() { return $('ion-item[title="Message Center"]') }
    get communicationCenter() { return $('div#app-list ion-item[title="Communication Center"]') }
    get settings() { return $('ion-list#app-list ion-item[title="Settings"]')}
}