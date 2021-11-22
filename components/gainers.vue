<template>
  <v-container>
    <v-row class="mb-2">
      <v-chip 
        v-for="({ growth: { percentage }, twitterID }, index) in percentageTop3" 
        :key="index" 
        class="mr-2"
        color="grey darken-3"
      >
        {{ twitterID }} 
        <span :key="index" class="gain ml-2">{{ percentage }}% </span> 
      </v-chip>
    </v-row>
    <v-row>
      <v-chip v-for="({ growth: { absoluteGrowth }, twitterID }, index) in absoluteTop3" 
        :key="index" 
        class="mr-2"
        color="grey darken-3"
      >
        {{ twitterID }} 
        <span :key="index" class="gain ml-2">{{ format(absoluteGrowth) }} </span>
      </v-chip>
    </v-row>
  </v-container>
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
      absoluteTop3: this.dataset
        .filter(a=>a.growth.timePeriod >= 7)
        .sort((a,b)=> b.growth.absoluteGrowth - a.growth.absoluteGrowth)
        .slice(0,3),
      percentageTop3: this.dataset
        .filter(a=>a.growth.timePeriod >= 7)
        .sort((a,b)=> b.growth.percentage - a.growth.percentage)
        .slice(0,3),
    };
  },
  methods: {
    format(number) {
      return nFormatter(number);
    }
  },
}
</script>
<style lang="scss" scoped>
</style>