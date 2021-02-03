'use strict';

 window.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');

    burger.addEventListener('click', () => {
        document.body.classList.toggle('menu-active');
    })

    class Slider {
        constructor(obj) {
            this.slider = obj.slider;
            this.slides = obj.slides;
            this.wrapper = obj.wrapper;
            this.track = obj.track;
            this.pagination = obj.pagination;
            this.index = 0;
            this.position = 0;
            this.width = null;
        }
        
        init() {
            this.slides = document.querySelectorAll(this.slides);
            this.slider = document.querySelector(this.slider);
            this.wrapper = document.querySelector(this.wrapper);
            console.log(this.track);

            this.track = document.querySelector(this.track);
            console.log(this.track);
           
            this.calc();

            if(this.pagination) {
                const dots = document.createElement('ul'),
                controls = [];
                dots.classList.add('slider-dots');
                this.slider.append(dots);

                let slidesLength = this.slides.length;
                for(let i = 0; i < slidesLength; i++) {
                    const dot = document.createElement('li');
                    dot.setAttribute('data-slide-to', i);
                    dot.classList.add('dot');

                    if(i === 0) {
                        dot.classList.add('dot-active');
                    }
                    dots.append(dot);
                    controls.push(dot);
                }

                dots.addEventListener('click', (e) => {
                    let target = e.target;

                    if(target.tagName === 'LI') {
                        const slideTo = target.getAttribute('data-slide-to');
                        
                        controls.forEach(dot => dot.classList.remove('dot-active'));
                        target.classList.add('dot-active');
                        this.index = slideTo;
                        this.position = this.deleteNodigits(this.width) * this.index;
                        this.track.style.transition = 'transform 0.5s';
                        this.movePosition();
    
                    } 
                })
            }

            window.addEventListener('resize', (e) => {
                this.track.style.transition = '';
                this.calc();
                this.position = this.deleteNodigits(this.width) * this.index;
                this.movePosition();
            });
        }
        calc() {
            console.log(this.track);
            console.log(this.track.style);
            this.track.style.width = 100 * this.slides.length + '%';

            this.width = window.getComputedStyle(this.wrapper).width;

            this.slides.forEach(slide => {
                slide.style.width = this.width;
            })
        }

        movePosition() {
            this.track.style.transform = `translateX(-${this.position}px)`;
        }

        deleteNodigits(str) {
            return +str.replace(/\D/g, '');
        }

        
    }
    new Slider({
        slider: '.portfolio__slider',
        slides: '.portfolio__slide',
        wrapper: '.portfolio__slider-wrapper' ,
        track: '.portfolio__slider-track',
        pagination: true,
    }).init();

    let slides = document.querySelectorAll('.blog-post__slide');
    console.log(slides);
    new Slider({
        slider: '.blog-post__slider',
        slides: '.blog-post__slide',
        wrapper: '.blog-post__slider-wrapper' ,
        track: '.blog-post__slider-track',
        pagination: true,
    }).init();
 })
