/*========================GLOBAL================*/
var xhr,
myGlobalForHomepageMainSlider = false,
isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var myGlobalisMobileDevice = false;
window.mobileAndTabletcheck = function() {
  myGlobalisMobileDevice = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) myGlobalisMobileDevice = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return myGlobalisMobileDevice;
};
mobileAndTabletcheck();
if( myGlobalisMobileDevice ){
    $("html").attr("id", "mobile");
}

SmoothScroll({ animationTime: 400, stepSize: 60 });

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
};
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};
function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
};
//disableScroll();
function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
};
function setPageMaxHeight(){
    var wheight = window.innerHeight ? window.innerHeight : $(window).height();

    if( $("#leftCol").outerHeight() <= wheight ){
        $("#leftCol").css({ height: wheight })
    }else{
        $("#leftCol").css({ height: "" })
    }
};
$(window).smartresize(function(){
    setPageMaxHeight();
});
function slideMainMenu(){
    var dataH = 0;
    $("#leftMenu .root-item-selected.item-selected>a").on("click", function(e){
        var $this = $(this),
            $li = $this.parent("li"),
            $childUl = $li.children("ul");

        if( $childUl.length > 0 ){
            if( !$li.hasClass("twisted") ){
                dataH = $li.outerHeight();
                e.preventDefault();
                $li.addClass("twisted");
                TweenMax.to( $li , 0.2, { height: $this.outerHeight() , force3D:true});
            }else{
                e.preventDefault();
                $li.removeClass("twisted");
                TweenMax.to( $li , 0.2, { height: dataH , force3D:true});
            }
        }
    });
}
function headerSearch(){
    $(".search .search-action").on("click", function(event) {
        if (event.target == this) {
            $(".search .search-action").hide();
            $(".search .search-form").show();
            $(".search .search-form form input[type='text']").focus();
            $(".search").addClass("active");
        }
    });
    $("body").on("click", function(event) {
        if (($(".search.active").length > 0) && ($(event.target).closest("header .search").length < 1) && (event.target.id !== "header-search")) {
            $(".search .search-action").show();
            $(".search .search-form").hide();
            $(".search").removeClass("active");
        }
    });
    $(".search .search-form form").on("submit", function(){
        if( $(".search .search-form form input[type='text']").val() === ""){
            return false;
        } 
    });
};
function headerLogin(){
    $(".loginBlock a[name='login'], .loginBlock .topOrange").on("click", function(){
        $loginBlock = $(".loginBlock");
        if( $loginBlock.hasClass("active") ){
            $loginBlock.removeClass("active");
        }else{
            $loginBlock.addClass("active");
        }
    });
    $("body").on("click", function(event) {
        if ( ($(".loginBlock.active").length > 0) && ($(event.target).closest(".loginBlock").length < 1) ) {
            $loginBlock.removeClass("active");
        }
    });
};
function switchRow(){
    if( $(".switch-row").length > 0 ){
        /*скрыть пустые*/
        $(".switch-content>div").each(function(){
            var $this = $(this);
            if( $this.attr("data-name") == "gMap" ){return false};
            
            if( $this.html().trim() == "" ){
                $this.hide();
                $(".switch-row a[data-name='"+$this.attr("data-name")+"']").hide()
            }
        });
        /*---*/
        $(".switch-row a[data-name]").on("click", function(){
            var $this = $(this);

            if( $this.hasClass("active") ){ return false; };
            $(".switch-row a").removeClass("active");
            var activeClass = $(this).attr("data-name");
            $this.addClass("active");
            if( $(".switch-content").length > 0 ){
                $(".switch-content>div").removeClass("active");
                $(".switch-content>div[data-name='"+activeClass+"']").addClass("active");
            }
            window.location.hash = "#" + activeClass;
        });
        $(".switch-row a[name='prev']").on("click", function(){
            var $prevA = $(".switch-row a.active").prevAll("a[data-name]:not(:hidden):eq(0)");
            if( $prevA.length > 0 ){
                $prevA.trigger("click");
            }
        });
        $(".switch-row a[name='next']").on("click", function(){
            var $nextA = $(".switch-row a.active").nextAll("a[data-name]:not(:hidden):eq(0)");
            if( $nextA.length > 0 ){
                $nextA.trigger("click");
            }
        });
    }
};
function checkHashSwitchRowState(){
    if( $(".switch-row").length > 0 && window.location.hash.length > 0 ){
        var newTab = window.location.hash.substr(1);
        if( $(".switch-row a[data-name='"+newTab+"']").hasClass("active") 
        || $(".switch-row a[data-name='"+newTab+"']").length == 0 ){
            return false;
        }else{
            $(".switch-row a[data-name='"+newTab+"']").trigger("click");
        }
    }
};
function removeGlobalLoader(){
    var $loader = $(".globalLoader");
    TweenMax.to( $loader , 0.4, 
        {
            autoAlpha : 0
            , 
            className:"+=goOut",
            onComplete: function(){
                $loader.hide();
                $loader.removeClass("goOut");
                enableScroll();
            },
            delay: 0.2
        }
    );
};
function allTablesInit(){
    // $("table").each(function() {
    //     var $this = $(this);
    //     var numTD = $this.find("tr:has(td[rowspan]):first td").length;
    //     $this.data('numTD', numTD).find("tr:has(:not(th))").filter(function() {
    //         var $this = $(this);
    //         return $this.children().length == $this.closest('table').data('numTD');
    //     }).filter(':even').addClass('oddrow');

    // });
    // $("tr.oddrow td[rowspan]").each(function() {
    //     $(this).parent().nextAll().slice(0, this.rowSpan - 1).addClass('oddrow');
    // });
    $(".like_a_table").each(function() {
        var $table = $(this);

        $table.find(".tr:has(.td):first").find(".td").addClass("firstTdRow");
    });

    $("table:not(.importVidjet)").each(function() {
        var $table = $(this),
        column_count = 0;

        if( $table.closest(".importVidjet").length == 0 ){
            $table.find("tr:has(td):first").find("td").addClass("firstTdRow");

            $table.find('tr:has(td):first td').each(function () {
                if ($(this).attr('colspan')) {
                    column_count += +$(this).attr('colspan');
                } else {
                    column_count++;
                }
            });

            $table.find("tr").filter(function() {

              // Adds row children and colspan values of those children

              var child_count = 0;
              $("td", this).each(function(index) {
                if ($(this).attr('colspan') != null) {
                  child_count += parseInt($(this).attr('colspan'));
                } else {
                  child_count += 1;
                }
              });

              return child_count == column_count;
            }).filter(':even').addClass('oddrow');

            /*скрол для больших таблиц выходящих за рамки в детальной новости*/
            if( $table.closest(".detailContent").length > 0 && $("body.press-center-news").length > 0 ){
                if( $table.outerWidth() > $table.closest(".w-2col").outerWidth() ){
                    $table.wrap("<div class='tableScrollWrapper'></div>");
                    if( !myGlobalisMobileDevice ){
                        var $thisTSW = $table.closest(".tableScrollWrapper");
                        $thisTSW.niceScroll({
                            cursorcolor: '#ff9300',
                            preservenativescrolling: false,
                            cursorwidth: '8px',
                            cursorborderradius: '2px',
                            cursorborder: '0px solid #ff9300',
                            background: 'transparent',
                            scrollspeed: 70,
                            mousescrollstep: 50,
                            railoffset: {top: 0, right: 0, left: 0, bottom: 0},
                            cursoropacitymin: 1,
                            cursoropacitymax: 1,
                            horizrailenabled: true,
                            zindex: 2,
                            nativeparentscrolling: true,
                            autohidemode: false
                        });
                    }
                }
            }
        }

    });
    $("tr.oddrow td[rowspan]").each(function() {
      $(this).parent().nextAll().slice(0, this.rowSpan - 1).addClass('oddrow');
    });
    $("tr td[rowspan], tr th[rowspan]").each(function() {
      $(this).parent().nextAll().slice(0, this.rowSpan - 1).addClass('noFirstTd');
    });
};

function fixLongPageTitle($titleH1){
    var $ttl = $titleH1,
    ttlH = $ttl.height(),
    ttlLH = parseInt( $ttl.css("line-height") );
    if( ttlH > ttlLH*2+10 ){
        $ttl.addClass("long");
        ttlH = $ttl.height(),
        ttlLH = parseInt( $ttl.css("line-height") );
        if( ttlH > ttlLH*3+10 ){
            $ttl.addClass("extraLong");
        }else{
            $ttl.removeClass("extraLong");
        }
    }else{
        $ttl.removeClass("long");
    }
};
function optionSelect(){
    if( myGlobalisMobileDevice ){ return false; }
    $('select').not(".search-page select").selectric({
        disableOnMobile: false
    });
    $(".selectric-scroll").niceScroll({
        cursorcolor: '#ff9300',
        cursorwidth: '5px',
        cursorborderradius: '2px',
        cursorborder: '0px solid #ff9300',
        background: 'transparent',
        scrollspeed: 70,
        mousescrollstep: 50,
        railoffset: {top: 0, right: 0, left: 0, bottom: 0},
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        horizrailenabled: false,
        zindex: 2,
        nativeparentscrolling: true,
        autohidemode: false
    });
};
/*====================END GLOBAL================*/
/* ============Homepage===============*/
function HomepageMainSlider($that){
    var slidesCount = $that.find(".sliderItem").length;
    if( slidesCount > 1 ){
        var $block = $that;
        var $slides = $that.find(".sliderItem");
        var fullAnimateTime = 0.5;
        var scaleIt = 0.04;
        var slideW = parseInt($slides.css("width"));
        var slidesOffsetX = 5;
        var curMas = [];
        var myInterval;
        var resWidthqq = $('#main-banners .slider-item.item-1 .bg').width() / 100 * 110;
        var resHeightqq = $('#main-banners .slider-item.item-1 .bg').height() / 100 * 110;
        var diffXqq = (resWidthqq - $('#main-banners .slider-item.item-1 .bg').width()) / 2;
        var diffYqq = (resHeightqq - $('#main-banners .slider-item.item-1 .bg').height()) / 2;

        var cur = ($that.find(".sliderItem.current").length>0 ? $that.find(".sliderItem.current").index() : $slides.eq(0).addClass("current") );
        
        function initCurMas(){
            cur = $block.find(".sliderItem.current").index();
            curMas = [];
            var helpAfterMas = [];
            for(var i=0; i< slidesCount; i++){
                if( i >= cur ){
                    curMas.push(i);
                }else{
                    helpAfterMas.push(i);
                }
            }
            curMas = curMas.concat(helpAfterMas);
        }
        initCurMas();
        for(var i=0; i< slidesCount; i++){
                TweenMax.set( $slides.eq(curMas[i]), { 
                    x: slidesOffsetX*i,
                      zIndex: slidesCount-i,
                      z: 1,
                      transformOrigin: "100% 50%",
                      scale: ""+1 - i*scaleIt+""
                });
        }
        function showSlides($that){
            if( myGlobalForHomepageMainSlider ){ return false }
            var thatIndex = $that;
            var leftCurSlide = (slidesCount-1)*slidesOffsetX;
            cur = $block.find(".sliderItem.current").index();
            TweenMax.to( $slides.eq(cur) , fullAnimateTime*70/100, {width: slideW-leftCurSlide, force3D:true});
            TweenMax.to( $block.find(".arrow") , fullAnimateTime*70/100, {x: -leftCurSlide, force3D:true});
            for(var i=1; i< slidesCount; i++){
                TweenMax.to( $slides.eq(curMas[i]), fullAnimateTime*70/100, {x: -leftCurSlide+slidesOffsetX*2*i, force3D:true});
            }
        }
        function hideSlides(){
            cur = $block.find(".sliderItem.current").index();
            TweenMax.to( $slides.eq(cur), fullAnimateTime*70/100, {width: slideW, force3D:true});
            TweenMax.to( $block.find(".arrow") , fullAnimateTime*70/100, {x: 0, force3D:true});
            for(var i=1; i< slidesCount; i++){
                TweenMax.to( $slides.eq(curMas[i]), fullAnimateTime*70/100, {x: slidesOffsetX*i, width: slideW, force3D:true});
            }
        }
        function slide(dir, index){
            if( myGlobalForHomepageMainSlider ) { return false;}
            cur = $block.find(".sliderItem.current").index();
            var indexOfCur = curMas.indexOf(cur);
            var nextCur;
            var Xform;
            if((dir === "right") && (cur !== slidesCount-1)){
                nextCur = cur+1;
            }else if((dir === "right") && (cur === slidesCount-1)){
                nextCur = 0;
            }else if((dir === "left") && (cur !== 0)){
                nextCur = cur-1;
            }else if((dir === "left") && (cur === 0)){
                nextCur = slidesCount-1;
            }else{
                nextCur = index;
                if(nextCur > cur){
                    var dir = "right";
                }else if(nextCur < cur){
                    var dir = "left";
                }else{
                    return false;
                }
            }
            myGlobalForHomepageMainSlider = true;
            var indexOfNextCur = curMas.indexOf(nextCur);

            for(var i=0, j=0; i< slidesCount; i++){
                if( i < indexOfNextCur ){
                    var tl = new TimelineMax();
                    tl.to( $slides.eq(curMas[i]), fullAnimateTime*80/100, {x: -25, autoAlpha :0, width: slideW, force3D:true})
                    .set( $slides.eq(curMas[i]), { scale: ""+1 - (slidesCount-indexOfNextCur+i)*scaleIt+"", zIndex: indexOfNextCur-i, x : -5 } )
                    .to( $slides.eq(curMas[i]), fullAnimateTime*20/100, {
                        x: (slidesCount-indexOfNextCur+i)*slidesOffsetX,
                        autoAlpha :1,
                        ease: Power3.easeOut,
                        force3D:true
                    })
                }else if( i >= indexOfNextCur ){
                    var tl = new TimelineMax();
                    tl.to( $slides.eq(curMas[i]), fullAnimateTime, {
                        width: slideW,
                        x: slidesOffsetX*j,
                        transformOrigin: "100% 50%",
                        scale: ""+1 - j*scaleIt+"",
                        force3D: true,
                        onComplete: function(){
                        myGlobalForHomepageMainSlider = false;
                        }
                    })
                    .set( $slides.eq(curMas[i]) , { zIndex: slidesCount-j, delay: fullAnimateTime*80/100  }, 0 )
                    j++;
                }
            }

            $slides.removeClass("current");
            $slides.eq(nextCur).addClass("current");
            initCurMas();
        };

        $("#homepageMainSlider").on("click",".sliderItem:not('.current')", function(){
            slide(null, $(this).index());
        });
        $("#homepageMainSlider").on("mouseenter",".sliderItem:not('.current'), .slider .arrow", function(){
            showSlides($(this));
        });
        $("#homepageMainSlider").on("mouseleave",".sliderItem:not('.current'), .slider .arrow", function(){
            hideSlides($(this));
        });
        $("#homepageMainSlider .arrow").on("click", function(){
                slide("right");
        });

        var hamSlider = new Hammer($block[0], {
          touchAction: "auto"
        });
        hamSlider.on('swipeleft', function(ev) {
            slide("right");
            clearInterval(myInterval);
            myIntervalHomepageMainSlider();
        });

        function myIntervalHomepageMainSlider(){
            myInterval = setInterval(function(){
                slide("right");
            }, 4000);
        }
        myIntervalHomepageMainSlider();
        $block.on("mouseenter", function(){
            clearInterval(myInterval);
        });
        $block.on("mouseleave", function(){
            clearInterval(myInterval);
            myIntervalHomepageMainSlider();
        });
        $(window).smartresize(function(){
            slideW = parseInt($that.width());
            TweenMax.set( $slides, { 
                width: slideW
            });
        });
    }
};

function homepageSubscribe(){
    var $link = $(".news-subscribe"),
    $block = $(".homepage .subscribeBlock");
    $block.attr("data-h", parseInt( $block.outerHeight() ) );
    TweenMax.set( $block, { height : 0 });
    var t = TweenLite.to( $block , 0.4, { height: $block.attr("data-h"), "margin-top": (-$block.attr("data-h")/2)-4, autoAlpha: 1,  paused:true, reversed:true });

    $link.on("click", function(){
        if (t.reversed()) {
            t.play();
        } else {
            t.reverse();
        }
    });
    $("body").on("click", function(event) {
        if ( $(event.target).closest(".homepage .news-head").length < 1 && $(event.target).closest(".mfp-wrap").length < 1 && !t.reversed() ) {
            t.reverse();
        }
    });
    if( $block.find(".messageState").length > 0 ){
        $link.trigger("click");
    }
}
function validateSubscribeEmail(){
    if( !$('form[name="subscribe"] input[name="email"]').length > 0 ){return false;}
    $('form[name="subscribe"] input[name="email"]').on("change, keyup, input", function(){
        var $email = $(this);
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!re.test($email.val())){
           $('form[name="subscribe"] input[type="submit"]').prop('disabled', true);
        }else{
            $('form[name="subscribe"] input[type="submit"]').prop('disabled', false);
        }
    });
    $('form[name="subscribe"] input[name="email"]').trigger("change")
}

