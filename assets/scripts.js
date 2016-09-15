document.addEventListener('DOMContentLoaded', function () {
    elements = jQuery('.toc-content').find('h1,h2,h3,h4,h5,h6');
    if (elements.length == 0) {
        return;
    }
    contents = gajus.Contents({
        articles: elements
    });
    jQuery('#contents').append(contents.list);
});