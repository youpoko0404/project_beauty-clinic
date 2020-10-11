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
              ref="dialog"
              v-model="dialog"
              persistent
              width="290px"
            >
              <v-date-picker
                v-model="editedItem.appointment"
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="save"
                >
                  OK
                </v-btn>
              </v-date-picker>
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
    modal: false,
    dialog: false,
    dialogDelete: false,
    dataTable: [],
    datas: '',
    searchInput: '',
    indexfirstNameEdit: '',
    indexlastNameEdit: '',
    indextypeEdit: '',
    indexAppEdit: '',
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName'
      },
      { text: 'List Name', value: 'lastName' },
      { text: 'Type', value: 'type' },
      { text: 'Appointment', value: 'appointment' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      sex: '',
      appointment: new Date().toISOString().substr(0, 10)
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      sex: '',
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
  },

  methods: {
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