function homepageGeoMap(){
    if( !$("body.homepage").length > 0 ){return false;}
    var $mapBlock = $(".geoMap>img");
    TweenMax.set( $(".geoMap"), {
        perspective: "700px"
    });
    TweenMax.set( $mapBlock, {
      transformOrigin: "50% 100%",
      rotationX: 40
    });
    var durationVal = parseInt($(".geographyBlock").outerHeight()/2);
    var scrollMagicController = new ScrollMagic.Controller();
    var tween = TweenMax.to( $mapBlock , 0.5, {rotationX: 00});
    var scene = new ScrollMagic.Scene({triggerElement: $(".geographyBlock"), duration: durationVal-30, offset: -30})
                // animate color and top border in relation to scroll position
                .setTween(tween)
                //.addIndicators() // add indicators (requires plugin)
                .addTo(scrollMagicController);
};
/*===========END homepage==============*/
function chartColumsInit(incData, incElement){
    if( !incElement.length > 0 ){
        return false;
    }
    var incomingSeriesLength = Object.keys(incData.sections).length;
    var chart;
    if (typeof incData.tooltipName == "undefined"){ incData.tooltipName = "" }else{ incData.tooltipName = incData.tooltipName+": " }
    if (typeof incData.tooltipValueDesc == "undefined"){ incData.tooltipValueDesc = "" }

    var thisChartCont = incElement.find(".chartContainer");
    var sortSectionsMas = [];
    var obj = jQuery.extend({}, incData.sections);
    for (var j in obj) {
        sortSectionsMas.push(parseInt(j));
    }

    sortSectionsMas.sort(function(a, b) {
      return a - b;
    });
    var activeSeriesData = incData.sections[sortSectionsMas[0]];

    initDataForFix = [];
    var lf = incData.sections[sortSectionsMas[0]].length;
    for( var i = 0; i < lf; i++  ){
        initDataForFix.push( { y: 0, name: "" } );
    }

    var chartType;
    if( typeof incData.horizontalCols != "undefined" && incData.horizontalCols ){
        chartType = "bar"
    }else{
        chartType = "column";
    }

    var dataRotationxAxis_x,
    dataRotationxAxis_y,
    dataRotationxAxis_align,
    dataRotationxAxis_rotation;
    if( typeof incData.rotationxAxis != "undefined" && incData.rotationxAxis ){
        dataRotationxAxis_x = 12;
        dataRotationxAxis_y = 10;
        dataRotationxAxis_align = "right";
        dataRotationxAxis_rotation = -45;
    }else{
        if( chartType == "bar" ){
            dataRotationxAxis_x = -22;
            dataRotationxAxis_y = null;
            dataRotationxAxis_align = "left";
            dataRotationxAxis_rotation = 0;
        }else{
            dataRotationxAxis_x = 0;
            dataRotationxAxis_y = null;
            dataRotationxAxis_align = "center";
            dataRotationxAxis_rotation = 0;
        }
    }

    var hc_outerW = parseInt( incElement.outerWidth()),
    hc_outerH = parseInt( incElement.outerHeight()),
    hc_ml = ( typeof incData.ml != "undefined" ? incData.ml : ( chartType == "bar" ? 70 : 61 ) ),
    hc_mr = ( typeof incData.mr != "undefined" ? incData.mr : 36 ),
    hc_mt = ( typeof incData.mt != "undefined" ? incData.mt : 117 ),
    hc_mb = ( typeof incData.mb != "undefined" ? incData.mb : ( incomingSeriesLength < 2 ? 50 : 125) ),
    hc_minY = ( typeof incData.minY != "undefined" ? incData.minY : null ),
    hc_maxY = ( typeof incData.maxY != "undefined" ? incData.maxY : null ),
    hc_titleY = ( typeof incData.titleY != "undefined" ? incData.titleY : null ),
    hc_titleY_isEnabled = ( typeof incData.titleY != "undefined" ? true : false ),
    hc_innerW = hc_outerW-hc_ml-hc_mr,
    hc_innerH = hc_outerH-hc_mt-hc_mb,
    hc_colsPadding = ( typeof incData.colsPadding != "undefined" ? incData.colsPadding : ( chartType == "bar" ? 10 : 4 ) );
    pointW_value = (hc_innerW - ( (incData.sections[sortSectionsMas[0]].length-1)*hc_colsPadding )) / incData.sections[sortSectionsMas[0]].length,
    pointH_value = (hc_innerH - ( (incData.sections[sortSectionsMas[0]].length-1)*hc_colsPadding )) / incData.sections[sortSectionsMas[0]].length,
    curPointSize = ( chartType == "bar" ? pointH_value : pointW_value ),
    thisChartCont.highcharts({
        chart: {
            type: chartType,
            backgroundColor:'transparent',
            marginTop: hc_mt,
            marginBottom: hc_mb,
            marginLeft: hc_ml,
            marginRight: hc_mr
        },
        credits: {
            enabled: false
        },
        title: {
            useHTML: true,
            text: "<div class='chartTitle'>"+(incData.title ? incData.title : '')+"</div>",
            y: 40,
            style: {
              fontSize: '16px',
              fontWeight: "bold",
              fontFamily: 'OpenSans'
            }
        },
        subtitle: {
            useHTML: true,
            text: "<div class='chartDesc'>"+(incData.desc ? incData.desc : '')+"</div>",
            y: 65,
            style: {
              fontSize: '16px',
              fontWeight: "normal",
              fontStyle: "italic",
              fontFamily: 'OpenSans'
            }
        },
        xAxis: {
            type: 'category',
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            minorTickLength: 0,
            tickLength: 0,
            labels: {
                x: dataRotationxAxis_x,
                y: dataRotationxAxis_y,
                align: dataRotationxAxis_align,
                rotation: dataRotationxAxis_rotation,
                useHTML: true,
                formatter: function () {
                    return "<div class='columnsXAxisLabels'><span class='name'>"+this.value+"</span></div>";
                },
                style: {
                    color: "#111111",
                    fontSize: '11px',
                    fontFamily: 'OpenSans',
                    fontWeight: 'normal'
                }
            }
        },
        yAxis: {
            min: hc_minY,
            max: hc_maxY,
            gridLineColor: 'transparent',
            title: {
                enabled: hc_titleY_isEnabled,
                text: hc_titleY
            },
            labels: {
                x: -11,
                style: {
                    color: "#9ea4a9",
                    fontSize: '11px',
                    fontFamily: 'OpenSans',
                    fontWeight: 'normal',
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            backgroundColor: '#FFF',
            zIndex: 5,
            style: {
                padding: 0,
                zIndex: 2,
            },
            useHTML: true,
            formatter: function () {
                return "<div class='columsTooltip'><span class='name'>"+this.point.name+"</span>"+(this.point.tooltipDesc ? " <span class='tooltipDesc'>"+this.point.tooltipDesc+"</span>" : "")+"</div>";
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    crop: false,
                    overflow: 'none',
                    rotation: 0,
                    color: '#111111',
                    shadow: false,
                    className: "columnsDatalabel",
                    useHTML: true,
                    formatter: function () {
                        if (  this.point.showDataLabel != false ) {
                            return "<div class='columnDatalabel'><span class='rect' style='background: "+this.point.color+"'></span><span class='name'>"+this.point.y+"</span>"+(this.point.dataDesc ? " <span class='dataDesc'>"+this.point.dataDesc+"</span>" : "")+"</div>";
                        } else {
                            return null;
                        }
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        fontFamily: 'OpenSans',
                        textShadow: false 
                    }
                }
            },
            column: {
                dataLabels: {
                    enabled: true,
                    crop: false,
                    overflow: 'none',
                    rotation: 0,
                    color: '#111111',
                    shadow: false,
                    align: 'center',
                    useHTML: true,
                    formatter: function () {
                        if (  this.point.showDataLabel != false ) {
                            return "<div class='columnDatalabel'><span class='rect' style='background: "+this.point.color+"'></span><span class='name'>"+this.point.y+"</span>"+(this.point.dataDesc ? " <span class='dataDesc'>"+this.point.dataDesc+"</span>" : "")+"</div>";
                        } else {
                            return null;
                        }
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        fontFamily: 'OpenSans',
                        textShadow: false 
                    }
                }
            }
        },
        series: [{
            pointWidth: curPointSize,
            color:'#224a7b',
            data: initDataForFix, 
        }]
    });
    if( incomingSeriesLength > 1 ){
        var connectSlider = incElement.find('.sl-ui')[0];
        noUiSlider.create(connectSlider, {
            start: sortSectionsMas[0],
            connect: 'lower',
            tooltips: true,
            format: {
                from: function(value) {
                    return value;
                },
                to: function(value) {
                    return value;
                }
            },
            step: 1,
            range: {
                'min': sortSectionsMas[0],
                'max': sortSectionsMas[sortSectionsMas.length-1]
            },
            pips: {
                mode: 'values',
                values: [sortSectionsMas[0], sortSectionsMas[sortSectionsMas.length-1]],
                density: 1000
            }
        });

        connectSlider.noUiSlider.on('update', function( values, handle ){
            chart = thisChartCont.highcharts();
            activeSeriesData = incData.sections[values[handle]];
            chart.series[0].setData(incData.sections[values[handle]] );

            if( chartType == "bar" ){
                if( chart.series[0].barW !==  (hc_innerH - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length ){
                    chart.series[0].update({
                        pointWidth: (hc_innerH - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length
                    });
                }
            }else{
                if( chart.series[0].barW !==  (hc_innerW - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length ){
                    chart.series[0].update({
                        pointWidth: (hc_innerW - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length
                    });
                }
            }

        });
    }else{
        chart = thisChartCont.highcharts();
        chart.series[0].setData(incData.sections[sortSectionsMas[0]] );
    }
    $(window).smartresize(function(){
        hc_outerW = parseInt( incElement.outerWidth()),
        hc_outerH = parseInt( incElement.outerHeight()),
        hc_innerW = hc_outerW-hc_ml-hc_mr,
        hc_innerH = hc_outerH-hc_mt-hc_mb;

        if( chartType == "bar" ){
            chart.series[0].update({
                pointWidth: (hc_innerH - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length
            });
        }else{
            chart.series[0].update({
                pointWidth: (hc_innerW - ( (activeSeriesData.length-1)*hc_colsPadding )) / activeSeriesData.length
            });
        }
    });
}

function chartPieInit(incData, incElement){
    if( !incElement.length > 0 ){
        return false;
    }
    var chart,
    incomingSeriesLength = Object.keys(incData.sections).length;

    if (typeof incData.tooltipName == "undefined"){ incData.tooltipName = "" }else{ incData.tooltipName = incData.tooltipName+": " }
    if (typeof incData.tooltipValueDesc == "undefined"){ incData.tooltipValueDesc = "" }


    var thisChartCont = incElement.find(".chartContainer");
    var sortSectionsMas = [];
    var obj = jQuery.extend({}, incData.sections);
    for (var j in obj) {
        sortSectionsMas.push(parseInt(j));
    }
    sortSectionsMas.sort(function(a, b) {
      return a - b;
    });
    initDataForFix = [];
    var lf = incData.sections[sortSectionsMas[0]].length;
    for( var i = 0; i < lf; i++  ){
        initDataForFix.push( { y: 0, name: "" } );
    }

    var hc_mt = ( typeof incData.mt != "undefined" ? incData.mt : 82 ),
    hc_mb = ( typeof incData.mb != "undefined" ? incData.mb : ( incomingSeriesLength < 2 ? 40 : 100) ),
    hc_ml = ( typeof incData.ml != "undefined" ? incData.ml : 30 ),
    hc_mr = ( typeof incData.mr != "undefined" ? incData.mr : 30 ),
    hc_pieIS = ( typeof incData.pieIS != "undefined" ? incData.pieIS : "52%" ),
    hc_isLegendEnabled = ( typeof incData.isLegendEnabled != "undefined" ? incData.isLegendEnabled : false ),
    hc_isTooltipEnabled = ( typeof incData.isTooltipEnabled != "undefined" ? incData.isLegendEnabled : true ),
    hc_pieStartAngle = ( typeof incData.pieStartAngle != "undefined" ? incData.pieStartAngle : 180 ),
    hc_connectorWidth = ( typeof incData.connectorWidth != "undefined" ? incData.connectorWidth : 0 ),
    hc_dataLabelsDistance = ( typeof incData.dataLabelsDistance != "undefined" ? incData.dataLabelsDistance : 30 );


    thisChartCont.highcharts({
        chart: {
            type: 'pie',
            backgroundColor:'transparent',
            marginTop: hc_mt,
            marginBottom: hc_mb,
            marginLeft: hc_ml,
            marginRight: hc_mr,
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        legend: {
            enabled: hc_isLegendEnabled,
            layout: "vertical",
            align : "left",
            padding: 30,
            itemMarginTop: 6,
            useHTML: true,
        },
        tooltip: {
            enabled: hc_isTooltipEnabled,
            backgroundColor: '#FFF',
            style: {
                padding: 0,
                zIndex: 2,
            },
            useHTML: true,
            //pointFormat: incData.tooltipName+'<b>{point.y} '+incData.tooltipValueDesc+'</b>'
            formatter: function () {
                return "<div class='pieTooltip'></span><span class='name'>"+this.point.name+"</span>"+(this.point.tooltipDesc ? " <span class='tooltipDesc'>"+this.point.tooltipDesc+"</span>" : "")+"</div>";
            }
        },
        credits: {
            enabled: false
        },
        title: {
            useHTML: true,
            text: "<div class='chartTitle'>"+(incData.title ? incData.title : '')+"</div>",
            y: 40,
            style: {
              fontSize: '16px',
              fontWeight: "bold",
              fontFamily: 'OpenSans'
            }
        },
        subtitle: {
            useHTML: true,
            text: "<div class='chartDesc'>"+(incData.desc ? incData.desc : '')+"</div>",
            y: 65,
            style: {
              fontSize: '16px',
              fontWeight: "normal",
              fontStyle: "italic",
              fontFamily: 'OpenSans'
            }
        },
        plotOptions: {
            pie: {
                size:'100%',
                startAngle: hc_pieStartAngle,
                innerSize: hc_pieIS,
                showInLegend: true,
                dataLabels: {
                    distance: hc_dataLabelsDistance,
                    connectorWidth : hc_connectorWidth,
                    enabled: true,
                    useHTML: true,
                    crop: false,
                    overflow: "none",
                    formatter: function () {
                        if (  this.point.showDataLabel != false ) {
                            return "<div class='pieDatalabel'><span class='rect' style='background: "+this.point.color+"'></span><span class='name'>"+this.point.name+"</span>"+(this.point.dataDesc ? " <span class='dataDesc'>"+this.point.dataDesc+"</span>" : "")+"</div>";
                        } else {
                            return null;
                        }
                    }
                }
            },
            connectorColor: "{point.color}",
        },
        series: [{
            data: initDataForFix
        }],
    });

    if( incomingSeriesLength > 1 ){
        var connectSlider = incElement.find('.sl-ui')[0];
        noUiSlider.create(connectSlider, {
            start: sortSectionsMas[0],
            connect: 'lower',
            tooltips: true,
            format: {
                from: function(value) {
                    return value;
                },
                to: function(value) {
                    return value;
                }
            },
            step: 1,
            range: {
                'min': sortSectionsMas[0],
                'max': sortSectionsMas[sortSectionsMas.length-1]
            },
            pips: {
                mode: 'values',
                values: [sortSectionsMas[0], sortSectionsMas[sortSectionsMas.length-1]],
                density: 1000
            }
        });
        connectSlider.noUiSlider.on('update', function( values, handle ){   
            chart = thisChartCont.highcharts();

            chart.series[0].setData(incData.sections[values[handle]] );
        });
    }else{
        chart = thisChartCont.highcharts();
        chart.series[0].setData(incData.sections[sortSectionsMas[0]] );
    }
};

function replaceTitleLink(){
    var $link = $("#content .titleLink");
    if( $link.length > 0 ){
        $link.each(function(){
            $(".pageTitle").prepend( $(this) );
        });
    }
};

function customVideoPlayer(){
    if( !$('#companyVideo').length > 0 ){ return false;}
    var options = {
        "controls": true,
        "autoplay": false,
        "preload": "auto",
        "fluid": true,
        controlBar: {
            volumeMenuButton: {
              inline: false,
              vertical: true
            }
        }
    }
    videojs(document.getElementById('companyVideo'), options, function() {

    }).ready(function(event){
        var myPlayer = this;
        var previousTime = 0;
        var currentTime = 0;
        myPlayer.on('timeupdate', function() {
            previousTime = currentTime;
            currentTime = myPlayer.currentTime();
        });
        myPlayer.on('seeking', function() {
            setTimeout(function(){
                myPlayer.controlBar.progressControl.seekBar.update();
            }, 100)
        });
    });

}

function initStructureList(){
    if( !$(".structure-list .itemsWrap").length > 0 ){return false}
    var $itemsWrap = $(".structure-list .itemsWrap"),
    itemsWrapLength = $itemsWrap.length;
    $itemsWrap.each(function(){
        var $items = $(this).find(".item"),
        itemsL = $items.length,
        myCount = Math.ceil(itemsL/3);
        $items.wrapAll("<div class='colsWrap'></div>");
        
        if( myCount > 0 ){
            for(var i = 0; i < itemsL; i+=myCount) {
              $items.slice(i, i+myCount).wrapAll("<div class='col w-1col'></div>");
            }
        }
    });
    $(".companyStructure .structureItem").on("click", function(){
        var thatScroll = $(".structure-list[data-sectioncode='"+$(this).attr("data-sectioncode")+"']").offset().top;
        TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: thatScroll-10});
    });

    $(".structure-list").css({visibility: "visible"});
};

function initLeadershipList(){
    if( $(".leadership-list .row").length > 0 ){
        $(".leadership-list .row").each(function(i){
            var $this = $(this),
            $details = $this.find(".person-detail");
            $details.insertAfter($this).wrapAll("<div class='detailContainer spoilerContainer'></div>");
        });
        $(".detailContainer").append("<div class='closeButton' />");
        $(".leadership-list").css({visibility: "visible"});
    }
    if( $(".leadership-archive-list .rowSection").length > 0 ){
        $(".leadership-archive-list .rowSection").each(function(i){
            var $this = $(this),
            $leadershipLists = $this.find(".leadership-list");
            $leadershipLists.addClass("spoilerItem").insertAfter($this).wrapAll("<div class='leadershipListContainer spoilerContainer'></div>");
        });
        $(".leadershipListContainer").append("<div class='closeButton' />");
        $(".leadership-archive-list").css({visibility: "visible"});
    }
};
function defaultSpoiler(){
    function initMultiple(){
        $(".default-spoiler").each(function(){
            var $this = $(this);
            if( $this.closest(".default-spoilers-wraper").length == 0 ){
                var $prevs = $this.prevUntil( "*:not(.default-spoiler)" );
                var $nexts = $this.nextUntil( "*:not(.default-spoiler)" );
                if( $prevs.length > 0 || $nexts.length > 0 ){
                    $this.add($prevs).add($nexts).wrapAll("<div class='default-spoilers-wraper'>");
                }
            }
        });
    }
    initMultiple();
    function action($spoiler, update){
        var $spoiler = $spoiler,
            $header = $spoiler.find(".header"),
            $content = $spoiler.find(".content"),
            minH = $header.outerHeight(),
            maxH = minH+$content.outerHeight(),
            args = Array.prototype.slice.call(arguments);
            
        if( args.indexOf("update") > -1 ){
            if( !$spoiler.hasClass("active") ){
                TweenMax.set( $spoiler , { height : minH });
                $spoiler.addClass("complete");
            }else{
                TweenMax.set( $spoiler , { height : maxH });
                $spoiler.addClass("complete");
            }
        }else{
            if( !$spoiler.hasClass("active") ){
                $spoiler.removeClass("complete");
                TweenMax.to( $spoiler , 0.5, { height : maxH, className:"+=active", ease: Power1.easeInOut, onComplete: function(){
                    $spoiler.addClass("complete");
                } });
            }else{
                $spoiler.removeClass("complete");
                TweenMax.to( $spoiler , 0.5, { height : minH, className:"-=active", ease: Power1.easeInOut, onComplete: function(){
                    $spoiler.addClass("complete");
                } });
            }
        }
    }

    $(".default-spoiler").on("click", function(){
        action($(this));
    });
    $(".default-spoiler.open").each(function(){
        action($(this));
    });
    $(".default-spoiler").each(function(){
        action($(this), "update");
    });
    $(window).smartresize(function(){
        $(".default-spoiler").each(function(){
            action($(this), "update");
        })
    });
}
function hardSpoiler(){
    $(".spoilerLink").on("click", function(){
        var $this = $(this),
        $notThisLinks =  $(this).siblings(".spoilerLink").add( $(this).closest(".item").siblings(".item").find(".spoilerLink") ),
        activeId = $(this).attr("name"),
        $nextSpoilerContainer = $(this).closest(".spoilerHead").next(".spoilerContainer"),
        $nextSpoilerItems = $nextSpoilerContainer.find(">.spoilerItem"),
        $activeOuterSpoilerContainer = $this.closest(".spoilerContainer.active"),
        $nextSpoilerItemNotActive = $nextSpoilerItems.not(".spoilerItem[data-section='"+activeId+"']"),
        $nextSpoilerItemActive = $nextSpoilerContainer.find(">.spoilerItem[data-section='"+activeId+"']"),
        activeOuterSpoilerContainerHeight = $activeOuterSpoilerContainer.find(">.spoilerItem.active").outerHeight(),
        nextSpoilerContainerHeight = $nextSpoilerItemActive.outerHeight();

        if( $nextSpoilerItemActive.length == 0 ){
            return false;
        }
        if( $this.hasClass("active") ){
            if( $activeOuterSpoilerContainer.length > 0 ){
                TweenMax.set( $activeOuterSpoilerContainer, { 
                    height : activeOuterSpoilerContainerHeight - nextSpoilerContainerHeight
                });
            }
            TweenMax.set( $nextSpoilerContainer, { 
                clearProps:"height"
            });
            $this.add( $nextSpoilerContainer ).add( $nextSpoilerItems ).removeClass("active");
        }else{
            if( $activeOuterSpoilerContainer.length > 0 ){
                TweenMax.set( $activeOuterSpoilerContainer, { 
                    height : activeOuterSpoilerContainerHeight + nextSpoilerContainerHeight
                });
            }
            TweenMax.set( $nextSpoilerContainer, { 
                height : nextSpoilerContainerHeight
            });
            $this.add( $nextSpoilerContainer ).add( $nextSpoilerItemActive ).addClass("active");
            $nextSpoilerItemNotActive.add( $notThisLinks ).removeClass("active");
        }
        if( $("body.company-rukovod").length > 0 ){
            TweenLite.to(window, 0.6, {ease: Sine.easeInOut, scrollTo: (parseInt($this.offset().top) - 20)});
        }
    });
    $(".spoilerContainer .closeButton").on("click", function(){
        var $this = $(this),
        $spoilerContainer = $this.closest(".spoilerContainer"),
        $activeOuterSpoilerContainer = $this.closest(".spoilerItem").closest(".spoilerContainer.active"),
        activeOuterSpoilerContainerHeight = $activeOuterSpoilerContainer.find(">.spoilerItem.active").outerHeight();
        if( $activeOuterSpoilerContainer.length > 0 ){
            TweenMax.set( $activeOuterSpoilerContainer, { 
                height : activeOuterSpoilerContainerHeight - $spoilerContainer.outerHeight()
            });
        }
        TweenMax.set( $spoilerContainer, { 
            clearProps:"height"
        });

        $spoilerContainer.removeClass("active");
        $spoilerContainer.find(">.spoilerItem").removeClass("active");
        $spoilerContainer.prev(".spoilerHead").find(".spoilerLink").removeClass("active");
    });
    $(window).smartresize(function(){
        var $activeLinks = $(".spoilerLink.active");
        $activeLinks.trigger("click");
        $activeLinks.trigger("click");
    });
};

var myContactsMap;
function contactsMap(){
    if( $("body.contacts").length == 0 ){return false}
    ymaps.ready(init);
    function init(){
        myContactsMap = new ymaps.Map('map', {
            center: [55.729341, 37.568515],
            zoom: 16,
            controls: []
        });
        myContactsMap.behaviors.disable('scrollZoom');
        // Создадим пользовательский макет ползунка масштаба.
        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
                "<div id='zoom-in' class='btn'><i class='icon-plus'></i></div><div id='zoom-out' class='btn'><i class='icon-minus'></i></div>" +
            "</div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                // Генерируем событие, в ответ на которое
                // элемент управления изменит коэффициент масштабирования карты.
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() + 1
                });
                if(  map.getZoom() < 15  ){

                }
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() - 1
                });
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });


    // Создание макета пина
    MyPinLayaout = ymaps.templateLayoutFactory.createClass(
        '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[properties.iconContent]' +
            '</div>' +
            '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.popover', this.getParentElement());
                this.applyElementOffset();
                // this._$element.find('.close')
                //     .on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            // clear: function () {
            //     this._$element.find('.close')
            //         .off('click');

            //     this.constructor.superclass.clear.call(this);
            // },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            // onSublayoutSizeChange: function () {
            //     MyPinLayaout.superclass.onSublayoutSizeChange.apply(this, arguments);

            //     if(!this._isElement(this._$element)) {
            //         return;
            //     }

            //     this.applyElementOffset();

            //     this.events.fire('shapechange');
            // },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function () {
                this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            // onCloseClick: function (e) {
            //     e.preventDefault();

            //     this.events.fire('userclose');
            // },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function () {
                if(!this._isElement(this._$element)) {
                    return MyPinLayaout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
            }
        });
        // var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        //     '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
        //         '<div class="popover-content">$[properties.balloonContent]</div>'
        //);

        // Создание макета пина END

        /*ПИНЫ*/
        var kpp1Name = $("body.en").length == 0 ? 'КПП&nbsp;№1' : 'checkpoint&nbsp;№1';
        var kpp2Name = $("body.en").length == 0 ? 'КПП&nbsp;№2' : 'checkpoint&nbsp;№2';
        var myGeoObject1 = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.728442,37.567991]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: kpp1Name,
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            iconLayout: MyPinLayaout,
            // Метку можно перемещать.
            draggable: true
        });
        var myGeoObject2 = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.729967,37.567283]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: kpp2Name,
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            iconLayout: MyPinLayaout,
            // Метку можно перемещать.
            draggable: true
        });
        //основной пин
        var main = new ymaps.Placemark(myContactsMap.getCenter(), {
            }, {
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/bitrix/templates/interrao-2016/images/mapMainPin.png',
                // Размеры метки.
                iconImageSize: [66, 68],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-22, -68]
            });
        // добавляем обьекты на карту
        myContactsMap.geoObjects
            .add(myGeoObject1)
            .add(myGeoObject2)
            .add(main);


        //myContactsMap.controls.add(zoomControl);
        myContactsMap.controls.add(zoomControl, {
            float: 'none',
            position: {
                right: 16,
                bottom: 44
            }
        });
        myContactsMap.events.add('boundschange', function (e) {
            if ( (e.get('newZoom') != e.get('oldZoom')) && e.get('newZoom') < 16  ){
                myGeoObject1.options.set('visible', false);
                myGeoObject2.options.set('visible', false);
            }else if( (e.get('newZoom') != e.get('oldZoom')) && e.get('newZoom') >= 16 ){
                myGeoObject1.options.set('visible', true);
                myGeoObject2.options.set('visible', true);
            }
            main.options.set('visible', true);
        });
        $(window).smartresize(function(){
            myContactsMap.container.fitToViewport();
        });
        $(".switch-row a").on("click", function(){
           myContactsMap.container.fitToViewport(); 
        });
    }
};
function searchPageInit(){
    if( !$("body.search .search-page").length > 0 ){
        return false;
    }
    var myHtml = "";
    $(".form select[name='where'] option").each(function(){
        if( $(this).is(':selected') ){
            myHtml += "<div class='item'><span data-val='"+$(this).val()+"' name='year'>"+$(this).text()+"</span></div>";
        }else{
            myHtml += "<div class='item'><a data-val='"+$(this).val()+"' name='year'>"+$(this).text()+"</a></div>";
        }
    });
    $(".showBlock").append(myHtml);

    $(".showBlock a").on("click", function(){
        thisVal = $(this).data("val");
        $(".form select[name='where']").val(thisVal);
        $(".form input[type='submit']").trigger("click");
    });
}

