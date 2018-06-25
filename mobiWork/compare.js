(function () {

  var $characteristicsBlock,
      $gridcard_carousels,
      $cardsOwl    ,
      $lc_cardsOwl ,
      $rc_cardsOwl ,
      $charsOwl    ,
      $lc_charsOwl ,
      $rc_charsOwl ;

  function page_initSliders(){
    $gridcard_carousels = $(".owl-carousel-gridcard");
    $cardsOwl = $("#compare-page .cards");
    $lc_cardsOwl = $("#compare-page .cards.owl-carousel-1");
    $rc_cardsOwl = $("#compare-page .cards.owl-carousel-2");
    $charsOwl    = $("#compare-page .charCat-section-row-items");
    $lc_charsOwl = $("#compare-page .charCat-section-row-items.owl-carousel-1");
    $rc_charsOwl = $("#compare-page .charCat-section-row-items.owl-carousel-2");


    $cardsOwl.on('initialized.owl.carousel', function () {
      fixedTopBlocks();
    });

    $cardsOwl.owlCarousel({
      loop: false,
      items: 6,
      nav: true,
      dots: true,
      margin: 0,
      navText: [
        '<svg class="icon">\
          <use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerLeftArrow"></use>\
        </svg>',
        '<svg class="icon">\
          <use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerRightArrow"></use>\
        </svg>'
      ],
      autoplay: false,
      responsive: {
        0: {
          slideBy:1,
          items: 1,
          nav: false,
          dots: true
        },
        800: {
          slideBy: 3,
          items: 3,
          margin: 10,
          nav: true,
          dots: false
        },
        1000:{
          slideBy: 4,
          items: 4,
        },
        1100:{
          slideBy: 5,
          items: 5,
        },
        1240: {
          slideBy: 6,
          items: 6,
        }
      }
    });

    $charsOwl.on('initialized.owl.carousel', function () {
      checkMobileDiff();
    });


    $charsOwl.owlCarousel({
      loop: false,
      items: 6,
      margin: 0,
      nav: false,
      dots: false,
      touchDrag  : false,
      mouseDrag  : false,
      autoplay: false,
      responsive: {
        0: {
          slideBy:1,
          items: 1,
        },
        800: {
          margin: 10,
          slideBy: 3,
          items: 3,
        },
        1000:{
          slideBy: 4,
          items: 4,
        },
        1100:{
          slideBy: 5,
          items: 5,
        },
        1240: {
          slideBy: 6,
          items: 6,
        }
      }
    });

    var $cats_owl = $(".category-tabs .cats");
    if( $(".category-tabs .cats .cat").length > 1 ){ 
      bind_check800lay($cats_owl);
      function createCatSlider(){
        $cats_owl.addClass("owl-carousel");
        $cats_owl.owlCarousel({
          nav: true,
          slideBy: 3,
          navSpeed: 200,
          dots: false,
          autoplay: false,
          margin: 10,
          autoWidth: true,
          loop: false,
          navText: ['<svg class="icon"><use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerLeftArrow"></use></svg>',
                    '<svg class="icon"><use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerRightArrow"></use></svg>'
          ],
        });
      }

      if( $cats_owl[0].lay800 == "gt800" ){
        createCatSlider();
      }

      $(window).on("debouncedresize", function( event ) {
        if( $cats_owl[0].lay800 == "lt800" && $cats_owl[0].isChangePageLayout800() ){ 
          createCatSlider();
        }else if( $cats_owl[0].lay800 == "gt800" && $cats_owl[0].isChangePageLayout800() ){
          $cats_owl.trigger('destroy.owl.carousel');
          $cats_owl.removeClass("owl-hidden owl-carousel owl-loaded owl-drag");
        }
      });
    }

    /*синхронизация слайдеров*/
    var cardDragInterval_1;
    var cardDragInterval_2;

    function syncOwlPositions(side) {
      if( side == "lc" ){
        var cardStage = $lc_cardsOwl.find(".owl-stage");
        var charStage = $lc_charsOwl.find(".owl-stage");
      }else{
        var cardStage = $rc_cardsOwl.find(".owl-stage");
        var charStage = $rc_charsOwl.find(".owl-stage");
      }
      
      var transformMatrix = cardStage.css("-webkit-transform") ||
         cardStage.css("-moz-transform")    ||
         cardStage.css("-ms-transform")     ||
         cardStage.css("-o-transform")      ||
         cardStage.css("transform");
       var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
       var xVal = matrix[12] || matrix[4];//translate x
       //var y = matrix[13] || matrix[5];//translate y
       TweenMax.set(charStage, { x: xVal, z:1, "transition": "0s" });
       
    }

    $lc_cardsOwl.on('drag.owl.carousel', function(e){
      cardDragInterval_1 = setInterval(function(){ syncOwlPositions("lc") }, 25);
    });
    
    $lc_cardsOwl.on('changed.owl.carousel', function(e) {
        $lc_charsOwl.trigger('to.owl.carousel', [e.relatedTarget.relative(e.property.value), 250, true]);
        checkMobileDiff({ "li" : e.item.index, "ri" : $rc_cardsOwl.data('owl.carousel')._current });
        if( $('.checkLay-lt800').is(':visible') ){
          $charsOwl.trigger('refresh.owl.carousel');
          fixedTopBlocks("update");
        }
    });
    $lc_cardsOwl.on('translated.owl.carousel', function(e) {
      setTimeout(function() { 
        clearInterval(cardDragInterval_1);
      }, 100);
    });

    $rc_cardsOwl.on('drag.owl.carousel', function(e){
      cardDragInterval_2 = setInterval(function(){ syncOwlPositions("rc") }, 25);
    });
    
    $rc_cardsOwl.on('changed.owl.carousel', function(e) {
        $rc_charsOwl.trigger('to.owl.carousel', [e.relatedTarget.relative(e.property.value), 250, true]);
        checkMobileDiff({ "li" : $lc_cardsOwl.data('owl.carousel')._current, "ri" : e.item.index });
        if( $('.checkLay-lt800').is(':visible') ){
          $charsOwl.trigger('refresh.owl.carousel');
          fixedTopBlocks("update");
        }
    });
    $rc_cardsOwl.on('translated.owl.carousel', function(e) {
      setTimeout(function() { 
        clearInterval(cardDragInterval_2);
      }, 100);
    });

    $("body").on("click", ".cardsBlock .card .button.delete", function(){
      var thisId = $(this).attr("data-compareid"),
          thisCat = $(this).attr("data-comparecatid");
      $(".category-items").find(".item:has(.close[data-compareid='"+thisId+"'])").remove();
      var thisOwlIndex = $(this).closest(".owl-item").index();
      $cardsOwl.trigger('remove.owl.carousel', thisOwlIndex).trigger('refresh.owl.carousel');
      $charsOwl.trigger('remove.owl.carousel', thisOwlIndex).trigger('refresh.owl.carousel');

      $(".category-tabs .cat:has([data-comparecatid='" + thisCat + "']) .count").text( 
        +$(".category-tabs .cat:has([data-comparecatid='" + thisCat + "']) .count").text() - 1
      );
      history.replaceState( {} , '', window.location.href.replace("&id[]="+thisId, "") );
      window.modelsparams.splice(thisOwlIndex, 1);
    });
    $("body").on("click", ".category-items .close", function(){
      var $this = $(this),
          thisId = $this.attr("data-compareid"),
          thisCat = $(this).attr("data-comparecatid"),
          owlIndex = $(".cardsBlock").find(".owl-item:has(.button.delete[data-compareid='"+thisId+"'])").index();

      $this.closest(".item").remove();
      $cardsOwl.trigger('remove.owl.carousel', owlIndex).trigger('refresh.owl.carousel');
      $charsOwl.trigger('remove.owl.carousel', owlIndex).trigger('refresh.owl.carousel');

      $(".category-tabs .cat:has([data-comparecatid='" + thisCat + "']) .count").text( 
        +$(".category-tabs .cat:has([data-comparecatid='" + thisCat + "']) .count").text() - 1
      );
      history.replaceState({}, "", window.location.href.replace("&id[]=" + thisId, ""));
      window.modelsparams.splice(owlIndex, 1);
    });
  }

  function toogleBlock(option) {
      var $block = option.$block,
          $button = option.$button;
      if( $block.length == 0 ){ return false; }

      $button.on("click", function(e) {
          TweenMax.killTweensOf($block);
          if (!$block.hasClass("open")) {
            var startH = $block.outerHeight();
            $block.add($button).addClass("open");
            TweenMax.set($block, { clearProps: "all" });
            var endH = $block.outerHeight();
            TweenMax.set($block, { height: startH });
            TweenMax.to($block, 0.25, {
                height: endH,
                ease: Power1.easeInOut,
                onComplete: function() {
                    TweenMax.set($block, { clearProps: "all" });
                    setTimeout(function() { 
                      fixedTopBlocks("update");
                    }, 1000);
                    fixedTopBlocks("update");
                }
            });
          } else {
            var startH = $block.outerHeight();
            $block.add($button).removeClass("open");
            TweenMax.set($block, { clearProps: "all" });
            var endH = $block.outerHeight();
            TweenMax.set($block, { height: startH });
            TweenMax.to($block, 0.25, {
                height: endH,
                ease: Power1.easeInOut,
                onComplete: function() {
                    TweenMax.set($block, { clearProps: "all" });
                    setTimeout(function() { 
                      fixedTopBlocks("update");
                    }, 1000);
                    fixedTopBlocks("update");
                }
            });
          }
      });
  };

  // если мобильная версия дополнительно проверяем фильтр 'только различающиеся' по активным на данный момент в слайдере товарам
  function checkMobileDiff(option){
    // option тут т.к криво работает плагин проставляя класс чуть позже срабатывания функции 
     if( 
        $('.checkLay-lt800').is(':visible') 
        && $("#onlydiff.characteristicsBlock").length > 0
        && window.modelsparams.length > 1
      ){
      if( typeof option != 'undefined' ){
        if( typeof option.li != 'undefined' ){
          var lcIndex = option.li;
        }else{
          var lcIndex = $lc_cardsOwl.find(".owl-item.active").index();
        }
        if( typeof option.ri != 'undefined' ){
          var rcIndex = option.ri;
        }else{
          var rcIndex = $rc_cardsOwl.find(".owl-item.active").index();
        }
      }else{
        var lcIndex = $lc_cardsOwl.find(".owl-item.active").index();
        var rcIndex = $rc_cardsOwl.find(".owl-item.active").index();
      }
        var $lcCharsOwlActiveItems =  $lc_charsOwl.find(".owl-item:eq("+lcIndex+")"),
            $rcCharsOwlActiveItems =  $rc_charsOwl.find(".owl-item:eq("+rcIndex+")"),
            lcArr = window.modelsparams[lcIndex],
            rcArr = window.modelsparams[rcIndex],
            len =  window.modelsparams[0].length;


        $(".mobileNoDiffCurrent").removeClass("mobileNoDiffCurrent");
        for( var i = 0; i < len; i++ ){
          if( lcArr[i] == rcArr[i] ){
            $lcCharsOwlActiveItems.eq(i).closest(".charCat-section-row")
            .add( $rcCharsOwlActiveItems.eq(i).closest(".charCat-section-row") )
            .addClass("mobileNoDiffCurrent");
          }
        }

        $(".charCat:not(:has(.charCat-section-row:not(.mobileNoDiffCurrent)))").addClass("mobileNoDiffCurrent");
     }
  }

  function sortDiff(){
    var $chbxTumbler = $(".sortBlock .tumblerBlock input");
    $(".sortBlock .but").on("click", function(){
      var $but = $(this);
      if( $but.hasClass("active") ){ return false; }
      $(".sortBlock .but").removeClass("active");
      $but.addClass("active");

      if( $but.hasClass("showDiff") ){
        $(".characteristicsBlock").attr("id", "onlydiff");
        $chbxTumbler.prop( "checked",  true );
      }
      if( $but.hasClass("showAll") ){
        $(".characteristicsBlock").attr("id", "");
        $chbxTumbler.prop( "checked", false );
      }
      checkMobileDiff();
      fixedTopBlocks("update");
    });
    $chbxTumbler.on("change", function(){
      $(".sortBlock .but").removeClass("active");
      if( $chbxTumbler.is(':checked') ){
        $(".sortBlock .showDiff").addClass("active");
        $(".characteristicsBlock").attr("id", "onlydiff");
      }else{
        $(".sortBlock .showAll").addClass("active");
        $(".characteristicsBlock").attr("id", "");
      }
      checkMobileDiff();
      fixedTopBlocks("update");
    });
  }

  var ttflag = false;
  var controller1;
  var scene1;

  function fixedTopBlocks(option){
    var $cardsBlock = $(".cardsBlock"),
        dur1;
    switch (option) {
      case "update":
        calcDur();
        scene1.offset(triggerOffset1);
        scene1.duration(dur1);
        scene1.refresh();

        break;
      default:
        if( ttflag ){return false;}
        ttflag = true;
        function calcDur(){
          if( $('.checkLay-lt800').is(':visible') ){
            triggerOffset1 = $cardsBlock.find(".name").position().top;
          }else{
            triggerOffset1 = $cardsBlock.find(".card").position().top;
          }
          var val = parseInt( $characteristicsBlock.offset().top + $characteristicsBlock.outerHeight() - $cardsBlock.offset().top - 300  );
          dur1 = val > 0 ? val : 0;
        }
        calcDur();

        controller1 = new ScrollMagic.Controller();
        scene1 = new ScrollMagic.Scene({
          triggerHook: 0,
          offset : triggerOffset1,
          triggerElement: $cardsBlock[0], // point of execution
          duration: dur1, // pin element for the window height - 1
        })
        .on("progress", function (event) {
            if( event.progress > 0 ){
              $cardsBlock.find(".cardsBlockIW").addClass("fixed");
            }else{
              $cardsBlock.find(".cardsBlockIW").removeClass("fixed");
            }
        })
        .setPin( $cardsBlock.find(".cardsBlockIW")[0], {pushFollowers: false}) // the element we want to pin
        //.addIndicators()
        .addTo(controller1);



        $(window).on("debouncedresize", function(event) {
          calcDur();
          scene1.offset(triggerOffset1);
          scene1.duration(dur1);
          scene1.refresh();
        });
        $(window).on("load", function(){
            calcDur();
            scene1.offset(triggerOffset1);
            scene1.duration(dur1);
            scene1.refresh();
        });

        break;
    }

  }

  function categoryMenu(){
    var $menuBlock = $("#compare-page .category-menu"),
        $catTabs = $("#compare-page .category-tabs");
    $menuBlock.find(".js_goToList").on("click", function(){
      $menuBlock.addClass("showList open");
    });
    $menuBlock.find(".js_backToCat").on("click", function(){
      $menuBlock.removeClass("showCatItems showList open");
    });
    $menuBlock.find(".js_goToCatItems").on("click", function(){
      $menuBlock.addClass("showCatItems open");
    });
    $menuBlock.find(".js_editCatTabs").on("click", function(){
      $catTabs.toggleClass("edit");
    });
  }


  function initPageLinks(){
    var ids = window.compare.getAllItems();
        idsL = ids.length;
    for( var i = 0; i < idsL; i++ ){
      $("[data-compareid='"+ids[i]+"']").addClass("js_compare_remove");
    }
    $(".js_compare:not(.js_compare_remove, .js_compare_add, [data-compareid='all'])").addClass("js_compare_add");
  }

  function compareMobileScroll(){
    if( $(".compare-mobile-action-alert").length == 0 ){ return false; }
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({triggerElement: ".mainlayout", duration: 10000, triggerHook: 0})
                .setPin(".compare-mobile-action-alert", {pushFollowers: false})
                //.addIndicators({name: "1 (duration: 300)"}) // add indicators (requires plugin)
                .addTo(controller);
  }

  function compareDesctopActionAlert($this, action){
    var $this = $this,
        $b = $this.find(".actionText");

    if( $b.length == 0 || $('.checkLay-lt800').is(':visible') ){ return false; }

    //если это всплывашка
    if( $b.hasClass("tooltip") ){
      var $addtext = $b.find(".addtext"),
          $removetext = $b.find(".removetext"),
          tl = new TimelineLite();

      switch(action) {
        case 'add':
          $addtext.show();
          $removetext.hide();
          TweenMax.killTweensOf($b);
          tl.set( $b, {display: "flex"})
            .to($b, 0.15, {
                autoAlpha:1,
                ease: Power1.easeInOut,
            })
            .to($b, 0.2, {autoAlpha:0, delay:2})
            .set( $b, {display: "none"});
          break;
        case 'remove':
          $addtext.hide();
          $removetext.show();
          TweenMax.killTweensOf($b);
          tl.set( $b, {display: "flex"})
            .to($b, 0.15, {
                autoAlpha:1,
                ease: Power1.easeInOut,
            })
            .to($b, 0.2, {autoAlpha:0, delay:2})
            .set( $b, {display: "none"});
          break;
        }
    }else if( $b.hasClass("righttext") ){
      var $defaultText = $b.find(".defaulttext"),
          $addtext = $b.find(".addtext"),
          $removetext = $b.find(".removetext");


      switch(action) {
        case 'add':
          TweenMax.killTweensOf($defaultText);
          $addtext.show();
          $removetext.add($defaultText).hide();
          TweenMax.set([$addtext, $defaultText, $removetext], { clearProps: "all" });
          break;
        case 'remove':

          TweenMax.killTweensOf([$defaultText, $removetext]);
          $removetext.show();
          $addtext.add($defaultText).hide();
          TweenMax.to($defaultText, 0.01, { display: "inline", delay: 2 });
          TweenMax.to($removetext, 0.01, { display: "none", delay: 2, 
            onComplete: function(){
              TweenMax.set([$addtext, $defaultText, $removetext], { clearProps: "all" });
            }
          });
          break;
        }
    }
  }

  function compareMobileActionAlert(action){
    var $b = $(".compare-mobile-action-alert .iw");
    if( $b.length == 0 || !$('.checkLay-lt800').is(':visible') ){ return false; }
    var $addtext = $(".compare-mobile-action-alert .addtext"),
        $removetext = $(".compare-mobile-action-alert .removetext"),
        $close = $(".compare-mobile-action-alert .closeIcon");
    var tl = new TimelineLite();

    switch(action) {
    case 'add':  
      $addtext.show();
      $removetext.hide();
      TweenMax.killTweensOf($b);
      tl.set( $b, {display: "flex"})
        .to($b, 0.15, {
            autoAlpha:1,
            ease: Power1.easeInOut,
        })
        .to($b, 0.2, {autoAlpha:0, delay:2})
        .set( $b, {display: "none"});
      break;
    case 'remove':
      $addtext.hide();
      $removetext.show();
      TweenMax.killTweensOf($b);
      tl.set( $b, {display: "flex"})
        .to($b, 0.15, {
            autoAlpha:1,
            ease: Power1.easeInOut,
        })
        .to($b, 0.2, {autoAlpha:0, delay:2})
        .set( $b, {display: "none"});
      break;
    case "close":
      $addtext.hide();
      $removetext.show();
      TweenMax.killTweensOf($b);
      TweenMax.set( $b, {display: "none"});
      break;
    }
  }


  function compareAttachEvents(){

    $("body").on("click", ".js_compare", function(e){
      var $this = $(this),
          id = $this.attr("data-compareid"),
          cat = $this.attr("data-comparecatid");

      if( $this.hasClass("js_compare_add") ){
        $("[data-compareid='"+id+"']").removeClass("js_compare_add").addClass("js_compare_remove");
        compare.add(id, cat);
        compareMobileActionAlert("add");
        compareDesctopActionAlert($this, "add");
      }else if( $this.hasClass("js_compare_remove") ){
        if( id != "all" ){
          $("[data-compareid='"+id+"']").removeClass("js_compare_remove").addClass("js_compare_add");
        }else{
          $("[data-comparecatid='"+cat+"']:not([data-compareid='all'])").removeClass("js_compare_remove").addClass("js_compare_add");
        }
        compare.remove(id, cat);
        compareMobileActionAlert("remove");
        compareDesctopActionAlert($this, "remove");
        /*если мы на странице сравнения и мы удалили эту категорию или послений товар в этой категории*/
        if( $("#compare-page").length > 0 && window.compareActiveCat != window.compare.getActiveCat() ){
          $("body").addClass("load");
          if( window.compare.getActiveCat().length > 0 ){
            window.location = "/compare/?category="+window.compare.getActiveCat()+"&id[]="+window.compare.getActiveItems().join("&id[]=");
          }else{
            window.location = "/";
          }          
        }
      }

      if( $this[0].tagName == "A" ){
        e.preventDefault();
        if( $this.attr("target") == "_blank" ){
          window.open($this.attr("href"), '_blank');
        }else{
          window.location = $this.attr("href");
        }
      }
    });

    $("body").on("click", ".compare-mobile-action-alert .closeIcon", function(e){
      compareMobileActionAlert("close");
    });
  }

  function updateGoToPageLinks(){
    //если в стораже нет ничего или мы на странице сравнения
    if( window.compare.getAllItems().length == 0 || $("#compare-page").length > 0  ){
      $(".js_compare_goToPage").attr("href", "#").addClass("hide");
    }else{
      //если мы на странице категории
      if( typeof window.categoryId != 'undefined' ){
        if( typeof window.compare.getCatItems(window.categoryId) == 'undefined' || window.compare.getCatItems(window.categoryId).length < 2 ){
          $(".js_compare_goToPage").attr("href", "#").addClass("hide");
        }else{
          $(".js_compare_goToPage").removeClass("hide").attr("href", "/compare/?category="+window.categoryId+"&id[]="+window.compare.getCatItems(window.categoryId).join("&id[]=") ).removeClass("hide");
          $(".js_compare_goToPage .count").html(window.compare.getCatItems(window.categoryId).length);          
        }
      }else{
        if( typeof window.compare.getActiveItems() == 'undefined' || window.compare.getActiveItems().length < 2 ){
          $(".js_compare_goToPage").attr("href", "#").addClass("hide");
        }else{
          $(".js_compare_goToPage").removeClass("hide").attr("href", "/compare/?category="+window.compare.getActiveCat()+"&id[]="+window.compare.getActiveItems().join("&id[]=") ).removeClass("hide");
          $(".js_compare_goToPage .count").html(compare.getAllItems().length);          
        }

      }
    } 
  }




  $(document).ready( function(){
    $characteristicsBlock = $(".characteristicsBlock");
    window.compare = {
      STORAGE_KEY: 'compare',
      data: JSON.parse(localStorage.getItem('compare') || '{}'),
      fetch: function () {
        var myJson = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        return myJson;
      },
      getAllItems: function(){
        var o = this.fetch();
        if( Object.keys( o ).length != 0 ){ 
          var arr = [];
          for (var cat in o) {
            var items = o[cat]["items"];
            var itemsL = items.length;
            
            for( var i = 0; i < itemsL; i++ ){
              arr.push( items[i] );
            }
          }
          return arr;
        }else{
          //console.info("в стороже ничего нет");
          return [];
        }
      },
      getActiveCat : function(){
        var o = this.fetch();
        if( Object.keys( o ).length != 0 ){ 
          //находим последню активную категорию
          for (var cat in o) {
            if( o[cat]["lastactive"] == true ){
              return cat;
            }
          }
        }else{
          //console.info("в стороже ничего нет");
          return [];
        }
      },
      getCatItems: function(catId){
        if( arguments.length > 0 ){
          var o = this.fetch();
          if( Object.keys( o ).length != 0 ){ 
            //находим последню активную категорию
            for (var cat in o) {
              if( cat == catId ){
                var items = o[cat]["items"];
                var itemsL = items.length;
                var arr = [];
                for( var i = 0; i < itemsL; i++ ){
                  arr.push( items[i] );
                }
                return arr;
              }
            }
          }else{
            //console.info("в стороже нет этой категории");
            return [];
          }
        }
      },
      getActiveItems: function(){
        var o = this.fetch();
        if( Object.keys( o ).length != 0 ){ 
          //находим последню активную категорию
          for (var cat in o) {
            if( o[cat]["lastactive"] == true ){
              var items = o[cat]["items"];
              var itemsL = items.length;
              var arr = [];
              for( var i = 0; i < itemsL; i++ ){
                arr.push( items[i] );
              }
              return arr;
            }
          }
        }else{
          //console.info("в стороже ничего нет");
          return [];
        }
      },
      remove: function(id, cat) {
        var _this = this;
        if( id == 'all' ){
          delete this.data[cat];
          if( Object.keys(this.data).length > 0 ){
            for (var first in this.data) break;
            this.data[first]["lastactive"] = true;
          }
        }else if( !empty( id ) ){
          var index = this.data[cat]["items"].indexOf(id);
          if(index != -1) {
            this.data[cat]["items"].splice(index, 1);
          }
          if( Object.keys(this.data[cat]["items"]).length == 0 ){
            delete this.data[cat];
            if( Object.keys(this.data).length > 0 ){
              for (var first in this.data) break;
              this.data[first]["lastactive"] = true;
            }
          }
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        $.ajax({
            url:'/compare/ajax/setdata',
            type:'POST',
            data: _this.data,
            dataType: 'json',
        });
        updateGoToPageLinks();
        if( typeof footerSlider != 'undefined' ){
          footerSlider.deleteItem(id);
        }
      },
      add: function(id, cat) {
        var _this = this;
        if( typeof this.data[cat] != "undefined" ){
          if( this.data[cat]["items"].indexOf(id) > -1 ){ 
            //console.info("товар уже есть в категории");
            return false;
          }
        }else{
          this.data[cat] = {};
          this.data[cat]["items"] = [];
        }
        for (var t in this.data) {
          this.data[t]["lastactive"] = false;
        }
        this.data[cat]["lastactive"] = true;
        this.data[cat]["items"].push(id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        $.ajax({
            url:'/compare/ajax/setdata',
            type:'POST',
            data: _this.data,
            dataType: 'json',
        });
        updateGoToPageLinks();
        if( typeof footerSlider != 'undefined' ){
          footerSlider.addItem(id, cat);
        }
      }
    }
    updateGoToPageLinks();
    if( $("#compare-page").length > 0 ){
      page_initSliders();
      sortDiff();
      categoryMenu();
      $(".charCat").each(function(){
        var $button = $(this).find(".charCat-name");
            $block = $(this).find(".charCat-sectionsBlock");
        toogleBlock( { $block : $block, $button : $button } );
      });
      $(".owl-carousel").trigger('refresh.owl.carousel');
    }
    if( $("#compare-page").length == 0 ){
      window.footerSlider = {
        activeCat: null,
        lastActiveCat: window.compare.getActiveCat(),
        activeReqArr: [],
        $b : $("#compareFooterRow"),
        $itemsB : $("#compareFooterRow .items"),
        checkExist: function(){
          if( $(".compareFooterRow").length == 0 ){
            return false;
          }
        },
        init: function(){
          this.checkExist();
          var _this = this;
          var o = window.compare.fetch();
          // еслие есть чето в стороже
          if( Object.keys( window.compare.fetch() ).length != 0 ){ 
            // если мы на странице определенной категории выводим эту категорию
            if( typeof window.categoryId != 'undefined' ){
              for (var cat in o) {
                if( cat == window.categoryId ){
                  _this.activeCat = cat;
                  var items = o[cat]["items"];
                  var itemsL = items.length;
                  var requestString = "";
                  //создаем запрос элементов активной категории
                  for( var i = 0; i < itemsL; i++ ){
                    requestString += items[i];
                    if( i != itemsL-1 ){
                      requestString+=",";
                    }
                  }
                  $.ajax({
                    type: 'GET',
                    url: '/compare/ajax/cardinfo?mids='+requestString,
                    success: function(res) {
                      var allItemsHtml = "";
                      resL = res.length;
                      for (var i = 0; i < resL; i++) {
                        var itemTemplate = '<div class="item">\
                                              <div class="iw">\
                                                <div class="imgW">\
                                                  <img src="'+res[i].photo+'" alt="img"></div>\
                                                <div class="text">'+res[i].name+'</div>\
                                                <div class="delete js_compare js_compare_remove" data-compareid="'+items[i]+'" data-comparecatid="'+_this.activeCat+'">\
                                                  <svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerClose"></use></svg>\
                                                </div>\
                                              </div>\
                                            </div>';
                        allItemsHtml += itemTemplate;
                      }
                      _this.$itemsB.append(allItemsHtml);
                      _this.checkState();
                      _this.createSlider();
                    },
                    dataType:'json'
                  });
                }
              }
            }else{
              //находим последню активную категорию и выводим эту категорию
              for (var cat in o) {
                if( o[cat]["lastactive"] == true ){
                  _this.activeCat = cat;
                  var items = o[cat]["items"];
                  var itemsL = items.length;
                  var requestString = "";
                  //создаем запрос элементов активной категории
                  for( var i = 0; i < itemsL; i++ ){
                    requestString += items[i];
                    if( i != itemsL-1 ){
                      requestString+=",";
                    }
                  }
                  $.ajax({
                    type: 'GET',
                    url: '/compare/ajax/cardinfo?mids='+requestString,
                    success: function(res) {
                      var allItemsHtml = "";
                      resL = res.length;
                      for (var i = 0; i < resL; i++) {
                        var itemTemplate = '<div class="item">\
                                              <div class="iw">\
                                                <div class="imgW">\
                                                  <img src="'+res[i].photo+'" alt="img"></div>\
                                                <div class="text">'+res[i].name+'</div>\
                                                <div class="delete js_compare js_compare_remove" data-compareid="'+items[i]+'" data-comparecatid="'+_this.activeCat+'">\
                                                  <svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerClose"></use></svg>\
                                                </div>\
                                              </div>\
                                            </div>';
                        allItemsHtml += itemTemplate;
                      }
                      _this.$itemsB.append(allItemsHtml);
                      _this.checkState();
                      _this.createSlider();
                    },
                    dataType:'json'
                  });
                }
              }
            }
          }else{
            _this.checkState();
            _this.createSlider();
          }
        },
        createSlider: function(){
          var _this = this;
          _this.$itemsB.on('initialize.owl.carousel', function () { 
            _this.$itemsB.addClass("owl-carousel");
          });
          _this.$itemsB.on('initialized.owl.carousel', function () {

          });
          
          _this.$itemsB.owlCarousel({
            loop: false,
            items: 6,
            nav: true,
            dots: true,
            margin: 6,
            navText: [
              '<svg class="icon">\
                <use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerLeftArrow"></use>\
              </svg>',
              '<svg class="icon">\
                <use xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerRightArrow"></use>\
              </svg>'
            ],
            autoplay: false,
            responsive: {
              0: {
                slideBy:2,
                items: 2,
                nav: false,
                dots: true
              },
              800: {
                slideBy: 3,
                items: 3,
                nav: true,
                dots: false
              },
              1000:{
                slideBy: 3,
                items: 3,
              },
              1100:{
                slideBy: 4,
                items: 4,
              },
              1200: {
                slideBy: 5,
                items: 5,
              },
              1280: {
                slideBy: 6,
                items: 6,
              }
            }
          });
        },
        destroySlider: function(){
          var _this = this;
          _this.checkExist();
          _this.$itemsB.trigger('destroy.owl.carousel').html("").removeClass("owl-hidden owl-carousel owl-loaded owl-drag");
        },
        checkState: function(){
          var _this = this;
          var $block = $("#compareFooterRow");
          var $clearCompareCat = $("#compareFooterRow .clearCompareCat");
          if( typeof window.categoryId != 'undefined' ){
            $clearCompareCat.attr("data-comparecatid", window.categoryId );
          }else{
            $clearCompareCat.attr("data-comparecatid", window.compare.getActiveCat() );
          }

          if( _this.$itemsB.find(".item").length > 0 ){
            $clearCompareCat.add($block).show();
          }else{
            $clearCompareCat.add($block).hide();
          }
        },
        addItem: function(id, cat){
          var _this = this;
          var id = id;
          var cat = cat;
          _this.checkExist();

          if( this.lastActiveCat != window.compare.getActiveCat() ){
            this.lastActiveCat = window.compare.getActiveCat();
            _this.destroySlider();
            _this.init();
          }else{
            $.ajax({
              type: 'GET',
              url: '/compare/ajax/cardinfo?mids='+id,
              success: function(res) {
                var itemTemplate = '<div class="item">\
                                      <div class="iw">\
                                        <div class="imgW">\
                                          <img src="'+res[0].photo+'" alt="img"></div>\
                                        <div class="text">'+res[0].name+'</div>\
                                        <div class="delete js_compare js_compare_remove" data-compareid="'+id+'" data-comparecatid="'+cat+'">\
                                          <svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/front/market/svg-symbols/symbol/sprite.svg#ico-headerClose"></use></svg>\
                                        </div>\
                                      </div>\
                                    </div>';
                _this.$itemsB.trigger('add.owl.carousel', [ $( itemTemplate ), 0]).trigger('refresh.owl.carousel');
                _this.checkState();
              },
              dataType:'json'
            });
          }
        },
        deleteItem: function(id){
          /*если это из активной категории в футере*/
            var _this = this;
            _this.checkExist();
            if( this.lastActiveCat != window.compare.getActiveCat() ){
              this.lastActiveCat = window.compare.getActiveCat();
              _this.destroySlider();
              _this.init();
            }else{
              if( id == 'all' ){
                var itemsL = _this.$itemsB.find(".item").length;
                for (var i=0; i<itemsL; i++) {
                   _this.$itemsB.trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
                }
              }else{
                var $comp = _this.$itemsB.find("[data-compareid='"+id+"']");
                if( $comp.length > 0  ){
                  var thisOwlIndex = $comp.closest(".owl-item").index();
                  _this.$itemsB.trigger('remove.owl.carousel', thisOwlIndex).trigger('refresh.owl.carousel');
                }
              }
            }
            _this.checkState();
        }
      }
      window.footerSlider.init();
    }
    initPageLinks();
    compareAttachEvents();
    compareMobileScroll();
   });

})();