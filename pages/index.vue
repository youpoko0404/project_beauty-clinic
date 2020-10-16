<template>
  <v-container>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            v-model="username"
            :counter="10"
            label="Usname"
            required
            oninput="this.value = this.value.replace(/[^A-Za-z0-9]/g, '')"
            :rules="[v => !!v || 'Username is required']"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            :rules="[v => !!v || 'Password is required']"
            label="Password"
            @click:append="show1 = !show1"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-btn
        color="success"
        class="mr-4"
        @click="login"
      >
        LOGIN
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    show1: false,
    datas: '',
    username: '',
    password: '',
    staffitem: null,
    namestaff: ''
  }),
  methods: {
    login () {
      db.collection('dataStaff').where('id', '==', this.username).where('pass', '==', this.password)
        .onSnapshot((querySnapshot) => {
          const staff = []
          const p = []
          const namestaff = []
          querySnapshot.forEach((doc) => {
            staff.push(doc.data().position)
            this.staffitem = staff.toString()
            p.push(doc.id)
            this.datas = p.toString()
            namestaff.push(doc.data().firstName)
            this.namestaff = namestaff.toString()
          })
          if (this.staffitem != null) {
            const data = {
              username: this.username,
              password: this.password,
              position: this.staffitem,
              namestaff: this.namestaff,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
            db.collection('log').doc('login').set(data)
            if (this.staffitem === 'ผู้จัดการ') {
              this.$router.push('/datamemberAdmin')
            } else if (this.staffitem === 'พนักงานเคาเคอร์') {
              this.$router.push('/classifly')
            } else if (this.staffitem === 'แพทย์') {
              this.$router.push('/advice')
            } else if (this.staffitem === 'admin') {
              this.$router.push('/classifly')
            }
          } else if (this.staffitem == null) {
            this.$refs.form.validate()
            this.username = ''
            this.password = ''
          }
        })
    }
  }
}
</script>
