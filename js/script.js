// 'use strict';

function maskPhone(selector, masked = "+7 (___) ___-__-__") {
    const elem = document.querySelector(selector);

    function mask(event) {
        console.log(this);
        const keyCode = event.keyCode;
        const template = masked,
            def = template.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        console.log(template);
        let i = 0,
            newValue = template.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            newValue = newValue.slice(0, i);
        }
        let reg = template
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
                return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
            !reg.test(this.value) ||
            this.value.length < 5 ||
            (keyCode > 47 && keyCode < 58)
        ) {
            this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        }
    }

    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
}

const phone = () => {
    const contactArrow = document.querySelector(".header-contacts__arrow");
    const imgArrow = contactArrow.querySelector("img");
    const headerContacts = document.querySelector(".header-contacts");
    const headerContactsAccord = document.querySelector(
        ".header-contacts__phone-number-accord"
    );
    const accordA = headerContactsAccord.querySelector(
        ".header-contacts__phone-number"
    );

    headerContacts.addEventListener("click", event => {
        let target = event.target;
        if (
            target.closest(".header-contacts__arrow") ||
            target.matches(".header-contacts__arrow")
        ) {
            if (accordA.style.opacity === "") {
                headerContactsAccord.style.cssText = `top: 30px !important;`;
                accordA.style.cssText = `opacity: 100 !important;`;
                imgArrow.style.cssText = `-webkit-transform: rotate(180deg) !important;
                                        -moz-transform: rotate(180deg) !important;
                                        -o-transform: rotate(180deg) !important;
                                        -ms-transform: rotate(180deg) !important;
                                        transform: rotate(180deg) !important;`;
            } else {
                accordA.removeAttribute("style");
                imgArrow.removeAttribute("style");
                headerContactsAccord.removeAttribute("style");
            }
        }
    });
};
phone();

const maskPhonesFeedback = () => {
    const classPhone = ".feedback-block__form-input_phone";
    const classInputPhone = ".feedback__input-input";
    const feedbackPhones = document.querySelectorAll(classPhone);
    const feedbackInputs = document.querySelectorAll(classInputPhone);
    // const feedbackPhones = document.querySelectorAll('.feedback-block__form-input_phone');
    // const feedbackInputs = document.querySelectorAll('.feedback__input-input');

    const setMaskPhone = (nodeList, elemClassName) => {
        nodeList.forEach(elem => {
            // console.log(elemClassName);
            // this = elem;
            // console.log(this);
            maskPhone(elemClassName);
        });
    };
    setMaskPhone(feedbackPhones, classPhone);
    setMaskPhone(feedbackInputs, classInputPhone);
    // console.log('feedbackPhones: ', feedbackPhones);
    // console.log('feedbackInputs: ', feedbackInputs);
};
maskPhonesFeedback();

const popupBurgerMenu = () => {
    // const menuIcon = document.querySelector('.menu__icon'),
    const body = document.querySelector("body"),
        popupDialogMenu = document.querySelector(".popup-dialog-menu"); //,
    // closeMenu = document.querySelector('.close-menu');

    body.addEventListener("click", event => {
        let target = event.target;
        if (target.closest(".menu__icon")) {
            popupDialogMenu.style.cssText = `transform: translate3d(0,0,0) !important;
                                                -webkit-transform: translate3d(0,0,0) !important;`;
            if (document.documentElement.clientWidth < 576) {
                popupDialogMenu.style.cssText += `width: 105%;`;
            }
        } else if (popupDialogMenu.getAttribute("style")) {
            if (
                target.closest(".close-menu") ||
                (target.closest("body") && !target.closest(".popup-dialog-menu"))
            ) {
                popupDialogMenu.removeAttribute("style");
            }
        }
    });
};
popupBurgerMenu();

