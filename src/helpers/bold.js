/**
 * Handlebars helper that boldens text.
 * @param {object} options - Handlebars object.
 * @example
 * {{#bold}} make this text bold {{/bold}}
 * @returns The text inside helper surrounded by strong html tags.
 */
module.exports = function(options) {
var bolder = '<strong>' + options.fn(this) + '</strong>';
return bolder;
}
