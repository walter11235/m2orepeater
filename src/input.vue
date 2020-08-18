<template>
  <input @input="emitValue" :value="value" />
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";

  export default {
    mixins: [mixin],
    mounted() {
      // Fetch block options
      const { values } = this._props
      console.log(values);
      
      const fieldsNode = document.querySelectorAll('[data-field]');
      const typeField = document.querySelector('[data-field=type]');
      const options = this.getOptions();

      // hide all fields until the user choose a type
      this.hideAll(fieldsNode)

      // Show the default value if present
      this.showFields(options[values.type])

      if (typeField) {
        typeField.addEventListener('change', (e) => {
          const value = e.target.value

          // Hide all the fields on change
          this.hideAll(fieldsNode)

          // show fields from the options
          this.showFields(options[value])
        })
      }
    },
    methods: {
      emitValue(event) {
        const value = event.target.value;
        this.$emit("input", value);
      }
    }
  }
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
</style>
