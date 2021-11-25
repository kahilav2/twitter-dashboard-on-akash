<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options="options"
    dense
    hide-default-footer
    class="elevation-1">
    <template v-slot:[`header.trend`]="">
      <nuxt-link :to="{ name: 'trends' } " class="link">
        <v-img
          lazy-src="multi-trend.png"
          max-height="22"
          max-width="22"
          src="multi-trend.png"
        />
      </nuxt-link>
    </template>
    <template v-slot:[`item.twitterID`]="{ item }">
      {{ capitalize(item.twitterID) }}
    </template>
    <template v-slot:[`item.latestFollowersCount`]="{ item }">
      <span :class="getClass(item.latestFollowersCount)">{{ format(item.latestFollowersCount) }}</span>
    </template>
    <template v-slot:[`item.weeklyGrowth`]="{ item }">
      <span class="neutral">{{ formatWeeklyGrowth(item.weeklyGrowth) }}</span>
    </template>
    <template v-slot:[`item.weeklyGrowthPercentage`]="{ item }">
      <span class="gain">{{ formatWeeklyGrowthPercentage(item.weeklyGrowthPercentage) }}</span>
    </template>
    <template v-slot:[`item.trend`]="{ item }">
      <nuxt-link :to="{ path: '/trends/' + item.twitterID } " class="link">
        <v-img
          max-height="20"
          max-width="20"
          :src="imageSources.trend"
        />
      </nuxt-link>
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
      imageSources: { trend: require('~/assets/trend.png') },
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
        { text: '', value: 'trend', sortable: false, },
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
    capitalize([ first, ...rest ]) {
      return first.toUpperCase() + rest.join('')
    },
    getClass(followersCount) {
      if (followersCount < 100000) return 'low-followers-count';
      if (followersCount < 1000000) return 'medium-followers-count';
      return 'high-followers-count';
    }
  },
}
</script>
<style lang="scss" scoped>
.link {
  color: white;
  text-decoration: none;
}
</style>