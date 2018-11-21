export class ShopCart {
    constructor() {
        this.items = [];
        this.totalCnt = 0; //Total count for all items in shopcart
        this.totalPrice = 0; //Total pricing for all items in shopcart
    }
}


// export class ShopCart {
//     constructor(items=[], cnt=0, sum =0) {
//         if (typeof key != 'undefined') {
//             this['_' + key] = value;
//         }
//     }

//     get items() {
//         return this._items;
//     }

//     set items(value){
//         this._items=value;
//     }

//     get totalCnt() {
//         return this._totalCnt;
//     }

//     set totalCnt(value){
//         this._totalCnt=value;
//     }

//     get totalPrice() {
//         return this._totalPrice;
//     }

//     set totalPrice(value){
//         this._totalPrice=value;
//     }
// }
