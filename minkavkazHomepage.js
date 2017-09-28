var mainTopBannersSlideFnc,
myIntervalForTopBanners,
myIntervalForBottomBanners;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
function mainTopBanners(){
        var siteBG = "/bitrix/templates/minkavkaz2015/images/border-bottom-transpaernt-white.png",
        siteBG2 = "/bitrix/templates/minkavkaz2015/images/bg-site-text.png",
        map = $("#main-banners .map"),
        Xform, isIe8,
        resWidthqq = $('#main-banners .slider-item.item-1 .bg').width() / 100 * 110,
        resHeightqq = $('#main-banners .slider-item.item-1 .bg').height() / 100 * 110,
        diffXqq = (resWidthqq - $('#main-banners .slider-item.item-1 .bg').width()) / 2,
        diffYqq = (resHeightqq - $('#main-banners .slider-item.item-1 .bg').height()) / 2,
        tlstart = new TimelineLite(),
        WW = $(window).width();
        $("html.bx-ie8").length>0 ? isIe8 = true : isIe8 = false; 
    
 /*svg init*/
    var p = Raphael("svg-container"),
    pathAttributes = {
        'stroke-width': 1,
        stroke: '#fff',
        opacity : 0.6,
        fill: "none"
    },
    polygonAttributes = {
        'stroke-width': 1,
        stroke: '#fff',
        opacity : 0,
        fill: "#fff"
    },
    textAttributes = {
        "fill": "#FFFFFF",
        "font-family":'PTSans-Caption',
        "font-size":"10px",
        "opacity" : 0,
        "letter-spacing" :1
    },
    polygonAttributesFix = {
        'stroke-width': 4,
        stroke: '#fff',
        opacity : 0,
        fill: "#fff"
    },
    textAttributesFix = {
        "fill": "#FFFFFF",
        "font-family":'PTSans-Caption',
        "font-size":"16px",
        "opacity" : 0
    };
    p.setStart();
    var i = 0;
    var myMasScalepath = [
//        0.8, 0.8,
//        1.3, 1.4,
//        1.4, 1.2,
//        1.2, 1.3,
//        1.2, 1.2,
//        1.3, 1.3,
//        0.8  0.8
        0.8,
        1.4,
        1.2,
        1.3,
        1.2,
        1.3,
        0.8
    ];
    var textCoordsMasX = [
//        314.1589, 314.1589,
//        288.4101, 252.4916,
//        252.4916, 178.8598,
//        194.6568, 122.2213,
//        178.8598, 194.6568,
//        122.2213, 288.4101,
//        230.0612  230.0612
        314.1589,
        252.4916,
        178.8598,
        122.2213,
        194.6568,
        288.4101,
        230.0612
    ];
    var textCoordsMasY = [
//        535.973 , 535.973 ,
//        429.1664, 398.3837,
//        398.3837, 339.7155,
//        388.0495, 225.3821,
//        339.7155, 388.0495,
//        225.3821, 429.1664,
//        186.9998  186.9998
        535.973 ,
        398.3837,
        339.7155,
        225.3821,
        388.0495,
        429.1664,
        186.9998
    ];
    
    for (var country in paths) {
        var obj = p.path(paths[country].path);
        var obj2 = p.path(paths[country].polygon);
        var obj3 = p.text(textCoordsMasX[i], textCoordsMasY[i], paths[country].name); (paths[country].polygon);
        obj.attr(pathAttributes);
        obj2.attr(polygonAttributes);
        obj3.attr(textAttributes);
        obj.id = "path-" + i;
        obj2.id = "polygon-" + i;
        obj3.id = "text-" + i;
        obj.data("boxXCenter", Math.round((obj.getBBox(false).x2+obj.getBBox(false).x)/2) );
        obj.data("boxYCenter", Math.round((obj.getBBox(false).y2+obj.getBBox(false).y)/2) );
        obj.data("boxMaxSize", Math.round(Math.max(obj.getBBox(false).width, obj.getBBox(false).height)));
        obj2.data("boxXCenter", Math.round((obj2.getBBox(false).x2+obj2.getBBox(false).x)/2) );
        obj2.data("boxYCenter", Math.round((obj2.getBBox(false).y2+obj2.getBBox(false).y)/2) );
        obj3.data("boxXCenter", Math.round((obj3.getBBox(false).x2+obj3.getBBox(false).x)/2) );
        obj3.data("boxYCenter", Math.round((obj3.getBBox(false).y2+obj3.getBBox(false).y)/2) );
       i++;
    }
    p.getById("polygon-0").attr(polygonAttributesFix);
    p.getById("polygon-6").attr(polygonAttributesFix);
    p.getById("text-0").attr(textAttributesFix);
    p.getById("text-6").attr(textAttributesFix);
    
    var allPaths = p.setFinish();
/*end svg init*/
/*start first animation*/
        var newX , newY, newS;
        p.getById("path-0").data("boxXCenter") > 254 ? newX = -p.getById("path-0").data("boxXCenter") + 254  : newX = 254 - p.getById("path-0").data("boxXCenter");
        p.getById("path-0").data("boxYCenter") > 330 ? newY = -p.getById("path-0").data("boxYCenter") + 330 : newY = 330 - p.getById("path-0").data("boxYCenter");
        newS = 200/p.getById("path-0").data("boxMaxSize");
        allPaths.stop();
        allPaths.animate({
            transform: "t"+newX+","+newY+",s"+myMasScalepath[0]+","+myMasScalepath[0]+","+p.getById("path-0").data("boxXCenter")+","+p.getById("path-0").data("boxYCenter")+""
        }, 0, "<>");
        p.getById("path-0").animate({
            opacity : 1,
            "stroke-width": 2
        },0,"<>", setPathTitle);
        function setPathTitle(){
            p.getById("polygon-0").animate({
            opacity : 1
            }, 0, "<>");
            p.getById("text-0").animate({
            opacity : 1
        }, 0, "<>");
        }
        
        if(!isIe8){
            if( !isChrome ){
                tlstart.fromTo($(".slider-item:eq(0)"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, "z-index": 1, force3D:true},0)
                .fromTo($(".slider-item:eq(0) .bg"), 8, 
                {
                    scale: 1,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationZ: 0,
                    transformOrigin: "0 0",
                    force3D: true
                }, 
                {
                    scale: 1.1,
                    x: -diffXqq,
                    y: -diffYqq,
                    z: 0.1,
                    autoAlpha:1,
                    rotationZ: "0.01deg",
                    transformOrigin: "0 0",
                    force3D: true,
                        repeat: 0,
                        ease: Power1.easeOut,
                        delay: 0
                }, 0, "BGscale");
            }else{
                tlstart.fromTo($(".slider-item:eq(0)"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, "z-index": 1, force3D:true},0)
                .fromTo($(".slider-item:eq(0) .bg"), 8, 
                {
                    scale: 1,
                    transformOrigin: "50% 50%",
                    force3D: false
                }, 
                {
                    scale: 1.1,
                    autoAlpha:1,
                    transformOrigin: "50% 50%",
                    force3D: false,
                        repeat: 0,
                        ease: Power1.easeOut,
                        delay: 0
                }, 0, "BGscale");
            }

        }else{
            tlstart.fromTo($(".slider-item:eq(0)"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, "z-index": 1, force3D:true},0);
        }
        function startSetBG(){
            $(".slider-item:eq(0) .site").css({"background-image": "url("+ siteBG2 +")"});
            $(".slider-item:eq(0) .site").find("a").css({"background-image": "url("+ siteBG +")"});
        }
        startSetBG();
/* end start first animation*/
    
    TweenMax.to($("#main-banners .slider-item").eq(0), 0, {autoAlpha:1, visibility: "visible"});
    $("#main-banners .pagination ul li:first-child").addClass("current");
    var slidesCount = $("#main-banners .slider-item").length;
    $("#main-banners .animate-text").each(function (i) {
        $(this).html( $(this).html().replace(/./g, "<span>$&</span>").replace(/\s/g, "&nbsp;"));
    });
    

    mainTopBannersSlideFnc = function(dir, index){
        var cur = ($("#main-banners .slider-item.current").length>0 ? $("#main-banners .slider-item.current").index() : 0);;
        var nextCur;
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
        var currentSlide = $(".slider-item").eq(cur),
        nextCurrnetSlide = $(".slider-item").eq(nextCur),
        nextCurrnetSlideContent = nextCurrnetSlide.find(".content"),
        nextCurrnetSlideContentAnimatetext = nextCurrnetSlideContent.find(".animate-text"),
        ContentAnimatetextSpans = $(".slider-item .animate-text span"),
        nextCurrnetSlideContentAnimatetextSpans = nextCurrnetSlideContentAnimatetext.find("span"),
        nextCurrnetSlideContentDistrict = nextCurrnetSlideContent.find(".content"),
        nextCurrnetSlideContentRegion = nextCurrnetSlideContent.find(".region"),
        nextCurrnetSlideContentSite = nextCurrnetSlideContent.find(".site"),
        currnetSlideContentSite = currentSlide.find(".site"),
        tl = new TimelineLite();
        dir === "right" ? Xform = WW : Xform = -WW;
    /*SVG ANIM*/
        var myPathNextCur = p.getById("path-"+nextCur+"");
        var myPolygonNextCur = p.getById("polygon-"+nextCur+"");
        var myTextNextCur = p.getById("text-"+nextCur+"");

        var myPathCur = p.getById("path-"+cur+"");
        var myPolygonCur = p.getById("polygon-"+cur+"");
        var myTextCur = p.getById("text-"+cur+"");

        var newX , newY, newS;
        myPathNextCur.data("boxXCenter") > 254 ? newX = -myPathNextCur.data("boxXCenter") + 254  : newX = 254 - myPathNextCur.data("boxXCenter");
        myPathNextCur.data("boxYCenter") > 330 ? newY = -myPathNextCur.data("boxYCenter") + 330 : newY = 330 - myPathNextCur.data("boxYCenter");
        newS = 200/myPathNextCur.data("boxMaxSize");
        allPaths.stop();
        allPaths.animate({
            transform: "T"+newX+","+newY+",S"+myMasScalepath[nextCur]+","+myMasScalepath[nextCur]+","+myPathNextCur.data("boxXCenter")+","+myPathNextCur.data("boxYCenter")+""
        }, 700, "<>");
        myPathCur.animate({
            opacity : 0.6,
            "stroke-width": 1
        },0,"<>");
        myPolygonCur.animate({
            opacity : 0
        }, 0, "<>");
        myTextCur.animate({
            opacity : 0
        }, 0, "<>");
        myPathNextCur.animate({
            opacity : 1,
            "stroke-width": 2
        },500,"<>", setPathTitle);
        function setPathTitle(){
            myPolygonNextCur.animate({
            opacity : 1
            }, 200, "<>");
            myTextNextCur.animate({
            opacity : 1
        }, 200, "<>");
        }
/*END SVG ANIM*/
        tl.kill();
        TweenMax.killTweensOf(nextCurrnetSlideContentAnimatetextSpans);
        if(!isIe8){
            if( !isChrome ){
                tl.to($(".slider-item:eq("+cur+")"), 0.7, {autoAlpha:0, force3D:true, clearProps: "all", onComplete: function(){ $(".slider-item:eq("+cur+")").css({visibility: "hidden", "z-index": 0});}},0)
                .to($(".slider-item .site, .slider-item .site a"), 0, {clearProps: "all"}, 0 )
                .fromTo($(".slider-item:eq("+nextCur+")"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, force3D:true, onComplete : function(){$(".slider-item:eq("+nextCur+")").css({"z-index": 1});}},0)
                .fromTo($(".slider-item:eq("+nextCur+") .bg"), 8, 
                {
                    scale: 1,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationZ: 0,
                    transformOrigin: "0 0",
                    force3D: true
                }, 
                {
                    scale: 1.1,
                    x: -diffXqq,
                    y: -diffYqq,
                    z: 0.1,
                    autoAlpha:1,
                    rotationZ: "0.01deg",
                    transformOrigin: "0 0",
                    force3D: true,
                        repeat: 0,
                        ease: Power1.easeOut,
                        delay: 0
                }, 0, "BGscale")
                .staggerFromTo( nextCurrnetSlideContentAnimatetextSpans, 0.1, {autoAlpha:0, x: -30, force3D:true}, {autoAlpha:1,x: 0,force3D:true}, 0.018, "BGscale-=7.5", setBG);
            }else{
                tl.to($(".slider-item:eq("+cur+")"), 0.7, {autoAlpha:0, force3D:true, clearProps: "all", onComplete: function(){ $(".slider-item:eq("+cur+")").css({visibility: "hidden", "z-index": 0});}},0)
                .to($(".slider-item .site, .slider-item .site a"), 0, {clearProps: "all"}, 0 )
                .fromTo($(".slider-item:eq("+nextCur+")"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, force3D:true, onComplete : function(){$(".slider-item:eq("+nextCur+")").css({"z-index": 1});}},0)
                .fromTo($(".slider-item:eq("+nextCur+") .bg"), 8, 
                {
                    scale: 1,
                    transformOrigin: "50% 50%",
                    force3D: false
                }, 
                {
                    scale: 1.1,
                    autoAlpha:1,
                    transformOrigin: "50% 50%",
                    force3D: false,
                        repeat: 0,
                        ease: Power1.easeOut,
                        delay: 0
                }, 0, "BGscale")
                .staggerFromTo( nextCurrnetSlideContentAnimatetextSpans, 0.1, {autoAlpha:0, x: -30, force3D:true}, {autoAlpha:1,x: 0,force3D:true}, 0.018, "BGscale-=7.5", setBG);
            }
        }else{
            tl.to($(".slider-item:eq("+cur+")"), 0.7, {autoAlpha:0, "z-index": 0, force3D:true, clearProps: "all"},0 , function(){ $(".slider-item:eq("+cur+")").css({visibility: "hidden"});})
            .to($(".slider-item .site, .slider-item .site a"), 0, {clearProps: "all"}, 0 )
            .fromTo($(".slider-item:eq("+nextCur+")"), 0.5, {scale:1, visibility: "visible", force3D:true}, {/*left:0,*/ scale:1, autoAlpha:1, "z-index": 1, force3D:true},0);
        }
        
        function setBG(){
            nextCurrnetSlideContentSite.css({"background-image": "url("+ siteBG2 +")"});
            nextCurrnetSlideContentSite.find("a").css({"background-image": "url("+ siteBG +")"});
        }
        
        $(".slider-item, .pagination ul li").removeClass("current start");
        $(".slider-item:eq("+nextCur+"), .pagination ul li:eq("+nextCur+")").addClass("current");
    };
    $("#main-banners .left-arrow").on("click", function(){
        clearInterval(myIntervalForTopBanners);
        mainTopBannersSlideFnc("left");
        myInterval();
    });
    $("#main-banners .right-arrow").on("click", function(){
        clearInterval(myIntervalForTopBanners);
        mainTopBannersSlideFnc("right");
        myInterval();
    });   
    $("#main-banners .pagination ul li").on("click", function(){
        clearInterval(myIntervalForTopBanners);
        mainTopBannersSlideFnc(null, $(this).index());
        myInterval();
    });
}

 function myInterval(){
    myIntervalForTopBanners = setInterval(function(){
        mainTopBannersSlideFnc("right");
    }, 7000);
 }
 
 function initBottomBanners(){
     var itemsL = $(".bottom-banners .img-wrapper").length,
     $items = $(".bottom-banners .img-wrapper"),
     NL = $(".bottom-banners .news-list");
     NL.css({height : $(".bottom-banners .img-wrapper:first-child").outerHeight()});
     if( itemsL > 1 ){
         var innerNav = "<div class='nav-wrap'><span class='leftArrow'></span><ul class='nav'>";
         for(var i=0; i< itemsL; i++){
             innerNav = innerNav +="<li class='pt'></li>";
            if(i+1 === itemsL){
                 innerNav = innerNav+="</ul><span class='rightArrow'></span></div>";
                 $(".bottom-banners").append(innerNav);
             }
         }
         //$(".bottom-banners .nav").css({"margin-left": -($(".bottom-banners .nav").outerWidth()/2)});
         $(".bottom-banners .pt").eq(0).addClass("current");
         $items.eq(0).addClass("current");
     }else{
       return false;
     }
     var nav = $(".bottom-banners .nav"),
     pt = $(".bottom-banners .pt");
     mainBottomBannersSlideFnc = function(dir, index){
        var cur = ($(".bottom-banners .img-wrapper.current").length>0 ? $(".bottom-banners .img-wrapper.current").index() : 0);;
        var nextCur;
        if((dir === "right") && (cur !== itemsL-1)){
            nextCur = cur+1;
        }else if((dir === "right") && (cur === itemsL-1)){
            nextCur = 0;
        }else if((dir === "left") && (cur !== 0)){
            nextCur = cur-1;
        }else if((dir === "left") && (cur === 0)){
            nextCur = itemsL-1;
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
        var currentSlide = $(".img-wrapper").eq(cur),
        nextCurrnetSlide = $(".img-wrapper").eq(nextCur),
        tlb = new TimelineLite();
        
        
        tlb.fromTo( currentSlide, 0.5,{display: "block"}, {autoAlpha:0, onComplete: function(){currentSlide.css({"z-index": 1, display: "none"})} })
        .fromTo( nextCurrnetSlide, 0.5,{display: "block"}, {autoAlpha:1, onComplete: function(){nextCurrnetSlide.css({"z-index": 2})} }, 0)
        .to(NL, 0.3, {height: nextCurrnetSlide.outerHeight()}, 0);
        
        $items.removeClass("current");
        nextCurrnetSlide.addClass("current");
        pt.removeClass("current");
        pt.eq(nextCur).addClass("current");
     }
    pt.on("click", function(){
        clearInterval(myIntervalForBottomBanners);
        mainBottomBannersSlideFnc(null, $(this).index());
        myBottomInterval();
    });
    $(".bottom-banners .leftArrow").on("click", function(){
        clearInterval(myIntervalForBottomBanners);
        mainBottomBannersSlideFnc("left");
        myBottomInterval();
    });
    $(".bottom-banners .rightArrow").on("click", function(){
        clearInterval(myIntervalForBottomBanners);
        mainBottomBannersSlideFnc("right");
        myBottomInterval();
    });   
    function myBottomInterval(){
	myIntervalForBottomBanners = setInterval(function(){
	    mainBottomBannersSlideFnc("right");
	}, 4000);
    }
    myBottomInterval();
 }

function topBanners(){
    var $block = $(".homepage .topBanners");
    var $slides = $(".topBanners .item");
    var slidesCount = $slides.length;
    if ( $(".topBanners .item.cur").length > 0 ){
        var cur = $(".topBanners .item.cur").index(); 
    }else if( $(".topBanners .item.start").length > 0  ){
        var cur = $(".topBanners .item.start").index(); 
    }else{
        var cur = 0;
    }
    $slides.eq(cur).addClass("cur");
    TweenMax.set( $slides.eq(cur), {autoAlpha:1, "z-index": 1} );
    if( slidesCount > 1 ){
        var myInterval;
        function slide(dir, index){
            cur = $(".topBanners .item.cur").index();
            var nextCur;
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
            TweenMax.to( $slides.eq(cur), 1, { autoAlpha:0 , onComplete: function(){$slides.eq(cur).css({"z-index": 1})} });
            TweenMax.to( $slides.eq(nextCur), 1, { autoAlpha:1 , onComplete: function(){$slides.eq(nextCur).css({"z-index": 2})} });
            $slides.removeClass("cur start");
            $slides.eq(nextCur).addClass("cur");
        };
        function myIntervalTopSlider(){
            myInterval = setInterval(function(){
                slide("right");
            }, 4000);
        }
        myIntervalTopSlider();
        $block.on("mouseenter", function(){
            clearInterval(myInterval);
        });
        $block.on("mouseleave", function(){
            clearInterval(myInterval);
            myIntervalTopSlider();
        });
    }
}

$(document).ready(function() {
    if( $("body.blindVersion").length < 1 ){
        if( $("body.homepage").length > 0 ){
            mainTopBanners();
            myInterval();
            initBottomBanners();
            $("#main-banners").addClass("complete");
            topBanners();
            $(".topBanners").addClass("complete");
        }
    }else{
        if( $("body.homepage").length > 0 ){
            $(".outBlindButton").on("click", function(){
                if($("#main-banners.complete").length < 1){
                    setTimeout(function(){ 
                        mainTopBanners();
                        myInterval();
                        initBottomBanners();
                        $("#main-banners").addClass("complete");
                    }, 50);
                }
                if($(".topBanners.complete").length < 1){
                    setTimeout(function(){ 
                        topBanners();
                        $(".topBanners").addClass("complete");
                    }, 10);
                }
            });
        }
    }
});
