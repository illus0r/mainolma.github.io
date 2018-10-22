

document.addEventListener("DOMContentLoaded", ready);
window.addEventListener("resize", ready);

function ready() {
    var canvas = document.getElementsByTagName("canvas")[0];
    if (canvas) canvas.remove();
    var header = document.getElementsByClassName("header")[0];
    var pattern = Trianglify({
        height: header.clientHeight,
        variance:0,
        seed:'eyjbc',
        x_colors:'GnBu',
        width: header.clientWidth,
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

