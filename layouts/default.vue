<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-btn v-if=" this.$store.state.login != ''" block color="blue">
        {{ this.$store.state.name }}
      </v-btn>
      <v-list v-if=" this.$store.state.login == ''">
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
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      itemslogin: [
        {
          icon: 'mdi-login',
          title: 'login',
          to: '/'
        }
        // {
        //   icon: 'mdi-chart-line',
        //   title: 'login',
        //   to: '/login'
        // },
        // {
        //   icon: 'mdi-chart-line',
        //   title: 'login',
        //   to: '/store'
        // }
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
          icon: 'mdi-chart-line',
          title: 'ประเมิน',
          to: '/satisfaction'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Chiang Mai Clinic'
    }
  },
  methods: {
    signOut () {
      this.$store.commit('login', '')
      this.$store.commit('name', '')
      this.$router.replace('/')
    }
  }
}
</script>
