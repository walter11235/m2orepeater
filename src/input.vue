<template>
  <div id="app">
     <v-select  :options="callAPI" v-model="selectedvalue" @input="emitValue" >
     </v-select>
     <div>{{selectedvalue}}</div>
    <button v-on:click="foo">foo</button>
    <!--
    <input :value="selectedvalue" @input="$emit('selectedvalue')" />
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

    <v-select v-model="selectedvalue"  :value="selectedvalue" @input="$emit('input', $event.target.value)">
         <option disabled value="">Please select one</option>   
         <option v-for="option in options" :value="option">{{option}}</option>
     </v-select>
    -->
    
  </div>
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";
  export default {
    mixins: [mixin],
    data() {
      return {
        collectionName: "",
        options: [],
        selectedvalue: ""
      };
    },
    created() {
      
    },
    mounted() {
      
      
      
      /*
      while (true) {
        let oldVal = this.collectionName;
        this.collectionName = this.findCollectionValue();
        if(oldVal != this.collectionName) {
          console.log("old is:");
          console.log(oldVal);
          console.log("new one:");
          console.log(this.collectionName)
        }
        
      }*/
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
      findCollectionValue() {
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
        return this.collectionName;
      },

      findURL(collectionName) {
        this.collectionName = collectionName;
        let vm = this;
        let DIRECTUS_ITEM_URL = "http://localhost:2443/corporatesite/items/";
        console.log(vm.collectionName);
        let fullURL = DIRECTUS_ITEM_URL + collectionName;
        console.log("full URL is: ");
        console.log(fullURL);
        return fullURL;
      },

      emitValue(event) {
        //const value = event.target.value;
        console.log("options array: ");
        console.log(this.options);
        
        console.log("event");
        console.log(event);
        console.log("target: ");
        console.log(event.target);
        console.log("value");
        console.log(event.target.value);
        //this.$emit("input", value);
      },
      debouncedQuery: _.debounce(function () { this.query(); }, 300),
      foo: function(event) {
        console.log("button");
        console.log(event);
        //console.log(document);

      },

      
    },
    computed: {
      callAPI: function() {
        const collectionName = this.findCollectionValue();
        const fullURL = this.findURL(collectionName);
        var dropdownAlternative = [];
        fetch(fullURL) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(response) {
            // Your code for handling the data you get from the API
            console.log("inside fetch");
            console.log(response);
            response["data"].forEach(element => {
              dropdownAlternative.push(element.identifier);
            });
            console.log("after push");
            console.log(dropdownAlternative);
        })
        .catch(function(error) {
            // This is where you run code if the server returns any errors
            console.error("Error:", error);
        });
        this.options = dropdownAlternative;
        return dropdownAlternative;
      },
      

      
      
    },
    watch: {
      /*
      collectionName: function(newVal) {
        //console.log("value in collectionName changed");
        //this.callAPI();
      },
      findCollectionValue: function(newVal) {
        //this.callAPI();
      }*/
    }
  }
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
</style>