const popupRepairTypes = () => {
    const body = document.querySelector("body"),
        popupRepairTypes = document.querySelector(".popup-repair-types"),
        popupDialogMenu = document.querySelector(".popup-dialog-menu");

    body.addEventListener("click", event => {
        let target = event.target;
        if (
            target.closest(".link-list-menu") ||
            target.closest(".link-list-repair")
        ) {
            if (popupDialogMenu.getAttribute("style")) {
                popupDialogMenu.removeAttribute("style");
            }
            popupRepairTypes.style.cssText = `visibility: visible !important`;
        }
        if (popupRepairTypes.getAttribute("style") && target.closest(".close")) {
            popupRepairTypes.removeAttribute("style");
        }
    });
};
popupRepairTypes();

const popupFormulaItemHint = () => {
    const body = document.querySelector("body");
    body.addEventListener("mouseover", event => {
        let target = event.target;

        // const isOutOfBrowser = (formulaItemPopup) => {
        //     // const visibleBrowserHeight = window.innerHeight ||
        //     //           document.documentElement.clientHeight || document.body.clientHeight;
        //     const rect = formulaItemPopup.getBoundingClientRect();
        //     // console.log('bottom: ', rect.bottom);
        //     console.log('top: ', rect.top);
        //     // console.log('height: ', rect.height);
        //     const answer = (rect.top < 0) ? true : false; // выходит ли за верхнюю границу
        //     return answer;
        // };

        if (target.closest(".formula-item__icon")) {
            const parentNode = target.parentNode;
            if (parentNode.matches(".formula-item__icon")) {
                const formulaItemPopup = parentNode.querySelector(
                        ".formula-item-popup"
                    ),
                    formulaItemIconInner = parentNode.querySelector(
                        ".formula-item__icon-inner"
                    ),
                    formulaText = formulaItemPopup.querySelector(".formula-text");
                formulaItemPopup.style.cssText = `visibility: visible;
                                                  opacity: 1;`;
                formulaItemIconInner.style.cssText = `opacity: 1;`;
                if (isOutOfBrowser(formulaItemPopup)) {
                    formulaItemPopup.style.cssText += `transform: rotateX(180deg);
                                                       top: 90px;`;
                    formulaItemPopup.appendChild(formulaText);
                    formulaText.style.cssText = `transform: rotateX(180deg);`;
                }
            }
        }
    });
    body.addEventListener("mouseout", event => {
        let target = event.target;

        if (target.closest(".formula-item__icon")) {
            // && target.closest('.row')) {
            if (target.closest(".row")) {
                const parentNode = target.parentNode;
                if (parentNode.matches(".formula-item__icon")) {
                    const formulaItemPopup = parentNode.querySelector(
                            ".formula-item-popup"
                        ),
                        formulaItemIconInner = parentNode.querySelector(
                            ".formula-item__icon-inner"
                        ),
                        formulaText = formulaItemPopup.querySelector(".formula-text");
                    if (
                        formulaItemPopup.getAttribute("style") &&
                        formulaItemIconInner.getAttribute("style")
                    ) {
                        formulaItemPopup.removeAttribute("style");
                        formulaItemIconInner.removeAttribute("style");
                        formulaText.removeAttribute("style");
                    }
                }
            }
        }
    });
};
popupFormulaItemHint();

const isOutOfBrowser = popupItem => {
    const rect = popupItem.getBoundingClientRect();
    // console.log('top: ', rect.top);
    const answer = rect.top < 0 ? true : false; // выходит ли за верхнюю границу
    return answer;
};

const popupProblemItem = () => {
    const problemItems = document.querySelectorAll(".problems-item__icon");
    problemItems.forEach(elem => {
        elem.addEventListener("mouseenter", event => {
            let target = event.target;
            if (target.matches(".problems-item__icon")) {
                const problemItemPopup = target.querySelector(".problems-item-popup"),
                    problemItemIconInner = target.querySelector(
                        ".problems-item__icon-inner"
                    );
                if (isOutOfBrowser(problemItemPopup)) {
                    //сделать after!?!??!
                } else {
                    problemItemPopup.style.cssText = `visibility: visible !important;
                                                        opacity: 1 !important;`;
                    problemItemIconInner.style.cssText = `opacity: 1 !important;`;
                }
            }
        });
    });
    problemItems.forEach(elem => {
        elem.addEventListener("mouseleave", event => {
            let target = event.target;
            if (target.matches(".problems-item__icon")) {
                const problemItemPopup = target.querySelector(".problems-item-popup"),
                    problemItemIconInner = target.querySelector(
                        ".problems-item__icon-inner"
                    );
                if (
                    problemItemPopup.getAttribute("style") &&
                    problemItemIconInner.getAttribute("style")
                ) {
                    problemItemPopup.removeAttribute("style");
                    problemItemIconInner.removeAttribute("style");
                }
            }
        });
    });
};
popupProblemItem();

