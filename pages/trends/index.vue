<template>
  <v-row justify="center" align="center" id="app">
    <v-col cols="12" sm="8" md="6">
      <BackArrow />    
      <v-card v-for="(subset, index) of dataset" :key="index" :id="subset.twitterID">
        <v-card-title class="headline">
          {{ capitalize(subset.twitterID) }}
        </v-card-title>
        <v-card-text>
          {{ capitalize(subset.twitterID) }} is {{ subset.growth.percentageSign ? 'up' : 'down' }} 
          <span :class="subset.growth.percentageSign ? 'gain' : 'loss'">
          {{ subset.growth.percentageSign }}{{ subset.growth.percentage }}%
          </span> after {{ subset.growth.percentageSign ? 'gaining' : 'losing' }} <span class="neutral">{{format(subset.growth.absoluteGrowth) }}</span>
          followers in {{ subset.growth.timePeriod }} days.
        </v-card-text>
        <Chart :dataset="subset" :key="index" class="chart"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BackArrow from '~/components/back-arrow.vue';
import Chart from '~/components/chart.vue';
import { nFormatter, structurizeData } from '~/utils/common';

export default {
  components: {
    BackArrow,
    Chart,
  },
  data() {
    return {
      dataset: null,
    };
  },
  async mounted() {
    const dataset = this.$store.getters["app/get"].dataset;
    if (dataset === null) {
      const { data } = await this.$axios.$get(`/api`);

      this.dataset = structurizeData(data);
      this.$store.dispatch('app/set', { 
        dataset: this.dataset,
      });
    } else {
      this.dataset = dataset;
    }
  },
  methods: {
    capitalize([ first, ...rest ]) {
      return first.toUpperCase() + rest.join('')
    },
    format(number) {
      return nFormatter(number);
    },
  }
}
</script>
<style lang="scss" scoped>
.chart {
  margin-bottom: 50px;
}
</style>