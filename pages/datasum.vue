
<template>
  <div>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ยอดทั้งหมด
      </h3>
      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      />

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
          {{ priceSum }} บาท
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        จำนวนลูกค้า
      </h3>
      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      />

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
          {{ firstNameSum }}
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <!-- </div> -->
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    firstNameSum: 0,
    priceSum: 0
  }),

  created () {
    this.getData()
  },

  methods: {
    getData () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const firstName = []
        const price = []
        querySnapshot.forEach((doc) => {
          firstName.push(doc.data().firstName)
          price.push(doc.data().price)
          this.priceSum = price.map(i => Number(i))
        })
        this.firstNameSum = firstName.length
        this.priceSum = this.priceSum.map(number => number).reduce((sum, number) => sum + number)
        console.log(this.priceSum)
      })
    }
  }
}
</script>