const scrollToId = () => {
    const body = document.querySelector("body");

    body.addEventListener("click", event => {
        let target = event.target;
        if (target.matches(".menu-link") || target.closest(".button-footer")) {
            const idHref = target.getAttribute("href");
            const block = document.querySelector(idHref);
            const popupDialogMenu = document.querySelector(".popup-dialog-menu");
            if (popupDialogMenu.getAttribute("style")) {
                popupDialogMenu.removeAttribute("style");
            }
            if (idHref === "#partners" || idHref === "#main") {
                scrollToY(block.getBoundingClientRect().top, 1000, "easeInOutQuint");
            } else {
                scrollToY(block.getBoundingClientRect().top, 500, "easeInOutQuint");
            }
        }
    });

    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();

    //   // main function
    function scrollToY(scrollTargetY, speed, easing) {
        //       // scrollTargetY: the target scrollY property of the window
        //       // speed: time in pixels per second
        //       // easing: easing equation to use

        let scrollY = window.scrollY || document.documentElement.scrollTop,
            currentTime = 0;
        scrollTargetY = scrollTargetY || 0;
        speed = speed || 2000;
        easing = easing || "easeOutSine";

        // min time .1, max time .8 seconds
        let time = Math.max(
            0.5,
            Math.min(Math.abs(scrollY - scrollTargetY) / speed, 10)
        );

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        let easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return -0.5 * (Math.cos(Math.PI * pos) - 1);
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow(pos - 2, 5) + 2);
            }
        };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            let p = currentTime / time;
            let t = easingEquations[easing](p);

            if (p < 1) {
                window.requestAnimFrame(tick);

                window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
            } else {
                //   console.log('scroll done');
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }
};
scrollToId();

const popupConsult = () => {
    const body = document.querySelector("body"),
        popupPrivacy = document.querySelector(".popup-privacy"),
        popupConsult = document.querySelector(".popup-consultation");

    body.addEventListener("click", event => {
        let target = event.target;
        if (target.classList.contains("button_wide")) {
            popupConsult.style.cssText = `visibility: visible !important`;
        } else if (!popupPrivacy.getAttribute("style")) {
            if (
                target.closest(".close-consultation") ||
                !target.closest(".feedback-wrap")
            ) {
                if (popupConsult.getAttribute("style")) {
                    popupConsult.removeAttribute("style");
                }
            }
        }
    });
};
popupConsult();

const togglePopUpPolicy = () => {
    const body = document.querySelector("body"),
        popupPrivacy = document.querySelector(".popup-privacy");

    body.addEventListener("click", event => {
        let target = event.target;
        if (target.matches(".link-privacy")) {
            popupPrivacy.style.cssText = `visibility: visible !important`;
        } else if (
            popupPrivacy.getAttribute("style") &&
            (target.closest(".close") || !target.closest(".popup-dialog-privacy"))
        ) {
            popupPrivacy.removeAttribute("style");
        }
    });
};
togglePopUpPolicy();

const accordionQuestion = () => {
    const accordion = document.querySelector(".accordion"),
        titleBlocks = document.querySelectorAll(".title_block");

    accordion.addEventListener("click", event => {
        let target = event.target;
        if (target.matches(".title_block")) {
            titleBlocks.forEach(item => {
                if (item.classList.contains("msg-active")) {
                    item.classList.remove("msg-active");
                }
            });
            target.classList.add("msg-active");
        }
    });
};
accordionQuestion();

