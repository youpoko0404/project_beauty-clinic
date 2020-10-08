<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          Appointment
          <v-spacer />
          <v-text-field
            v-model="defaultItem.search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="defaultItem.search"
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
              max-width="500px"
            >
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.appointment"
                          label="Appointment"
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
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName'
      },
      { text: 'List Name', value: 'lastName' },
      { text: 'Type', value: 'type' },
      { text: 'Other', value: 'other' },
      { text: 'Appointment', value: 'appointment' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      type: '',
      other: '',
      appointment: ''
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      type: '',
      other: '',
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
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          firstName: 'งง',
          lastName: 'เหมือนกัน',
          age: '20',
          height: '170',
          weight: '53',
          phone: '',
          email: '',
          type: 'การเสริมจมูก',
          sex: 'ชาย',
          other: '',
          advive: '',
          appointment: '9/10/63'
        },
        {
          firstName: 'ทำอะไร',
          lastName: 'ไม่รู้',
          age: '60',
          height: '180',
          weight: '53',
          phone: '',
          email: '',
          type: 'การเสริมคาง',
          sex: 'ชาย',
          other: '',
          advive: '',
          appointment: '10/10/63'
        },
        {
          firstName: 'โอ',
          lastName: 'กาศ',
          age: '60',
          height: '170',
          weight: '60',
          phone: '',
          email: '',
          type: 'ตกแต่งริมฝีปาก',
          sex: 'ชาย',
          other: '',
          advive: '',
          appointment: '11/10/63'
        },
        {
          firstName: 'ลุง',
          lastName: 'พล',
          age: '56',
          height: '170',
          weight: '70',
          phone: '',
          email: '',
          type: 'การทำตา',
          sex: 'ชาย',
          other: '',
          advive: '',
          appointment: '12/10/63'
        },
        {
          firstName: 'ป้า',
          lastName: 'แต๋น',
          age: '50',
          height: '150',
          weight: '50',
          phone: '',
          email: '',
          type: 'การฉีดโบทอก',
          sex: 'หญิง',
          other: '',
          advive: '',
          appointment: '13/10/63'
        },
        {
          firstName: 'ลุงตู่',
          lastName: 'จันโอชา',
          age: '57',
          height: '168',
          weight: '13',
          phone: '',
          email: '',
          type: 'เสริมหน้าอก',
          sex: 'ชาย',
          other: '',
          advive: '',
          appointment: '14/10/63'
        },
        {
          firstName: 'ลาบ',
          lastName: 'ก้อย',
          age: '30',
          height: '190',
          weight: '60',
          phone: '',
          email: '',
          type: 'การทำตา',
          sex: 'หญิง',
          other: '',
          advive: '',
          appointment: '15/10/63'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }

  }
}
</script>
