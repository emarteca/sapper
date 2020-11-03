const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import { build } from '../../../api';

import { AppRunner } from '../AppRunner';


describe('scroll', function() 
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
	
it('scrolls to active deeplink', async () => 
{
		
await r.load('/tall-page#foo');
		
await r.sapper.start();

		
const scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY > 0, String(scrollY));
	})
;

	
it('scrolls to any deeplink if it was already active', async () => 
{
		
await r.load('/tall-page#foo');
		
await r.sapper.start();

		
let scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY > 0, String(scrollY));

		
scrollY = await r.page.evaluate(() => 
{
			
window.scrollTo(0, 0);
			
return window.scrollY;
		})
;
		
assert.ok(scrollY === 0, String(scrollY));

		
await r.page.click('[href="tall-page#foo"]');
		
scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY > 0, String(scrollY));
	})
;

	
it('resets scroll when a link is clicked', async () => 
{
		
await r.load('/tall-page#foo');
		

var TIMING_TEMP_VAR_AUTOGEN67__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [46, 2; 46, 25]& TEMP_VAR_AUTOGEN67__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN67__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="another-tall-page"]');
		
await r.wait();

		
assert.strictEqual(
			await r.page.evaluate(() => window.scrollY),
			0
		);
	})
;

	
it('preserves scroll when a link with sapper:noscroll is clicked', async () => 
{
		
await r.load('/tall-page#foo');
		

var TIMING_TEMP_VAR_AUTOGEN87__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [60, 2; 60, 25]& TEMP_VAR_AUTOGEN87__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN87__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="another-tall-page"][sapper\\:noscroll]');
		
await r.wait();

		
const scrollY = await r.page.evaluate(() => window.scrollY);

		
assert.ok(scrollY > 0);
	})
;

	
it('scrolls into a deeplink on a new page', async () => 
{
		
await r.load('/tall-page#foo');
		

var TIMING_TEMP_VAR_AUTOGEN103__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [73, 2; 73, 25]& TEMP_VAR_AUTOGEN103__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN103__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="another-tall-page#bar"]');
		
await r.wait();
		
assert.strictEqual(await r.text('h1'), 'Another tall page');
		
const scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY > 0);
	})
;

	
it('scrolls to a deeplink on a new page no matter the previous scroll position', async () => 
{
		
await r.load('/a-third-tall-page#top');
		

var TIMING_TEMP_VAR_AUTOGEN116__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [85, 2; 85, 25]& TEMP_VAR_AUTOGEN116__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN116__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('a#top');
		
await r.wait();
		
const firstScrollY = await r.page.evaluate(() => window.scrollY);

		
await r.load('/a-third-tall-page#bottom');
		

var TIMING_TEMP_VAR_AUTOGEN123__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [93, 2; 93, 25]& TEMP_VAR_AUTOGEN123__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN123__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('a#bottom');
		
await r.wait();
		
const secondScrollY = await r.page.evaluate(() => window.scrollY);

		
assert.strictEqual(firstScrollY, secondScrollY);
	})
;

	
it('scrolls to the top when navigating with goto', async () => 
{
		
await r.load('/search-form#search');
		
await r.sapper.start();

		
const initialScrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(initialScrollY > 0, String(initialScrollY));

		
await r.page.click('button#scroll');

		
const scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY === 0, String(scrollY));
	})
;

	
it('preserves scroll when noscroll: true is passed to goto', async () => 
{
		
await r.load('/search-form#search');
		
await r.sapper.start();

		
const initialScrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(initialScrollY > 0, String(initialScrollY));

		
await r.page.click('button#preserve');

		
const scrollY = await r.page.evaluate(() => window.scrollY);
		
assert.ok(scrollY === initialScrollY, String(scrollY));
	})
;

	
it('scrolls to the top after redirecting', async () => 
{
		
await r.load('/tall-page#foo');
		

var TIMING_TEMP_VAR_AUTOGEN152__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/scroll/test.ts& [131, 2; 131, 25]& TEMP_VAR_AUTOGEN152__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN152__RANDOM));
 

		
await r.page.click('[href="redirect"]');
		
await r.wait();

		
const scrollY = await r.page.evaluate(() => window.scrollY);

		
assert.ok(scrollY === 0);
	})
;

	
it('survives the tests with no server errors', () => 
{
		
assert.deepStrictEqual(r.errors, []);
	})
;
})
;
