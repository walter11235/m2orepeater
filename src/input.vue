<template>
<!--
  <div id="app">
    <v-flex xs12 sm6 d-flex>
      <v-select id = "collections" :options="collectionOptions" item-value="this.selectedCollection" :value.sync="selectedCollection"
 @input="this.emitCollectionValue" @change="loadPlotInformation()"  return-object>
        <template v-slot:option="option">
          <span :class="option.icon"></span>
          {{ option.title }}
      </template>
      </v-select>
      <div>{{selectedCollection}}</div>
     </v-flex>

     
     <v-select id = "items" :options="itemOptions" v-model="selectedvalue" autocomplete  @input="this.emitItemValue" >
     </v-select>
     <div>{{selectedvalue}}</div>
     <v-select id = "items" :options="optionExample" v-model="selectedOption" @input="$emit('input', optionExample[selectedOption])" v-on:change="loadPlotInformation()">
       <div>{{selectedOption}}</div>
     </v-select>
     
    <button v-on:click="foo">foo</button>
    <div>{{selectedOption}}</div>
    <div>{{optionExample[selectedOption]}}</div>
    <input
      :value="placeholder1"
      :disabled="readonly"
      @input="$emit('input', $event.target.value)"
    />
    <input
      :value="placeholder2"
      @input="$emit('input', $event.target.value)"
    />
    
  </div>
  -->
  <input
      :value="placeholder2"
      @input="$emit('input', $event.target.value)"
    />
    
</template>

<script>
  import mixin from "@directus/extension-toolkit/mixins/interface";
  export default {
    mixins: [mixin],
    data() {
      return {
        placeholder2:"",
      };
    },
    
    mounted() {
    },
    updated() {
      // After attribute is updated
      // Watch changes from the collections field
    },
    methods: {
      
    },
    created() {
    },
    computed: {
      
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
</style>
