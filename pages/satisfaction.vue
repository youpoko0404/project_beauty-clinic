<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <v-form ref="form">
          <v-container>
            <v-col
              cols="12"
              md="2"
            >
              <v-select
                v-model="types"
                :items="this.$store.state.type"
                label="Type *"
                :rules="[v => !!v || 'Type is required']"
                required
              />
            </v-col>
            <v-radio-group
              v-model="sumDc.sumDc1"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumDc.sumDc2"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumDc.sumDc3"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
          </v-container>
          <v-container>
            <v-radio-group
              v-model="sumCt.sumCt1"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumCt.sumCt2"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumCt.sumCt3"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
          </v-container>
          <v-container>
            <v-radio-group
              v-model="sumOw.sumOw1"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumOw.sumOw2"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
            <v-radio-group
              v-model="sumOw.sumOw3"
              row
            >
              <v-radio
                label="5"
                value="5"
              />
              <v-radio
                label="4"
                value="4"
              />
              <v-radio
                label="3"
                value="3"
              />
              <v-radio
                label="2"
                value="2"
              />
              <v-radio
                label="1"
                value="1"
              />
            </v-radio-group>
          </v-container>
        </v-form>
        <button @click="addData">
          Submit
        </button>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'print',
  data () {
    return {
      types: null,
      sumDc: {
        sumDc1: null,
        sumDc2: null,
        sumDc3: null
      },
      sumCt: {
        sumCt1: null,
        sumCt2: null,
        sumCt3: null
      },
      sumOw: {
        sumOw1: null,
        sumOw2: null,
        sumOw3: null
      }
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    addData () {
      const dataText = {
        types: this.types,
        sumDc: {
          sumDc1: parseInt(this.sumDc.sumDc1),
          sumDc2: parseInt(this.sumDc.sumDc2),
          sumDc3: parseInt(this.sumDc.sumDc3)
        },
        sumCt: {
          sumCt1: parseInt(this.sumCt.sumCt1),
          sumCt2: parseInt(this.sumCt.sumCt2),
          sumCt3: parseInt(this.sumCt.sumCt3)
        },
        sumOw: {
          sumOw1: parseInt(this.sumOw.sumOw1),
          sumOw2: parseInt(this.sumOw.sumOw2),
          sumOw3: parseInt(this.sumOw.sumOw3)
        }
      }
      if (this.types != null && this.sumDc.sumDc1 != null && this.sumDc.sumDc2 != null && this.sumDc.sumDc3 != null &&
        this.sumCt.sumCt1 != null && this.sumCt.sumCt2 != null && this.sumCt.sumCt3 != null &&
        this.sumOw.sumOw1 != null && this.sumOw.sumOw2 != null && this.sumOw.sumOw3 != null) {
        db.collection('dataRate').doc().set(dataText)
          .then(function () {
          // eslint-disable-next-line no-console
            console.log('Document successfully written! -> dataMember')
          })
          .catch(function (error) {
          // eslint-disable-next-line no-console
            console.error('Error writing document: ', error)
          })
        alert('ขอบคุณสำหรับการประเมิน')
        this.clear()
      } else {
        alert('โปรดประเมินให้ครบทุกช่อง')
        this.$refs.form.validate()
      }
    }
  }
}
</script>
