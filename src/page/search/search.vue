<template>
  <div class="body">
    <Header>
      <i class="icon-back" @touchstart="handleToBack"></i>
    </Header>
    <div class="search-wrapper">
      <div class="search-header">
        <div class="input-wrapper">
          <img class="search-icon" src="../../images/search.png">
          <input class="search-input" type="text" placeholder="搜电影、搜影院" v-model="searchValue" @input="checkInput">
          <img class="del-input" src="../../images/close.png" v-if="seen" @click="clearAll">
        </div>
        <div class="cancel" @click="goTo('/movie')">取消</div>
      </div>
      <div class="search-history" v-if="showHistory">
        <div class="history-item" v-for="(item, index) in historyList">
          <span class="history-icon"></span>
          <span class="word one-line">{{ item }}</span>
          <span class="del-word" @click="deleteHistory(index)"></span>
        </div>
      </div>
      <div class="search-result" v-if="seen">
        <div class="result-wrapper">
          <div class="result">
            <h3>电影/电视剧/综艺</h3>
            <div class="list">
              <div class="movie cell" v-for="item in moviesList" :key="item.id">
                <img :src="item.img | setWH('128.189')" class="poster">
                <div class="info">
                  <div class="name-score">
                    <p class="name">
                      <span class="one-line">{{ item.nm }}</span>
                      <span class="version v3d imax" v-if="item.version != ''"></span>
                    </p>
                    <span class="score">
                      <span class="num">{{ item.sc }}</span>分
                    </span>
                  </div>
                  <div class="detail-section">
                    <div class="detail-items">
                      <p class="ename one-line">{{ item.enm }}</p>
                      <p class="catogary">{{ item.cat }}</p>
                      <p class="release">{{ item.rt }}</p>
                    </div>
                    <div class="buy-btn sale" v-if="item.showst === 3">购票</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="more-result">查看全部{{ moviesTotal }}部影视剧</div>
          </div>
          <div class="result">
            <h3>影院</h3>
            <div class="list">
              <div class="cinema cell" v-for="(item, index) in cinemasList" v-if="index < 3">
                <div class="info">
                  <p class="name-price">
                    <span class="name one-line">{{ item.nm }}</span>
                    <span class="sell-price">
                      <span class="price">{{ item.sellPrice }}</span>元起
                    </span>
                  </p>
                  <p class="address one-line">{{ item.addr }}</p>
                  <p class="feature-tags">
                    <span v-if="item.sell">座</span>
                    <span v-if="item.hallType" v-for="k in item.hallType">{{k}}</span>
                    <span v-if="item.allowRefund === 1">退</span>
                    <span v-if="item.endorse === 1">改签</span>
                    <span class="featrue" v-if="item.snack === 1">小吃</span>
                    <span class="featrue" v-if="item.vipDesc != ''">折扣卡</span>
                  </p>
                </div>
                <div class="distance">{{ item.distance }}</div>
              </div>
            </div>
            <div class="more-result">查看全部{{ cinemasTotal }}家电影院</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/head'
export default {
  name: 'Search',
  components: {
    Header
  },
  data() {
    return {
      searchValue: '',
      seen: false,
      cityId: this.$store.state.city.id,
      cinemasTotal: '',
      cinemasList: [],
      moviesTotal: '',
      moviesList: [],
      showHistory: false,
      historyList: []
    }
  },
  watch: {
    searchValue( val ) {
      val = val.trim()
      if( val !== '' ) {
        this.seen = true
        this.showHistory = false
      } else {
        this.seen = false
        this.showHistory = true
      }
      this.axios.get('/ajax/search?kw=' + val + '&cityId='+ this.cityId +'&stype=-1').then( (res) => {
        var cinemas = res.data.cinemas,
        movies = res.data.movies;

        if(movies && cinemas) {
          this.moviesList = movies.list
          this.moviesTotal = movies.total

          this.cinemasList = cinemas.list
          this.cinemasTotal = cinemas.total
        }
      })
      
      if( this.historyList.length > 0 && val != '') {
        if( this.historyList.indexOf(val) !== -1 ) {
          this.historyList.splice(this.historyList.indexOf(val), 1)
          this.historyList.unshift(val)
        } else {
          this.historyList.unshift(val)
        }
      } else {
        this.historyList.unshift(val)
      }
      if( this.historyList.length > 6 ) {
        this.historyList.pop()
      }
      localStorage.setItem('search', JSON.stringify(this.historyList))
    }
  },
  mounted() {
    var history = localStorage.getItem('search')
    if( history ) {
      this.historyList = JSON.parse(history)
      this.showHistory = true
    } else {
      this.showHistory = false
    }
  },
  methods: {
    handleToBack(){
      this.$router.back()
    },
    clearAll(){
      this.searchValue = ''
      this.seen = false
    },
    checkInput() {
      this.showHistory = true
    },
    deleteHistory(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('search', JSON.stringify(this.historyList))
    },
    goTo(path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss">
// @import 'src/style/common';
@import 'src/style/search';
input { outline: none }
</style>
