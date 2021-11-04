<template>
    <form v-on:submit.prevent="fetchSctVat" class="funnel-form" novalidate="novalidate" id="calculation-form">
        <div class="funnel-form__elements">
            
            <errorForm v-if="formError.errorText" :message="formError.errorText"></errorForm>

            <div class="row position-relative">

                <loading v-if="loading"></loading>

                <template v-for="(form,i) in forms">
                    <div class="col-12 col-md-12 col-sm-12" :class="{ 'form__elements--error' : formError[form.model]}" :key="i" v-if="isOpenForm(i)">

                        <label class="funnel-form__label" >{{ form.title }}</label>
                            
                        <label class="select" v-if="form.type == 'select'">
                            <select :name="form.name" v-model="formParams[form.model]" class="select__element">
                                <option
                                    v-for="(option, index) in optionsList(i)"
                                    :key="index"
                                    :value="option.value"
                                >{{ option.text }}</option>
                            </select>
                        </label>

                        <label class="text text--block d-inline-block text--is-currency"  v-if="form.type == 'input'">
                            <input type="tel" :name="form.name" v-model="formParams[form.model]" class="text__element" :maxlength="form.maxlength" placeholder="0" autocomplete="off" >
                        </label>
                        
                        <p class="funnel-form__error" v-if="formError[form.model]">{{ formError[form.model] }}</p>

                    </div>
                </template>

            </div>
            
            <btn-submit :form-disable="btnDisable"></btn-submit>

        </div>
    </form>
</template>

<script>

import { getCalculateSctVat } from '../../../utils/request';
import EventBus from "../../event-bus";
import Loading from '../shared/loading.vue';
import ErrorForm from '../shared/error-form.vue';
import BtnSubmit from '../shared/btn-submit.vue';

