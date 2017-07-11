var myInitTable1 = $(".tableWrapper1")[0].outerHTML;
var myInitTable2 = $(".tableWrapper2")[0].outerHTML;

jQuery('input[placeholder], textarea[placeholder]').placeholder();

$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};

function verify_chislo(obj, ch) {
        if(isnumber(ch)) {
//                    $(".start_price").html(ch  + ' руб.');
        } else {
            obj.val(ch.slice(0,-1));
            if (ch.slice(-1) == ',') {
                obj.val(obj.val()+".");
            }
        }
}

function isnumber(param) {
        if ( param == 0 ) return true;
        return res = (param / param) ? true : false;
}
function getNumberAfterDot(x) {
    //console.log('?????'+typeof x);
    if (typeof x !== 'string' && typeof x !== 'undefined') {
        x = x.toString();
    }
//    console.log( "--- "+x+ " "+x.indexOf("."))
    if (typeof x == 'string' && x.indexOf(".") >= 0) {
        _a = (x.length - x.indexOf(".") - 1);

        if (x.indexOf(".") > 0) {
//            console.log('????? '+x + " " + x.slice(-1) + " " + _a);
            if (x.slice(-1) == '0') {
                x = x.slice(0,-1);
                _a--;
            }
            if (x.slice(-1) == '.') {
                x = x.slice(0,-1);

            }
//            console.log('!!!!! '+x + " " + x.slice(-1) + " " + _a);
        }
        x = Number(x);
        return _a;
    } else {
//        console.log("aaaaaas")
        x = Number(x);
        return 0;
    }
}
function getMaxNumberAfterDot(x, y) {
    //console.log('max = '+ (x) + " " + getNumberAfterDot(x) + " / " + y + " " + getNumberAfterDot(y))
    return Math.max(getNumberAfterDot(x), getNumberAfterDot(y));
}
function calcTables(T){
    var $trClac = T.closest("tr.calc");
    var Tval = parseFloat(T.val());
    if( typeof Tval !== "undefined" && !isNaN(Tval) || T.val()== "" ){
        T.removeClass("errorFld");
    }else{
        T.addClass("errorFld");
    }
    $trClac.each(function(){
        var $thatTr = $(this);
        var totalTrSum = 0;
        var trMaxGvsVal = 0;
        var trLowGvsVal = 0;
        var trMaxGvs = $thatTr.find("td:nth-child(6) .inputNumber");
        var trLowGvs = $thatTr.find("td:nth-child(5) .inputNumber");
        var _after_r = 0;
        var _after_r1 = 0;
        var _after_r2 = 0;

        if( typeof parseFloat(trMaxGvs.val()) !== "undefined" && !isNaN(parseFloat(trMaxGvs.val())) ){
            trMaxGvsVal = parseFloat(trMaxGvs.val());
        }
        if( typeof parseFloat(trLowGvs.val()) !== "undefined" && !isNaN(parseFloat(trLowGvs.val())) ){
            trLowGvsVal = parseFloat(trLowGvs.val());
        }
        //console.log('============================');
        $thatTr.find("input.inputNumber:not(.total)").each(function(i){
            var index = i;
            var colSum=0;
            var thatInNum = $(this);
            var thatInNumVal = Number(thatInNum.val());
            if( typeof thatInNumVal !== "undefined" && !isNaN(thatInNumVal) ){

                _after_r = getMaxNumberAfterDot(parseFloat(totalTrSum), thatInNumVal);
//                console.log("aa "+_after_r + " " +(typeof totalTrSum) + " " + (typeof thatInNumVal));

                totalTrSum = Number(totalTrSum) + thatInNumVal;
                totalTrSum = parseFloat(totalTrSum).toFixed(_after_r);

//                console.log('3: ' + totalTrSum + " " + thatInNumVal + " " + _after_r);


                var colSum = thatInNumVal;

            }
            //console.log('--- '+colSum);
            $thatTr.siblings("tr.calc").each(function(){
                var $thatTr = $(this);
                var thatInputVal2 = parseFloat($thatTr.find("td:nth-child("+(index+2)+") input.inputNumber").val());
                if( typeof thatInputVal2 !== "undefined" && !isNaN(thatInputVal2) ){

                    var _after = getMaxNumberAfterDot(thatInNumVal, thatInputVal2);

                    colSum -= thatInputVal2;
                    thatInputVal2 = Number(thatInputVal2).toFixed(_after);

                    if ($thatTr.hasClass("after")) {
                        colSum *= -1;
                    }
                    colSum = colSum.toFixed(_after);
//                    console.log('' + colSum + " = " + thatInNumVal + " - " +thatInputVal2 + " ____ " + _after);
                }
            });
            //console.log('=== '+colSum);
            $thatTr.closest("table").find("tr.totalRow td:nth-child("+(index+2)+") input.inputNumber").val(colSum);
        });

        var $trTotalLowTD = $thatTr.find(".totalLow");
        var $trTotalMaxTD = $thatTr.find(".totalMax");
        var _after_r1 = getMaxNumberAfterDot(parseFloat(totalTrSum), trMaxGvsVal);
        var _after_r2 = getMaxNumberAfterDot(parseFloat(totalTrSum), trLowGvsVal);
        $trTotalLowTD.val(parseFloat((totalTrSum) - trMaxGvsVal).toFixed(_after_r1));
        $trTotalMaxTD.val(parseFloat((totalTrSum) - trLowGvsVal).toFixed(_after_r2));
        // финальные значения
        var _after1 = getMaxNumberAfterDot($trTotalLowTD.val(), $thatTr.siblings("tr.calc").find(".totalLow").val());
        var _after2 = getMaxNumberAfterDot($trTotalMaxTD.val(), $thatTr.siblings("tr.calc").find(".totalMax").val());
        var $trFinalLowTD = $thatTr.closest("table").find(".finalLow");
        var $trFinalMaxTD = $thatTr.closest("table").find(".finalMax");
        //console.log("--- " + Number($trTotalLowTD.val()));
        var _sign = 1;
        if ($thatTr.hasClass("now")) {
            _sign = -1;
        }
        $trFinalLowTD.val(((Number($trTotalLowTD.val()) - Number($thatTr.siblings("tr.calc").find(".totalLow").val()))*_sign).toFixed(_after1));
        $trFinalMaxTD.val(((Number($trTotalMaxTD.val()) - Number($thatTr.siblings("tr.calc").find(".totalMax").val()))*_sign).toFixed(_after2));

        // ошибки

        if( (parseFloat($trTotalMaxTD.val()) > parseFloat($trTotalLowTD.val()) || ( parseFloat($trTotalMaxTD.val()) == 0 && parseFloat($trTotalLowTD.val()) == 0 )) && ( parseFloat($trTotalMaxTD.val()) > -1 && parseFloat($trTotalLowTD.val()) > -1 ) ){
            $trTotalLowTD.removeClass("errorFld");
            $trTotalMaxTD.removeClass("errorFld");
        }else{
            $trTotalLowTD.addClass("errorFld");
            $trTotalMaxTD.addClass("errorFld");
        }
        $thatTr.on("blur", ".inputNumber", function(){
            verify_chislo($(this), $(this).val());
        });

        $thatTr.on("keypress", ".inputNumber", function(e){
            verify_chislo($(this), $(this).val());
        });

        $thatTr.on("keyup", ".inputNumber", function(){
            verify_chislo($(this), $(this).val());
        });

        $thatTr.on("change", ".inputNumber", function(){
            verify_chislo($(this), $(this).val());
        });
    });
}

