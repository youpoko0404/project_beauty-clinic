
<template>
  <div>
    <v-row justify="center">
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#D79E66"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-cash-plus
          </v-icon>
          <span class="headline font-weight-light">รายได้ทั้งหมด</span>
        </v-card-title>
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
        <v-card-text class="headline font-weight-bold" style="color:white">
          {{ priceSum }} บาท
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#AE5D2A"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-human-greeting
          </v-icon>
          <span class="headline font-weight-light">ลูกค้าทั้งหมด</span>
        </v-card-title>
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
        <v-card-text class="headline font-weight-bold" style="color:white">
          {{ firstNameSum }} คน
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#835A43"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-credit-card-minus
          </v-icon>
          <span class="headline font-weight-light">ค่าใช้จ่ายพนักงานทั้งหมด</span>
        </v-card-title>
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
        <v-card-text class="headline font-weight-bold" style="color:white">
          {{ priceStaffSum }} บาท
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mb-3 ml-2 mr-2"
        color="#BC7559"
        dark
        width="360"
        height="150"
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-human-capacity-increase
          </v-icon>
          <span class="headline font-weight-light">จำนวนพนักงานทั้งหมด</span>
        </v-card-title>
        <v-divider
          class="ml-4 mr-4 white"
          style="opacity: 1.00"
        />
        <v-card-text class="headline font-weight-white" style="color:white">
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
        <v-card
          class="mx-auto"
        >
          <v-card-text class="title">
            <p class="text--primary">
              รายได้{{ type }}{{ typeInputMember }} มีจำนวน {{ typeMember.lengthType }} คน
            </p>
            <v-divider
              class="ml-4 mr-4 back"
              style="opacity: 1.00"
            />
            <div class="text--primary mt-4">
              {{ typeMember.priceType }} บาท
            </div>
          </v-card-text>
        </v-card>
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
        <v-card
          class="mx-auto"
        >
          <v-card-text class="title">
            <p class="text--primary">
              ค่าใช้จ่าย {{ typeInputStaff }} มีจำนวน {{ typeStaff.lengthType }} คน
            </p>
            <v-divider
              class="ml-4 mr-4 back"
              style="opacity: 1.00"
            />
            <div class="text--primary mt-4">
              {{ typeStaff.priceType }} บาท
            </div>
          </v-card-text>
        </v-card>
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
        <v-card
          class="mx-auto"
        >
          <v-card-text class="title">
            <p class="text--primary">
              รายได้เดือน {{ typeInputMonth }} {{ typeInputMonthYears }} มีจำนวน {{ typeMonth.lengthType }} คน
            </p>
            <v-divider
              class="ml-4 mr-4 back"
              style="opacity: 1.00"
            />
            <div class="text--primary mt-4">
              {{ typeMonth.priceType }} บาท
            </div>
          </v-card-text>
        </v-card>
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
        <v-card
          class="mx-auto"
        >
          <v-card-text class="title">
            <p class="text--primary">
              รายได้{{ typeInputYears }} มีจำนวน {{ typeYears.lengthType }} คน
            </p>
            <v-divider
              class="ml-4 mr-4 back"
              style="opacity: 1.00"
            />
            <div class="text--primary mt-4">
              {{ typeYears.priceType }} บาท
            </div>
          </v-card-text>
        </v-card>
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
    type: '',
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
    typeInputYears: '',
    typeYears: {
      priceType: 0,
      lengthType: 0,
      i: '',
      indexYears: ''
    }
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
        const p = [0]
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
        }
        for (let i = 0; i < po.length; i++) {
          let v = po[i]
          // console.log(price[i])
          v = v.split(',').join('')
          this.typeYears.priceType = v
          if (this.typeYears.indexYears === this.typeInputYears) {
            p.push(this.typeYears.priceType)
            // console.log(this.monthArr.push(po[i]))
          }
        }
        this.typeYears.priceType = p.map(i => Number(i))
        this.typeYears.lengthType = p.length - 1
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
        const p = [0]
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
          if (this.typeMonth.indexMonth === '1') { this.typeMonth.indexMonth = 'มกราคม' }
          if (this.typeMonth.indexMonth === '2') { this.typeMonth.indexMonth = 'กุมภาพันธ์' }
          if (this.typeMonth.indexMonth === '3') { this.typeMonth.indexMonth = 'มีนาคม' }
          if (this.typeMonth.indexMonth === '4') { this.typeMonth.indexMonth = 'เมษายน' }
          if (this.typeMonth.indexMonth === '5') { this.typeMonth.indexMonth = 'พฤษภาคม' }
          if (this.typeMonth.indexMonth === '6') { this.typeMonth.indexMonth = 'มิถุนายน' }
          if (this.typeMonth.indexMonth === '7') { this.typeMonth.indexMonth = 'กรกฎาคม' }
          if (this.typeMonth.indexMonth === '8') { this.typeMonth.indexMonth = 'สิงหาคม' }
          if (this.typeMonth.indexMonth === '9') { this.typeMonth.indexMonth = 'กันยายน' }
          if (this.typeMonth.indexMonth === '10') { this.typeMonth.indexMonth = 'ตุลาคม' }
          if (this.typeMonth.indexMonth === '11') { this.typeMonth.indexMonth = 'พฤศจิกายน' }
          if (this.typeMonth.indexMonth === '12') { this.typeMonth.indexMonth = 'ธันวาคม' }
          // console.log(n)
          // console.log(this.typeMonth.indexMonth)
          // console.log(this.typeYears.indexYears)
        }
        for (let i = 0; i < po.length; i++) {
          let v = po[i]
          // console.log(price[i])
          v = v.split(',').join('')
          this.typeMonth.priceType = v
          if (this.typeInputMonthYears === this.typeMonth.indexYears) {
            if (this.typeInputMonth === this.typeMonth.indexMonth) {
              p.push(this.typeMonth.priceType)
              // console.log(this.monthArr.push(po[i]))
            }
          }
        }
        this.typeMonth.priceType = p.map(i => Number(i))
        this.typeMonth.lengthType = p.length - 1
        this.typeMonth.priceType = this.typeMonth.priceType.map(number => number).reduce((sum, number) => sum + number)
        this.typeMonth.priceType = new Intl.NumberFormat().format(this.typeMonth.priceType)
        this.typeMonth.i = this.typeInputMonth
        this.typeMonth.ii = this.typeInputMonthYears
        // console.log(this.typeMonth.ii)
        // console.log(this.monthArr)
        // this.typeMonth.priceType = this.monthArr.length
        // console.log(this.typeMonth.lengthType)
        // console.log(this.typeMonth.priceType)
      })
    },
    typeDataMember () {
      db.collection('dataMember').where('type', '==', this.typeInputMember).onSnapshot((querySnapshot) => {
        this.type = 'ประเภท'
        const price = []
        const p = []
        this.typeMember.priceType = 0
        this.typeMember.lengthType = 0
        querySnapshot.forEach((doc) => {
          price.push(doc.data().price)
          // console.log(price)
          for (let i = 0; i < price.length; i++) {
            let v = price[i]
            // console.log(price[i])
            v = v.split(',').join('')
            this.typeMember.priceType = v
          }
          p.push(this.typeMember.priceType)
          // console.log(p)
          this.typeMember.priceType = p.map(i => Number(i))
          // console.log(this.typeMember.priceType)
        })
        this.typeMember.lengthType = price.length
        if (this.typeMember.lengthType !== 0) {
          this.typeMember.priceType = this.typeMember.priceType.map(number => number).reduce((sum, number) => sum + number)
          this.typeMember.priceType = new Intl.NumberFormat().format(this.typeMember.priceType)
        }
        this.typeMember.i = this.typeInputMember
        // console.log(this.priceType)
      })
    },
    typeDataStaff () {
      db.collection('dataStaff').where('position', '==', this.typeInputStaff).onSnapshot((querySnapshot) => {
        const salary = []
        const p = []
        this.typeStaff.priceType = 0
        this.typeStaff.lengthType = 0
        querySnapshot.forEach((doc) => {
          salary.push(doc.data().salary)
          // console.log(price)
          for (let i = 0; i < salary.length; i++) {
            let v = salary[i]
            // console.log(price[i])
            v = v.split(',').join('')
            this.typeStaff.priceType = v
          }
          p.push(this.typeStaff.priceType)
          this.typeStaff.priceType = p.map(i => Number(i))
        })
        this.typeStaff.lengthType = salary.length
        if (this.typeStaff.lengthType !== 0) {
          this.typeStaff.priceType = this.typeStaff.priceType.map(number => number).reduce((sum, number) => sum + number)
          this.typeStaff.priceType = new Intl.NumberFormat().format(this.typeStaff.priceType)
        }
        this.typeStaff.i = this.typeInputStaff
        // console.log(this.priceType)
      })
    },
    getData () {
      db.collection('dataMember').onSnapshot((querySnapshot) => {
        const firstName = []
        const price = []
        const p = []
        querySnapshot.forEach((doc) => {
          firstName.push(doc.data().firstName)
          price.push(doc.data().price)
          // console.log(price)
          for (let i = 0; i < price.length; i++) {
            let v = price[i]
            // console.log(price[i])
            v = v.split(',').join('')
            this.priceSum = v
          }
          // console.log(this.priceSum)
          p.push(this.priceSum)
          // console.log(p)
          // console.log(this.priceSum)
          this.priceSum = p.map(i => Number(i))
        })
        this.firstNameSum = firstName.length
        if (this.priceSum !== 0) {
          this.priceSum = this.priceSum.map(number => number).reduce((sum, number) => sum + number)
          this.priceSum = new Intl.NumberFormat().format(this.priceSum)
        }
        // console.log(this.priceSum)
      })
      db.collection('dataStaff').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const price = []
        const length = []
        const p = []
        querySnapshot.forEach((doc) => {
          length.push(doc.data().firstName)
          price.push(doc.data().salary)
          for (let i = 0; i < price.length; i++) {
            let v = price[i]
            // console.log(price[i])
            v = v.split(',').join('')
            this.priceStaffSum = v
          }
          p.push(this.priceStaffSum)
          this.priceStaffSum = p.map(i => Number(i))
        })
        this.lengthStaffSum = length.length
        if (this.priceStaffSum !== 0) {
          this.priceStaffSum = this.priceStaffSum.map(number => number).reduce((sum, number) => sum + number)
          this.priceStaffSum = new Intl.NumberFormat().format(this.priceStaffSum)
        }
      })
    }
  }
}
</script>
