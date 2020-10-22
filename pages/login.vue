<template>
  <div>
    <v-btn color="info" class="mr-4" @click="loginGoogle">
      Google
    </v-btn>
    <v-col cols="5">
      <v-text-field
        v-model="textSearch"
        label="Serach"
        :rules="rules"
        hide-details="auto"
        color="red darken-1"
      />
    </v-col>
    <div v-for="(item,key) in textList" :key="key" class="pa-2" outlined tile>
      {{ item.firstName }} : {{ item.price }}
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data () {
    return {
      textList: [],
      textSearch: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      db.collection('dataMember').where('firstName', '==', this.textSearch).orderBy('timestamp').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.textList = data
      })
    },
    loginGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          // The signed-in user info.
          const user = result.user
          // ...
          console.log('token : ' + token)
          console.log('user : ' + user)
          this.$router.replace('/classifly')
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
          // ...
          console.log('errorCode= ' + errorCode)
          console.log('errorMessage= ' + errorMessage)
          console.log('email= ' + email)
          console.log('credential' + credential)
        })
    }
  }
}

</script>

<style>

</style>
