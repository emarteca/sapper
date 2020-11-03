const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import { build } from '../../../api';

import { AppRunner } from '../AppRunner';


describe('errors', function() 
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

	
async function assertErrorPageRenders(statusCode: number) 
{
		
assert.strictEqual(
			await r.text('h1'),
			statusCode + ''
		);

		
assert.ok(
			await r.page.$eval('.error-layout', (el) => !!el),
			'Layout did not get error in page store'
		);
	}

	// tests
	
it('handles missing route on server', async () => 
{
		
await r.load('/nope');

		
await assertErrorPageRenders(404);
	})
;

	
it('handles missing route on client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN57__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [38, 2; 38, 25]& TEMP_VAR_AUTOGEN57__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN57__RANDOM));
 

		
await r.page.click('[href="nope"]');
		
await r.wait();

		
await assertErrorPageRenders(404);
	})
;

	
it('handles explicit 4xx on server', async () => 
{
		
await r.load('/blog/nope');

		
await assertErrorPageRenders(404);
	})
;

	
it('handles explicit 4xx on client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN78__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [54, 2; 54, 25]& TEMP_VAR_AUTOGEN78__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN78__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="blog/nope"]');
		
await r.wait();

		
await assertErrorPageRenders(404);
	})
;

	
it('handles error on server', async () => 
{
		
await r.load('/throw');

		
await assertErrorPageRenders(500);
	})
;

	
it('display correct stack trace sequences on server error referring to source file', async () => 
{
		

var TIMING_TEMP_VAR_AUTOGEN96__RANDOM = perf_hooks.performance.now();
 await  r.load('/trace');
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [70, 2; 70, 25]& TEMP_VAR_AUTOGEN96__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN96__RANDOM));
 

		
const stack = (await r.text('span')).split('\n');

		
assert.ok(stack[1] && stack[1].includes('_trace.js:2:11'));
		
assert.ok(stack[2] && stack[2].includes('trace.svelte:5:6'));
	})
;

	
it('handles error on client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN109__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [80, 2; 80, 25]& TEMP_VAR_AUTOGEN109__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN109__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="throw"]');
		
await r.wait();

		
await assertErrorPageRenders(500);

		
const didLayoutGetError = await r.page.$eval('.error-layout', (el) => el);

		
assert.ok(didLayoutGetError);
	})
;

	
it('displays a good error messsage when accessing "document" variable on server', async () => 
{
		

var TIMING_TEMP_VAR_AUTOGEN125__RANDOM = perf_hooks.performance.now();
 await  r.load('/access_document');
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [94, 2; 94, 35]& TEMP_VAR_AUTOGEN125__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN125__RANDOM));
 

		
const stack = await r.text('span');

		
assert.ok(stack.includes('client only'));
	})
;

	
it('does not replace server side rendered error', async () => 
{
		
await r.load('/preload-reject');
		
await r.sapper.start();

		
await assertErrorPageRenders(500);
	})
;

	
it('handles errors occurring in the layout preload', async () => 
{
		
const res = await r.load('/?layoutthrows=true');

		
const responseText = await res.text();

		
assert.ok(responseText.includes('Internal server error'), `Expected response "${responseText}" to say "Internal server error"`);
	})
;

	
it('does not serve error page for explicit non-page errors', async () => 
{
		
await r.load('/nope.json');

		
assert.strictEqual(
			await r.text('body'),
			'nope'
		);

		
const didLayoutGetError = await r.page.$$eval('.error-layout', (els) => els.length > 0);

		
assert.equal(didLayoutGetError, false);
	})
;

	
it('does not serve error page for thrown non-page errors', async () => 
{
		
await r.load('/throw.json');

		
assert.strictEqual(
			await r.text('body'),
			'oops'
		);
	})
;

	
it('execute error page hooks', async () => 
{
		
await r.load('/some-throw-page');
		
await r.sapper.start();

		
assert.strictEqual(
			await r.text('h2'),
			'success'
		);
	})
;

	
it('does not serve error page for async non-page error', async () => 
{
		
await r.load('/async-throw.json');

		
assert.strictEqual(
			await r.text('body'),
			'oops'
		);
	})
;

	
it('clears props.error on successful render', async () => 
{
		
await r.load('/no-error');
		

var TIMING_TEMP_VAR_AUTOGEN161__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/errors/test.ts& [159, 2; 159, 25]& TEMP_VAR_AUTOGEN161__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN161__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="enhance-your-calm"]');
		
await r.wait();
		
assert.strictEqual(await r.text('h1'), '420');

		
await r.page.goBack();
		
await r.wait();
		
assert.strictEqual(await r.text('h1'), 'No error here');
	})
;

	
it('survives the tests with no server errors', () => 
{
		
assert.deepStrictEqual(r.errors, []);
	})
;
})
;
