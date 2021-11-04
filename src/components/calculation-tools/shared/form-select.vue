<template>
  <div class="col-12 col-md-6 col-sm-12">
    <label class="funnel-form__label">{{ form.title }}</label>
    <label class="select">
      <select :name="form.name" v-model="formLists" class="select__element">
        <option
          v-for="(option, index) in optionList"
          :key="index"
          :value="option.value"
        >{{ option.text }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
    props: [
        'form',
        'formLists',
        'optionList'
    ],
    data() {
        return {};
    }
};
</script>