function initContactspage(){
    if( $("body.contacts").length == 0 ){ return false; }
    /*pageTitle <br />*/
    var titleHtml = $(".pageTitle h1").html();
    if( titleHtml == "Публичное акционерное общество «Интер РАО»" ){
        var find = "акционерное";
        var l = find.length;
        var lastFindIndex = $(".pageTitle h1").html().indexOf(find)+l;

        var s =  titleHtml.substring(0, lastFindIndex);
        var ss = titleHtml.substring(lastFindIndex);
        var newTitleHtml = s+"<br />"+ss;
        $(".pageTitle h1").html(newTitleHtml);
    }
    $(".pageTitle h1").css({"visibility" : "visible"});
    /*pageTitle <br> END*/
    /*fix long  string regInfo*/
    if( $("#regInfo .ttl").length > 0 && $("#regInfo .dsc").length > 0 ){
        function checkStringLength(){
            $("#regInfo .dsc").each(function(){
                var $this = $(this),
                $thisField = $this.siblings(".ttl"),
                $container = $this.closest("li");
                if( $this.outerWidth()+15 > ( $container.outerWidth() - $thisField.outerWidth() ) ){
                    $container.addClass("longValue");
                }
            });
        }
        checkStringLength();
        $(window).smartresize(function(){
            checkStringLength();
        });
    }
    /*END fix long  string regInfo*/
};

var newsListyear = "all";
function newsListInit(){
    if( !$("body.press-center #content .newsListContent").length > 0 ){
        return false;
    }
    var $block = $("#content .news-list").closest("div[id*='comp_']"),
    blockId = $block.attr("id"),
    id = blockId.replace(/comp_/g, '');
    $(".switch-row a, .financeRow label").on("click", function($element) {

        var $this = $(this);
        if( $this[0].tagName == 'A' ){
            $yearLink = $(this);
        }else{
            $yearLink = $(".switch-row a.active");
        }


        data = {
            bxajaxid:id
        };
        newsListyear = parseInt($yearLink.find("span").text());
        //console.log(data);
        if(typeof(newsListyear) == "undefined" || !$.isNumeric(newsListyear)) {
            data["year"] = "all";
        }else{
            data["year"] = newsListyear;
        }

        if( $this[0].tagName == 'A' ){
            if( $("input[name='finance']").prop('checked') ){
                data["finance"] = "Y";
            }else{
                if( data["finance"] ) {
                    delete data.finance;
                }
            }
        }else if( $this[0].tagName == 'LABEL' ){
            if( $("input[name='finance']").prop('checked') ){
                if( data["finance"] ) {
                    delete data.finance;
                }
            }else{
                data["finance"] = "Y";
            }
        }

        //console.log(data);

        if(xhr){ 
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: window.location.href,
            data: data,
            timeout: 10000,
            beforeSend: function(){
                $(".news-list").addClass("load");
                $(".showMoreWrap").addClass("load");
            },
            success: function(data) {
                $(".news-list").removeClass("load");
                $(".news-list .news-item, .news-list .blockLoader, .showMoreWrap").remove();
                var newsItems = $(data).filter(".news-list").html();
                if( $(data).filter(".showMoreWrap").length > 0 ){
                    var button = $(data).filter(".showMoreWrap")[0].outerHTML;
                }
                $(".showMoreWrap").remove();
                $block.find(".news-list").append(newsItems);
                if( $(data).filter(".showMoreWrap").length > 0 ){
                    $block.append(button);
                }
                
            }
        });
    });
};

function newsListShowMoreButton(){
    $(document).on('click', '[data-show-more]', function(e){
        var btn = $(this);
        var page = btn.attr('data-next-page');
        var id = btn.attr('data-show-more');
        var bx_ajax_id = btn.attr('data-ajax-id');
        var block_id = "#comp_"+bx_ajax_id;

        var data = {
            bxajaxid:bx_ajax_id
        };

        data['PAGEN_'+id] = page;
        if(typeof(newsListyear) == "undefined" || !$.isNumeric(newsListyear)) {
            data["year"] = "all";
        }else{
            data["year"] = newsListyear;
        }

        if( $("input[name='finance']").prop('checked') ){
            data["finance"] = "Y";
        }else{
            if( data["finance"] ) {
                delete data.finance;
            }
        }

        if(xhr){ 
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: window.location.href,
            data: data,
            timeout: 10000,
            beforeSend: function(){
                $(".showMoreWrap").addClass("load");
            },
            success: function(data) {
                $(".showMoreWrap").remove();
                if( $(data).wrap("<div />").parent().find(".news-list").length > 0 ){
                    var newsItems = $(data).wrap("<div />").parent().find(".news-list").html();
                    $(block_id).find(".news-list").append(newsItems);
                }
                if( $(data).wrap("<div />").parent().find(".showMoreWrap").length > 0 ){
                    var button = $(data).wrap("<div />").parent().find(".showMoreWrap")[0].outerHTML;
                    $(block_id).find(".news-list").after(button);
                }
                photogaleryListPrevImgOffset();
            }
        });
    });
}

function photogaleryListPrevImgOffset(){
    var $moveImgs = $("img[datacut]");
    if( $moveImgs.length > 0 ){
        $moveImgs.each(function(){
            var $this = $(this);
            $this.css({"top" : $this.attr("datacut")+"px" })
        });
    }
}

