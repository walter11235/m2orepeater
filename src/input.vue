<!-- this template can contain only one div -->
<template>
  <!-- div with id "app", class "content two-up" to separate two select dropdown in half to pass in just one line -->
  <div id="app" class="content two-up">
    <!-- collecttion dropbox -->
      <v-select 
        id = "collections" 
        :options="collectionOptions" 
        :value.sync="selectedCollection"
        @input="this.emitCollectionValue" 
        return-object>
      </v-select>
      
    <!-- item dropbox, item will reatively change when selected collection changes -->
      <v-select 
        id = "items" 
        :options="itemOptions" 
        :value="selectedvalue"  
        @input="this.emitItemValue" 
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
  export default {
    mixins: [mixin],
    data() {
      return {
        collectionOptions: [], // possible selection of collection
        selectedCollection: "", // the selected collection
        itemOptions: [], // possible selection of item
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
      this.collectionOptions = this.getCollectionsMethod();

      if (this.value) {
        if (this.value.collection) {
          this.toEmitObject.collection = this.value.collection;
          this.selectedCollection = this.value.collection;
          console.log("selected col:");
          console.log(this.selectedCollection);

          this.itemOptions = this.getItems(this.selectedCollection);
          console.log("select options in mounted");
          console.log(this.itemOptions);

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
      emitCollectionValue(event) {
        this.toEmitObject.collection = this.collectionOptions[event];
        //console.log("inside emit Collection:");
        //console.log(this.toEmitObject);
        this.selectedCollection = this.collectionOptions[event];

        //console.log("selected value:");
        //console.log(this.selectedCollection);
        //if (this.toEmitObject.item) {
        this.$emit("input", this.toEmitObject);
        //}
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
        this.selectedvalue = this.itemOptions[event];
        //console.log("selected value:");
        //console.log(this.selectedvalue);
        this.toEmitObject.item = this.itemOptions[event];
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
      getItems: function(currentSelectedCollection) {
        var dropdownAlternative = [];
        const ITEM_URL = "http://localhost:2443/corporatesite/items/" + currentSelectedCollection;
        fetch(ITEM_URL) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(response) {
            response["data"].forEach(element => {
              dropdownAlternative.push(element.identifier);
            });
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
        return dropdownAlternative;
      },

    /**
     * @method getCollectionsMethod
     * 
     * @author hnguyen
     * 
     * @return Array Contains all possible collection value from COLLECTION_URL.
     */
      getCollectionsMethod: function() {
        
        var collectionDropdown = [];
        const COLLECTION_URL = "http://localhost:2443/corporatesite/collections";
        

        fetch(COLLECTION_URL) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(response) {
            // Your code for handling the data you get from the API
            //console.log("inside fetch");
            //console.log(response);
            response["data"].forEach(element => {
              const valueToAdd = element.collection;
              if(valueToAdd.startsWith("directus_")) {
                return;
              }
              collectionDropdown.push(valueToAdd);
            });
            //console.log("after push");
            //console.log(collectionDropdown);
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
        return collectionDropdown;
      },

      
      
    },
    computed: {
      //getCollections: function() {
      //  return this.getCollectionsMethod();
      //}
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
        console.log("cur val in watch:");
        console.log(currentSelectedCollection);
        console.log("olda val in watch");
        console.log(oldSelectedCollection);

        // first initial, oldSelectedCollection is empty or null, current selected collection is not empty and item is not yet selected
        if(!oldSelectedCollection && currentSelectedCollection) {

          console.log("inside first if");
          this.itemOptions = this.getItems(currentSelectedCollection);

        // when change selected collection value without selecting item
        } else if (oldSelectedCollection && currentSelectedCollection && this.isEmpty(this.selectedvalue)) {
          
          console.log("inside second if");
          console.log(this.selectedvalue);
          this.itemOptions = this.getItems(currentSelectedCollection);

        // when change selected collection value, item from old collection value is selected
        } else {
          console.log("inside third if");
          // collection and item are not null
          // collection is updated => erase item
          this.selectedvalue = null;
          this.toEmitObject.item = null;
          
          this.itemOptions = this.getItems(currentSelectedCollection);
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
