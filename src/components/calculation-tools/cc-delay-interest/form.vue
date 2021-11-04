<template>
  <div>
    <form
      v-on:submit.prevent="fetchCalculationForm"
      class="funnel-form"
      novalidate="novalidate"
      id="calculation-form"
    >
      <div class="funnel-form__elements">
        <errorForm
          v-if="formError.errorText"
          :message="formError.errorText"
        ></errorForm>

        <div class="position-relative">
          <loading v-if="loading"></loading>
          <div class="days-group">
            <span>Son 3 Yıl İçinde Ödenen Prim Günü</span>
            <select
              v-model="month"
              class="form-select form-select-lg mb-3"
              v-on:change="changeMonth($event)"
            >
              <option disabled value="none">Seçiniz</option>
              <option value="under_600">600 günden az</option>
              <option value="more_600">600 -899 gün arası</option>
              <option value="more_900">900 -1079 günra arası</option>
              <option value="more_1080">
                1080 (son üç yıl kesintisiz ödeme)
              </option>
            </select>
          </div>
          <div class="yes-no">
            <span class="">Asgari ücretle mi çalışıyorsunuz?</span>
            <select
              v-model="yandno"
              v-on:change="changeYorN($event)"
              class="form-select form-select-lg mb-3"
            >
              <option disabled value="none">Seçiniz</option>
              <option value="yes">Evet</option>
              <option value="no">Hayır</option>
            </select>
          </div>
          <div class="input-table">
            <div class="line">
              <span class="">1 Ay: Aylık Brüt Ücret</span>
              <input
                type="number"
                v-model="inp[0]"
                v-on:change="changeEvt($event)"
                class="input-table-child child1"
              />
            </div>
            <div class="line">
              <span class="">2 Ay: Aylık Brüt Ücret</span>
              <input
                type="number"
                v-model="inp[1]"
                v-on:change="changeEvt1($event)"
                class="input-table-child child2"
              />
            </div>
            <div class="line">
              <span class="">3 Ay: Aylık Brüt Ücret</span>
              <input
                type="number"
                v-model="inp[2]"
                v-on:change="changeEvt2($event)"
                class="input-table-child child3"
              />
            </div>
            <div class="line">
              <span class="">4 Ay: Aylık Brüt Ücret</span>
              <input
                type="number"
                v-model="inp[3]"
                class="input-table-child child4"
              />
            </div>
            <div class="parent-calculate" v-if="error_message != 'error'">
              <button
                class="btn btn-primary btn-calculate"
                id="btn-calculate"
                v-on:click="calculate"
              >
                Hesaplama
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="result" v-if="error_message == 'error'">
      <p class="warning">
        Son 3 yıl içerisinde 600 günden az prim ödemesi olan çalışanlar işsizlik
        maaşı alamaz.
      </p>
    </div>
    <div class="result" v-if="result_price == 'NaN'">
      <p class="warning">Lütfen doğru verileri girin</p>
    </div>
    <div class="result" v-if="error_message == 'not_error' && result_price != 'NaN'">
      <div class="lines">
        <span class="">Aylık İşsizlik Maaşı Tutar:&nbsp;&nbsp;</span> 
        <p class="answer">{{ result_price }}</p>
      </div>
      <div class="lines">
        <span class="">İşsizlik Maaşı Alınabilecek Ay Sayısı:&nbsp;&nbsp;</span>
        <p class="answer">{{ result_month }} AY</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCCDelayInterest } from "../../../utils/request";
import EventBus from "../../event-bus";
import Loading from "../shared/loading.vue";
import ErrorForm from "../shared/error-form.vue";
import BtnSubmit from "../shared/btn-submit.vue";
import FormElements from "../shared/form-elements.vue";
import FormSelect from "../shared/form-select.vue";
import { scrollToElement } from "../../../utils/animation";
import { clearNaN, numberWithDot, formatPercent } from "../../../utils/filter";
import $ from "jquery";

