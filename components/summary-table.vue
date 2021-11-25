<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options="options"
    hide-default-footer
    class="elevation-1">
    <template v-slot:[`item.twitterID`]="{ item }" @click="jee">
      <nuxt-link :to="{ path: '/', hash: item.twitterID } " class="link">
        {{ item.twitterID }}
      </nuxt-link>
    </template>
    <template v-slot:[`item.latestFollowersCount`]="{ item }">
      {{ format(item.latestFollowersCount) }}
    </template>
    <template v-slot:[`item.weeklyGrowth`]="{ item }">
      <span class="neutral">{{ formatWeeklyGrowth(item.weeklyGrowth) }}</span>
    </template>
    <template v-slot:[`item.weeklyGrowthPercentage`]="{ item }">
      <span class="gain">{{ formatWeeklyGrowthPercentage(item.weeklyGrowthPercentage) }}</span>
    </template>
  </v-data-table>
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
          value: 'rank',
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'twitterID',
        },
        { text: 'Followers', value: 'latestFollowersCount' },
        { text: 'Growth (/7d)', value: 'weeklyGrowth' },
        { text: 'Growth-% (%/7d)', value: 'weeklyGrowthPercentage' },
      ],
      items: this.dataset.map((a, index) =>
        ({
          rank: index + 1,
          twitterID: a.twitterID,
          latestFollowersCount: a.latestFollowersCount,
          weeklyGrowth: (a.growth.timePeriod >= 7) ? a.growth.absoluteGrowth : '',
          weeklyGrowthPercentage: (a.growth.timePeriod >= 7) ? a.growth.percentage : '',
        })
      ),
      options: {
        itemsPerPage: 30,
      }
    };
  },
  methods: {
    format(number) {
      return nFormatter(number);
    },
    formatWeeklyGrowth(weeklyGrowth) {
      if (!weeklyGrowth) return '';
      return nFormatter(weeklyGrowth);
    },
    formatWeeklyGrowthPercentage(weeklyGrowthPercentage) {
      if (!weeklyGrowthPercentage) return '';
      return (weeklyGrowthPercentage >= 0 ? '+' : '') + nFormatter(weeklyGrowthPercentage) + '%';
    },
  },
}
</script>
<style lang="scss" scoped>
.link {
  color: white;
  text-decoration: none;
}
</style>