<template>
  <v-row justify="center" align="center" id="app">
    <v-col cols="12" sm="10" md="8" lg="6" xl="6">
      <v-card class="mb-12">
        <v-card-title class="headline">
          <v-img
            src="logo-large.png"
            contain
            max-height="36"
            max-width="36"
            class="mr-1"
          />
          {{ $getConst('general.pageTitle') }}
        </v-card-title>
        <v-card-text>
          <p>
            This site shows the Twitter follower growth of various cryptocurrency related projects. 
            If you find this site useful, please show your support by following us on Twitter. 
            That ensures the continuation of this project.
          </p>
        </v-card-text>
        <v-row class="pl-4 pr-4">
          
          <v-col
            cols="4"
            sm="4"
          >
            <a :href="`https://twitter.com/${ $getConst('general.adminTwitterID') }`" target="blank">
              <v-img 
                src="twitter-white.png"
                contain
                class="row-icon"
                max-height="22"
                max-width="22"
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
                class="row-icon"
                max-height="22"
                max-width="22"
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
                class="row-icon"
                max-height="26"
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
    </v-col>
  </v-row>
</template>

<script>
import Chart from '~/components/chart.vue';
import ChartMultiPlot from '~/components/chart-multiplot.vue';
import SummaryTable from '~/components/summary-table.vue';
import Gainers from '~/components/gainers.vue';

import { nFormatter, structurizeData } from '~/utils/common';

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
  async mounted() {
    const dataset = this.$store.getters["app/get"].dataset;
    if (dataset === null) {
      let response;
      try {
        response = await this.$axios.$get(`/api`);
      } catch (error) {
        // dummy data for debugging
        response = { data:
            [{"id":1,"twitter_id":"elonmusk","followers_count":3196817,"date":"2021-11-12 03:54:31"},{"id":2,"twitter_id":"JeffBezos","followers_count":10824339,"date":"2021-11-12 03:54:32"}],
            pageloadCount:0 };
      }
      const { data } = response; 

      this.dataset = structurizeData(data);
      this.$store.dispatch('app/set', { 
        dataset: this.dataset,
      });
    } else {
      this.dataset = dataset;
    }
  },
  methods: {
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
.row-icon {
  --webkit-filter: brightness(0.9);
  filter: brightness(0.9);
}
</style>