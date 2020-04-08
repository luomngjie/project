export default [
	{
		path: '/',
	    name: '_home',
	    redirect:'/home',
	    meta: {
	      hideInMenu: true
	    },
	    component:()=>import('@/views/Home.vue'),
	    children:[
	    	{
	    		path:'/home',
	    		name:"home",
	    		meta: {
			      hideInMenu: true
			    },
			    component:()=>import('@/views/Home.vue')
	    	}
	    ]
	},
	{
		path: '/about',
	    name: 'about',
	    meta: {
	      hideInMenu: true
	    },
	  component: () => import('@/views/About.vue')
	}
]