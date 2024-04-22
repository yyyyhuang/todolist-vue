<template>
  <div class="navigation-bar">
    <router-link to="/" class="nav-item" active-class="active">Todos</router-link>
    <router-link to="/stats" class="nav-item" active-class="active">Stats</router-link>
  </div>

  <router-view></router-view>

</template>

<style scoped>
.navigation-bar {
  display: flex;
  background-color: #f0f0f0;
  padding: 10px;
}

.nav-item {
  margin-right: 10px;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
}

.nav-item:hover {
  background-color: #ddd;
}

.active {
  background-color: #007bff;
  color: #fff;
}
</style>
