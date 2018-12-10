
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
    //var width = d3.select("#graph-container").node().getBoundingClientRect().width
    //var height = (document.documentElement.clientWidth>456) ? "90vh" : "50vh"
    var width = d3.select("#graph-container").node().getBoundingClientRect().width
    var hh=document.documentElement.clientHeight-50
    hh =  hh>619 ? 619 : hh
    var height = (document.documentElement.clientWidth>456) ? hh : "50vh"
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
    var height_of_cell=document.documentElement.clientHeight/8
    var arr=["#f7fcf0","#f6fcef","#f6fbef","#f5fbee","#f4fbed","#f3fbed","#f3faec","#f2faeb","#f1faeb","#f1f9ea","#f0f9e9","#eff9e9","#eef9e8","#eef8e7","#edf8e7","#ecf8e6","#ecf8e5","#ebf7e5","#eaf7e4","#e9f7e3","#e9f6e3","#e8f6e2","#e7f6e1","#e7f6e1","#e6f5e0","#e5f5df","#e5f5df","#e4f4de","#e3f4dd","#e2f4dd","#e2f4dc","#e1f3db","#e0f3db","#e0f3da","#dff3d9","#def2d9","#def2d8","#ddf2d7","#dcf2d7","#dcf1d6","#dbf1d5","#daf1d5","#daf0d4","#d9f0d3","#d8f0d3","#d8f0d2","#d7efd1","#d6efd1","#d6efd0","#d5efcf","#d4eecf","#d3eece","#d3eecd","#d2edcd","#d1edcc","#d0edcb","#d0edcb","#cfecca","#ceecca","#cdecc9","#cdebc8","#ccebc8","#cbebc7","#caeac6","#c9eac6","#c8eac5","#c7e9c5","#c6e9c4","#c5e8c4","#c5e8c3","#c4e8c2","#c3e7c2","#c2e7c1","#c1e7c1","#c0e6c0","#bfe6c0","#bde5bf","#bce5bf","#bbe5be","#bae4be","#b9e4be","#b8e3bd","#b7e3bd","#b6e2bd","#b5e2bc","#b3e1bc","#b2e1bc","#b1e1bb","#b0e0bb","#afe0bb","#aedfbb","#acdfbb","#abdeba","#aadeba","#a9ddba","#a7ddba","#a6dcba","#a5dcba","#a3dbba","#a2dbba","#a1daba","#a0daba","#9ed9bb","#9dd9bb","#9cd8bb","#9ad8bb","#99d7bb","#98d7bc","#96d6bc","#95d6bc","#93d5bd","#92d5bd","#91d4bd","#8fd3be","#8ed3be","#8dd2be","#8bd2bf","#8ad1bf","#88d1c0","#87d0c0","#86cfc1","#84cfc1","#83cec1","#81cec2","#80cdc2","#7fccc3","#7dccc3","#7ccbc4","#7acac4","#79cac5","#77c9c5","#76c8c6","#75c8c6","#73c7c7","#72c6c7","#70c5c7","#6fc5c8","#6ec4c8","#6cc3c9","#6bc3c9","#69c2ca","#68c1ca","#67c0ca","#65bfcb","#64bfcb","#63becb","#61bdcc","#60bccc","#5fbbcc","#5dbacc","#5cb9cc","#5ab9cd","#59b8cd","#58b7cd","#57b6cd","#55b5cd","#54b4cd","#53b3cd","#51b2cd","#50b1cd","#4fb0cd","#4eafcd","#4caecd","#4badcc","#4aaccc","#49abcc","#48aacc","#46a9cb","#45a8cb","#44a6cb","#43a5ca","#42a4ca","#41a3c9","#3fa2c9","#3ea1c8","#3da0c8","#3c9ec7","#3b9dc7","#3a9cc6","#399bc6","#379ac5","#3699c5","#3597c4","#3496c4","#3395c3","#3294c2","#3193c2","#3092c1","#2f90c0","#2d8fc0","#2c8ebf","#2b8dbf","#2a8cbe","#298abd","#2889bd","#2788bc","#2687bc","#2586bb","#2485ba","#2383ba","#2282b9","#2081b9","#1f80b8","#1e7fb7","#1d7eb7","#1c7db6","#1b7bb5","#1a7ab5","#1979b4","#1978b3","#1877b3","#1776b2","#1674b1","#1573b0","#1472b0","#1371af","#1370ae","#126fad","#116dac","#106cac","#106bab","#0f6aaa","#0e69a9","#0e67a8","#0d66a7","#0d65a6","#0c64a5","#0c63a4","#0c61a3","#0b60a2","#0b5fa1","#0a5ea0","#0a5d9e","#0a5b9d","#0a5a9c","#09599b","#09589a","#095699","#095597","#095496","#095395","#085294","#085092","#084f91","#084e90","#084d8e","#084b8d","#084a8c","#08498a","#084889","#084688","#084586","#084485","#084384","#084182","#084081"]
    if (height!=0){
    var pattern = Trianglify({
        height: height,
        width: width,
        variance:0,
        seed:'eyjbc',
        y_colors:arr.reverse(),
        x_colors:arr,
        cell_size: height_of_cell});
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

    var offsetForHide = $('#js-nav-hide-point').offset().top - $('.header-links').height() ;
    if (window.pageYOffset >= offsetForHide) {
        $('.header-links').addClass('hidden-header');
    } else {
        $('.header-links').removeClass('hidden-header');
    }
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
    var hh=document.documentElement.clientHeight-50
    hh =  hh>619 ? 619 : hh
    var height = (document.documentElement.clientWidth>456) ? hh : "50vh"
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
                    //.transition()
                    //.duration(100)
                    //.ease(d3.easeQuadIn)
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

