$(document).ready(function(){
$(".auto-scroll-container").each(function () {
    autoScroll(this);
});
});

function autoScroll(obj) {
    $(obj).css("overflow","auto");
    $(obj).css("flex-wrap", "nowrap")
    $(obj).css("display", "flex")

    setInterval(function () {
        $(obj).scrollLeft($(obj).scrollLeft() - 1);
    }, 30);

    if (window.IntersectionObserver !== undefined) {
        var observer = new IntersectionObserver(
            function (elements) {
                let element = elements[0];
                if (element.isIntersecting === false) {
                    $(obj).append($(element.target));
                    let width = element.boundingClientRect.width;
                    $(obj).scrollLeft($(obj).scrollLeft() + width);
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
    }
}
