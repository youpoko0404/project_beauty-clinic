
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
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
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
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
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
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
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
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
        <v-card-text class="headline font-weight-bold">
          {{ lengthStaffSum }} คน
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="typeInputMember"
          :items="this.$store.state.type"
          label="ประเภท"
          dense
          outlined
        />
        <v-alert
          text
          color="info"
        >
          <h3 class="headline">
            รายได้ประเภท {{ typeInputMember }} มี {{ typeMember.lengthType }} คน
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
      </v-col>
      <!-- </div> -->
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="typeInputStaff"
          :items="this.$store.state.positionStaffSum"
          label="พนักงาน"
          dense
          outlined
        />
        <v-alert
          text
          color="info"
        >
          <h3 class="headline">
            ค่าใช้จ่ายของ {{ typeInputStaff }} มี {{ typeStaff.lengthType }} คน
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
      </v-col>
    </v-row>
    <!-- </div> -->
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-row>
          <v-col
            cols="12"
            md="9"
          >
            <v-select
              v-model="typeInputMonth"
              :items="this.$store.state.month"
              label="เดือน"
              dense
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
              v-model="typeInputMonthYears"
              :items="this.$store.state.years"
              label="ปี"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <v-alert
          text
          color="info"
        >
          <h3 class="headline">
            รายได้เดือน {{ typeInputMonth }} ใน {{ typeInputMonthYears }} มี {{ typeMonth.lengthType }} คน
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
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="typeInputYears"
          :items="this.$store.state.years"
          label="ปี"
          dense
          outlined
        />
        <v-alert
          text
          color="info"
        >
          <h3 class="headline">
            รายได้{{ typeInputYears }} มี {{ typeYears.lengthType }} คน
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
              {{ typeYears.priceType }}
            </v-col>
            <v-spacer />
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
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
    typeInputMonthYears: '',
    typeMonth: {
      priceType: 0,
      lengthType: 0,
      i: '',
      ii: '',
      indexMonth: '',
      indexYears: ''
    },
    monthArr: [],
    typeInputYears: '',
    typeYears: {
      priceType: 0,
      lengthType: 0,
      i: '',
      indexYears: ''
    },
    YearsArr: []
  }),

  created () {
    this.getData()
    this.loginFirst()
  },
  updated () {
    // this.typeDataMonth()
    while (this.typeMonth.i !== this.typeInputMonth | this.typeMonth.ii !== this.typeInputMonthYears) {
      this.typeDataMonth()
      // console.log(this.typeInputMonth)
      // console.log(this.typeInputMonthYears)
      break
    }
    while (this.typeStaff.i !== this.typeInputStaff) {
      this.typeDataStaff()
      // console.log(this.typeInputStaff)
      break
    }
    while (this.typeMember.i !== this.typeInputMember) {
      this.typeDataMember()
      // console.log(this.typeInputMember)
      break
    }
    while (this.typeYears.i !== this.typeInputYears) {
      this.typeDataYears()
      // console.log(this.typeInputYears)
      break
    }
  },
  methods: {
    loginFirst () {
      if (this.$store.state.login === '') {
        this.$router.replace('/')
      }
    },
    typeDataYears () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const payDate = []
        const po = []
        this.YearsArr = [0]
        querySnapshot.forEach((doc) => {
          po.push(doc.data().price)
          payDate.push(doc.data().payDate)
        })
        for (let i = 0; i < payDate.length; i++) {
          const Years = new Date(payDate[i])
          const n = Years.getFullYear()
          this.typeYears.indexYears = n.toString()
          if (this.typeYears.indexYears === '2020') { this.typeYears.indexYears = 'ปี 2563' }
          if (this.typeYears.indexYears === '2019') { this.typeYears.indexYears = 'ปี 2562' }
          // console.log(n)
          // console.log(this.typeInputYears)
          if (this.typeYears.indexYears === this.typeInputYears) {
            this.YearsArr.push(po[i])
            // console.log(this.YearsArr)
          }
        }
        this.typeYears.priceType = this.YearsArr.map(i => Number(i))
        this.typeYears.lengthType = this.YearsArr.length - 1
        this.typeYears.priceType = this.typeYears.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeYears.priceType = new Intl.NumberFormat().format(this.typeYears.priceType)
        this.typeYears.i = this.typeInputYears
        // console.log(this.YearsArr)
        // this.typeYears.priceType = this.YearsArr.length
        // console.log(this.typeYears.lengthType)
        // console.log(this.typeYears.priceType)
      })
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
          const y = month.getFullYear()
          this.typeMonth.indexYears = y.toString()
          this.typeMonth.indexMonth = n.toString()
          if (this.typeMonth.indexYears === '2020') { this.typeMonth.indexYears = 'ปี 2563' }
          if (this.typeMonth.indexYears === '2019') { this.typeMonth.indexYears = 'ปี 2562' }
          if (this.typeMonth.indexMonth === '1') { this.typeMonth.indexMonth = 'January' }
          if (this.typeMonth.indexMonth === '2') { this.typeMonth.indexMonth = 'February' }
          if (this.typeMonth.indexMonth === '3') { this.typeMonth.indexMonth = 'March' }
          if (this.typeMonth.indexMonth === '4') { this.typeMonth.indexMonth = 'April' }
          if (this.typeMonth.indexMonth === '5') { this.typeMonth.indexMonth = 'May' }
          if (this.typeMonth.indexMonth === '6') { this.typeMonth.indexMonth = 'June' }
          if (this.typeMonth.indexMonth === '7') { this.typeMonth.indexMonth = 'July' }
          if (this.typeMonth.indexMonth === '8') { this.typeMonth.indexMonth = 'August' }
          if (this.typeMonth.indexMonth === '9') { this.typeMonth.indexMonth = 'September' }
          if (this.typeMonth.indexMonth === '10') { this.typeMonth.indexMonth = 'October' }
          if (this.typeMonth.indexMonth === '11') { this.typeMonth.indexMonth = 'November' }
          if (this.typeMonth.indexMonth === '12') { this.typeMonth.indexMonth = 'December' }
          // console.log(n)
          // console.log(this.typeMonth.indexMonth)
          // console.log(this.typeYears.indexYears)
          if (this.typeInputMonthYears === this.typeMonth.indexYears) {
            if (this.typeInputMonth === this.typeMonth.indexMonth) {
              this.monthArr.push(po[i])
              // console.log(this.monthArr.push(po[i]))
            }
          }
        }
        this.typeMonth.priceType = this.monthArr.map(i => Number(i))
        this.typeMonth.lengthType = this.monthArr.length - 1
        this.typeMonth.priceType = this.typeMonth.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeMonth.priceType = new Intl.NumberFormat().format(this.typeMonth.priceType)
        this.typeMonth.i = this.typeInputMonth
        this.typeMonth.ii = this.typeInputMonthYears
        console.log(this.typeMonth.ii)
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
