<template>
  <section class="section">
    <div class="section-container">
      <div class="section-container-title">
        <h1>Product</h1>
      </div>
      <ul class="product-wrapper">
        <li class="product-card" v-for="product in products" :key="product.id">
          <div class="product-image">
            <img :src="product.image" alt="Product Image" />
          </div>
          <div class="product-title">
            <h4>{{ product.title }}</h4>
          </div>
          <div class="product-price">
            <p>{{ product.price }} $</p>
          </div>
          <button @click="addToCart(product)">Add to Cart</button>
          <button
            style="margin-top: 10px"
            @click="navigateToDetail(product.id)"
          >
            View Details
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const products = ref([]);

onMounted(async () => {
  try {
    await store.dispatch("fetchProducts");
  } catch (error) {
    console.error(error);
  }
});

const fetchedProducts = () => store.getters.getProducts;

store.watch(fetchedProducts, (newVal) => {
  products.value = newVal;
});

const addToCart = (product) => {
  store.dispatch("addToCart", product);
};

const navigateToDetail = (productId) => {
  router.push({ name: "productDetail", params: { id: productId } });
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
  color: #34495e;
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
  color: #34495e;
}

.product-image img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}

.product-price p {
  margin-bottom: 10px;
  font-weight: bold;
  color: #34495e;
}

.product-card button {
  width: 100%;
  height: 45px;
  border-radius: 8px;
  background-color: #41b883;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
}
</style>
