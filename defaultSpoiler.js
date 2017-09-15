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
            $otherActiveSpoilers = $spoiler.siblings(".default-spoiler.active"),
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
            if($otherActiveSpoilers.length > 0){
                $otherActiveSpoilers.removeClass("complete");
                TweenMax.to( $otherActiveSpoilers , 0.5, { height : minH, className:"-=active", ease: Power1.easeInOut, onComplete: function(){
                    $otherActiveSpoilers.addClass("complete");
                } });
            }
            
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

    $(".default-spoiler .header").on("click", function(){
        action($(this).closest(".default-spoiler"));
    });
    $(".default-spoiler.open").each(function(){
        action($(this));
    });
    $(".default-spoiler").each(function(){
        action($(this), "update");
    });
    // $(window).smartresize(function(){
    //     $(".default-spoiler").each(function(){
    //         action($(this), "update");
    //     })
    // });
}

.default-spoiler{
  border: 2px solid map-get($colors, lBlue);
  transition: border-color 0.15s ease;
  overflow: hidden;
  position: relative;
  &:hover{
    border: 2px solid map-get($colors, pink);
    .header{
      &:after {
        color: map-get($colors, pink);
      }
    }
  }
  &.active{
    border: 2px solid map-get($colors, green);
    .header{
      &:after {
        color: map-get($colors, green);
        transform: rotate(180deg) translateY(50%);
      }
    }
  }
  .header{
    position: relative;
    padding: 10px 20px;
    font-size: 25px;
    line-height: 27px;
    cursor: pointer;
    font-weight: 500;
    &:after{
      transition: color 0.15s ease;
      font-size: 14px;
      content: "\25bc";
      position: absolute;
      right: 17px;
      top: 50%;
      transform-origin: 50% 50%;
      transform: translateY(-50%);
    }
  }
  .content{
    padding: 10px 20px;
  }
}
.default-spoilers-wraper{
  .default-spoiler{
    margin-top: -2px;
    border-top: 2px solid transparent;
    &:first-child{
      margin-top: 0;
      border-radius: 5px 5px 0 0;
      border-top: 2px solid map-get($colors, lBlue);
      &:hover{
        border: 2px solid map-get($colors, pink);
      }
      &.active{
        border: 2px solid map-get($colors, green);
      }
    }
    &:hover{
      z-index: 2;
      border: 2px solid map-get($colors, pink);
      +.default-spoiler{
        border-top: 2px solid map-get($colors, pink);
      }
    }

    &.active{
      border: 2px solid map-get($colors, green);
      z-index: 1;
    }
    &:last-child{
      border-radius: 0 0 5px 5px;
    }
  }
}
