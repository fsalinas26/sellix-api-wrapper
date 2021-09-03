const axios = require('axios').default;

class Product{
    constructor(title, description, price, gateways, type, discount_value){
        this.title = title;
        this.description = description;
        this.price = price;
        this.gateways = gateways;
        this.type = type;
        this.discount_value = discount_value;
    }
}
class Sellix{
    constructor(api_key){
        this.api_key = api_key;
        this.url = 'https://dev.sellix.io/v1/'
    }
    getAllOrders() {
		const params = `orders`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    getOrder(id) {
		const params = `orders/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getAllProducts() {
		const params = `products`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getFeedback(id) {
		const params = `feedback/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getAllFeedback() {
		const params = `feedback`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getAllCoupons() {
		const params = `coupons`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    replyFeedback(id,reply) {
		const params = `feedback/${id}`;
		return new Promise((resolve, reject) => {
			this.postRequest(params,{'reply':reply}).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    createCoupon(code,discount_value,max_uses,products_bound) {
        var couponArgs ={
            'code':code,
            'discount_value':discount_value,
            'max_uses':max_uses,
            'products_bound':products_bound
        }
		const params = `coupons`;
		return new Promise((resolve, reject) => {
			this.postRequest(params,couponArgs).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    deleteProduct(id) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,'DELETE').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getProduct(id) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    createProduct(Product) {
		const params = `products`;
		return new Promise((resolve, reject) => {
			this.postRequest(params, Product).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    async apiRequest(data,method){
        return await new Promise((resolve, reject) => {
            axios({
                    method: method ? 'GET':method,
                    url: this.url + data,
                    headers: {
                        'Authorization': `Bearer ${this.api_key}`,
                    },
                    responseType: 'json',
                    proxy: false,
            }).then(res=>{
                    return resolve(res.data);
            }).catch((err=>{
                    return reject(err);
            }));

        });
    }
    async postRequest(req,body){
        return await new Promise((resolve, reject) => {
            axios({
                    method: 'POST',
                    url: this.url+req,
                    data: body,
                    headers: {
                        'Authorization': `Bearer ${this.api_key}`,
                    },
                    responseType: 'json',
                    proxy: false,
            }).then(res=>{
                    return resolve(res.data);
            }).catch((err=>{
                    return reject(err);
            }));

        });
    }

}


module.exports = Sellix;
