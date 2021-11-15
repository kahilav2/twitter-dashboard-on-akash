<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'

export default {
  name: 'Chart',
  extends: Line,
  props: {
    dataset: {
      default: {},
      type: Object,
    },
    numbering: {
      type: Number,
      required: true 
    },
  },
  data () {
    return {};
  },
  mounted () {
    this.render();
  },
  methods: {
    render() {
      const xs = this.dataset.dataPoints.map(point => moment(point.date).format('MM/DD'));
      const ys = this.dataset.dataPoints.map(point => ({ t: moment(point.date).format('MM/DD'), y: point.followersCount }));
      
      const timePeriod = Math.min(7, this.dataset.dataPoints.length);
      const percentageRaw = (1 - ys[ys.length - timePeriod].y / ys[ys.length - 1].y);
      const percentage = percentageRaw.toFixed(3);
      const sign = (percentage >= 0) ? '+' : '';

      this.renderChart({
        labels: xs,
        datasets: [{
          label: this.dataset.twitterID + ` (${sign}${percentage}% in ${timePeriod} days)`,
          data: ys,
          fill: false,
          borderColor: this.$getConst('plot.borderColors')[this.numbering],
          backgroundColor: '#D1E6FA',
        }],
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear'
          }],
        }
      });
    },
  }
}
</script>