import Base from "./base.page"

class Communicator extends Base {

    get contacts() { return $('div#contacts') }


}

export default new Communicator()