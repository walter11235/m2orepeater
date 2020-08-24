<template>
  <div>
    <div>{{callAPI}}</div>
    <button v-on:click="foo">foo</button>
  </div>
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";
  import callAPI from "C:/Users/hnguyen/Documents/WebsiteProjekt/cw90/corporate-website/source/directus/api/rest.php";

  export default {
    mixins: [mixin],
    data() {
      return {
        collectionName: "",
      };
    },
    mounted() {
      /*
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
      const val = content2up0.querySelector('.value .no-wrap');
      console.log("val is: ");
      console.log(val);
      this.collectionName = val.innerHTML.toLowerCase().replace(/ /g,"_");
      console.log(this.collectionName);
      //callAPI(collectionName);


      const valueTable = document.querySelector('.row-container');*/
      //const options = this.getOptions();

      // hide all fields until the user choose a type
      //this.hideAll(fieldsNode)

      // Show the default value if present
      //this.showFields(options[values.type])

      /*if (typeField) {
        typeField.addEventListener('change', (e) => {
          const value = e.target.value

          // Hide all the fields on change
          this.hideAll(fieldsNode)

          // show fields from the options
          this.showFields(options[value])
        })
      }*/
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
    },
    computed: {
      callAPI() {
        const m2oplace = document.querySelectorAll('div[input-name="m2orepeater"]');
        console.log("m2oplace: ");
        console.log(m2oplace);
        const content2up = document.getElementsByClassName('content two-up'); // or document.querySelectorAll('section.content.two-up')
        console.log("content2up: ");
        console.log(content2up);

        const content2up0 = content2up[0].firstElementChild;
        console.log("first child node: ");
        console.log(content2up0);
        const val = content2up0.querySelector('.value .no-wrap');
        console.log("val is: ");
        console.log(val);
        this.collectionName = val.innerHTML.toLowerCase().replace(/ /g,"_");
        console.log(this.collectionName);
        let vm = this;
        let DIRECTUS_ITEM_URL = "http://localhost:2443/corporatesite/items/";
        console.log(vm.collectionName);
        let fullURL = DIRECTUS_ITEM_URL + vm.collectionName;
        console.log("full URL is: ");
        console.log(fullURL);
        this.$api.axios
          .get(
            DIRECTUS_ITEM_URL +
              vm.collectionName 
          )
          .then(function(response) {
            console.log(response);
            //return response;
          })
          .catch(function(error) {
            console.error("Error:", error);
          });

        return null;
      }
    }
  }
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
</style>
