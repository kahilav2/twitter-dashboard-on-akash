<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mb-12">
        <v-card-title class="headline">
          {{ pageTitle }}
        </v-card-title>
        <v-card-text>
          <p v-html="introductionText"/>
        </v-card-text>
      </v-card>

      <v-card class="mb-12">
        <SummaryTable v-if="dataset" :dataset="dataset"/>
      </v-card>
      <!--
      <v-card class="mb-12">
        <ChartMultiPlot v-if="dataset" :dataset="dataset" />
      </v-card>
      -->
      <v-card v-for="(subset, index) of dataset" :key="index">
        <v-card-title class="headline">
          {{ subset.twitterID }} 
          ({{ subset.growth.percentageSign }}{{ subset.growth.percentage }}%, 
          {{ subset.growth.absoluteGrowth }} followers in {{ subset.growth.timePeriod }} days)
        </v-card-title>
        <Chart :dataset="subset" :key="index" class="chart"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from '~/components/chart.vue';
import ChartMultiPlot from '~/components/chart-multiplot.vue';
import SummaryTable from '~/components/summary-table.vue';

export default {
  components: {
    Chart,
    ChartMultiPlot,
    SummaryTable,
  },
  data () {
    return {
      dataset: null,
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters["app/get"].pageTitle;
    },
    introductionText() {
      return this.$store.getters["app/get"].introductionText;
    },
  },
  async mounted() {
    const response = await this.$axios.$get(`/api`);

    this.dataset = this.structurizeData(response.data);
    this.$store.dispatch('app/set', { 
      pageTitle: response.pageTitle,
      introductionText: response.introductionText,
    });
  },
  methods: {
    structurizeData(rawData) {
      return this.$_.pairs(
          this.$_.groupBy(rawData, 'twitter_id')
        )
        .map((pairs, index) => {
          const twitterID = pairs[0];
          const dataPoints = pairs[1].map((b) => (
            { 
              followersCount: b.followers_count, 
              date: b.date 
            }));
          const timePeriod = Math.min(7, dataPoints.length);
          const percentageRaw = (1 - dataPoints[dataPoints.length - timePeriod].followersCount / 
              dataPoints[dataPoints.length - 1].followersCount) * 100;

          const absoluteGrowth = dataPoints[dataPoints.length - 1].followersCount - 
              dataPoints[dataPoints.length - timePeriod].followersCount;
          const percentage = percentageRaw.toFixed(2);
          const percentageSign = (percentage >= 0) ? '+' : '';

          return { 
            index,
            twitterID, 
            latestFollowersCount: Math.max.apply(Math, pairs[1].map((row) => row.followers_count)),
            dataPoints,
            growth: {
              timePeriod,
              percentage,
              percentageSign,
              percentageRaw,
              absoluteGrowth,
            },
          };
        })
        .sort((a, b) => b.latestFollowersCount - a.latestFollowersCount );
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 50px;
}
</style>