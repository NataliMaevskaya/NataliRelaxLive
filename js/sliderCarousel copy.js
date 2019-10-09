'use strict';
class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        if (!main || !wrap) {
            console.warn(`slider-cerousel: необходимо 2 свойства, 'main' и 'wrap'`);
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slides = document.querySelector(wrap).children;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            // maxPosition: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    init() {

        this.addGloClass();
        this.addStyle();
        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if (this.responsive){
            this.responseInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle() {
        let style;
        const addSliderStyle = (idSlider) => {
            style = document.getElementById(idSlider);
        if (!style){
            style = document.createElement('style');
            style.id = idSlider;
        }
        };
        if (this.main.matches('.partners-main')) {
        addSliderStyle('sliderCarousel-style-partners');
        // if (this.main.matches('.partners-main')) {
        let maxWidth;
        switch (this.slidesToShow) {
            case 1:
                maxWidth = 300;
                break;
            case 2: 
                maxWidth = 600;
                break;
            case 3:
                maxWidth = 900;
                break;

        }
        // const maxWidthStr = `max-width: ${maxWidth}px !important;`;
        style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }
            .glo-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .glo-slider__item {
                /*display: flex !important;*/
                /*align-items: center !important;*/
                /*justify-content: center !important;*/
                max-width: ${maxWidth}px !important;
                flex: 0 0 ${this.options.widthSlide}% !important;
                /*margin: auto 0 !important;*/
            }
        `;
        }
        if (this.main.matches('.transparency-slider-wrap')) {
            addSliderStyle('sliderCarousel-style-transparency');
            style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }
            .glo-slider__wrap {
                /*display: flex !important;*/
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .glo-slider__item {
                /*display: flex !important;*/
                /*align-items: center !important;*/
                /*justify-content: center !important;*/
                flex: 0 0 ${this.options.widthSlide}% !important;
                /*margin: auto 0 !important;*/
            }
        `;

        }
        document.head.appendChild(style);
    }
    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-slider__next {
                border-left-color: #19b5fe
            }
            .glo-slider__prev {
                border-right-color: #19b5fe
            }
            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus{
                background: transparent;
                outline: transparent;
            }
            `;
        document.head.appendChild(style);

    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for ( let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        widthSlideAddStyle();
                    }               
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                widthSlideAddStyle();
            }    
        };

        const widthSlideAddStyle = () => {
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}

// export default SliderCarousel;