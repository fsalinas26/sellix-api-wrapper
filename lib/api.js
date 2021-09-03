const axios = require('axios').default;


class Sellix{
    constructor(authorisation){
        this.authorisation = authorisation;
        this.url = 'https://dev.sellix.io/v1'
    }


}

module.exports = Sellix;