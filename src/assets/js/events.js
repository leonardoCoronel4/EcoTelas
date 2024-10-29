window.addEventListener('load', function() {
    const items = document.querySelectorAll('.carousel .item');
    
    items.forEach(function(item) {
        let i = item.nextElementSibling;
        
        if (!i) {
            i = item.parentElement.querySelector(':first-child');
        }
        
        const firstChild = i.firstElementChild.cloneNode(true);
        item.appendChild(firstChild);
        
        for (let n = 0; n < 4; n++) {
            i = i.nextElementSibling;
            if (!i) {
                i = item.parentElement.querySelector(':first-child');
            }
            const clone = i.firstElementChild.cloneNode(true);
            item.appendChild(clone);
        }
    });
});
