
import { ShopCart } from '../class/shop-cart';
// import { ShopcartAction } from '../class/ShopcartAction';
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const RESET = 'reset';


export const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state, payload) {
        if(payload) state.count += payload;
        else state.count++;
      },
      decrement(state){
          if(state.count > 0)
            state.count--;
      },
      reset(state){
          state.count= 0;
      }
    },
    actions: {
      increment (context, payload) {
        context.commit('increment', payload);
      },
      decrement(context){
        context.commit('decrement');
      },
      reset(context){
        context.commit('reset');
      }
    }
  })


// export function shopcartReducer(state: ShopCart = new ShopCart(), action: ShopcartAction) {
// export const shopcartReducer: ActionReducer<IShopCart> = (state: ShopCart = new ShopCart(), action: ShopcartAction) => {
//     switch (action.type) {
//         case PUSH:
//             return pushToCart(state, action.payload);

//         case PULL:
//             return pullFromCart(state, action.payload);

//         case CLEAR:
//             state.cnt = 0;
//             state.sum = 0;
//             state.items = [];
//             return state;

//         default:
//             return state;
//     }
// }


// function pushToCart(shopcart: ShopCart, payload: ShopItem):ShopCart {
//     shopcart.cnt += 1;
//     shopcart.sum += payload.price * 1;
//     updateItems(shopcart, payload);
//     return shopcart;
// }

// function pullFromCart(shopcart: ShopCart, payload: ShopItem): ShopCart {
//     shopcart.cnt -= 1;
//     shopcart.sum -= payload.price * 1;
//     updateItems(shopcart, payload);
//     return shopcart;
// }


// function updateItems(shopcart: ShopCart, payload: ShopItem) {
//     let targetItem = shopcart.items.find(item => item.id === payload.id);
//     if (targetItem) { //Exist
//         if (payload.count <= 0) {
//             var index = shopcart.items.indexOf(targetItem);
//             shopcart.items.splice(index, 1);
//         }
//         else {
//             targetItem.count = payload.count;
//         }
//     }
//     else { //First time adding to shopping cart
//         shopcart.items.push(payload);
//     }
// }
