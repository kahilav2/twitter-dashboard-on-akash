<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :options="options"
      dense
      hide-default-footer
      class="elevation-1 d-none d-sm-block">
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
      <template v-slot:[`item.monthlyGrowth`]="{ item }">
        <template v-if="item.monthlyTimePeriod < 30">
          <span class="new">New!</span>
        </template>
        <span class="neutral">{{ formatWeeklyGrowth(item.monthlyGrowth) }}</span>
      </template>
      <template v-slot:[`item.monthlyGrowthPercentage`]="{ item }">
        <span :class="item.monthlyPercentageSign ? 'gain' : 'loss'">{{ formatWeeklyGrowthPercentage(item.monthlyGrowthPercentage) }}</span>
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
    
    <v-card-title class="d-flex d-sm-none">Follower Growth (7d)</v-card-title>
    <v-data-table
      :headers="weeklyHeadersMobile"
      :items="items"
      :options="options"
      dense
      hide-default-footer
      :mobile-breakpoint="0"
      @click:row="onClick"
      class="elevation-1 d-sm-none col-xs-12 pl-4 pr-4 mobile">
      <template v-slot:[`item.twitterID`]="{ item }">
        {{ capitalize(item.twitterID) }}
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
    </v-data-table>

    <v-card-title class="d-flex d-sm-none">Follower Growth (30d)</v-card-title>
    <v-data-table
      :headers="monthlyHeadersMobile"
      :items="items"
      :options="options"
      dense
      hide-default-footer
      :mobile-breakpoint="0"
      @click:row="onClick"
      class="elevation-1 d-sm-none col-xs-12 pl-4 pr-4 mobile">
      <template v-slot:[`item.twitterID`]="{ item }">
        {{ capitalize(item.twitterID) }}
      </template>
      <template v-slot:[`item.latestFollowersCount`]="{ item }">
        <span :class="getClass(item.latestFollowersCount)">{{ format(item.latestFollowersCount) }}</span>
      </template>
      <template v-slot:[`item.monthlyGrowth`]="{ item }">
        <template v-if="item.monthlyTimePeriod < 30">
          <span class="new">New!</span>
        </template>
        <span class="neutral">{{ formatWeeklyGrowth(item.monthlyGrowth) }}</span>
      </template>
      <template v-slot:[`item.monthlyGrowthPercentage`]="{ item }">
        <span :class="item.monthlyPercentageSign ? 'gain' : 'loss'">{{ formatWeeklyGrowthPercentage(item.monthlyGrowthPercentage) }}</span>
      </template>
    </v-data-table>
  </div>
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
      weeklyHeadersMobile: [
        {
          text: '',
          sortable: false,
          value: 'twitterID',
          width: "45%",
        },
        { 
          text: 'Followers', 
          value: 'latestFollowersCount',
          width: "20%", 
        },
        { 
          text: 'Growth', 
          value: 'weeklyGrowth',
          width: "17.5%",
        },
        { 
          text: '%', 
          value: 'weeklyGrowthPercentage',
          width: "17.5%",
          align: 'center',
        },
      ],
      monthlyHeadersMobile: [
        {
          text: '',
          sortable: false,
          value: 'twitterID',
          width: "45%",
        },
        { 
          text: 'Followers', 
          value: 'latestFollowersCount',
          width: "20%", 
        },
        { 
          text: 'Growth', 
          value: 'monthlyGrowth',
          width: "17.5%",
        },
        { 
          text: '%', 
          value: 'monthlyGrowthPercentage',
          width: "17.5%",
          align: 'center',
        },
      ],
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
        { text: '7d Growth', value: 'weeklyGrowth' },
        { text: '7d %', value: 'weeklyGrowthPercentage' },
        { text: '30d Growth', value: 'monthlyGrowth' },
        { text: '30d %', value: 'monthlyGrowthPercentage' },
        { text: '', value: 'trend', sortable: false, },
      ],
      items: this.dataset.map((a, index) =>
        ({
          rank: index + 1,
          twitterID: a.twitterID,
          latestFollowersCount: a.latestFollowersCount,
          weeklyGrowth: (a.growth.timePeriod >= 7) ? a.growth.absoluteGrowth : '',
          weeklyGrowthPercentage: (a.growth.timePeriod >= 7) ? a.growth.percentage : '',
          monthlyGrowth: (a.monthlyGrowth.timePeriod >= 30) ? a.monthlyGrowth.absoluteGrowth : '',
          monthlyGrowthPercentage: (a.monthlyGrowth.timePeriod >= 30) ? a.monthlyGrowth.percentage : '',
          percentageSign: a.growth.percentageSign,
          timePeriod: a.growth.timePeriod,
          monthlyPercentageSign: a.monthlyGrowth.percentageSign,
          monthlyTimePeriod: a.monthlyGrowth.timePeriod,
        })
      ),
      options: {
        itemsPerPage: 100,
      }
    };
  },
  methods: {
    onClick({ twitterID }) {
      this.$router.push({ path: '/trends/' + twitterID })
    },
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
  --webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  &:hover {
    --webkit-filter: brightness(2.3);
    filter: brightness(2.3);
    
  }
}
::v-deep tr {
  transition: all 0.13s ease-out;
}

.mobile {
  ::v-deep th {
    padding: 0 !important;
  }
  ::v-deep tr {
    transition: all 0.13s ease-out;
    td {
      padding: 0 !important;
    }
  }
}

</style>