<template>
  <div>
    <Header></Header>
    <div id="login">
      <dl class="list">
        <dd class="nav">
          <ul class="taba taban samfix noslide">
            <li :class="{ active: loginWay }" @click="loginWay = true">
              <a class="react">美团账号登录</a>
            </li>
            <li :class="{ active: !loginWay }" @click="loginWay = false">
              <a class="react">手机验证登录</a>
            </li>
            <div class="slide" style="width: 177.5px; left: 20px;"></div>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/navbar'
// import '@/config/rem'

export default {
  name: 'Mine',
  components: {
    Header
  },
  data() {
    return {
      loginWay: true,   // true 美团账号登录, false 手机验证登录
      // screenWidth: document.documentElement.clientWidth * 2
    }
  },
  // mounted() {
  //   window.onresize = () => {
	// 		return (() => {
	// 			window.screenWidth = document.documentElement.clientWidth
	// 			this.screenWidth = window.screenWidth * 2
	// 		})()
	// 	}
  // },
	// watch: {
	// 	screenWidth (val) {
	// 		if(!this.timer) {
	// 			this.screenWidth = val
	// 			this.timer = true
	// 			setTimeout(function () {
	// 				this.timer = false
	// 			}, 400)
	// 		}
	// 	}
	// },
  methods: {
    handleToBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>


a:active, a:hover { outline: 0 }
ul { padding: 0; margin: 0; list-style-type: none }
a { color: #df2d2d; text-decoration: none; outline: 0 }
a.react { display: block; color: inherit; height: 100%; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap }

.nav { text-align: center }

dl.list { 
  border-top: 1px solid #d6d6d6; border-bottom: 1px solid #d6d6d6; margin-top: .2rem; margin-bottom: 0; background-color: #fff;
  dt, dd { margin: 0; border-bottom: 1px solid #d6d6d6; overflow: hidden; font-size: inherit; font-weight: 400; position: relative }
  dt:last-child, dd:last-of-type { border-bottom: 0 }
  .dd-padding, dt, dd>.react { padding: 14px 10px }
  dd.poi-list-item>.react { padding-bottom: 10px; padding-top: 10px }
  dt { font-size: 17px; padding-bottom: 10px; color: #333 }
  .db { height: 40px; line-height: 40px; font-size: 15px }
  dd dl { margin: 0; margin-bottom: -1px; padding-left: 10px; border: 0 }
  dd dl>.dd-padding, dd dl dd>.react, dd dl>dt { padding-left: 0 }
  .db>.react { color: #df2d2d; padding: 0 10px }
}
dl.list:first-child { margin: 0; border-top: 0 }

.taba {
  display: -webkit-box; display: -ms-flexbox; padding-left: 10px; padding-right: 10px; position: relative; border-bottom: 4px solid #d6d6d6;
  li { display: block; text-align: center; -webkit-box-flex: 1; position: relative }
  li.active { color: #df2d2d }
}
.taba.noslide li.active:after { content: null }
.taba li.active:after { content: ''; display: block; position: absolute; bottom: -8px; border-bottom: 8px solid #df2d2d; width: 100% }
.taba li a.react { padding-top: .28rem; padding-bottom: .2rem }
.taba.noslide li.active:after { content: none }
.taba .slide { position: absolute; bottom: -4px; border-bottom: 4px solid #df2d2d; transition: left .2s ease-in }
</style>
