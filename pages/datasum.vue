
<template>
  <div>
    <!-- <div v-for="(item,key) in dataSum" :key="key"> -->
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ยอดวันนี้
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
          ..... บาท
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ยอดเดือนนี้
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
          200,000 บาท
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ยอดปีนี้
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
          ..... บาท
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        จำนวนลูกค้า-
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
          {{ dataSum }}
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
    dataSum: ''
  }),

  created () {
    this.getData()
  },

  methods: {
    getData () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data().firstName)
          console.log(doc.data())
        })
        this.dataSum = data
      })
    }
  }
}
</script>
