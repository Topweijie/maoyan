<template>
  <div>
    <Header :title=nm></Header>
    <div class="movie-page">
      <section class="movie-header">
        <div class="movie">
          <div class="movie-background" :style="{ 'background-image' : 'url('+ img +')' }"></div>
          <div class="movie-filter"></div>
          <div class="movie-container clearfix">
            <div class="movie-cover movie-with-video">
              <a class="link">
                <img :src="img" alt="">
              </a>
            </div>
            <div class="movie-content">
              <div class="movie-name text-ellipsis">
                <span> </span>
                <span>{{ nm }}</span>
              </div>
              <div class="movie-ename text-ellipsis">{{ detailMovie.enm }}</div>
              <div class="movie-score">
                <div class="released-score" v-if="detailMovie.rt < nowTime && detailMovie.sc != 0">
                  <div class="rating">
                    <img class="img noneBg" src="" alt="">
                    <span>{{ detailMovie.sc | numFilter }}</span>
                  </div>
                  <div class="score-num">
                    <span></span>
                  </div>
                </div>
                <div class="noreleased-score" v-if="detailMovie.rt > nowTime && detailMovie.sc != 0">
                  <span>点映评分 </span>
                  <span class="score">{{ detailMovie.sc | numFilter }}</span>
                  <div class="score-num"> ({{ detailMovie.snum | changeFiilter }}人评分)</div>
                  <div class="wish-num">{{ detailMovie.wish }}人想看</div>
                </div>
                <div class="noreleased-noscore" v-else-if="detailMovie.rt > nowTime && detailMovie.sc == 0">
                  <div class="wish-num">
                    <span class="number">{{ detailMovie.wish }}</span>
                    <span>人想看</span>
                  </div>
                </div>
              </div>
              <div class="movie-category">
                <span class="movie-cat">{{ detailMovie.cat }}</span>
                <div class="movie-tag" v-if="detailMovie.version != ''">
                  <div class="union-tag">
                    <span class="tag-d">3D</span>
                    <span class="tag-imax">IMAX</span>
                  </div>
                </div>
              </div>
              <div class="movie-content-row">{{ detailMovie.src }} / {{ detailMovie.episodeDur }} 分钟</div>
              <div class="movie-content-row">{{ detailMovie.pubDesc }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-seperate section-expander">
        <a href="" class="link btn btn-block btn-pay"><span>特惠购票</span></a>
        <div class="text-expander" :class="{'text-expander-expand-false' : flag, 'text-expander-expand-true' : !flag }">
          <div class="text-expander-content">
            <p>{{ detailMovie.dra }}</p>
          </div>
          <div class="text-wxpander-button" @click="showTag">
            <span :class="{ 'drop-bottom': flag, 'drop-top': !flag }"></span>
          </div>
        </div>
      </section>
      <section class="section-media section-seperate">
        <h3>媒体库</h3>
        <ul class="movie-stages view-scroll-x-container">
          <li class="stage-img-container video">
            <a href="" class="link">
              <img :src="detailMovie.videoImg" alt="" class="img noneBg">
            </a>
          </li>
          <li class="stage-img-container" v-for="item in detailMovie.photos">
            <a href="" class="link">
              <img :src="item | setWH('180.140')" alt="" class="img noneBg">
            </a>
          </li>
        </ul>
        <div class="link-group">
          <a href="" class="link-more link">
            <h4>
              <span>视频</span>
              <i class="icon icon-chevron-right"></i>
              <span class="link-num">{{ detailMovie.vnum }}</span>
            </h4>
          </a>
          <a href="" class="link-more link">
            <h4>
              <span>剧照</span>
              <i class="icon icon-chevron-right"></i>
              <span class="link-num">{{ detailMovie.pn }}</span>
            </h4>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/navbar'

export default {
  name: 'MovieDetail',
  components: {
    Header
  },
  props: ['movieId'],
  data() {
    return {
      detailMovie: [],
      nm: '',
      img: '',
      nowTime: '',
      flag: true
    }
  },
  mounted() {
    this.axios.get('/ajax/detailmovie?movieId=' + this.movieId).then( (res) => {
      if( res.status === 200 ) {
        this.detailMovie = res.data.detailMovie
        this.nm = this.detailMovie.nm
        this.img = this.detailMovie.img.replace('w.h','177.249')
        this.nowTime = this.format(new Date(), "yyyy-MM-dd")
      }
    })
  },
  methods: {
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
		},
    showTag() {
      this.flag = !this.flag
    }
  },
  filters: {
    numFilter(value) {
      var realVal = parseFloat(value).toFixed(1)
      return realVal
    },
    changeFiilter(x) {
      if ( x >= 10000 ){
        x = x/10000
        var y = x.toString().substr(0,3) + '万'
      }else {
        var y = x
      }
      return y
    }
  }
}
</script>

