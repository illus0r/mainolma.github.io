
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize",  function(){
    updateCanvas("canvas-main", "header");
    updateCanvas("canvas-sticky", "headhesive");
});

function init() {
    updateCanvas("canvas-main", "header");
    drawGraph()
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
    var scrollHeight = Math.max(document.documentElement.clientHeight
    );

    console.log( 'Высота с учетом прокрутки: ' + scrollHeight );

    if (scrollHeight<667)  offset= 200;  else  offset= 600
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
    var width = d3.select("#graph-container").node().getBoundingClientRect().width,
        height = "40vh"
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
}

function changeScheme(i) {
    console.log("active section №"+(i+1))
    var ident=d3.select("div.graph-scroll-active").attr("id");
    $("g#"+ident).show("slow", function () {
        console.log("show group #"+ident)
    });
}

