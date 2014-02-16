var	  cheerio = require('cheerio')
	, _       = require('underscore')
;

var Toc = function(text, sectionNumbers)
{
	if (!_.isBoolean(sectionNumbers))
		this.sectionNumbers = false;
	else
		this.sectionNumbers = sectionNumbers;

	this.text = text;
	this.$ = cheerio.load(text);
	this.generate();
};

Toc.prototype = function()
{
	var generate = function()
	{
		var	  self         = this
			, headings     = []
			, nodes        = []
			, currentNode  = null
			, prevLevel    = 0
			, label        = null
		;
		
		this.$('h1, h2, h3, h4, h5').each(function(i, heading) {
			var level = heading.name[1];
			
			// Deeper heading.
			if (level > prevLevel)
			{
				if (0 == headings.length) {
					ref = [1];
					headings.push({ el: heading, ref: ref });
					currentNode = headings;
				} else {
					ref = _.clone(ref);
					ref.push(1);
					currentNode.push([{ el: heading, ref: ref }]);
					currentNode = _.last(currentNode);
				}
				nodes.push(currentNode)
			}
			// Heading on same level.
			else if (level == prevLevel)
			{
				ref = _.clone(ref);
				ref[ref.length - 1] = _.last(ref) + 1;
				currentNode.push({ el: heading, ref: ref });
			}
			// Shallower heading.
			else
			{
				nodes.pop();
				currentNode = _.last(nodes);
				prevNode = currentNode[currentNode.length - 2];
				ref = _.clone(prevNode.ref);
				ref[ref.length - 1] = _.last(ref) + 1;
				currentNode.push({ el: heading, ref: ref });
			}
			prevLevel = level;

		});

		this.toc = listify.call(self, headings, false);
	};

	var listify = function(item, isDeep)
	{
		var html = '';

		if (_.isArray(item))
		{
			html += (isDeep ? '<li>' : '') + '<ol>';
			for (i in item)
				html += listify.call(this, item[i], true);

			html += '</ol>' + (isDeep ? '</li>' : '');
		} else {
			html += '<li>' + headingLink.call(this, item.el, item.ref) + '</li>';
		}

		return html;
	};

	var headingLink = function(heading, ref)
	{
		var html = '<span>' + ref.join('.') + '</span> <a href="#' + this.$(heading).attr('id') + '">' + this.$(heading).html() + '</a>';
		
		if (this.sectionNumbers)
			this.$(heading).html('<span class="section-number">' + ref.join('.') + '</span> ' + this.$(heading).html());

		return html;
	};

	var _html = function()
	{
		return { toc: this.toc, contents: this.$.html() }
	}

	return {
		  generate: generate
		, html: _html
	};
}();

module.exports = function(text, sectionNumbers)
{
	var toc = new Toc(text, sectionNumbers);
	return toc.html();
};
