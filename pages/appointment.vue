<template>
  <v-row>
    <v-col class="center">
      <Appointment />
    </v-col>
  </v-row>
</template>

<script>
import Appointment from '~/components/appointment.vue'

export default {
  components: {
    Appointment
  }
}
</script>
