<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Twitter Followers Dashboard
        </v-card-title>
        <ChartMultiPlot v-if="dataset" :dataset="dataset" />
        <template v-for="(subset, index) of dataset">
          <Chart :dataset="subset" :key="index" :numbering="index" class="chart"/>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from '~/components/chart.vue';
import ChartMultiPlot from '~/components/chart-multiplot.vue';

export default {
  components: {
    Chart,
    ChartMultiPlot,
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