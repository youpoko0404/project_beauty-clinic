<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dataStaff"
      :search="searchInput"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Data STAFF</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mr-3"
                v-bind="attrs"
                v-on="on"
              >
                ADD STAFF
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="First Name *"
                        :rules="[v => !!v || 'First Name is required']"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="Last Name *"
                        :rules="[v => !!v || 'last Name is required']"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.position"
                        :rules="[v => !!v || 'Position is required']"
                        :items="positionStaff"
                        label="Position *"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.typeDc"
                        :items="typeDc"
                        label="Position(Doctor only)"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                    >
                      <v-text-field
                        v-model="editedItem.salary"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        label="Salary"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                    >
                      <v-select
                        v-model="editedItem.sex"
                        :rules="[v => !!v || 'Sex is required']"
                        :items="sex"
                        label="Sex *"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="editedItem.time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.time"
                            label="Choose time"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="editedItem.time"
                          full-width
                          @click:minute="$refs.menu.save(editedItem.time)"
                        />
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.id"
                        oninput="this.value = this.value.replace(/[^A-Za-z0-9]/g, '')"
                        :rules="[v => !!v || 'ID is required']"
                        label="ID *"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.pass"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                        :rules="[v => !!v || 'Password is required']"
                        label="Password"
                        @click:append="show1 = !show1"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-text-field
            v-model="searchInput"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-toolbar
            flat
            color="primary"
            dark
          >
            <v-toolbar-title>
              Rating
            </v-toolbar-title>
            <v-row justify="end">
              <p class="mt-5 mr-4">
                ผู้ประเมินจำนวน {{ sumLength }} คน
              </p>
            </v-row>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>
                mdi-doctor
              </v-icon>
              หมอ
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-account-star
              </v-icon>
              เคาท์เตอร์
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-hand-heart
              </v-icon>
              ภาพรวม
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row justify="center">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        v-model="type"
                        :items="this.$store.state.type"
                        label="Type"
                        dense
                        outlined
                      />
                    </v-col>
                    <v-btn class="mt-3" @click="ratData">
                      Search
                    </v-btn>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      1. มนุษย์สัมพันธ์กับผู้ป่วยและญาติผู้ป่วย
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumDc.sumDc1"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumDc.sumDc1.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      2. การดูแลรักษาและติดตามอาการผู้ป่วย
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumDc.sumDc2"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumDc.sumDc2.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      3. เปิดโอกาสให้ผู้ป่วยและครอบครัวซักถามเพื่อความเข้าใจ
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumDc.sumDc3"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumDc.sumDc3.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <p class="mt-5">
                      1. ความเหมาะสมในด้านคำพูด
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumCt.sumCt1"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumCt.sumCt1.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      2.พนักงานมีประติสัมพันธ์ที่ดีกับลูกค้า
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumCt.sumCt2"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumCt.sumCt2.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      3. พนักงานอธิบายรายละเอียดได้เข้าใจและครบถ้วน
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumCt.sumCt3"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumCt.sumCt3.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <p class="mt-5">
                      1. ความสะอาดของสถานที่ และสิ่งแวดล้อม
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumOw.sumOw1"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumOw.sumOw1.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      2. คุณภาพและความทันสมัยของอุปกรณ์/เครื่องมือ
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumOw.sumOw2"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumOw.sumOw2.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                  <v-row>
                    <p class="mt-5">
                      3. การจัดสถานที่สะดวกในการเข้ารับบริการ
                    </p>
                    <v-row justify="end">
                      <v-rating
                        v-model="sumOw.sumOw3"
                        background-color="grey lighten-2"
                        color="primary"
                        size="40"
                        readonly
                        half-increments
                      />
                      <p class="mt-5 mr-5">
                        {{ sumOw.sumOw3.toFixed(2) }}
                      </p>
                    </v-row>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-data-table
          dense
          :headers="headers2"
          :items="dataText"
          item-key="name"
          class="elevation-1"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    searchInput: '',
    type: '',
    sumDc: {
      sumDc1: 0,
      sumDc2: 0,
      sumDc3: 0
    },
    sumCt: {
      sumCt1: 0,
      sumCt2: 0,
      sumCt3: 0
    },
    sumOw: {
      sumOw1: 0,
      sumOw2: 0,
      sumOw3: 0
    },
    dataRate: [],
    menu: false,
    modal: false,
    menu1: false,
    menu2: false,
    modal2: false,
    dialog: false,
    show1: false,
    dialogDelete: false,
    dataStaff: [],
    datas: '',
    indexfirstNameEdit: '',
    indexlastNameEdit: '',
    indextypeEdit: '',
    indexTimeEdit: '',
    sumLength: 0,
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName'
      },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Time', value: 'time' },
      { text: 'Position', value: 'position' },
      { text: 'Type', value: 'typeDc' },
      { text: 'Salary', value: 'salary' },
      { text: 'Start work', value: 'login' },
      { text: 'Get off work', value: 'logout' },
      { text: 'Date', value: 'date' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    headers2: [
      { text: 'Comment', value: 'owComment' }
    ],
    dataText: [],
    editedIndex: -1,
    positionStaff: [
      'พนักงานเคาเคอร์',
      'แพทย์',
      'ผู้จัดการ'
    ],
    sex: [
      'ชาย',
      'หญิง'
    ],
    typeDc: [
      'การเสริมจมูก',
      'การเสริมคาง',
      'การตกแต่งริมฝีปาก',
      'การทำตา',
      'การเสริมหน้าอก',
      'การฉีดโบท็อก'
    ],
    editedItem: {
      firstName: null,
      lastName: null,
      time: null,
      position: null,
      id: null,
      pass: null,
      typeDc: null,
      salary: 0
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      time: null,
      position: '',
      id: '',
      pass: '',
      typeDc: '',
      salary: 0
    },
    errAdditem: false,
    pp: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Staff' : 'Edit Data'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  created () {
    this.getData()
    this.loginFirst()
  },
  methods: {
    loginFirst () {
      if (this.$store.state.login === '') {
        this.$router.replace('/')
      }
    },
    ratData () {
      db.collection('dataRate').where('types', '==', this.type).onSnapshot((querySnapshot) => { // หมอ
        const sum = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().sumDc)
          sum.push(doc.data())
        })
        this.sumDc.sumDc1 = 0
        this.sumDc.sumDc2 = 0
        this.sumDc.sumDc3 = 0
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sumDc.sumDc1 > 0) {
            this.sumDc.sumDc1 += sum[i].sumDc.sumDc1 / sum.length
          }
          if (sum[i].sumDc.sumDc2 > 0) {
            this.sumDc.sumDc2 += sum[i].sumDc.sumDc2 / sum.length
          }
          if (sum[i].sumDc.sumDc3 > 0) {
            this.sumDc.sumDc3 += sum[i].sumDc.sumDc3 / sum.length
          }
        }
      })
    },
    getData () {
      db.collection('dataRate').onSnapshot((querySnapshot) => { // เคาท์เตอร์ // รวม
        const sum = []
        const comment = []
        querySnapshot.forEach((doc) => {
          sum.push(doc.data())
        })
        this.sumLength = sum.length
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].owComment !== '' && sum[i].owComment !== '-') {
            comment.push(sum[i])
          }
        }
        this.dataText = comment
        // console.log(this.dataText)
        this.sumCt.sumCt1 = 0
        this.sumCt.sumCt2 = 0
        this.sumCt.sumCt3 = 0
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sumCt.sumCt1 > 0) {
            this.sumCt.sumCt1 += sum[i].sumCt.sumCt1 / sum.length
          }
          if (sum[i].sumCt.sumCt2 > 0) {
            this.sumCt.sumCt2 += sum[i].sumCt.sumCt2 / sum.length
          }
          if (sum[i].sumCt.sumCt3 > 0) {
            this.sumCt.sumCt3 += sum[i].sumCt.sumCt3 / sum.length
          }
        }
        this.sumOw.sumOw1 = 0
        this.sumOw.sumOw2 = 0
        this.sumOw.sumOw3 = 0
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sumOw.sumOw1 > 0) {
            this.sumOw.sumOw1 += sum[i].sumOw.sumOw1 / sum.length
          }
          if (sum[i].sumOw.sumOw2 > 0) {
            this.sumOw.sumOw2 += sum[i].sumOw.sumOw2 / sum.length
          }
          if (sum[i].sumOw.sumOw3 > 0) {
            this.sumOw.sumOw3 += sum[i].sumOw.sumOw3 / sum.length
          }
        }
      })
      db.collection('dataStaff').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        const pp = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
          pp.push(doc.data().id)
        })
        this.dataStaff = data
        this.pp = pp
      })
    },
    editItem (item) {
      this.editedIndex = this.dataStaff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.dataStaff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.dataStaff.splice(this.editedIndex, -1)
      this.indexfirstNameEdit = (this.dataStaff[this.editedIndex].firstName)
      this.indexlastNameEdit = (this.dataStaff[this.editedIndex].lastName)
      this.indextypeEdit = (this.dataStaff[this.editedIndex].position)
      this.indexTimeEdit = (this.dataStaff[this.editedIndex].time)
      this.indexEdit = (this.dataStaff[this.editedIndex], this.editedItem)
      db.collection('dataStaff')
        .where('firstName', '==', this.indexfirstNameEdit)
        .where('lastName', '==', this.indexlastNameEdit)
        .where('position', '==', this.indextypeEdit)
        .where('time', '==', this.indexTimeEdit)
        .orderBy('timestamp').onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const p = []
            p.push(doc.id)
            this.datas = p.toString()
            db.collection('dataStaff').doc(this.datas).delete()
          })
        })
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        if (this.editedItem.position === this.positionStaff[0]) {
          this.editedItem.typeDc = '-'
        } else if (this.editedItem.position === this.positionStaff[2]) {
          this.editedItem.typeDc = '-'
        }
        this.indexfirstNameEdit = (this.dataStaff[this.editedIndex].firstName)
        this.indexlastNameEdit = (this.dataStaff[this.editedIndex].lastName)
        this.indextypeEdit = (this.dataStaff[this.editedIndex].position)
        this.indexTimeEdit = (this.dataStaff[this.editedIndex].time)
        this.indexEdit = (this.dataStaff[this.editedIndex], this.editedItem)
        // console.log(this.dataStaff[this.editedIndex].id)
        for (let i = 0; i < this.pp.length; i++) {
          if (this.pp[i] === this.editedItem.id) {
            if (this.pp[i] === this.dataStaff[this.editedIndex].id) {
              this.errAdditem = false
            }
            if (this.pp[i] !== this.dataStaff[this.editedIndex].id) {
              // console.log(this.pp[i] + '===' + this.editedItem.id)
              this.errAdditem = true
              break
              // console.log(this.errAdditem)
            }
          } else if (this.pp[i] !== this.editedItem.id) {
            // console.log(this.pp[i] + '!==' + this.editedItem.id)
            this.errAdditem = false
          } // console.log(this.errAdditem)
        }
        if (this.errAdditem === true) {
          alert('ID ขอพนักงานซ้ำ')
        } else {
          let p = this.editedItem.salary
          p = p.split(',').join('')
          // console.log(p)
          this.editedItem.salary = new Intl.NumberFormat().format(p)
          db.collection('dataStaff')
            .where('firstName', '==', this.indexfirstNameEdit)
            .where('lastName', '==', this.indexlastNameEdit)
            .where('position', '==', this.indextypeEdit)
            .where('time', '==', this.indexTimeEdit)
            .orderBy('timestamp').onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const p = []
                p.push(doc.id)
                this.datas = p.toString()
                db.collection('dataStaff').doc(this.datas).update(this.indexEdit)
                this.$router.replace('/datastaff')
              })
            })

          if (this.editedItem.firstName != null && this.editedItem.lastName != null &&
            this.editedItem.sex != null && this.editedItem.position != null &&
            this.editedItem.id != null && this.editedItem.pass != null) {
            this.close()
          }
        } this.errAdditem = false
      } else {
        if (this.editedItem.position === this.positionStaff[0]) {
          this.editedItem.time = '08:00'
          this.editedItem.typeDc = '-'
        } else if (this.editedItem.position === this.positionStaff[1]) {
          this.editedItem.time = '09:00'
        } else if (this.editedItem.position === this.positionStaff[2]) {
          this.editedItem.time = '10:00'
          this.editedItem.typeDc = '-'
        }
        this.editedItem.salary = new Intl.NumberFormat().format(this.editedItem.salary)
        const dataText = {
          firstName: this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          sex: this.editedItem.sex,
          time: this.editedItem.time,
          position: this.editedItem.position,
          salary: this.editedItem.salary,
          id: this.editedItem.id,
          typeDc: this.editedItem.typeDc,
          pass: this.editedItem.pass,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (this.editedItem.firstName != null && this.editedItem.lastName != null &&
            this.editedItem.sex != null && this.editedItem.position != null &&
            this.editedItem.id != null && this.editedItem.pass != null) {
          for (let i = 0; i < this.pp.length; i++) {
            if (this.pp[i] === this.editedItem.id) {
              // console.log(this.pp[i] + '===' + this.editedItem.id)
              this.errAdditem = true
            } // console.log(this.pp[i] + '!==' + this.editedItem.id)
          }
          if (this.errAdditem === true) {
            alert('ID ขอพนักงานซ้ำ')
          } else {
            db.collection('dataStaff').doc().set(dataText)
              .then(function () {
                // eslint-disable-next-line no-console
                console.log('Document successfully written! -> dataStaff')
              })
              .catch(function (error) {
                // eslint-disable-next-line no-console
                console.error('Error writing document: ', error)
              })
            if (this.editedItem.firstName != null && this.editedItem.lastName != null &&
            this.editedItem.sex != null && this.editedItem.position != null &&
            this.editedItem.id != null && this.editedItem.pass != null) {
              this.close()
            }
          } this.errAdditem = false
        }
      }
    }
  }
}
</script>
