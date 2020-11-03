const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import * as puppeteer from 'puppeteer';

import { build } from '../../../api';

import { AppRunner } from '../AppRunner';


describe('redirects', function() 
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
	
it('redirects on server', async () => 
{
		
await r.load('/redirect-from');

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/redirect-to`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'redirected'
		);
	})
;

	
it('redirects in client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN50__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/redirects/test.ts& [35, 2; 35, 25]& TEMP_VAR_AUTOGEN50__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN50__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="redirect-from"]');
		
await r.wait();

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/redirect-to`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'redirected'
		);
	})
;

	
it('redirects to root on server', async () => 
{
		
await r.load('/redirect-to-root');

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'root'
		);
	})
;

	
it('redirects to root in client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN94__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/redirects/test.ts& [68, 2; 68, 25]& TEMP_VAR_AUTOGEN94__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN94__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.page.click('[href="redirect-to-root"]');
		
await r.wait();

		
assert.strictEqual(
			r.page.url(),
			`${r.base}/`
		);

		
assert.strictEqual(
			await r.text('h1'),
			'root'
		);
	})
;

	
const interceptor = (request: puppeteer.Request) => 
{
		
if (/example\.com/.test(request.url())) 
{
			
request.respond({
				status: 200,
				contentType: 'text/html',
				body: '<h1>external</h1>'
			});
		} 
else
{
			
request.continue();
		}
	};


	
it('redirects to external URL on server', async () => 
{
		
await r.intercept_requests(interceptor, async () => 
{
			
await r.load('/redirect-to-external');
		})
;

		
assert.strictEqual(
			r.page.url(),
			'https://example.com/'
		);

		
assert.strictEqual(
			await r.text('h1'),
			'external'
		);
	})
;

	
it('redirects to external URL in client', async () => 
{
		
await r.load('/');
		

var TIMING_TEMP_VAR_AUTOGEN139__RANDOM = perf_hooks.performance.now();
 await  r.sapper.start();
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/redirects/test.ts& [115, 2; 115, 25]& TEMP_VAR_AUTOGEN139__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN139__RANDOM));
 
		
await r.sapper.prefetchRoutes();

		
await r.intercept_requests(interceptor, async () => 
{
			
await r.page.click('[href="redirect-to-external"]');
			
await r.wait();
		})
;

		
assert.strictEqual(
			r.page.url(),
			'https://example.com/'
		);

		
assert.strictEqual(
			await r.text('h1'),
			'external'
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