export default {
    data() {
        return {
            loading: true,
            btnDisable: true,

            formError: {
                error: false,
                errorText: '',
                vehicleType: '',
                engineDisplacement: '',
                vehicleSalePrice: ''
            },

            formParams: {
                vehicleType: 0,
                engineDisplacement: 0,
                vehicleSalePrice: ''
            },

            forms: [
                {
                    title: "Araç Türü",
                    name: "vehicle-type",
                    model: "vehicleType",
                    type: "select"
                },
                {
                    title: "Motor Silindir Hacmi",
                    name: "engine-displacement",
                    model: "engineDisplacement",
                    type: "select"
                },
                {
                    title: "Araç Satış Fiyatı",
                    name: "vehicle-sale-price",
                    model: "vehicleSalePrice",
                    maxlength: 11,
                    type: "input"
                }
            ],

            options: {
                0: [ // vehicle-type
                    [
                        { value: 0, text: "Seçiniz" },
                        { value: 1, text: "Otomobil" },
                        { value: 2, text: "Motosiklet" },
                        { value: 3, text: "Otobüs" },
                        { value: 4, text: "Midibüs" },
                        { value: 5, text: "Minibüs" },
                        { value: 6, text: "Elektrikli Motoru da Olan" },
                        { value: 7, text: "Sadece Elektrikli Motorlu" }
                    ]
                ],
                1: [ // engine-displacement
                    [
                        { value: 0, text: "Seçiniz" },
                        { value: 1, text: "1600 cm³'e kadar" },
                        { value: 2, text: "1601 cm³ ile 2.000 cm³ arası" },
                        { value: 3, text: "2001 cm³ ve üzeri" }
                    ],
                    [
                        { value: 0, text: "Seçiniz" },
                        { value: 1, text: "250 cm³'ü geçmeyen" },
                        { value: 2, text: "250 cm³'ü geçen" }
                    ],
                    [
                        { value: 0, text: "Seçiniz" },
                        { value: 1, text: "50 kW'ı geçip, 1800 cm³'ü geçmeyen" },
                        { value: 2, text: "100 kW'ı geçip,  2500 cm3'ü geçmeyen" },
                        { value: 3, text: "100 kW’ı geçip, 2000 cm³'- 2500 cm³ arasında" },
                        { value: 4, text: "Diğerleri" }
                    ],
                    [
                        { value: 0, text: "Seçiniz" },
                        { value: 1, text: "85 kW 'ı geçmeyen" },
                        { value: 2, text: "85 kW'ı geçip, 120 kW'ı geçmeyen" },
                        { value: 3, text: "120 kW'ı geçen" }
                    ],    
                ],
                2:[ // vehicle-sale-price
                ]
            },

            selectedFormModel: {
                0: [ // Seçiniz
                    {"item":0, "option":0},
                    {"item":1, "option":0},
                    {"item":2, "option":0}
                ],
                1: [ // Otomobil
                    {"item":0, "option":0},
                    {"item":1, "option":0},
                    {"item":2, "option":0}
                ],
                2: [ // Motosiklet
                    {"item":0, "option":0},
                    {"item":1, "option":1},
                    {"item":2, "option":0}
                ],
                3: [ // Otobüs
                    {"item":0, "option":0},
                    {"item":2, "option":0}
                ],
                4: [ // Midibüs
                    {"item":0, "option":0},
                    {"item":2, "option":0}
                ],
                5: [ // Minibüs
                    {"item":0, "option":0},
                    {"item":2, "option":0}
                ],
                6: [ // Elektrikli Motoru da Olan
                    {"item":0, "option":0},
                    {"item":1, "option":2},
                    {"item":2, "option":0}
                ],
                7: [ // Sadece Elektrikli Motorlu
                    {"item":0, "option":0},
                    {"item":1, "option":3},
                    {"item":2, "option":0}
                ]
            },

        }
    },
    components: {
        Loading,
        ErrorForm,
        BtnSubmit
    },
    methods: {
        clearNaN(data){
            return data.toString().replace(/[^0-9]/g, '');
        },

        numberWithDot(data){
            let val = this.clearNaN(data);
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        clearAllParams(){
            this.formParams.engineDisplacement = 0;
            this.formParams.vehicleSalePrice = '';
        },

        isOpenForm(id){
            return (this.selectedFormModel[this.formParams.vehicleType].find(val => val.item === id)) ? true : false;
        },

        optionsList(id){
            return this.options[id][
                    this.selectedFormModel[
                        this.formParams.vehicleType
                    ].find(val => val.item === id).option
                ];
        },

        scrollTo(id){
            window.scrollTo({
                top: (document.getElementById(id).offsetTop + 70),
                left: 0,
                behavior: 'smooth'
            });
        },

        serviceErrorControl(response){
            if(response.status != 200){
                this.formError.error = true;
                this.formError.errorText = response.statusText;
                this.btnDisable = false;
                return false;
            }
            else if(!response.data.IsSuccess){
                this.formError.error = true;
                this.formError.errorText = response.data.Message;
                this.btnDisable = false;
                return false;
            } else {
                this.formError.error = false;
                this.formError.errorText = '';
                return true;
            }
        },

        fetchSctVat(){

            this.btnDisable = true;

            // clear error
            this.formError.error = false;
            this.formError.errorText = '';
            this.formError.vehicleType = '';
            this.formError.engineDisplacement = '';
            this.formError.vehicleSalePrice = '';

            // validates empty
            if(this.formParams.vehicleType == 0){ this.formError.vehicleType = 'Lütfen araç türünü seçiniz.'; this.formError.error = true;}
            if(this.isOpenForm(1) && this.formParams.engineDisplacement == 0){ this.formError.engineDisplacement = 'Lütfen motor silindir hacmi seçiniz.'; this.formError.error = true;}
            if(this.formParams.vehicleSalePrice == '' || this.formParams.vehicleSalePrice == 0){ this.formError.vehicleSalePrice = 'Lütfen araç satış fiyatı giriniz.'; this.formError.error = true;}

            let formDatas = {
                vehicleType: this.formParams.vehicleType,
                engineDisplacement: this.formParams.engineDisplacement,
                vehicleSalePrice: this.clearNaN(this.formParams.vehicleSalePrice)
            };
          
            if(!this.formError.error){
                return getCalculateSctVat(formDatas)
                .then((response) => {
                    if(this.serviceErrorControl(response)){
                        EventBus.$emit('GET-RESPONSE', response.data);
                        this.$nextTick(() => {
                            this.scrollTo("calculation-results");
                            this.btnDisable = false;
                        })
                    }

                })
                .catch(err => {
                    this.error = true;
                    this.btnDisable = false;
                });
            } else {
                EventBus.$emit('GET-ERROR', this.formError.error);
                this.$nextTick(() => {
                    this.scrollTo("calculation-form");
                    this.btnDisable = false;
                })
            }
            

        },
    },
    created(){
        
        this.loading = false;
        this.btnDisable = false;

    },
    watch:{

       'formParams.vehicleType': {
            handler: function (data) {
                this.clearAllParams();
            }
        },

        'formParams.vehicleSalePrice': {
            handler: function(val) {
                this.formParams.vehicleSalePrice = this.numberWithDot(val);
            },
        },

    }
}
</script>