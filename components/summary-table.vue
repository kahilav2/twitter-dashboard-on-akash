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
    <template v-slot:[`item.externalLink`]="{ item }">
      
        <a :href="`http://twitter.com/${item.twitterID}`" target="blank" class="link">
        <v-img
          max-height="15"
          max-width="15"
          class="external-link"
          :src="imageSources.externalLink"
        />
      </a>
      
    </template>
    <template v-slot:[`item.latestFollowersCount`]="{ item }">
      <span :class="getClass(item.latestFollowersCount)">{{ format(item.latestFollowersCount) }}</span>
    </template>
    <template v-slot:[`item.weeklyGrowth`]="{ item }">
      <template v-if="item.timePeriod < 7">
        <span class="new">New!</span>
      </template>
      <span class="neutral">{{ formatWeeklyGrowth(item.weeklyGrowth) }}</span>
    </template>
    <template v-slot:[`item.weeklyGrowthPercentage`]="{ item }">
      <span :class="item.percentageSign ? 'gain' : 'loss'">{{ formatWeeklyGrowthPercentage(item.weeklyGrowthPercentage) }}</span>
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
      imageSources: { 
        trend: require('~/assets/trend.png'),
        externalLink: require('~/assets/external-link.png'),
      },
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
        {
          text: '',
          sortable: false,
          value: 'externalLink',
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
          percentageSign: a.growth.percentageSign,
          timePeriod: a.growth.timePeriod,
        })
      ),
      options: {
        itemsPerPage: 100,
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
.external-link{
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  &:hover {
    -webkit-filter: brightness(2.3);
    filter: brightness(2.3);
    
  }
}
::v-deep tr {
  transition: all 0.13s ease-out;
}
</style>