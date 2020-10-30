<template>
  <v-container>
    <h2>การเสริมหน้าอก</h2>
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
              label="First Name *"
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
              label="Last name *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="age"
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
              v-model="height"
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
              v-model="weight"
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
              v-model="phone"
              oninput="this.value = this.value.replace(/[^0-9-]/g, '');"
              :rules="[
                v => !!v || 'Phone is required',]"
              label="Phone number *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-select
              v-model="sex"
              :rules="[v => !!v || 'Sex is required']"
              :items="this.$store.state.sex"
              label="Sex *"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              ref="other"
              v-model="other"
              label="Other"
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
      age: null,
      height: null,
      weight: null,
      phone: null,
      type: 'การเสริมหน้าอก',
      sex: null,
      other: '',
      advive: '',
      price: 0,
      appointment: ''
    }
  },
  clear () {
    this.$refs.form.reset()
    this.email = ''
    this.other = ''
  },
  created () {
    this.loginFirst()
  },
  methods: {
    loginFirst () {
      if (this.$store.state.login === '') {
        this.$router.replace('/')
      }
    },
    addData () {
      const dataText = {
        type: this.type,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        height: this.height,
        weight: this.weight,
        phone: this.phone,
        sex: this.sex,
        other: this.other,
        advive: this.advive,
        price: this.price,
        appointment: this.appointment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
      if (this.firstName != null && this.lastName != null &&
      this.age != null && this.height != null &&
      this.weight != null && this.phone != null && this.sex != null) {
        db.collection('dataMember').doc().set(dataText)
          .then(function () {
            // eslint-disable-next-line no-console
            console.log('Document successfully written! -> dataTable')
          })
          .catch(function (error) {
            // eslint-disable-next-line no-console
            console.error('Error writing document: ', error)
          })
        this.$router.replace('/classifly')
      } this.$refs.form.validate()
    },
    clear () {
      this.$refs.form.reset()
      this.email = ''
      this.other = ''
    },
    reset () {
      this.clear()
    }
  }
}
</script>
