<template>
  <v-row justify="center" align="center" id="app">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mb-12">
        <v-card-title class="headline">
          <v-img
            src="logo-large.png"
            contain
            max-height="36"
            max-width="36"
            class="mr-1"
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
    const dataset = this.$store.getters["app/get"].dataset;
    if (dataset === null) {
      let response;
      try {
        response = await this.$axios.$get(`/api`);
      } catch (error) {
        // dummy data for debugging
        response = { data:
            [{"id":1,"twitter_id":"elonmusk","followers_count":3196817,"date":"2021-11-12 03:54:31"},{"id":2,"twitter_id":"JeffBezos","followers_count":10824339,"date":"2021-11-12 03:54:32"}],
            pageTitle:"Twitter Dashboard",introductionText:"This site shows the Twitter follower growth of various Twitter pages",adminTwitterID:"twitter",pageloadCount:0 };
      }
      const { data, pageTitle, introductionText, adminTwitterID } = response; 

      this.dataset = structurizeData(data);
      this.$store.dispatch('app/set', { 
        pageTitle,
        introductionText,
        adminTwitterID,
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

</style>