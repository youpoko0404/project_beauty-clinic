<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Appointment
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
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.appointment"
                              label="Picker without buttons"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.appointment"
                            @input="menu1 = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
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
                              label="Picker in menu"
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
                        md="4"
                      >
                        <v-select
                          v-model="editedItem.staff"
                          :rules="[v => !!v || 'Name Doctor is required']"
                          :items="staffitem"
                          label="Name Doctor"
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
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
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
    menu: false,
    modal: false,
    menu1: false,
    menu2: false,
    modal2: false,
    dialog: false,
    dialogDelete: false,
    dataTable: [],
    datas: '',
    searchInput: '',
    indexfirstNameEdit: '',
    indexlastNameEdit: '',
    indextypeEdit: '',
    indexAppEdit: '',
    staffitem: [],
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName'
      },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Type', value: 'type' },
      { text: 'Appointment', value: 'appointment' },
      { text: 'Time', value: 'time' },
      { text: 'Name Docter', value: 'staff' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      sex: '',
      time: '',
      staff: '',
      appointment: new Date().toISOString().substr(0, 10)
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      sex: '',
      time: '',
      staff: '',
      appointment: ''
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
      db.collection('dataStaff').where('position', '==', 'แพทย์')
        .onSnapshot((querySnapshot) => {
          const staff = []
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            staff.push(doc.data().firstName)
          })
          this.staffitem = staff
        })
    },
    editItem (item) {
      this.editedIndex = this.dataTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        this.indexfirstNameEdit = (this.dataTable[this.editedIndex].firstName)
        this.indexlastNameEdit = (this.dataTable[this.editedIndex].lastName)
        this.indexAppEdit = (this.dataTable[this.editedIndex].appointment)
        this.indextypeEdit = (this.dataTable[this.editedIndex].type)
        this.indexEdit = (this.dataTable[this.editedIndex], this.editedItem)
        db.collection('dataMember')
          .where('firstName', '==', this.indexfirstNameEdit)
          .where('lastName', '==', this.indexlastNameEdit)
          .where('type', '==', this.indextypeEdit)
          .where('appointment', '==', this.indexAppEdit)
          .orderBy('timestamp').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const p = []
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
