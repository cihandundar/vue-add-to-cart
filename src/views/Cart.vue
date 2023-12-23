<template>
  <section class="cart-section">
    <div class="cart-container">
      <div class="cart-container-title">
        <h1>Shopping Cart</h1>
        <div v-if="cartItems.length === 0" class="empty-cart-message">
          <img :src="imgUrl" />
          <p>Your cart is empty</p>
          <button><RouterLink to="/product">Shopping Now</RouterLink></button>
        </div>
      </div>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.id">
          <div class="cart-item">
            <div class="cart-item-image">
              <img :src="item.image" alt="Product Image" />
            </div>
            <div class="cart-item-price">
              <h3>{{ item.title }}</h3>
              <h4>{{ item.price }} $</h4>
              <div class="cart-item-quantity">
                <button @click="increaseQuantity(item.id)">+</button>
                <p>{{ item.quantity }}</p>
                <button @click="decreaseQuantity(item.id)">-</button>
              </div>
              <h4>Total: {{ item.price * item.quantity }} $</h4>
              <button @click="removeItem(item.id)">Remove</button>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="cartItems.length > 0" class="total">
        <h3>Total: {{ cartTotal }} $</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import imgUrl from "../assets/images/hero.jpg";
const store = useStore();
const cartItems = store.state.cart;
const cartTotal = computed(() => store.getters.cartTotal);

const removeItem = (productId) => {
  store.dispatch("removeFromCart", productId);
};
const increaseQuantity = (productId) => {
  store.dispatch("increaseQuantity", productId);
  store.commit("updateCartTotal");
};

const decreaseQuantity = (productId) => {
  store.dispatch("decreaseQuantity", productId);
  store.commit("updateCartTotal");
};
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

.cart-container-title {
  text-align: center;
}
.cart-container-title h1 {
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 50px;
  color: #34495e;
}

.empty-cart-message {
  margin-top: 30px;
}

.empty-cart-message img {
  width: 300px;
}
.empty-cart-message button {
  margin-top: 10px;
  padding: 15px 40px;
  background-color: #41b883;
  border: none;
  cursor: pointer;
}

.empty-cart-message button a {
  color: #fff;
}

.cart-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.cart-item {
  width: 280px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
}
.cart-item-image img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}

.cart-item-price button {
  margin-top: 10px;
  padding: 15px 40px;
  background-color: #41b883;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 8px;
}

.cart-item-price h3 {
  text-transform: uppercase;
  margin-block: 0.62rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #34495e;
}
.cart-item-price h4 {
  color: #34495e;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-item-quantity p {
  margin-inline: 10px;
}
.cart-item-quantity button {
  padding: 8px;
}
.total {
  margin-top: 10px;
  text-align: center;
  color: #34495e;
}

@media screen and (max-width: 1024px) {
  .cart-items {
    justify-content: center;
  }
}
</style>
