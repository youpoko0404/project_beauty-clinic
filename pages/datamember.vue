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
        >
          <template v-slot:top>
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
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.firstName"
                          :rules="[v => !!v || 'First Name is required',
                                   v => (v && v.replace(/[^0-9/*-+.!@#$%&*():}{}<>,]/g, '') < 1) || 'Please enter only characters.',]"
                          label="First Name *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.lastName"
                          :rules="[v => !!v || 'First Name is required',
                                   v => (v && v.replace(/[^0-9/*-+.!@#$%&*():}{}<>,]/g, '') < 1) || 'Please enter only characters.',]"
                          label="Last name *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          v-model="editedItem.age"
                          oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                          :rules="[v => !!v || 'Age is required']"
                          label="Age *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          v-model="editedItem.height"
                          oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                          :rules="[v => !!v || 'Height is required']"
                          label="Height (cm) *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          v-model="editedItem.weight"
                          oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                          :rules="[v => !!v || 'Weight is required']"
                          label="Weight (Kg) *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          v-model="editedItem.phone"
                          oninput="this.value = this.value.replace(/[^0-9-]/g, '');"
                          :rules="[
                            v => !!v || 'Phone is required',]"
                          label="Phone number *"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-select
                          ref="email"
                          v-model="editedItem.type"
                          :items="type"
                          label="Types"
                          :rules="[ v => /.+@.+\..+/.test(v) || 'Types must be valid']"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                      >
                        <v-textarea
                          ref="other"
                          v-model="editedItem.other"
                          label="Other"
                          required
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
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dataTable: [],
    datas: '',
    searchInput: '',
    type: ['การฉีดโบท็อก', 'การเสริมหน้าอก', 'การเสริมคาง', 'การทำตา', 'การตกแต่งริมฝีปาก', 'การเสริมจมูก'],
    indexfirstNameEdit: '',
    indexlastNameEdit: '',
    indextypeEdit: '',
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
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      age: '',
      height: '',
      weight: '',
      phone: '',
      type: '',
      sex: '',
      other: '',
      appointment: '',
      price: 0
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      age: '',
      height: '',
      weight: '',
      phone: '',
      type: '',
      sex: '',
      other: '',
      appointment: '',
      price: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    getData () {
      db.collection('dataMember').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
        })
        this.dataTable = data
      })
    },
    editItem (item) {
      this.editedIndex = this.dataTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.dataTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.dataTable.splice(this.editedIndex, -1)
      this.indexfirstNameEdit = (this.dataTable[this.editedIndex].firstName)
      this.indexlastNameEdit = (this.dataTable[this.editedIndex].lastName)
      this.indextypeEdit = (this.dataTable[this.editedIndex].type)
      this.indexEdit = (this.dataTable[this.editedIndex], this.editedItem)
      db.collection('dataMember')
        .where('firstName', '==', this.indexfirstNameEdit)
        .where('lastName', '==', this.indexlastNameEdit)
        .where('type', '==', this.indextypeEdit)
        .orderBy('timestamp').onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const p = []
            console.log(doc.id)
            p.push(doc.id)
            this.datas = p.toString()
            db.collection('dataMember').doc(this.datas).delete()
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
        this.indexfirstNameEdit = (this.dataTable[this.editedIndex].firstName)
        this.indexlastNameEdit = (this.dataTable[this.editedIndex].lastName)
        this.indextypeEdit = (this.dataTable[this.editedIndex].type)
        this.indexEdit = (this.dataTable[this.editedIndex], this.editedItem)
        db.collection('dataMember')
          .where('firstName', '==', this.indexfirstNameEdit)
          .where('lastName', '==', this.indexlastNameEdit)
          .where('type', '==', this.indextypeEdit)
          .orderBy('timestamp').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const p = []
              console.log(doc.id)
              p.push(doc.id)
              this.datas = p.toString()
              db.collection('dataMember').doc(this.datas).update(this.indexEdit)
            })
          })
      }
      this.close()
    }
  }
}
</script>