//schemeTabs

const schemeTabs = () => {
    const schemeListNav = document.getElementById("scheme-list"),
        schemeNavItems = schemeListNav.querySelectorAll(".scheme-nav__item"),
        schemeSlides = document.querySelectorAll(".scheme-slider__slide"),
        schemeDescriptionBlocks = document.querySelectorAll(
            ".scheme-description-block"
        );
    // console.log('schemeNavItems: ', schemeNavItems);

    schemeListNav.addEventListener("click", event => {
        let target = event.target;
        if (target.matches(".scheme-nav__item")) {
            schemeSlides.forEach(slide => {
                slide.style.display = "none";
            });
            schemeNavItems.forEach((elem, i) => {
                if (elem === target) {
                    elem.classList.add("active");
                    schemeSlides[i].style.display = "block";
                    schemeDescriptionBlocks[i].classList.add("visible-content-block");
                } else {
                    elem.classList.remove("active");
                    schemeDescriptionBlocks[i].classList.remove("visible-content-block");
                }
            });
        }
    });
};
schemeTabs();

const sendFormCall = idForm => {
    const form = document.getElementById(idForm);
    //событие submit на форме
    form.addEventListener("submit", event => {
        event.preventDefault();
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== "button" && item.type !== "button";
        });
        console.log(elementsForm);
        // стоит ли галочка (обязательно)
        const isEmptyCheckbox = elementsForm => {
            let numOfEmpty = 0;
            elementsForm.forEach((elem, i) => {
                if (elem.value === "") {
                    numOfEmpty++;
                }
                if (elem.matches(".checkbox__input") && !elem.checked) {
                    numOfEmpty++;
                }
            });

            if (numOfEmpty) {
                console.log("пустые");
                return true;
            } else {
                console.log("заполнены");
                return false;
            }
        };

        if (isEmptyCheckbox(elementsForm)) {
            // console.log('Не работает');
            return;
        } else {
            for (const elem of form.elements) {
                if (elem.tagName.toLowerCase() !== "button" && elem.type !== "button") {
                    elem.value = " ";
                    // elem.setAttribute('checked', false);
                    if (elem.matches(".checkbox__input")) {
                        elem.checked = false;
                    }

                    // elem.setAttribute('defaultChecked', false);
                }
            }

            // const formData = new FormData(form);
            // let body = {};
            // formData.forEach((val, key) => {
            //     body[key] = val;
            // });

            // postData(body)
            //     .then((response) => {
            //         if (response.status !== 200) {
            //             throw new Error('status network is not 200!');
            //         }

            //         // statusMessage.textContent = successMessage;
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
            //     // .then(() => clearFormFields(form));
        }
    });
    // });

    const postData = body => {
        return fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "default",
            body: JSON.stringify(body)
        });
    };
    // const clearFormFields = (form) => {
    //     for (const elem of form.elements) {
    //         if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
    //             elem.value = '';
    //             elem.classList.remove('success');
    //         }
    //     }
    // };
};
sendFormCall("feedback1");
sendFormCall("feedback2");
sendFormCall("feedback3");
sendFormCall("feedback4");
sendFormCall("feedback5");
sendFormCall("feedback6");

// sendFormData();

