var global_propListController;
var global_propListAllScenesLength;
var global_propListAllScenes = [];
var global_propListMap;

function propertyListInit(option){
	if( $("#objectsListPage").length == 0 ){ return false; }
	var $page = $("#objectsListPage"),
			$fixedmainB = $(".fixedMain"),
			$win = $(window),
			$fixedBlocks = $("#objectsListPage .top, .objListTab .filtersBlock, .mainBlock .yaMapContainerOW, .objListTab .findBlock"),
			$tabConts = $(".tabContent"),
			$contentBlock = $(".contentBlock"),
			$tabs = $(".top .tab"),
			SM_dur;

	function chechkActiveItems(){

	}

	function updateHeights(){
		var listH = $(".mainBlock .lc").outerHeight(),
				maxH = $(window).outerHeight() - $(".objListTab .filtersBlock").outerHeight() - $("#objectsListPage .top").outerHeight();
		if( listH < maxH ){
			$fixedmainB.css({ height : listH });
		}else{
			$fixedmainB.css({ height : maxH });
		}
		$contentBlock.css({height : $tabConts.filter(".active").outerHeight() });
	}

	/*init scene*/
	function initScenes(){
		SM_dur = $(".mainBlock").outerHeight() + $(".objListTab .filtersBlock").outerHeight() + $("#objectsListPage .top").outerHeight() - $win.outerHeight();
		global_propListController = new ScrollMagic.Controller();
	  if( SM_dur <= 0 ){
	      global_propListController.enabled(false);
	  }else{
			global_propListController.enabled(true);
			global_propListController.update(true);
		}

		$fixedBlocks.each(function(){
		    var thisScene = new ScrollMagic.Scene({triggerElement: $page, triggerHook: 'onLeave', duration: SM_dur})
		    .setPin( this , {pushFollowers: false})
		    .addTo( global_propListController )
		    global_propListAllScenes.push(thisScene);
		});
		global_propListAllScenesLength = global_propListAllScenes.length;
	}

	/*init scene end*/

	function updateDuration(){
    SM_dur = $(".mainBlock").outerHeight() + $(".objListTab .filtersBlock").outerHeight() + $("#objectsListPage .top").outerHeight() - $win.outerHeight();
    if( SM_dur <= 0 ){
      global_propListController.enabled(false);
    }else{
    	global_propListController.enabled(true);
    	global_propListController.update(true);
    }
    for(var i=0; i < global_propListAllScenesLength; i++){
    	global_propListAllScenes[i].duration(SM_dur);
    	global_propListAllScenes[i].refresh();
    	global_propListAllScenes[i].update(true);
    }
    if( SM_dur <= 0 ){
      global_propListController.enabled(false);
    }else{
    	global_propListController.enabled(true);
    	global_propListController.update(true);
    }

    global_propListMap.container.fitToViewport();
	}

	function destroy(){
    for(var i=0; i < global_propListAllScenesLength; i++){
    	global_propListAllScenes[i].destroy(true);
    }
    global_propListController.destroy(true);
	}

	function tabs(){
		$tabs.on("click", function(){
			var $this = $(this),
					thisData = $this.attr("data-cont");
			if( $this.hasClass("active") ){ return false; }
			$tabConts.add($tabs).removeClass("active");
			$tabConts.filter("[data-cont='"+thisData+"']").add($this).addClass("active");
			destroyRc();
			destroy();
			initScenes();
			updateHeights();
			updateDuration();
			if( !$("#rightColumn .slideRC").hasClass("active") ){
					initRcScrollMagic();
					updateRCDur();
			}
			if( thisData == "descTab" ){
				TweenLite.to(window, 0.5, { scrollTo: $("#objectsListPage .top").offset().top });
			}
		});
	}

	function showExtraFilters(){
		var initText = $(".showExtraFilters").text();
		$(".showExtraFilters span").on("click", function(){
			var $this = $(".showExtraFilters");
			if( !$this.hasClass("active") ){
				$this.find("span").text( $this.attr("data-actText") );
				$(".extraFilter, .selectric-extraFilter").add($this).addClass("active");
			}else{
				$this.find("span").text( initText );
				$(".extraFilter, .selectric-extraFilter").add($this).removeClass("active");
			}
			updateHeights();
			updateDuration();
		});
	}
	function nouiSl(){

		var $block = $(".nouiBlock");
			$block.each(function(){
			var $bl = $(this),
			  	connectSlider = $bl.find('.sl-ui')[0],
					$minValInput = $bl.find(".nouiStart"),
					$maxValInput = $bl.find(".nouiEnd"),
					minVal = parseInt( $minValInput.attr("data-min") ),
					maxVal = parseInt( $maxValInput.attr("data-max") ),
			  	startVal = parseInt( $minValInput.val() ),
			  	endVal = parseInt( $maxValInput.val() );

	    noUiSlider.create(connectSlider, {
	        start: [ startVal, endVal ],
	        step: 1,
	        connect: true,
	        tooltips: false,
	        format: {
	            from: function(value) {
	                return parseInt(value);
	            },
	            to: function(value) {
	                return parseInt(value);
	            }
	        },
	        step: 1,
	        range: {
	            'min': minVal,
	            'max': maxVal
	        }
	    });

			connectSlider.noUiSlider.on('update', function( values, handle ) { 
				var rangeValues = values;
				$minValInput[0].value = rangeValues[0];
				$maxValInput[0].value = rangeValues[1];
			});

			$minValInput.on('change', function(){
				connectSlider.noUiSlider.set([this.value, null]);
			});
				
			$maxValInput.on('change', function(){
				connectSlider.noUiSlider.set([null, this.value]);
			});
		});
	}
	switch (option){
		case 'updateHeights':
			return updateHeights();
			break;

		case 'updateDuration':
			return updateDuration();
			break;

		case "reInit":
			return initScenes();
			break;

		case "destroy":
			return destroy();
			break;

		default:
		updateHeights();
		nouiSl();
		ymaps.ready(function(){
			plYaMap();
			initScenes();
			updateHeights();
			tabs();
			showExtraFilters();
			updateRCDur();
		});
		

	  $(window).smartresize(function(){
			updateHeights();
			updateDuration();
	  }); 
	}
}

