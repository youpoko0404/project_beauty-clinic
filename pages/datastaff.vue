<template>
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
        <nuxt-link to="/addStaff">
          <v-btn
            color="primary"
            dark
            class="mb-2"
          >
            New STAFF
          </v-btn>
        </nuxt-link>

        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
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
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.time"
                      label="time"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.position"
                      label="position"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.salary"
                      label="salary"
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
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dataStaff: [],
    datas: '',
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
      { text: 'Time', value: 'time' },
      { text: 'Position', value: 'position' },
      { text: 'Salary', value: 'salary' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      time: '',
      position: '',
      salary: 0
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      time: '',
      position: '',
      salary: 0
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
  },

  methods: {
    getData () {
      db.collection('dataStaff').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
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
      this.indexEdit = (this.dataStaff[this.editedIndex], this.editedItem)
      db.collection('dataStaff')
        .where('firstName', '==', this.indexfirstNameEdit)
        .where('lastName', '==', this.indexlastNameEdit)
        .where('position', '==', this.indextypeEdit)
        .orderBy('timestamp').onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const p = []
            console.log(doc.id)
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
        this.indexfirstNameEdit = (this.dataStaff[this.editedIndex].firstName)
        this.indexlastNameEdit = (this.dataStaff[this.editedIndex].lastName)
        this.indextypeEdit = (this.dataStaff[this.editedIndex].position)
        this.indexEdit = (this.dataStaff[this.editedIndex], this.editedItem)
        db.collection('dataStaff')
          .where('firstName', '==', this.indexfirstNameEdit)
          .where('lastName', '==', this.indexlastNameEdit)
          .where('position', '==', this.indextypeEdit)
          .orderBy('timestamp').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const p = []
              console.log(doc.id)
              p.push(doc.id)
              this.datas = p.toString()
              db.collection('dataStaff').doc(this.datas).update(this.indexEdit)
            })
          })
      }
      this.close()
    }
  }
}
</script>
