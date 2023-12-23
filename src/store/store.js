import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const store = createStore({
  state() {
    return {
      cart: [],
      products: [],
      cartTotal: 0,
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
      toast.success("Added to cart 🚀");
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
        toast.error("Removed from cart 🗑️");
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    updateCartTotal(state, updatedTotal) {
      state.cartTotal = updatedTotal;
      localStorage.setItem("cartTotal", updatedTotal);
    },
    loadCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      const cartTotal = localStorage.getItem("cartTotal");
      if (cart) {
        state.cart = JSON.parse(cart);
      }
      if (cartTotal) {
        state.cartTotal = cartTotal;
      }
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
    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
      const updatedCartTotal = context.getters.cartTotal;
      commit("updateCartTotal", updatedCartTotal);
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
    cartTotal: (state) => {
      return state.cart
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);
    },
  },
});

store.commit("loadCartFromLocalStorage");

export default store;
