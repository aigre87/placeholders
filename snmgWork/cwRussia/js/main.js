/*Проверка на  мобилу*/
var contentSelectors = "\
  #mainWrapper .portlet-content .asset-full-content,\
  #mainWrapper .journal-content-article,\
  #mainWrapper .portlet-asset-categories-navigation .portlet-body,\
  #mainWrapper .contentStyles\
";

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
/*Проверка на  мобилу END*/
/*ОТКЛЮЧЕНИЕ ВКЛЮЧЕНИЕ СКРОЛА*/
var scrollKeys = {37: 1, 38: 1, 39: 1, 40: 1};

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
function enableScroll() {
  if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
};
/*ОТКЛЮЧЕНИЕ ВКЛЮЧЕНИЕ СКРОЛА END*/
/*СКРЫТЬ placeholder по фокусу*/
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
/*СКРЫТЬ placeholder по фокусу END*/
/*Оформление чекбоксов радиобоксов*/
function customizeCheckbox( $element ){
    var $cBox = $element.find("input[type='checkbox']");
    if( $cBox.length == 0 ){return false;}
    $cBox.each(function(){
        $(this).wrap("<span class='custom-checkbox' />").after('<span class="box"><span class="tick"></span></span>');
    });
};
function customizeRadiobox($element){
    var $rBox = $element.find("input[type='radio']");
    if( $rBox.length == 0 ){return false;}
    $rBox.each(function(){
        $(this).wrap("<span class='custom-radiobox' />").after('<span class="box"><span class="dot"></span></span>');
    });
}
/*Оформление чекбоксов радиобоксов END*/
/*Оформление селектов*/
// /*! Selectric Placeholder ϟ v0.2.0 (2017-01-11) - git.io/tjl9sQ - Copyright (c) 2017 Leonardo Santos - MIT License */
// (function(factory) {
//   /* global define */
//   if ( typeof define === 'function' && define.amd ) {
//     define(['jquery'], factory);
//   } else if ( typeof module === 'object' && module.exports ) {
//     // Node/CommonJS
//     module.exports = function( root, jQuery ) {
//       if ( jQuery === undefined ) {
//         if ( typeof window !== 'undefined' ) {
//           jQuery = require('jquery');
//         } else {
//           jQuery = require('jquery')(root);
//         }
//       }
//       factory(jQuery);
//       return jQuery;
//     };
//   } else {
//     // Browser globals
//     factory(jQuery);
//   }
// }(function($) {
//   'use strict';

//   if ( !$.fn.selectric ) {
//     $.error('Selectric not initialized');
//   }
//   $.fn.selectricPlaceholder = function(opts) {
//     return this.each(function() {
//       var $this = $(this);
//       var data = $this.data('selectric');
//       var options = $.extend({
//         placeholderOnOpen: false
//       }, opts);

//       console.log(data.element.selectedOptions[0].tabIndex);
//       data.elements.label.html(data.$element.attr('placeholder'));
//       $this.on('selectric-before-open', function(event, element, data) {
//         if ( options.placeholderOnOpen ) {
//           console.log("qqqq");
//           data.elements.label.data('value', data.elements.label.html()).html(data.$element.attr('placeholder'));
//         }
//         console.log("qqqq1");
//       });

//       $this.on('selectric-before-close', function(event, element, data) {
//         if ( options.placeholderOnOpen ) {
//           data.elements.label.html(data.elements.label.data('value'));
//         }
//       });
//     });
//   };
// }));


function optionSelect($element){
    if( myGlobalisMobileDevice || $element.length == 0 ){ return false; }
    var $selects = $element.find("select");

    $selects.selectric({ 
      preventWindowScroll : false,
      responsive: true
    });

    // $selects.selectricPlaceholder({
    //   placeholderOnOpen: false
    // });

    $selects.each(function(i){
      var $this = $(this),
          $sc = $this.closest(".selectric-wrapper").find(".selectric-scroll");
      $this.selectric('open');

      if( !$sc.hasClass("scrollComplete") ){
        $sc.scrollbar();
        $sc.addClass("scrollComplete").addClass("scrollbar-cwrussia");
      }
      $this.selectric('close');
    });

    $selects.on('selectric-open', function(event, element, selectric) {
      $(".selectric-scroll.scrollComplete").scrollbar('destroy');
      $(".selectric-scroll.scrollComplete").scrollbar();
    });

    $(window).smartresize(function(){
      $(".selectric-scroll.scrollComplete").scrollbar('destroy');
      $(".selectric-scroll.scrollComplete").scrollbar();
    });

};
/*Оформление селектов END*/

