<template>
  <div id="calculation-results" class="calculation-results funnel-form mt-4" v-if="isResult">

    <loading v-if="loading"></loading>

    <img class="calculation-results__hklogo mb-4" src="https://d17le0zlhc8orn.cloudfront.net/img/hesapkurdu-logo-black.png" alt="Hesapkurdu MTV Hesaplama">

    <ul class="application-detail-list p-0">
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>Aracın Vergisiz Bedeli:</span>
        <span>
          <strong>{{ response.VehicleValueWithoutTax | formatMoney(0) }} TL</strong>
        </span>
      </li>
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>ÖTV Oranı:</span>
        <span>
          <strong>%{{ response.OtvRateAsPercentage | formatMoney }}</strong>
        </span>
      </li>
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>ÖTV Tutarı:</span>
        <span>
          <strong>{{ response.OtvAmount | formatMoney(0) }} TL</strong>
        </span>
      </li>
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>KDV Oranı:</span>
        <span>
          <strong>%{{ response.KdvRateAsPercentge | formatMoney }}</strong>
        </span>
      </li>
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>KDV Tutarı:</span>
        <span>
          <strong>{{ response.KdvAmount | formatMoney(0) }} TL</strong>
        </span>
      </li>
      <li class="application-detail-list__elements d-flex justify-content-between">
        <span>Vergiler Toplamı:</span>
        <span>
          <strong>{{ response.TotalTaxes | formatMoney(0) }} TL</strong>
        </span>
      </li>
    </ul>
    
    <a class="btn btn-secondary btn-block mb-2" href="/trafik-sigortasi"> Trafik Sigortası Teklifleri</a>
    <a class="btn btn-secondary btn-block mb-2" href="/kasko-sigortasi"> Kasko Sigortası Teklifleri</a>

    <div>
      <p id="js-scrollToReport" class="text--small-link-detail report-comment pt-4 mb-0">Hata Bildir veya Yorum Yap</p>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus";
import Loading from "../shared/loading.vue"

export default {
  data() {
    return {
      loading: true,
      isResult: false,

      response: '',
    };
  },
  components: {
      Loading
  },
  mounted() {

    EventBus.$on("GET-RESPONSE", response => {

      this.loading = true;
      this.response = response;
      this.isResult = true;
      
      setInterval(() => {
          this.loading = false;
      }, 800);

    });

    EventBus.$on("GET-ERROR", error => {
      this.isResult = false;
    });

  },
  filters: {

    formatMoney(data,fixed=2){
      let newData = Number(data).toFixed(fixed);
      newData = newData.toString().split('.').join(',');
      newData = newData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return newData;
    }

  }
};
</script>