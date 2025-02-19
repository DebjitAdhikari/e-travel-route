// Media Modal Handler
document.getElementById('mediaModal').addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    const mediaType = button.getAttribute('data-media-type');
    const mediaSrc = button.getAttribute('data-media-src');
    const container = document.getElementById('media-container');
    console.log(mediaSrc)

    if(mediaType === 'video') {
        container.innerHTML = `<iframe width="100%" height="500" src="${mediaSrc}" 
            frameborder="0" allowfullscreen></iframe>`;
    } else {
        container.innerHTML = `<img src="${mediaSrc}" class="img-fluid">`;
    }
});

// See More Button
document.querySelector('.btn-see-more').addEventListener('click', function() {
    const hiddenItems = document.querySelectorAll('.testimonial-item.hidden');
    hiddenItems.forEach((item, index) => {
        if(index < 2) item.classList.remove('hidden');
    });
    
    if(document.querySelectorAll('.testimonial-item.hidden').length === 0) {
        this.style.display = 'none';
    }
});
