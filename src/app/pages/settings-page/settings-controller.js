import Firebase from "../../services/firebase";
import Categories from "./template/categories.hbs";
import Template from "./template/template.hbs";
import $ from "jquery";

export default function Controller(voters) {

    /*-----------------------Main Class-----------------------------*/
    class TaskList {
        constructor(elem, step, minValue, maxValue) {
            this.elem = elem;
            this.step = step;
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.index = +elem.dataset.index;
            this.voteInput = elem.querySelector(".single-setting__text-field");
            this.value = +this.voteInput.value;

            this.elem.addEventListener("click", (e) => {
                let target = e.target;

                if (target.classList.contains("single-setting__button_minus")) this.voteAction("decrease");
                else if (target.classList.contains("single-setting__button_add")) this.voteAction("increase");
            });
        }

        voteAction(action) {
            if (action === "increase") {
                if (this.value === this.maxValue) return false;
                this.value += this.step;
            }
            else if (action === "decrease") {
                if (this.value === this.minValue) return false;
                this.value -= this.step;
            }

            this.voteInput.value = this.value;
            renderObj(this.index, this.value);
        }
    }

    /*----------------------Render Function-------------------------*/
    const render = (renderValues) => {
        let chart = document.getElementById("chart");

        function calculateWidth(value, duration) {
            return (value / duration) * 100 + "%";
        }

        /*------------------------Chart render function-----------------*/
        function renderLoop(duration) {
            for (let i = 0; i < renderValues[1] * 2; i++) {
                let workElem = document.createElement("div");

                workElem.classList.add("chart-container__item");
                workElem.classList.add("chart-container__item_work");
                workElem.style.width = calculateWidth(renderValues[0], duration);
                chart.appendChild(workElem);

                if (i < renderValues[1] * 2 - 1) {
                    let breakElem = document.createElement("div");
                    breakElem.classList.add("chart-container__item");

                    if (i === renderValues[1] - 1) {
                        breakElem.style.width = calculateWidth(renderValues[3], duration);
                        breakElem.classList.add("chart-container__item_long-break");
                    }
                    else {
                        breakElem.style.width = calculateWidth(renderValues[2], duration);
                        breakElem.classList.add("chart-container__item_short-break");
                    }

                    chart.appendChild(breakElem);
                }
            }
        }

        /*------------------------Cycle list render function-----------------*/
        function renderCycleList(duration) {
            let hours = Math.floor(duration / 60),
                minutes = duration % 60,
                firstCycleDuration = (renderValues[0] + renderValues[2]) * renderValues[1] - renderValues[2] + renderValues[3];

            const firstCycle = document.getElementById("first-cycle"),
                longBreakWidth = document.querySelector(".chart-container__item_long-break").clientWidth,
                prevSibling = firstCycle.previousElementSibling,
                nextSibling = firstCycle.nextElementSibling,
                firstCycleWidth = longBreakWidth / firstCycle.parentElement.clientWidth * 100;

            if (+minutes === 0) firstCycle.innerHTML = `First cycle: ${Math.floor(firstCycleDuration / 60)}h<div class="full-chart__list-item-point"></div>`;
            else firstCycle.innerHTML = `First cycle: ${Math.floor(firstCycleDuration / 60)}h ${firstCycleDuration % 60}m<div class="full-chart__list-item-point"></div>`;
            firstCycle.style.width = (firstCycleWidth + 2) + "%"; //+2 because sometimes there is not enough space for content
            firstCycle.style.marginLeft = firstCycleWidth / 2 + "%";

            prevSibling.style.width = (100 - firstCycleWidth) / 2 + "%";
            nextSibling.style.width = (100 - firstCycleWidth) / 2 - firstCycleWidth / 2 + "%";
            nextSibling.innerHTML = `${hours}h ${minutes}m <div class="full-chart__list-item-point"></div>`;

        }

        /*------------------------Duration list render function-----------------*/
        function renderDurationList(duration) {
            let hours = Math.floor(duration / 30);

            const list = document.getElementById("duration-list");
            list.innerHTML = "";

            for (let i = 1; i <= hours; i++) {
                let listItem = document.createElement("li"),
                    currentDuration = i * 30;

                listItem.classList.add("full-chart__list-item");

                listItem.innerHTML = `<div class="full-chart__list-item-point"></div> ${Math.floor(currentDuration / 60)}h`;

                if (i % 2 !== 0) listItem.innerHTML += " 30m";

                if (i === 1) listItem.innerHTML = "<div class=\"full-chart__list-item-point\"></div> 30m";

                listItem.style.width = calculateWidth(30, duration);

                list.appendChild(listItem);
            }
        }

        return (index, value) => {
            chart.innerHTML = "";
            renderValues[index] = value;

            let duration = (renderValues[0] + renderValues[2]) * renderValues[1] * 2 - renderValues[2] * 2 + renderValues[3];

            renderLoop(duration);
            renderDurationList(duration);
            renderCycleList(duration);

            $("[data-query]").customTab({self: this, params: [], callback: renderRequiredPage});
        };
    };
    let list;

    function renderRequiredPage(query) {
        const root = document.getElementById("root");

        switch (query) {
        case "categories": {
            root.innerHTML = Categories();

            $("[data-query]").customTab({self: this, params: [], callback: renderRequiredPage});
            break;
        }
        case "settings": {
            let isNewUser = sessionStorage.getItem("isNewUser");

            root.innerHTML = Template();

            if (!isNewUser) Controller();
            else {
                Firebase.getData("settings").then((data) => {
                    Controller(data);
                });
            }
        }
        }
    }

    function handleSave(e) {
        let target = e.target,
            query = target.dataset.query;

        if (query) {
            switch (query) {
            case "saveSetting": {
                let settings = list.map((item) => {
                    return item.value;
                });

                settings.push(0); //current iteration

                Firebase.setValue(settings, "settings");

                sessionStorage.setItem("isNewUser", false);
                break;
            }
            }
        }
    }

    if (!voters) {
        list = [
            new TaskList(document.getElementById("voter1"), 5, 15, 25),
            new TaskList(document.getElementById("voter2"), 1, 2, 5),
            new TaskList(document.getElementById("voter3"), 1, 3, 5),
            new TaskList(document.getElementById("voter4"), 5, 15, 30)
        ];
    }
    else {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`voter${i}`).querySelector(".single-setting__text-field").value = voters[i - 1];
        }
        list = [
            new TaskList(document.getElementById("voter1"), 5, 15, 25),
            new TaskList(document.getElementById("voter2"), 1, 2, 5),
            new TaskList(document.getElementById("voter3"), 1, 3, 5),
            new TaskList(document.getElementById("voter4"), 5, 15, 30)
        ];
    }

    let renderValues = list.map((task) => {
        return +task.value;
    });

    let renderObj = render(renderValues);
    renderObj();

    document.body.addEventListener("click", handleSave);
}
