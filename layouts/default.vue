<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      color="rgb(247, 206, 169)"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-btn v-if=" this.$store.state.login != ''" block color="#AE5D2A">
        {{ this.$store.state.name }}
      </v-btn>
      <v-btn v-if=" this.$store.state.login != ''" block color="error" @click="signOut">
        Sign Out
      </v-btn>
      <v-list v-if=" this.$store.state.login == 'ผู้จัดการ'">
        <v-list-item
          v-for="(item, i) in items1"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if=" this.$store.state.login == 'พนักงานเคาเคอร์'">
        <v-list-item
          v-for="(item, i) in items2"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if=" this.$store.state.login == 'แพทย์'">
        <v-list-item
          v-for="(item, i) in items3"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if=" this.$store.state.login == 'admin'">
        <v-list-item
          v-for="(item, i) in items4"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="rgb(247, 206, 169)"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <body>
        <v-container>
          <nuxt />
        </v-container>
      </body>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items1: [ // manager
        {
          icon: 'mdi-account-details',
          title: 'ข้อมูลลูกค้า',
          to: '/datamemberAdmin'
        },
        {
          icon: 'mdi-badge-account-horizontal',
          title: 'ข้อมูลพนักงาน',
          to: '/datastaff'
        },
        {
          icon: 'mdi-chart-line',
          title: 'ข้อมูลค่าใช้จ่าย',
          to: '/datasum'
        }
      ],
      items2: [ // couter
        {
          icon: 'mdi-braille',
          title: 'ประเภทศัลยกรรม',
          to: '/classifly'
        },
        {
          icon: 'mdi-calendar-edit',
          title: 'นัดวันทำศัลยกรรม',
          to: '/appointment'
        },
        {
          icon: 'mdi-calculator-variant',
          title: 'สรุปค่าใช้จ่าย',
          to: '/summary'
        },
        {
          icon: 'mdi-account-details',
          title: 'ข้อมูลลูกค้า',
          to: '/datamember'
        }
      ],
      items3: [ // doctor
        {
          icon: 'mdi-comment-text',
          title: 'บันทึกให้คำแนะนำ',
          to: '/advice'
        },
        {
          icon: 'mdi-calendar-edit',
          title: 'นัดวันทำศัลยกรรม',
          to: '/appointment'
        }
      ],
      items4: [
        {
          icon: 'mdi-braille',
          title: 'ประเภทศัลยกรรม',
          to: '/classifly'
        },
        {
          icon: 'mdi-comment-text',
          title: 'บันทึกให้คำแนะนำ',
          to: '/advice'
        },
        {
          icon: 'mdi-calendar-edit',
          title: 'นัดวันทำศัลยกรรม',
          to: '/appointment'
        },
        {
          icon: 'mdi-calculator-variant',
          title: 'สรุปค่าใช้จ่าย',
          to: '/summary'
        },
        {
          icon: 'mdi-account-details',
          title: 'ข้อมูลลูกค้า',
          to: '/datamember'
        },
        {
          icon: 'mdi-badge-account-horizontal',
          title: 'ข้อมูลพนักงาน',
          to: '/datastaff'
        },
        {
          icon: 'mdi-chart-line',
          title: 'ข้อมูลค่าใช้จ่าย',
          to: '/datasum'
        }
        // {
        //   icon: 'mdi-chart-line',
        //   title: 'ประเมิน',
        //   to: '/satisfaction'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Chiang Mai Clinic',
      datas: '',
      position: '',
      a: false
    }
  },
  methods: {
    addZero (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    signOut () {
      const dataText = {
        logout: (new Date().getHours()) + ':' + this.addZero(new Date().getMinutes()) + ':' + this.addZero(new Date().getSeconds())
      }
      db.collection('dataStaff').where('id', '==', this.$store.state.id)
        .onSnapshot((querySnapshot) => {
          const p = []
          const position = []
          querySnapshot.forEach((doc) => {
            p.push(doc.id)
            position.push(doc.data().position)
          })
          this.datas = p.toString()
          this.position = position.toString()
          if (this.a === false) {
            if (this.$store.state.login !== '') {
              // console.log(dataText.logout)
              if (this.position !== 'admin') {
                db.collection('dataStaff').doc(this.datas).update(dataText)
              }
              this.$router.replace('/')
              this.$store.commit('login', '')
              this.$store.commit('name', '')
              this.$store.commit('id', '')
              this.a = true
            }
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
