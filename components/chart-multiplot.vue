<script>
import { Line } from 'vue-chartjs'
import { nFormatter, getColor } from '~/utils/common';

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
      // TODO: this doesnt work currently when there is e.g. one dataset started 2 weeks ago 
      // and one dataset started a week ago

      const xs = this.dataset[0].dataPoints.map(point => moment(point.date).format('MM/DD'));
      const datasets = this.dataset.map((subset) => ({
        label: subset.twitterID,
        data: subset.dataPoints.map(point => ({ t: moment(point.date).format('MM/DD'), y: point.followersCount })),
        fill: false,
        borderColor: getColor(subset.index, subset.twitterID),
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
      },
      {
          
          title: {
                display: true,
                text: 'Twitter Followers',
                color: "white",
          },
        
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
              scaleLabel: {
                display: true,
                labelString: 'Followers',
                fontColor: '#eee',
              },
            	ticks: {
                callback(value, index, values) {
                  return nFormatter(value);
                },
                max: 1350000,
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