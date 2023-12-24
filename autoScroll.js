jQuery.fn.autoScroll = function (options = {}) {
    let jqueryObj = this;

    jqueryObj.css("overflow","auto");
    jqueryObj.css("display", "flex");
    
    let flex_flow = options.flex_flow == 'column' ? 'column' : 'row';
    jqueryObj.css("flex-flow", flex_flow);

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

    let stop = options.stop==true ? true : false;

    setInterval(function () {
        if (flex_flow == 'row'){
            jqueryObj.scrollLeft(jqueryObj.scrollLeft() + (scrollDirMul* curSpeedParams[1]) );
        } else {
            jqueryObj.scrollTop(jqueryObj.scrollTop() + (scrollDirMul* curSpeedParams[1]) );
        }
    }, curSpeedParams[0]);

    if (!stop) {
        if (window.IntersectionObserver === undefined) {
            console.warn('Scroll wont be infinite duo to browser support');
            return jqueryObj;
        }
        var observer = new IntersectionObserver(
            function (elements) {
                let element = elements[0];
                if (element.isIntersecting === false) {

                    if (scrollDirMul == 1) {
                        jqueryObj.append($(element.target));
                    } else {
                        jqueryObj.prepend($(element.target));
                    }

                    if (flex_flow == 'row'){
                        let width = element.boundingClientRect.width;
                        jqueryObj.scrollLeft(jqueryObj.scrollLeft() + (-1*scrollDirMul* width ) );
                    } else {
                        let height = element.boundingClientRect.height;
                        jqueryObj.scrollTop(jqueryObj.scrollTop() + (-1*scrollDirMul* height ) );
                    }
                }
            },
            {
                root: jqueryObj[0],//obj
                rootMargin: "0px",
                threshold: 0,
            }
        );
        for (let elm of jqueryObj.children()) {
            observer.observe(elm);
        }
    }
    return jqueryObj;
}
