/*init*/

document.addEventListener("DOMContentLoaded", init);


/*on resize*/

window.addEventListener("resize",  function(){
    updateCanvas("canvas-main", "header");
    updateCanvas("canvas-sticky", "headhesive");
    updateSvg()
    updateFooter()
});


/*on orientation change*/

window.addEventListener("orientationchange", function() {
    updateSvg() //resize scheme
});


/* on scroll */

window.onscroll = function() {
    headhesive()
}

function init() {
    updateCanvas("canvas-main", "header"); //create trianglify canvas
    drawGraph() // find place and draw scheme from Scheme.svg
    updateFooter() //place social squares on the background grid
}


/* resize the scheme for current width */
function updateSvg() {
    var width = d3.select("#graph-container").node().getBoundingClientRect().width
    var hh = document.documentElement.clientHeight-50
    hh =  hh > 619 ? 619 : hh
    var height = (document.documentElement.clientWidth>456) ? hh : "50vh"
    d3.select('#graph')
        .select('svg')
        .attrs({width: width, height: height, preserveAspectRatio:"xMidYMin meet"});
}


/* draw trianglify background for specific div*/

function updateCanvas(canvasName, divName) {
    //remove canvas if exist
    var canvas = document.querySelector("div."+divName+" #"+canvasName);
    if (canvas) canvas.remove();

    //get div
    var header =  document.getElementsByClassName(divName)[0];
    var height = header.offsetHeight;
    var width = header.offsetWidth ;

    var height_of_cell = document.documentElement.clientHeight/8

    //colors for pattern
    var arr= ["#A5F2DF","#7BCCC4","#2B8CBE","#084081"]
    var arr3=["#A5F2DF","#7BCCC4","#2B8CBE","#084081"]

    if (divName=="headhesive") arr3=["#2B8CBE","#084081"]

    if (height != 0) {
        var pattern = Trianglify({
            height: height+1,
            width: width,
            variance: 0,
            x_colors: arr.reverse(),
            y_colors: arr3,
            cell_size: height_of_cell
        });
        header.insertBefore(pattern.canvas(), header.firstChild);
        header.getElementsByTagName("canvas")[0].id = canvasName
    }
}


/* sticky header */

function headhesive() {
    if (window.pageYOffset >= $('.header-links').offset().top) {
        if ($('.headhesive').hasClass("headhesive--unstick")){
            $('.headhesive')
                .removeClass('headhesive--unstick')
                .addClass('headhesive--stick');
            updateCanvas("canvas-sticky", "headhesive");
        }
    } else {
        $('.headhesive').css('background', 'transparent')
            .removeClass('headhesive--stick')
            .addClass('headhesive--unstick');
    }
    
    /*stickyfill*/
    var elements = document.querySelectorAll('#graph');
    Stickyfill.add(elements);

    //hide it near footer

    var offsetForHide = $('#js-nav-hide-point').offset().top - $('.header-links').height() ;

    if (window.pageYOffset >= offsetForHide) {
        $('.header-links').addClass('hidden-header');
    } else {
        $('.header-links').removeClass('hidden-header');
    }
}


/* graph-scroll init */

function initScroll() {
    var offset;
    var scrollWidth = document.documentElement.clientWidth;

    if (scrollWidth<456)  offset= 200;  else  offset= document.documentElement.clientHeight/2

    d3.graphScroll()
        .sections(d3.selectAll('#sections > div'))
        .on('active', function(i){
            changeScheme(i)
        })
        .graph(d3.select('#graph'))
        .container(d3.select('#scroll-container'))
        .offset(offset)
}

function drawGraph() {
    var width = d3.select("#graph-container").node().getBoundingClientRect().width
    var hh=document.documentElement.clientHeight-50
    hh =  hh>619 ? 619 : hh
    var height = (document.documentElement.clientWidth>456) ? hh : "50vh"
    var graph = d3.select('#graph')
        .append('svg')
        .attrs({width: width, height: height, viewBox:"130 200 390 400", preserveAspectRatio:"xMidYMin meet"});
    var svg = d3.select('#graph svg');

    //load svg content from external svg

    var local=document.documentElement.lang
    var file = (local=='ru') ? "assets/images/scheme-ru.svg" : "assets/images/scheme-en.svg"

    d3.xml(file).then(function(documentFragment,error) {
        if (error) {console.log(error); return;}
        var svgNode = documentFragment
            .getElementsByTagName("svg")[0];
        svg.node().appendChild(svgNode);
        $("g#Scheme6_2 > ").hide();
        initScroll();
    });

    //TODO: fullscreen scheme by click
    /*$('#graph').click(function(e){
        $('#graph').toggleClass('fullscreen');
    });*/
}


/*change scheme on scroll*/

function changeScheme(i) {
    //console.log("active section №" + (i + 1))
    $("div.graph-scroll-active").prevAll().attr("class", "show");
    $("div.graph-scroll-active").nextAll().attr("class", "hide");
    $("div.graph-scroll-active").attr("class", "graph-scroll-active show");
    var sections = d3.selectAll("div.show,div.hide");
    sections.each(function (section) {
        var group_id = d3.select(this).attr("id")
        var group_viewbox = d3.select(this).attr("data-viewbox")
        !group_viewbox ? group_viewbox="0 0 644 619" : true

        if (d3.select(this).classed("show")) {
            d3.select("svg")
                .transition()
                .duration(500)
                .attr("viewBox",group_viewbox)

            if (group_id ==("triangle" || "te_highlight" || "iot_highlight" || "ng_highlight")) {
                d3.select("g#" + group_id)
                    .attr("transform", "translate(0,10)")
                    .attr("opacity", 1)
                    .style("display", null)
            }
            else {

                d3.select("g#" + group_id)
                    .transition()
                    .duration(100)
                    .ease(d3.easeQuadIn)
                    .attr("opacity", 1)
                    .style("display", null)
                    .attr("transform", "translate(0,10)")
            }
        }

        if (d3.select(this).classed("hide"))
            d3.select("g#" + group_id)
                .transition()
                .duration(100)
                .ease(d3.easeQuadIn)
                .attr("opacity", 0)
                .transition()
                .attr("transform", "translate(0,-10)")
                .style("display", "none")

    })
}

function updateFooter() {
    var width=document.documentElement.clientWidth,
    cels=Math.floor(width/64),
    halfCels=Math.floor(cels/2),
    left_medium=halfCels*64,
    left_telegram=left_medium+64*2
    $('.footer-rect-medium').css("left",left_medium)
    $('.footer-rect-telegram').css("left",left_telegram)
}

