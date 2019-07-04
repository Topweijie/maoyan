<template>
  <div class="body">
    <section id="city-list" class="city-list-container" ref="city_List">
      <section>
        <div id="locate" class="city-title">定位城市</div>
        <div class="city-list city-list-inline clearfix">
          <div class="location-city">定位失败，请点击重试</div>
        </div>
      </section>
      <section class="history-city-list" v-if="showHistory">
        <div id="history" class="city-title">最近访问城市</div>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" v-for="item in historyList.data" @click="handleToCity(item.cityname, item.cityid)">{{ item.cityname }}</div>
        </div>
      </section>
      <section>
        <div id="hot" class="city-title">热门城市</div>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm, item.id)">{{ item.nm }}</div>
        </div>
      </section>
      <section ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <div class="city-title city-title-letter">{{ item.index }}</div>
          <div class="city-list city-list-block clearfix">
            <div class="city-item" v-for="itemList in item.list" :key="itemList.id" @click="handleToCity(itemList.nm, itemList.id)">{{ itemList.nm }}</div>
          </div>
        </div>
      </section>
      <section class="nav">
        <div class="nav-item" @touchstart="jump('locate')">定位</div>
        <div class="nav-item" @touchstart="jump('history')" v-if="showHistory">最近</div>
        <div class="nav-item" @touchstart="jump('hot')">热门</div>
        <div class="nav-letter nav-item" v-for="(item, index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'City',
  data() {
    return {
      cityList: [],
      hotList: [],
      historyList: {},
      showHistory: true
    }
  },
  mounted() {
    var cities = window.localStorage.getItem('cityList');
    var hotList = [
      { id: 10, nm: '上海' },
      { id: 1, nm: '北京' },
      { id: 20, nm: '广州' },
      { id: 30, nm: '深圳' },
      { id: 57, nm: '武汉' },
      { id: 40, nm: '天津' },
      { id: 42, nm: '西安' },
      { id: 55, nm: '南京' },
      { id: 50, nm: '杭州' },
      { id: 59, nm: '成都' },
      { id: 45, nm: '重庆' }
    ]
    this.hotList = hotList

    if( cities ) {
      let Manyan_cityList = JSON.parse( cities )
      this.cityList = this.formatCityList(Manyan_cityList.data)
    }else {
      this.axios.get('/dianying/cities.json').then( (res) => {
        let city = {
          data: res.data.cts,
          expire_at: this.format(new Date(), "yyyy/MM/dd HH:mm:ss")
        }
        window.localStorage.setItem('cityList', JSON.stringify(city));
        this.cityList = this.formatCityList(res.data.cts)
      })
    }

    let history = localStorage.getItem('historyCity')
    if(history) {
      this.historyList = JSON.parse(history)
    } else {
      this.showHistory = false
    }
  },
  methods: {
    formatCityList( cities ) {
      var cityList = [];

      for( var i = 0; i < cities.length; i++ ) {
        var firstLetter = cities[i].py.substring(0,1).toUpperCase();
        if( toCom(firstLetter) ) {
          cityList.push({ index: firstLetter, list: [ { nm: cities[i].nm, id: cities[i].id } ] });
        }else {
          for( var j = 0; j < cityList.length; j++ ) {
            if( cityList[j].index === firstLetter ) {
              cityList[j].list.push( { nm: cities[i].nm, id: cities[i].id } )
            }
          }
        }
      }

      cityList.sort( (n1, n2) => {
        if( n1.index > n2.index ) {
          return 1
        }else if( n1.index < n2.index ) {
          return -1
        }else {
          return 0
        }
      })

      function toCom( firstLetter ) {
        for( var i = 0; i < cityList.length; i++ ) {
          if( cityList[i].index === firstLetter ) {
            return false;
          }
        }
        return true;
      }
      
      return cityList
    },
    handleToIndex( index ) {
      var nm = this.$refs.city_sort.getElementsByClassName('city-title-letter')
      this.$refs.city_sort.parentNode.scrollTop = nm[index].offsetTop
    },
    jump(el) {
      document.querySelector("#"+el).scrollIntoView(true);
    },
    handleToCity( nm, id ) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      window.localStorage.setItem('nowNm', nm)
      window.localStorage.setItem('nowId', id)
      this.$router.push('/movie/nowPlaying')

      let history = localStorage.getItem('historyCity')
      if( history ) {
        let checkrepeat = false;
        this.historyList = JSON.parse(history)
        this.historyList.data.forEach( (item, index) => {
          if( item.cityid === id && item.cityname === nm ) {
            this.historyList.data.splice(index, 1)
            this.historyList.data.unshift({ cityid: id, cityname: nm, selectci: true })
            checkrepeat = true
          }
        })
        if( !checkrepeat ) {
          this.historyList.data.unshift({ cityid: id, cityname: nm, selectci: true })
        }
      } else {
        this.historyList.expire_at = this.format(new Date(), "yyyy/MM/dd HH:mm:ss")
        this.historyList.data = []
        this.historyList.data.push({ cityid: id, cityname: nm, selectci: true })
      }
      if( this.historyList.data.length > 3 ){
        this.historyList.data.pop()
      }
      localStorage.setItem('historyCity', JSON.stringify(this.historyList))
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
  }
}
</script>

<style lang="scss">
@import 'src/style/common';
@import 'src/style/index';
</style>
