import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Social from '../pages/Social.vue';
import Media from '../pages/Media.vue';
import Snackbar from '../pages/Snackbar.vue';
import Chart from '../pages/Chart.vue';
import Mailbox from '../pages/Mailbox.vue';
import Calendar from '../pages/Calendar.vue';
import Login from '../pages/Login.vue';
import Error from '../pages/core/Error.vue';
import MonchisAppUser from '../pages/MonchisAppUser.vue';
import store from '../store'
import MonchisAdminUser from '../pages/MonchisAdminUser.vue'
import Analisis from '../pages/Analisis.vue'
import RegisterUser from '../pages/RegisterUser.vue'
import RegistroPacientes from '../pages/RegistroPacientes.vue'



Vue.use(Router);

const routes =  [
    {
      path: '/',
      name: 'Dashboard',
			component: Dashboard,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard' }
				],
				requiresAuth: true
      }
    },
    {
      path: '/mailbox',
      name: 'Mailbox',
			component: Mailbox,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Mailbox' }
				],
				requiresAuth: true
      }
    },
    {
      path: '/snackbar',
      name: 'Snackbar',
			component: Snackbar,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Snackbar' }
        ]
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
			component: Calendar,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Calendar' }
        ]
      }
    },
    {
      path: '/social',
      name: 'Social',
			component: Social,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Social' }
        ]
      }
    },
    {
      path: '/media',
      name: 'Media',
			component: Media,
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Media' }
        ]
      }
    },
    {
      path: '/chart',
      name: 'Chart',
			component: Chart,
			redirect: {name: 'Password'},
			redirect: {name: 'Password'},
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Chart' }
        ]
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/user-password',
      name: 'Password',
			component: MonchisAppUser,
      meta: {
        breadcrumb: [
          { name: 'Usuarios App Monchis' }
				],
				requiresAuth: true
      }
		},
		{
      path: '/admin-password',
      name: 'AdminPassword',
      component: MonchisAdminUser,
      meta: {
        breadcrumb: [
          { name: 'Usuarios Administradores' }
				],
				requiresAuth: true
      }
		},
		{
      path: '/registrar-paciente',
      name: 'RegistroPacientes',
      component: RegistroPacientes,
      meta: {
        breadcrumb: [
          { name: 'Registro Pacientes' }
				],
				requiresAuth: true
      }
		},
		{
      path: '/analisis',
      name: 'Analisis',
      component: Analisis,
      meta: {
        breadcrumb: [
          { name: 'Carga de Resultados' }
				],
				requiresAuth: true
      }
		},
		{
      path: '/registro-usuario',
      name: 'RegisterUser',
      component: RegisterUser,
      meta: {
        breadcrumb: [
          { name: 'Registro de Usuario' }
				],
				requiresAuth: true
      }
		},
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
	]

	const router = new Router({
		mode: 'history',
		routes
	})

// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state !== window.localStorage.getItem('authUser')) {
    // store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    store.dispatch('setUserObject', window.localStorage.getItem('authUser'))
  }
}


	router.beforeEach((to, from, next) => {
		console.log('to.name: ' + to.name)
		if(to.meta.requiresAuth){
			const authUser = JSON.parse(window.localStorage.getItem('authUser'))
			if(authUser !== null && authUser.monchis_token !== null){
				next()
			}else{
				next({name: 'Login'})
			}
		}

		if(to.name === 'Login'){
			const authUser = JSON.parse(window.localStorage.getItem('authUser'))
			if(authUser !== null && authUser.monchis_token !== null){
				next({name: 'Password'})
			}else{
				next()
			}
		}
		next()
	})

export default router
