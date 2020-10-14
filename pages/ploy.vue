<template>
  <div>
    <h1 align="center">
      PAYMENT
    </h1>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Bank"
              required
            />
            <v-text-field
              ref="Numberorder"
              v-model="Numberorder"
              :rules="[() => !!Numberorder || 'This field is required']"
              :error-messages="errorMessages"
              label="Number Order"
              placeholder=""
              required
            />
            <v-text-field
              ref="Paymentamount"
              v-model="Paymentamount"
              label="Payment amount"
              placeholder=""
              required
            />
            <v-text-field
              ref="Transfertime"
              v-model="Transfertime"
              label="Transfer Time (EX. 09.50)"
              placeholder=""
              required
            />
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an slip"
              prepend-icon="mdi-camera"
              label="Proof of payment"
            />
          </v-card-text>
          <v-divider class="mt-12" />
          <v-card-actions>
            <nuxt-link to="/wine">
              <v-btn text>
                Cancel
              </v-btn>
            </nuxt-link>
            <v-spacer />
            <v-btn color="primary" text @click="submit">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    select: null,
    items: [
      'ธนาคารไทยพาณิชย์  [6104101340] ชื่อบัญชี ธวัชชัย ไถหว่าน',
      'ธนาคารกสิกร  [6104101393] ชื่อบัญชี สุชานันท์ วรรณภิญโญ',
      'ธนาคารกรุงไทย  [6104101397] ชื่อบัญชี สุพิชญา แก้วสุดใจ',
      'ธนาคารออมสิน [6104101396] ชื่อบัญชี สุธิดา ยานะโส',
      'ธนาคารกรุงศรี  [6104101315] ชื่อบัญชี ชนะพล รัตนพงค์'
    ]
  }),
  methods: {
    submit () {
      const dataText = {
        select: this.select,
        Numberorder: this.Numberorder,
        Paymentamount: this.Paymentamount,
        Transfertime: this.Transfertime,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
      db.collection('dataY').doc().set(dataText)
        .then(function () {
          // eslint-disable-next-line no-console
          console.log('Document successfully written! -> dataTable')
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>
