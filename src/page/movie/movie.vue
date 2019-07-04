<template>
  <div>
    <Header />
    <div class="body">
      <section class="topbar">
        <div class="white-bg topbar-bg">
					<router-link tag="div" to="/city-list" class="city-entry">
						<span class="city-name">{{ $store.state.city.nm }}</span>
						<i class="city-entry-arrow"></i>
					</router-link>
					<div class="switch-hot">
						<router-link tag="div" to="/movie/nowPlaying" class="hot-item">正在热映</router-link>
						<router-link tag="div" to="/movie/comingSoon" class="hot-item">即将上映</router-link>
					</div>
					<router-link tag="div" to="/search" class="search-entry search-icon"></router-link>
				</div>
      </section>
      <section class="singleton page active" :style="{ width: screenHeight + 'px' }">
        <div class="page-wrap">
          <div class="swiper-header movie-ad"></div>
          <div class="tab-block">
            <div class="tab-content">
              <keep-alive>
                <router-view />
              </keep-alive>
            </div>
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
  name: 'Movie',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight - 44
    }
  },
  mounted() {
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
	}
}
</script>

<style lang="scss">
@import 'src/style/common';
@import 'src/style/index';
.switch-hot .hot-item.router-link-active { color: #ef4238; border-bottom: 2px solid #ef4238; transition: left .2s; margin-bottom: -1px }
</style>