function checkTableColFields(){
    var $table = $(".tableWrapper .table").not(":hidden"),
    $selectRow = $table.find(".tempGraphRow"),
    $selectRowExpandSelect = $selectRow.find(".expandSelect");
    $table.each(function(){
        var $thisT = $(this);
        $allInspectRows = $thisT.find("tr:not('.totalRow'):has(input), tr:not('.totalRow'):has(select)").not(':first'),
        $allInspectRowsInputs = $allInspectRows.find("input:not(.total)"),
        $firstInputsRow = $thisT.find("tr:not('.totalRow'):has(input), tr:not('.totalRow'):has(select)").first(),
        $firstInputsRowInputs = $firstInputsRow.find("input:not(.total)");
        
        $firstInputsRowInputs.each(function(i){
            var $this = $(this),
            thisVal = $(this).val().trim();
            if( !$this.hasClass("gvs") ){
                if( thisVal && thisVal != 0 ){
                    $allInspectRows.find("td:eq("+(i+1)+") input, td:eq("+(i+1)+") select").addClass("required");
                }else{
                    $allInspectRows.find("td:eq("+(i+1)+") input, td:eq("+(i+1)+") select").removeClass("required fillAlert");
                }
            }else{
                $allInspectRows.find("td:eq("+(i+1)+") input, td:eq("+(i+1)+") select").addClass("required");
            }
        });
    });

}
$(".tableWrapper .table .tempGraphRow .expandSelect").change(function() {
    var $this = $(this);
    if( $this.val() === "Иное" ) {
        $this.next("input").show();
    }else{
        $this.next("input").hide();
    }
});
$(".tableWrapper .table .tempGraphRow .expandSelect").trigger("change");

