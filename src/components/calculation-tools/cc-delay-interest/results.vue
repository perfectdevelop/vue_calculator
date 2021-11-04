<template>
    <div id="calculation-results" class="calculation-results funnel-form mt-4" v-if="isResult">

        <loading v-if="loading"></loading>

        <!-- <img class="calculation-results__hklogo mb-4" src="https://d17le0zlhc8orn.cloudfront.net/img/hesapkurdu-logo-black.png" alt="Hesapkurdu"> -->

        <ul class="application-detail-list pr-2 pl-2">
            <li class="application-detail-list__elements d-flex bd-highlight py-3 row">
                <div class="col-5 col-md-8 p-0">Aylık İşsizlik Maaşı Tutar: </div>
                <!-- <div class="col p-0 text-right"><strong>{{ response.MinimumPaymentAmount | formatMoney(2) }} TL</strong></div> -->
                <div class="col p-0 text-right"><strong>{{ (response.MinimumPaymentAmount*2/3) }}</strong></div>
            </li>
            <li class="application-detail-list__elements d-flex bd-highlight py-3 row">
                <div class="col-5 col-md-8 p-0">İşsizlik Maaşı Alınabilecek Ay Sayısı: <!--i class="hk-icon--warning-circle hk-icon--1x text--copy align-middle" data-toggle="tooltip" data-html="true" title="Vergiler hariç" tabindex="-1"></i --> : </div>
                <div class="col p-0 text-right"><strong>{{ response.DelayInterest }}</strong></div>
            </li>
            <!-- <li class="application-detail-list__elements d-flex bd-highlight py-3 row">
                <div class="col-5 col-md-8 p-0">Ödenecek Vergi: </div>
                <div class="col p-0 text-right"><strong>{{ response.Tax | formatMoney(2) }} TL</strong></div>
            </li>
            <li class="application-detail-list__elements d-flex bd-highlight py-3 row">
                <div class="col-5 col-md-8 p-0">Toplam Dönem Borcu  : </div>
                <div class="col p-0 text-right"><strong>{{ response.TotalPeriodDebt | formatMoney(0) }} TL</strong></div>
            </li> -->
            
        </ul>

        <!-- <a class="btn btn-secondary btn-block mb-2" href="/kredi-karti">Kredi Kartlarını Karşılatır</a>
        <a class="btn btn-secondary btn-block mb-2" href="/kredi-karti/h/taksitli-nakit-avans-hesaplama">Taksitli Nakit Avans Hesapla</a>

        <div>
            <p id="js-scrollToReport" class="text--small-link-detail report-comment pt-4 mb-0">Hata Bildir veya Yorum Yap</p>
        </div> -->
    </div>
</template>

<script>
import EventBus from '../../event-bus';
import Loading from '../shared/loading.vue';
import { scrollToElement } from '../../../utils/animation';
import { formatMoney } from '../../../utils/filter/index';
import $ from "jquery";

export default {
    name: 'result',
    data() {
        return {
            loading: true,
            isResult: false,

            request: '',
            response: '',
        };
    },
    components: {
        Loading
    },
    mounted() {
        EventBus.$on('GET-RESPONSE', ebData => {
            this.loading = true;
            this.request = ebData.request;
            this.response = ebData.response;
            this.isResult = true;

            setInterval(() => {
                this.loading = false;
            }, 800);
        });

        EventBus.$on('GET-ERROR', error => {
            this.isResult = false;
        });
    },
    methods: {
        scrollTo(id) {
            scrollToElement($('#' + id), 500);
        }
    },
    // filters: {
    //     formatMoney,
    // }
};
</script>