# toq - Table of contents generator
Generate table of contents from html headings.

Toq can also insert section numbers in your headings (see 2nd example below).

## Installation
`npm install toq`

## Options:

* **sectionNumbers** - Insert section numbers in the output contents. Default: false.
* **flat** - Generate a flat list, without nested sub-lists. Default: false.

## Examples

### Example - Basic usage
``` javascript
var html = '<h1 id="1a">1st-level header</h1><p>foo</p>'
	+ '<h2 id="2a">A 2nd-level header</h2><p>foo bar</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar foo</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar</p>'
	+ '<h3 id="3a">A 3rd level header</h3><p>foo foo</p>'
	+ '<h3 id="3b">A 3rd level header</h3><p>bar bar</p>'
	+ '<h2 id="2c">Another 2nd-level header</h2><p>foobar</p>';

var toc = require('toq')(html).toc;

```

Output:

``` html
<nav class="toq">
	<ol class="nav">
		<li class="toq-level-1">
			<ol>
				<li class="toq-level-2"><span>1</span> <a href="#1a">1st-level header</a></li>
				<li class="toq-level-2">
					<ol>
						<li class="toq-level-3"><span>1.1</span> <a href="#2a">A 2nd-level header</a></li>
						<li class="toq-level-3"><span>1.2</span> <a href="#2b">A 2nd-level header</a></li>
						<li class="toq-level-3"><span>1.3</span> <a href="#2b">A 2nd-level header</a></li>
						<li class="toq-level-3">
							<ol>
								<li class="toq-level-4"><span>1.3.1</span> <a href="#3a">A 3rd level header</a></li>
								<li class="toq-level-4"><span>1.3.2</span> <a href="#3b">A 3rd level header</a></li>
							</ol>
						</li>
						<li class="toq-level-3"><span>1.4</span> <a href="#2c">Another 2nd-level header</a></li>
					</ol>
				</li>
			</ol>
		</li>
	</ol>
</nav>
```

### Example - Section numbers

If you want to insert section numbers into the specified html, pass true as the second argument:

``` javascript
var html = '<h1 id="1a">1st-level header</h1><p>foo</p>'
	+ '<h2 id="2a">A 2nd-level header</h2><p>foo bar</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar foo</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar</p>'
	+ '<h3 id="3a">A 3rd level header</h3><p>foo foo</p>'
	+ '<h3 id="3b">A 3rd level header</h3><p>bar bar</p>'
	+ '<h2 id="2c">Another 2nd-level header</h2><p>foobar</p>';

var contents = require('toq')(html, { sectionNumbers: true }).contents

```

Output:

``` html
<h1 id="1a"><span class="section-number">1</span> 1st-level header</h1>
<p>foo</p>

	<h2 id="2a"><span class="section-number">1.1</span> A 2nd-level header</h2>
	<p>foo bar</p>

	<h2 id="2b"><span class="section-number">1.2</span> A 2nd-level header</h2>
	<p>bar foo</p>

	<h2 id="2b"><span class="section-number">1.3</span> A 2nd-level header</h2>
	<p>bar</p>
		<h3 id="3a"><span class="section-number">1.3.1</span> A 3rd level header</h3>
		<p>foo foo</p>

		<h3 id="3b"><span class="section-number">1.3.2</span> A 3rd level header</h3>
		<p>bar bar</p>

	<h2 id="2c"><span class="section-number">1.4</span> Another 2nd-level header</h2>
	<p>foobar</p>

```
Indented for better readability.

### Example - Toc + section numbers

Table of contents and section numbered content:

``` javascript
var html = '<h1 id="1a">1st-level header</h1><p>foo</p>'
	+ '<h2 id="2a">A 2nd-level header</h2><p>foo bar</p>'
	+ '<h3 id="3a">A 3rd level header</h3><p>foo foo</p>'
	+ '<h2 id="2c">Another 2nd-level header</h2><p>foobar</p>';

var toq = require('toq')(html, true);
console.log(toq.toc + toq.contents);

```

## MIT Licenced
