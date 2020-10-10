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
            <v-text-field
              v-model="time"
              oninput="this.value = this.value.replace(/[^0-9]/g, '');"
              label="เวลาเข้างาน"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="position"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              :rules="[v => !!v || 'Height is required']"
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
          <nuxt-link to="/datastaff">
            <v-btn
              class="mr-4"
              @click="addData"
            >
              submit
            </v-btn>
          </nuxt-link>
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
      time: null,
      position: null,
      salary: 0
    }
  },
  clear () {
    this.$refs.form.reset()
  },
  methods: {
    addData () {
      const dataText = {
        firstName: this.firstName,
        lastName: this.lastName,
        time: this.time,
        position: this.position,
        salary: this.salary,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
      if (this.firstName != null && this.lastName != null && this.position != null) {
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
    },
    reset () {
      this.clear()
    }
  }
}
</script>
