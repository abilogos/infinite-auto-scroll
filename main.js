$(document).ready(function(){
$(".auto-scroll-container").each(function () {
    autoScroll(this, {scroll_dir:'right', gear:4, flex_flow: 'row'});
});
});

function autoScroll(obj, options) {
    $(obj).css("overflow","auto");
    $(obj).css("display", "flex");
    
    let flex_flow = options.flex_flow == 'column' ? 'column' : 'row';
    $(obj).css("flex-flow", flex_flow);

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

    let scrollDirMul;
    if (flex_flow == 'row'){
        scrollDirMul = options.scroll_dir == 'left' ? -1 : 1;//default to right
    } else {
        scrollDirMul = options.scroll_dir == 'up' ? -1 : 1;//default to down
    }

    setInterval(function () {
        if (flex_flow == 'row'){
            $(obj).scrollLeft($(obj).scrollLeft() + (scrollDirMul* curSpeedParams[1]) );
        } else {
            $(obj).scrollTop($(obj).scrollTop() + (scrollDirMul* curSpeedParams[1]) );
        }
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