/*Создание селект опшнов из ссылок*/
function createOptionSelect($el){
  if( $el.find("li a").length == 0 ){ return false; }
  var $selectBlocks = "<div class='selectsBlock'>"
  $el.each(function(i){
      var $filter = $(this),
          selectricClass = "selectLinks"+i,
          mySelect = "<select class='selectLinks "+selectricClass+"'>";

          $filter.addClass(selectricClass);
          $filter.find("li a").each(function(){
              var $thisa = $(this);
              if( $thisa.hasClass("tag-selected") ){
                  mySelect+="<option selected='selected'>"+$thisa.text()+"</option>";
              }else{
                  mySelect+="<option>"+$thisa.text()+"</option>";
              }
          });
      mySelect+="</select>";
      $selectBlocks+=mySelect;
  });
  $selectBlocks+="</div>";
  
  if( myGlobalisMobileDevice ){
      var $select = $('.selectLinks');
      $("body").on("change", $select, function(){
        var $this = $(this),
            classList = $(this).attr("class").split(' ').join(" "),
            clearclass = classList.replace('selectLinks','').replace(' ',''),
            index = $this.find("option:selected").index(),
            $link = $(".filterHidden ."+clearclass+" a:eq("+index+")"),
            linkHref = $link.attr("href");
        if( typeof linkHref != "undefined" ){
          window.location.href = linkHref;
        }
      });
  }else{
      var $select = $('.selectLinks');
      $("body").on("change", $select, function(){
        var $this = $(this),
            classList = $(this).attr("class").split(' ').join(" "),
            clearclass = classList.replace('selectLinks','').replace(' ',''),
            index = $this.find("option:selected").index(),
            $link = $(".filterHidden ."+clearclass+" a:eq("+index+")"),
            linkHref = $link.attr("href");
          if( typeof linkHref != "undefined" ){
            window.location.href = linkHref;
          }
       });
  }
  return $selectBlocks;
}
/*Создание селект опшнов из ссылок END*/

