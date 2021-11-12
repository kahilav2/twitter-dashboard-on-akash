<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'

export default {
  name: 'Chart',
  extends: Line,
  props: {
    dataset: {
      default: [],
      type: Object,
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
      
      this.renderChart({
        labels: xs,
        datasets: [{
          label: this.dataset.twitterID,
          data: ys,
          fill: false,
          borderColor: '#0058FF',
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