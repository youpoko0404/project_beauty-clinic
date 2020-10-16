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
                        oninput="this.value = this.value.replace(/[^0-9-]/g, '');"
                        :rules="[v => !!v || 'Password is required']"
                        label="Password *"
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
    <v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            />
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer />
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              />
              <v-spacer />
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.name }}
                </v-card-title>

                <v-divider />

                <v-list dense>
                  <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                  >
                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                      {{ key }}:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }"
                    >
                      <v-rating
                        v-model="item[key.toLowerCase()]"
                        background-color="#eee"
                        color="blue"
                        half-increments
                        hover
                        length="5"
                        readonly
                        size="20"
                        value="0.5"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row
            class="mt-2"
            align="center"
            justify="center"
          >
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer />

            <span
              class="mr-4
            grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: 'name',
    keys: [
      'Item1',
      'Item2',
      'Item3'
    ],
    items: [
      {
        name: 'เสริมจมูก',
        item1: 0,
        Item2: 0,
        Item3: 0
      }
    ],
    sum: '',
    sum2: '',
    sum3: '',
    summit: 0,
    s: 0,
    result1: 0,
    result2: 0,
    result3: 0,
    datass: 0,
    summ1: 0,
    summ2: 0,
    summ3: 0,
    name: 'เสริมจมูก',
    menu2: false,
    modal2: false,
    dialog: false,
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
    getData () {
      db.collection('dataStaff').orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          data.push(doc.data())
        })
        this.dataStaff = data
      })
      db.collection('dataP').onSnapshot((querySnapshot) => {
        const sum = []
        querySnapshot.forEach((doc) => {
          sum.push(doc.data())
          console.log(sum)
        })
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sum > 0) {
            this.result1 += sum[i].sum
          }
        }
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sum2 > 0) {
            this.result2 += sum[i].sum2
          }
        }
        for (let i = 0; i < sum.length; i++) {
          if (sum[i].sum3 > 0) {
            this.result3 += sum[i].sum3
          }
        }
        console.log(this.result1)
        console.log(this.result2)
        console.log(this.result3)
        this.datass = sum.length
        this.items[0].item1 = this.result1 / this.datass
        this.items[0].item2 = this.result2 / this.datass
        this.items[0].item3 = this.result3 / this.datass
        console.log(this.items[0].item1)
        console.log(this.items[0].item2)
        console.log(this.items[0].item3)
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
        if (this.firstName != null && this.lastName != null &&
            this.sex != null && this.position != null &&
            this.id != null && this.pass != null) {
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
      this.close()
    }
  }
}
</script>
