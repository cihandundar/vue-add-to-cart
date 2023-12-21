<template>
  <section class="section">
    <div class="section-container">
      <div class="section-container-title">
        <h1>Product</h1>
      </div>
      <ul class="product-wrapper">
        <li class="product-card" v-for="product in products" :key="product.id">
          <router-link
            :to="{ name: 'productDetail', params: { id: product.id } }"
          >
            <div class="product-image">
              <img :src="product.image" alt="Product Image" />
            </div>
          </router-link>
          <div class="product-title">
            <h4>{{ product.title }}</h4>
          </div>
          <div class="product-price">
            <p>{{ product.price }} $</p>
          </div>
          <button @click="addToCart(product)">Add to Cart</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const cart = ref([]);

const addToCart = (product) => {
  if (product) {
    const existingProduct = cart.value.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }

    console.log("Added to cart:", product);
    console.log("Cart:", cart.value);
  }
};
</script>

<style scoped>
.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-container-title {
  text-align: center;
}

.section-container-title h1 {
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 50px;
}

.product-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  width: 280px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
}

.product-title {
  text-align: center;
}
.product-title h4 {
  text-transform: uppercase;
  margin-block: 0.62rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}

.product-price {
  margin-bottom: 10px;
  font-weight: bold;
}

.product-card button {
  width: 100%;
  height: 45px;
  border-radius: 8px;
  background-color: #000;
  border: none;
  color: #fff;
  cursor: pointer;
}
</style>
