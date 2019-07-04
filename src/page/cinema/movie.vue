<template>
  <div>
    <Header :title=nm>
      <i class="icon-back" @touchstart="handleToBack"></i>
    </Header>
    <div class="body">
      <div class="movie-detail" @click="toDetail(detailMovie.id)">
        <div class="movie-filter"></div>
        <div class="poster-bg" :style="{ 'background-image' : 'url('+ img +')' }"></div>
        <div class="detail box-flex">
          <div class="poster">
            <img :src="posterImg" alt="">
          </div>
          <div class="content flex">
            <div class="title middle line-ellipsis">{{ nm }}</div>
            <div class="title-en-name line-ellipsis">{{ detailMovie.enm }}</div>
            <div class="score line-ellipsis" v-if="detailMovie.sc != 0">
              {{ detailMovie.sc | numFilter }}
              <span class="snum">({{ detailMovie.snum | changeFilter }}人评)</span>
            </div>
            <div class="score line-ellipsis" v-else>
              <span style="font-size: 14px;">{{ detailMovie.wish }}人想看</span>
            </div>
            <div class="type line-ellipsis">
              <span>{{ detailMovie.cat }}</span>
              <div class="type-group" v-if="detailMovie.version">
                <img src="../../images/sd-imax.png" class="sd-imax" style="width: 42px">
              </div>
            </div>
            <div class="src line-ellipsis">{{ detailMovie.src }}/{{ detailMovie.episodeDur }}分钟</div>
            <div class="pubDesc line-ellipsis">{{ detailMovie.pubDesc }}</div>
          </div>
        </div>
        <div class="arrow-g">
          <img src="../../images/arrow-g.png">
        </div>
      </div>
      <div id="showDays">
        <ul id="timeline" class="mb-line-b">
          <li class="showDay" v-for="(item, index) in showDays" @click="active(item, index)" :class="{ chosen: index == ins }">
            {{ item.date | dayFilter }}
          </li>
        </ul>
      </div>
      <div class="nav-wrap filter-nav-wrap" :style="{ top: top + 'px' }">
        <div class="tab mb-line-b">
          <div class="item line-ellipsis" @click="chooseType('region')" :class="{chosenTitle:sortBy == 'region'}">
            <span>{{ regionName }}</span>
            <span class="drop"></span>
          </div>
          <div class="item line-ellipsis" @click="chooseType('brand')" :class="{chosenTitle:sortBy == 'brand'}">
            <span v-if="brandId === -1">品牌</span>
            <span v-else>{{ brandName }}</span>
            <span class="drop"></span>
          </div>
          <div class="item line-ellipsis" @click="chooseType('special')" :class="{chosenTitle:sortBy == 'special'}">
            特色<span class="drop"></span>
          </div>
        </div>
        <div class="close-tab">
          <div class="tab-content">
            <div class="page special" v-show="sortBy == 'special'">
              <div id="special-content" style="height: 386.4px;">
                <div class="item-title">特色功能</div>
                <div class="item-list">
                  <div class="item" v-for="item in serviceList" @click="selectSpecialId('service',item.id)" :class="{chosen: item.id == serviceId}">{{ item.name }}</div>
                </div>
                <div class="item-title">特殊厅</div>
                <div class="item-list">
                  <div class="item" v-for="item in hallTypeList" @click="selectSpecialId('hallType',item.id)" :class="{chosen: item.id == hallTypeId}">{{ item.name }}</div>
                </div>
              </div>
              <div id="special-btn">
                <span class="btn" id="cancel-btn"  @click="cancelBtn">重置</span>
                <span class="btn" id="confirm-btn" @click="confirmBtn">确定</span>
              </div>
            </div>
            <div class="page brand" v-show="sortBy == 'brand'">
              <div id="brand-content" style="height: 386.4px;">
                <div class="item brand-list" v-for="item in brandList" @click="getId('brand', item.id, item.name)" :class="{chosen: item.id == brandId}">
                  <span class="brand-name">{{ item.name }}</span>
                  <span class="brand-count">{{ item.count }}</span>
                </div>
              </div>
            </div>
            <div class="page region" v-show="sortBy == 'region'">
              <div id="region-tab">
                <ul class="tab">
                  <li class="item" :class="{ chosen: regionWay }" @click="regionWay = true">商区</li>
                  <li class="item" :class="{ chosen: !regionWay }" @click="regionWay = false">地铁站</li>
                </ul>
              </div>
              <div id="region-list" style="height: 450.8px;">
                <div id="region-sidenav">
                  <div id="district" v-show="regionWay">
                    <div class="district-li item" v-for="(item, index) in districtList" :class="{chosen:item.id == districtId}" @click="selectDistrictId(item.id, index)">
                      {{ item.name }}({{ item.count }})
                    </div>
                  </div>
                  <div id="subway" v-show="!regionWay">
                    <div class="district-li item" v-for="(item, index) in lineList" :class="{chosen:item.id == lineId}" @click="selectLineId(item.id, index)">
                      {{ item.name }}({{ item.count }})
                    </div>
                  </div>
                </div>
                <div id="region-list-item">
                  <div id="filter-list" v-show="regionWay">
                    <div class="item" v-for="(item, index) in areaList" @click="getId('area',item.id, item.name)" :class="{ chosen: item.id == areaId }">
                      <span class="item-name">{{ item.name }}</span>
                      <span class="item-count">{{ item.count }}</span>
                    </div>
                  </div>
                  <div id="filter-list" v-show="!regionWay">
                    <div class="item" v-for="(item, index) in stationList" @click="getId('station',item.id, item.name)" :class="{ chosen: item.id == stationId }">
                      <span class="item-name">{{ item.name }}</span>
                      <span class="item-count">{{ item.count }}</span>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blacker" @click="closeWrap"></div>
      <div class="cinema-list cinema" :style="{ marginTop: mt + 'px' }">
      <div class="list-wrap" :style="{ minHeight: screenHeight + 'px' }">
        <div class="item mb-line-b" v-for="item in cinemaList" :key="item.id" @click="toShows(item.id)">
          <div class="title-block box-flex middle">
            <div class="title line-ellipsis">
              <span>{{ item.nm }}</span>
              <span class="price-block">
                <span class="price">{{ item.sellPrice }}</span>
                <span class="q">元起</span>
              </span>
            </div>
            <div class="location-block box-flex">
              <div class="flex line-ellipsis">{{ item.addr }}</div>
              <div class="distance">{{ item.distance }}</div>
            </div>
            <div class="flex"></div>
            <div class="label-block" v-if="item.tags">
              <div v-if="item.tag.allowRefund === 1" class="allowRefund">退</div>
              <div v-if="item.tag.endorse === 1" class="endorse">改签</div>
              <div v-if="item.tag.snack === 1" class="snack">小吃</div>
              <div v-if="item.tag.vipTag" class="vipTag">{{ item.tag.vipTag }}</div>
              <div class="hallType" v-if="item.tag.hallType" v-for="k in item.tag.hallType">{{ k }}</div>
            </div>
            <div class="discount-block" v-if="item.promotion.cardPromotionTag">
              <div>
                <div class="discount-label normal card">
                  <img src="../../images/card.png" alt="">
                </div>
                <div class="discount-label-text">{{ item.promotion.cardPromotionTag }}</div>
              </div>
            </div>
          </div>
          <div class="min-show-block disabled J-fload">
            <span>近期场次：</span>
            <span class="time-line">{{ item.showTimes }}</span>
          </div>
        </div>
      </div>
      <div class="more"></div>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/head'

