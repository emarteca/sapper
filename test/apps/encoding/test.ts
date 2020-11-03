const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import { build } from '../../../api';

import { AppRunner } from '../AppRunner';


describe('encoding', function() 
{
	
this.timeout(10000);

	
let r: AppRunner;

	// hooks
	
before('build app', () => build({ cwd: __dirname }));
	
before('start runner', async () => 
{
		
r = await new AppRunner().start(__dirname);
	})
;

	
after(() => r && r.end());

	// tests
	
it('encodes routes', async () => 
{
		
await r.load('/fünke');

		
assert.strictEqual(
			await r.text('h1'),
			"I'm afraid I just blue myself"
		);
	})
;

	
it('encodes req.params and req.query for server-rendered pages', async () => 
{
		
await r.load('/echo/page/encöded?message=hëllö+wörld&föo=bar&=baz&tel=%2B123456789');

		
assert.strictEqual(
			await r.text('h1'),
			'encöded {"message":"hëllö wörld","föo":"bar","":"baz","tel":"+123456789"}'
		);
	})
;

	
it('encodes req.params and req.query for client-rendered pages', async () => 
{
		
await r.load('/');
		

var TEMP_VAR_AUTOGEN58__RANDOM_LATER =  r.sapper.start();

		
await r.sapper.prefetchRoutes();

		
await r.page.click('a');
var TIMING_TEMP_VAR_AUTOGEN58__RANDOM_LATER = perf_hooks.performance.now();
 console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/encoding/test.ts& [38, 2; 38, 25]& TEMP_VAR_AUTOGEN58__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN58__RANDOM_LATER));
 await TEMP_VAR_AUTOGEN58__RANDOM_LATER

		
await r.wait();

		
assert.strictEqual(
			await r.text('h1'),
			'encöded {"message":"hëllö wörld","föo":"bar","":"baz","tel":"+123456789"}'
		);
	})
;

	
it('encodes req.params for server routes', async () => 
{
		
await r.load('/echo/server-route/encöded');

		
assert.strictEqual(
			await r.text('h1'),
			'encöded'
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
