<template>
    <div
        class="col-12 col-md-12 col-sm-12"
        :class="{ 'form__elements--error' : formError[form.model]}"
        v-if="isOpenForm"
    >

        <label v-if="!form.hideTitle" class="funnel-form__label">{{ form.title }} 
            <i v-if="form.tooltip" class="hk-icon--warning-circle hk-icon--1x text--copy align-middle" data-toggle="tooltip" data-html="true" :title="form.tooltip" tabindex="-1"></i>
        </label>

        <label
            class="select"
            v-if="form.type == 'select'"
        >
            <select
                :name="form.name"
                v-model="formParams[form.model]"
                class="select__element"
            >
                <option selected disabled hidden value="0">Seçiniz</option>
                <option
                    v-for="(option, index) in optionsList"
                    :key="index"
                    :value="option.value"
                >{{ option.text }}</option>
            </select>
        </label>

        <label
            class="text text--block d-inline-block"
            :class="{'text--is-currency': form.currency, 'text--is-interest': form.percent}"
            v-if="form.type == 'input'"
        >
            <input
                :type="form.inputtype ? form.inputtype : 'tel'"
                :name="form.name"
                v-model="formParams[form.model]"
                v-mask="form.mask"
                class="text__element"
                :maxlength="form.maxlength"
                :placeholder="form.placeholder ? form.placeholder : '0'"
                autocomplete="off"
            >
        </label>

        <p
            class="funnel-form__error"
            v-if="formError[form.model]"
        >{{ formError[form.model] }}</p>

    </div>
</template>

<script>
export default {
    props: ['form', 'optionsList', 'isOpenForm', 'formParams', 'formError', 'defaultClasses', 'placeholder', 'inputtype'],
    data() {
        return {};
    }
};
</script>