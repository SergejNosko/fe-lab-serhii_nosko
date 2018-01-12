import jQuery from "jquery";

(($) => {
    $.fn.tooltip = function(options) {

        const body = $("body");

        $(".tooltip").remove();

        let block = $("<div></div>", {
            "class": "tooltip",
        });

        function showTooltip(title, e) {
            body.append(block);

            block.html(`<span>${title}</span>`);


            const BLOCK_ADDITIONAL_TOP_INDENT = 10;
            const BLOCK_ADDITIONAL_LEFT_INDENT = 15;

            const blockWidth = block.width();
            const blockHeight = block.height();

            if(body.width() < e.pageX + blockWidth){
                block.css("left", (e.pageX - blockWidth) + "px");
                block.addClass("tooltip_big");
            }
            else {
                block.css("left", (e.pageX - BLOCK_ADDITIONAL_LEFT_INDENT) + "px");
            }

            block.css("top", (e.pageY + blockHeight + BLOCK_ADDITIONAL_TOP_INDENT) + "px");

            block.css("display", "block");

        }

        function hideTooltip() {
            block.removeClass("tooltip_big");
            block.css("display", "none");
        }

        this.mousemove(function(e) {
            const settings = $.extend({
                title: $(this).data("title")
            }, options);

            if(settings.title === undefined) return;

            showTooltip(settings.title, e);
        });

        this.mouseout(hideTooltip);

        return this;
    };
})(jQuery);