<style lang="scss" scoped>
.btn, .link, .navbar, .city { text-decoration: none; }
.link { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0) }
.img { border: 0; display: inline-block; background-size: 50% }
.img.noneBg { background: 0 0 }
.btn, .navload .btn-open { color: #fff; text-align: center; }
.btn { cursor: pointer; font-size: 16px; padding: 6px 12px; display: inline-block; border-radius: 4px; line-height: 1; background: #e54847; }
.btn-block { display: block; margin: 10px; padding: 10px; }
.rating { 
  display: inline-block; line-height: 1;
  span { margin-left: 5px }
  img { width: 18px; height: 18px; margin-left: 3px }
  img:first-child { margin-left: 0 }
}

.movie { color: #fff; padding: 15px; line-height: 1; overflow: hidden; position: relative; box-sizing: border-box; filter: blur(0) }
.movie-container { z-index: 1; position: relative }
.movie-cover { 
  float: left; width: 107px; height: 150px; filter: blur(0); font-style: initial; border: 1px solid #f0f2f3;
  img { width: 107px; height: 150px; vertical-align: top }
}
.movie-cover img { width: 107px; height: 150px; vertical-align: top }
.movie-cover.movie-with-video:after { content: '播'; color: #fff; right: 5px; bottom: 5px; font-size: 25px; position: absolute; width: 25px; height: 25px; line-height: 25px; border-radius: 100%; opacity: .7; background: #333 }
.movie-content { z-index: 2; padding-left: 122.5px; height: 150px }
.movie-name { font-size: 17px; line-height: 1.2; margin-top: 3px; margin-bottom: 4px }
.movie-ename { font-size: 12px; opacity: .8; height: 11px; margin-bottom: 6px }
.movie-score {
  color: #f90; font-size: 16px; margin-bottom: 6px;
  .rating { 
    font-size: 18px;
    span { margin-left: 8px }
  }
  .released-score {
    padding-top: 1px; color: #ffc600;
    .score-num { color: #fff; opacity: .7; font-size: 9px; margin-top: 4px; margin-bottom: 8px }
  }
  .released-noscore { display: block; margin: 12px 0 14px; font-size: 14px; color: rgba(255, 255, 255, .7) }
  .noreleased-score {
    font-size: 15px; color: #ffc600;
    .score { font-size: 17px; }
    .score-num { margin-left: 4px; display: inline; font-size: 9px; color: rgba(255, 255, 255, .7) }
    .wish-num { color: rgba(255, 255, 255, .6); font-size: 12px; opacity: .8; margin-top: 4px; }
  }
  .noreleased-noscore {
    margin: 12px 0 14px; font-size: 15px;
    .number { font-size: 17px }
  }
  .score-num { margin-top: 6px; font-size: 11px; }
  // .no-score { line-height: 3px }
}
.movie-background, .movie-filter { top: 0; right: 0; width: 100%; position: absolute; left: 0; bottom: 0 }
.movie-background { z-index: 0; filter: blur(30.9px); background-size: cover; background-repeat: no-repeat; background-position-y: 40%; background-image: gray }
.movie-filter { background-color: #40454d; opacity: .55 }
.text-expander { cursor: pointer; font-size: 15px; background-color: #fff; }
.text-expander-content { 
  margin: 0; line-height: 20px; text-overflow: ellipsis; overflow: hidden; 
  p { font-size: 15px; margin: 0; }
}
.text-wxpander-button { color: #aaa; text-align: center; height: 22px; }
.text-expander-expand-false .text-expander-content { max-height: 58px; }
.text-expander-expand-true .text-expander-content { max-height: 5000px !important; }
.drop-bottom { display: inline-block; border: 8px solid transparent; border-top-color: #b0b0b0; vertical-align: middle; }
.drop-top { display: inline-block; border: 8px solid transparent; border-bottom-color: #b0b0b0; vertical-align: top; }

.movie-page {
  background: #f4f4f4; position: relative; z-index: 1; margin: 0; color: #555; min-width: 159.65px; -webkit-user-select:none; -webkit-tap-highlight-color:rgba(255, 255, 255, 0); font: 14px/1.5 Arial, Helvetica, sans-serif;
  section { 
    background: #fff; border-bottom: 1px solid #e5e5e5;
    h3 { margin: 0; color: #666; font-size: 15px; padding: 10px 15px; border-bottom: 1px solid #e5e5e5 }
    .link-more { 
      display: block; line-height: 40px;
      h4 { position: relative; color: #666; margin: 0; font-weight: lighter }
      .icon { color: #aaa; float: right; line-height: inherit; vertical-align: middle; margin-top: 2px; font-size: 11px }
    }
  }
  section.section-seperate { border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; margin: 10px 0; }
  .section-media h3 { border-bottom: none }
  .section-expander { 
    position: relative; margin-top: 0 !important; padding: 15px 15px 0;
    .btn { margin: 0 0 10px; border-radius: 25px }
  }
  .movie-header { padding: 0; background: #f8f8f8; border-bottom: none }
  .movie-stages {
    padding-left: 15px; margin: 0; overflow: scroll; white-space: nowrap;
    .stage-img-container {
      list-style: none; display: inline-block; overflow: hidden; width: 90px; height: 70px; margin-left: 5px;
      a { display: block }
      img { width: 90px; height: 70px; background-size: 40px }
    }
    .stage-img-container.video {
      width: auto; position: relative; margin: 0 5px 0 0;
      img { width: 125px; height: 70px; margin-top: 0 }
    }
    .stage-img-container.video:after { content: '播'; color: #fff; right: 5px; font-size: 20px; position: absolute; width: 20px; height: 20px; line-height: 20px; border-radius: 100%; opacity: .7; background: #333 }
  }
  .link-group {
    width: 100%; display: table; padding-left: 15px; box-sizing: border-box;
    .link { margin: 0 15px 0 10px }
    .link:first-child { width: 125px; display: table-cell; margin: 0 10px 0 15px }
    .link-num { float: right; margin-right: 10px }
  }
  .clearfix:after { clear: both; content: ' '; display: block; font-size: 0; line-height: 0; visibility: hidden; width: 0; height: 0 }
  .movie-celebrities { 
    width: 100%; padding: 15px 0 5px 15px; margin: 0; list-style: none; overflow-x: scroll; white-space: nowrap; box-sizing: border-box;
    li { padding: 0 1.5px; text-align: center; display: inline-block }
    li:first-child, li:first-child img { padding-left: 0 }
    li:first-child span { width: 66.5px }
    img { width: 65px; height: 90px; margin: 2px }
    span { width: 70px; display: block; font-size: 11px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis }
    a { color: #000; text-decoration: none; }
  }
  .movie-celebrities-roles { color: #999; font-size: 10.24px; }
}



.movie-category, .movie-content-row {
  font-size: 12px; margin-bottom: 6.18px;
}
.movie-category {
  .movie-cat { opacity: .7; vertical-align: middle; }
}
.movie-tag {
  display: inline-block; font-size: 0; margin-left: 3px;
  .tag-d, .tag-d-only { background-color: rgba(255, 255, 255, .4); display: inline-block; }
  .tag-d, .tag-d-only, .tag-imax { box-sizing: border-box; font-size: 12px; height: 13px; line-height: 13px; text-align: center; color: #fff; }
  .tag-d { width: 16px; vertical-align: bottom; border-top-left-radius: 2px; border-bottom-left-radius: 2px; }
  .tag-imax { display: inline-block; width: 27px; border: 1px solid rgba(255, 255, 255, .4); line-height: 11px; border-top-right-radius: 2px; border-bottom-right-radius: 2px;  }
}
.movie-content-row { opacity: .7; }
</style>
