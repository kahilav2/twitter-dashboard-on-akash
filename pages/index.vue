<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mb-12">
        <v-card-title class="headline">
          <v-img
            src="logo-large.png"
            contain
            max-height="36"
            max-width="36"
          />
          {{ pageTitle }}
        </v-card-title>
        <v-card-text>
          <p v-html="introductionText"/>
        </v-card-text>
        <v-row class="pl-4 pr-4">
          
          <v-col
            cols="4"
            sm="4"
          >
            <a v-if="adminTwitterID" :href="`https://twitter.com/${adminTwitterID}`" target="blank">
              <v-img 
                src="twitter-white.png"
                contain
                max-height="26"
                max-width="26"
              />
            </a>
          </v-col>
          <v-col
            cols="4"
            sm="4"
          >
            <a href="https://github.com/kahilav2/twitter-dashboard-on-akash" target="blank">
              <v-img 
                src="github.png"
                contain
                max-height="26"
                max-width="26"
              />
            </a>
          </v-col>
          <v-col
            cols="4"
            sm="4"
          >
            <a href="https://akash.network/" target="blank">
              <v-img 
                src="akash.png"
                contain
                max-height="32"
                max-width="106"
              />
            </a>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mb-12">
        <v-card-title>
          Top Gainers (7d)
        </v-card-title>
        <v-card-text>
          <Gainers v-if="dataset" :dataset="dataset"/>
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
          {{ capitalize(subset.twitterID) }}
        </v-card-title>
        <v-card-text>
          {{ capitalize(subset.twitterID) }} is {{ subset.growth.percentageSign ? 'up' : 'down' }} 
          <span :class="subset.growth.percentageSign ? 'gain' : 'loss'">
          {{ subset.growth.percentageSign }}{{ subset.growth.percentage }}%
          </span> after {{ subset.growth.percentageSign ? 'gaining' : 'losing' }} <span>{{format(subset.growth.absoluteGrowth) }}</span>
          followers in {{ subset.growth.timePeriod }} days.
        </v-card-text>
        <Chart :dataset="subset" :key="index" class="chart"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from '~/components/chart.vue';
import ChartMultiPlot from '~/components/chart-multiplot.vue';
import SummaryTable from '~/components/summary-table.vue';
import Gainers from '~/components/gainers.vue';

import { nFormatter } from '~/utils/common';

export default {
  components: {
    Chart,
    ChartMultiPlot,
    SummaryTable,
    Gainers,
  },
  data () {
    return {
      dataset: null,
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters["app/get"].pageTitle ?? '';
    },
    introductionText() {
      return this.$store.getters["app/get"].introductionText ?? '';
    },
    adminTwitterID() {
      return this.$store.getters["app/get"].adminTwitterID;
    },
  },
  async mounted() {
    const { data, pageTitle, introductionText, adminTwitterID } = await this.$axios.$get(`/api`);

    this.dataset = this.structurizeData(data);
    this.$store.dispatch('app/set', { 
      pageTitle,
      introductionText,
      adminTwitterID,
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
          const percentageRaw = (dataPoints[dataPoints.length - 1].followersCount - dataPoints[dataPoints.length - timePeriod].followersCount) / 
              dataPoints[dataPoints.length - timePeriod].followersCount * 100;

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
    format(number) {
      return nFormatter(number);
    },
    capitalize([ first, ...rest ]) {
      return first.toUpperCase() + rest.join('')
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 50px;
}
::v-deep span {
  font-size: 15px;
  font-weight: bold;
  &.gain {
    color: #5bd85b;
  }
  &.loss {
    color: #d65e5e;
  }
}

</style>