
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize",  function(){
    updateCanvas("canvas-main", "header");
    updateCanvas("canvas-sticky", "headhesive");
    updateSvg()
});
window.addEventListener("orientationchange", function() {
    //alert("the orientation of the device is now " + screen.orientation.angle);
    updateSvg()
});

function init() {
    updateCanvas("canvas-main", "header");
    drawGraph()
}

function updateSvg() {
    var width = d3.select("#graph-container").node().getBoundingClientRect().width
    var height = (document.documentElement.clientWidth>456) ? "90vh" : "50vh"
    d3.select('#graph')
        .select('svg')
        .attrs({width: width, height: height, viewBox:"0 0 640 619", preserveAspectRatio:"xMidYMin meet"});
}

function updateCanvas(canvasName, divName) {
    var canvas = document.querySelector("div."+divName+" #"+canvasName);
    if (canvas) canvas.remove();
    var header =  document.getElementsByClassName(divName)[0];
    //console.log(header.clientHeight)
    var height = header.clientHeight;
    var width = header.clientWidth;
    if (height!=0){
    var pattern = Trianglify({
        height: height,
        width: width,
        variance:0,
        seed:'eyjbc',
        x_colors:'GnBu',
        cell_size: 80});
    header.insertBefore(pattern.canvas(),header.firstChild);
    header.getElementsByTagName("canvas")[0].id=canvasName}

}

$(window).on('scroll', function () {
    if (window.pageYOffset >= $('.header-links').offset().top) {
        $('.headhesive').removeClass('headhesive--unstick').addClass('headhesive--stick');
        setTimeout(function () {
            updateCanvas("canvas-sticky", "headhesive");
        }, 10);
    } else {
        $('.headhesive').css('background', 'transparent').removeClass('headhesive--stick').addClass('headhesive--unstick');
    }
/*
    var offsetForHide = $('#js-nav-hide-point').offset().top - $('.header-links').height() - 50;
    if (window.pageYOffset >= offsetForHide) {
        $('.header-links').addClass('hidden-header');
    } else {
        $('.header-links').removeClass('hidden-header');
    }*/
});

function initScroll() {
    var offset;
    var scrollWidth = document.documentElement.clientWidth;

    console.log( 'Ширина с учетом прокрутки: ' + scrollWidth );

    if (scrollWidth<456)  offset= 200;  else  offset= document.documentElement.clientHeight/2
    //offset= document.documentElement.clientHeight/2
    console.log("sections offset = "+offset);
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
    var height = (document.documentElement.clientWidth>456) ? "619px" : "50vh"
    var graph = d3.select('#graph')
        .append('svg')
        .attrs({width: width, height: height, viewBox:"0 0 640 619", preserveAspectRatio:"xMidYMin meet"});
    var svg = d3.select('#graph svg');

    d3.xml("assets/images/Scheme.svg").then(function(documentFragment,error) {
        if (error) {console.log(error); return;}
        var svgNode = documentFragment
            .getElementsByTagName("svg")[0];
        svg.node().appendChild(svgNode);
        $("g#Scheme6_2 > ").hide();
        initScroll();
    });
    //fullscreen scheme by click
    /*$('#graph').click(function(e){
        $('#graph').toggleClass('fullscreen');
    });*/
}

function changeScheme(i) {
    console.log("active section №" + (i + 1))
    $("div.graph-scroll-active").prevAll().attr("class", "show");
    $("div.graph-scroll-active").nextAll().attr("class", "hide");
    $("div.graph-scroll-active").attr("class", "graph-scroll-active show");
    var sections = d3.selectAll("div.show,div.hide");
    sections.each(function (section) {
        var group_id = d3.select(this).attr("id")
        if (d3.select(this).classed("show")) {
            if (group_id ==("triangle" || "te_highlight" || "iot_highlight" || "ng_highlight"))
                d3.select("g#" + group_id)
                    .attr("transform", "translate(0,10)")
                    //.transition()
                    //.duration(100)
                    //.ease(d3.easeQuadIn)
                    .attr("opacity", 1)
                    .style("display", null)

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

