# toq - Table of contents generator in Node.js
Generate table of contents from html.

## Installation
`npm install toq`

## Example
```javascript
var text ='<html><body>'
	+ '<h1 id="1a">1st-level header</h1><p>foo</p>'
	+ '<h2 id="2a">A 2nd-level header</h2><p>foo bar</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar foo</p>'
	+ '<h2 id="2b">A 2nd-level header</h2><p>bar</p>'
	+ '<h3 id="3a">A 3rd level header</h3><p>foo foo</p>'
	+ '<h3 id="3b">A 3rd level header</h3><p>bar bar</p>'
	+ '<h2 id="2c">Another 2nd-level header</h2><p>foobar</p>';

var toc = require('toq')(html);```

Outputs:
```html
<ol><li><span>1</span> <a href="#1a">1st-level header</a></li><li><ol><li><span>1.1</span> <a href="#2a">A 2nd-level header</a></li><li><span>1.2</span> <a href="#2b">A 2nd-level header</a></li><li><span>1.3</span> <a href="#2b">A 2nd-level header</a></li><li><ol><li><span>1.3.1</span> <a href="#3a">A 3rd level header</a></li><li><span>1.3.2</span> <a href="#3b">A 3rd level header</a></li></ol></li><li><span>1.4</span> <a href="#2c">Another 2nd-level header</a></li></ol></li></ol>```

## MIT Licenced
