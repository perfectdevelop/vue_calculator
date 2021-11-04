<template>
  <div id="app">
    <div class="title-container">
      <span class="center main-header">İşsizlik Maaşı Hesaplama</span>
    </div>
    <div class="banner banner--calculation">
      <div class="banner__content">
        <Form/>
        <Results/>
      </div>
    </div>
  </div>
</template>

<script>
import Form from './components/calculation-tools/cc-delay-interest/form.vue'
import Results from './components/calculation-tools/cc-delay-interest/results.vue'

export default {
  name: 'App',
  components: {
    Form,
    Results
  }
}
</script>

<style lang="scss">
  @import "./assets/pages/calculation-tools/cc-delay-interest/inquiry.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title-container {
  background-color: rgb(87, 144, 230);
  min-height: 150px;
  width: 100%;
  display: table;
}

.center {
  display: table-cell;
  vertical-align: middle;
}
</style>
