<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options="options"
    class="elevation-1" />
</template>
<script>
import { nFormatter } from '~/utils/common';
export default {
  props: {
    dataset: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'twitterID',
        },
        { text: 'Followers', value: 'latestFollowersCount' },
        { text: 'Growth (/7d)', value: 'weeklyGrowth' },
        { text: 'Growth-% (%/7d)', value: 'weeklyGrowthPercent' },
      ],
      items: this.dataset.map(a=>
        ({
          twitterID: a.twitterID,
          latestFollowersCount: nFormatter(a.latestFollowersCount),
          weeklyGrowth: (a.growth.timePeriod >= 7) ? nFormatter(a.growth.absoluteGrowth) : 'N/A',
          weeklyGrowthPercent: (a.growth.timePeriod >= 7) ? a.growth.percentageSign + a.growth.percentage + '%' : 'N/A',
        })
      ),
      options: {
        itemsPerPage: 30,
      }
    };
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>

</style>