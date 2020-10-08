<template>
  <v-card>
    <v-card-title>
      Data Staff
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    />
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'ชื่อ',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'นามสกุล', value: 'lastname' },
        { text: 'ตำแหน่งงาน', value: 'jobpo' },
        { text: 'เวลาเข้าทำงาน', value: 'timein' },
        { text: 'เวลาออกงาน', value: 'timeout' },
        { text: 'เงินเดือน', value: 'sum' }
      ],
      desserts: [
        {
          name: 'A',
          lastname: '',
          jobpo: 'พนักงานเคาเตอร์',
          timein: '08.00',
          timeout: '16.00',
          sum: 25000
        },
        {
          name: 'B',
          lastname: '',
          jobpo: 'พนักงานเคาเตอร์',
          timein: '08.00',
          timeout: '16.00',
          sum: 25000
        },
        {
          name: 'C',
          lastname: '',
          jobpo: 'พนักงานผ่าตัด',
          timein: '08.00',
          timeout: '16.00',
          sum: 30000
        },
        {
          name: 'D',
          lastname: '',
          jobpo: 'พนักงานผ่าตัด',
          timein: '08.00',
          timeout: '16.00',
          sum: 30000
        }
      ]
    }
  }
}
</script>
