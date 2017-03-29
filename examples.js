/*Проверка на  мобилу*/
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
function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
};

/*ОТКЛЮЧЕНИЕ ВКЛЮЧЕНИЕ СКРОЛА END*/

/*Проверка email поля*/
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
/*Проверка email поля END*/

/*video JS */
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
/*video JS END*/
/*slider*/
function slide(dir, index){
    cur = $slides.filter(".current").length > 0 $slides.filter(".current").index() : 0;
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
  
    var $curSlide = $slides.eq(cur),
        $nextSlide = $slides.eq(nextCur);

    $slides.removeClass("current start");
    $slides.eq(nextCur).addClass("current");
};
/*slider END*/
/*СКРЫТЬ здaceholder по фокусу*/
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
/*СКРЫТЬ здaceholder по фокусу END*/


/*ОФОРМЛЕНИЕ  чекбоксов и адиобоксов*/
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
/*
.custom-checkbox{
  user-select: none;
  cursor: pointer;
  position:relative;
  display:inline-block;
}
.ie8 .custom-checkbox{
  zoom:1;
}
.custom-checkbox>.box{
  position:relative;
  display:block;
  width:14px;
  height:14px;
  border:1px solid #ebcda4;;
  background-color:#fff;
  border-radius:3px;
}
.custom-checkbox>.box>.tick{
  position:absolute;
  left:2px;
  top: -1px;
  width: 11px;
  height: 7px;
  border-bottom:2px solid #333;
  border-left:2px solid #333;
  transform:rotate(-45deg);
  display:none;
}
.oldie .custom-checkbox>.box>.tick{
  left:1px;
  top:-5px;
  zoom:1;
}
.custom-checkbox>input:checked+.box>.tick{
  display:block;
}
.custom-checkbox.checked>.box>.tick{
  display:block;
}
.custom-checkbox>input{
  position:absolute;
  outline:none;
  left:0;
  top:0;
  padding:0;
  width:16px;
  height:16px;
  border:none;
  margin:0;
  opacity:0;
  z-index:1;
}

.custom-radiobox{
  user-select: none;
  cursor: pointer;
  position:relative;
  display:inline-block;
}
.ie8 .custom-radiobox{
  zoom:1;
}
.custom-radiobox>.box{
  position:relative;
  box-sizing: border-box;
  display:block;
  width:16px;
  height:16px;
  border:1px solid #ebcda4;
  background-color:#fff;
  border-radius: 100%;
}
.custom-radiobox>.box>.dot{
  position:absolute;
  background: #333333;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: none;
}
.oldie .custom-radiobox>.box>.dot{
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  zoom: 1;
}
.custom-radiobox>input:checked+.box>.dot{
  display:block;
}
.custom-radiobox.checked>.box>.dot{
  display:block;
}
.custom-radiobox>input{
  position:absolute;
  outline:none;
  left:0;
  top:0;
  padding:0;
  width:16px;
  height:16px;
  border:none;
  margin:0;
  opacity:0;
  z-index:1;
}
/*ОФОРМЛЕНИЕ  чекбоксов и адиобоксов END */
/*КЛАССЫ ДЛЯ ОФОРМЛЕНИЯ ТАБЛИЦ*/
function allTablesInit(){
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
/*КЛАССЫ ДЛЯ ОФОРМЛЕНИЯ ТАБЛИЦ END*/
