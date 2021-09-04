const axios = require('axios').default;

class Product{
    constructor(title, description, price, gateways, type, discount_value){
        this.title = title;
        this.description = description;
        this.price = price;
        this.gateways = gateways;
        this.type = type;
        this.discount_value = discount_value
    }
}
class Coupon{
    constructor(code,discount_value,max_uses,products_bound){
        this.code = code;
        this.discount_value = discount_value;
        this.max_uses = max_uses;
        this.products_bound = products_bound
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

    //FEEDBACK ENDPOINTS
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

    replyFeedback(id,reply) {
		const params = `feedback/reply/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,{'reply':reply},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    //

    //Coupon Endpoints
    getCoupon(id) {
		const params = `coupons/${id}`;
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

    createCoupon(code,discount_value,max_uses,products_bound) {
        let coupon = new Coupon(code,discount_value,max_uses,products_bound);
		const params = `coupons`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,coupon,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    editCoupon(id,args) {
        let coupon = new Coupon(code,discount_value,max_uses,products_bound);
        console.log(coupon);
		const params = `coupons/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,args,'PUT').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    deleteCoupon(id)
    {
        const params = `coupons/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'DELETE').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
    }
    //
    

    //Product Endpoints
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

    createProduct(title, description, price, gateways, type, discount_value,args) {
        let product = new Product(title,description,price,gateways,type,discount_value);
		const params = `products`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params, {...product,...args},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    editProduct(id,args) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,args,'PUT').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    deleteProduct(id) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'DELETE').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    //

    //Query Endpoints
    getQuery(id) {
		const params = `queries/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    getAllQueries() {
		const params = `queries`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    replyQuery(id,reply) {
		const params = `queries/${reply}/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,{"reply":reply},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    closeQuery(id) {
		const params = `queries/close/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    reopenQuery(id) {
		const params = `queries/reopen/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    //

    async apiRequest(params,body,method){
        return await new Promise((resolve, reject) => {
            axios({
                    method: method ? method:'GET',
                    url: this.url + params,
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