var globalForNewsDetail = false;
var globalForNewsDetailTimeout;
function newsDetailInit(){
    if( !$(".press-center .news-detail").length > 0 ){return false;};
    fixLongPageTitle( $(".nextNewsTitle") );
    $(".sideCol").addClass("qwe");
    var nextNewsBottom = parseInt( $(".nextNews").css("bottom") );
    var $sideCol = $(".sideCol");
    $sideCol.prepend( $(".shareBlock") );

    function detailContentPB(){
        var $detCont = $(".detailContent"),
        $nextNews = $(".nextNews"),
        pb = parseInt($nextNews.outerHeight())-parseInt( $("#mainCol").css("padding-bottom") );
        $detCont.css({ "padding-bottom": pb+"px" });
    }
    detailContentPB();

    function showNextNews(){
        if(globalForNewsDetail){return false}
        var $btn = $(".nextNewsTitle"),
        $detailContent = $('.detailContent'),
        $sideCol = $(".sideCol");
        $newsDetail = $(".news-detail"),
        $pageTitle = $(".pageTitle h1"),
        $nextNews = $(".nextNews");

        id = $btn.attr('data-id'),
        bx_ajax_id = $btn.attr('data-ajaxId');

        var dataObj = {
            bxajaxid: bx_ajax_id,
            ID: id
        };

        $(".nextNews").addClass("load");
        TweenMax.to( $nextNews , 0.5, { bottom : nextNewsBottom+20 });
        $(window).on("scroll.preventAjaxLoad", function(){
            if($(window).scrollTop() + $(window).height()+30 < $(document).height() && !myGlobalisMobileDevice) {
                $(".nextNews").removeClass("load");
                TweenMax.to( $nextNews , 0.5, { bottom : nextNewsBottom });
                xhr.abort();
                $(window).off(".preventAjaxLoad");
                clearTimeout(globalForNewsDetailTimeout);
            };
        });

        if(xhr){ 
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: window.location.href,
            data: dataObj,
            timeout: 10000,
            success: function(data) {
                globalForNewsDetailTimeout = setTimeout(function(){
                    globalForNewsDetail = true;
                    $(".nextNews").removeClass("load");  
                    $(window).off(".preventAjaxLoad");

                    var $nextNewsTitle = $nextNews.find(".nextNewsTitle"),
                    nextNewsTitleClass = " "+$nextNewsTitle.attr("class").replace("nextNewsTitle", ""),
                    nextNewsTitle = $nextNewsTitle.html(),
                    nextNewsPositionTop = $nextNews.position().top,
                    nextNewsDetail = $(data).filter(".news-detail").html(),
                    nextNewsHtml = $(data).filter(".nextNews").html(),
                    newShare = $(data).filter(".shareBlock").html();

                    document.title = $nextNewsTitle.text();
                    $detailContent.append("\
                        <div class='buferNextNews'>\
                            <div class='title"+nextNewsTitleClass+"'>"+nextNewsTitle+"</div>\
                            <div class='text w-2col'>"+nextNewsDetail+"</div>\
                        </div>");
                    var $buferNextNews = $(".buferNextNews");
                    disableScroll();
                    $detailContent.find(".tableScrollWrapper").getNiceScroll().remove();
                    $buferNextNews.show();
                    $buferNextNews.css({top : nextNewsPositionTop+"px" });
                    TweenMax.to( $buferNextNews , 0.25, { autoAlpha : 1 });
                    TweenMax.to( [$nextNews, $pageTitle, $newsDetail, $sideCol], 0.25, { autoAlpha : 0, onComplete: complete1 });
                    function complete1(){
                        var pageTitleHeight = $(".pageTitle").outerHeight(),
                        buferNextNewsPadTop = parseInt( $buferNextNews.css("padding-top") );
                        TweenLite.to(window, 1, {delay: 0.18, ease: Sine.easeInOut, scrollTo: 0});
                        TweenMax.to( $buferNextNews , 1, { top : -pageTitleHeight-buferNextNewsPadTop+"px", delay: 0.15, ease: Sine.easeInOut,  onComplete: complete2 });
                    }
                    function complete2(){
                        $sideCol.find(".shareBlock").html( newShare );
                        $pageTitle.html(nextNewsTitle);
                        $pageTitle.removeClass("long extraLong");
                        $pageTitle.addClass(nextNewsTitleClass);
                        $newsDetail.html(nextNewsDetail);
                        $nextNews.html(nextNewsHtml);
                        fixLongPageTitle( $(".nextNewsTitle") );
                        detailContentPB();
                        $buferNextNews.remove();

                        TweenMax.set( [$nextNews, $pageTitle, $newsDetail], { autoAlpha : 1});
                        TweenMax.to( $sideCol, 0.2, { autoAlpha : 1});
                        TweenMax.set( $nextNews , { bottom : nextNewsBottom });
                        enableScroll();
                        allTablesInit();
                        globalForNewsDetail = false;
                    }

                    var state = {page: dataObj.ID};
                    
                    history.pushState(null, null, "detail.php?ID="+dataObj.ID+"");
                }, 1500);
            }
        });
    }
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height()+30 > $(document).height() && !myGlobalisMobileDevice) {
            showNextNews();
        }
    });
    if( myGlobalisMobileDevice ){
        $("body").on("touchstart", ".nextNews .nextNewsTitle",function(){
            showNextNews();
        });
    }
    window.addEventListener('popstate', function(event) {
        if( window.location.pathname.toLowerCase().indexOf("/press-center/news/") > -1  && window.location.search.toLowerCase().indexOf("id=") > -1  ) {
            // detail page
            if(xhr){
                xhr.abort();
            }
            $(window).off(".preventAjaxLoad");
            clearTimeout(globalForNewsDetailTimeout);
            TweenLite.to(window, 0.01, {scrollTo: 0});
            $.get( window.location.href , function( data ) {
                $('.detailContent').find(".tableScrollWrapper").getNiceScroll().remove();
                $('.pageTitle h1, .detailContent').css({"visibility":"hidden"});
                $('.pageTitle h1').html( $(data).find(".pageTitle h1").html() );
                $('.detailContent').html( $(data).find(".detailContent").html() );
                $(".sideCol").prepend( $(".shareBlock") );
                detailContentPB();
                $(".pageTitle h1, .nextNewsTitle").removeClass("long extraLong");
                fixLongPageTitle( $(".pageTitle h1") );
                document.title = $(".pageTitle h1").text();
                fixLongPageTitle( $(".nextNewsTitle") )
                $('.pageTitle h1, .detailContent').css({"visibility":"visible"});
                allTablesInit();
            });
        }
    }, false);
};

function customTendersInit(){
    if( !$("body.custom .purchaseItemsBlock").length > 0 ){ return false }
        var curVal,
        $tendersBlock = $(".purchaseItemsBlock");
        $("form[name='filter_purchase_form'] select").on('selectric-before-change', function(element){
            curVal = $(this).val();
        });
        $("body").on("click", ".defaultPagination a", function(e){
            goAjax( $(this) );
            e.preventDefault;
            return false;
        })
        if( !myGlobalisMobileDevice ){
            $("form[name='filter_purchase_form'] select").on('selectric-change', function(e){
                goAjax( $(this) );
            });
        }else{
            $("form[name='filter_purchase_form'] select").on('change', function(e){
                goAjax( $(this) );
            });
        }

        function goAjax($element){
            var requestStr;
            if( curVal ==  $element.val() && $element[0].tagName == "SELECT"){ return false }
            if($element[0].tagName == 'A'){
                requestStr = $element.attr("href");
            }else{
                sectionVal = $("form[name='filter_purchase_form'] select[name='filter_purchase_ff[SECTION_ID]']").val(),
                statusVal = $("form[name='filter_purchase_form'] select[name='filter_purchase_pf[STATUS]']").val(),
                filterStr = "?filter_purchase_ff%5BSECTION_ID%5D="+sectionVal+"&filter_purchase_pf%5BSTATUS%5D="+statusVal+"&set_filter=Фильтр&set_filter=Y",
                requestStr = filterStr;
            }
            if(xhr){ 
                xhr.abort();
            }
            xhr = $.ajax({
                type: "GET",
                url: requestStr,
                timeout: 10000,
                beforeSend: function(){
                    $tendersBlock.addClass("load");
                    if( $element[0].tagName == 'A' ){
                        disableScroll();
                    }
                },
                error: function(){
                    enableScroll();
                },
                success: function(data) {
                    //console.log(data);
                    $tendersBlock.removeClass("load");
                    var tendersHtml = $(data).find(".purchaseItemsTable").html();
                    $tendersBlock.find(".purchaseItemsTable").html( tendersHtml );
                    if( $(data).find(".defaultPagination").length > 0 ){
                        var paginationHtml = $(data).find(".defaultPagination").html();
                        $(".defaultPagination").html( paginationHtml );
                    }else{
                        $(".defaultPagination").html( "" );
                    }
                    history.pushState(null, null, requestStr);
                    if( $element[0].tagName == 'A' ){
                        TweenLite.to(window, 0.5, {
                            scrollTo: $(".pageTitle").offset().top, onComplete: function(){ enableScroll(); }
                        });
                    }else{
                        enableScroll();
                    }
                }
            });
        }

        window.addEventListener('popstate', function(event) {
            if( window.location.pathname.toLowerCase().indexOf("/custom/") > -1  ) {
                if(xhr){
                    xhr.abort();
                }
                $.get( window.location.href , function( data ) {
                    $tendersBlock.removeClass("load");
                    TweenLite.to(window, 0.01, {scrollTo: 0});
                    var tendersHtml = $(data).find(".purchaseItemsTable").html(),
                    form = $(data).find("form[name='filter_purchase_form']");
                    $tendersBlock.find(".purchaseItemsTable").html( tendersHtml );
                    form.find("select").each(function(i){
                        $("form[name='filter_purchase_form'] select:eq("+i+")").val( $(this).val() );
                        $("form[name='filter_purchase_form'] select:eq("+i+")").trigger("change");
                        $('select').selectric('refresh');
                    });
                    if( $(data).find(".defaultPagination").length > 0 ){
                        var paginationHtml = $(data).find(".defaultPagination").html();
                        $(".defaultPagination").html( paginationHtml );
                    }else{
                        $(".defaultPagination").html( "" );
                    }
                    $(".selectric-scroll").getNiceScroll().resize();
                });
            }
        }, false);
};

function initCompanyHistory(){
    $(".switch-content .year").each(function(){
        $(this).find(".defaultItem:first").addClass("first");
        $(this).find(".fastenItem:first").addClass("first");
        $(this).find(".defaultItem:last").addClass("last");
        $(this).find(".fastenItem:last").addClass("last");
    });
    $(".switch-content div[data-name='main-events'] .item").removeClass("defaultItem").addClass("fastenItem");
};

function placeholderHideOnfocus(){
    $(function () {
        $('input,textarea').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                   .attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    });
};

function customizeCheckbox( $element ){
    var $cBox = $element.find("input[type='checkbox']");
    if( !$cBox.length > 0 ){return false;}
    $cBox.each(function(){
        $(this).wrap("<span class='custom-checkbox' />").after('<span class="box"><span class="tick"></span></span>');
    });
};
function customizeRadiobox($element){
    var $rBox = $element.find("input[type='radio']");
    if( !$rBox.length > 0 ){return false;}
    $rBox.each(function(){
        $(this).wrap("<span class='custom-radiobox' />").after('<span class="box"><span class="dot"></span></span>');
    });
}

function initInvestorKit(){
    if( !$("body.investors-collect-invetstor-kit #invKitForm").length > 0 ){return false;}
    var $block = $("#reportingForm");
    var $blockContent = $("#reportingForm .content");
    $(".switch-row a").on("click", function() {
        var $this = $(this);
        var myUrl = "form.ajaxhandler.php?AJAX=Y&section="+$this.attr("data-name");

        if(xhr){ 
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: myUrl,
            timeout: 10000,
            beforeSend: function(){
                $block.addClass("load");
            },
            success: function(data) {
                $block.removeClass("load");
                $blockContent.html("");
                var newContent = $(data).wrapAll("<div />").parent().html();
                $blockContent.append(newContent);
            }
        });
    });
    if( $(".switch-row").length > 0 && window.location.hash.length == 0 ){
        $(".switch-row a:first-child").trigger("click");
    }
};
function investorsFunds(){
    if( !$("#investorsFunds").length > 0 ){return false;}
    var $block = $("#investorsFunds");
    var $blockContent = $("#investorsFunds .content");
    $(".switch-row a").on("click", function() {
        var $this = $(this);
        var myUrl = "ajaxhandler.php?AJAX=Y&section="+$this.attr("data-name");

        if(xhr){
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: myUrl,
            timeout: 10000,
            beforeSend: function(){
                $block.addClass("load");
            },
            success: function(data) {
                $block.removeClass("load");
                $blockContent.html("");
                var newContent = $(data).wrapAll("<div />").parent().html();
                $blockContent.append(newContent);
            }
        });
    });
    if( $(".switch-row").length > 0 && window.location.hash.length == 0 ){
        $(".switch-row a:first-child").trigger("click");
    }
};

function instrumentsCalendar(){
    if( !$("body.investors-calendar #invCalendarContent").length > 0 ){return false;}
    var $block = $("#invCalendarContent"),
    $blockContent = $("#invCalendarContent .tableContent"),
    $bxblock = $block.closest("div[id*='comp_']"),
    bxblockId = $bxblock.attr("id"),
    bxid = bxblockId.replace(/comp_/g, '');

    $blockContent.on("click", "#allcheckbox",function(){
        var $this = $(this);
        if( $this.is(":checked") ){
            $(".tdDate input[type='checkbox']").prop( "checked", true );
        }else{
            $(".tdDate input[type='checkbox']").prop( "checked", false );
        }
    });

    $(".switch-row a[data-val]").on("click", function() {
        var $this = $(this);
        if( $this.hasClass("active") ){ return false; };

        $this.closest(".switch-row").find("a[data-val]").removeClass("active");
        $this.addClass("active");

        var data = {
            bxajaxid:bxid
        };

        var activeYear = $(".switch-row.year a[data-val].active").attr("data-val"),
        activeQuarter = $(".switch-row.quarter a[data-val].active").attr("data-val");

        data["YEAR"] = activeYear;
        if( activeQuarter != "all" ){
            data["QUARTER"] = activeQuarter;
        }
        
        if(xhr){ 
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: window.location.href,
            data: data,
            timeout: 10000,
            beforeSend: function(){

                $block.addClass("load");
            },
            success: function(data) {
                $block.removeClass("load");
                $blockContent.html("");
                var newContent = $(data).find(".tableContent").html();
                $blockContent.append(newContent);
                customizeCheckbox( $blockContent );
                $(".tableContent").each(function(){
                    var $that = $(this);
                    $that.find("tr:has(td):first").find("td").addClass("firstTdRow");
                });
                allTablesInit();
            }
        });
    });
}

