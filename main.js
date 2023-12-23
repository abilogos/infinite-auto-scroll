$(document).ready(function(){
$(".auto-scroll-container").each(function () {
    autoScroll(this, {dir:'right', gear:2});
});
});

function autoScroll(obj, options) {
    $(obj).css("overflow","auto");
    $(obj).css("flex-wrap", "nowrap");
    $(obj).css("display", "flex");

    // speed gears (21 is the speed of light :) )
    const speedGears = [
        [4000, 1],
        [1000, 1],

        [250, 1],
        [62, 1],

        [15, 1],
        [15, 4],

        [15, 16],
        [15, 64],

    ];
    let gear = Number.isInteger(options.gear) && options.gear >=0 && options.gear < 8 ? options.gear : 4;
    let curSpeedParams = speedGears[gear];

    let scrollDirMul = options.dir == 'left' ? -1 : 1;//defult to right

    setInterval(function () {
        $(obj).scrollLeft($(obj).scrollLeft() + (scrollDirMul* curSpeedParams[1]) );
    }, curSpeedParams[0]);

    if (window.IntersectionObserver !== undefined) {
        var observer = new IntersectionObserver(
            function (elements) {
                let element = elements[0];
                if (element.isIntersecting === false) {
                    $(obj).append($(element.target));
                    let width = element.boundingClientRect.width;
                    $(obj).scrollLeft($(obj).scrollLeft() + (-1*scrollDirMul* width ) );
                }
            },
            {
                root: obj,
                rootMargin: "0px",
                threshold: 0,
            }
        );
        for (let elm of $(obj).children()) {
            observer.observe(elm);
        }
    } else {
        console.warn('Scroll wont be infinite duo to browser support');
    }
}
