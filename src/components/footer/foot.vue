<template>
  <div class="bottom-nav-bar">
    <router-link tag="div" to="/movie" class="nav-icon-wrapper">
      <span class="nav-icons">
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <title>电影1</title>
          <g fill="#696969" fill-rule="evenodd">
            <path d="M 24.994 47 c -0.71 0 -1.422 -0.034 -2.136 -0.102 C 12.445 45.913 4.14 37.645 3.11 27.24 c -0.657 -6.63 1.65 -13.115 6.332 -17.796 c 4.68 -4.68 11.162 -6.992 17.796 -6.333 c 10.36 1.027 18.624 9.29 19.65 19.65 c 0.592 5.984 -1.192 11.796 -5.022 16.365 c -0.162 0.193 -0.158 0.463 0.007 0.63 l 3.425 3.424 c 0.586 0.584 0.586 1.534 0 2.12 c -0.586 0.586 -1.535 0.586 -2.12 0 l -3.426 -3.425 c -1.274 -1.273 -1.353 -3.284 -0.185 -4.677 c 3.307 -3.946 4.847 -8.97 4.335 -14.142 c -0.886 -8.942 -8.018 -16.074 -16.96 -16.96 c -5.732 -0.562 -11.336 1.426 -15.38 5.47 c -4.042 4.042 -6.034 9.647 -5.467 15.378 c 0.89 8.98 8.058 16.117 17.045 16.968 c 3.867 0.37 7.68 -0.417 11.03 -2.267 c 0.725 -0.4 1.637 -0.138 2.037 0.588 c 0.4 0.725 0.137 1.638 -0.588 2.038 c -3.26 1.8 -6.896 2.73 -10.626 2.73"></path>
            <path d="M 28 16 c 0 1.657 -1.343 3 -3 3 s -3 -1.343 -3 -3 s 1.343 -3 3 -3 s 3 1.343 3 3 M 28 34 c 0 1.657 -1.343 3 -3 3 s -3 -1.343 -3 -3 s 1.343 -3 3 -3 s 3 1.343 3 3 M 34 28 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 s 3 1.343 3 3 s -1.343 3 -3 3 M 16 28 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 s 3 1.343 3 3 s -1.343 3 -3 3"></path>
          </g>
        </svg>
      </span>
      <span class="nav-text">电影</span>
    </router-link>
    <router-link tag="div" to="/cinema" class="nav-icon-wrapper">
      <span class="nav-icons">
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <title>影院1</title>
          <g fill="#696969" fill-rule="evenodd">
            <path d="M 40.5 45 h -31 c -0.83 0 -1.5 -0.67 -1.5 -1.5 S 8.67 42 9.5 42 h 31 c 0.83 0 1.5 0.67 1.5 1.5 s -0.67 1.5 -1.5 1.5 M 9.4 8 C 8.077 8 7 9.077 7 10.4 v 23.217 l 7.484 -11.388 c 0.27 -0.414 0.728 -0.666 1.22 -0.677 c 0.517 -0.027 0.96 0.222 1.25 0.622 c 0.098 0.133 2.608 3.435 7.884 3.435 c 5.358 0 8.192 -3.738 8.22 -3.776 c 0.293 -0.396 0.75 -0.633 1.255 -0.605 c 0.492 0.015 0.944 0.272 1.21 0.686 L 43 33.53 V 10.395 C 43 9.075 41.926 8 40.606 8 H 9.4 Z m 35.1 32.13 c -0.5 0 -0.98 -0.25 -1.26 -0.687 l -9.214 -14.31 c -1.664 1.47 -4.75 3.477 -9.188 3.477 c -4.353 0 -7.278 -1.805 -8.872 -3.174 l -9.212 14.02 c -0.364 0.553 -1.05 0.802 -1.684 0.612 c -0.635 -0.19 -1.07 -0.774 -1.07 -1.437 V 10.4 C 4 7.422 6.422 5 9.4 5 h 31.206 C 43.58 5 46 7.42 46 10.395 V 38.63 c 0 0.667 -0.438 1.253 -1.077 1.44 c -0.14 0.042 -0.282 0.06 -0.423 0.06 Z"></path>
          </g>
        </svg>
      </span>
      <span class="nav-text">影院</span>
    </router-link>
    <router-link tag="div" to="/mine" class="nav-icon-wrapper">
      <span class="nav-icons">
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <title>我的1</title>
          <g fill="#696969" fill-rule="evenodd">
            <path d="M 19.916 35.913 c -0.014 -0.016 -0.02 -0.036 -0.033 -0.05 c -0.314 -0.32 -0.737 -0.455 -1.153 -0.432 C 13.586 33.066 10 27.9 10 21.908 C 10 13.687 16.728 7 25 7 c 8.27 0 15 6.687 15 14.907 c 0 8.22 -6.73 14.906 -15 14.906 c -1.787 0 -3.493 -0.328 -5.084 -0.9 Z m 14.502 1.225 C 39.558 33.98 43 28.343 43 21.908 C 43 12.032 34.925 4 25 4 S 7 12.033 7 21.907 c 0 6.657 3.68 12.466 9.113 15.552 l -6.086 5.97 c -0.59 0.58 -0.6 1.53 -0.02 2.12 c 0.294 0.3 0.682 0.45 1.07 0.45 c 0.38 0 0.76 -0.143 1.052 -0.43 l 6.916 -6.785 c 1.867 0.654 3.865 1.028 5.954 1.028 c 2.324 0 4.54 -0.455 6.58 -1.256 l 7.15 7.014 c 0.292 0.287 0.672 0.43 1.05 0.43 c 0.39 0 0.78 -0.15 1.072 -0.45 c 0.58 -0.59 0.57 -1.54 -0.02 -2.12 l -6.414 -6.292 Z"></path>
            <path d="M 30.358 25.068 c -0.77 -0.31 -1.642 0.064 -1.95 0.832 c -0.554 1.375 -1.89 2.263 -3.408 2.263 c -1.503 0 -2.835 -0.877 -3.395 -2.234 c -0.316 -0.766 -1.19 -1.13 -1.96 -0.815 c -0.765 0.316 -1.13 1.193 -0.813 1.96 c 1.024 2.483 3.446 4.088 6.168 4.088 c 2.75 0 5.178 -1.627 6.19 -4.144 c 0.31 -0.77 -0.063 -1.643 -0.832 -1.952"></path>
          </g>
        </svg>
      </span>
      <span class="nav-text">我的</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.bottom-nav-bar {
  .router-link-active .nav-text { color: #f03d37; }
  .router-link-active {
    svg, svg>g path, svg>path { fill:#f03d37 }
  }
}
.bottom-nav-bar {
  position:fixed;
  bottom:0;
  width:100%;
  background:#fff;
  border-top:.5px solid #d8d8d8;
  display:-webkit-box;
  display:flex;
  justify-content:space-around;
  padding-bottom:env(safe-area-inset-bottom)
}
.bottom-nav-bar .nav-icon-wrapper {
  float:left;
  width:25px;
  height:48px;
  line-height:48px;
  box-sizing:border-box;
  color:#f03d37;
  position:relative;
  text-align:center;
  -webkit-box-flex:1;
  flex:1
}
.bottom-nav-bar .nav-icon-wrapper .nav-icons {
  display:block;
  width:25px;
  height:25px;
  margin:auto;
  background-repeat:no-repeat;
  background-size:25px
}
.bottom-nav-bar .nav-icon-wrapper .nav-icons svg {
  width:25px;
  height:25px
}
.bottom-nav-bar .nav-text {
  line-height:12px;
  position:absolute;
  top:33px;
  left:0;
  right:0;
  font-size:10px;
  color:#696969
}
.bottom-nav-bar .current .nav-text {
  color:#f03d37
}
.bottom-nav-bar .nav-item {
  width:20px;
  height:20px;
  margin-bottom:3px;
  display:inline-block;
  background-size:24px;
  background-position:-2px
}
.bottom-nav-bar svg, .bottom-nav-bar svg>g path, .bottom-nav-bar svg>path {
  fill:#696969
}
.bottom-nav-bar .current svg, .bottom-nav-bar .current svg>g path, .bottom-nav-bar .current svg>path {
  fill:#f03d37
}
</style>