function mapOfAssestTop(){
    if( !$("body.activity-map-of-assets #topMapContainer").length > 0 ){ return false; }
    var dataCountries = [
        {
            code: "CN",
            russianName: "Китай",
            value: 1
        },
        {
            code: "EC",
            russianName: "Эквадор",
            value: 1
        },
        {
            code: "TR",
            russianName: "Турция",
            value: 1
        },
        {
            code: "BD",
            russianName: "Бангладеш",
            value: 1
        },
        {
            code: "FI",
            russianName: "Финляндия",
            value: 1
        },
        {
            code: "EE",
            russianName: "Эстония",
            value: 1
        },
        {
            code: "RU",
            russianName: "Российская федерация",
            textColor: "#ffffff",
            value: 1,
            id:"ru"
        },
        // {
        //     code: "KZ",
        //     russianName: "Казахстан",
        //     value: 1
        // },
        {
            code: "AM",
            russianName: "Армения",
            value: 1
        },
        {
            code: "TJ",
            russianName: "Таджикистан",
            value: 1
        },
        // {
        //     code: "AR",
        //     russianName: "Аргентина",
        //     x: "-100px",
        //     y: 0,
        //     value: 1
        // },
        {
            code: "LT",
            russianName: "Литва",
            value: 1
        },
        {
            code: "AF",
            russianName: "Афганистан",
            value: 1
        },
        {
            code: "UA",
            russianName: "Украина",
            value: 1
        },
        {
            code: "GE",
            russianName: "Грузия",
            value: 1
        },
        {
            code: "PL",
            russianName: "Польша",
            value: 1
        },
        {
            code: "LV",
            russianName: "Латвия",
            value: 1
        },
        {
            code: "MD",
            russianName: "Молдавия",
            value: 1
        },
        {
            code: "CU",
            russianName: "Куба",
            value: 1
        },
        {
            code: "VE",
            russianName: "Венесуэла",
            value: 1,
            bg: "#FF0000"
        },
    ];
    // Initiate the chart
    $('#topMapContainer').highcharts('Map', {
        chart: {
            backgroundColor: "#fffbf6",
            padding: 0,
            //marginRight: 50,
            events: {
                load: function () {
                    var chart = this;
                    $(chart.series).each(function (i, s) {
                        if( s.name == "activeRegions"  ){
                            $(s.data).each(function (i, d) {
                                var currentLangName  = ( $("body.en").length > 0 ? d.name : d.russianName );
                                $('<div class="'+d.code+'">'+currentLangName+'</div>').hover(function (event) {
                                    event.stopPropagation();
                                    d.setState("select");
                                },function(event){
                                    event.stopPropagation()
                                    d.setState("");
                                }).on("mousemove", function(event){
                                    event.stopPropagation()
                                    d.setState("select");
                                }).appendTo('#legend');
                            });
                        }
                    });
                }
            }
        },
        credits: {
            enabled: false
        },
        dataLabels: {
            enabled: true,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        mapNavigation: {
            enabled: false,
            enableButtons: false,
            buttonOptions: {
                enabled: false,
                verticalAlign: 'bottom'
            }
        },
        plotOptions:{
            series:{
                nullColor: '#eaeaea',
                point:{
                    events:{
                        mouseOver: function(){
                            $("#legend ."+this.code+"").addClass("active");
                        },
                        mouseOut: function(){
                            this.setState('');
                            $("#legend ."+this.code+"").removeClass("active");
                        }
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: { 
            enabled: false
        },
        series: [{
            borderWidth: 0,
            showInLegend: false,
            allAreas: true,
            mapData: Highcharts.maps['custom/world'],
            joinBy: 'hc-key',
        },{
            color: "#5e6879",
            className : "qwe",
            borderWidth: 1,
            allAreas: false,
            name: 'activeRegions',
            cursor: "pointer",
            mapData: Highcharts.maps['custom/world'],
            data: dataCountries,
            joinBy: ['iso-a2', 'code'],
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}'
            },
            dataLabels: {
                enabled: false,
                allowOverlap: true,
                crop: false,
                overflow: "none",
                padding: 2,
                backgroundColor: "#000000",
                align: "right",
                useHTML: true,
                shadow: false,
                // style: {
                //     color: this.point.color,
                //     fontSize: '12px',
                //     fontWeight: 'normal',
                //     fontFamily: 'OpenSans',
                //     textShadow: false 
                // },
                // formatter: function () {
                //     if (this.point.value) {
                //         return "<span style='position: relative; left:"+(this.point.x ? this.point.x : "")+";color:"+(this.point.textColor ? this.point.textColor : "#097ad6")+"'>"+this.point.russianName+"</span>";
                //         //return this.point.russianName;
                //     }
                // }
            },
            states: {
                normal: {
                    animation: false
                },
                select: {
                    color: '#097ad6'
                },
                hover:{
                    color: '#097ad6'
                }
            },
        }]
    });
    setTimeout(function () {
        var points = $('#topMapContainer').highcharts().series[1].points;
        var result = points.filter(function( obj ) {
          return obj.code == "RU";
        });
        //console.log(result[0].index)
        $('#topMapContainer').highcharts().series[1].points[result[0].index].update({
            color: '#e6e8ef'
        });

    }, 100);
};

function detailMapAssets(){
    var $sectResult = $("#detailMap #sectionResult");
    function initMap(){
        /*РАЗБРОС ТОЧЕК ПО СЕКЦИЯМ*/
        var $map =  $("#detailMap"),
            $point = $("#detailMap .point"),
            attrList = $("#detailMap .point").map(function(){return $(this).attr("data-sectioncode");}).get(),
            attrListLength = attrList.length; // определяем длину массива
        attrList.sort(); // сортируем массив

        for (var i = attrListLength - 1; i > 0; i--) {
            if (attrList[i] == attrList[i - 1]) attrList.splice( i, 1);
        }
        //получили готовый масив секций
        //готовим секции
        for (var i=0; i <  attrList.length; i++) {
            var secName = attrList[i],
            $curItemHtml = $("#detailMap .point[data-sectioncode='"+secName+"']").clone();
            $map.append("<div class='sectionItem' data-sectioncode='"+secName+"'></div>");
            $("#detailMap .sectionItem[data-sectioncode='"+secName+"']").append( $curItemHtml );
        }
    }
    initMap();

    /*кластеризация в кажой вкладке*/
    function goClaster(){
        $sectResult.empty();
        $("#detailMap .sectionItem.active .point").each(function(){
            $pointHtml = $(this).clone();
            $sectResult.append($pointHtml);
        });
        $sectResult.each(function(){
            var coordsArray = [];
            var $item = $(this);
            
            $item.find(".point").each(function(){
                var $marker = $(this),
                l = parseInt( $marker.css("left") ),
                t = parseInt( $marker.css("top") );
                coordsArray.push(["left:"+l+", top:"+t+""]);
            });
            //ищем индексы одинаковых позиций маркеров
            var result = [];
            next :
                for (var i = 0; i < coordsArray.length; i++) {
                    var str = coordsArray[i]+""; // для каждого элемента
                    for (var j = 0; j < coordsArray.length; j++) { // ищем, был ли он уже?
                        if ( str == coordsArray[j]+"" && i !== j ){
                            result.push({index: i , str : str});
                            continue next;
                        }
                    }
                }
            
            result.sort(function (a, b) {
            if (a.str > b.str) {
                return 1;
            }
            if (a.str < b.str) {
                return -1;
            }
            // a должно быть равным b
                return 0;
            });
            var parentMarkerIndex = 0;
            var countForParentMarker = 1;
            for (var i = 0; i < result.length; i++) {
                if( i == 0 ){
                    $item.find(".point:eq("+result[parentMarkerIndex].index+")").find(".popup");
                }
                var $thisMarker = $item.find(".point:eq("+result[i].index+")"),
                $parrentMarker = $item.find(".point:eq("+result[parentMarkerIndex].index+")");
                if(typeof result[i+1] !== "undefined"){
                    /*ЕСЛИ ЕСТЬ СЛЕДУЮЩИЙ*/
                    var $nextMarker = $item.find(".point:eq("+result[i+1].index+")"),
                    $nextMarkerPopup = $nextMarker.find(".popup"),
                    nextMarkerPopupHtml = $nextMarkerPopup.find(".content").html();
                    if( result[i].str == result[i+1].str ){
                        /*ЕСЛИ СЛЕДУЮЩИЙ РАВЕН ЭТОМУ*/
                        $nextMarker.hide();
                        $parrentMarker.find(".content").append( '<div class="separate"></div>'+nextMarkerPopupHtml );
                        $parrentMarker.find(".popup").addClass("multiple");
                        countForParentMarker++;
                        $parrentMarker.add( $parrentMarker.find(".icon") ).attr("data-count", countForParentMarker);
                    }else{
                        countForParentMarker = 1;
                        parentMarkerIndex = i+1;
                        $item.find(".point:eq("+result[parentMarkerIndex].index+")").find(".popup").wrapInner("<div class='popupIW' />");
                    }
                }else{
                    
                }
                $thisMarker.addClass("big");
            }
        });
    }
    /*кластеризация в кажой вкладке END*/
    /*==================СОБЫТИЯ==================*/
    function showPointPP(p){
        var $popup = p.find(".popup");
        p.addClass("active")
        TweenMax.set( $popup , { zIndex: 2, display: "block" });
        TweenMax.to( $popup , 0.2, { autoAlpha : 1 });
    }
    function hidePointPP(p){
        var $popup = p.find(".popup");
        p.removeClass("active")
        TweenMax.to( $popup , 0.2,
            {
                autoAlpha : 0,
                onComplete: function(){
                    TweenMax.set( $popup , { zIndex: -1, display: "none" });
                },
            }
        );
    }
    $("#detailMapNavigation .structureItem").on("click", function(){
        var $that = $(this),
        sectName = $that.attr("data-sectioncode");
        if( $that.hasClass("all") ){
            if( $that.hasClass("active") ){
                hidePointPP( $("#detailMap .point.active") );
                $("#detailMap .sectionItem").add( $("#detailMapNavigation .structureItem") ).removeClass("active");
                goClaster();
            }else{
                hidePointPP( $("#detailMap .point.active") );
                $("#detailMap .sectionItem").add( $("#detailMapNavigation .structureItem") ).removeClass("active");
                $("#detailMap .sectionItem[data-sectioncode='"+sectName+"']").add( $("#detailMapNavigation .structureItem[data-sectioncode='"+sectName+"']") ).addClass("active");
                goClaster();
            }
        }else{
            $("#detailMap .sectionItem[data-sectioncode='all']").add( $("#detailMapNavigation .structureItem[data-sectioncode='all']") ).removeClass("active");
            if( $that.hasClass("active") ){
                hidePointPP( $("#detailMap .point.active") );
                $("#detailMap .sectionItem[data-sectioncode='"+sectName+"']").add( $("#detailMapNavigation .structureItem[data-sectioncode='"+sectName+"']") ).removeClass("active");
                goClaster();
            }else{
                hidePointPP( $("#detailMap .point.active") );
                $("#detailMap .sectionItem[data-sectioncode='"+sectName+"']").add( $("#detailMapNavigation .structureItem[data-sectioncode='"+sectName+"']") ).addClass("active");
                goClaster();
            }
        }
    });
    $("#detailMapNavigation .structureItem[data-sectioncode='all']").trigger("click");
    
    $("#detailMap").on("click", ".point .icon",function(){
        var $point = $(this).closest(".point");
        if( $point.hasClass("active") ){ return false;}
        hidePointPP( $("#detailMap .point.active") );
        showPointPP( $point );
    });
    $("#detailMap").on("mouseenter", ".point",function(){
        var $this = $(this),
            $thisTown = $this.find(".city").eq(0),
            $thisCountry = $this.find(".country").eq(0);
            $placesB  = ( $("body.en").length == 0 ? $("#detailMap .places .itemsB.ru") : $("#detailMap .places .itemsB.en") ),
            itemFindText = $thisTown.is(':empty') ? $thisCountry.text().trim().toLowerCase() : $thisTown.text().trim().toLowerCase();
            var $item = $placesB.find(".item[data-name='"+itemFindText+"']");
            $item.addClass("active");
    });
    $("#detailMap").on("mouseleave", ".point", function(){
        $("#detailMap .places .item").removeClass("active");
    });
    $("#detailMap").on("click", ".point .closeButton",function(e){
        e.stopPropagation();
        hidePointPP( $(this).closest(".point") );
    });
    $("#detailMap").on("click", function(e){
        if( $(e.target).closest(".point").length == 0 ){
            hidePointPP( $("#detailMap .point.active") );
        }
    });


};

// function oldBrowserAlert(){
//     if( !$("body.bx-ie8").length > 0 ){
//         return false;
//     }

//     function showMessage(){
//         $.magnificPopup.open({
//             items: {
//                 src: '<div class="oldBrowserAlert mfp-with-anim">\
//                         <p>Для корректного отображения сайта обновите Ваш браузер </p>\
//                     </div>',
//                 type: 'inline'
//             },
//             removalDelay: 500, //delay removal by X to allow out-animation
//             closeBtnInside: true,
//             callbacks: {
//                 beforeOpen: function() {
//                     this.st.mainClass = "mfp-zoom-in";
//                 }
//             },
//             midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
//         });
//     }

//     var hours = 24;
//     var now = new Date().getTime();
//     var setupTime = localStorage.getItem('setupTime');
//     if (setupTime == null) {/*впервый зашел*/
//         localStorage.setItem('setupTime', now);
//         setTimeout(function () {
//             showMessage();
//         }, 1000);
        
//     } else {/*есть предыдущее последнее время*/
//         if(now-setupTime > hours*60*60*1000) {/*если прошло hours*/
//             localStorage.removeItem('setupTime');
//             localStorage.setItem('setupTime', now);
//             setTimeout(function () {
//                 showMessage();
//             }, 1000);
//         }
//     }
// }


function akzionerniiCapitalGraph(){
    if( !$("#akzionerniiCapitalGraph").length > 0 ){ return false; }
    var mainPieData
    if( $("body.en").length > 0 ){
        var title = "Equity capital structure<sup>1</sup>";
        var Free_float = "Free-float";
        var Rosneftegaz_Group = "ROSNEFTEGAZ Group";
        var Inter_RAO_Capital = "Inter RAO Capital Group";
        var FGC_UES_Group = "FGC UES Group";
        var RusHydro_Group = "RusHydro Group";
    }else{
        var title = "Структура акционерного капитала ПАО «Интер РАО»<sup>1</sup>";
        var Free_float = "Free-float";
        var Rosneftegaz_Group = "Группа «РОСНЕФТЕГАЗ»";
        var Inter_RAO_Capital = "Группа «Интер РАО Капитал»";
        var FGC_UES_Group = "Группа ФСК ЕЭС";
        var RusHydro_Group = "Группа РусГидро";
    }
    var mainPieData = {
            "mt": 120,
            "mb": 70,
            "title": title,
            "sections": {
                "2013": [
                    {y:30178921117, name: Free_float , color: "#224a7b", dataDesc: "28.91%", tooltipDesc : "30 178 921 116"},
                    {y:28844020032, name: Rosneftegaz_Group , color: "#F28C00", dataDesc: "27.63%", tooltipDesc : "28 844 020 032"},
                    {y:20859482438, name: Inter_RAO_Capital , color: "#4aaade", dataDesc: "19.98%", tooltipDesc : "20 859 482 438"},
                    {y:19386053950, name: FGC_UES_Group , color: "#fc6621", dataDesc: "18.57%", tooltipDesc : "19 386 053 950"},
                    {y: 5131522463, name: RusHydro_Group , color: "#10789b", dataDesc: "4.92%", tooltipDesc : "5 131 522 463"},
                ],
            }
        };

    chartPieInit( mainPieData , $("#akzionerniiCapitalGraph") );
};

function strategyInit(){
    if( !$("body.strategy, body.investors-company-profile-development-strategy").length > 0 ){ return false; }
    function initMenuNavigation(){
        var $initMenu = $(".menu.init"),
        $content = $("#strategy>.content"),
        $contentSections = $("#strategy>.content>.section");
        masScMenuOffset = [],
        globalForMenuAnimation = false;

        $contentSections.each(function(){

            var $sc = $(this);
            $sc.prepend( $initMenu.clone().removeClass("init") );
            var $thisMenu = $sc.find(".menu"),
            thatActiveClass = $sc.attr("data-name"),
            thatText = $thisMenu.find(".item[data-name='"+thatActiveClass+"'] .text").text();
            $activeMenuPt = $thisMenu.find(".item[data-name='"+thatActiveClass+"']");

            $activeMenuPt.addClass("active");
            if( $activeMenuPt.find(".desc").length > 0 ){
                $thisMenu.find(".topRow .time .item[data-name='"+thatActiveClass+"']").addClass("active");
                $thisMenu.find(".topRow .time").addClass("active");
            }else{
                $thisMenu.find(".topRow .time .item").removeClass("active");
                $thisMenu.find(".topRow .time").removeClass("active");
            }
            $thisMenu.find(".topRow .name").text( thatText );
            
            masScMenuOffset.push( $thisMenu.offset().top );
        });
        var $allMenu = $("#strategy .menu"),
        $allBurger = $("#strategy .burger"),
        $allIcon = $("#strategy .hamburger"),
        $allDropDown = $("#strategy .dropDown"),
        $allDropDownItems = $("#strategy .dropDown .item"),
        $allMenuTime = $allMenu.find(".time"),
        $allMenuTimeItems = $allMenuTime.find(".item");

        function hideMenu($thisMenu){
            if( globalForMenuAnimation ){return false;}
            globalForMenuAnimation = true;
            $allMenu.removeClass("active");
            $allIcon.removeClass("active");
            $allDropDown.removeClass("active");
            $contentSections.removeClass("active");
            TweenMax.to( $allDropDown , 0.2, { 
                autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                    $allDropDown.css({"display": "none"});
                    globalForMenuAnimation=false;
                } 
            });
        }
        function showMenu($thisMenu){
            if( globalForMenuAnimation ){return false;}
            globalForMenuAnimation = true;
            $thisMenu.addClass("active");

            $thisMenu.closest(".section").addClass("active");
            $thisMenu.find(".hamburger").addClass("active");
            var $thisDD = $thisMenu.find(".dropDown");
            $thisDD.addClass("active");
            $thisDD.css({"display": "block"});
            TweenMax.to( $thisDD , 0.15, { autoAlpha : 1, ease: Circ.easeInOut,  onComplete: function(){ globalForMenuAnimation=false; } });        
        }
        $(".menu .topRow").on("click", function(){
            if( $(this).closest(".time").length != 0 ){return false;}
            var $thisMenu = $(this).closest(".menu");
            if( $thisMenu.find(".hamburger").hasClass("active") ){
                hideMenu();
            }else{
                showMenu($thisMenu);
            }
        });
        /*тут логика переключение слайдеров все тригеритрся сюда*/
        $(".menu").on("click", ".dropDown .item", function(){
            if( globalForMenuAnimation ){return false;}
            var $thatPt = $(this),
            thatActiveClass = $thatPt.attr("data-name"),
            thatIndex = $thatPt.index();
            $thatSc = $(".section[data-name='"+thatActiveClass+"']"),
            thatSCTop = $thatSc.offset().top;
            /*hideMenu*/
            globalForMenuAnimation = true;
            $allMenu.removeClass("active");
            $allIcon.removeClass("active");
            $allDropDown.removeClass("active");
            TweenMax.to( $allDropDown , 0.2, {
                autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                    $allDropDown.css({"display": "none"});
                    globalForMenuAnimation=false;
                } 
            });
            /*END hideMenu*/
            disableScroll();
            TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: thatSCTop});
            enableScroll();

        });
        $("body").on("click", function(event) {
            if (($(".menu.active").length > 0) && ($(event.target).closest(".menu").length < 1) ) {
                globalForMenuAnimation = true;
                $allMenu.removeClass("active");
                $allIcon.removeClass("active");
                $allDropDown.removeClass("active");
                $contentSections.removeClass("active");
                TweenMax.to( $allDropDown , 0.2, {
                    autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                        $allDropDown.css({"display": "none"});
                        globalForMenuAnimation=false;
                    } 
                });
            }
        });


        $(".topRow .time .item").on("click", function(){
            var $that = $(this),
            thatActiveClass = $that.attr("data-name");
            if( $that.hasClass("active") ){return false;}
            if( $(".burger-items .item[data-name='"+thatActiveClass+"']").length > 0 ){
                $(".burger-items .item[data-name='"+thatActiveClass+"']").trigger("click");
            }
        });

        function menuScrollAnimation(){
                var controller = new ScrollMagic.Controller({
                    globalSceneOptions: {
                        triggerHook: 'onLeave',
                        offset: 0
                    }
                });
                $contentSections.each(function(i){
                    var $sc = $(this),
                    $thisMenu = $sc.find(".menu"),
                    curDur = typeof masScMenuOffset[i+1] != "undefined" ?  masScMenuOffset[i+1] - masScMenuOffset[i] : 0;
                    scene = new ScrollMagic.Scene({triggerElement: $sc, duration: curDur })
                        .setPin($thisMenu)
                        //.addIndicators({name: i}) // add indicators (requires plugin)
                        .addTo(controller)
                        .on("leave enter", function (event) {
                            hideMenu();
                        });
                });
        }
        menuScrollAnimation();
    }
    initMenuNavigation();

    function inter_rao_segodnya_init(){
        if( $("body.en").length > 0 ){
            var graphEbitatitle = "EBITDA STRUCTURE<sup>1</sup>";
            var Generation = "Generation";
            var Trading = "Trading";
            var Other = "Other";
            var Foreign_assets = "Foreign assets";
            var Supply = "Supply";
        }else{
            var graphEbitatitle = "Структура EBITDA<sup>1</sup>";
            var Generation = "Генерация";
            var Trading ="Трейдинг";
            var Other ="Прочее";
            var Foreign_assets = "Зарубежные активы";
            var Supply = "Сбыт";
        }
        var graphEbita_DATA = {
            "title": graphEbitatitle,
            "mt": 120,
            "mb": 70,
            "sections": {
                "2013": [
                    {y: 59.7 , name: Generation, color: "#224a7b", dataDesc: "59.7%" },
                    {y: 16.6 , name: Supply, color: "#4aaade", dataDesc: "16.6%" },
                    {y: 12.6 , name: Trading, color: "#fc6621", dataDesc: "12.6%" },
                    {y: 9.5  , name: Foreign_assets, color: "#fdbf2d", dataDesc: "9.5%" },
                    {y: 1.6  , name: Other, color: "#a6a6a6", dataDesc: "1.6%" },
                ]
            }
        };

        if( $("#graphEbita").length > 0 ){
            chartPieInit( graphEbita_DATA , $("#graphEbita") );
        }
        if( $("#europeGVT").length > 0 ){
            if( $("body.en").length > 0 ){
                var title = "SECTOR INDICES<sup>2</sup>";
                var Chemicals_and_petrochemicals = "Chemicals and petroche..";
                var Finance = "Finance";
                var Energy = "Energy";
                var Machine_building = "Machine building";
                var Oil_and_gas = "Oil and gas";
                var Telecommunications = "Telecommunications";
                var Metallurgy = "Metallurgy";
                var Consumer_goods_sector = "Consumer goods sector";
            }else{
                var title = "Отраслевые индексы<sup>2</sup>";
                var Chemicals_and_petrochemicals = "Химия и нефтехимия";
                var Finance = "Финансы";
                var Energy = "Энергетика";
                var Machine_building = "Машиностроение";
                var Oil_and_gas = "Нефть и газ";
                var Telecommunications = "Телекоммуникации";
                var Metallurgy = "Металлургия";
                var Consumer_goods_sector = "Потребительский сектор";
            }
            var initGraphData2 = {
                "title": title,
                 "mb": 65,
                 "mt": 105,
                 "ml": 175,
                 "mr": 20,
                "colsPadding": 2,
                "horizontalCols": true,
                "sections": {
                    "1": [
                        {y: 81.2 ,  name: Chemicals_and_petrochemicals , dataDesc: " %"},
                        {y: 71.0  , name: Finance , dataDesc: " %"},
                        {y: 64.8  , name: Energy , color: "#F28C00", dataDesc: " %"},
                        {y: 40.5  , name: Machine_building , dataDesc: " %"},
                        {y: 36.8  , name: Oil_and_gas , dataDesc: " %"},
                        {y: 27.3  , name: Telecommunications , dataDesc: " %"},
                        {y: 25.9  , name: Metallurgy , dataDesc: " %"},
                        {y: 19.2  , name: Consumer_goods_sector , dataDesc: " %"},
                    ],
                }
            };
            chartColumsInit( initGraphData2 , $("#europeGVT") );
        }
        if( $("#russianGVT").length > 0 ){
            if( $("body.en").length > 0 ){
                var title = "CAPITALIZATION OF ENERGY COMPANIES<sup>2</sup>";
                var Inter_RAO = "Inter RAO";
                var FGC_UES = "FGC UES";
                var Mosenergo = "Mosenergo";
                var OGK_2 = "OGK-2";
                var Russian_Grids = "Russian Grids";
                var RusHydro = "RusHydro";
                var EON_Russia = "E.ON Russia";
                var Enel_Russia = "Enel Russia";
            }else{
                var title = "Капитализация энергетических компаний<sup>2</sup>";
                var Inter_RAO = "Интер РАО";
                var FGC_UES = "ФСК ЕЭС";
                var Mosenergo = "Мосэнерго";
                var OGK_2 = "ОГК-2";
                var Russian_Grids = "Россети";
                var RusHydro = "Русгидро";
                var EON_Russia = "Э.ОН Россия";
                var Enel_Russia = "Энел Россия";
            }
            var initGraphData3 = {
                "title": title,
                 "mb": 65,
                 "mt": 105,
                 "ml": 120,
                // "mr": 150,
                "colsPadding": 2,
                "horizontalCols": true,
                "sections": {
                    "1": [
                        {y: 202.2 , name: Inter_RAO , color: "#F28C00", dataDesc: " %"},
                        {y: 172.7  , name: FGC_UES , dataDesc: " %"},
                        {y: 133.2  , name: Mosenergo , dataDesc: " %"},
                        {y: 60.7  , name: OGK_2 , dataDesc: " %"},
                        {y: 35.0  , name: Russian_Grids , dataDesc: " %"},
                        {y: 16.9  , name: RusHydro , dataDesc: " %"},
                        {y: 10.3  , name: EON_Russia , dataDesc: " %"},
                        {y: -14.4  , name: Enel_Russia , dataDesc: " %"},
                    ],
                }
            };
            chartColumsInit( initGraphData3 , $("#russianGVT") );
        }
    }
    inter_rao_segodnya_init();
    function klyuchevye_tendencii_i_vyzovy_2014_2020_init(){

    }
    klyuchevye_tendencii_i_vyzovy_2014_2020_init();

    function klyuchevye_akcenty_strategii(){
        function setMaxHForTitle(){
            var maxH = 0;
            var $b = $(".section[data-name='klyuchevye_akcenty_strategii'] .title2");
            $b.css({"height": ""});
            $b.each(function(){
                $(this).outerHeight() > maxH ? maxH = $(this).outerHeight() : maxH = maxH;
            });
            $b.css({"height": maxH});
        }
        setMaxHForTitle();
        $(window).smartresize(function(){
            setMaxHForTitle();
        });
    }
    klyuchevye_akcenty_strategii();
    
    function osnovnye_napravleniya_razvitiya(){
        var $blueBlockItems = $(".section[data-name='osnovnye_napravleniya_razvitiya'] .itemList .item");
        $(".section[data-name='osnovnye_napravleniya_razvitiya'] .itemList .item").each(function(i){
            $(this).find(".name").attr("data-count" , i+1);
        });
    }
    osnovnye_napravleniya_razvitiya();


    function celevaya_struktura_kapitala(){
        if( $("#akzionerniiCapitalGraph_mini").length > 0 ){
            var akzionerniiCapitalGraph_mini = {
                "title": "СТРУКТУРА АКЦИОНЕРНОГО КАПИТАЛА<br />ПАО «ИНТЕР РАО» (2014 г.)",
                "mt": 100,
                "mb": 50,
                "ml": 125,
                "mr": 125,
                "dataLabelsDistance" : 15,
                "sections": {
                    "2013": [
                        {y: 4.92 ,   name: "Группа<br />«РусГидро»", color: "#10789b", dataDesc: "4.92%"},
                        {y: 5.11 ,   name: "ВЕБ", color: "#64b326", dataDesc: "5.11%"},
                        {y: 13.21,   name: "Группа<br />«Норильский Никель»", color: "#318b68", dataDesc: "13.21%"},
                        {y: 13.93,   name: "Казначейские акции", color: "#224a7b", dataDesc: "13.93%"},
                        {y: 16.65,   name: "Миноритарные<br />акционеры", color: "#a6a6a6", dataDesc: "16.65%"},
                        {y: 18.57,   name: "Группа<br />«ФСК ЕЭС»", color: "#4aaade", dataDesc: "18.57%"},
                        {y: 27.63,   name: "Группа<br />«Роснефтегаз»", color: "#fdbf2d", dataDesc: "27.63%"},
                    ]
                }
            };
        
            chartPieInit( akzionerniiCapitalGraph_mini , $("#akzionerniiCapitalGraph_mini") );
        }
        if( $("#zelevayaStructAkzionerniiCapital").length > 0 ){
            if( $("body.en").length > 0 ){
                var title = "TARGET STRUCTURE OF SHAREHOLDERS'<br />EQUITY OF INTER RAO (2020)";
                var The_state_and_state_companies = "The state<br />and state companies";
                var Minority_shareholders = "Minority<br />shareholders";
                var Strategic_investor = "Strategic investor<sup>1</sup>";
            }else{
                var title = "ЦЕЛЕВАЯ СТРУКТУРА АКЦИОНЕРНОГО КАПИТАЛА<br />ПАО «ИНТЕР РАО» (2020 Г.)";
                var The_state_and_state_companies = "Государство и<br />государственные<br />компании";
                var Minority_shareholders = "Миноритарные<br />акционеры";
                var Strategic_investor = "Стратегический инвестор<sup>1</sup>";


            }
            var zelevayaStructAkzionerniiCapital = {
                "title": title,
                //"pieStartAngle" : 180,
                "mt": 100,
                "mb": 50,
                "ml": 125,
                "mr": 125,
                "dataLabelsDistance" : 25,
                "sections": {
                    "2013": [
                        {y: 50,    name: The_state_and_state_companies , color: "#224a7b", dataDesc: "50%"},
                        {y: 25 ,   name: Minority_shareholders , color: "#fdbf2d", dataDesc: "25%"},
                        {y: 25 ,   name: Strategic_investor , color: "#fc6621", dataDesc: "25%"},
                    ]
                }
            };
        
            chartPieInit( zelevayaStructAkzionerniiCapital , $("#zelevayaStructAkzionerniiCapital") );
        }

    }
    celevaya_struktura_kapitala();
};

