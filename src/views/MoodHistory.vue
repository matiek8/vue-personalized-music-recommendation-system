<template lang="pug">
.mood-history-page
  .title Mood History
  .chart
    MoodChart(:chartData="moodHistory")
</template>

<script>
import MoodChart      from '@/components/partials/mood-chart.vue'
import {useUserStore} from '@/stores/user'
import {mapActions}   from 'pinia'

export default {
  name: 'MoodHistoryPage',
  components: {MoodChart},
  data() {
    return {
      selectedDate: new Date().toISOString(),
      moodData: {
        tags: [],
        intensity: 0,
      },
      moodHistory: {
      },
    };
  },
  created() {
    this.getHistory()
  },
  mounted() {
    this.fetchMoodData();
  },
  methods: {
    ...mapActions(useUserStore, ['getMoodHistory']),
    async getHistory() {
      let history = await this.getMoodHistory()

      history.forEach(item => {
        this.moodHistory[Date.parse(item.date)] = {
          intensity: item.intensity,
          moodScale: item.moodScale,
          tags: JSON.parse(item.mood)
        }
      })

    },
    fetchMoodData() {
      // Fetch mood data based on selected date
      this.moodData = this.moodHistory[this.selectedDate] || { tags: [], intensity: 0 };
    },
  },
}
</script>

<style scoped lang="scss">
.mood-history-page {
  padding: 170px 20px 0;

  .title {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .date-picker {
    margin-bottom: 20px;

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  .mood-tags, .intensity-level {
    margin-bottom: 20px;

    h3 {
      margin-bottom: 10px;
    }

    .tag {
      display: inline-block;
      margin-right: 10px;
      padding: 5px 10px;
      background-color: #f0f0f0;
      border-radius: 15px;
    }
  }

  .no-data {
    color: #888;
  }
}
</style>
