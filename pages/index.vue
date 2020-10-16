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
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    datas: '',
    username: '',
    password: '',
    staffitem: '',
    namestaff: '',
    show1: false
  }),
  methods: {
    login () {
      db.collection('dataStaff').where('id', '==', this.username).where('pass', '==', this.password)
        .onSnapshot((querySnapshot) => {
          const staff = []
          const name = []
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            staff.push(doc.data().position)
            this.staffitem = staff.toString()
            name.push(doc.data().firstName)
            this.datas = name.toString()
          })
          console.log(this.staffitem)
          if (this.staffitem != null) {
            this.$store.commit('login', this.staffitem)
            this.$store.commit('name', this.datas)
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
            this.$refs.form.reset()
          }
        })
    }
  }
}
</script>
