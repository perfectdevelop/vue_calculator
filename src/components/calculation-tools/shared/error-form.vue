<template>
  <div class="row">
    <div class="col-12 mt-3">
      <div class="calculation-results__alert">{{ message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' }}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'message'
    ],
    data() {
        return {};
    }
};
</script>