const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import * as api from '../../../api';

import { walk } from '../../utils';

import { AppRunner } from '../AppRunner';


describe('with-basepath', function() 
{
	
this.timeout(10000);

	
let r: AppRunner;

	// hooks
	
before('build app', () => api.build({ cwd: __dirname }));
	
before('export app', () => api.export({ cwd: __dirname, basepath: '/custom-basepath' }));
	
before('start runner', async () => 
{
		
r = await new AppRunner().start(__dirname);
	})
;

	
after(() => r && r.end());

	// tests
	
it('serves /custom-basepath', async () => 
{
		
await r.load('/custom-basepath');

		
assert.strictEqual(
			await r.text('h1'),
			'Great success!'
		);
	})
;

	
it('emits a basepath message', async () => 
{
		
await r.load('/custom-basepath');

		
assert.deepStrictEqual(r.messages, [{
			__sapper__: true,
			event: 'basepath',
			basepath: '/custom-basepath'
		}]);
	})
;

	
it('crawls an exported site with basepath', () => 
{
		
const files = walk(`${__dirname}/__sapper__/export`);

		
const client_assets = files.filter(file => file.startsWith('custom-basepath/client/'));
		
const non_client_assets = files.filter(file => !file.startsWith('custom-basepath/client/')).sort();

		
assert.ok(client_assets.length > 0);

		
assert.deepStrictEqual(non_client_assets, [
			'custom-basepath/global.css',
			'custom-basepath/index.html',
			'custom-basepath/redirect-from/index.html',
			'custom-basepath/redirect-to/index.html',
			'custom-basepath/service-worker-index.html',
			'custom-basepath/service-worker.js'
		]);
	})
;

	
it('redirects on server', async () => 
{
		
await r.load('/custom-basepath/redirect-from');

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/custom-basepath/redirect-to`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'redirected'
		);
	})
;

	
it('redirects in client', async () => 
{
		
await r.load('/custom-basepath');
		

var TEMP_VAR_AUTOGEN102__RANDOM_LATER =  r.sapper.start();

		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="redirect-from"]');
var TIMING_TEMP_VAR_AUTOGEN102__RANDOM_LATER = perf_hooks.performance.now();
 console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/with-basepath/test.ts& [73, 2; 73, 25]& TEMP_VAR_AUTOGEN102__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN102__RANDOM_LATER));
 await TEMP_VAR_AUTOGEN102__RANDOM_LATER

		
await r.wait();

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/custom-basepath/redirect-to`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'redirected'
		);
	})
;

	
it('survives the tests with no server errors', () => 
{
		
assert.deepStrictEqual(r.errors, []);
	})
;
})
;
