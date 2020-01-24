/**
 * Handlebars helper that outputs html for taxonomy listing.
 * @param {string} pagelink - link to taxonomy page on blog.
 * @param {string} imagefolder - image folder to use for taxonomy.
 * @param {string} imagefile - image file to use for taxonomy.
 * @param {string} pagetext - text to use for taxonomy.
 * @param {number} listindex - taxonomy list loop index.
 * @param {number} listlength - taxonomy list length.
 * @param {object} options - Handlebars object.
 * @example
 * {{{imagetags "https://website.com/page.html" "img/" "picture.jpg" "Scenic Pictures" @index ../taxonomylist.length}}}
 * @returns taxonomy listing html.
 */
module.exports = function(pagelink, imagefolder, imagefile, pagetext, listindex, listlength) {
    var html = '';
    // Set info for each taxonomy listing in data file
    // Two list items (columns) per row (tablet or larger)
    if ( listindex % 2 == 0 ) {
        html += '<div class="columns">' + '\n';
    }
    // When there is an odd number of list items only one item in last row
    if (( listindex == (listlength - 1 )) && ( listlength % 2 == 1 )) {
        html += '  <div class="column is-half">' + '\n';
    } else {
        html += '  <div class="column">' + '\n';
    }
    html += '    <div class="item">' + '\n';
    html += '      <div class="item-content">' + '\n';
    html += '        <header>' + '\n';
    html += '          <p class="item-caption"><a href="' + pagelink + '">' + pagetext + '</a></p>' + '\n';
    html += '        </header>' + '\n';
    html += '      </div>' + '\n';
    html += '      <a href="' + pagelink + '"><img src="' + imagefolder + imagefile + '" alt="' + pagetext + '"></a>' + '\n';
    html += '    </div>' + '\n';
    html += '  </div>' + '\n';
    if ( listindex % 2 == 1 ) {
        html += '</div>' + '\n';
    }
    if (( listindex == (listlength - 1 )) && ( listlength % 2 == 1 )) {
        html += '</div>' + '\n';
    }
    return html;
};