export default {
  name: "Form",
  data() {
    return {
      loading: true,
      result_month: "",
      result_price: "",
      error_message: "",
      month: "",
      yandno: "",
      btnDisable: true,
      inp: [, , ,],
      formError: {
        error: false,
        errorText: "",
      },
    };
  },
  components: {
    Loading,
    ErrorForm,
    BtnSubmit,
    FormElements,
  },
  methods: {
    clearNaN,
    numberWithDot,
    formatPercent,
    changeMonth(event) {
      if (this.month == "under_600") {
        this.error_message = "error";
        this.result_month = "error";
      } else if (this.month == "more_600") {
        this.result_month = 6;
        this.error_message = "";
      } else if (this.month == "more_900") {
        this.result_month = 8;
        this.error_message = "";
      } else if (this.month == "more_1080") {
        this.result_month = 10;
        this.error_message = "";
      }
    },

    calculate: function (event) {
      this.error_message = "not_error";
      var B8 = parseFloat(this.inp[0]);
      var B9 = parseFloat(this.inp[1]);
      var B10 = parseFloat(this.inp[2]);
      var B11 = parseFloat(this.inp[3]);
      var sum = B8 + B9 + B10 + B11;
      var B18 = 0.00759;
      var B17 = 3577.5;

      if ((sum / 120) * 12 * (1 - B18) > B17 * 0.8) {
        this.result_price = (B17 * 0.8 * (1 - B18)).toFixed(2);
      } else {
        console.log(((sum / 120) * 12 * (1 - B18)).toFixed(2));
        this.result_price = ((sum / 120) * 12 * (1 - B18)).toFixed(2);
      }
    },

    clearAllParams() {},

    changeYorN(event) {
      if (event.target.value == "yes") {
        this.inp[0] = 3577.5;
        this.inp[1] = 3577.5;
        this.inp[2] = 3577.5;
        this.inp[3] = 3577.5;
        console.log(this.inp[0]);
      } else if (event.target.value == "no") {
        this.inp[0] = "";
        this.inp[1] = "";
        this.inp[2] = "";
        this.inp[3] = "";
      }
    },

    changeEvt(evt) {
      this.inp[1] = evt.target._value;
      this.inp[2] = evt.target._value;
      this.inp[3] = evt.target._value;
    },
    changeEvt1(evt) {
      this.inp[2] = evt.target._value;
      this.inp[3] = evt.target._value;
    },
    changeEvt2(evt) {
      this.inp[3] = evt.target._value;
    },

    isOpenForm(id) {
      let dataIsOpenForm;
      if (
        this.selectedFormModel[this.formParams.question].find(
          (val) => val.item === id
        )
      ) {
        this.forms[id].isOpen = 1;
        dataIsOpenForm = true;
      } else {
        this.forms[id].isOpen = 0;
        dataIsOpenForm = false;
      }
      return dataIsOpenForm;
    },

    optionsList(id) {
      return this.isOpenForm(id) && this.forms[id].type == "select"
        ? this.options[id][
            this.selectedFormModel[this.formParams.question].find(
              (val) => val.item === id
            ).option
          ]
        : null;
    },

    scrollTo(id) {
      scrollToElement($("#" + id), 500);
    },

    serviceErrorControl(response) {
      if (response.status != 200) {
        this.formError.error = true;
        this.formError.errorText = response.statusText;
        this.btnDisable = false;
        return false;
      } else if (response.data.Message) {
        this.formError.error = true;
        this.formError.errorText = response.data.Message;
        this.btnDisable = false;
        return false;
      } else {
        this.formError.error = false;
        this.formError.errorText = "";
        return true;
      }
    },

    formValidation() {
      for (let form of this.forms) {
        if (form.isOpen && form.isRequired) {
          switch (this.formParams[form.model]) {
            case "":
            case "0":
            case 0:
            case null:
              let additionalText =
                form.type == "select" ? "Seçiniz" : "Giriniz";
              this.formError[
                form.model
              ] = `Lütfen ${form.title} ${additionalText}.`;
              this.formError.error = true;
              break;
            default:
              this.formError[form.model] = "";
          }
        }

        if (form.isOpen && this.formParams[form.model] != "" && form.validate) {
          switch (true) {
            case form.validate.hasOwnProperty("min"):
              if (
                this.clearNaN(this.formParams[form.model]) < form.validate.min
              ) {
                this.formError[form.model] = `En Az ${this.numberWithDot(
                  form.validate.min
                )} TL ${form.type == "select" ? "Seçiniz" : "Giriniz"}.`;
                this.formError.error = true;
              }
            case form.validate.hasOwnProperty("max"):
              if (
                this.clearNaN(this.formParams[form.model]) > form.validate.max
              ) {
                this.formError[form.model] = `En Fazla ${this.numberWithDot(
                  form.validate.max
                )} TL ${form.type == "select" ? "Seçiniz" : "Giriniz"}.`;
                this.formError.error = true;
              }
          }
        }
      }

      // special validation
      if (
        this.clearNaN(this.formParams.loan) >
        this.clearNaN(this.formParams.limit) * 2
      ) {
        this.formError[
          "loan"
        ] = `Kredi Kartı Dönem Borcunuz En Fazla Belirtmiş Olduğunuz Limitin İki katı Olabilir`;
        this.formError.error = true;
      }
    },

    fetchCalculationForm() {
      this.btnDisable = true;

      // clear error
      this.formError.error = false;
      this.formError.errorText = "";

      for (let list of this.forms) {
        this.$set(this.formError, list.model, "");
      }

      // validates
      this.formValidation();

      if (!this.formError.error) {
        let questionBoolean = this.formParams.question == 1 ? true : false;

        let formDatas = {
          limit: this.clearNaN(this.formParams.limit),
          loan: this.clearNaN(this.formParams.loan),
          termDebtPaid: this.clearNaN(this.formParams.termDebtPaid),
          question: questionBoolean,
        };

        return getCCDelayInterest(formDatas)
          .then((response) => {
            if (this.serviceErrorControl(response)) {
              EventBus.$emit("GET-RESPONSE", {
                request: formDatas,
                response: response.data,
              });
              this.$nextTick(() => {
                this.scrollTo("calculation-results");
                this.btnDisable = false;
              });
            } else {
              EventBus.$emit("GET-ERROR", this.formError.error);
              this.$nextTick(() => {
                this.scrollTo("calculation-form");
                this.btnDisable = false;
              });
            }
          })
          .catch((err) => {
            this.error = true;
            this.btnDisable = false;
          });
      } else {
        EventBus.$emit("GET-ERROR", this.formError.error);
        this.$nextTick(() => {
          this.scrollTo("calculation-form");
          this.btnDisable = false;
        });
      }
    },
  },
  created() {
    this.loading = false;
    this.btnDisable = false;
  },
  watch: {
    "formParams.limit": {
      handler: function (val) {
        this.formParams.limit = val != 0 ? this.numberWithDot(val) : "";
      },
    },

    "formParams.loan": {
      handler: function (val) {
        this.formParams.loan = val != 0 ? this.numberWithDot(val) : "";
      },
    },

    "formParams.termDebtPaid": {
      handler: function (val) {
        this.formParams.termDebtPaid = val != 0 ? this.numberWithDot(val) : "";
      },
    },
  },
};
</script>