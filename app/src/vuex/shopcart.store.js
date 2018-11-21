
import { ShopCart } from '../class/shop-cart';
// import { ShopcartAction } from '../class/ShopcartAction';
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export const PUSH = 'push';
export const PULL = 'pull';
export const CLEAR = 'clear';


export const store = new Vuex.Store({
  state: new ShopCart(),
  mutations: {
    push(state, payload) {
      pushToCart(state, payload);
    },
    pushBy10(state, payload) {
      pushToCart(state, payload, 10);
    },
    pull(state, payload) {
      pullFromCart(state, payload);
    },
    reset(state) {
      state = new ShopCart();
      // state.cnt = 0;
      // state.sum = 0;
      // state.items = [];
    }
  },
  getters: {
    totalCnt(state) {
      return state.totalCnt;
    },
    totalPrice(state) {
      return state.totalPrice;
    },
    item(state) {
      return (id) => {
        return state.items.find(x => x.id === id);
      }
    }
  },
  actions: {
    push(context, payload) {
      context.commit('push', payload);
    },
    pushBy10(context, payload) {
      context.commit('pushBy10', payload);
    },
    pull(context, payload) {
      context.commit('pull', payload);
    },
    clear(context) {
      context.commit('clear');
    }
  }
})

function pushToCart(shopcart, payload, byAmt = 1) {
  shopcart.totalCnt += byAmt;
  shopcart.totalPrice += payload.price * byAmt;
  updateItems(shopcart, payload);
}


function pullFromCart(shopcart, payload) {
  shopcart.totalCnt -= 1;
  shopcart.totalPrice -= payload.price * 1;
  updateItems(shopcart, payload);
}


function updateItems(shopcart, payload) {
  let targetItem = shopcart.items.find(item => item.id === payload.id);
  if (targetItem) { //Exist
    if (payload.count <= 0) {
      var index = shopcart.items.indexOf(targetItem);
      shopcart.items.splice(index, 1);
    }
    else {
      targetItem.count = payload.count;
    }
  }
  else { //First time adding to shopping cart
    shopcart.items.push(payload);
  }
}


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



