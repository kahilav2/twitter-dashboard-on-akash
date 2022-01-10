<template>
  <v-row justify="center" align="center" id="app">
    <v-col cols="12" sm="12" md="10" lg="8" xl="8">
      <BackArrow/>
      <v-card v-if="subset">
        <v-card-title class="headline">
          {{ capitalize(subset.twitterID) }}
        </v-card-title>
        <v-card-text>
          {{ capitalize(subset.twitterID) }} is {{ subset.growth.percentageSign ? 'up' : 'down' }} 
          <span :class="subset.growth.percentageSign ? 'gain' : 'loss'">
          {{ subset.growth.percentageSign }}{{ subset.growth.percentage }}%
          </span> after {{ subset.growth.percentageSign ? 'gaining' : 'losing' }} <span class="neutral">{{format(subset.growth.absoluteGrowth) }}</span>
          followers in {{ subset.growth.timePeriod }} days. {{ capitalize(subset.twitterID) }} currently has <span class="neutral-white">{{ format(subset.latestFollowersCount, { significantFigures: 3 }) }}</span> followers.
          {{ capitalize(subset.twitterID) }} is ranked <span class="neutral-white">#{{ index + 1 }}</span> on Crypto Twitter Dashboard.
        </v-card-text>
        <Chart :dataset="subset" class="chart"/>
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
    BackArrow
    const dataset = this.$store.getters["app/get"].dataset;
    let subsetCandidate = null;
    let index = null;
    if (dataset !== null) {
      subsetCandidate = dataset.find(a=>a.twitterID === this.$route.params.id);
      if (!subsetCandidate) {
        this.$router('/')
      }
      index = dataset.findIndex(a=>a.twitterID === this.$route.params.id);
    }
    
    return {
      users: {},
      subset: subsetCandidate,
      index,
    }
  },
  created () {
    if (this.subset === null) {
      this.getData();
    }
  },
  methods: {
    async getData () {
      const { data } = await this.$axios.$get(`/api`);
      
      const dataset = structurizeData(data);

      this.$store.dispatch('app/set', { 
        dataset,
      });
      
      const subsetCandidate = dataset.find(a => a.twitterID === this.$route.params.id);
      if (!subsetCandidate) {
        this.$router.push('/');
      }
      this.subset = subsetCandidate;
      this.index = dataset.findIndex(a => a.twitterID === this.$route.params.id);
    },
    format(number, options) {
      return nFormatter(number, options);
    },
    capitalize([ first, ...rest ]) {
      return first.toUpperCase() + rest.join('')
    },
  }
}
</script>
<style lang="scss" scoped>
</style>