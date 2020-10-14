<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="10"
      label="Usname"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      required
    />

    <v-btn
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>
  </v-form>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    datas: '',
    username: '',
    password: '',
    staffitem: '',
    namestaff: ''
  }),

  methods: {
    validate () {
      db.collection('dataStaff').where('id', '==', this.username).where('pass', '==', this.password)
        .onSnapshot((querySnapshot) => {
          const staff = []
          const p = []
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            staff.push(doc.data().position)
            this.staffitem = staff.toString()
            p.push(doc.id)
            this.datas = p.toString()
          })
          console.log(this.staffitem)
          if (this.staffitem != null) {
            this.$store.commit('login', this.staffitem)
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
