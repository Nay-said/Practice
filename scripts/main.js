var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]'; //Image
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]'; //Title
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]'; //URL
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]'; //Image for transitoin
var HIDDEN_DETAIL_CLASS = 'hidden-detail'; //Hide big image
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27; //KeyCode of ESC

//Change big image & title
function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

//Get image & it's title form thumbnail
function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

//Work on top of 3 prior functions
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

//Event listener
function addThumbClickHandler(thumb) {
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb); //Call Back
        showDetails();
    });
}

//Get all thumbnails
function getThumbnailsArray(){
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails); //Convert to array
    return thumbnailArray;
}

//Hide big image. Add hidden-detail calss to body
function hideDetails()  {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

//Show big image
function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

//Key press event listener
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

//Final step, initialize all processing logic
function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler); //Call back
    addKeyPressHandler();
}

initializeEvents();