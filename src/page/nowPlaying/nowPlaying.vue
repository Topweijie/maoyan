<template>
  <div class="page active">
    <div class="list-wrap">
      <div class="item" v-for="item in movieList" :key="item.id" @click="toMovie(item.id)">
        <div class="main-block">
          <div class="avatar">
            <div class="default-img-bg">
              <img :src="item.img | setWH('128.183')" />
            </div>
          </div>
          <div class="content-wrapper">
            <div class="content">
              <div class="box-flex movie-title">
                <div class="title line-ellipsis">{{ item.nm }}</div>
                <span class="version" v-if="item.version != ''" :class="item.version"></span>
              </div>
              <div class="detail">
                <div class="score line-ellipsis" v-if="item.sc != 0 && item.rt <= nowTime">
                  <span class="score-suffix">观众评 </span>
                  <span class="grade">{{ item.sc | numFilter }}</span>
                </div>
                <div class="no-score line-ellipsis" v-else-if="item.sc === 0 && item.rt <= nowTime">暂无评分</div>
                <div class="score line-ellipsis" v-else>
                  <span class="grade">{{ item.wish }}</span>
                  <span class="score-suffix">人想看</span>
                </div>
                <div class="actor line-ellipsis">主演: {{ item.star }}</div>
                <div class="show-info line-ellipsis">{{ item.showInfo }}</div>
              </div>
            </div>
            <div class="button-block">
              <div class="btn" v-if="item.rt <= nowTime">购票</div>
              <div class="btn pre" v-else>预售</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NowPlaying',
  data(){
    return {
      movieList: [],
      movieIds: [],
      nowTime: ''
    }
  },
  activated() {
    this.axios.get('/ajax/movieOnInfoList').then( (res) => {
      var status = res.status
      if( status === 200 ) {
        this.movieList = res.data.movieList
        this.movieIds = res.data.movieIds
        this.nowTime = this.format(new Date(), "yyyy-MM-dd")
      }
    })
  },
  methods: {
    toMovie(movieId) {
      this.$router.push('/cinema/movie/' + movieId)
    },
    format(date, fmt) {
      let o = {
        "M+": date.getMonth() + 1,  // 月份
        "d+": date.getDate(),       // 日
        "H+": date.getHours(),      // 时
        "m+": date.getMinutes(),    // 分
        "s+": date.getSeconds(),    // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds()     // 毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },
  filters: {
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(1)
      return realVal
    }
  }
}
</script>

<style>

</style>
