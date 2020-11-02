<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Advice
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
                        <v-textarea
                          v-model="editedItem.advive"
                          label="Advive"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="editedItem.staff"
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
              class="ml-3"
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
    dialog: false,
    dialogDelete: false,
    dataTable: [],
    staffitem: [],
    datas: '',
    searchInput: '',
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
      { text: 'Type', value: 'type' },
      { text: 'Sex', value: 'sex' },
      { text: 'Other', value: 'other' },
      { text: 'Advice', value: 'advive' },
      { text: 'Name Docter', value: 'staff' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      type: '',
      sex: '',
      other: '',
      staff: '',
      advive: ''
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      type: '',
      sex: '',
      other: '',
      staff: '',
      advive: ''
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
          // console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
        })
        this.dataTable = data
      })
      db.collection('dataStaff').orderBy('timestamp').where('position', '==', 'แพทย์')
        .onSnapshot((querySnapshot) => {
          const staff = []
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data())
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
        this.indextypeEdit = (this.dataTable[this.editedIndex].type)
        this.indexEdit = (this.dataTable[this.editedIndex], this.editedItem)
        db.collection('dataMember')
          .where('firstName', '==', this.indexfirstNameEdit)
          .where('lastName', '==', this.indexlastNameEdit)
          .where('type', '==', this.indextypeEdit)
          .orderBy('timestamp').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const p = []
              // console.log(doc.id)
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
