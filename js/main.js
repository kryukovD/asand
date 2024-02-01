$(document).ready(function () {
    let idCarousels = ["carouselTracks", "carousel-tractor"];
    initCarousels(idCarousels);
    initWidthPopupMenu();

    function initCarousels(idCarousels) {
        idCarousels.forEach(id => {
            let carousel = $('#' + id);
            if (carousel.length > 0) {
                let carouselInit = new bootstrap.Carousel(carousel, {
                    ride: false
                })
                $(`#${id} .arrow-left`).click(function () {
                    carouselInit.prev();
                });
                $(`#${id} .arrow-right`).click(function () {
                    carouselInit.prev();
                });
            }
        });


    }

    function initWidthPopupMenu() {
        let logoWidth = $(".header-bottom__logo").css("width");
        let headerWidth = $(".header__header-bottom-anchor").css("width");
        let subMenu = $(".drop-menu-header-lvl1").css("width", `calc(${headerWidth} - ${logoWidth})`);


        $(".dropdown-menu-header").css("height");
        $(".dropdown-menu-header__list").css("width", logoWidth)
    }

    /*Делаем по ширине логотипа меню выпадающее меню */
    $(window).resize(function () {
        initWidthPopupMenu();
    });
    /*Выпадающее меню */
    $(".dropdown-menu-header__item").hover(function () {
        $(".dropdown-menu-header__item a").removeClass("dropdown-menu-header__item_active");
        $(this).children("a").addClass("dropdown-menu-header__item_active");
        if ($(this).children(".drop-menu-header-lvl1").length > 0) {
            let listHtml = $(this).children(".drop-menu-header-lvl1").html();
            $(".dropdown-menu-header__content").html(listHtml);
            console.log(listHtml);
        }
        else {
            $(".dropdown-menu-header__content").empty();
        }

    });
    $(".dropdown-menu-header__content").mouseleave(function () {
        $(".dropdown-menu-header__item a").removeClass("dropdown-menu-header__item_active");
        $(this).empty();
    });
    /* Мешюшки клики */

    $(".menu-mobile__item-trigger ").click(function (e) {

        if (!$(this).hasClass("menu-mobile__item-trigger_active")) {
            $(this).addClass("menu-mobile__item-trigger_active")
            if (window.matchMedia('(max-width: 576px)').matches) {
                $(this).children(".icon-mobile").hide();
                $(this).children(".mobile-list__close").css("display", "flex").show(300);
            }
        }
        else {
            /* исключаем клики внутри */
            if (!$(e.target).closest(".menu-mobile__list").length > 0) {
                $(this).children(".icon-mobile").show(300);
                $(this).children(".mobile-list__close").hide();
                $(this).removeClass('menu-mobile__item-trigger_active');
            }

        }

    });

    $(".menu-mobile__trigger-catalog").click(function (e) {
        if (!$(this).hasClass("menu-mobile__trigger-catalog_active")) {
            $(this).addClass("menu-mobile__trigger-catalog_active");
        }
        else {
            if (!$(e.target).closest(".mobile-list__lvl1").length > 0) {
                $(this).removeClass("menu-mobile__trigger-catalog_active");
            }
        }

    });

    $(".mobile-list-lvl1__item").click(function (e) {

        if (!$(this).hasClass("mobile-list-lvl1_active")) {
            $(this).addClass("mobile-list-lvl1_active");
        }
        else {
            if ($(e.target).hasClass("mobile-list-lvl2__left")) {
                $(this).removeClass("mobile-list-lvl1_active");
            }
        }
    });
    /*Инициализация slick */
    $('.section-catalog-body__slider').on('init reInit', function (e, slick) {
        if (slick.slideCount <= slick.options.slidesToShow) {
            slick.slickAdd(slick.$slides.clone())
        }
    })
    let slider = $('.section-catalog-body__slider').each(function (i, elem) {

        let slider = $(elem).slick({
            dots: false,
            nav: false,
            infinite: true,
            draggable: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },

                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,

                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });


        let currentSlide = slider.slick('slickCurrentSlide') + 1;
        let allSlides = slider.slick("getSlick").slideCount;
        $(elem).next(".section-catalog-category__nav").find(".section-catalog-counts__current").text(currentSlide.toString().padStart(2, 0));
        $(elem).next(".section-catalog-category__nav").find(".section-catalog-counts__all").text(allSlides.toString().padStart(2, 0));



        /* Смена цифр */
        $(elem).on("afterChange", function (event, slick, currentSlide, nextSlide) {
            currentSlide = currentSlide + 1;
            $(elem).next(".section-catalog-category__nav").find(".section-catalog-counts__current").text(currentSlide.toString().padStart(2, 0));
        });
        $(elem).next(".section-catalog-category__nav").find(".section-catalog-category-arrows__right").click(function (e) {
            slider.slick("slickNext");
        })
        $(elem).next(".section-catalog-category__nav").find(".section-catalog-category-arrows__left").click(function (e) {
            slider.slick("slickPrev");
        })
    });

    /*refresh при переключении табов слайдера */
    var triggerEl = $("[data-bs-toggle='tab']");
    $(triggerEl).on('shown.bs.tab', function (e) {
        $("#default").hide(); // cсрывам таб по умолчанию со всем катагероями
        $('.section-catalog-body__slider').slick("refresh");
    });


    if (window.matchMedia('(max-width: 1400px)').matches) {
        $(".section-catalog-filter__text").click(function () {
            if (!$(this).parents(".accordion").hasClass("filter_active")) {
                $(this).parents(".accordion").addClass("filter_active");
                $(this).parents(".filter__header").next(".accrodion__inner").slideToggle();
            }
            else {
                $(this).parents(".accordion").removeClass("filter_active");
                $(this).parents(".filter__header").next(".accrodion__inner").slideToggle();
            }
        });

        /* Убираем фильтр если клик был вне его */
        $(document).click(function (e) {
            if ($(e.target).parents(".section-catalog-filter").length == 0) {
                $(".section-catalog-filter__text").parents(".accordion").removeClass("filter_active");
                $(".section-catalog-filter__text").parents(".filter__header").next(".accrodion__inner").hide();
            }
        });

        $(".tab-list__arrow").click(function () {
            let parent = $(this).parents(".section-catalog_category-list")
            $(parent).children("li").not(":first-child").slideToggle();
        });

        $(".section-detail-card-tabs-block__list .tab-list__arrow").click(function () {
            let parent = $(this).parents(".section-detail-card-tabs-block__list")
            $(parent).children("li").not(":first-child").slideToggle();
        });



    }


    let resultsArray = [];
    $(".accordion-body input[type='checkbox']").click(function () {
        let $tagFilterBlock = $("<div>", { class: "filtersTags" });
        if ($(".filtersTags").length == 0) {
            $(".section-catalog__body").prepend($tagFilterBlock);
        }
        $this = this;
        let titleTag = $("<span>", { class: 'titleTag', text: $(this).parents(".accordion-item").find(".accordion-button").text() });
        let inputFilters = $(this).parents(".accordion-item").find("li input[type=checkbox]");
        let valuesFilters = [];
        let wrapTag = $("<div>", { class: "wrapTag" });
        let tagsLine = $("<div>", { class: "tagsLine" });
        inputFilters.each(function (i, item) {
            if ($(item).is(":checked")) {
                valuesFilters.push($("<div>", { class: "spanTagsValue activeTag", text: $(item).next().text() }));
            }
            else {
                valuesFilters.push($("<div>", { class: "spanTagsValue", text: $(item).next().text() }));
            }
        });
        $(tagsLine).html(valuesFilters); //  линия тегов
        $(wrapTag).html(titleTag); // Заголовок тегов
        if (resultsArray.length > 0) {
            resultsArray.map(function (e, i) {
                if ($(e).children(".titleTag").text() == $($this).parents(".accordion-item").find(".accordion-button").text()) {
                    $activeEl = $($this).next("label").text();
                    resultsArray.splice(i, 2);
                    resultsArray.push($(wrapTag).append(tagsLine));
                }

            });

        }

        resultsArray.push($(wrapTag).append(tagsLine))
        resultsArray.map(function (item, i) {
            if ($(item).find(".activeTag").length == 0) {
                resultsArray.splice(i, 2);
            }
        });



        $(".filtersTags").html(resultsArray);
        if ($(".filtersTags").children().length == 0) {
            $(".filtersTags").remove();
        }




    });

    $(".section-catalog-filter__text").next("a").click(function () {
        $(".filtersTags").remove();
    });

    /*Детальная страница */


    $('.detail-card-wrap-images__full-image').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        variableWidth: false,
        asNavFor: '.detail-card-wrap-images__thumbs',
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });



    $('.detail-card-wrap-images__thumbs').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        if(slick.slideCount!==0){
        let $dif=slick.slideCount - slick.options.slidesToShow;
        if(!$dif<=0){
        $(slick.$slides[slick.slideCount-($dif+1)]).css("position","relative");
        $(slick.$slides[slick.slideCount-($dif+1)]).append(`<span class="thumb-more">+${$dif}</span>`);
        if(event.type=="afterChange"){
            $(slick.$slides[slick.slideCount-($dif+1)]).find("span").remove();
        }
       }
        }
    });
    
 

    $('.detail-card-wrap-images__thumbs').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        vertical: true,
        asNavFor: '.detail-card-wrap-images__full-image',
        dots: false,
        focusOnSelect: true,
        centerMode: false,
        variableWidth: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },

            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: true,

                }
            }

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.section-detail-card-another-cars__slider').on('init reInit', function (e, slick) {
        if (slick.slideCount <= slick.options.slidesToShow) {
            slick.slickAdd(slick.$slides.clone())
        }
    })
    /*Слайдер Другая техника */
    let anotherCars = $('.section-detail-card-another-cars__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        variableWidth: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,

                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    let currentSlideAnother = anotherCars.slick('slickCurrentSlide') + 1;
    let allSlidesAnother = anotherCars.slick("getSlick").slideCount;
    if($(".section-detail-card-another-cars__container").length>0){
    $(anotherCars).parent(".section-detail-card-another-cars__container").find(".section-catalog-counts__current").text(currentSlideAnother.toString().padStart(2, 0));
    $(anotherCars).parent(".section-detail-card-another-cars__container").find(".section-catalog-counts__all").text(allSlidesAnother.toString().padStart(2, 0));
    
    }
    /* Смена цифр */
    $(anotherCars).on("afterChange", function (event, slick, currentSlide, nextSlide) {
        currentSlide = currentSlide + 1;
        $(anotherCars).parent(".section-detail-card-another-cars__container").find(".section-catalog-counts__current").text(currentSlide.toString().padStart(2, 0));
    });
    $(anotherCars).parent(".section-detail-card-another-cars__container").find(".section-catalog-category-arrows__right").click(function (e) {
        anotherCars.slick("slickNext");
    })
    $(anotherCars).parent(".section-detail-card-another-cars__container").find(".section-catalog-category-arrows__left").click(function (e) {
        anotherCars.slick("slickPrev");
    })
   
     /* При переключении табов меняем заголовов */
        var tabEl = $('.lizing__part-1 .section-detail-card-tabs-block__list li a');
        $(tabEl).on('shown.bs.tab', function (event) {
            console.log($(this).attr("id"));
                 if($(this).attr("id")!=="lizing-tab"){
                    $(".lizing__part-2").hide();
                 }
                 else{
                    $(".lizing__part-2").show();
                 }
                let titleForm=$(this).attr("data-title");
                 $(".breadcrumb__items >*:last-child").children('a').text($(this).text());
                $(".section-form-lizing h1").text(titleForm);
          }) 

    $(".section-corporate-part2__video-icon").click(function(){
        $(this).parents(".section-corporate__stub").hide();
        $(".section-corporate-part2__video video").get(0).play();
        $(this).hide(300);
    });
     $(".section-corporate-part2__video video").on("pause",function(){
         $(this).prev(".section-corporate-part2__video-icon").show(300);
     })
     $(".section-corporate-part2__video video").on("play",function(){
        $(this).prev(".section-corporate-part2__video-icon").hide(300);
    })




});



