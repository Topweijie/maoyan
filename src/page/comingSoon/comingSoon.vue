<template>
  <div class="page active">
    <div class="list-wrap">
      <div class="most-expected">
        <p class="title">近期最受期待</p>
        <div class="most-expected-list">
          <div class="expected-item" v-for="item in mostExpected" @click="handleToDetail(item.id)">
            <div class="poster default-img-bg">
              <img :src="item.img | setWH('170.244')" alt="">
              <span class="wish-bg"></span>
              <span class="wish">
                <span class="wish-num">{{ item.wish }}</span>人想看
              </span>
              <div class="toggle-wish" :data-wishst="item.wishst"><span></span></div>
            </div>
            <h5 class="name line-ellipsis">{{ item.nm }}</h5>
            <p class="date">{{ item.comingTitle | substrFilter }}</p>
          </div>
        </div>
      </div>
      <div class="coming-list">
        <div v-for="item in comingList">
          <p class="group-date">{{ item.comingTitle }}</p>
          <div class="item" v-for="item in item.data" @click="handleToDetail(item.id)">
            <div class="main-block">
              <div class="avatar">
                <div class="default-img-bg">
                  <img :src="item.img | setWH('128.183')" />
                </div>
              </div>
              <div class="content-wrapper mb-outline-b">
                <div class="content">
                  <div class="box-flex movie-title">
                    <div class="title line-ellipsis">{{ item.nm }}</div>
                    <span class="version" v-if="item.version != ''" v-bind:class="item.version" ></span>
                  </div>
                  <div class="detail">
                    <div class="score line-ellipsis" v-if="item.sc != 0">
                      <span class="score-suffix">点影评</span>
                      <span class="grade">{{ item.sc | numFilter }}</span>
                    </div>
                    <div class="score line-ellipsis" v-else>
                      <span class="grade">{{ item.wish }}</span>
                      <span class="score-suffix">人想看</span>
                    </div>
                    <div class="actor line-ellipsis" v-if="item.star">主演：{{ item.star }}</div>
                    <div class="actor line-ellipsis">{{ item.rt }}上映</div>
                  </div>
                </div>
                <div class="button-block">
                  <div class="btn pre" v-if="item.showst != 1">预售</div>
                  <div class="btn toggle-wish-btn" :data-wishst="item.wishst" v-else>想看</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  data(){
    return {
      mostExpected: [],
      comingList: [],
      cityId: this.$store.state.city.id
    }
  },
  activated() {
    this.axios.get('/ajax/mostExpected?ci='+ this.cityId +'&limit=10&offset=0&token=').then( (res) => {
      this.mostExpected = res.data.coming
      var paging = res.data.paging
    })
		
		this.axios.get('/ajax/comingList?ci='+ this.cityId +'&token=&limit=10').then( (res) => {
      var coming = res.data.coming,
      map = {},
      dest = [];
      for(var i = 0; i < coming.length; i++){
        var ai = coming[i];
        if(!map[ai.comingTitle]) {
          dest.push({
            comingTitle: ai.comingTitle,
            data: [ai]
          })
          map[ai.comingTitle] = ai
        }else {
          for(var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if(dj.comingTitle == ai.comingTitle) {
              dj.data.push(ai)
              break;
            }
          }
        }
      }
      this.comingList = dest
		})
  },
  methods: {
    handleToDetail(id){
      this.$router.push('/movie/' + id)
    }
  },
  filters: {
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(1)
      return realVal
    },
    substrFilter(date) {
      date = date.substr(0, date.length-3)
      return date
    }
  }
}
</script>

<style>

</style>
