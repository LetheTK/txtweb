<template>
  <div class="app">
    <nav>
      <router-link to="/split">文件分割</router-link>
      <router-link to="/merge">文件合并</router-link>
      <router-link to="/dedup">章节去重</router-link>
    </nav>
    
    <router-view></router-view>
  </div>
</template> 