function invest_privlekatelnostInit(){
    if( !$("#invest_privlekatelnost").length > 0 ){ return false; }
    function initMenuNavigation(){
        var $initMenu = $(".menu.init"),
        $content = $("#invest_privlekatelnost>.content"),
        $contentSections = $("#invest_privlekatelnost>.content>.section");
        masScMenuOffset = [],
        globalForMenuAnimation = false;

        $contentSections.each(function(){

            var $sc = $(this);
            $sc.prepend( $initMenu.clone().removeClass("init") );
            var $thisMenu = $sc.find(".menu"),
            thatActiveClass = $sc.attr("data-name"),
            thatText = $thisMenu.find(".item[data-name='"+thatActiveClass+"'] .text").text();
            $activeMenuPt = $thisMenu.find(".item[data-name='"+thatActiveClass+"']"),
            activeIndex = $activeMenuPt.index(),
            thatDesc = $activeMenuPt.find(".desc").text();

            $activeMenuPt.addClass("active");

            $thisMenu.find(".topRow .name").text( thatText );
            $thisMenu.find(".topRow .burger .count").text( activeIndex+1 );
            if( thatDesc ){
                $thisMenu.find(".topRow .desc .item").text(thatDesc);
            }else{
                $thisMenu.find(".topRow .desc .item").text("");
            }
            
            masScMenuOffset.push( $thisMenu.offset().top );
        });
        var $allMenu = $("#invest_privlekatelnost .menu"),
        $allBurger = $("#invest_privlekatelnost .burger"),
        $allIcon = $("#invest_privlekatelnost .hamburger"),
        $allDropDown = $("#invest_privlekatelnost .dropDown"),
        $allDropDownItems = $("#invest_privlekatelnost .dropDown .item"),
        $allMenuTime = $allMenu.find(".time"),
        $allMenuTimeItems = $allMenuTime.find(".item");

        $allDropDownItems.each(function(){
            var $that = $(this);
            $that.attr("data-count", $that.index()+1 );
        })

        function hideMenu($thisMenu){
            if( globalForMenuAnimation ){return false;}
            globalForMenuAnimation = true;
            $allMenu.removeClass("active");
            $allIcon.removeClass("active");
            $allDropDown.removeClass("active");
            $contentSections.removeClass("active");
            TweenMax.to( $allDropDown , 0.2, { 
                autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                    $allDropDown.css({"display": "none"});
                    globalForMenuAnimation=false;
                } 
            });
        }
        function showMenu($thisMenu){
            if( globalForMenuAnimation ){return false;}
            globalForMenuAnimation = true;
            $thisMenu.addClass("active");

            $thisMenu.closest(".section").addClass("active");
            $thisMenu.find(".hamburger").addClass("active");
            var $thisDD = $thisMenu.find(".dropDown");
            $thisDD.addClass("active");
            $thisDD.css({"display": "block"});
            TweenMax.to( $thisDD , 0.15, { autoAlpha : 1, ease: Circ.easeInOut,  onComplete: function(){ globalForMenuAnimation=false; } });        
        }
        $(".menu .topRow").on("click", function(){
            if( $(this).closest(".time").length != 0 ){return false;}
            var $thisMenu = $(this).closest(".menu");
            if( $thisMenu.hasClass("active") ){
                hideMenu();
            }else{
                showMenu($thisMenu);
            }
        });
        /*тут логика переключение слайдеров все тригеритрся сюда*/
        $(".menu").on("click", ".dropDown .item", function(){
            if( globalForMenuAnimation ){return false;}
            var $thatPt = $(this),
            thatActiveClass = $thatPt.attr("data-name"),
            thatIndex = $thatPt.index();
            $thatSc = $(".section[data-name='"+thatActiveClass+"']"),
            thatSCTop = $thatSc.offset().top;
            /*hideMenu*/
            globalForMenuAnimation = true;
            $allMenu.removeClass("active");
            $allIcon.removeClass("active");
            $allDropDown.removeClass("active");
            TweenMax.to( $allDropDown , 0.2, {
                autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                    $allDropDown.css({"display": "none"});
                    globalForMenuAnimation=false;
                } 
            });
            /*END hideMenu*/
            disableScroll();
            TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: thatSCTop});
            enableScroll();

        });
        $("body").on("click", function(event) {
            if (($(".menu.active").length > 0) && ($(event.target).closest(".menu").length < 1) ) {
                globalForMenuAnimation = true;
                $allMenu.removeClass("active");
                $allIcon.removeClass("active");
                $allDropDown.removeClass("active");
                $contentSections.removeClass("active");
                TweenMax.to( $allDropDown , 0.2, {
                    autoAlpha : 0, ease: Circ.easeOut, onComplete: function(){ 
                        $allDropDown.css({"display": "none"});
                        globalForMenuAnimation=false;
                    } 
                });
            }
        });


        $(".topRow .time .item").on("click", function(){
            var $that = $(this),
            thatActiveClass = $that.attr("data-name");
            if( $that.hasClass("active") ){return false;}
            if( $(".burger-items .item[data-name='"+thatActiveClass+"']").length > 0 ){
                $(".burger-items .item[data-name='"+thatActiveClass+"']").trigger("click");
            }
        });

        function menuScrollAnimation(){
                var controller = new ScrollMagic.Controller({
                    globalSceneOptions: {
                        triggerHook: 'onLeave',
                        offset: 0
                    }
                });
                $contentSections.each(function(i){
                    var $sc = $(this),
                    $thisMenu = $sc.find(".menu"),
                    curDur = typeof masScMenuOffset[i+1] != "undefined" ?  masScMenuOffset[i+1] - masScMenuOffset[i] : 0;
                    scene = new ScrollMagic.Scene({triggerElement: $sc, duration: curDur })
                        .setPin($thisMenu)
                        //.addIndicators({name: i}) // add indicators (requires plugin)
                        .addTo(controller)
                        .on("leave enter", function (event) {
                            hideMenu();
                        });
                });
        }
        menuScrollAnimation();
    }    initMenuNavigation();

    function prisutstvie_na_odnom_iz_krupnejshih_ehnergeticheskih_rynkov_v_mire(){
        if( $("#polojenieSrediMirovixIgrokov").length > 0){
            if( $("body.en").length > 0 ){
                var title0 = "Ranking Among Selected European Utilities";
            }else{
                var title0 = "Положение среди выбранных игроков<br />европейского рынка электроэнергетики";
            }

            var initGraphData0 = {
                "title": title0,
                "mb": 125,
                "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y:134.2,name: "EDF Group"},
                        {y:115.3,name: "Engie"},
                        {y:89.0,name: "Enel Group"},
                        {y:48.1,name: "RWE"},
                        {y:45.1,name: "Iberdrola"},
                        {y:32.4,name: "Inter RAO", color: "#F28C00"},
                        {y:24.4,name: "EDP"},
                        {y:16.0,name: "CEZ Group"},
                        {y:13.7,name: "Fortum"},
                        {y:9.3 ,name: "Verbund"},
                    ],
                }
            };
            chartColumsInit( initGraphData0 , $("#polojenieSrediMirovixIgrokov") );
        }

        if( $("#top10GenCompystMoshn").length > 0){
            if( $("body.en").length > 0 ){
                var title = "TOP 10 RUSSIAN GENERATING COMPANIES<br />IN TERMS OF INSTALLED CAPACITY, GW";
                var Gazpromenergoholding = "Gazpromenergoholding";
                var Rushydro = "Rushydro";
                var Inter_RAO = "Inter RAO";
                var RosAtom = "RosAtom";
                var Eurosibenergo = "Eurosibenergo";
                var T = "T Plus";
                var EON = "E.ON";
                var Enel = "Enel Russia";
                var Generating_company = "Generating company";
                var Siberian_generating_company = "Siberian generating company";
            }else{
                var title = "&laquo;TOP–10 генерирующих компаний РФ<br />по величине установленной мощности, ГВт&raquo;";
                var Gazpromenergoholding = "&laquo;Газпром<br />энергохолдинг&raquo;";
                var Rushydro = "&laquo;РусГидро&raquo;";
                var Inter_RAO = "&laquo;Интер РАО&raquo;";
                var RosAtom = "&laquo;РосАтом&raquo;";
                var Eurosibenergo = "&laquo;Евросибэнерго&raquo;";
                var T = "&laquo;Т Плюс&raquo;";
                var EON = "&laquo;Юнипро&raquo;";
                var Enel = "&laquo;Энел Россия&raquo;";
                var Generating_company = "&laquo;Генерирующая компания&raquo;";
                var Siberian_generating_company = "&laquo;Сибирская<br />генерирующая компания&raquo;";
            }
            var initGraphData1 = {
                "title": title,
                "mb": 125,
                "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y:39.0,name: Gazpromenergoholding },
                        {y:38.6,name: Rushydro },
                        {y:35.0,name: Inter_RAO, color: "#F28C00" },
                        {y:27.2,name: RosAtom },
                        {y:19.5,name: Eurosibenergo },
                        {y:16.1,name: T },
                        {y:11.1,name: EON },
                        {y:9.7 ,name: Enel },
                        {y:7.8 ,name: Generating_company },
                        {y:5.2 ,name: Siberian_generating_company },
                    ],
                }
            };
            chartColumsInit( initGraphData1 , $("#top10GenCompystMoshn") );
        }

        if( $("#top10EkonomikMiraPoObemuPotrebElect").length > 0){
            if( $("body.en").length > 0 ){
                var title = "WORLD'S TOP TEN ECONOMIES<br />IN TERMS OF ENERGY CONSUMPTION, TWH";
                var China = "China";
                var USA = "USA";
                var Russia = "Russia";
                var Japan = "Japan";
                var India = "India";
                var Germany = "Germany";
                var Canada = "Canada";
                var France = "France";
                var Brazil = "Brazil";
                var South_Korea = "South Korea";
            }else{
                var title = "TOP–10 экономик мира <br />по объёму энергопотребления, <br />ТВт*ч";
                var China = "Китай";
                var USA = "США";
                var Russia = "Россия";
                var Japan = "Япония";
                var India = "Индия";
                var Germany = "Германия";
                var Canada = "Канада";
                var France = "Франция";
                var Brazil = "Бразилия";
                var South_Korea = "Южная Корея";
            }
            var initGraphData2 = {
                "title": title,
                 "mb": 125,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 5322 ,name: China },
                        {y: 3886 ,name: USA },
                        {y: 1038 ,name: Russia , color: "#F28C00"},
                        {y: 900  ,name: Japan },
                        {y: 800  ,name: India },
                        {y: 700  ,name: Germany },
                        {y: 700  ,name: Canada },
                        {y: 650  ,name: France },
                        {y: 600  ,name: Brazil },
                        {y: 600  ,name: South_Korea },
                    ],
                }
            };
            chartColumsInit( initGraphData2 , $("#top10EkonomikMiraPoObemuPotrebElect") );
        }

        if( $("#top10EkonomikMiraPoVelichineYstMosh").length > 0){
            if( $("body.en").length > 0 ){
                var title = "WORLD'S TOP TEN COUNTRIES<br />IN TERMS OF INSTALLED CAPACITY, GW";  
                var China = "China";
                var USA = "USA";
                var Japan = "Japan";
                var India = "India";
                var Russia = "Russia";
                var Germany = "Germany";
                var Brazil = "Brazil";
                var Canada = "Canada";
                var France = "France";
                var Italy = "Italy";
            }else{
                var title = "TOP–10 стран мира<br />по величине установленной мощности,<br />ГВт";
                var China = "Китай";
                var USA = "США";
                var Japan = "Япония";
                var India = "Индия";
                var Russia = "Россия";
                var Germany = "Германия";
                var Brazil = "Бразилия";
                var Canada = "Канада";
                var France = "Франция";
                var Italy = "Италия";
            }
            var initGraphData3 = {
                "title": title,
                 "mb": 125,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 1365 ,name: China },
                        {y: 1164 ,name: USA },
                        {y: 300 ,name: Japan },
                        {y: 280 ,name: India },
                        {y: 270 ,name: Russia , color: "#F28C00"},
                        {y: 230 ,name: Germany },
                        {y: 200 ,name: Brazil },
                        {y: 200 ,name: Canada },
                        {y: 180 ,name: France },
                        {y: 150 ,name: Italy },
                    ],
                }
            };
            chartColumsInit( initGraphData3 , $("#top10EkonomikMiraPoVelichineYstMosh") );
        }
    }
    prisutstvie_na_odnom_iz_krupnejshih_ehnergeticheskih_rynkov_v_mire();



    if( $("body.en").length > 0 ){
        var tooltip4pie = "Inter RAO"
        var tooltip4pieAll = "Other";
    }else{
        var tooltip4pie = "Интер РАО"
        var tooltip4pieAll = "Остальные";
    }
    var tooltop4pie = "Other"
    function lidiruyushchie_pozicii_v_kazhdom_iz_biznes_segmentov(){
        if( $("#proizvodstvoEE").length > 0){
            if( $("body.en").length > 0 ){
                var title = "Electricity production<sup>1</sup>";
                var desc = "% of Russian market";
            }else{
                var title = "Производство э/э<sup>1</sup>";
                var desc = "% от российского рынка";
            }
            var initGraphData1 = {
                "title": title,
                "pieStartAngle" : 0,
                "desc": desc,
                 "mb": 80,
                 "mt": 125,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 12.8 ,name: tooltip4pie, color: "#F28C00", dataDesc : "12.8 %", sliced: true},
                        {y: 87.2 ,name: tooltip4pieAll, dataDesc : "%", color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( initGraphData1 , $("#proizvodstvoEE") );
        }

        if( $("#proizvodstvoTE").length > 0){
            if( $("body.en").length > 0 ){
                var title =  "Heat production<sup>2</sup>";
                var desc = "% of Russian market";
            }else{
                var title = "Производство Т/э<sup>2</sup>";
                var desc = "% от российского рынка";
            }
            var initGraphData2 = {
                "title": title,
                "pieStartAngle" : 0,
                "desc": desc,
                 "mb": 80,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "pieIS": "0%",
                "connectorWidth" : 0,
                "dataLabelsDistance": 15,
                "sections": {
                    "1": [
                        {y: 3.2 ,name: tooltip4pie, color: "#F28C00", dataDesc : "3.2 %", sliced: true},
                        {y: 96.8 , name: tooltip4pieAll, dataDesc : "%", color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( initGraphData2 , $("#proizvodstvoTE") );
        }

        if( $("#sbitEE").length > 0){
            if( $("body.en").length > 0 ){
                var title =  "Supply<sup>1</sup>";
                var desc = "% of Russian market";
            }else{
                var title = "СБЫТ э/э<sup>1</sup>";
                var desc = "% от российского рынка";
            }
            var initGraphData3 = {
                "title": title,
                "pieStartAngle" : 0,
                "desc": desc,
                 "mb": 80,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "pieIS": "0%",
                "connectorWidth" : 0,
                "dataLabelsDistance": 15,
                "sections": {
                    "1": [
                        {y: 16.1 ,name: tooltip4pie, color: "#F28C00", dataDesc : "16.1 %", sliced: true},
                        {y: 83.9 , name: tooltip4pieAll, dataDesc : "%", color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( initGraphData3 , $("#sbitEE") );
        }

        if( $("#treiding").length > 0){
            if( $("body.en").length > 0 ){
                var title =  "Trading";
                var desc = "% of Russian market";
            }else{
                var title = "ТРЕЙДИНГ";
                var desc = "% от российского рынка";
            }
            var initGraphData4 = {
                "title": title,
                "pieStartAngle" : 0,
                "desc": desc,
                 "mb": 80,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "pieIS": "0%",
                "connectorWidth" : 0,
                "dataLabelsDistance": 15,
                "sections": {
                    "1": [
                        {y: 99.9 ,name: tooltip4pie, color: "#F28C00", dataDesc : "99.9 %" },
                        {y: 0.1 ,name: tooltip4pieAll, dataDesc : "%", sliced: true, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( initGraphData4 , $("#treiding") );
        }
    }
    lidiruyushchie_pozicii_v_kazhdom_iz_biznes_segmentov();


    function ustojchivyj_rost_finansovyh_pokazatelej(){
        if( $("#viruchka_1d3").length > 0){
            if( $("body.en").length > 0 ){
                var title = "REVENUE";
                var desc = "BLN RUBLES";
            }else{
                var title = "ВЫРУЧКА";
                var desc = "МЛРД РУБ.";
            }
            var initGraphData1 = {
                "title": title,
                "desc": desc,
                "horizontalCols": true,
                 "mb": 75,
                 "mt": 145,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 805.3  ,name: "2015", color: "#F28C00"},
                        {y: 741.1  ,name: "2014"},
                        {y: 662.3  ,name: "2013"},
                        {y: 556.2  ,name: "2012"},
                        {y: 536.2  ,name: "2011"},
                        {y: 464.3  ,name: "2010"},
                    ],
                }
            };
            chartColumsInit( initGraphData1 , $("#viruchka_1d3") );
        }

        if( $("#ebitda_1d3").length > 0){
            if( $("body.en").length > 0 ){
                var desc = "BLN RUBLES";
            }else{
                var desc = "МЛРД РУБ.";
            }
            var initGraphData2 = {
                "title": "EBITDA",
                "desc": desc,
                "horizontalCols": true,
                 "mb": 75,
                 "mt": 145,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 71.1  ,name: "2015", color: "#F28C00"},
                        {y: 56.3  ,name: "2014"},
                        {y: 39.2  ,name: "2013"},
                        {y: 26.6  ,name: "2012"},
                        {y: 41.6  ,name: "2011"},
                        {y: 33.6  ,name: "2010"},
                    ],
                }
            };
            chartColumsInit( initGraphData2 , $("#ebitda_1d3") );
        }

        if( $("#pribilClear_1d3").length > 0){
            if( $("body.en").length > 0 ){
                var title = "NET INCOME";
                var desc = "BLN RUBLES";
            }else{
                var title = "Чистая прибыль";
                var desc = "МЛРД РУБ.";
            }
            var initGraphData3 = {
                "title": title,
                "desc": desc,
                "horizontalCols": true,
                 "mb": 75,
                 "mt": 145,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 32.8  ,name: "2015", color: "#F28C00"},
                        {y: 23    ,name: "2014"},
                        {y: -20.5 ,name: "2013"},
                        {y: -41.7 ,name: "2012"},
                        {y: 41.4  ,name: "2011"},
                        {y: 18.6  ,name: "2010"},
                    ],
                }
            };
            chartColumsInit( initGraphData3 , $("#pribilClear_1d3") );
        }
    }
    ustojchivyj_rost_finansovyh_pokazatelej();

    function vysokij_uroven_operacionnoj_ehffektivnosti(){
        if( $("#rentabelnostEbitda").length > 0){
            if( $("body.en").length > 0 ){
                var title = "EBITDA MARGIN, %";
                var EON_Russia = "E.ON Russia";
                var Inter_RAO = "Inter RAO";
                var TGK_1 = "TGK-1";
                var Mosenergo = "Mosenergo";
                var Enel_Russia = "Enel Russia";
                var OGK_2 = "OGK-2";
            }else{
                var title = "Рентабельность по EBITDA, %";
                var EON_Russia = "Э.ОН Россия" ;
                var Inter_RAO = "Интер РАО" ;
                var TGK_1 = "ТГК-1" ;
                var Mosenergo = "Мосэнерго" ;
                var Enel_Russia = "Энел Россия" ;
                var OGK_2 = "ОГК-2" ;
            }
            var initGraphData1 = {
                "title": title,
                 "mb": 100,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 32 ,name: EON_Russia , dataDesc : "%"},
                        {y: 30 ,name: Inter_RAO , color: "#F28C00", dataDesc : "%"},
                        {y: 25 ,name: TGK_1 , dataDesc : "%"},
                        {y: 17  ,name: Mosenergo , dataDesc : "%"},
                        {y: 15  ,name: Enel_Russia , dataDesc : "%"},
                        {y: 11  ,name: OGK_2 , dataDesc : "%"},
                    ],
                }
            };
            chartColumsInit( initGraphData1 , $("#rentabelnostEbitda") );
        }

        if( $("#vvodNovixMoshnostei").length > 0){
            if( $("body.en").length > 0 ){
                var title = "COMMISSIONING OF NEW EFFICIENT<br />CAPACITIES, GW (AS FROM 2009)";
                var GEH = "GEH";
                var Inter_RAO = "Inter RAO";
                var EON_Russia = "E.ON Russia";
                var Fortum = "Fortum";
                var T = "T+";
                var Enel_Russia = "Enel Russia";
            }else{
                var title = "Ввод новых эффективных <br />мощностей, ГВт (с 2009 года)";
                var GEH = "ГЭХ";
                var Inter_RAO = "Интер РАО";
                var EON_Russia = "Э.ОН Россия";
                var Fortum = "Фортум";
                var T = "Т Плюс";
                var Enel_Russia = "Энел Россия";
            }
            var initGraphData2 = {
                "title": title,
                 "mb": 100,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 5.0 , name: GEH },
                        {y: 4.1 , name: Inter_RAO , color: "#F28C00"},
                        {y: 2.4  , name: EON_Russia },
                        {y: 2.1  , name: Fortum },
                        {y: 2.0  , name: T },
                        {y: 0.8  , name: Enel_Russia },
                    ],
                }
            };
            chartColumsInit( initGraphData2 , $("#vvodNovixMoshnostei") );
        }

        if( $("#zagruzkaGenerOborud").length > 0){
            if( $("body.en").length > 0 ){
                var title = "UTILIZATION OF GENERATION<br />EQUIPMENT, %";
                var EON_Russia = "E.ON Russia";
                var Enel_Russia = "Enel Russia";
                var Inter_RAO = "Inter RAO";
                var Mosenergo = "Mosenergo";
                var TGK_1 = "TGK-1";
                var T = "T+";
            }else{
                var title = "Загрузка генерирующего<br />оборудования, %";
                var EON_Russia = "Э.ОН Россия";
                var Enel_Russia = "Энел Россия";
                var Inter_RAO = "Интер РАО";
                var Mosenergo = "Мосэнерго";
                var TGK_1 = "ТГК-1";
                var T = "Т Плюс";

            }
            var initGraphData3 = {
                "title": title,
                 "mb": 90,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 58 , name: EON_Russia , dataDesc : "%"},
                        {y: 52 , name: Enel_Russia ,  dataDesc : "%"},
                        {y: 50  , name: Inter_RAO , color: "#F28C00", dataDesc : "%"},
                        {y: 47  , name: Mosenergo , dataDesc : "%"},
                        {y: 42  , name: TGK_1 , dataDesc : "%"},
                        {y: 40  , name: T , dataDesc : "%"},
                    ],
                }
            };
            chartColumsInit( initGraphData3 , $("#zagruzkaGenerOborud") );
        }

        if( $("#vivodNerentabelnoiGenerazii").length > 0){
            if( $("body.en").length > 0 ){
                var title = "DECOMMISSIONING OF UNPROFITABLE<br />GENERATION CAPACITIES, GW";
                var Inter_RAO = "Inter RAO";
                var T = "T+";
                var GEH = "GEH";
                var Quadra = "Quadra";
                var Fortum = "Fortum";
                var SGK = "SGK";
            }else{
                var title = "Вывод нерентабельной<br />генерации, ГВт";
                var Inter_RAO = "Интер РАО";
                var T = "Т Плюс";
                var GEH = "ГЭХ";
                var Quadra = "Квадра";
                var Fortum = "Фортум";
                var SGK = "СГК";
            }
            var initGraphData4 = {
                "title": title,
                 "mb": 90,
                 "mt": 125,
                // "ml": 150,
                // "mr": 150,
                "rotationxAxis": true,
                "sections": {
                    "1": [
                        {y: 1.0 ,name: Inter_RAO , color: "#F28C00"},
                        {y: 0.7 ,name: T },
                        {y: 0.6 ,name: GEH },
                        {y: 0.2 ,name: Quadra },
                        {y: 0.1 ,name: Fortum },
                        {y: 0.1 ,name: SGK },
                    ],
                }
            };
            chartColumsInit( initGraphData4 , $("#vivodNerentabelnoiGenerazii") );
        }

    }
    vysokij_uroven_operacionnoj_ehffektivnosti();

    function komfortnyj_uroven_dolgovoj_nagruzki(){

    }
    komfortnyj_uroven_dolgovoj_nagruzki();

    function vysokij_uroven_korporativnogo_upravleniya(){

    }
    vysokij_uroven_korporativnogo_upravleniya();

    function professionalnyj_menedzhment_orientirovannyj_na_sozdanie_stoimosti_dlya_akcionerov(){
        function setMaxHForUl(){
            var maxH = 0;
            var $b = $(".section[data-name='professionalnyj_menedzhment_orientirovannyj_na_sozdanie_stoimosti_dlya_akcionerov'] .w-2d4col");
            $b.css({"height": ""});
            $b.each(function(){
                $(this).outerHeight() > maxH ? maxH = $(this).outerHeight() : maxH = maxH;
            });
            $b.css({"height": maxH});
        }
        setMaxHForUl();
        $(window).smartresize(function(){
            setMaxHForUl();
        });
    }
    professionalnyj_menedzhment_orientirovannyj_na_sozdanie_stoimosti_dlya_akcionerov();

};

