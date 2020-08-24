<template>
  <div>
    <button v-on:click="foo">foo</button>
    <div id="pare"></div>
  </div>
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";

  export default {
    mixins: [mixin],
    mounted() {
      // Fetch block options
      const { values } = this._props
      console.log(values);
      
      // To take all 
      const fieldsNode = document.querySelectorAll('[data-field]');
      console.log("fieldsnode: ");
      console.log(fieldsNode);
      const typeField = document.querySelector('[data-field=type]');
      // console.log(typeField);
      const m2oplace = document.querySelectorAll('div[input-name="m2orepeater"]');
      console.log("m2oplace: ");
      console.log(m2oplace);
      const content2up = document.getElementsByClassName('content two-up'); // or document.querySelectorAll('section.content.two-up')
      console.log("content2up: ");
      console.log(content2up);

      const content2up0 = content2up[0].firstElementChild;
      console.log("first child node: ");
      console.log(content2up0);
      const collecttionName = content2up0.innerHTML;      
      console.log("child node name: ");
      console.log(collecttionName);


      const valueTable = document.querySelector('.row-container');
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
    updated() {
      // After attribute is updated
      // Watch changes from the collections field
    },
    methods: {
      foo: function() {
        console.log("button");
        //console.log(document);

      },
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
