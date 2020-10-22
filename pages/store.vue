<template>
  <v-container>
    <v-form ref="form" v-model="vaild" lazy-validation>
      <v-text-field
        v-model="id"
        type="number"
        label="ID"
        required
      />
      <br>
      <template>
        <v-file-input
          v-model="fileImage"
          accept="image/*"
          label="File input"
        />
      </template>
      <br>
      <v-btn color="success" class="mr-4" @click="submitform">
        Submit
      </v-btn>
    </v-form>
    <br>
    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="value"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>
    <v-btn @click="listFile">
      AA
    </v-btn>
    {{ aa }}
  </v-container>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data () {
    return {
      name: '',
      id: '',
      address: '',
      aa: [],
      vaild: false,
      fileImage: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      value: 0
    }
  },
  methods: {
    listFile () {
      const storageRef = firebase.storage().ref()
      // Create a reference under which you want to list
      const listRef = storageRef.child('images/')
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
          })
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            itemRef.getDownloadURL().then((url) => {
              console.log('url = ' + url)
            })
          })
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error)
        })
    },
    submitform () {
      // เก็บข้อมูล --> cloud storage
      // เก็บไฟล์ --> storage
      // Create a root reference
      const storageRef = firebase.storage().ref()
      // File or Blob named mountains.jpg
      const file = this.fileImage
      // Create the file metadata
      const metadata = {
        contentType: 'image/jpeg'
      }
      // Upload file and metadata to the object 'images/mountains.jpg'
      const uploadTask = storageRef
        .child('images/' + this.id)
        .put(file, metadata)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          this.value = progress
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL)
          })
        }
      )
    }
  }
}
</script>
