

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
    d3.graphScroll()
        .sections(d3.selectAll('#sections > div'))
        .on('active', function(i){
            console.log(i)
            var ident=d3.select("div.graph-scroll-active").attr("id");
            console.log(ident)
            //$("g#Scheme").show();
            $("g#"+ident).show("slow", function () {
                console.log(ident)
            });
            //changeScheme(ident)
        })
        .graph(d3.select('#graph'))
        .container(d3.select('#scroll-container'))
        .offset(300)
}

function drawGraph() {
    var width = 620,
        height = 562,
        r = 40

    var graph = d3.select('#graph')
        .append('svg')
        .attrs({width: width, height: height});
    var svg = d3.select('#graph svg');



    d3.xml("assets/images/Scheme.svg").then(function(documentFragment,error) {
        if (error) {console.log(error); return;}

        var svgNode = documentFragment
            .getElementsByTagName("svg")[0];
        //use plain Javascript to extract the node

        svg.node().appendChild(svgNode);
        //d3's selection.node() returns the DOM node, so we
        //can use plain Javascript to append content

        $("g#Scheme > ").hide("slow",function () {
            console.log("hide")
        });
        initScroll();
    });


}

function changeScheme(ident) {
    $("g#Scheme").show();
    var main_chart_svg = d3.select('#graph svg')
    var innerSVG = main_chart_svg.select("svg");
    var active_group=innerSVG.select("g#"+ident)
     $("g#"+ident).show("slow", function () {
          console.log(ident)
     });

}