function plYaMap(){
  var $page = $("#yaMapContainer");
  if( $page.length == 0 ){return false}
  function init(){
      global_propListMap = new ymaps.Map('yaMapContainer', {
          center: [55.749313, 37.620393],
          zoom: 11,
          controls: []
      });
      /* Custom zoom control buttons*/
      // global_propListMap.behaviors.disable('scrollZoom');
      // Создадим пользовательский макет ползунка масштаба.
      var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>\
              <div id='zoom-in' class='btn'><i class='icon-plus'></i>\
              </div><div id='zoom-out' class='btn'><i class='icon-minus'></i></div>\
          </div>", {

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
              // $('#yaPanorama').on('click', function(){
              //     $(".contactsMapPanorama-wrapper").css({"z-index": 1});
              //     $("#contactsMap").css({"z-index": 0});
              // });
          },

          clear: function () {
              // Снимаем обработчики кликов.
              $('#zoom-in').unbind('click', this.zoomInCallback);
              $('#zoom-out').unbind('click', this.zoomOutCallback);

              // Вызываем родительский метод clear.
              ZoomLayout.superclass.clear.call(this);
          },

          zoomIn: function () {
              var global_propListMap = this.getData().control.getMap();
              // Генерируем событие, в ответ на которое
              // элемент управления изменит коэффициент масштабирования карты.
              this.events.fire('zoomchange', {
                  oldZoom: global_propListMap.getZoom(),
                  newZoom: global_propListMap.getZoom() + 1
              });
              if(  global_propListMap.getZoom() < 15  ){

              }
          },

          zoomOut: function () {
              var global_propListMap = this.getData().control.getMap();
              this.events.fire('zoomchange', {
                  oldZoom: global_propListMap.getZoom(),
                  newZoom: global_propListMap.getZoom() - 1
              });
          }
      }),
      zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });

      /*ДОБАВЛЕНИЕ ТОЧЕК*/
      /*коллекция*/
	    var myGeoObjects = new ymaps.GeoObjectCollection({}, {

			});
			var clusterer = new ymaps.Clusterer({
				hasBalloon:false,
				hasHint:false,
				preset: 'islands#darkBlueClusterIcons'
			});
			/*================*/
			/*СПИСОК С ТОЧКАМИ */
			var itemsController = new ScrollMagic.Controller();
			var $items = $(".objListTab .list .item");
			var scmDur = $(window).outerHeight() - $(".objListTab .filtersBlock").outerHeight() + $("#objectsListPage .top").outerHeight();
			var activeId;
			var activeMarker;

      $items.each(function(i){
      	var $item = $(this),
      			itemH = $item.outerHeight(),
      			thisIndex = i,
      			objPoint = {},
      			latlng = $item.attr("data-coord");

        objPoint.lat = latlng.split(',')[0].trim();
       	objPoint.lon = latlng.split(',')[1].trim();
       	objPoint.name = $item.attr("data-name");

    		var mapPoint = new ymaps.Placemark([objPoint.lat, objPoint.lon], {
        		iconCaption: objPoint.name,
            //hintContent: objPoint.name
        }, {
		        preset: 'islands#blueCircleDotIcon', 
			      zIndex : 0,
            iconCaptionMaxWidth : 200
      	});

      	mapPoint.dataId = thisIndex;
      	mapPoint.isOnView = false;
      	mapPoint.isActive = false;

	      clusterer.add(mapPoint);

	      $item.on("mouseenter", function(){
		      	if( $item.hasClass("active") ){

		      	}else{
	      			if( typeof activeId != 'undefined' ){
        				activeMarker.isActive = false;
        				$items.eq(activeId).removeClass("active");
        				hoverShadowBlock("leave", $items.eq(activeId));
			      		if( $items.eq(activeId).hasClass("onView") ){
					        activeMarker.options.set('preset', 'islands#blueCircleDotIconWithCaption');
					        activeMarker.options.set('zIndex', 1);
			      		}else{
									activeMarker.options.set('preset', 'islands#blueCircleDotIcon');
					        activeMarker.options.set('zIndex', 0);
			      		}
	      			}
		      		hoverShadowBlock("enter", $item);
	      			var mapPointState = clusterer.getObjectState(mapPoint);
	      			if( mapPointState.cluster ){
	      				mapPointState.cluster.options.set('preset', 'islands#redClusterIcons');
	      			}

			        mapPoint.options.set('preset', 'islands#redCircleDotIconWithCaption');
			        mapPoint.options.set('zIndex', 2);
		      	}
	      });
	      $item.on("mouseleave", function(){
	      		hoverShadowBlock("leave", $item);
	      		$item.removeClass("active");
      			var mapPointState = clusterer.getObjectState(mapPoint);
      			if( mapPointState.cluster ){
      				mapPointState.cluster.options.set('preset', 'islands#darkBlueClusterIcons');
      			}
	      		if( $item.hasClass("onView") ){
			        mapPoint.options.set('preset', 'islands#blueCircleDotIconWithCaption');
			        mapPoint.options.set('zIndex', 1);
	      		}else{
	      			mapPoint.options.set('preset', 'islands#blueCircleDotIcon');
			        mapPoint.options.set('zIndex', 0);
	      		}
	      });

  			var scene = new ScrollMagic.Scene({triggerElement: $item, offset: 0, triggerHook: 'onEnter', duration: scmDur-itemH })
				//.addIndicators()
				.addTo(itemsController)
				.on("enter", function (e) {
					$item.addClass("onView");
					mapPoint.isOnView = true;
					if( $item.hasClass("active") ){
						
					}else{
		        mapPoint.options.set('preset', 'islands#blueCircleDotIconWithCaption');
		        mapPoint.options.set('zIndex', 1);
					}
				})
				.on("leave", function (e) {
					$item.removeClass("onView");
					mapPoint.isOnView = false;
					if( $item.hasClass("active") ){

					}else{
		        mapPoint.options.set('preset', 'islands#blueCircleDotIcon');
		        mapPoint.options.set('zIndex', 0);						
					}

				});
				
	      $(window).smartresize(function(){
	      	newDur = $(window).outerHeight() - $(".objListTab .filtersBlock").outerHeight() + $("#objectsListPage .top").outerHeight() - itemH;
          scene.duration(newDur);
    		});
      });/*end each*/

   		 clusterer.events.add(['mouseenter', 'mouseleave', 'click'], function (e) {
            var target = e.get('target'),
                type = e.get('type');
            if (typeof target.getGeoObjects != 'undefined') {
                // Событие произошло на кластере.
                if (type == 'mouseenter') {
                    target.options.set('preset', 'islands#redClusterIcons');
                } else if( type == 'mouseleave' ) {
                    target.options.set('preset', 'islands#darkBlueClusterIcons');
                }
            } else {
                // Событие произошло на геообъекте.
				    		var id = target.dataId;
				    		var $item = $items.eq(id);
                if (type == 'mouseenter') {
                		if( typeof activeId != 'undefined' && id != activeId ){
              				activeMarker.isActive = false;
              				$items.eq(activeId).removeClass("active");
              				hoverShadowBlock("leave", $items.eq(activeId))
						      		if( $items.eq(activeId).hasClass("onView") ){
								        activeMarker.options.set('preset', 'islands#blueCircleDotIconWithCaption');
								        activeMarker.options.set('zIndex', 1);
						      		}else{
												activeMarker.options.set('preset', 'islands#blueCircleDotIcon');
								        activeMarker.options.set('zIndex', 0);
						      		}
              				activeId = undefined;
              				$item.addClass("hover");
											hoverShadowBlock("enter", $item)
							        target.options.set('preset', 'islands#redCircleDotIconWithCaption');
						        	target.options.set('zIndex', 2);
                		}else if( typeof activeId != 'undefined' && id == activeId ){

                		}else{
											$item.addClass("hover");
											hoverShadowBlock("enter", $item)
							        target.options.set('preset', 'islands#redCircleDotIconWithCaption');
						        	target.options.set('zIndex', 2);
                		}
                } else if( type == 'mouseleave' ) {
                		$item.removeClass("hover");
                		if( target.isActive ){
											if( $item.hasClass("onView") ){
								        target.options.set('preset', 'islands#redCircleDotIconWithCaption');
								        target.options.set('zIndex', 1);
						      		}else{
												target.options.set('preset', 'islands#redCircleDotIcon');
								        target.options.set('zIndex', 0);
						      		}
                		}else{
                			hoverShadowBlock("leave", $item)
											//FireEvent( $item[0], "mouseout" );
						      		if( $item.hasClass("onView") ){
								        target.options.set('preset', 'islands#blueCircleDotIconWithCaption');
								        target.options.set('zIndex', 1);
						      		}else{
												target.options.set('preset', 'islands#blueCircleDotIcon');
								        target.options.set('zIndex', 0);
						      		}
                		}
                } else if( type == 'click' ){
      							$item.addClass("active");
										target.isActive = true;
										activeId = id;
										activeMarker = clusterer.getGeoObjects()[activeId];

						    		var oyVal = $(".objListTab .filtersBlock").outerHeight() + $("#objectsListPage .top").outerHeight() + $(".objListTab .findBlock").outerHeight(),
						    		 	  yVal  = $items.eq(id).offset().top - oyVal;
						    		 		maxYval = $("#objectsListPage").offset().top + $("#objectsListPage").outerHeight() - $(window).height();
						    		 		yVal = maxYval < yVal ? maxYval : yVal;
						    		TweenLite.to(window, 1, { scrollTo:yVal });
                }
            }
        });

	    //clusterer.add(myGeoObjects);
	    global_propListMap.geoObjects.add(clusterer);
      //global_propListMap.geoObjects.add(myGeoObjects);

      /*Выставляем масштаб и отступы инита*/
      global_propListMap.setBounds(
      	clusterer.getBounds(),
      	{
      		checkZoomRange:true,
      		zoomMargin: 10
  			}
			).then(function(){
         	//if(map.getZoom() > 10) map.setZoom(10);
   		});
   		/*СПИСОК С ТОЧКАМИ ВАРИАНТ БЕЗ КЛАСТЕРОВ*/

      /* add custom zoom buttons*/
      global_propListMap.controls.add(zoomControl, {
          float: 'none',
          position: {
              right: 16,
              bottom: 44
          }
      });
      /* add custom zoom buttons END*/

      $(window).smartresize(function(){
          global_propListMap.container.fitToViewport();
      });
  }/*end init*/
  init();
}