<template>
  <div class="app">
    <header class="header">
      <h1>TXT 文件处理工具</h1>
      <nav class="nav">
        <router-link to="/split" class="nav-link">文件分割</router-link>
        <router-link to="/merge" class="nav-link">文件合并</router-link>
        <router-link to="/dedup" class="nav-link">章节去重</router-link>
      </nav>
    </header>
    
    <main class="main">
      <router-view></router-view>
    </main>
    
    <footer class="footer">
      <p>© 2024 TXT 文件处理工具</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.nav {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.nav-link.router-link-active {
  color: #4CAF50;
  font-weight: 500;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: #fff;
  color: #666;
  font-size: 0.875rem;
}
</style> 