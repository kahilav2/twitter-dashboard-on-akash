<template>
  <v-row justify="center" align="center" id="app">
    <v-col cols="12" sm="8" md="6">
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
          followers in {{ subset.growth.timePeriod }} days.
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
    if (dataset !== null) {
      subsetCandidate = dataset.find(a=>a.twitterID === this.$route.params.id);
      if (!subsetCandidate) {
        this.$router('/')
      }
    }
    return {
      users: {},
      subset: subsetCandidate,
    }
  },
  created () {
    if (this.subset === null) {
      this.getData();
    }
  },
  methods: {
    async getData () {
      const { data, pageTitle, introductionText, adminTwitterID } = await this.$axios.$get(`/api`);

      const dataset = structurizeData(this, data);
      this.$store.dispatch('app/set', { 
        pageTitle,
        introductionText,
        adminTwitterID,
        dataset,
      });
      
      const subsetCandidate = dataset.find(a => a.twitterID === this.$route.params.id);
      if (!subsetCandidate) {
        this.$router.push('/');
      }
      this.subset = subsetCandidate;
    },
    format(number) {
      return nFormatter(number);
    },
    capitalize([ first, ...rest ]) {
      return first.toUpperCase() + rest.join('')
    },
  }
}
</script>
<style lang="scss" scoped>
</style>