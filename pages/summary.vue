<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Summary
          <v-spacer />
          <nuxt-link to="/print" class="mr-3 mt-4" target="_blank" style="text-decoration: none">
            <v-btn color="blue">
              Print
            </v-btn>
          </nuxt-link>
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
                      <v-col>
                        <v-text-field
                          v-model="editedItem.price"
                          oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                          :rules="[
                            v => !!v || 'Price is required',]"
                          label="Price *"
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
    dialog: false,
    dialogDelete: false,
    dataTable: [],
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
      { text: 'List Name', value: 'lastName' },
      { text: 'Type', value: 'type' },
      { text: 'Advive', value: 'advive' },
      { text: 'Price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      sex: '',
      other: '',
      price: ''
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      sex: '',
      other: '',
      price: ''
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
