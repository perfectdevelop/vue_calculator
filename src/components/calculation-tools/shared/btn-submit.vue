<template>
    <div class="row">
        <div class="col-12 mt-3">
            <button type="submit" name="submit" class="btn btn-primary btn-block"  data-test-id="inquiry-form-submit" :disabled="formDisable">{{ text ? text : 'Hesapla' }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'formDisable',
        'text'
    ],
    data() {
        return {
            
        }
    },
}
</script>