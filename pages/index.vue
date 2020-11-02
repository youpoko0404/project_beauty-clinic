<template>
  <v-app dark>
    <v-main>
      <body>
        <v-container>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-row justify="center" class="mt-6">
              <v-img
                class="mt-16"
                src="/logo_login.png"
                max-width="600"
                max-height="400"
              />
            </v-row>
            <v-row justify="center">
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                  oninput="this.value = this.value.replace(/[^A-Za-z0-9]/g, '')"
                  :rules="[v => !!v || 'Username is required']"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="12"
                md="6"
              >
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
      </body>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'print',
  data: () => ({
    datas: '',
    username: '',
    password: '',
    staffitem: '',
    namestaff: '',
    show1: false,
    id: '',
    ids: '',
    a: false
  }),
  methods: {
    addZero (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    login () {
      console.log('verison 2.0')
      db.collection('dataStaff').where('id', '==', this.username).where('pass', '==', this.password)
        .onSnapshot((querySnapshot) => {
          const staff = []
          const name = []
          const id = []
          const p = []
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data())
            staff.push(doc.data().position)
            name.push(doc.data().firstName)
            id.push(doc.data().id)
            p.push(doc.id)
          })
          this.staffitem = staff.toString()
          this.datas = name.toString()
          this.id = id.toString()
          this.ids = p.toString()
          // console.log(this.staffitem)
          const dataText = {
            login: (new Date().getHours()) + ':' + this.addZero(new Date().getMinutes()) + ':' + this.addZero(new Date().getSeconds()),
            logout: null,
            date: ((new Date()).getFullYear()) + '-' + ((new Date()).getMonth() + 1) + '-' + ((new Date()).getDate())
          }
          if (this.staffitem !== '') {
            if (this.a === false) {
              // console.log(dataText.login)
              if (this.staffitem !== 'admin') {
                db.collection('dataStaff').doc(this.ids).update(dataText)
              }
              this.$store.commit('login', this.staffitem)
              this.$store.commit('name', this.datas)
              this.$store.commit('id', this.id)
              this.a = true
            }
            if (this.staffitem === 'ผู้จัดการ') {
              this.$router.push('/datamemberAdmin')
            } else if (this.staffitem === 'พนักงานเคาเคอร์') {
              this.$router.push('/classifly')
            } else if (this.staffitem === 'แพทย์') {
              this.$router.push('/advice')
            } else if (this.staffitem === 'admin') {
              this.$router.push('/classifly')
            }
          } else if (this.staffitem === '') {
            alert('รหัสผ่านผิด')
            this.$refs.form.reset()
          }
        })
    }
  }
}
</script>
<style>
body{
  background: rgb(251, 237, 224);
  color: rgba(0, 0, 0, 0.87);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
</style>
