const webpack = require('webpack')
module.exports = {
	outputDir: 'dist',

    // baseUrl: './',
	pwa: {
	    iconPaths: {
	      favicon32: 'src/assets/icon/1.jpg',
	      favicon16: 'src/assets/icon/1.jpg',
	      appleTouchIcon: 'src/assets/icon/1.jpg',
	      maskIcon: 'src/assets/icon/1.jpg',
	      msTileImage: 'src/assets/icon/1.jpg'
	    }
    },
    configureWebpack: {

	   plugins: [

	      new webpack.ProvidePlugin({

	        $:"jquery",

	        jQuery:"jquery",

	        "windows.jQuery":"jquery"

	      })

	    ]

	}
}
