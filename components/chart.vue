<script>
import { Line } from 'vue-chartjs'
import { nFormatter } from '~/utils/common';
import moment from 'moment'

export default {
  name: 'Chart',
  extends: Line,
  props: {
    dataset: {
      default: {},
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
      
      this.renderChart(
        {
          labels: xs,
          datasets: [{
            label: this.dataset.twitterID,
            data: ys,
            fill: false,
            borderColor: this.$getConst('plot.borderColors')[this.dataset.index],
            backgroundColor: '#D1E6FA',
          }]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            fontColor: "white",
            labels: {
              fontColor: "rgba(255, 255, 255, 0.7)",
              fontSize: 17
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                callback(value, index, values) {
                  return nFormatter(value, { significantFigures: 3 });
                },
                maxTicksLimit: 4,
                fontColor: "white",
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
              }
            }],
          },
        }
      );
    },
  }
}
</script>