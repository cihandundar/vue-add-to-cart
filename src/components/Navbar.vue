<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <h1>Logo</h1>
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

<script></script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.header-container > .logo h1 {
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

nav ul {
  display: flex;
  align-items: center;
}

nav ul li:not(:last-child) {
  margin-right: 30px;
}

nav ul li a:hover {
  color: rgb(88, 86, 86);
}
</style>
