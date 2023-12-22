import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      cart: [],
      products: [],
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      console.log("addtocart", product);
    },
  },
  actions: {
    async fetchProducts(context) {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        context.commit("setProducts", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    addToCart(context, product) {
      context.commit("addToCart", product);
    },
  },
  getters: {
    getProductById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
    getProducts(state) {
      return state.products;
    },
    cartItems(state) {
      return state.cart;
    },
  },
});

export default store;
