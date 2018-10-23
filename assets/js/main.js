

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", updateCanvas);

function init() {
    updateCanvas();
    initScroll();
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
        .sections(d3.selectAll('#sections > section'))
        .on('active', function(i){
            console.log(i + 'th section active') })
}

