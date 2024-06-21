<template lang="pug">
.chart-container
  .text(v-if="showText" ) {{text}}
  canvas#mood-intensity-chart
</template>


<script>
import { Chart } from 'chart.js'

export default {
  name: 'MoodChart',
  props: {
    chartData: {
      type: Object,
      default: ()=>{}
      // required: true
    }
  },
  data() {
    return {
      selectedDate: null,
      text: 'Loading data...',
      showText: true
    }
  },
  watch: {
    chartData: {
      handler(newValue) {
        if(newValue && Object.keys(newValue).length) {
          this.showText = false
          this.setupChart()
        }
      },
      deep: true
    }
  },
  mounted() {
    if(this.chartData && Object.keys(this.chartData).length) {
      this.showText = false
      this.setupChart()
    }
  },
  methods: {
    setupChart() {
      const ctx = document.getElementById('mood-intensity-chart').getContext('2d');
      const chartLabels = Object.keys(this.chartData).map(timestamp => new Date(parseInt(timestamp)).toLocaleDateString());
      const intensityData = Object.values(this.chartData).map(data => data.intensity);
      const moodScaleData = Object.values(this.chartData).map(data => data.moodScale);
      const tagsData = Object.values(this.chartData).map(data => data.tags);


      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Intensity',
              data: intensityData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
            },
            {
              label: 'Mood Scale',
              data: moodScaleData,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              tags: tagsData,
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                footer: function (tooltipItem) {

                  let index = tooltipItem[1].dataIndex
                  return tooltipItem[1].dataset.tags[index]
                },
              }
            }
          },
          scales: {
            x: {
              ticks: {
                callback: function(val, index, dataset) {
                  if(index===0) return this.getLabelForValue(val)
                  let len = dataset.length
                  let middle = Math.floor(dataset.length/2)
                  if (len > 4 && index === middle) return this.getLabelForValue(val)
                  if (index === dataset.length-1) return this.getLabelForValue(val)
                },
              }
            }
          }
        },
      });
    },
  },
}
</script>


<style scoped lang="scss">
.chart-container {
  max-width: 600px;
  margin: auto;

  canvas {
    width: 100%;
    height: 350px;
  }
}
</style>