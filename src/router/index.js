import Vue from 'vue'
import Router from 'vue-router'

import Movie from '@/page/movie/movie'
import NowPlaying from '@/page/nowPlaying/nowPlaying'
import ComingSoon from '@/page/comingSoon/comingSoon'
import City from '@/page/city/city'
import Search from '@/page/search/search'
import CinemaMovie from '@/page/cinema/movie'
import MovieDetail from '@/page/movie/'
import Cinema from '@/page/cinema/cinema'
import Mine from '@/page/mine/mine'
import Shows from '@/page/shows'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'nowPlaying',
          component: NowPlaying
        },
        {
          path: 'comingSoon',
          component: ComingSoon
        },
        {
          path: '/movie',
          redirect: '/movie/nowPlaying'
        }
      ]
    },
    {
      path: '/city-list',
      component: City
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/cinema/movie/:movieId',
      component: CinemaMovie,
      props: true
    },
    {
      path: '/movie/:movieId',
      component: MovieDetail,
      props: true
    },
    {
      path: '/cinema',
      component: Cinema
    },
    {
        path: '/shows/:cinemaId',
        component: Shows,
        props: true
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/',
      redirect: '/movie'
    }
  ]
})
