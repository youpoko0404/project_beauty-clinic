<template>
  <v-container>
    <h2>Add Staff</h2>
    <v-container class="m">
      <v-form ref="form">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="firstName"
              :rules="[v => !!v || 'First Name is required',
                       v => (v && v.replace(/[^0-9/*-+.!@#$%&*():}{}<>,]/g, '') < 1) || 'Please enter only characters.',]"
              label="ชื่อ *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="lastName"
              :rules="[v => !!v || 'First Name is required',
                       v => (v && v.replace(/[^0-9/*-+.!@#$%&*():}{}<>,]/g, '') < 1) || 'Please enter only characters.',]"
              label="นามสกุล *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="sex"
              :rules="[v => !!v || 'Sex is required']"
              :items="this.$store.state.sex"
              label="เพศ *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="position"
              :rules="[v => !!v || 'Position is required']"
              :items="this.$store.state.positionStaff"
              label="ตำแหน่ง *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="salary"
              label="เงินเดือน"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="id"
              oninput="this.value = this.value.replace(/[^A-Za-z0-9]/g, '');"
              label="ID *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="pass"
              oninput="this.value = this.value.replace(/[^0-9-]/g, '');"
              label="Password *"
              required
            />
          </v-col>

          <v-btn
            class="mr-4"
            @click="addData"
          >
            submit
          </v-btn>
          <v-btn
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data () {
    return {
      firstName: null,
      lastName: null,
      sex: null,
      position: null,
      salary: 0,
      time: '',
      id: '',
      pass: '',
      positionStaff: [
        'พนักงานเคาเคอร์',
        'แพทย์',
        'ผู้จัดการ'
      ]
    }
  },
  methods: {
    addData () {
      if (this.position === this.positionStaff[0]) {
        this.time = '08:00'
      } else if (this.position === this.positionStaff[1]) {
        this.time = '09:00'
      } else if (this.position === this.positionStaff[2]) {
        this.time = '10:00'
      }
      const dataText = {
        firstName: this.firstName,
        lastName: this.lastName,
        sex: this.sex,
        time: this.time,
        position: this.position,
        salary: this.salary,
        id: this.id,
        pass: this.pass,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
      if (this.firstName != null && this.lastName != null && this.position != null && this.sex != null) {
        db.collection('dataStaff').doc().set(dataText)
          .then(function () {
            // eslint-disable-next-line no-console
            console.log('Document successfully written! -> dataStaff')
          })
          .catch(function (error) {
            // eslint-disable-next-line no-console
            console.error('Error writing document: ', error)
          })
        this.clear()
      } this.$refs.form.validate()
    },
    clear () {
      this.$refs.form.reset()
      this.salary = 0
    },
    reset () {
      this.clear()
    }
  }
}
</script>