const slider = () => {
    const slide = document.querySelectorAll(".transparency-item"),
        // btn = document.querySelectorAll('.portfolio-btn'),
        // portfolioDots = document.querySelector('.portfolio-dots'),
        slider = document.querySelector(".transparency-slider");
    const sliderWrap = document.querySelector(".transparency-slider-wrap");

    slider.addEventListener("mouseover", event => {
        let target = event.target;
        if (target.closest(".transparency-item")) {
            if (target.matches(".transparency-item__img")) {
                const itemHover = target.querySelector(".item-hover");
                itemHover.classList.add("visible__item");
                itemHover.classList.add("visible-opacity");
            }
        }
    });
    slider.addEventListener("mouseout", event => {
        let target = event.target;
        if (target.closest(".transparency-item")) {
            if (target.matches(".transparency-item__img")) {
                // const transparencyImg = target.querySelector(".transparency-item__img");
                // const itemHover = transparencyImg.querySelector(".item-hover");
                const itemHover = target.querySelector(".item-hover");
                if (itemHover.matches(".visible__item, .visible-opacity")) {
                    //&& itemHover.matches('.visible-opacity')) {
                    itemHover.classList.remove("visible__item");
                    itemHover.classList.remove("visible-opacity");
                }
            }
        }
    });
    // const hoverItems = document.querySelectorAll('.hover-item');
    const popupTransparency = document.querySelector(".popup-transparency");
    slider.addEventListener("click", event => {
        let target = event.target;
        if (target.closest(".transparency-item__img")) {
            const itemHover = target.querySelector(".item-hover");
            if (itemHover.matches(".visible__item, .visible-opacity")) {
                popupTransparency.classList.add("visible__item");
                //слайдер
            }
            // else if (popupTransparency.matches(".visible__item")){
            //     if (target.closest(".close") || !target.closest(".popup-dialog-transparency")) {
            //         popupTransparency.classList.remove("visible__item");
            //     }
            // }
        }
    });

    popupTransparency.addEventListener("click", () => {
        let target = event.target;
        if (
            target.closest(".close") ||
            !target.closest(".popup-dialog-transparency")
        ) {
            popupTransparency.classList.remove("visible__item");
        }
    });

    const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        if (widthWindow < 1091) {
            slider.style.display = "flex";
            slider.style.flexWrap = "nowrap";
            slide.forEach((elem, i) => {
                elem.style.display = "none";
                if (i === 0) {
                    elem.style.display = "flex";
                }
            });
        } else if (slider.getAttribute("style")) {
            slider.removeAttribute("style");
            slide.forEach((elem, i) => {
                elem.removeAttribute("style");
            });
        }
    };
    checkResponse();
    window.addEventListener("resize", checkResponse);

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index) => {
        elem[index].style.display = "none";
    };

    const nextSlide = (elem, index) => {
        elem[index].style.display = "flex";
    };

    // slider.addEventListener('click', (event) => {
    sliderWrap.addEventListener("click", event => {
        event.preventDefault();
        let target = event.target;

        if (!target.closest(".slider-arrow")) {
            return;
        }

        prevSlide(slide, currentSlide, "display-block");

        if (target.matches("#transparency-arrow_right")) {
            currentSlide++;
        } else if (target.matches("#transparency-arrow_left")) {
            currentSlide--;
        }
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, "display-block");
    });
};
slider();

const sliderTypesRepair = () => {
    const repairTypes = document.querySelector('.repair-types'), //весь блок с ремонтами
        repairTypesSliderWrap = document.querySelector('.repair-types-slider-wrap'),
        typesRepairAll = repairTypesSliderWrap.querySelector('.repair-types-slider').children,//,// все слайдеры с ремонтами
        currentSlide = repairTypesSliderWrap.querySelector('.slider-counter-content__current'),
        totalSlide = repairTypesSliderWrap.querySelector('.slider-counter-content__total'),
        navListRepair = repairTypes.querySelector('.nav-list-repair'),
        navItems = navListRepair.querySelectorAll('.repair-types-nav__item');

        // navListRepair.addEventListener('click', (event) => {
        //     navItems.forEach((elem, i) => {
        //         elem.style.display = "none";
        //         if (i === 0) {
        //             elem.style.display = "block";
        //             elem.style.visibility
        //         }
        //     });

        // });
        // navItems.forEach((item, i) => {

        // });
        // console.log(typesRepairAll);
        // repairTypes
        console.log('typesRepairAll: ', typesRepairAll);
        // // repairCounter
        // currentSlide
        console.log('currentSlide: ', currentSlide);
        // totalSlide
        console.log('totalSlide: ', totalSlide);
        console.log(navItems);
        // console.log('repairCounter: ', repairCounter);
};
sliderTypesRepair();