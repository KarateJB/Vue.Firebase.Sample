import { mapState } from 'vuex'

const STEP = 1;

export const shopcartMapState = {
  // ...
  computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count',

    // to access local state with `this`, a normal function must be used
    nextCount(state) {
        return state.count + STEP;
    },

    previousCount(state){
        return state.count - STEP;
    }
  })
}