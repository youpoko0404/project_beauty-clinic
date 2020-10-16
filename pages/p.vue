<template>
  <v-container fluid>
    <v-radio-group
      v-model="sum"
      row
    >
      <v-radio
        label="Option 1"
        value="5"
      />
      <v-radio
        label="Option 2"
        value="4"
      />
      <v-radio
        label="Option 2"
        value="3"
      />
      <v-radio
        label="Option 2"
        value="2"
      />
      <v-radio
        label="Option 2"
        value="1"
      />
    </v-radio-group>
    <v-radio-group
      v-model="sum2"
      row
    >
      <v-radio
        label="Option 1"
        value="5"
      />
      <v-radio
        label="Option 2"
        value="4"
      />
      <v-radio
        label="Option 2"
        value="3"
      />
      <v-radio
        label="Option 2"
        value="2"
      />
      <v-radio
        label="Option 2"
        value="1"
      />
    </v-radio-group>
    <v-radio-group
      v-model="sum3"
      row
    >
      <v-radio
        label="Option 1"
        value="5"
      />
      <v-radio
        label="Option 2"
        value="4"
      />
      <v-radio
        label="Option 2"
        value="3"
      />
      <v-radio
        label="Option 2"
        value="2"
      />
      <v-radio
        label="Option 2"
        value="1"
      />
    </v-radio-group>
    <button @click="addData">
      Submit
    </button>
  </v-container>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data () {
    return {
      sum: '',
      sum2: '',
      sum3: '',
      summit: 0,
      s: 0,
      result1: 0,
      result2: 0,
      result3: 0,
      datas: 0,
      summ1: 0,
      summ2: 0,
      summ3: 0,
      name: 'เสริมจมูก'
    }
  },
  methods: {
    addData () {
      const dataText = {
        name: this.name,
        sum: parseInt(this.sum),
        sum2: parseInt(this.sum2),
        sum3: parseInt(this.sum3)
      }
      db.collection('dataP').doc().set(dataText)
        .then(function () {
          // eslint-disable-next-line no-console
          console.log('Document successfully written! -> dataMember')
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>