function showError(){
    $("body").append("<div class='errorMessage'></div>");
    $("form").on("mouseenter",".errorFld, .wrapTotal:has(.errorFld), .fillAlert", function(){
        var that = $(this);
        function action(text){
            var thatY = that.offset().top;
            var thatW = that.outerWidth();
            var thatX = that.offset().left;
            $(".errorMessage").text(text);
            $(".errorMessage").show();
            $(".errorMessage").css({ left: thatX+thatW/2, top: thatY, "margin-top":-($(".errorMessage").outerHeight()+9) });
        }
        if( $(this).hasAttr('data-errorMessage') || $(this).find(".errorFld").hasAttr('data-errorMessage') ){
            var myText;
            if( $(this).hasAttr('data-errorMessage') ){
                myText = $(this).attr('data-errorMessage');
            }else{
                myText = $(this).find(".errorFld").attr('data-errorMessage');
            }
            action(myText)
        }else if( $(this).hasClass("inputNumber") ){
            myText = "Поле должно содержать цифровое значение";
            action(myText)
        }else{
            myText = "Поле должно содержать значение";
            action(myText)
        }
    });
    $("body").on("mousemove", "form", function(e){
        if ( !$(e.target).hasClass("errorFld") && !$(e.target).hasClass("fillAlert") && !$(e.target).closest(".wrapTotal").find(".errorFld").length > 0 && !$(e.target).closest(".fillAlert").length > 0 ){
            $(".errorMessage").hide();
        }
    });
}
function selectTextarea(){
    $(".selectTextarea select").on("change", function(){
        var v = $(this).val();
        var $que = $(this).closest(".queRow");
        $que.find("textarea").val( $que.find(".selectValues div[data-number='"+v+"']").text() );
        $que.find("textarea").css( {"height" : "5px"} );
        var totP = parseFloat($que.find("textarea").css("padding-top")) + parseFloat($que.find("textarea").css("padding-bottom"));
        $que.find("textarea, .textareaHelper").css({height : $que.find("textarea")[0].scrollHeight - totP+20});
    });
}
function customSelectTextarea(){
    $(".customSelectTextarea select").on("change", function(){
        var $que = $(this).closest(".queRow");
        var v = $(this).val();
        if( v == "88" || v =="271" ){
            $que.find("textarea").show();
        }else{
            $que.find("textarea").hide();
        }
    });
}
function isRegionMoscow(){
    $("input[name='form_radio_SIMPLE_QUESTION_570']").change(function() {
        if( $("input[value='264']").is(":checked") && $("body.page_moek").length > 0 ) {
            $("select[name='form_dropdown_SIMPLE_QUESTION_376']").closest(".queRow").show();
        }else{
            $("select[name='form_dropdown_SIMPLE_QUESTION_376']").closest(".queRow").hide();
        }
    });
}
function selectForm(){
    var allFormsCl = [];
    var allFormsCo = [];
    $(".mainFormMenu.requestFrom .item").each(function(){
        allFormsCl.push($(this).attr("data-class"));
    });
    $(".mainFormMenu.companies .item").each(function(){
        allFormsCo.push($(this).attr("data-class"));
    });
    $(".mainFormMenu.requestFrom .item").on("click", function(){
        $(".mainFormMenu.requestFrom .item").removeClass("cur");
        $(this).addClass("cur");

        var curDescText = $(this).find(".qwe2").text();
        var curClass = $(this).attr("data-class");
        for(var i=0; i < allFormsCl.length; i++){
            $(".formWrapper  ."+allFormsCl[i]+"").hide();
            $("body").removeClass("page_"+allFormsCl[i]+"");
        }
        $(".title.titleDesc").text("(для "+curDescText+")");
        $("body").addClass("page_"+curClass+"");
        $(".formWrapper ."+curClass+"").show();
        
        /*vitia*/
        if(curClass == 'formUL'){
            $('#48').prop("checked", true);
            $('#49').attr({ checked : false});
            $('#50').attr({ checked : false});
        } else if(curClass == 'formIP'){
            $('#48').attr({ checked : false});
            $('#49').prop("checked",true);
            $('#50').attr({ checked : false});
        } else if(curClass == 'formFL') {
            $('#48').attr({ checked : false});
            $('#49').attr({ checked : false});
            $('#50').prop("checked", true);
        }
        /*end vitia*/
    });
    $(".chooseEnergy input").on("click", function(){
        $(".chooseEnergy input").attr({ checked : false});
        $(".chooseEnergy input").prop("checked",false);
        $(this).attr({ checked : "checked"});
        $(this).prop("checked",true);
    });
    $(".mainFormMenu.companies .item").on("click", function(){
        $(".mainFormMenu.companies .item").removeClass("cur");
        $(this).addClass("cur");

        var curDescText = $(this).find(".qwe2").text();
        var curClass = $(this).attr("data-class");
        for(var i=0; i < allFormsCo.length; i++){
            $(".formWrapper ."+allFormsCo[i]+"").hide();
            $("body").removeClass("page_"+allFormsCo[i]+"");
        }
        //$(".title.titleDesc").text("(для "+curDescText+")");
        $("body").addClass("page_"+curClass+"");
        $(".formWrapper ."+curClass+"").show();
        window.location.hash = '#'+curClass;
        
        /*vitia*/
        if(curClass == 'moek'){
            $('#51').prop("checked", true);
            $('#52').attr({ checked : false});
            $('#53').attr({ checked : false});
        } else if(curClass == 'mosenergo') {

            $('#51').attr({ checked : false});
            $('#52').prop("checked",true);
            $('#53').attr({ checked : false});
        } else if(curClass == 'newmoscow') {

            $('#51').attr({ checked : false});
            $('#52').attr({ checked : false});
            $('#53').prop("checked", true);
        }
        $("input[name='form_radio_SIMPLE_QUESTION_570']").trigger("change");
    });
        //Заявка на
    $(".mainFormMenu.requestOn .item").on("click", function(){
        $(".mainFormMenu.requestOn .item").removeClass("cur");
        $(this).addClass("cur");
        var curClassBid = $(this).attr("data-class");

        if(curClassBid == 'formCN'){
            var flagCN = 1;
            var flagGU = 0;

            $('#46').prop("checked",true)
            $('#47').attr({ checked : false});
        } else if(curClassBid == 'formGU'){
            flagGU = 1;
            flagCN = 0;

            $('#46').attr({ checked : false});
            $('#47').prop("checked",true);
        }

        if(flagCN == 1){
            $(".requestCN").show();
            $(".requestGU").hide();
        } else if(flagGU == 1) {
            $(".requestCN").hide();
            $(".requestGU").show();
        }
    });
    /*end vitia*/
}
function initCapabilityTable(){
    $("table.capability tr:has(td)").each(function(i){
            $(this).find("td:eq(0)").attr("data-count", (i+1)+".");
    });
}
function chooseTable(){
    $(".chooseTable input").on("click", function(){
        var myV = $('.chooseTable input[name="form_radio_SIMPLE_QUESTION_150"]:checked').val();
        if( myV == 55 || myV == 57 ){
            $(".table1").closest(".tableWrapper").show();
            $(".table2").closest(".tableWrapper").hide();
        }else{
            $(".table2").closest(".tableWrapper").show();
            $(".table1").closest(".tableWrapper").hide();
        }
    });
}
function addTable(){
    $("a[name='addTable']").on("click", function(){
        var myV = $('.chooseTable input[name="form_radio_SIMPLE_QUESTION_150"]:checked').val();
        if( myV == 55|| myV == 57 ){
            $(".tableWrapper1:last").after(myInitTable1);
            $(".tableWrapper1:last").find( $("input[data-tempmask]") ).inputmask({
                mask: "*{1,10}°C",
                definitions: {
                  '*': {
                    validator: "[0-9A-Za-z!#$%&.,'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                  }
                },
                "onincomplete": function(){  }
            });
            if( $(".tableWrapper1").length > 1 ){
                $(".tableWrapper1").find(".closeButton").show();
                $(".tableWrapper1").find(".tableAddress").show();

            }
        }else{
            $(".tableWrapper2:last").after(myInitTable2);
            $(".tableWrapper2:last").find( $("input[data-tempmask]") ).inputmask({
                mask: "*{1,10}°C",
                definitions: {
                  '*': {
                    validator: "[0-9A-Za-z!#$%&.,'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                  }
                },
                "onincomplete": function(){  }
            });
            if( $(".tableWrapper2").length > 1 ){
                $(".tableWrapper2").find(".closeButton").show();
                $(".tableWrapper2").find(".tableAddress").show();
            }else{

            }
        }
        saveJsonTableWrapper();
    });
}
function removeTable(){
    $("body").on("click",".tableWrapper .closeButton", function(){
        var that = $(this);
        that.closest(".tableWrapper").remove();
        if( $(".tableWrapper2").length == 1 ){
            $(".tableWrapper2").find(".closeButton").hide();
            $(".tableWrapper2").find(".tableAddress").hide();
        }
        if( $(".tableWrapper1").length == 1 ){
            $(".tableWrapper1").find(".closeButton").hide();
            $(".tableWrapper1").find(".tableAddress").hide();
        }
        saveJsonTableWrapper();
    });
}
function isHeatSourse(){
    $("input[name='form_radio_SIMPLE_QUESTION_9999']").on("click", function(){
        var myV = $("input[name='form_radio_SIMPLE_QUESTION_9999']:checked").val();
        if( myV == 274 ){
            $(".capabilityQueRow").show();
        }else{
            $(".capabilityQueRow").hide();
        }
    });
    $("input[name='form_radio_SIMPLE_QUESTION_9999']:checked").trigger("click");
}
function addHeatSourse(){
    var nextRowElement
    $("a[name='addHeatSourse']").on("click", function(){
        var $table = $(".capability.table");
        var $lastTr = $(".capability.table tr:not(.trh):last");
        var curRowCount = $(".capability.table tr:not(.trh)").length;
        nextRowElement = '<tr>\
                <td><input type="text" name="T2_ISTOCHNIK_ENERGII_'+(curRowCount+1)+'" class="inputText w100 required"></td>\
                <td><input  type="text" name="T2_TEPLOVAYA_MOSHNOST_'+(curRowCount+1)+'" class="inputText w100 required"></td>\
                <td>\
                    <input type="text" name="T2_REJIM_RABOTI_'+(curRowCount+1)+'" class="inputText w100 required">\
                    <div class="closeButton"></div>\
                </td>\
        </tr>';

        $(nextRowElement).insertAfter($lastTr);
        $(".capability.table tr:not(:eq(1)):not(.trh)").addClass("topPad");
        $(".capability.table").find(".closeButton").show();
        initCapabilityTable();
        saveJsonTableCapability();
    });

}
function removeHeatSourse(){
    $("body").on("click",".capability.table .closeButton", function(){
        var that = $(this);
        that.closest("tr").remove();
        if( $(".capability.table tr:not(.trh)").length == 1 ){
            $(".capability.table tr:not(.trh)").removeClass("topPad");
            $(".capability.table").find(".closeButton").hide();
        }
        initCapabilityTable();
        saveJsonTableCapability();
    });

}
/*datepicker*/
$(function(){
    $.datepicker.regional["ru"] = {
    closeText: 'Применить',
    prevText: '&#x3c;Пред',
    nextText: 'След&#x3e;',
    currentText: 'Сегодня',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
    'Июл','Авг','Сен','Окт','Ноя','Дек'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false
};
$.datepicker.setDefaults($.datepicker.regional[ "ru" ]);
    $(".datepicker").datepicker();
    $('.datepickerM').datepicker( {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },
        beforeShow: function (input, inst) {
         var offset = $(input).offset();
         var height = $(input).height();
         window.setTimeout(function () {
             inst.dpDiv.css({ top: (offset.top + height + 20) + 'px', left: offset.left + 'px' })
         }, 1);
        }

    });
});
/*END datepicker*/

var JsonTableWrapper = {};
function saveJsonTableWrapper(){
    JsonTableWrapper = {};
    $('.tableWrapper:not([style*="display: none"])').each(function(i){
        var $table = $(this);
        var tableKey = "table"+(i+1)+"";
        JsonTableWrapper[tableKey] = {};
        if( $table.closest(".tableWrapper").find(".tableAddress input").length > 0 ){
            JsonTableWrapper[tableKey].address = $table.closest(".tableWrapper").find(".tableAddress input").val();
        }
        $table.find("tr:has(td:not(.empty) input), tr:has(td:not(.empty) select)").each(function(i){
            var $tr = $(this);
            var trKey = "tr"+(i+1)+"";
            JsonTableWrapper[tableKey][trKey] = {};
            $tr.find("td:not(.empty) input, td:not(.empty) select").each(function(i){
                var modStr = "";
                var $inp = $(this);
                if( $inp[0].hasAttribute("data-desc") ){ modStr = "-"+$inp.attr("data-desc") }
                JsonTableWrapper[tableKey][trKey][i+1+modStr] = $inp.val();
            });
        });
    });
    $("textarea[name='form_textarea_165']").html( JSON.stringify(JsonTableWrapper) );
}
var JsonTableCapability = {};
function saveJsonTableCapability(){
    JsonTableCapability = {};
    $('.requestCN:not([style*="display: none"]) .capability.table').each(function(i){
        var $table = $(this);
        var tableKey = "table"+(i+1)+"";
        JsonTableCapability[tableKey] = {};
        $table.find("tr:has(td input)").each(function(i){
            var $tr = $(this);
            var trKey = "tr"+(i+1)+"";
            JsonTableCapability[tableKey][trKey] = {};
            $tr.find("td input, td select").each(function(i){
                var $inp = $(this);
                JsonTableCapability[tableKey][trKey][i+1] = $inp.val();
            });
        });
    });
    $("textarea[name='form_textarea_166']").html( JSON.stringify(JsonTableCapability) );
}
var myGlobalForNav = false;
function navigationInit(){
    var $block = $("form[name='SIMPLE_FORM_4']");
    var $slides = $block.find(".formPage");
    var slidesCount = $block.find(".formPage").length;
    if( slidesCount > 1 ){
        var cur = ($block.find(".formPage.cur").length>0 ? $block.find(".formPage.cur").index() : 0 );
        $slides.eq(cur).addClass("cur");
        $(".bottomNavigation .pageAll").text(slidesCount);
        $(".bottomNavigation .pageCur").text(cur+1);
        $(".bottomNavigation .pageCurName").text( $(".stageArrowsBlock li:eq("+cur+")").text() );
        
        if( cur === 0 ){
            $(".bottomNavigation .prev").hide();
        }else{
            $(".bottomNavigation .prev").show();
        }
        if( cur === slidesCount-1 ){
            $(".bottomNavigation .next, .bottomNavigation .current").hide();
            $(".bottomNavigation input[type='submit']").show();
            
        }else{
            $(".bottomNavigation .next, .bottomNavigation .current").show();
            $(".bottomNavigation input[type='submit']").hide();
        }
        $(".stageArrowsBlock li").removeClass("active");
        for( var i=0; i<= cur; i++ ){
            $(".stageArrowsBlock li:eq("+i+")").addClass("active");
        }
        $slides.css("")
        function slide(dir, index){
            cur = $block.find(".formPage.cur").index();
            var nextCur;
            var Xform;
            if((dir === "right") && (cur !== slidesCount-1)){
                nextCur = cur+1;
            }else if((dir === "right") && (cur === slidesCount-1)){
                return false;
            }else if((dir === "left") && (cur !== 0)){
                nextCur = cur-1;
            }else if((dir === "left") && (cur === 0)){
                return false;
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
            /*ПРОВЕРКА НА ЗАПОЛНЕНИЕ ТЕКУЩЕГО ПУНКТА*/
           if( nextCur > cur  ) {
               checkTableColFields();
               checkActualFormFields();
               if( myGlobalForNav ){
                   return false;
               }
           }
           /*END ПРОВЕРКА НА ЗАПОЛНЕНИЕ ТЕКУЩЕГО ПУНКТА*/
            
            if( nextCur === 0 ){
                $(".bottomNavigation .prev").hide();
            }else{
                $(".bottomNavigation .prev").show();
            }
            if( nextCur === slidesCount-1 ){
                $(".bottomNavigation .next, .bottomNavigation .current").hide();
                $(".bottomNavigation input[type='submit']").show();
            }else{
                $(".bottomNavigation .next, .bottomNavigation .current").show();
                $(".bottomNavigation input[type='submit']").hide();
            }
            
            $(".stageArrowsBlock li").removeClass("active");
            for( var i=0; i <= nextCur; i++ ){
                $(".stageArrowsBlock li:eq("+i+")").addClass("active");
            }
            $slides.removeClass("cur start");
            $slides.eq(nextCur).addClass("cur");
            $(".bottomNavigation .pageCur").text(nextCur+1);
            $(".bottomNavigation .pageCurName").text( $(".stageArrowsBlock li:eq("+cur+")").text() );
            if(  typeof index === 'undefined' ){
                $('html, body').animate({
                    scrollTop: $(".baseLayout-left-col").offset().top
                }, 0);
            }
        }
        $(".bottomNavigation .next").on("click", function(){
            slide("right");
        });
        $(".bottomNavigation .prev").on("click", function(){
            slide("left");
        });
        $(".stageArrowsBlock li").on("click", function(){
            var $this = $(this);
            if( $this.nextAll(".active").length == 1 || ($this.prev(".active").length > 0 && $this.nextAll(".active").length == 0 ) ){
                slide( null, $(this).index() );
            }
        });
    }
    $block.addClass("initComplete");
}
function checkActualFormFields(){
    $(".formPage:not(.cur) .required").removeClass("fillAlert");
    myGlobalForNav = false;
    $(".formPage.cur .required").not(":hidden, .tableResultArea").each(function(){
        var $this = $(this);
        var thisVal = $(this).val().trim();
        if( $this.attr("type") !== "checkbox" && $this.attr("type") !== "radio" ){
            if(!thisVal){
                myGlobalForNav = true;
                if( $this.attr("type") !== "file" ){
                    $this.addClass("fillAlert");
                }else{
                    $this.closest(".file-upload").addClass("fillAlert");
                }
            }else{
                if( $this.attr("type") !== "file" ){
                    if( $this.hasClass("gvs") ){
                        var $gvsMax = $this.closest(".table").find(".gvs_max"),
                        gvsMaxInputVal = parseFloat($gvsMax.val()),
                        $gvsMed = $this.closest(".table").find(".gvs_med"),
                        gvsMedInputVal = parseFloat($gvsMed.val());
                        //console.log( gvsMedInputVal )
                        //console.log( gvsMaxInputVal )
                        if( (gvsMedInputVal == 0 && gvsMaxInputVal > 0) || (gvsMedInputVal != 0 && gvsMaxInputVal <= gvsMedInputVal) ){
                            $gvsMax.add( $gvsMed ).addClass("fillAlert");
                        }/*else{
                            $gvsMax.add( $gvsMed ).removeClass("fillAlert");
                        }*/
                    }else{
                        $this.removeClass("fillAlert");
                    }
                }else{
                    $this.closest(".file-upload").removeClass("fillAlert");
                }
            }
        }else{
            if( !$this.is(":checked") ){
                myGlobalForNav = true;
                $this.closest(".queRow").addClass("fillAlert");
            }else{
                $this.closest(".queRow").removeClass("fillAlert");
            }
        }
    });
    if( myGlobalForNav ){
        $('html, body').animate({
            scrollTop: $(".formPage.cur .fillAlert:eq(0)").offset().top-70
        }, 500);
    }
}
$("input[name='web_form_submit']").on("click", function(e){
   checkActualFormFields();
   if( myGlobalForNav ){
       return false;
   }
});

function removeAlertOnFocus(){
    $("body").on("click, focus", ".required", function(){
        var $this = $(this);
        if( $this.attr("type") !== "checkbox" && $this.attr("type") !== "radio" ){
            if( $this.attr("type") !== "file" ){
                $this.removeClass("fillAlert");
            }else{
                $this.closest(".file-upload").removeClass("fillAlert");
            }
        }else{
            $this.closest(".queRow").removeClass("fillAlert");
        }
        
    });
}
function fieldCustomValidation(){
    $('input[name=form_text_44]').on("change, keyup", function(){
        var $email = $(this);
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!re.test($email.val())){
            $email.addClass("fillAlert");
        }else{
            $email.removeClass("fillAlert");
        }
    })
}
/*=======LOCAL STORAGE===========*/
var fieldsLocalStorageJSON = {};
function localStorageInit(){
    if( typeof(Storage) == "undefined" ){ return false; }

    $storageFields = $("input[data-saveStorage], textarea[data-saveStorage], select[data-saveStorage]");

    var fieldsLocalStorageJSON = JSON.parse(sessionStorage.getItem("fieldsLocalStorageJSON-Item"));
    if (fieldsLocalStorageJSON == null){
        //console.log( "fieldsLocalStorageJSON = NULL" );
        fieldsLocalStorageJSON = {};
        function createStorageData(){
            $storageFields.each(function(){
                var $that = $(this),
                nameKey = $that.attr("name"),
                thisProps = {};
                thisProps.nodeName = $that[0].nodeName;
                if( thisProps.nodeName == "INPUT" ){
                    thisProps.nodeType = $that.attr("type");
                }
                fieldsLocalStorageJSON[nameKey] = thisProps;
            });
        };
        createStorageData();
    }else{
        //console.log( "fieldsLocalStorageJSON != NULL" );
        //console.log( fieldsLocalStorageJSON );
        function expandfieldsLocalStorageJSON(){
            var i = 0;
            for(var key in fieldsLocalStorageJSON) {
                var thatName = Object.keys(fieldsLocalStorageJSON)[i],
                itemValue = fieldsLocalStorageJSON[key],
                thatNodeName = fieldsLocalStorageJSON[key].nodeName;
                if( thatNodeName == "INPUT" ){
                    thatnodeType = fieldsLocalStorageJSON[key].nodeType;
                    if( thatnodeType == "checkbox" ){
                        if( typeof fieldsLocalStorageJSON[key].value !== 'undefined' ){
                            if( fieldsLocalStorageJSON[key].value ){
                                $("[name='"+thatName+"']").prop( "checked", true );
                            }else{
                                $("[name='"+thatName+"']").prop( "checked", false );
                            }
                        }
                    }else if( thatnodeType == "radio" ){
                        if( typeof fieldsLocalStorageJSON[key].value !== 'undefined' ){
                            $("[name='"+thatName+"']").filter("[value='"+fieldsLocalStorageJSON[key].value+"']").prop('checked', true);
                        }
                    }else{
                        if( typeof fieldsLocalStorageJSON[key].value !== 'undefined' ){
                            //console.log(thatNodeName);
                            $("[name='"+thatName+"']").val( fieldsLocalStorageJSON[key].value );
                        }
                    }
                }else if( thatNodeName == "TEXTAREA" || thatNodeName == "SELECT" ){
                    if( typeof fieldsLocalStorageJSON[key].value !== 'undefined' ){
                        $("[name='"+thatName+"']").val( fieldsLocalStorageJSON[key].value );
                    }
                }
                i++;
            }
        }
        expandfieldsLocalStorageJSON();
    }

    $storageFields.on("change", function(){
        var $that = $(this),
        thatNameKey = $that.attr("name"),
        thatVal = $that.val(),
        thatNodeName = $that[0].nodeName;
        //console.log("thatNodeName="+thatNodeName);
        if( thatNodeName == "INPUT" ){
            thatnodeType = $that.attr("type");
            //console.log("thatnodeType="+thatnodeType);
            if( thatnodeType == "checkbox" ){
                if( $that.is(":checked") ){
                    fieldsLocalStorageJSON[thatNameKey].value = true;
                }else{
                    fieldsLocalStorageJSON[thatNameKey].value = false;
                }
            }else if( thatnodeType == "radio" ){
                fieldsLocalStorageJSON[thatNameKey].value = $that.filter(':checked').val();
            }else{
                fieldsLocalStorageJSON[thatNameKey].value = $that.val();
            }
        }else if( thatNodeName == "TEXTAREA" || thatNodeName == "SELECT" ){
            fieldsLocalStorageJSON[thatNameKey].value = $that.val();
        }
        sessionStorage.setItem("fieldsLocalStorageJSON-Item", JSON.stringify(fieldsLocalStorageJSON));
        //console.log(fieldsLocalStorageJSON);
    });

    //console.log(fieldsLocalStorageJSON);
};
function checkcapabilityQueRowMOSHNOST(){
    $("body .capabilityQueRow").on("blur", "input[name*='T2_TEPLOVAYA_MOSHNOST']", function(){
        verify_chislo($(this), $(this).val());
    });

    $("body .capabilityQueRow").on("keypress", "input[name*='T2_TEPLOVAYA_MOSHNOST']", function(){
        verify_chislo($(this), $(this).val());
    });

    $("body .capabilityQueRow").on("keyup", "input[name*='T2_TEPLOVAYA_MOSHNOST']", function(){
        verify_chislo($(this), $(this).val());
    });

    $("body .capabilityQueRow").on("change", "input[name*='T2_TEPLOVAYA_MOSHNOST']", function(){
        verify_chislo($(this), $(this).val());
    });
}

/*=======LOCAL STORAGE END===========*/
$("document").ready(function(){
    $('input[name=form_text_43]').inputmask("+7(999)999-99-99",{ 
        "onincomplete": function(){ $('input[name=form_text_43]').val(""); }
    });
    $('input[name=form_text_253]').inputmask("+7(999)999-99-99",{ 
        "onincomplete": function(){ $('input[name=form_text_253]').val(""); }
    });
    /*INN*/
    $("input[name=form_text_34]").inputmask("9{10,12}",{ 
        "onincomplete": function(){ $("input[name=form_text_34]").val(""); }
    });
    /*KPP*/
    $("input[name=form_text_35]").inputmask("999999999",{ 
        "onincomplete": function(){ $("input[name=form_text_35]").val(""); }
    });
    /*OKPO*/
    $("input[name=form_text_36]").inputmask("99999999",{ 
        "onincomplete": function(){ $("input[name=form_text_36]").val(""); }
    });
    /*OGRN*/
    $("input[name=form_text_37]").inputmask("9999999999999",{ 
        "onincomplete": function(){ $("input[name=form_text_37]").val(""); }
    });
    /*RS*/
    $("input[name=form_text_38]").inputmask("99999999999999999999",{ 
        "onincomplete": function(){ $("input[name=form_text_38]").val(""); }
    });
    /*KS*/
    $("input[name=form_text_40]").inputmask("99999999999999999999",{ 
        "onincomplete": function(){ $("input[name=form_text_40]").val(""); }
    });
    /*BIK*/
    $("input[name=form_text_41]").inputmask("999999999",{ 
        "onincomplete": function(){ $("input[name=form_text_41]").val(""); }
    });
    /*Кадастровый номер*/
    $("input[name=form_text_266]").inputmask("99:99:9{6,7}:99",{ 
        "onincomplete": function(){ $("input[name=form_text_266]").val(""); }
    });
    $("input[data-tempmask]").inputmask({
        mask: "*{1,10}°C",
        definitions: {
          '*': {
            validator: "[0-9A-Za-z!#$%&.,'*+/=?^_`{|}~\-]",
            cardinality: 1,
            casing: "lower"
          }
        },
        "onincomplete": function(){  }
    });
    

    if( $("body.lkk.form").length > 0){
        $('.datepickerM').on("click", function(){
            $("body").addClass("deleteMonthdataDatepicker");
        });
        $('.datepicker').on("click", function(){
            $("body").removeClass("deleteMonthdataDatepicker");
        });
        $("body").on("change, keyup","table .inputNumber", function(){
            var T = $(this);
            checkTableColFields();
            calcTables(T);
        });
        isHeatSourse();
        addHeatSourse();
        fieldCustomValidation();
        removeHeatSourse();
        selectTextarea();
        customSelectTextarea();
        selectForm();
        isRegionMoscow();
        showError();
        initCapabilityTable();
        checkcapabilityQueRowMOSHNOST();
        chooseTable();
        $(".mainFormMenu.requestFrom .item:eq(0)").trigger("click");
        var hash_ = location.hash;
        if (hash_ === "#mosenergo") {
            $(".mainFormMenu.companies .item:eq(1)").trigger("click");
        } else if (hash_ === "#newmoscow") {
            $(".mainFormMenu.companies .item:eq(2)").trigger("click");
        } else {
            $(".mainFormMenu.companies .item:eq(0)").trigger("click");
        }
        $(".mainFormMenu.requestOn .item:eq(0)").trigger("click");
        
        $(".selectTextarea select").trigger("change");
        $(".customSelectTextarea select").trigger("change");
        $(".chooseTable input[name='form_radio_SIMPLE_QUESTION_150']:first").prop("checked", true).trigger("click").trigger("change");
        addTable();
        removeTable();
        saveJsonTableWrapper();
        saveJsonTableCapability();
        $("body").on("change keyup keypress blur",".tableWrapper input, .tableWrapper select", function(){
            saveJsonTableWrapper();
        });
        $("body").on("change keyup keypress blur",".requestCN .capability.table input, .requestCN .capability.table select", function(){
            saveJsonTableCapability();
        });
        $("body").on("click",".switchRow, .chooseTable", function(){
            saveJsonTableWrapper();
            saveJsonTableCapability();
        });
        navigationInit();
        removeAlertOnFocus();
        checkTableColFields();
        /*=====*/
        localStorageInit();
    }
});
