
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", updateCanvas);

function init() {
    updateCanvas();
    drawGraph()
}

function updateCanvas() {
    var canvas = document.getElementsByTagName("canvas")[0];
    if (canvas) canvas.remove();
    var header = document.getElementsByClassName("header")[0];
    var height = header.clientHeight;
    var width = header.clientWidth;
    var pattern = Trianglify({
        height: height,
        width: width,
        variance:0,
        seed:'eyjbc',
        x_colors:'GnBu',
        cell_size: 80});
    header.insertBefore(pattern.canvas(),header.firstChild);
}

$(window).on('scroll', function () {
    if (window.pageYOffset >= $('.header-links').offset().top) {
        $('.headhesive').removeClass('headhesive--unstick').addClass('headhesive--stick');
        setTimeout(function () {
            $('.headhesive').css('background', '#020D45');
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
    if (window.clientWidth>667)  offset= 300;  else  offset= 200
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
        .attrs({width: width, height: height, viewBox:"0 0 620 562", preserveAspectRatio:"xMidYMin slice"});
    var svg = d3.select('#graph svg');

    d3.xml("assets/images/Scheme.svg").then(function(documentFragment,error) {
        if (error) {console.log(error); return;}
        var svgNode = documentFragment
            .getElementsByTagName("svg")[0];
        svg.node().appendChild(svgNode);
        $("g#Scheme > ").hide();
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

