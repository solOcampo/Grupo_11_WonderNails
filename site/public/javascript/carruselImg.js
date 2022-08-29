new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '#dots',
    draggable: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

  new Glider(document.querySelector('.gliderProductos'), {
    slidesToScroll: 1,
    slidesToShow: 5.5,
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