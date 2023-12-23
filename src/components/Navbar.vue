<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <img :src="logoUrl" alt="" />
      </div>
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/product">Product</RouterLink></li>
          <li><RouterLink to="/cart">Cart</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import logoUrl from "../assets/images/vue-logo.png";
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.header-container > .logo img {
  width: 80px;
}

nav ul {
  display: flex;
  align-items: center;
}

nav ul li:not(:last-child) {
  margin-right: 30px;
}
nav ul li a {
  font-weight: bold;
  transition: 0.5s ease;
  color: #34495e;
}
nav ul li a:hover {
  color: #41b883;
}

@media screen and (max-width: 1024px) {
  .header-container {
    max-width: 800px;
  }
}

@media screen and (max-width: 768px) {
  .header-container {
    flex-direction: column;
  }

  nav ul {
    flex-direction: column;
  }

  nav ul li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
