<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dataStaff"
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
                class="mb-2"
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
                        label="firstName"
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
                        label="lastName"
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
                        label="ตำแหน่ง *"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.salary"
                        label="salary"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
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
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        v-model="type"
        :items="this.$store.state.type"
        label="Sex *"
        required
      />
    </v-col>
    <v-btn @click="ratData">
      WW
    </v-btn>
    <v-rating
      v-model="sumDc.sumDc1"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumDc.sumDc2"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumDc.sumDc3"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <hr>
    <v-rating
      v-model="sumCt.sumCt1"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumCt.sumCt2"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumCt.sumCt3"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <hr>
    <v-rating
      v-model="sumOw.sumOw1"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumOw.sumOw2"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
    <v-rating
      v-model="sumOw.sumOw3"
      background-color="indigo lighten-3"
      color="indigo"
      size="64"
      readonly
      half-increments
    />
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
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
    menu2: false,
    modal2: false,
    dialog: false,
    show1: true,
    dialogDelete: false,
    dataStaff: [],
    datas: '',
    indexfirstNameEdit: '',
    indexlastNameEdit: '',
    indextypeEdit: '',
    indexTimeEdit: '',
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
      { text: 'Salary', value: 'salary' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    headers2: [
      { text: '1', value: 'sum' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
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
    editedItem: {
      firstName: null,
      lastName: null,
      time: null,
      position: null,
      id: null,
      pass: null,
      salary: 0
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      time: null,
      position: '',
      id: '',
      pass: '',
      salary: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add STAFF' : 'Edit Item'
    },
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
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
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
    },
    formerPage () {
      if (this.page - 1 >= 1) { this.page -= 1 }
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    ratData () {
      db.collection('dataRate').where('types', '==', this.type).onSnapshot((querySnapshot) => { // หมอ
        const sum = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data().sumDc)
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
        querySnapshot.forEach((doc) => {
          sum.push(doc.data())
        })
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
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
        })
        this.dataStaff = data
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
      if (this.editedItem.position === this.positionStaff[0]) {
        this.editedItem.time = '08:00'
      } else if (this.editedItem.position === this.positionStaff[1]) {
        this.editedItem.time = '09:00'
      } else if (this.editedItem.position === this.positionStaff[2]) {
        this.editedItem.time = '10:00'
      }
      if (this.editedIndex > -1) {
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
              db.collection('dataStaff').doc(this.datas).update(this.indexEdit)
            })
          })
      } else {
        if (this.editedItem.position === this.positionStaff[0]) {
          this.editedItem.time = '08:00'
        } else if (this.editedItem.position === this.positionStaff[1]) {
          this.editedItem.time = '09:00'
        } else if (this.editedItem.position === this.positionStaff[2]) {
          this.editedItem.time = '10:00'
        }
        const dataText = {
          firstName: this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          sex: this.editedItem.sex,
          time: this.editedItem.time,
          position: this.editedItem.position,
          salary: this.editedItem.salary,
          id: this.editedItem.id,
          pass: this.editedItem.pass,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (this.editedItem.firstName != null && this.editedItem.lastName != null &&
            this.editedItem.sex != null && this.editedItem.position != null &&
            this.editedItem.id != null && this.editedItem.pass != null) {
          db.collection('dataStaff').doc().set(dataText)
            .then(function () {
            // eslint-disable-next-line no-console
              console.log('Document successfully written! -> dataStaff')
            })
            .catch(function (error) {
            // eslint-disable-next-line no-console
              console.error('Error writing document: ', error)
            })
        }
      }
      if (this.editedItem.firstName != null && this.editedItem.lastName != null &&
            this.editedItem.sex != null && this.editedItem.position != null &&
            this.editedItem.id != null && this.editedItem.pass != null) {
        this.close()
      }
    }
  }
}
</script>
