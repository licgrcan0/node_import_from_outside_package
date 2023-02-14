var path = require('path');
var register = require('@babel/register');
var requireAll = require('require-all');
var rewire = require('babel-plugin-rewire');

const ROOT_DIR = path.resolve(__dirname, './dependencies');

register({
	presets: [
		['@babel/preset-env', {
			modules: 'commonjs', 
			useBuiltIns: 'usage', 
			corejs: {
				version: '3.28.0',
				proposals: true
			},
			targets: "node 18",
			debug: true
		}]
	],

	plugins: [
		["rewire"],
		["module-resolver", {
			"alias": {
				"foo":  path.join(ROOT_DIR, "foo"),
                "bar":  path.join(ROOT_DIR, "bar"),
			}
		}]
	],

	cache: true,
	configFile: false,
	root: path.resolve('../'),
	rootMode: 'root',
});

// ./tests/mytests.js
//      ./deps/foo/first.js
//          ./deps/bar/second.js
requireAll(path.resolve(__dirname, './tests'));
