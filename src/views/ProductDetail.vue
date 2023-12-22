<template>
  <div class="details">
    <div class="details-container">
      <div class="details-container-wrapper" v-if="product">
        <div class="details-container-image">
          <img :src="product.image" alt="Product Image" />
        </div>
        <div class="details-container-right">
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <div class="details-container-right-rate">
            <h4>{{ product.price }} $</h4>
            <h4>⭐{{ product.rating.rate }}</h4>
          </div>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const productId = route.params.id;

const product = computed(() => {
  const products = store.state.products;
  const selectedProduct = products.find(
    (product) => product.id.toString() === productId
  );
  return selectedProduct;
});

const addToCart = (product) => {
  store.dispatch("addToCart", product);
};
</script>

<style scoped>
.details-container {
  max-width: 1200px;
  margin: 0 auto;
}
.details-container-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-container-image img {
  max-width: 300px;
  height: 100%;
  object-fit: contain;
}

.details-container-right {
  padding: 50px;
}
.details-container-right h3 {
  text-transform: uppercase;
  letter-spacing: 2px;
}
.details-container-right p {
  margin-block: 20px;
}
.details-container-right-rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-container-right button {
  width: 100%;
  height: 45px;
  border-radius: 8px;
  background-color: rgb(63, 0, 63);
  border: none;
  color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
  margin-top: 15px;
}

.details-container-right button:hover {
  background-color: rgb(133, 0, 133);
}
</style>
