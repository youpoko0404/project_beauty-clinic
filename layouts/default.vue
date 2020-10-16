<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-btn v-if=" textList != ''" block color="blue">
        {{ po }}
      </v-btn>
      <v-list v-if=" textList == ''">
        <v-list-item
          v-for="(item, i) in itemslogin"
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
      <v-btn v-if=" textList != ''" block color="error" @click="signOut">
        Sign Out
      </v-btn>
      <v-list v-if=" textList == 'ผู้จัดการ'">
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
      <v-list v-if=" textList == 'พนักงานเคาเคอร์'">
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
      <v-list v-if=" textList == 'แพทย์'">
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
      <v-list v-if=" textList == 'admin'">
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
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Theme Dark"
        persistent-hint
        class="mt-6"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      textList: '',
      po: '',
      itemslogin: [
        {
          icon: 'mdi-login',
          title: 'login',
          to: '/'
        }
      ],
      items1: [ // admin
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
        },
        {
          icon: 'mdi-emoticon-outline',
          title: 'ประเมิน',
          to: '/p'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Chiangmai Clinic'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    signOut () {
      const data = {
        username: '',
        password: '',
        position: '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
      db.collection('log').doc('login').set(data)
      this.$router.push('/')
    },
    getData () {
      db.collection('log').onSnapshot((querySnapshot) => {
        const data = []
        const po = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data().position)
          po.push(doc.data().namestaff)
        })
        this.textList = data
        this.po = po.toString()
      })
    }
  }
}
</script>
