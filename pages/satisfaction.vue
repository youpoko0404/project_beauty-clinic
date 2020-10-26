<template>
  <v-app dark>
    <v-main>
      <v-container class="col-md-7">
        <v-row justify="center" class="mt-5">
          <h4>แบบประเมินความพึงพอใจ</h4>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="types"
              :items="this.$store.state.type"
              label="รายการที่ทำ *"
              :rules="[v => !!v || 'Type is required']"
              required
            />
          </v-col>
        </v-row>
        <v-form ref="form">
          <v-row justify="center">
            <v-col
              offset-sm="12"
              md="9"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        รายการ (แพทย์)
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. มนุษย์สัมพันธ์กับผู้ป่วยและญาติผู้ป่วย</td>
                      <td>
                        <v-row justify-sm="end" align="center">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>2. การดูแลรักษาและติดตามอาการผู้ป่วย</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>3. เปิดโอกาสให้ผู้ป่วยและครอบครัวซักถามเพื่อความเข้าใจ</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="12"
              md="9"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        รายการ (เคาท์เตอร์)
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. ความเหมาะสมในด้านคำพูด</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>2. พนักงานมีประติสัมพันธ์ที่ดีกับลูกค้า</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>3. พนักงานอธิบายรายละเอียดได้เข้าใจและครบถ้วน</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="12"
              md="9"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        รายการ (ภาพรวม)
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. ความสะอาดของสถานที่ และสิ่งแวดล้อม</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>2. คุณภาพและความทันสมัยของอุปกรณ์/เครื่องมือ</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                    <tr>
                      <td>3. การจัดสถานที่สะดวกในการเข้ารับบริการ</td>
                      <td>
                        <v-row justify="end">
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
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="12"
              md="8"
            >
              <v-textarea
                v-model="owComment"
                label="ข้อเสนอแนะ"
                required
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn color="primary" @click="addData">
              ส่งแบบประเมิน
            </v-btn>
          </v-row>
        </v-form>
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
      owComment: '',
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
      this.owComment = ''
      this.types = null
    },
    addData () {
      const dataText = {
        types: this.types,
        owComment: this.owComment,
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
