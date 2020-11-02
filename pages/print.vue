<template>
  <div>
    <div v-if="i == false">
      <v-app dark>
        <v-main>
          <v-container>
            <div id="non-printable">
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-select
                    v-model="name"
                    :items="dataName"
                    label="Name *"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                  <v-select
                    v-model="types"
                    :items="this.$store.state.type"
                    label="type *"
                    required
                  />
                </v-col>
                <v-btn
                  class="mr-4 mt-5 mb-8"
                  @click="serachData"
                >
                  submit
                </v-btn>
              </v-row>
            </div>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title>
                    Print
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
          </v-container>
        </v-main>
      </v-app>
    </div>
    <div v-for="(item,key) in textList" :key="key">
      <html>
        <head>
          <base href="https://www.codebee.co.th/invoicemaker/">
          <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
          <link rel="stylesheet" type="text/css" href="css/style.css">
        </head>

        <body id="print">
          <div id="page-wrap">
            <textarea id="header_print">ใบเสร็จ</textarea>
            <div id="customer">
              <textarea id="customer-title">เชียงใหม่ คลินิค</textarea>
              <table id="meta">
                <tbody>
                  <tr>
                    <td class="meta-head">
                      วันที่เอกสาร
                    </td>
                    <td>{{ date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table id="items">
              <tbody>
                <tr>
                  <th>ชื่อ</th>
                  <th>รายการ</th>
                  <th>ประเภทที่ทำ</th>
                  <th>ราคา</th>
                  <th>รวม / บาท</th>
                </tr>

                <tr class="item-row">
                  <td class="item-name">
                    {{ item.firstName }}  {{ item.lastName }}
                  </td>
                  <td class="description">
                    {{ item.advive }}
                  </td>
                  <td>{{ item.type }}</td>
                  <td>{{ priceShow }}</td>
                  <td>{{ priceShow }}</td>
                </tr>
                <tr id="hiderow">
                  <td colspan="5" />
                </tr>

                <tr>
                  <td colspan="2" class="blank" />
                  <td colspan="2" class="total-line">
                    รวมเงิน
                  </td>
                  <td>
                    {{ priceShow }}.00
                  </td>
                </tr>

                <tr>
                  <td colspan="2" class="blank" />
                  <td colspan="2" class="total-line">
                    ภาษีมูลค่าเพิ่ม
                  </td>

                  <td class="total-value">
                    {{ vat }}.00
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="blank" />
                  <td colspan="2" class="total-line balance">
                    รวมสุทธิ
                  </td>
                  <td class="total-value balance">
                    {{ sum }}.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'print',
  data () {
    return {
      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: true,
          value: 'firstName'
        },
        { text: 'List Name', value: 'lastName' },
        { text: 'Type', value: 'type' },
        { text: 'Advive', value: 'advive' },
        { text: 'Price', value: 'price' }
      ],
      textList: [],
      dataTable: [],
      name: '',
      types: '',
      dataName: [],
      vat: 0,
      price: 0,
      i: false,
      sum: 0,
      priceShow: 0,
      searchInput: '',
      date: ((new Date()).getDate()) + '/' + ((new Date()).getMonth() + 1) + '/' + ((new Date()).getFullYear())
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        const name = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
          name.push(doc.data().firstName)
        })
        this.dataTable = data
        this.dataName = name
      })
    },
    serachData () {
      db.collection('dataMember').where('firstName', '==', this.name).where('type', '==', this.types).onSnapshot((querySnapshot) => {
        const data = []
        const vat = []
        const price = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          vat.push(doc.data().price)
          price.push(doc.data().price)
          // console.log(price)
          let p = price[0]
          p = p.split(',').join('')
          let v = price[0]
          v = v.split(',').join('')
          // console.log(s)
          this.priceShow = new Intl.NumberFormat().format(parseInt(p))
          this.price = parseInt(p)
          this.vat = new Intl.NumberFormat().format(parseInt(v * (7 / 100)))
          this.sum = this.price + parseInt(v * (7 / 100))
          this.sum = new Intl.NumberFormat().format(this.sum)
          this.i = true
        })
        this.textList = data
      })
    }
  }
}
</script>

<style type="text/css">
@media print
{
     #non-printable { display: none; }
     #page-wrap { display: block; }
}
.theme--light.v-application {
    background: rgb(251, 237, 224);
    color: rgba(0, 0, 0, 0.87);
}
</style>
