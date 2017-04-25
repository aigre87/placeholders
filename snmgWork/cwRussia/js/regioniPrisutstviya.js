function regioniPrisutstviyaMap(){
  var $mapContainer = $("#regionyPrisutstviaMap");
  if( $mapContainer.length == 0 ){ return false; }
  function setMapHeight(){
    $mapContainer.css({height : $mapContainer.outerWidth() / 1.6867 });
  }
  setMapHeight();
  $(window).smartresize(function(){
    setMapHeight();
  });

  // Prepare demo data
  var mapData = [
    {
        "hc-key": "ru-sc",
        "value": 0
    },
    {
        "hc-key": "ru-kr",
        "value": 1
    },
    {
        "hc-key": "ru-2485",
        "value": 2
    },
    {
        "hc-key": "ru-ar",
        "value": 3
    },
    {
        "hc-key": "ru-nn",
        "value": 4
    },
    {
        "hc-key": "ru-yn",
        "value": 5
    },
    {
        "hc-key": "ru-ky",
        "value": 6
    },
    {
        "hc-key": "ru-ck",
        "value": 7
    },
    {
        "hc-key": "ru-kh",
        "value": 8
    },
    {
        "hc-key": "ru-sl",
        "value": 9
    },
    {
        "hc-key": "ru-ka",
        "value": 10
    },
    {
        "hc-key": "ru-kt",
        "value": 11
    },
    {
        "hc-key": "ru-ms",
        "value": 12
    },
    {
        "hc-key": "ru-rz",
        "value": 13
    },
    {
        "hc-key": "ru-sa",
        "value": 14
    },
    {
        "hc-key": "ru-ul",
        "value": 15
    },
    {
        "hc-key": "ru-om",
        "value": 16
    },
    {
        "hc-key": "ru-ns",
        "value": 17
    },
    {
        "hc-key": "ru-mm",
        "value": 18
    },
    {
        "hc-key": "ru-ln",
        "value": 19
    },
    {
        "hc-key": "ru-sp",
        "value": 20
    },
    {
        "hc-key": "ru-ki",
        "value": 21
    },
    {
        "hc-key": "ru-kc",
        "value": 22
    },
    {
        "hc-key": "ru-in",
        "value": 23
    },
    {
        "hc-key": "ru-kb",
        "value": 24
    },
    {
        "hc-key": "ru-no",
        "value": 25
    },
    {
        "hc-key": "ru-st",
        "value": 26
    },
    {
        "hc-key": "ru-sm",
        "value": 27
    },
    {
        "hc-key": "ru-ps",
        "value": 28
    },
    {
        "hc-key": "ru-tv",
        "value": 29
    },
    {
        "hc-key": "ru-vo",
        "value": 30
    },
    {
        "hc-key": "ru-iv",
        "value": 31
    },
    {
        "hc-key": "ru-ys",
        "value": 32
    },
    {
        "hc-key": "ru-kg",
        "value": 33
    },
    {
        "hc-key": "ru-br",
        "value": 34
    },
    {
        "hc-key": "ru-ks",
        "value": 35
    },
    {
        "hc-key": "ru-lp",
        "value": 36
    },
    {
        "hc-key": "ru-2509",
        "value": 37
    },
    {
        "hc-key": "ru-ol",
        "value": 38
    },
    {
        "hc-key": "ru-nz",
        "value": 39
    },
    {
        "hc-key": "ru-pz",
        "value": 40
    },
    {
        "hc-key": "ru-vl",
        "value": 41
    },
    {
        "hc-key": "ru-vr",
        "value": 42
    },
    {
        "hc-key": "ru-ko",
        "value": 43
    },
    {
        "hc-key": "ru-sv",
        "value": 44
    },
    {
        "hc-key": "ru-bk",
        "value": 45
    },
    {
        "hc-key": "ru-ud",
        "value": 46
    },
    {
        "hc-key": "ru-mr",
        "value": 47
    },
    {
        "hc-key": "ru-cv",
        "value": 48
    },
    {
        "hc-key": "ru-cl",
        "value": 49
    },
    {
        "hc-key": "ru-ob",
        "value": 50
    },
    {
        "hc-key": "ru-sr",
        "value": 51
    },
    {
        "hc-key": "ru-tt",
        "value": 52
    },
    {
        "hc-key": "ru-to",
        "value": 53
    },
    {
        "hc-key": "ru-ty",
        "value": 54
    },
    {
        "hc-key": "ru-ga",
        "value": 55
    },
    {
        "hc-key": "ru-kk",
        "value": 56
    },
    {
        "hc-key": "ru-cn",
        "value": 57
    },
    {
        "hc-key": "ru-kl",
        "value": 58
    },
    {
        "hc-key": "ru-da",
        "value": 59
    },
    {
        "hc-key": "ru-ro",
        "value": 60
    },
    {
        "hc-key": "ru-bl",
        "value": 61
    },
    {
        "hc-key": "ru-tu",
        "value": 62
    },
    {
        "hc-key": "ru-ir",
        "value": 63
    },
    {
        "hc-key": "ru-ct",
        "value": 64
    },
    {
        "hc-key": "ru-yv",
        "value": 65
    },
    {
        "hc-key": "ru-am",
        "value": 66
    },
    {
        "hc-key": "ru-tb",
        "value": 67
    },
    {
        "hc-key": "ru-tl",
        "value": 68
    },
    {
        "hc-key": "ru-ng",
        "value": 69
    },
    {
        "hc-key": "ru-vg",
        "value": 70
    },
    {
        "hc-key": "ru-kv",
        "value": 71
    },
    {
        "hc-key": "ru-me",
        "value": 72
    },
    {
        "hc-key": "ru-ke",
        "value": 73
    },
    {
        "hc-key": "ru-as",
        "value": 74
    },
    {
        "hc-key": "ru-pr",
        "value": 75
    },
    {
        "hc-key": "ru-mg",
        "value": 76
    },
    {
        "hc-key": "ru-bu",
        "value": 77
    },
    {
        "hc-key": "ru-kn",
        "value": 78
    },
    {
        "hc-key": "ru-kd",
        "value": 79
    },
    {
        "hc-key": "ru-ku",
        "value": 80
    },
    {
        "hc-key": "ru-al",
        "value": 81
    },
    {
        "hc-key": "ru-km",
        "value": 82
    },
    {
        "hc-key": "ru-pe",
        "value": 83
    },
    {
        "hc-key": "ru-ad",
        "value": 84
    }
  ];
  var dataRegions = {
    DV_FO : [
        "ru-am", "ry-ka", "ru-2485", "ru-mg", "ru-kh", "ru-sl", "ru-pr", "ru-yv", "ru-ka", "ru-ck"
    ],
    SIB_FO : [
        "ru-ct", "ru-bu", "ru-ir", "ru-ky", "ru-tu", "ru-ga", "ru-kk", "ru-ke", "ru-al", "ru-ns", "ru-om", "ru-to"
    ],
    URAL_FO : [
        "ru-ty", "ru-ku", "ru-cl", "ru-sv", "ru-km", "ru-yn"
    ],
    PRIVOLJ_FO : [
        "ru-ob", "ru-bk", "ru-pe", "ru-kv", "ru-ud", "ru-tt", "ru-me", "ru-cv", "ru-ul", "ru-sr", "ru-pz", "ru-mr", "ru-nz", "ru-sa"
    ],
    SEVKAV_FO : [
        "ru-da", "ru-cn", "ru-in", "ru-no", "ru-kb", "ru-kc", "ru-st"
    ],
    YJNIY_FO : [
        "ru-kr", "ru-kd", "ru-ad", "ru-ro", "ru-vg", "ru-as", "ru-kl"
    ],
    SEVZAP_FO : [
        "ru-ar", "ru-nn", "ru-ko", "ru-vo", "ru-mm", "ru-ki", "ru-ln", "ru-ng", "ru-ps", "ru-kn"
    ],
    ZENTR_FO : [
        "ru-vr", "ru-bl", "ru-ks", "ru-br", "ru-sm", "ru-tv", "ru-ys", "ru-kt", "ru-iv", "ru-vl", "ru-rz", "ru-tb", "ru-lp", "ru-ol", "ru-kg", "ru-2509", "ru-vl", "ru-tl", "ru-ms"
    ]
  };


    var series = [
        /*{
            type: "map",
            name: 'Basemap',
            enableMouseTracking: false,
            data: mapData,
            showInLegend: false,
        },*/
    ];
    $("#mapLinks .districts .item").each(function(){
        var $item = $(this),
            id = $item.attr("data-id"),
            name = $item.attr("data-name"),
            href = $item.attr("data-href"),
            count = $item.attr("data-count");
        series.push(
            { 
                "id": id,
                "name": name,
                "href": href,
                "projCount": count,
                "data": $.map(dataRegions[id], function (hckey) {
                    return {
                        'hc-key': hckey
                    };
                })
            }
        )
    });

    var dataCities = [];
    $("#mapLinks .cities .item").each(function(){
        var $item = $(this),
            id = $item.attr("data-id"),
            name = $item.attr("data-name"),
            href = $item.attr("data-href"),
            latlng = $item.attr("data-latlng"),
            lat = latlng.split(',')[0],
            lon = latlng.split(',')[1];

        dataCities.push(
            { 
                "id": id,
                "name" : name,
                "href" : href,
                "lat" : lat,
                "lon" : lon
            }
        )
    });

    series.push(
        {
            // ГОРОДА
            data : dataCities,
            cursor: "pointer",
            type: 'mappoint',
            name: 'Cities',
            marker: {
                enabled: true,
                fillColor: "#003865",
                //lineColor: "#000000",
                lineWidth: 0,
                radius: 7.5,
                states: {
                    hover: {
                        fillColor: "#e4002b"
                    }
                }
            },
            dataLabels: {
              enabled: true,
              x: 5,
              align: "left",
              //format: '{point.name}',
              verticalAlign: 'middle',
              // useHTML: true,
              // formatter: function () {
              //     return "<div class='cityName'>"+this.point.name+"</div>";
              // },
              style: {
                  color: "#003865",
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontFamily: 'Arial',
                  fontWeight: 'normal'
              }
            },
            point: {
              events: {
                  mouseOver: function (e) {
                      this.dataLabel.css({
                          color: "#e4002b"
                      });
                  },
                  mouseOut: function (e) {
                      this.dataLabel.css({
                          color: '#003865'
                      });
                  },
                  click: function(e){
                    var thisURL = this.href; // onclick get the x index and use it to find the URL
                    if (thisURL && thisURL.trim() != ""){
                      window.location.href = thisURL;
                    }
                  }
              }
            },
        }
    )


  // Initiate the chart
  $mapContainer.highcharts('Map', {
    chart:{
        backgroundColor: "#f6f6f6"
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    credits: {
      enabled: false
    },
    mapNavigation: {
      enabled: false,
      enableMouseWheelZoom: false,
      enableButtons: false,
      buttonOptions: {
        enabled: false,
        verticalAlign: 'bottom'
      }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        useHTML: true,
        backgroundColor: "rgba(51, 51, 51, 0.5)",
        borderWidth: 0,
        borderRadius: 6,
        shadow: false,
        formatter: function () {
          if( this.series.type == 'mappoint' ){
            return false;
          }else{
            return "<div class='serieTolltip'><div class='name'>"+this.series.name+"</div><div class='projCount'>"+this.series.options.projCount+" проектов</div></div>";
          }
        },
        hideDelay: 0
    },
    plotOptions: {
        map: {
            //allAreas: false,
            //joinBy: 'hc-key',
            mapData: Highcharts.maps['countries/ru/custom/ru-all-disputed']
        },
        series: {
            color: "#ffffff",
            allAreas: false,
            //mapData: Highcharts.maps['countries/ru/custom/ru-all-disputed'],
            joinBy: 'hc-key',
            showInLegend: true,
            cursor: "pointer",
            borderColor: "#A6A7A9",
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return "<div class='serieTolltip'><div class='name'>"+this.series.name+"</div><div class='projCount'>"+this.series.options.projCount+" проектов</div></div>";
                },
            },
            point: {
                events: {
                    mouseOver: function(){
                      var ser = this.series;
                      var data = ser.data;
                        $.each(data, function(){
                            this.setState("hover")
                        });
                    },
                    mouseOut: function(){
                      var ser = this.series;
                      var data = ser.data;
                        $.each(data, function(){
                            this.setState()
                        });      
                    },
                    click: function(e){
                      var ser = this.series;
                      var serURL = ser.options.href;
                      if (serURL && serURL.trim() != ""){
                        window.location.href = serURL;
                      }
                    }
                },
                // tooltip: { 
                //   enabled: false
                // }
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}'
            },
            states: {
              normal: {
                animation: false
              },
              hover: {
                color: '#e4002b',
                borderColor: "#ffffff",
              }
            }
        }
    },
    series : series
  });
  var chart = $mapContainer.highcharts();

  $("#mapLinks .cities .item a").on("mouseover", function(){
    var $this = $(this),
        id = $this.closest(".item").attr("data-id"),
        activeSerie = chart.get(id);
        
    activeSerie.setState("hover");
  });
  $("#mapLinks .cities .item a").on("mouseout", function(){
    var $this = $(this),
        id = $this.closest(".item").attr("data-id"),
        activeSerie = chart.get(id);

    activeSerie.setState();
  });

  $("#mapLinks .districts .item a").on("mouseover", function(){
    var $this = $(this),
        id = $this.closest(".item").attr("data-id"),
        ser = chart.get(id),
        data = ser.data;

    $.each(data, function(){
        this.setState("hover");
    });
  });
  $("#mapLinks .districts .item a").on("mouseout", function(){
    var $this = $(this),
        id = $this.closest(".item").attr("data-id"),
        ser = chart.get(id),
        data = ser.data;

    $.each(data, function(){
        this.setState("");
    });
  });
}

function regionyPrisutstviaBottomBlock(){
    if( $("#regionyPrisutstvia-bottomBlock").length == 0 ){ return false; }
    var $b = $("#regionyPrisutstvia-bottomBlock .bl"),
        $cor = $("#regionyPrisutstvia-bottomBlock .corner");
    function setSize(){
        var h = $b.outerHeight();
        $cor.css({
            "border-top-width": h,
        });
    }
    setSize();
    $(window).smartresize(function(){
        setSize();
    });
}