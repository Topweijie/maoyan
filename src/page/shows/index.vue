<template>
  <div>
    <Header :title=headerTitle>
      <i class="icon-back" @touchstart="handleToBack"></i>
    </Header>
    <div class="body">
      <div class="body-wrap">
        <div class="cinema-wrap">
          <div class="cinema-block">
            <div class="cinema-info">
              <div class="title line-ellipsis">{{ headerTitle }}</div>
              <div class="location line-ellipsis">{{ cinemaData.addr }}</div>
              <div class="location-icon">
                <img src="../../images/location.png" alt="">
              </div>
            </div>
            <div>
              <div>
                <div class="cinema-nav swiper-container swiper-container-horizontal" ref="swiperContainer">
                  <div class="post-bg" :style="{ 'background-image' : 'url('+ img +')' }"></div>
                  <div class="post-bg-filter"></div>
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in movies" @click="moviesMsg(index)">
                      <div class="post">
                        <img :src="item.img | setWH('148.208')" alt="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="movie-info">
                  <div class="movie-title line-ellipsis">
                    <span class="title">{{ nm }}</span>
                    <span class="grade">
                      <span v-if="sc === 0.0">{{ sc }}<span class="small">分</span></span>
                      <span v-else>暂无评分</span>
                    </span>
                  </div>
                  <div class="movie-desc line-ellipsis">{{ desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-sell-cinema" style="display: none"></div>
        <div class="nav-wrap">
          <div class="nav-block mb-line-t">
            <div class="nav-bar mb-line-b">
              <div class="nav-bar-wrap">
                <div class="nav-item" v-for="(item, index) in shows" :class="{ active: index == nums }" @click="toIndex(index)">
                  <span class="data-title">{{ item.dateShow }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seat-wrap">
          <div class="discount-block">
            <div class="vip-tips">
              <a>
                <div class="label">{{ vipInfo.tag }}</div>
                <div class="label-text line-ellipsis">{{ vipInfo.title }}</div>
                <div class="process">{{ vipInfo.process }}</div>
              </a>
            </div>
          </div>
          <div class="seat-inner-wrap">
            <div class="seat-list">
              <div class="list-wrap">
                <div class="item-outer mb-line-b" v-for="(item, index) in pList">
                  <div class="item box-flex">
                    <div class="time-block">
                      <div class="begin">{{ item.tm }}</div>
                      <div class="end">{{ item.et }}<span class="tui">散场</span></div>
                    </div>
                    <div class="info-block">
                      <div class="lan">{{ item.lang }}{{ item.tp }}</div>
                      <div class="hall">{{ item.th }}</div>
                    </div>
                    <div class="price">
                      <div class="sellPr">
                        <span class="d">&yen;</span>
                        <span v-html="item.sellPr"></span>
                      </div>
                      <div class="vipPrice">
                        <span class="icon">{{ item.vipPriceName }}</span>
                        <span class="num">&yen;{{ item.vipPrice }}</span>
                      </div>
                      <div class="extraDesc">{{ item.extraDesc }}</div>
                    </div>
                    <div class="button-block">
                      <div class="button"  v-if="item.enterShowSeat === 1">购票</div>
                      <div class="button disable-btn" v-else>停售</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tuan-wrap"></div>
      </div>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/head'
import Swiper from 'swiper'

export default {
  name: 'Shows',
  data() {
    return {
      headerTitle: '',
      cinemaData: [],
      movies: [],
      img: '',
      nm: '',
      sc: '',
      desc: '',
      dur: '',
      shows: [],
      pList: [],
      vipInfo: [],
      nums: 0
    }
  },
  props: ['cinemaId'],
  components: {
    Header
  },
  mounted() {
    this.axios.get('/ajax/cinemaDetail?cinemaId='+this.cinemaId).then( (res) => {
      if( res.status === 200 ) {
        this.cinemaData = res.data.cinemaData
        this.headerTitle = this.cinemaData.nm
        this.movies = res.data.showData.movies
        this.vipInfo = res.data.showData.vipInfo[0]

        this.img = this.movies[0].img.replace(/w\.h/,'148.208')
        this.nm = this.movies[0].nm
        this.sc = this.movies[0].sc
        this.desc = this.movies[0].desc
        this.dur = this.movies[0].dur
        this.shows = this.movies[0].shows
        let pList = this.shows[0].plist

        pList.forEach( (item) => {
          let dt = item.dt,
          tm = item.tm,
          end_time = this.handleTimer(this.dur, dt, tm)

          item.et = end_time
        })
        this.pList = pList

        this.$nextTick( () => {
          new Swiper(this.$refs.swiperContainer, {
            slideToClickedSlide: true,
            centeredSlides : true,
            slidesPerView : 3
          })
        })
      }
    })
  },
  methods: {
    handleToBack(){
      this.$router.back()
    },
    moviesMsg(index) {
      this.img = this.movies[index].img.replace(/w\.h/,'148.208')
      this.nm = this.movies[index].nm
      this.sc = this.movies[index].sc
      this.desc = this.movies[index].desc
      this.dur = this.movies[index].dur
      this.shows = this.movies[index].shows
      let pList = this.shows[0].plist

      pList.forEach( (item) => {
        let dt = item.dt,
        tm = item.tm,
        end_time = this.handleTimer(this.dur, dt, tm)

        item.et = end_time
      })
      this.pList = pList
    },
    toIndex(index) {
      this.nums = index
      let pList = this.shows[index].plist

      pList.forEach( (item) => {
        let dt = item.dt,
        tm = item.tm,
        end_time = this.handleTimer(this.dur, dt, tm)

        item.et = end_time
      })
      this.pList = pList
    },
    handleTimer(dur, dt, tm){
      let dts = dt.split('-'),
      tms = tm.split(':'),
      date = new Date(dts[0],dts[1],dts[2],tms[0],tms[1])

      date.setMinutes( date.getMinutes() + dur )
      let h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours(),
      m = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var nowTime = h + ":" + m
      return nowTime
    }
  }
}
</script>

<style lang="scss">
@import 'src/style/cinema';
@import 'src/style/common';
@font-face {
  font-family: stonefont;
  src: url('//vfile.meituan.net/colorstone/d5cd8ba8cd28f55dec1083326ec9e0553168.eot');
  src: url('//vfile.meituan.net/colorstone/d5cd8ba8cd28f55dec1083326ec9e0553168.eot?#iefix') format('embedded-opentype'),
      url('//vfile.meituan.net/colorstone/5384bf8d5bc3a9a6750ead510b6eefbb2084.woff') format('woff');
}
.stonefont {
  font-family: 'stonefont'
}
</style>