/*тень блоков*/
var global_zForhoverShadowBlock = 0;
var global_CountForhoverShadowBlock = 0;
function hoverShadowBlock(option, $e){

  function checkCount(){
    if( global_CountForhoverShadowBlock == 0 ){
      global_zForhoverShadowBlock = 0;
    }
  }

  function enter($el){
    var $thiss = $el,
        thisPos =$thiss.css("position"),
        animPos;
    if( thisPos == "static" || thisPos == "relative"){
      animPos = "relative";
    }else if( thisPos == "fixed" ){
      animPos = "fixed";
    }else{
      animPos = "absolute";
    }
    global_zForhoverShadowBlock +=2;

    global_CountForhoverShadowBlock +=1;
    TweenMax.set($thiss, { position: animPos, zIndex: global_zForhoverShadowBlock, boxShadow: "0px 0px 0px 0px rgba(0,54,65,0)" });
    TweenMax.to($thiss, .25, {boxShadow: "0px 5px 20px 0px rgba(0,54,65,0.4)"})
  }
  function leave($el){
    var $thiss = $el;
    TweenMax.to($thiss, .25, {
      boxShadow: "0px 0px 0px 0px rgba(0,54,65,0)",
      onComplete: function(){
        global_CountForhoverShadowBlock -=1;
        TweenMax.set($thiss,{clearProps:"position, z-index, box-shadow"});
        checkCount();
      }
    });
  }
  switch (option){
    case 'enter':
      return enter($e);
      break;

    case 'leave':
      return leave($e);
      break;

    default:
      var $block = $(".hoverShadowBlock");
      if( $block.length == 0 ){ return false; }

      $block.on("mouseenter", function() {
        enter($(this));
      });
      $block.on("mouseleave", function() {
        leave($(this));
      });
  }
}
/*тень блоков END*/
/*global popup*/
$(document).ready(function() {
    $('body').on("click", ".mfp-close div", function() {
        $.magnificPopup.close();
    });
});
function globalPopup($animateLink, $content, popupClass, callBackOpen){

  var openDelay = 0,
      $beforeEl,
      $beforeOv;

  if( $animateLink ){
    openDelay = 505;

      var elW = $animateLink.outerWidth(),
          elH = $animateLink.outerHeight(),
          elT = $animateLink[0].getBoundingClientRect().top,
          elL = $animateLink[0].getBoundingClientRect().left,
          halfW,
          halfH;

      if( elW*1.2 < $(window).width() ){
        halfW = elW*1.2;
      }else{
        halfW = elW;
      }
      if( elH*1.2 < $(window).height() ){
        halfH = elH*1.2;
      }else{
        halfH = elH;
      }


      $("body").append('<div class="beforeMfpOverlay"></div>');
      $("body").append('<div class="beforeMfpElement"></div>');
      $beforeEl = $(".beforeMfpElement");
      $beforeOv = $(".beforeMfpOverlay");
      TweenMax.set( $beforeOv , { width: "100%", height: "100%", top: 0, left: 0, position: "fixed", zIndex: 1000, opacity: 0, background: "#0b0b0b" });
      TweenMax.set( $beforeEl , { transformOrigin:"50% 50%", width: elW, height: elH, top: elT, left: elL, position: "fixed",  zIndex: 1001, opacity: 0.1, background: "#ffffff" });

      TweenMax.to( $beforeOv , 0.4, { width: "100%", height: "100%", left: 0, top: 0, opacity: 0.7 });
      TweenMax.to( $beforeEl , 0.4, { x: "-50%", y: "-50%", width: halfW, height: halfH, left: "50%", top: "50%", opacity: 0.5 });
      TweenMax.to( $beforeEl , 0.3, { width: "100%", height: "100%", left: "50%", top: "50%", opacity: 0.9, delay: 0.2 });

    setTimeout(function(){
      if( $animateLink[0].hasAttribute("href")  ){
        $.magnificPopup.open({
            type: 'ajax',
            ajax: {
              //settings: null, // Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
              // For example:
              // settings: {cache:false, async:false}

              cursor: 'mfp-ajax-cur', // CSS class that will be added to body during the loading (adds "progress" cursor)
              tError: '<a href="%url%">The content</a> could not be loaded.' //  Error message, can contain %curr% and %total% tags if gallery is enabled
            },
            items: {
              src: $animateLink.attr("href")
            },
            //removalDelay: 500, //delay removal by X to allow out-animation
            //closeBtnInside: false,
            closeMarkup: '<div class="mfp-close"><div></div></div>',
            mainClass: popupClass,
            closeOnBgClick: false,
            removalDelay: 310,
            callbacks: {
                parseAjax: function(mfpResponse) {
                  // mfpResponse.data is a "data" object from ajax "success" callback
                  // for simple HTML file, it will be just String
                  // You may modify it to change contents of the popup
                  // For example, to show just #some-element:
                  // mfpResponse.data = $(mfpResponse.data).find('#some-element');

                  // mfpResponse.data must be a String or a DOM (jQuery) element
                  mfpResponse.data = $(mfpResponse.data).find(".popupContent");
                },
                 ajaxContentAdded: function() {
                  if( $(this.content).attr("id") == "widgetPage" ){
                    widjetspage();
                  }
                  if( $(this.content).attr("id") == "eventsCalendar" ){
                    eventsCalendarInit();
                  }
                },
                beforeOpen: function() {

                },
                open: function() {
                  if( callBackOpen ){
                    callBackOpen();
                  }
                  $beforeEl.add($beforeOv).remove();
                  TweenMax.set($(".mfp-wrap.fullScreenPopup .mfp-content, .mfp-bg") , {clearProps: "scale, opacity"});

                },
                beforeClose: function(){
                  if( popupClass.indexOf("fullScreenPopup") > -1 ){
                    TweenMax.to( $(".mfp-wrap.fullScreenPopup .mfp-content") , .3, { scale : 0.8, opacity : 0 });
                    TweenMax.to( $(".mfp-bg") , .3, { opacity : 0, delay: 0.05 });
                  }
                },
                afterClose: function() {
                    
                },

            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
      }else{
        $.magnificPopup.open({
            items: {
                src: $content,
                type: 'inline'
            },
            //removalDelay: 500, //delay removal by X to allow out-animation
            //closeBtnInside: false,
            closeMarkup: '<div class="mfp-close"><div></div></div>',
            mainClass: popupClass,
            closeOnBgClick: false,
            removalDelay: 310,
            callbacks: {
                beforeOpen: function() {

                },
                open: function() {
                  if( callBackOpen ){
                    callBackOpen();
                  }
                  $beforeEl.add($beforeOv).remove();
                  TweenMax.set($(".mfp-wrap.fullScreenPopup .mfp-content, .mfp-bg") , {clearProps: "scale, opacity"});

                },
                beforeClose: function(){
                  if( popupClass.indexOf("fullScreenPopup") > -1 ){
                    TweenMax.to( $(".mfp-wrap.fullScreenPopup .mfp-content") , .3, { scale : 0.8, opacity : 0 });
                    TweenMax.to( $(".mfp-bg") , .3, { opacity : 0, delay: 0.05 });
                  }
                },
                afterClose: function() {
                    
                },

            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
      }
    }, openDelay);

  }
}
function globalPopupDefaultLinks(){
  if( $(".popupLink").length == 0 ){ return false; }
  $(".popupLink").on("click", function(e){

    e.preventDefault();
    var $link = $(this),
        thisId = $link.attr("data-popup"),
        $content = $(".popupContent[data-popup='"+thisId+"']"),
        popupClass = "fullScreenPopup",
        callBackOpen = null;
      if( $link[0].hasAttribute("data-popupClass") ){
        popupClass += " "+$link.attr("data-popupClass");
      }
      //if( $content.length == 0 ){ return false; }
      globalPopup($link, $content, popupClass, callBackOpen);
  });
}
/*global popup END*/
/*default tabs*/
function defaultTabs(){
  $(".defaultTabs .tab").on("click", function(){
    var $tab = $(this),
        $tabs = $(this).closest(".defaultTabs").find(".tab"),
        index = $tab.index(),
        $contents = $tab.closest(".defaultTabs").find(".tabsContent"),
        $prevContent = $contents.filter(".active"),
        $otherContents = $tab.closest(".defaultTabs").find(".tabsContent:not(:eq("+index+"))"),
        $content = $contents.eq(index),
        $contentW = $(this).closest(".defaultTabs").find(".tabsContentWrapper");

    if( $tab.hasClass("active") ){ return false; }

    var tl = new TimelineMax({
      onComplete:function(){
        TweenMax.set( [$contentW, $contents] ,{ clearProps:"all" });
        //$tab.add($content).addClass("active");
      }
    });

    TweenMax.set( $contentW , { height: $contentW.outerHeight() });
    TweenMax.set( $prevContent , { display: "block", position:"absolute", width: "100%", zIndex: 1, top:0, left:0, opacity:1 });
    TweenMax.set( $content , { display: "block", position:"absolute", width: "100%", zIndex: 0, top:0, left:0, opacity:0 });

    $tabs.add($contents).removeClass("active");
    $tab.add($content).addClass("active");

    tl.to( $contentW , 0.25, { height: $content.outerHeight() }, 0)
      .to( $prevContent , 0.25, { opacity:0 }, 0)
      .to( $content , 0.25, { opacity:1 }, 0);

  });
}
/*default tabs END*/

/*одинаковая высота в линии*/
  function equalHeight($elements){
    if( $elements.length == 0 ){ return false; }
      function setMaxH(){
          var maxH = 0;
          var $b = $elements;
          $b.css({"height": ""});
          $b.each(function(){
              $(this).outerHeight() > maxH ? maxH = $(this).outerHeight() : maxH = maxH;
          });
          $b.css({"height": maxH});
      }
      setMaxH();
      $(window).smartresize(function(){
          setMaxH();
      });
  }
/*одинаковая высота в линии END*/
/*main menu*/
function overflowMenuItems($menu){
  var $ul = $menu.find("ul"),
      $li = $ul.find(">li:not(.overflowItemsMenu)"),
      ulW = $ul.width(),
      liW = 0,
      $ovMenu = $menu.find(".overflowItemsMenu"),
      $ovPt = $ovMenu.find(".item"),
      $but = $ovMenu.find(".button"),
      rightOffset = parseFloat( $but.css("width") ) + parseFloat( $li.css("margin-left") );

  $li.each(function(i){
    var $thisLi = $(this);
    liW += (parseFloat( $thisLi[0].getBoundingClientRect().width ) + parseFloat( $thisLi.css("margin-left")) + parseFloat( $thisLi.css("padding-left")) + parseFloat( $thisLi.css("padding-right")));
    if( liW > ulW ){
      $thisLi.add( $thisLi.nextAll("li:not(.overflowItemsMenu)") ).addClass("overflow"); //
      $ovPt.eq(i).add( $ovPt.eq(i).nextAll("div") ).removeClass("hidden");
      $ovMenu.removeClass("hidden");
      $menu.addClass("haveOverflowItems");
      $ovMenu.insertBefore($thisLi);
      return false;
    }else{
      if( liW+rightOffset > ulW && $li.eq(i+1).length > 0 ){
        $thisLi.add( $thisLi.nextAll("li:not(.overflowItemsMenu)") ).addClass("overflow"); //
        $ovPt.eq(i).add( $ovPt.eq(i).nextAll("div") ).removeClass("hidden");
        $ovMenu.removeClass("hidden");
        $menu.addClass("haveOverflowItems");
        $ovMenu.insertBefore($thisLi);
        return false;
      }else{
        $thisLi.removeClass("overflow"); //
        $ovPt.eq(i).addClass("hidden");
        if( $li.length == (i+1) ){
          $menu.removeClass("haveOverflowItems");
          $ovMenu.addClass("hidden");
          $ovMenu.insertAfter($ul);
        }
      }
    }
  });
}
function openoverflowMenuItems(){
  $("body").on("click", ".overflowItemsMenu .button", function(){
    var $but = $(this),
        $ovMenu = $but.closest(".overflowItemsMenu");
        if( $ovMenu.hasClass("active") ){
          $(".overflowItemsMenu").removeClass("active");
        }else{
          $(".overflowItemsMenu").removeClass("active");
          $ovMenu.addClass("active");
        }
  });
  $("body").on("click", function(event) {
      if (($(".overflowItemsMenu.active").length > 0) && ( $(event.target).closest(".overflowItemsMenu").length < 1) ) {
        $(".overflowItemsMenu").removeClass("active");
      }
  });
}

/*end main menu*/
/*====================================================================*/
var global_rightColumnController;
var global_rightColumnScene;
function updateRCDur(){
  $(".rightColSpacer").addClass("reInit");
  var dur = parseInt( $("#mainWrapper").outerHeight() - $("#rightColumn .top").outerHeight() );
  var isObjectsListPage = $("#objectsListPage").length > 0 ? true : false;
  global_rightColumnScene.duration(0);
  global_rightColumnScene.duration(dur);
  dur = parseInt( $("#mainWrapper").outerHeight() - $("#rightColumn .top").outerHeight() );
  global_rightColumnScene.duration(dur);
  $(".rightColSpacer").removeClass("reInit");

  if( dur <= 0 || ( isObjectsListPage && !$("#rightColumn").hasClass("active") ) ){
    global_rightColumnController.enabled(false);
  }else{
    global_rightColumnController.enabled(true);
    global_rightColumnController.update(true);  }
}
function destroyRc(){
  global_rightColumnController.destroy(true);
  global_rightColumnScene.destroy(true);
}
function initRcScrollMagic(){
  var $topB = $("#rightColumn .top"),
      dur =  parseInt( $("#mainWrapper").outerHeight() - $topB.outerHeight() );

  global_rightColumnController = new ScrollMagic.Controller(),
  global_rightColumnScene = new ScrollMagic.Scene({triggerElement: $topB, triggerHook: 'onLeave', duration: dur })
  .setPin($topB, { spacerClass : "rightColSpacer" })
  //.addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
  .addTo(global_rightColumnController);
}
function rightCol(){
  function topB(){
    var $topB = $("#rightColumn .top"),
        $botB = $("#rightColumn .bot"),
        topBH = $topB.outerHeight(),
        botBH = $botB.outerHeight(),
        wheight = $(window).height(),
        dur =  parseInt( $("#mainWrapper").outerHeight() - $topB.outerHeight() );

    initRcScrollMagic();

    if( dur <= 0 ){
        global_rightColumnController.enabled(false);
    }

    window.onload = function() {
      var dur = parseInt( $("#mainWrapper").outerHeight() - $topB.outerHeight() );
      global_rightColumnScene.duration(dur);
      if( dur <= 0 ){
        global_rightColumnController.enabled(false);
      }
    };

    function callMeFormListeners(){
      var $formBlock = $("#rightColumn .formBlock"),
          $formBlockClose = $("#rightColumn .formBlock .closeBut"),
          $callMeButton = $("#rightColumn .call .callMe"),
          $callMeBlock = $("#rightColumn .call .default");

          $callMeButton.on("click", function(){
            $formBlock.show();
            $callMeBlock.hide();
            updateRCDur();
          });
          $formBlockClose.on("click", function(){
            $formBlock.hide();
            $callMeBlock.show();
            updateRCDur();
          });
    }
    callMeFormListeners();

    function slideRightPanel(){
      if( $("#objectsListPage").length == 0 ){ return false; }
      destroyRc();

      var $rc = $("#rightColumn"),
          $callB = $("#rightColumn .call"),
          $topSlCon = $("#rightColumn .slideContTop"),
          $headerTop = $("#header #main-navigation"),
          $adminNavBar = $(".navbar.dockbar");
      $("#rightColumn .top .call .default").prepend('<div class="slideRC hoverShadowBlock"></div>');
      var $slRc = $("#rightColumn .slideRC");

      $slRc.on("click", function(){
        var $this = $(this);
        if( $this.hasClass("active") ){
          $slRc.add($rc).removeClass("active");

          var tline = new TimelineMax({ 
            onComplete: function(){
                global_rightColumnController.destroy(true);
                global_rightColumnScene.destroy(true);
                propertyListInit("destroy");
                propertyListInit("reInit");
                propertyListInit("updateHeights");
                propertyListInit("updateDuration");
                destroyRc();
                overflowMenuItems($("#main-navigation-lvl2"));
            }
          });
          tline.to( $rc, .0, {width: 0}, 0)
               .to( $callB, .0, { x: -280 }, 0)
               .to( [ $headerTop,$adminNavBar ], .0, { "padding-right": 280 }, 0)
               .to( $(".mainBlock .fixedMain"), .0, { "padding-right": 40 }, 0);

        }else{
          $slRc.add($rc).addClass("active");

          var tline = new TimelineMax({ 
            onComplete: function(){
              destroyRc();
              propertyListInit("destroy");
              propertyListInit("reInit");
              propertyListInit("updateHeights");
              propertyListInit("updateDuration");
              initRcScrollMagic();
              overflowMenuItems($("#main-navigation-lvl2"));
            }
          });
          tline.to( $rc, .0, {width: 280}, 0)
               .to( $callB, .0, { x: 0 }, 0)
               .to( [ $headerTop,$adminNavBar ], .0, { "padding-right": 0 }, 0)
               .to( $(".mainBlock .fixedMain"), .0, { "padding-right": 0 }, 0);
        }
      });
    }
    slideRightPanel();

    $(window).smartresize(function(){
      updateRCDur();
    });
  }
  topB();

  function rightCol_phoneAnim(){
    var $callMeB = $("#rightColumn .callMe"),
        $iconB = $("#rightColumn .callMe .callingIcon"),
        $icon = $("#rightColumn .callMe .icon"),
        $shadows = $("#rightColumn .callMe .callingIcon .shadow");

      var tl = new TimelineMax({ repeat: -1, repeatDelay: 3, ease: Linear.easeNone });
      tl.add("start", "0")
        .add(TweenMax.staggerFromTo( $shadows, 0.5, { autoAlpha:1, scale:1 }, { autoAlpha:0, scale: 1.6 , ease: Linear.easeNone, yoyo: false}, 0.25 ), "start")
        .to( $icon, 0.20, { rotation: 0, z: 1 }, "start")
        .to( $icon, 0.20, { rotation: 20 }, "start+=0.2")
        .to( $icon, 0.20, { rotation: 0 }, "start+=0.4")
        .to( $icon, 0.20, { rotation: 20 }, "start+=0.6")
        .to( $icon, 0.20, { rotation: 0 }, "start+=0.8");
      tl.timeScale(1);
  }
  rightCol_phoneAnim();
}
function newsPage(){
  
}
function homepageSlider(){
  if( $(".homepageTopSlider .slides").length == 0 ){ return false; }

  var $block = $(".homepageTopSlider"),
      $slider = $(".homepageTopSlider .slides"),
      $bgs = $(".homepageTopSlider .bgs .bg"),
      $slides = $block.find(".slide"),
      slidesCount = $slides.length,
      $nav = $(".homepageTopSlider").find(".nav"),
      $pt = $nav.find(".item"),
      aniTime = 0.5,
      cur;

  if( $slides.filter(".active").length > 0 ){
    cur = $slides.filter(".active").index();
  }else{
    cur = 0;
    $pt.removeClass("active");
    $slides.eq(0).add($pt.eq(0)).add($bgs.eq(0)).addClass("active");
  }
  TweenMax.set( $slides.eq(cur).add($bgs.eq(cur) ) ,{ autoAlpha: 1, zIndex: 1 } );

  $slider.css({ height : $slides.eq(cur).outerHeight() });
   // if( itemsL > 1 ){
   //     var innerNav = "<div class='nav-wrap'><span class='leftArrow'></span><ul class='nav'>";
   //     for(var i=0; i< itemsL; i++){
   //         innerNav = innerNav +="<li class='pt'></li>";
   //        if(i+1 === itemsL){
   //             innerNav = innerNav+="</ul><span class='rightArrow'></span></div>";
   //             $(".bottom-banners").append(innerNav);
   //         }
   //     }
   //     $(".bottom-banners .pt").eq(0).addClass("current");
   //     $items.eq(0).addClass("current");
   // }


  function slide(dir, index){
      cur = $slides.filter(".active").index();
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
      var $currentSlide = $slides.eq(cur).add($bgs.eq(cur)),
          $nextCurrnetSlide = $slides.eq(nextCur).add($bgs.eq(nextCur)),
      tlb = new TimelineLite();
      
      tlb.fromTo( $currentSlide, aniTime ,{display: "block"}, {autoAlpha:0, onComplete: function(){ $currentSlide.css({"z-index": 0, display: "none"})} })
        .fromTo( $nextCurrnetSlide, aniTime ,{display: "block"}, {autoAlpha:1, onComplete: function(){ $nextCurrnetSlide.css({"z-index": 1})} }, 0)
        .to( $slider , 0.3, { height: $slides.eq(nextCur).outerHeight() }, 0);
      
      $slides.add($pt).add($bgs).removeClass("active");
      $nextCurrnetSlide.add($pt.eq(nextCur)).addClass("active");
  }
  $(window).smartresize(function(){
    TweenMax.to($slider, .3, { height: $slides.filter(".active").outerHeight() })
  });

  $pt.on("click", function(){
      clearInterval(myInterval);
      slide(null, $(this).index());
      myIntervalHomepageMainSlider();
  });
  function myIntervalHomepageMainSlider(){
      myInterval = setInterval(function(){
          slide("right");
      }, 4500);
  }
  myIntervalHomepageMainSlider();
  $block.on("mouseenter", function(){
      clearInterval(myInterval);
  });
  $block.on("mouseleave", function(){
      clearInterval(myInterval);
      myIntervalHomepageMainSlider();
  });
}
function homepageServiceLinkArrow(){
  var $b = $(".homepageServicesRow .singleLink .text"),
      $cor = $(".homepageServicesRow .singleLink .arrow");
  function setSize(){
      var h = $b.outerHeight()*0.7;
      $cor.css({
          "width": h,
          "height": h,
          "margin-top": -h/2,
          "margin-left": -h/2
      });
  }
  setSize();
  $(window).smartresize(function(){
      setSize();
  });
}
function paginationArrow(){
  if( $(".taglib-page-iterator .pager a span:not(.arrow)").length == 0 
      || $(".taglib-page-iterator .pager a .arrow").length == 0 
  ){
    return false;
  }
  var $b = $(".taglib-page-iterator .pager a"),
      $cor = $b.find(".arrow");
  function setSize(){
      var h = $b.outerHeight()*0.7;
      $cor.css({
          "width": h,
          "height": h,
          "margin-top": -h/2,
          "margin-left": -h/2
      });
  }
  setSize();
  $(window).smartresize(function(){
      setSize();
  });
}
function debagFotorama(){
  $(function () {
    $('.fotorama')
        // Listen to the events
        .on('fotorama:ready ' +           // Fotorama is fully ready
            'fotorama:show ' +            // Start of transition to the new frame
            'fotorama:showend ' +         // End of the show transition
            'fotorama:load ' +            // Stage image of some frame is loaded
            'fotorama:error ' +           // Stage image of some frame is broken
            'fotorama:startautoplay ' +   // Slideshow is started
            'fotorama:stopautoplay ' +    // Slideshow is stopped
            'fotorama:fullscreenenter ' + // Fotorama is fullscreened
            'fotorama:fullscreenexit ' +  // Fotorama is unfullscreened
            'fotorama:loadvideo ' +       // Video iframe is loaded
            'fotorama:unloadvideo',       // Video iframe is removed
            function (e, fotorama, extra) {
              console.log('## ' + e.type);
              console.log('active frame', fotorama.activeFrame);
              console.log('additional data', extra);
            }
        )
        // Initialize fotorama manually
        .fotorama();
  });
}
var globalForwidjetspage = false;
function widjetspage(){
  if( $("#widgetPage").length == 0 ){ return false; }
  if( !globalForwidjetspage ){
    var TIMEOUT = null;
    $(window).on('resize', function() {
        if(TIMEOUT === null) {
            TIMEOUT = window.setTimeout(function() {
                TIMEOUT = null;
                //fb_iframe_widget class is added after first FB.FXBML.parse()
                //fb_iframe_widget_fluid is added in same situation, but only for mobile devices (tablets, phones)
                //By removing those classes FB.XFBML.parse() will reset the plugin widths.
                $('.fb-page').removeClass('fb_iframe_widget fb_iframe_widget_fluid');
                FB.XFBML.parse();
            }, 300);
        }
    });
    globalForwidjetspage = true;
  }
  $("#widgetPage .ytCol .videosBlock").scrollbar();
}
var globalForEventsCalendar = false;
function eventsCalendarInit(){
  if( $("#eventsCalendar").length == 0 ){ return false; }
  function setHeight(){
        var curH = $(window).height() - $("#eventsCalendar .title").outerHeight() -50;
        $("#eventsCalendar .mainB").css({ height : curH });
  }
  setHeight();
  $("#eventsCalendar .leftCol").scrollbar();
  $("#eventsCalendar .mainCol").scrollbar();
  var $allItems = $("#eventsCalendar .leftCol .list .item, #eventsCalendar .mainCol .item");
  $("#eventsCalendar .leftCol .list .item").on("click", function(){
    var $this = $(this);
    if( $this.hasClass("active") ){ return false; }
    var dataId = $this.attr("data-id");
        $nextDetailItem = $("#eventsCalendar .mainCol").find(".item[data-id="+dataId+"]"),
        $curDetailItem = $("#eventsCalendar .mainCol .item.active");

    TweenMax.fromTo($curDetailItem, .20, 
      { 
        position: "absolute",
        left: 0,
        top: 0
      },
      { 
        position: "absolute",
        zIndex: 0,
        autoAlpha: 0,
        display: "none"
      }
    );
    TweenMax.fromTo($nextDetailItem, .20, 
      { 
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 0,
        autoAlpha: 0,
        display: "block"
      },
      { 
        position: "relative",
        zIndex: 1,
        autoAlpha: 1,
        display: "block"
      }
    );
    $allItems.removeClass("active");
    $this.add($nextDetailItem).addClass("active");
  });



  if( !globalForEventsCalendar ){
    globalForEventsCalendar = true;
    $(window).smartresize(function(){
      setHeight();
    });
  }
}

function aboutContacts(){
  if( $(".aboutContactsNav").length == 0 ){ return false; }
  var $block = $(".contacts-portlet .items"),
      $items = $block.find(".item"),
      $select = $("#contactsDepartamentSelect"),
      $input = $("#contactsDepartamentSearch");

  $input.keyup(function(){
    search( $(this).val() );
    updateRCDur();
  });

  function search(inputVal){
    inputVal = inputVal.trim().toLowerCase();
    if (inputVal != "") {
      $items.each(function(){
        var $item = $(this);
        if( $item.text().toLowerCase().indexOf(inputVal) >= 0 ){
          $item.removeClass("searchHidden");
        }else{
          $item.addClass("searchHidden");
        }
      });
    }else{
      $items.removeClass("searchHidden");
    }
  }

  $select.on("change", function(){
    var $this = $(this),
        thisVal = $this.val();
    if( thisVal != 0 ){
      $items.addClass("selectHidden");
      $items.filter("[data-category='"+thisVal+"']").removeClass("selectHidden");
    }else{
      $items.removeClass("selectHidden");
    }
    updateRCDur();
  });
}
$(document).ready(function(){
/*news*/
  //$(".newsList-content .items").prepend( createOptionSelect( $(".newsList-navigation") ) );
/*END news*/
/*homepage*/
  homepageSlider();
  homepageServiceLinkArrow();
/*homepage END*/
/*global*/
  customizeCheckbox( $(contentSelectors) );
  customizeRadiobox( $(contentSelectors) );
  paginationArrow();
  optionSelect( $(contentSelectors) );
  globalPopupDefaultLinks();
  defaultTabs();
  rightCol();
  contactsMap();
  overflowMenuItems($("#main-navigation"));
  overflowMenuItems($("#main-navigation-lvl2"));
  openoverflowMenuItems();
  $(window).smartresize(function(){
    overflowMenuItems($("#main-navigation"));
    overflowMenuItems($("#main-navigation-lvl2"));
  });
  //debagFotorama();
  //eventsCalendarInit();
/*global END*/

/*about*/
  equalHeight( $(".pageAbout-content .links a") );
  equalHeight( $(".pageAbout-content .statsRow .col:not(.col1)") );
  aboutContacts();
/*about END*/
/*news*/
  newsPage();
/*news END*/
/*propertyDetail */
  propertyDetMap();
/*propertyDetail END*/
/*propertyList*/
  propertyListInit();
/*propertyList END*/
/*regioni prisutstviya*/
  regioniPrisutstviyaMap();
  regionyPrisutstviaBottomBlock();
/*regioni prisutstviya END*/

/*global*/
  hoverShadowBlock();
/*glabal end*/
});
window.onload = function() {
  
};