export default {
  name: 'CinemaMovie',
  components: {
    Header
  },
  props: ['movieId'],
  data() {
    return {
      detailMovie: [],
      nm: '',
      img: '',
      posterImg: '',
      showDays: [],
      ins: 0,
      cinemaList: [],
			sortBy: '',		// 筛选条件
			chosenBy: '',		// 选择条件
      regionWay: true,	// 全城 -> 商区 true / 地铁 false
      regionName: '全城',
      brandName: '',
      day: this.format(new Date(), "yyyy-MM-dd"),
      offset: 0,
      limit: 20,
      districtList: [],
      districtId: -1,
      lineList: [],
      lineId: -1,
      hallTypeList: [],
      hallType: -1,
      brandList: [],
      brandId: -1,
      serviceList: [],
      serviceId: -1,
      areaList: [],
      areaId: -1,
      stationList: [],
      stationId: -1,
      reqId: new Date().getTime()-25,
      cityId: this.$store.state.city.id,
      screenHeight: document.documentElement.clientHeight - 65,
      top: '',
      mt: ''
    }
  },
  mounted() {
    this.axios.get('/ajax/detailmovie?movieId=' + this.movieId).then( (res) => {
      if( res.status === 200 ) {
        this.detailMovie = res.data.detailMovie
        this.nm = this.detailMovie.nm
        this.img = this.detailMovie.img.replace('w.h','71.100')
        this.posterImg = this.detailMovie.img.replace('w.h','148.208')

        let rt = this.detailMovie.rt
        if( rt > this.day ) {
          this.forceUpdate(rt, true)
        } else {
          this.forceUpdate(this.day, true)
        }
      }
    })
    window.addEventListener('scroll', this.windowScroll)

    window.onresize = () => {
			return (() => {
				window.screenHeight = document.documentElement.clientHeight
				this.screenHeight = window.screenHeight - 65
			})()
		}
  },
	watch: {
		screenHeight (val) {
			if(!this.timer) {
				this.screenHeight = val
				this.timer = true
				setTimeout(function () {
					this.timer = false
				}, 400)
			}
		}
	},
  methods: {
    handleToBack() {
      this.$router.back()
    },
    toDetail(id){
      this.$router.push('/movie/' + id)
    },
    windowScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if( scrollTop >= 200 ) {
        document.querySelector('body').classList.add('fixedNav')
        this.top = 45
        this.mt = 86
      } else {
        document.querySelector('body').classList.remove('fixedNav')
        this.top = 0
        this.mt = 0
      }
    },
    active( item, index ){
      this.ins = index
      this.forceUpdate(item.date, false)
      this.day = item.date
      this.closeWrap()
    },
    forceUpdate(day, boolean){
      this.axios.post('/ajax/movie?forceUpdate=' + new Date().getTime(), {
        movieId: this.movieId,
        day: day,
        offset: 0,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId:-1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item: '',
        updateShowDay: boolean,
        reqId: this.reqId,
        cityId: this.cityId
      }).then( (res) => {
        if( res.status === 200 ) {

          if( boolean === true ) {
            this.showDays = res.data.showDays.dates
          }
          let cinemas = res.data.cinemas

          for( var i = 0; i < cinemas.length; i++ ) {
            var item = cinemas[i],
            allowRefund = item.tag.allowRefund,
            buyout = item.tag.buyout,
            cityCardTag = item.tag.cityCardTag,
            deal = item.tag.deal,
            endorse = item.tag.endorse,
            hallTypeVOList = item.tag.hallTypeVOList,
            snack = item.tag.snack,
            vipTag = item.tag.vipTag
            
            if( allowRefund === 0 && buyout === 0 && cityCardTag === 0 && deal === 0 && endorse === 0 && hallTypeVOList.length === 0 && snack === 0 && vipTag === undefined ) {
              item.tags = false
            }else {
              item.tags = true
            }
          }
          this.cinemaList = cinemas
        }
      })
    },
    closeWrap(){
      if ( !(event.target).closest('.close-tab') ) {
        this.sortBy = false
        document.querySelector('body').classList.remove('fixed')
      }
    },
		chooseType(type) {
			var ci = this.$store.state.city.id

			if( this.sortBy !== type ) {
        this.sortBy = type
        document.querySelector('body').classList.add('fixed')
      } else {
        this.sortBy = ''
        document.querySelector('body').classList.remove('fixed')
			}

			this.axios.get('/ajax/filterCinemas?movieId=' + this.movieId + '&day=' + this.day).then( (res)=>{
				switch(type) {
					case 'region':
            this.districtList = res.data.district.subItems
            this.lineList = res.data.subway.subItems
						break
					case 'brand':
						this.brandList = res.data.brand.subItems
						break
					case 'special':
						this.serviceList = res.data.service.subItems
						this.hallTypeList = res.data.hallType.subItems
						break
				}
      })
		},
		selectDistrictId(id, index) {
      this.districtId = id
      if ( index === 0 ) {
        this.areaId = -1
        this.areaList = ''
        this.regionName = '全城'
        this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId=-1'+'&lineId=-1'+'&hallType=-1'+'&brandId=-1'+'&serviceId=-1'+'&areaId=-1'+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
          this.cinemaList = res.data.cinemas
        })
        this.sortBy = ''
        document.querySelector('body').classList.remove('fixed')
      }else {
        this.areaList = this.districtList[index].subItems
      }
    },
		selectLineId(id, index) {
      this.lineId = id
      if ( index === 0 ) {
        this.lineId = -1
        this.lineList = ''
        this.regionName = '全城'
        this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId=-1'+'&lineId=-1'+'&hallType=-1'+'&brandId=-1'+'&serviceId=-1'+'&areaId=-1'+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
          this.cinemaList = res.data.cinemas
        })
        this.sortBy = ''
        document.querySelector('body').classList.remove('fixed')
      }else {
        this.stationList = this.lineList[index].subItems
      }
    },
    getId(el, id, name) {
      if(el == 'area') {
        this.areaId = id
        this.regionName = name
        this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId='+this.districtId+'&lineId=-1'+'&hallType=-1'+'&brandId=-1'+'&serviceId=-1'+'&areaId='+id+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
          this.cinemaList = res.data.cinemas
        })
      } else if (el == 'station') {
        this.stationId = id
        this.regionName = name
        this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId=-1'+'&lineId='+this.lineId+'&hallType=-1'+'&brandId=-1'+'&serviceId=-1'+'&areaId=-1'+'&stationId='+id+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
          this.cinemaList = res.data.cinemas
        })
      } else if (el == 'brand'){
        this.brandId = id
        this.brandName = name
        this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId=-1'+'&lineId=-1'+'&hallType=-1'+'&brandId='+this.brandId+'&serviceId=-1'+'&areaId=-1'+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
          this.cinemaList = res.data.cinemas
        })
      }
      this.sortBy = ''
      document.querySelector('body').classList.remove('fixed')
    },
		selectSpecialId(el,id){
      if( el == 'service'){
        this.serviceId = id
      }else {
        this.hallTypeId = id
      }
		},
		cancelBtn(){
			this.serviceId = -1
			this.hallTypeId = -1
		},
		confirmBtn(){
			this.axios.get('/ajax/cinemaList?day='+this.day+'&districtId=-1'+'&lineId=-1'+'&hallType='+this.hallTypeId+'&brandId='+this.brandId+'&serviceId='+this.serviceId+'&areaId=-1'+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
				this.cinemaList = res.data.cinemas
			})
			this.sortBy = ''
			document.querySelector('body').classList.remove('fixed')
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
    },
    changeFilter(x) {
      let y = ''
      if( x > 10000 ) {
        x = x/10000
        y = parseFloat(x).toFixed(1) + '万'
      } else {
        y = x
      }
      return y
    },
    dayFilter(date) {
      function GetDateStr( AddDayCount ){
        var dd = new Date();
        dd.setDate( dd.getDate() + AddDayCount );
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;
        var d = dd.getDate();
        return y + "-" + ( m < 10 ? '0' + m : m ) + "-" + ( d < 10 ? '0' + d : d );
      }
      var week = ''
      switch( new Date(date).getDay() ) {
        case 0: 
          week = '周日'
          break;
        case 1: 
          week = '周一'
          break;
        case 2:
          week = '周二'
          break;
        case 3:
          week = '周三'
          break;
        case 4:
          week = '周四'
          break;
        case 5:
          week = '周五'
          break;
        case 6:
          week = '周六'
          break;
      }
      var str = date.split('-'),
      time = str[1] + '月' + str[2] + '日'
      if ( GetDateStr(0) == date ){
        return '今天' + time
      }if ( GetDateStr(1) == date ){
        return '明天' + time
      }if ( GetDateStr(2) == date ){
        return '后天' + time
      }else {
        return week + time
      }
    }
  }
}
</script>

<style lang="scss">
@import 'src/style/common';
</style>