function checkgreyTabsMenuState(){
    if( !$(".grey-tabs-menu").length > 0 ){return false;}
    var urlPath = window.location.pathname,
    urlPathMas = urlPath.split('/'),
    lastPath = (urlPathMas[urlPathMas.length-1] == "") ? urlPathMas[urlPathMas.length-2] : urlPathMas[urlPathMas.length-1] ;
    //console.log( lastPath );
    if( $(".grey-tabs-menu li a[href*='"+lastPath+"']").length > 0 ){
        $(".grey-tabs-menu li a[href*='"+lastPath+"']").addClass("active");
    }
}

function wattengPage(){
    if( $("#watengPieChart").length > 0 ){
        var pie1_DATA = {
            "title": "Выработка электроэнергии филиалами ОАО 'ИНТЕР РАО ЕЭС'' в 2009 году (млн. кВт.ч)",
            "sections": {
                "1": [
                    {y:534.6, name: "Сочинская ТЭС", color: "#224a7b", dataDesc : "534.6"},
                    {y:590.0, name: "Ивановские ПГУ", color: "#318b69", dataDesc: "590.0"},
                    {y:2528.9, name: "Калининг  радская ТЭЦ-2", color: "#4aaade", dataDesc: "2528.9"},
                    {y:6097.7, name: "Северо-Западная ТЭЦ", color: "#10789b", dataDesc: "6097.7"},
                ]
            }
        }; 
        chartPieInit( pie1_DATA , $("#watengPieChart") );
    }
    if( $("#watengColsChart").length > 0 ){
        var col1_DATA = {
            "title": "Динамика коэффициента использования установленной мощности (%)",
            "tooltipName" : "Мощность",
            "tooltipValueDesc" : "%",
            "sections": {
                "1": [
                    {y:88.2, name: "2007"},
                    {y:117.7, name: "2008"},
                    {y:119.8, name: "2009"},
                ]
            }
        }; 
        chartColumsInit( col1_DATA , $("#watengColsChart") );
    }
};

