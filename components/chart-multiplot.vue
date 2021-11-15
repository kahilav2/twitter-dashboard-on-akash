<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'

export default {
  name: 'Chart',
  extends: Line,
  props: {
    dataset: {
      default: [],
      type: Array,
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
      const xs = this.dataset[0].dataPoints.map(point => moment(point.date).format('MM/DD'));
      const datasets = this.dataset.map((subset, index) => ({
        label: subset.twitterID,
        data: subset.dataPoints.map(point => ({ t: moment(point.date).format('MM/DD'), y: point.followersCount })),
        fill: false,
        borderColor: this.$getConst('plot.borderColors')[index],
        backgroundColor: '#D1E6FA',
      }));
      this.renderChart({
        labels: xs,
        datasets,
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