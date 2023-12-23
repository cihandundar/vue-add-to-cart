<template>
  <div class="hero">
    <div class="hero-container">
      <div class="hero-item">
        <div class="hero-image">
          <img :src="imgUrl" />
        </div>
        <div class="hero-text">
          <h3>Lorem Ipsum</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            optio natus saepe cumque corporis, quam quasi id! Voluptate, cumque?
            Cumque quo quos officiis unde voluptatum animi esse eos voluptates
            ea.
          </p>
          <button><RouterLink to="/product">Shopping Now</RouterLink></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import imgUrl from "../assets/images/hero.jpg";
</script>

<style>
.hero-container {
  max-width: 1200px;
  margin: 0 auto;
}
.hero-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-image {
  max-width: 700px;
}

.hero-image img {
  width: 100%;
}
.hero-text {
  padding: 30px;
}
.hero-text h3 {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #34495e;
}
.hero-text p {
  margin-block: 15px;
  color: #34495e;
}

.hero-text button {
  padding: 15px 40px;
  background-color: #41b883;
  border: none;
  cursor: pointer;
}

.hero-text button a {
  color: #fff;
}

@media screen and (max-width: 1024px) {
  .hero-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
