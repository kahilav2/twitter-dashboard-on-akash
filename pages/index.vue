<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Twitter Dashboard
        </v-card-title>
        <template v-for="(subset, index) of dataset">
          <Chart :dataset="subset" :key="index" class="chart"/>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from '~/components/chart.vue';

export default {
  components: {
    Chart,
  },
  data () {
    return {
      dataset: null,
    }
  },
  async mounted() {
    this.dataset = await this.$axios.$get(`/api`);
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 50px;
}
</style>