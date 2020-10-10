<template>
  <div id="app">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
              <v-text-field name="Username" label="Username" />
              <v-text-field name="Password" label="Password" type="password" />
              <nuxt-link to="/classifly">
                <v-card-actions>
                  <v-btn primary large block>
                    Login
                  </v-btn>
                </v-card-actions>
              </nuxt-link>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'print'
}
</script>
