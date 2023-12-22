<template>
  <div class="cart-container">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.title }} - Quantity: {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const cartItems = ref([]);

onMounted(() => {
  cartItems.value = route.params.cartItems || [];
});
</script>
