const perf_hooks = require('perf_hooks'); 

import * as assert from 'assert';

import { build } from '../../../api';

import { AppRunner } from '../AppRunner';


describe('layout', function() 
{
	
this.timeout(20000);

	
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
	
it('only recreates components when necessary', async () => 
{
		

var TEMP_VAR_AUTOGEN23__RANDOM_LATER =  r.load('/foo/bar/baz');


		
const text1 = await r.text('#sapper');
var TIMING_TEMP_VAR_AUTOGEN23__RANDOM_LATER = perf_hooks.performance.now();
 console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/layout/test.ts& [19, 2; 19, 31]& TEMP_VAR_AUTOGEN23__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN23__RANDOM_LATER));
 await TEMP_VAR_AUTOGEN23__RANDOM_LATER

		
assert.strictEqual(text1.split('\n').map(str => str.trim()).filter(Boolean).join(' '), [
			'y: bar 1',
			'z: baz 1',
			'goto foo/bar/qux',
			'goto foo/abc/def',
			'child segment: baz'
		].join(' '));

		

var TEMP_VAR_AUTOGEN41__RANDOM_LATER =  r.sapper.start();

		
const text2 = await r.text('#sapper');
var TIMING_TEMP_VAR_AUTOGEN41__RANDOM_LATER = perf_hooks.performance.now();
 console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/sapper/test/apps/layout/test.ts& [30, 2; 30, 25]& TEMP_VAR_AUTOGEN41__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN41__RANDOM_LATER));
 await TEMP_VAR_AUTOGEN41__RANDOM_LATER

		
assert.strictEqual(text2.split('\n').map(str => str.trim()).filter(Boolean).join(' '), [
			'y: bar 1',
			'z: baz 1',
			'goto foo/bar/qux',
			'goto foo/abc/def',
			'child segment: baz'
		].join(' '));

		
await r.page.click('[href="foo/bar/qux"]');
		
await r.wait();

		
const text3 = await r.text('#sapper');
		
assert.strictEqual(text3.split('\n').map(str => str.trim()).filter(Boolean).join(' '), [
			'y: bar 1',
			'z: qux 2',
			'goto foo/bar/qux',
			'goto foo/abc/def',
			'child segment: qux'
		].join(' '));

		
await r.page.click('[href="foo/abc/def"]');
		
await r.wait();

		
const text4 = await r.text('#sapper');
		
assert.strictEqual(text4.split('\n').map(str => str.trim()).filter(Boolean).join(' '), [
			'y: abc 2',
			'z: def 3',
			'goto foo/bar/qux',
			'goto foo/abc/def',
			'child segment: def'
		].join(' '));
	})
;

	
it('survives the tests with no server errors', () => 
{
		
assert.deepStrictEqual(r.errors, []);
	})
;
})
;
