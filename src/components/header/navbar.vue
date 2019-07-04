<template>
	<div class="navbar">
    <nav>
      <div class="navbar-logo" @touchstart="handleToBack"><a class="navbar-back"></a></div>
		  <div class="navbar-title">{{ title }}</div>
    </nav>
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: {
		title: {
			type: String,
			default: '猫眼电影'
		}
	},
  methods: {
    handleToBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.navbar, .navbar nav { display: -webkit-box }
.navbar, .navbar-title { position: relative; overflow: hidden }
.navbar { top: 0; z-index: 10; background-color: #e54847!important; padding: 6px; height: 38px }
.navbar nav { width: 100% }
.navbar-logo { width: 100px; background-size: 37% }
.navbar-back:after { content: ''; top: 16px; left: 12px; width: 13px; height: 13px; position: absolute; border: 2px solid #fff; border-width: 0 0 2px 2px; transform: rotate(45deg) }
.navbar-title { -webkit-box-flex: 1; color: #fff; font-size: 18px; text-align: center; line-height: 2; text-overflow: ellipsis; white-space: nowrap; left: -50px }
</style>
