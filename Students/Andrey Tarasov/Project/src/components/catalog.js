class CatalogItem {
	constructor(item) {
		this.item = item;
	}

	render() {
        return `
        <div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
        <div class="feturedItem">
            <div class="feturedImgWrap">
                <div class="feturedBuy">
                    <button
                        name="add"
                        data-id="${this.item.productId}"
                        data-name="${this.item.productName}"
                        data-price="${this.item.productPrice}"
                        data-img="${this.item.productImg}"
                    >
                        <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                    </button>
                </div>
                <img class="feturedProduct" src="${this.item.productImg}" alt="product1">
            </div>
            <div>
                <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                    <div class="feturedItemName">${this.item.productName}</div>
                    <div class="feturedItemPrice">$${this.item.productPrice}</div>
                    <button 
                        class="d-md-none"
                        name="add"
                        data-id="${this.item.productId}"
                        data-name="${this.item.productName}"
                        data-price="${this.item.productPrice}"
                        data-img="${this.item.productImg}"
                    >
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
        `  
	}
}

export default class Catalog {
    constructor(basket, container = '#catalog', url = '/catalog.json') {
    this.container = document.querySelector(container);
    this.items = [];
    this.basket = basket;
    this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
    this.init();
    }

    init() {
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }

    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new CatalogItem(item).render();
        });
        this.container.innerHTML = htmlStr;
    }

    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    }

    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
}