new Glider(document.querySelector('.glider'), {
  slidesToShow: 5,
  slidesToScroll: 5,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});

new Glider(document.querySelector('.gliderEsmaltes'), {
  slidesToScroll: 1,
  slidesToShow: 5.5,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});