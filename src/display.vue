<template>
  <div>
    {{ displayValue }}
    <span>this is in display.vue</span>
  </div>
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";

  export default {
    mixins: [mixin],
    computed: {
      displayValue() {
        console.log(this.value);
        if (this.selectedvalue)
          return this.selectedvalue.toLowerCase();
      }
    }
  }
</script>

<style lang="scss" scoped>
div {
  background-color: var(--red-300);
}
</style>