function osnovniePokazateli(){
    if( !$("#osnovniePokazateli").length > 0 ){ return false; }
    var globDesc = "";
    if( $("body.en").length > 0 ){
        globDesc = "BLN RUBLES";
    }else{
        globDesc = "МЛРД РУБ.";
    }

    function checkState(){
       if( $(".switch-row a[data-sname]").length > 0 && window.location.hash.length > 0 ){
            var classes = window.location.hash.substr(1),
                arCl = classes.split("&"),
                arL = arCl.length;

            $(".switch-row a[data-sname], .content div[data-sname]").removeClass("active");
            for (var i = 0; i < arL ; i++) {
                $(".switch-row a[data-sname='"+arCl[i]+"'] , .content div[data-sname='"+arCl[i]+"']").addClass("active");
            }
        }
    }
    checkState();
    
    $(".switch-row a[data-sname]").on("click", function() {
        var $this = $(this);
        if( $this.hasClass("active") ){ return false; };

        $this.closest(".switch-row").find("a[data-sname]").removeClass("active");
        $this.addClass("active");

        $("#osnovniePokazateli .content").find(".section, .filter").removeClass("active");
        window.location.hash = "#";
        var total = $(".switch-row a[data-sname].active").length;
        $(".switch-row a[data-sname].active").each(function(i){
            var name;
            if( i == total-1 ){
                name = $(this).attr("data-sname");
            }else{
                name = $(this).attr("data-sname")+"&";
            }
            $("#osnovniePokazateli div[data-sname='"+$(this).attr("data-sname")+"']").addClass("active");
            window.location.hash += name;
        });
    });

    if( $("#op_Viruchka").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Revenue";
        }else{
            var title = "Выручка";
        }
        function op_Viruchka(){
            var op_Viruchka = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 805.3 , name: title, color: "#224a7b", dataDesc : "805.3"},
                    ],
                }
            };
            chartPieInit( op_Viruchka , $("#op_Viruchka") );
        }
        op_Viruchka();
    }

    if( $("#op_Viruchka16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Revenue";
        }else{
            var title = "Выручка";
        }
        function op_Viruchka16(){
            var op_Viruchka16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 868.2 , name: title, color: "#224a7b", dataDesc : "868.2"},
                    ],
                }
            };
            chartPieInit( op_Viruchka16 , $("#op_Viruchka16") );
        }
        op_Viruchka16();
    }

    if( $("#op_ebitda").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "EBITDA";
            var all = "Revenue";
        }else{
            var title = "EBITDA";
            var all = "Выручка";
        }
        function op_ebitda(){
            var op_ebitda = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 71.1 ,name: title, color: "#F28C00", dataDesc : "71.1", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_ebitda , $("#op_ebitda") );
        }
        op_ebitda();
    }

    if( $("#op_ebitda16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "EBITDA";
            var all = "Revenue";
        }else{
            var title = "EBITDA";
            var all = "Выручка";
        }
        function op_ebitda16(){
            var op_ebitda16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 96.3 ,name: title, color: "#F28C00", dataDesc : "96.3", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_ebitda16 , $("#op_ebitda16") );
        }
        op_ebitda16();
    }

    if( $("#op_clearPrib").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Net Income";
            var all = "Revenue";
        }else{
            var title = "Чистая прибыль";
            var all = "Выручка";
        }
        function op_clearPrib(){
            var op_clearPrib = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 23.936 ,name: title, color: "#F28C00", dataDesc : "23.936", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_clearPrib , $("#op_clearPrib") );
        }
        op_clearPrib();
    }

    if( $("#op_clearPrib16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Net Income";
            var all = "Revenue";
        }else{
            var title = "Чистая прибыль";
            var all = "Выручка";
        }
        function op_clearPrib16(){
            var op_clearPrib16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 61.3 ,name: title, color: "#F28C00", dataDesc : "61.3", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_clearPrib16 , $("#op_clearPrib16") );
        }
        op_clearPrib16();
    }

    if( $("#op_FCF").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "FCF";
            var all = "Revenue";
        }else{
            var title = "FCF";
            var all = "Выручка";
        }
        function op_FCF(){
            var op_FCF = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 23.9 ,name: title , color: "#F28C00", dataDesc : "23.9", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_FCF , $("#op_FCF") );
        }
        op_FCF();
    }

    if( $("#op_FCF16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "FCF";
            var all = "Revenue";
        }else{
            var title = "FCF";
            var all = "Выручка";
        }
        function op_FCF16(){
            var op_FCF16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 45.3 ,name: title , color: "#F28C00", dataDesc : "45.3", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_FCF16 , $("#op_FCF16") );
        }
        op_FCF16();
    }

    if( $("#op_dolg").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Debt";
            var all = "Revenue";
        }else{
            var title = "ДОЛГ";
            var all = "Выручка";
        }
        function op_dolg(){
            var op_dolg = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 90.2 ,name: title, color: "#F28C00", dataDesc : "90.2", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_dolg , $("#op_dolg") );
        }
        op_dolg();
    }

    if( $("#op_dolg16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Debt";
            var all = "Revenue";
        }else{
            var title = "ДОЛГ";
            var all = "Выручка";
        }
        function op_dolg16(){
            var op_dolg16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 17.8 ,name: title, color: "#F28C00", dataDesc : "17.8", sliced: true},
                        {y: 805.3 ,name: all, color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_dolg16 , $("#op_dolg16") );
        }
        op_dolg16();
    }


    if( $("#op_clearDolg").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Net debt";
            var all = "Revenue";
        }else{
            var title = "ЧИСТЫЙ ДОЛГ";
            var all = "Выручка";
        }
        function op_clearDolg(){
            var op_clearDolg = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 6.6 , name: title , color: "#F28C00", dataDesc : "6.6", sliced: true},
                        {y: 805.3 , name: all , color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_clearDolg , $("#op_clearDolg") );
        }
        op_clearDolg();
    }

    if( $("#op_clearDolg16").length > 0 ){
        if( $("body.en").length > 0 ){
            var title = "Net debt";
            var all = "Revenue";
        }else{
            var title = "ЧИСТЫЙ ДОЛГ";
            var all = "Выручка";
        }
        function op_clearDolg16(){
            var op_clearDolg16 = {
                "title": title,
                "pieStartAngle" : 0,
                "isLegendEnabled" : false,
                "desc": globDesc,
                 "mb": 40,
                 "mt": 100,
                 "pieIS": "0%",
                 "connectorWidth" : 0,
                 "dataLabelsDistance": 15,
                // "ml": 150,
                // "mr": 150,
                "sections": {
                    "1": [
                        {y: 0 , name: title , color: "#F28C00", dataDesc : "-78.2", sliced: true},
                        {y: 805.3 , name: all , color: "#224a7b", showDataLabel: false},
                    ],
                }
            };
            chartPieInit( op_clearDolg16 , $("#op_clearDolg16") );
        }
        op_clearDolg16();
    }
}
function siteLift(){
    var $lift = $("#leftCol .siteLift"),
        $leftMenu = $("#leftMenu"),
        leftMenuOT = $leftMenu.offset().top,
        wheight = window.innerHeight ? window.innerHeight : $(window).height(),
        $win = $(window);

    TweenMax.set( $lift, { x : -$win.scrollLeft() });

    $lift.on("click", function(){
        disableScroll();
        TweenLite.to(window, 0.4, { ease: Sine.easeInOut, scrollTo: 0});
        enableScroll();
    });

    $(window).smartresize(function(){
         TweenMax.set( $lift, { x : -$win.scrollLeft() });
         wheight = window.innerHeight ? window.innerHeight : $(window).height();
    });

    function leftScroll(){
        if( $win.scrollTop() > wheight && $win.scrollTop() > (leftMenuOT+$leftMenu.outerHeight()) ){
            if( !$lift.hasClass("active") ){
                $lift.addClass("active");
                TweenMax.fromTo( $lift , 0.2, { display:"block" } , { autoAlpha:0.5, display:"block"  });
            }
        }else{
            if( $lift.hasClass("active") ){
                $lift.removeClass("active");
                TweenMax.to( $lift , 0.2, { autoAlpha:0 , display:"none" });
            }
        }
    }
    $("#leftMenu .root-item-selected.item-selected>a").on("click", function(e){
        setTimeout(function(){
            leftScroll();
        }, 210)
    });
    $( window ).scroll(function() {
        // console.log(wheight);
        // console.log("____");
        // console.log($win.scrollTop());
        leftScroll();
    });
}

function popupFunctions(){
    $("a[name='popupHref']").magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        fixedContentPos: true,
        mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    function showSubscribeMessage(){
        var $msg = $(".messageState");

        if( !$msg.length > 0 ){ return false; }

        $.magnificPopup.open({
            items: {
                src: '<div class="whitePopup mfp-with-anim">\
                        <div>'+$msg.wrap("<div style='display:none;'></div>").parent().html()+'</div>\
                    </div>',
                type: 'inline'
            },
            removalDelay: 300, //delay removal by X to allow out-animation
            closeBtnInside: true,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = "mfp-zoom-in";
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    }
    showSubscribeMessage();
}

function KOSTbIJIb_ForChartsDataLabel(){
    /*костыль для лейблов ндял цифр с точками запятыми*/
    if( $("body.en").length > 0 ){ return false; }
    $(".chartContainerWrapper .pieDatalabel, .chartContainerWrapper .columnDatalabel").each(function(){
        console.log("qwe");
        var $this = $(this),
            thisHtml = $this.html(),
            myReg = /(\d)(\.)(\d)/,
            newHtml = thisHtml.replace(/(\d+)(\.)(\d+)/, "$1,$3");
        $this.html(newHtml);
    });
}

var globalForWindowLoading = false;
function loadFnc(){
/*GLOBAL*/
    fixLongPageTitle( $(".pageTitle h1") );
/*END GLOBAL*/
/*NEWS DETAIL*/
    newsDetailInit();
/*END NEWS DETAIL*/
/*COMPANY*/
    initCompanyHistory();
    akzionerniiCapitalGraph();
/*COMPANY*/
/*GLOBAL*/
    removeGlobalLoader();
    //oldBrowserAlert();
    setPageMaxHeight();
    KOSTbIJIb_ForChartsDataLabel();
/*END GLOBAL*/
    globalForWindowLoading = true;
}
$(document).ready(function() {
/*GLOBAL*/
    allTablesInit();
    headerSearch();
    headerLogin();
    slideMainMenu();
    replaceTitleLink();
    switchRow();
    optionSelect();
    placeholderHideOnfocus();
    customizeCheckbox( $("#content") );
    customizeRadiobox( $("#content") );
    checkgreyTabsMenuState();
    validateSubscribeEmail();
    defaultSpoiler();
    siteLift();
    popupFunctions();
/*end GLOBAL*/
/*search page*/
    searchPageInit();
/*search page END*/
/*HOMEPAGE*/
    HomepageMainSlider( $("#homepageMainSlider") );
    homepageSubscribe();
    homepageGeoMap();
/*END HOMEPAGE*/
/*COMPANY*/
    customVideoPlayer();
    initStructureList();
    initLeadershipList();
/*END COMPANY*/
/*CONTACTS*/
    contactsMap();
    initContactspage();
/*END CONTACTS*/
/*NEWS LIST*/
    newsListInit();
    newsListShowMoreButton();
    photogaleryListPrevImgOffset();
/*END NEWS*/
/*CUSTOMS*/
    customTendersInit();
/*END CUSTOMS*/
/*INVESTORS*/
    initInvestorKit();
    investorsFunds();
    instrumentsCalendar();
    invest_privlekatelnostInit();
    osnovniePokazateli();
/*END INVESTORS*/
/*MAP OF ASSETS*/
    mapOfAssestTop();
    detailMapAssets();
/*END MAP OF ASSETS*/
/*STRATEGY*/
    strategyInit();
/*END STRATEGY*/
/*===TRASH PAGES===*/
    wattengPage();
/*===TRASH PAGES===*/
/*GLOBAL*/
    checkHashSwitchRowState();
    hardSpoiler();

    setTimeout(function(){
        if( !globalForWindowLoading ){
            loadFnc();
        }
        removeGlobalLoader();
    }, 5000)
/*end GLOBAL*/
});
window.onload = function() {
    loadFnc();
};