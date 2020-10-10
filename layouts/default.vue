<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
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
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
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
      fixed: true,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'ประเภทศัลยกรรม',
          to: '/classifly'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'บันทึกให้คำแนะนำ',
          to: '/advice'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'นัดวันทำศัลยกรรม',
          to: '/appointment'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'สรุปค่าใช้จ่าย',
          to: '/summary'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ข้อมูลลูกค้า',
          to: '/datamember'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ข้อมูลพนักงาน',
          to: '/datastaff'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ข้อมูลค่าใช้จ่าย',
          to: '/datasum'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Beauty clinic'
    }
  }
}
</script>
