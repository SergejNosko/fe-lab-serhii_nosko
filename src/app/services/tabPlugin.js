import jQuery from "jquery";


(($) => {
    $.fn.customTab = function (options) {
        const settings = $.extend({
            self: null,
            params: [],
            callback: function () {}
        }, options);

        this.on("click", function (e) {
            e.preventDefault();

            const data = $(this).data();

            let dataArr = [];

            for(let key in data){
                let value = data[key];

                if(typeof value === "number") value += ""; /* Converting to a string */

                dataArr.push(value);
            }

            settings.params.push(dataArr[0]);

            settings.callback.apply(settings.self, settings.params);
            //e.target.classList.add("tabs__tab-link_active");
        });

        return this;
    };

})(jQuery);
