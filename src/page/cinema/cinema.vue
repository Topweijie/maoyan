<template>
  <div>
    <Header title="影院" />
    <div class="body">
      <section class="topbar">
        <div class="gray-bg topbar-bg">
          <router-link tag="div" to="/city-list" class="city-entry">
            <span class="city-name">{{ $store.state.city.nm }}</span>
            <i class="city-entry-arrow"></i>
          </router-link>
          <router-link tag="div" to="/search" class="search-entry search-input">
            <img src="../../images/search.png">
            <span>搜影院</span>
          </router-link>
        </div>
      </section>
      <section class="cinema singleton page active" :style="{ width: screenHeight + 'px' }">
        <div class="page-wrap fix-nav">
          <div class="swiper-header cinema-ad"></div>
          <div class="nav-wrap filter-nav-wrap" style="top: 95px">
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
          <div class="cinema-list" style="margin-bottom: 55px; margin-top: 40px;">
            <div class="list-wrap" style="min-height: 696px;margin-top:0">
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
                    <div class="hallType" v-if="item.tag.hallType" v-for="k in item.tag.hallType">{{k}}</div>
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
              </div>
            </div>
            <div class="more"></div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header/head'
import Footer from '@/components/footer/foot'

export default {
  name: 'Cinema',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight - 44,
      cinemaList: [],
			day: this.format(new Date(), "yyyy-MM-dd"),
			reqId: new Date().getTime(),
			cityId: this.$store.state.city.id,
			sortBy: '',		// 筛选条件
			chosenBy: '',		// 选择条件
			regionWay: true,		// 全城 -> 商区 true / 地铁 false
			districtList: [],
			districtId: -1,
			areaList: [],
      areaId:-1,
      regionName: '全城',
			lineList: [],
			lineId: -1,
			stationList: [],
      stationId: -1,
			brandList: [],
			brandId: -1,
			brandName: '',
			serviceList: [],
			serviceId: -1,
			hallTypeList: [],
      hallTypeId: -1,
      limit: 20,
      offset: 0
    }
  },
  mounted() {
    this.axios.get('/ajax/cinemaList?day='+this.day+'&offset='+this.offset+'&limit='+this.limit+'&districtId=-1'+'&lineId=-1'+'&hallType=-1'+'&brandId=-1'+'&serviceId=-1'+'&areaId=-1'+'&stationId=-1'+'&reqId='+this.reqId+'&cityId='+this.cityId).then( (res)=>{
      let ciList = res.data.cinemas

      for( var i = 0; i < ciList.length; i++ ) {
        var item = ciList[i],
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
      this.cinemaList = ciList
    })

    window.onresize = () => {
			return (() => {
				window.screenHeight = document.documentElement.clientHeight
				this.screenHeight = window.screenHeight - 44
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

			this.axios.get('/ajax/filterCinemas?ci='+ci).then( (res)=>{
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
    toShows(cinemaId) {
      this.$router.push('/shows/' + cinemaId)
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
.topbar .search-input {
  display:-webkit-box;
  display:flex;
  -webkit-box-pack:center;
  justify-content:center;
  -webkit-box-align:center;
  align-items:center;
  height:28px;
  font-size:13px;
  color:#b2b2b2;
  margin-left:18px;
  border:.5px solid #e6e6e6;
  border-radius:5px;
  margin-right:15px
}
</style>
