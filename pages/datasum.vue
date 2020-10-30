
<template>
  <div>
    <v-row justify="center">
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#26c6da"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-twitter
          </v-icon>
          <span class="title font-weight-light">รายได้ทั้งหมด</span>
        </v-card-title>
        <hr>
        <v-card-text class="headline font-weight-bold">
          {{ priceSum }} บาท
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#26c6da"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-twitter
          </v-icon>
          <span class="title font-weight-light">ลูกค้าทั้งหมด</span>
        </v-card-title>
        <hr>
        <v-card-text class="headline font-weight-bold">
          {{ firstNameSum }} คน
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#26c6da"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-twitter
          </v-icon>
          <span class="title font-weight-light">ค่าใช้จ่ายพนักงานทั้งหมด</span>
        </v-card-title>
        <hr>
        <v-card-text class="headline font-weight-bold">
          {{ priceStaffSum }} บาท
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#26c6da"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-twitter
          </v-icon>
          <span class="title font-weight-light">จำนวนพนักงานทั้งหมด</span>
        </v-card-title>
        <hr>
        <v-card-text class="headline font-weight-bold">
          {{ lengthStaffSum }} คน
        </v-card-text>
      </v-card>
    </v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        v-model="typeInputMember"
        :items="this.$store.state.type"
        label="Select"
        dense
        outlined
      />
    </v-col>
    <!-- <v-btn @click="typeDataMember">
      WWW
    </v-btn> -->
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ประเภท {{ typeInputMember }} มี {{ typeMember.lengthType }} คน
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
          {{ typeMember.priceType }}
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <!-- </div> -->
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        v-model="typeInputStaff"
        :items="this.$store.state.positionStaffSum"
        label="Select"
        dense
        outlined
      />
    </v-col>
    <!-- <v-btn @click="typeDataStaff">
      WWW
    </v-btn> -->
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ประเภท {{ typeInputStaff }} มี {{ typeStaff.lengthType }} คน
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
          {{ typeStaff.priceType }}
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
    <!-- </div> -->
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        v-model="typeInputMonth"
        :items="this.$store.state.month"
        label="Select"
        dense
        outlined
      />
    </v-col>
    <!-- <v-btn @click="typeDataMonth">
      WWW
    </v-btn> -->
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        ประเภท {{ typeInputMonth }} มี {{ typeMonth.lengthType }} คน
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
          {{ typeMonth.priceType }}
        </v-col>
        <v-spacer />
      </v-row>
    </v-alert>
     <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    barChartData: {
      labels: [
        '2019-06',
        '2019-07'
      ],
      datasets: [
        {
          label: 'Visits',
          data: [],
          backgroundColor: '#003f5c'
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Google analytics data',
        fontSize: 24,
        fontColor: '#6b7280'
      },
      tooltips: {
        backgroundColor: '#17BF62'
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
    },
    firstNameSum: 0,
    priceSum: 0,
    priceStaffSum: 0,
    typeInputMember: '',
    typeMember: {
      priceType: 0,
      lengthType: 0,
      i: ''
    },
    typeInputStaff: '',
    typeStaff: {
      priceType: 0,
      lengthType: 0,
      i: ''
    },
    typeInputMonth: '',
    typeMonth: {
      priceType: 0,
      lengthType: 0,
      i: '',
      indexMonth: ''
    },
    monthArr: []
  }),

  created () {
    this.getData()
    this.loginFirst()
  },
  updated () {
    while (this.typeInputMonth !== '' && this.typeMonth.i !== this.typeInputMonth) {
      this.typeDataMonth()
      break
    }
    while (this.typeInputStaff !== '' && this.typeStaff.i !== this.typeInputStaff) {
      this.typeDataStaff()
      break
    }
    while (this.typeInputMember !== '' && this.typeMember.i !== this.typeInputMember) {
      this.typeDataMember()
      break
    }
  },
  methods: {
    loginFirst () {
      if (this.$store.state.login === '') {
        this.$router.replace('/')
      }
    },
    typeDataMonth () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const payDate = []
        const po = []
        this.monthArr = [0]
        querySnapshot.forEach((doc) => {
          po.push(doc.data().price)
          payDate.push(doc.data().payDate)
        })
        for (let i = 0; i < payDate.length; i++) {
          const month = new Date(payDate[i])
          const n = month.getMonth() + 1
          this.indexMonth = n.toString()
          if (this.indexMonth === '1') { this.indexMonth = 'January' }
          if (this.indexMonth === '2') { this.indexMonth = 'February' }
          if (this.indexMonth === '3') { this.indexMonth = 'March' }
          if (this.indexMonth === '4') { this.indexMonth = 'April' }
          if (this.indexMonth === '5') { this.indexMonth = 'May' }
          if (this.indexMonth === '6') { this.indexMonth = 'June' }
          if (this.indexMonth === '7') { this.indexMonth = 'July' }
          if (this.indexMonth === '8') { this.indexMonth = 'August' }
          if (this.indexMonth === '9') { this.indexMonth = 'September' }
          if (this.indexMonth === '10') { this.indexMonth = 'October' }
          if (this.indexMonth === '11') { this.indexMonth = 'November' }
          if (this.indexMonth === '12') { this.indexMonth = 'December' }
          // console.log(n)
          // console.log(this.typeInputMonth)
          if (this.indexMonth === this.typeInputMonth) {
            this.monthArr.push(po[i])
            // console.log(this.monthArr)
          }
        }
        this.typeMonth.priceType = this.monthArr.map(i => Number(i))
        this.typeMonth.lengthType = this.monthArr.length - 1
        this.typeMonth.priceType = this.typeMonth.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeMonth.priceType = new Intl.NumberFormat().format(this.typeMonth.priceType)
        this.typeMonth.i = this.typeInputMonth
        // console.log(this.monthArr)
        // this.typeMonth.priceType = this.monthArr.length
        // console.log(this.typeMonth.lengthType)
        // console.log(this.typeMonth.priceType)
      })
    },
    typeDataMember () {
      db.collection('dataMember').where('type', '==', this.typeInputMember).onSnapshot((querySnapshot) => {
        const price = []
        this.typeMember.priceType = 0
        this.typeMember.lengthType = 0
        querySnapshot.forEach((doc) => {
          price.push(doc.data().price)
          // console.log(price)
          this.typeMember.priceType = price.map(i => Number(i))
        })
        this.typeMember.lengthType = price.length
        this.typeMember.priceType = this.typeMember.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeMember.priceType = new Intl.NumberFormat().format(this.typeMember.priceType)
        this.typeMember.i = this.typeInputMember
        // console.log(this.priceType)
      })
    },
    typeDataStaff () {
      db.collection('dataStaff').where('position', '==', this.typeInputStaff).onSnapshot((querySnapshot) => {
        const salary = []
        this.typeStaff.priceType = 0
        this.typeStaff.lengthType = 0
        querySnapshot.forEach((doc) => {
          salary.push(doc.data().salary)
          // console.log(price)
          this.typeStaff.priceType = salary.map(i => Number(i))
        })
        this.typeStaff.lengthType = salary.length
        this.typeStaff.priceType = this.typeStaff.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeStaff.priceType = new Intl.NumberFormat().format(this.typeStaff.priceType)
        this.typeStaff.i = this.typeInputStaff
        // console.log(this.priceType)
      })
    },
    getData () {
      this.barChartData = {
        labels: [
          '2019-06',
          '2019-07'
        ],
        datasets: [
          {
            label: 'Visits',
            data: [50, 50],
            backgroundColor: '#003f5c'
          }
        ]
      }
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
        this.priceSum = new Intl.NumberFormat().format(this.priceSum)
        // console.log(this.priceSum)
      })
      db.collection('dataStaff').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const price = []
        const length = []
        querySnapshot.forEach((doc) => {
          length.push(doc.data().firstName)
          price.push(doc.data().salary)
          this.priceStaffSum = price.map(i => Number(i))
        })
        this.lengthStaffSum = length.length
        this.priceStaffSum = this.priceStaffSum.map(number => number).reduce((sum, number) => sum + number)
        this.priceStaffSum = new Intl.NumberFormat().format(this.priceStaffSum)
      })
    }
  }
}
</script>
