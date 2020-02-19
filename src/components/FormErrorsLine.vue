<template>
  <div class="form-error">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.form-error {
  color: #E53935;
  font-size: 13px;
  padding: 0;
  margin: 0;
}
</style>
