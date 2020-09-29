window.onload = function () {
    openMenu();
    scrollNavigation();
}

function openMenu() {
    let menu = document.querySelector('.nav_mobile');
    let menuIcon = document.querySelector('.nav_icon')
    menuIcon.addEventListener('click', function (e) {
        menu.classList.toggle('active');
        menuIcon.classList.toggle('active');
        e.stopPropagation();
    });
    openSubmenu();
}

function openSubmenu() {
    let subIcon = document.querySelectorAll('.nav_list_item .more');
    let subMenu = document.querySelectorAll(".about_list");
    subIcon.forEach((element, index) => {
        element.addEventListener("click", function (e) {
            subMenu[index].classList.toggle('active');
            subIcon[index].classList.toggle('active');
            e.stopPropagation();
        })
    });
}

function scrollNavigation() {
    let conteiner = document.querySelector('.container');
    let main = document.querySelector('main');
    let desktopNav = document.querySelector('.nav_desktop');
    conteiner.addEventListener('scroll', function (e) {
        if (conteiner.scrollTop >= 300) {
            desktopNav.classList.add('ontop');
            main.style.marginTop = '86px';
        } else {
            desktopNav.classList.remove('ontop');
            main.style.marginTop = '0px';
        }
    })
}


/*function sliderMoving() {

    /*const slider = document.querySelector('.slider');
    const sliderList = slider.querySelector('.slider_list');
    const sliderTrack = slider.querySelector('.slider_track');
    const slides = slider.querySelectorAll('.slide');
    const sliderNavigation = slider.querySelector('.slider-navigation');
    const prev = sliderNavigation.children[0];
    const next = sliderNavigation.children[1];
    const slideWidth = slides[0].offsetWidth;
    let slideIndex = 0;
    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posFinal = 0;
    const posThreshold = slideWidth * .35;
    const trfRegExp = /[-0-9.]+(?=px)/;
    slide = function () {
        sliderTrack.style.transition = 'transform 0.5s';
        sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
    }
    let arrows = document.querySelector('.slider-navigation');
    let objSlide = {};
    objSlide.slider = document.querySelector('.slider');
    objSlide.sliderList = objSlide.slider.querySelector('.slider_list');
    objSlide.sliderTrack = objSlide.slider.querySelector('.slider_track');
    objSlide.slides = objSlide.slider.querySelectorAll('.slide');
    objSlide.sliderNavigation = objSlide.slider.querySelector('.slider-navigation');
    objSlide.prev = objSlide.sliderNavigation.children[0];
    objSlide.next = objSlide.sliderNavigation.children[1];
    objSlide.slideWidth = objSlide.slides[0].offsetWidth;
    objSlide.slideIndex = 0;
    objSlide.posInit = 0;
    objSlide.posX1 = 0;
    objSlide.posX2 = 0;
    objSlide.isSwipe=false;
    objSlide.isScroll=false;
    objSlide.allowSwipe = true;
    objSlide.posFinal = 0;
    objSlide.posThreshold = objSlide.slideWidth * .35;
    objSlide.trfRegExp = /[-0-9.]+(?=px)/;
    objSlide.slide = function () {
        objSlide.sliderTrack.style.transition = 'transform 0.5s';
        objSlide.sliderTrack.style.transform = `translate3d(-${objSlide.slideIndex * objSlide.slideWidth}px, 0px, 0px)`;
    }

    arrows.addEventListener('click', function (e) {
        let target = e.target;

        if (target === objSlide.next && objSlide.slideIndex < objSlide.slides.length-1) {
            objSlide.slideIndex++;
        } else if (target === objSlide.prev && objSlide.slideIndex > 0) {
            objSlide.slideIndex--;
        } else {
            return;
        }
        objSlide.slide();
    });

    objSlide.sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    objSlide.slider.addEventListener('touchstart', swipeStart.bind(objSlide));
    objSlide.slider.addEventListener('mousedown', swipeStart.bind(objSlide));

}


getEvent = function () {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

swipeStart = function () {
    let evt = getEvent();
    this.posInit = this.posX1 = evt.clientX;
    this.sliderTrack.style.transition = '';
    document.addEventListener('touchmove', swipeAction.bind(this));
    document.addEventListener('touchend', swipeEnd.bind(this));
    document.addEventListener('mousemove', swipeAction.bind(this));
    document.addEventListener('mouseup', swipeEnd.bind(this));
}

swipeAction = function () {
    let evt = getEvent();
    let style = this.sliderTrack.style.transform;
    let transform = +style.match(this.trfRegExp)[0];
    this.posX2 = this.posX1 - evt.clientX;
    this.posX1 = evt.clientX;
   
    if (!this.isSwipe && !this.isScroll) {
        let posY = Math.abs(this.posY2);
        if (this.posY > 7 || this.posX2 === 0) {
          this.isScroll = true;
          this.allowSwipe = false;
        } else if (this.posY < 7) {
          this.isSwipe = true;
        }
    }
  
      if (this.isSwipe) {
        // запрет ухода влево на первом слайде
        if (this.slideIndex === 0) {
          if (this.posInit < this.posX1) {
            setTransform(transform, 0);
            return;
          } else {
            this.allowSwipe = true;
          }
        }
    }
  
     /*   // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет протаскивания дальше одного слайда
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }
  
        // двигаем слайд
        this.sliderTrack.style.transform = `translate3d(${transform - this.posX2}px, 0px, 0px)`;
      
  
}

swipeEnd = function (e) {

    this.posFinal = this.posInit - this.posX1;
    this.isScroll = false;
    this.isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
    if (Math.abs(this.posFinal) > this.posThreshold) {
        // если мы тянули вправо, то уменьшаем номер текущего слайда
        if (this.posInit < this.posX1) {
            this.slideIndex--;
            // если мы тянули влево, то увеличиваем номер текущего слайда
        } else if (this.posInit > this.posX1) {
            this.slideIndex++;
        }
    }

    console.log(this.posInit,this.posX1,this.posThreshold);

    // если курсор двигался, то запускаем функцию переключения слайдов
    if (this.posInit !== this.posX1) {
        this.slide();
    }
}
*/
/*function slider(){
    const slider = document.querySelector('.slider');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const left = document.querySelector('button.left');
    const right = document.querySelector('button.right');
    let currentSlideIndex;
    let interval = startSliderInterval(slides);

    left.addEventListener('click',function(){
        clearInterval(interval);
        currentSlideIndex = slides.findIndex(item=>item.classList.contains("current"));
        slides[currentSlideIndex].classList.remove('current');
        if(currentSlideIndex === 0){
            currentSlideIndex = slides.length-1;
        }
        else{
            currentSlideIndex -= 1; 
        }
        slides[currentSlideIndex].classList.add('current');
        console.log(currentSlideIndex);
        interval = startSliderInterval(slides);
    })

    right.addEventListener('click',function(){
        clearInterval(interval);
        currentSlideIndex = slides.findIndex(item=>item.classList.contains("current"));
        slides[currentSlideIndex].classList.remove('current');
        if(currentSlideIndex === slides.length-1){
            currentSlideIndex = 0;
        }
        else{
            currentSlideIndex += 1; 
        }
        slides[currentSlideIndex].classList.add('current');
        console.log(currentSlideIndex);
        interval = startSliderInterval(slides);
    });
}

function startSliderInterval(slides){
    currentSlideIndex = slides.findIndex(item=>item.classList.contains("current"));
    let interval = setInterval(function(e){
        slides[currentSlideIndex].classList.remove('current');
        if(currentSlideIndex === slides.length-1){
            currentSlideIndex = 0;
        }
        else{
            currentSlideIndex += 1; 
        }
        slides[currentSlideIndex].classList.add('current');

    },4000);

    return interval;
}*/