<!-- this template can contain only one div -->
<template>
  <!-- div with id "app", class "content two-up" to separate two select dropdown in half to pass in just one line -->
  <div id="app" class="content two-up">
    <!-- collecttion dropbox -->
      <v-select 
        
        :options="choices" 
        :value.sync="selectedCollection"
        @input="this.emitCollectionValue"
        return-object>
      </v-select>
      
    <!-- item dropbox, item will reatively change when selected collection changes -->
      <v-select 
        
        :options="items"
        v-model="selectedvalue"  
        @input="this.emitItemValue" 
        autocomplete  
        return-object>
     </v-select>

     <!-- for testing -->
     <div>{{selectedCollection}}</div>
     <div>{{selectedvalue}}</div>

     <span>this is a test</span>
     <!-- value is the stored value of last emitted "collection" and "item" -->
     <span>{{this.value}}</span>

     
    
  </div>
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";
  import { mapState } from 'vuex';
  export default {
    mixins: [mixin],
    data() {
      return {
        items:[],
        selectedCollection: "", // the selected collection
        itemOptions: {}, // possible selection of item
        selectedvalue: "", // the selected item
        toEmitObject: { // object to be emitted
          collection: null,
          item: null,
        }
      };
    },
    // after the page is loaded
    mounted() {
      
      console.log("inside mounted");
      console.log("this.$store is");
      console.log(this.$store);
      console.log("state is:");
      console.log(this.$store.state);
      console.log("helper is:");
      console.log(this.$helpers);
      console.log("this");
      console.log(this);
      console.log("current project key");
      console.log(this.currentProjectKey);
      console.log("getters are");
      console.log(this.$store.getters);
      
      
      console.log("inside mounted");
      if (this.value) {
        if (this.value.collection) {
          this.toEmitObject.collection = this.value.collection;
          this.selectedCollection = this.value.collection;
          console.log("selected col:");
          console.log(this.selectedCollection);

          //this.itemOptions = this.getItems(this.selectedCollection);
          console.log("select options in mounted");
          //console.log(this.itemOptions);

          if (this.value.item) {
            this.selectedvalue = this.value.item;
            this.toEmitObject.item = this.value.item;
            console.log("selected ite:");
            console.log(this.selectedvalue);
          }
        }
      }

    },
    // necessary methods
    methods: {
      ...mapState(['currentProjectKey']),
      collections() {
			  return this.$store.state.collections;
      },
      /*
      filterCollection() {
        return Object.values(this.collections())
				.filter(
					collection =>
						collection.hidden == false &&
						collection.managed == true &&
						collection.collection.startsWith('directus_') === false
        )
        .map(element => this.$helpers.formatCollection(element.collection))
      },*/
      testMethod() {
        console.log("inside consoleMethod");
        //console.log(this.$api.getItems);
      },
    /**
     * @method isEmpty
     * 
     * @author hnguyen
     * 
     * @param any $value The name of the variable to check if empty.
     * @return Boolean True if @param value is undefined, null, [] or "", false otherwise.
     */
      isEmpty(value){
        return (value == null || value.length === 0 || value === '');
      },
      
    /**
     * @method emitCollectionValue
     * 
     * @author hnguyen
     * 
     * @param Integer $event The index value of selected collection.
     * Save selected collection value in @selectedCollection and @toEmitObject.collection. Emit if @toEmitObject.item is not null or empty.
     */
      emitCollectionValue($event) {
        //console.log("inside emit Collection:");
        //console.log($event);
        this.toEmitObject.collection = $event;
        this.selectedCollection = $event;
        this.$emit("input", this.toEmitObject);
      },

    /**
     * @method emitItemValue
     * 
     * @author hnguyen
     * 
     * @param Integer $event The index value of selected item.
     * Save selected item value in @selectedvalue and @toEmitObject.item. Emit if @toEmitObject.collection is not null or empty.
     */
      emitItemValue(event) {
        console.log("inside emit Value");
        console.log(event);
        this.selectedvalue = event;
        //console.log("selected value:");
        //console.log(this.selectedvalue);
        this.toEmitObject.item = event;
        //if (this.toEmitObject.collection) {
          this.$emit("input", this.toEmitObject);
        //}
      },

    /**
     * @method getItems
     * 
     * @author hnguyen
     * 
     * @param String $currentSelectedCollection The value of the selected collection.
     * @return Array Contains all possible item value from the selected collection.
     */
      getItems: async function(collectionArray) {
        /*
        console.log("in getItems");
        console.log(collectionArray);
        var dropdownAlternative = [];
        collectionArray["data"].forEach(element => {
          let identifier = element.identifier;
          let name = element.name;
          dropdownAlternative[identifier] = name;
        });
        //this.itemOptions = dropdownAlternative;
        console.log("inside getItems");
        console.log(this.itemOptions);*/
        

        let choices = {};
        Object.keys(collectionArray)
          .forEach(key => {
            choices[key] = this.$helpers.formatTitle(key);
          });
        return choices;
      },
      getItemsFromSelectedCollection:  function(selectedCollection) {
        this.$api.getItems(selectedCollection, {}).then(res => {
          console.log(res.data);
          let arr = res.data;
          let result = [];
          let objectresult = {};
          console.log("this item before");
          console.log(this.items);
          for (var i=0; i < arr.length; i++) {
            result[i] = arr[i].name;
            objectresult[arr[i].identifier] = arr[i].name;
          }
          this.items = objectresult;
          return objectresult;
        });
      }
      
    },
    computed: {
      choices() {
        const collections = this.$store.state.collections || {};
        let choices = {};
        Object.keys(collections)
          .filter(key => {
            // filter all the collection which starts with "directus_"
            return key.startsWith('directus_') === false;
          })
          .forEach(key => {
            // for Example: choices["teaser_simple"] = "Teaser Simple"
            choices[key] = this.$helpers.formatTitle(key);
          });
        return choices;
      },
      
      /*itemschoices() {
        console.log("inside computed method item choices");
        console.log(this.selectedCollection);
        let itemchoices = {};
        console.log("return value");
        //console.log(this.getItemsFromSelectedCollection(this.selectedCollection));
        return this.getItemsFromSelectedCollection(this.selectedCollection);
      },*/

      

    },
    watch: {
    /**
     * @function selectedCollection
     * 
     * @author hnguyen
     * 
     * @param String $currentSelectedCollection The value of the current selected collection.
     * @param String $oldSelectedCollection The value of the old selected collection.
     * 
     * Watch changes in selectedCollection.
     */
      selectedCollection: function(currentSelectedCollection, oldSelectedCollection) {
        if(!oldSelectedCollection && currentSelectedCollection) {
          this.$api.getItems(currentSelectedCollection, {}).then(res => {
            console.log(res.data);
            let arr = res.data;
            let result = [];
            let objectresult = {};
            console.log("this item before");
            console.log(this.items);
            for (var i=0; i < arr.length; i++) {
              result[i] = arr[i].name;
              objectresult[arr[i].identifier] = arr[i].name;
            }
            this.items = objectresult;
          });
        } else if (oldSelectedCollection && currentSelectedCollection && this.isEmpty(this.selectedvalue)) {
          this.$api.getItems(currentSelectedCollection, {}).then(res => {
            console.log(res.data);
            let arr = res.data;
            let result = [];
            let objectresult = {};
            console.log("this item before");
            console.log(this.items);
            for (var i=0; i < arr.length; i++) {
              result[i] = arr[i].name;
              objectresult[arr[i].identifier] = arr[i].name;
            }
            this.items = objectresult;
          });
        } else {
          this.selectedvalue = null;
          this.toEmitObject.item = null;
          this.$api.getItems(currentSelectedCollection, {}).then(res => {
            console.log(res.data);
            let arr = res.data;
            let result = [];
            let objectresult = {};
            console.log("this item before");
            console.log(this.items);
            for (var i=0; i < arr.length; i++) {
              result[i] = arr[i].name;
              objectresult[arr[i].identifier] = arr[i].name;
            }
            this.items = objectresult;
          });
        }
        
      }
    }

  }
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
#collections {
  width: 50%;
}

#items {
  width: 50%;
}
</style>
