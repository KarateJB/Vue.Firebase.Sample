export class ShopCart {
    constructor() {
        this.items = [];
        this.cnt = 0; //Total count for all items in shopcart
        this.sum = 0; //Total pricing for all items in shopcart
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

//     get cnt() {
//         return this._cnt;
//     }

//     set cnt(value){
//         this._cnt=value;
//     }

//     get sum() {
//         return this._sum;
//     }

//     set sum(value){
//         this._sum=value;
//     }
// }
