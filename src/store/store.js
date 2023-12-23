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
      this.commit("updateCartTotal");
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
        toast.error("Removed from cart 🗑️");
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    updateCartTotal(state) {
      state.cartTotal = state.cart
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);
      localStorage.setItem("cartTotal", state.cartTotal);
    },
    increaseProductQuantity(state, productId) {
      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity++;
        product.priceTotal = (product.price * product.quantity).toFixed(2);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      this.commit("updateCartTotal");
      this.commit("saveCartToLocalStorage");
    },

    decreaseProductQuantity(state, productId) {
      const productIndex = state.cart.findIndex(
        (item) => item.id === productId
      );
      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        if (product.quantity > 1) {
          product.quantity--;
          product.priceTotal = (product.price * product.quantity).toFixed(2);
        } else {
          state.cart.splice(productIndex, 1);
          toast.error("Removed from cart 🗑️");
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
        this.commit("updateCartTotal");
        this.commit("saveCartToLocalStorage");
      }
    },

    saveCartToLocalStorage(state) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartTotal", state.cartTotal);
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
    },
    increaseQuantity({ commit }, productId) {
      commit("increaseProductQuantity", productId);
    },
    decreaseQuantity({ commit }, productId) {
      commit("decreaseProductQuantity", productId);
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
