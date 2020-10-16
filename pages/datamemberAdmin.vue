<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Data Member
          <v-spacer />
          <v-text-field
            v-model="searchInput"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="dataTable"
          :search="searchInput"
          class="elevation-1"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    dataTable: [],
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName'
      },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Age', value: 'age' },
      { text: 'Height (cm)', value: 'height' },
      { text: 'Weight (kg)', value: 'weight' },
      { text: 'Phone', value: 'phone' },
      { text: 'Type', value: 'type' },
      { text: 'Sex', value: 'sex' },
      { text: 'Other', value: 'other' },
      { text: 'Appointment', value: 'appointment' },
      { text: 'Price', value: 'price' }
    ]
  }),

  created () {
    this.getData()
  },

  methods: {
    getData () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
        })
        this.dataTable = data
      })
    }
  }
}
</script>
