import {Controller} from "./controller";
import Template from "../template/template.hbs";
import Highcharts from "highcharts";
import $ from "jquery";

/**
 * @module ReportsPageView
 * */
export class View {
    /**
     * Initializes controller, tooltipType, chartType, chart fields
     * @param {array} data - tasks data array
     * */
    constructor(data) {
        this.controller = new Controller(data);
        this.tooltipType = "task";
        this.chartType = "day";

        this.chart = {
            title: "",
            chart: {
                type: "column",
                backgroundColor: "#2A3F50",
                width: 570,
                height: 350
            },
            xAxis: {
                type: "category",
                lineColor: "#fff",
                tickWidth: 0,
                labels: {
                    style: {
                        color: "#fff",
                        fontFamily: "PT Sans, sans-serif",
                        fontSize: "13px"
                    }
                },
            },
            yAxis: {
                title: "",
                gridLineColor: "#345168",
                lineColor: "#fff",
                lineWidth: 1,
                labels: {
                    style: {
                        color: "#fff",
                        fontFamily: "PT Sans, sans-serif",
                        fontSize: "13px"
                    }
                }
            },
            legend: {
                symbolRadius: 0,
                symbolHeight: 8,
                symbolWidth: 8,
                margin: 50,
                itemStyle: {
                    color: "#8da5b8",
                    fontWeight: "normal",
                    fontSize: 12
                },
                itemHoverStyle: {
                    color: "#82c7e0"
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    pointWidth: 40,
                    groupPadding: 0.5,
                    dataLabels: {
                        enabled: false,
                        format: "{point.y}"
                    }
                }
            },

            tooltip: {
                backgroundColor: "#dbeaf5",
                borderColor: "#dbeaf5",
            }
        };
    }

    /**
     * Returns an object with the chart settings for the tasks done today
     * @return {object} chart settings
     * */

    drawWeeklyChart(data) {
        const chart = this.chart;

        chart.chart.width = 670;

        chart.series = [
            {
                name: "URGENT",
                data: data[0],
                stack: 0,
                color: "#F75C4C"
            },
            {
                name: "HIGH",
                data: data[1],
                stack: 0,
                color: "#FFA841"
            },
            {
                name: "MIDDLE",
                data: data[2],
                stack: 0,
                color: "#FDDC43"
            },
            {
                name: "LOW",
                data: data[3],
                stack: 0,
                color: "#1ABC9C"
            },
            {
                name: "FAILED",
                data: data[4],
                stack: 1,
                color: "#8da5b8"
            }
        ];

        chart.xAxis.categories = ["SUN", "MON", "THU", "WED", "THR", "FRI", "SUT"];
        chart.plotOptions.series.groupPadding = 0;
        chart.plotOptions.column = {
            stacking: "normal"
        };
        chart.xAxis.labels.style.fontSize = 13;
        chart.plotOptions.series.pointWidth = 30;

        return chart;
    }

    /**
   * Returns an object with the chart settings for the tasks done this week
   * @return {object} chart settings
   * */
    drawMonthlyChart(data){
        const chart = this.chart;

        chart.xAxis.categories = [];
        for(let i = 0; i < data[0].length; i++){
            chart.xAxis.categories[i] = i + 1;
        }

        chart.xAxis.labels.style.fontSize = 11;
        chart.chart.width = 700;
        chart.plotOptions.series.groupPadding = 0;
        chart.plotOptions.column = {
            stacking: "normal"
        };
        chart.plotOptions.series.pointWidth = 5;

        chart.series = [
            {
                name: "URGENT",
                data: data[0],
                stack: 0,
                color: "#F75C4C"
            },
            {
                name: "HIGH",
                data: data[1],
                stack: 0,
                color: "#FFA841"
            },
            {
                name: "MIDDLE",
                data: data[2],
                stack: 0,
                color: "#FDDC43"
            },
            {
                name: "LOW",
                data: data[3],
                stack: 0,
                color: "#1ABC9C"
            },
            {
                name: "FAILED",
                data: data[4],
                stack: 0,
                color: "#8da5b8"
            }
        ];

        return chart;
    }

    /**
   * Returns an object with the chart settings for the tasks done this month
   * @return {object} chart settings
   * */
    drawDailyChart(data) {
        const chart = this.chart;

        chart.xAxis.categories = ["URGENT", "HIGH", "MIDDLE", "LOW", "FAILED"];
        chart.chart.width = 570;
        chart.xAxis.labels.style.fontSize = 13;

        chart.series = [{
            name: "URGENT",
            data: [{
                name: "URGENT",
                y: data[0]
            }],
            color: "#F75C4C"
        }, {
            name: "HIGH",
            data: [{
                name: "HIGH",
                y: data[1]
            }],
            color: "#FFA841"
        }, {
            name: "MIDDLE",
            data: [{
                name: "MIDDLE",
                y: data[2]
            }],
            color: "#FDDC43"
        }, {
            name: "LOW",
            data: [{
                name: "LOW",
                y: data[3]
            }],
            color: "#1ABC9C"
        }, {
            name: "FAILED",
            data: [{
                name: "FAILED",
                y: data[4]
            }],
            color: "#8da5b8"
        }];

        return chart;
    }

    /**
     * Render the correct chart according to the type parameter
     * @return {object} chart settings
     * */
    renderRequiredChart(type, tooltip){
        const data = this.controller.receiveData(type, tooltip);
        console.log(type, tooltip);
        let chart;
        switch (type){
        case "day": {
            chart = this.drawDailyChart(data);

            chart.tooltip.formatter = function () {
                return `<span class="report__tooltip-title">${this.series.name}</span><br>
                  <span class="report__tooltip-span">${tooltip === "pomodoro" ? "Pomodoros" : "Tasks"}</span>: ${this.series.data[0].y}<br/>`;
            };

            return this.drawDailyChart(data);
        }
        case "week": {
            chart = this.drawDailyChart(data);

            chart.tooltip.formatter = function () {
                return `<span class="report__tooltip-title">${this.series.name}</span><br>
                  <span class="report__tooltip-span">${tooltip === "pomodoro" ? "Pomodoros" : "Tasks"}</span>: ${this.y}<br/>`;
            };

            return this.drawWeeklyChart(data);
        }
        case "month": {
            chart = this.drawDailyChart(data);

            chart.tooltip.formatter = function () {
                return `<span class="report__tooltip-title">${this.series.name}</span><br>
                  <span class="report__tooltip-span">${tooltip === "pomodoro" ? "Pomodoros" : "Tasks"}</span>: ${this.y}<br/>`;
            };

            return this.drawMonthlyChart(data);
        }
        }
    }

    setActiveLink(type, tooltip){
        const typeLink = document.querySelector(`[data-type=${type}]`);
        const tooltipLink = document.querySelector(`[data-tooltip=${tooltip}]`);

        typeLink.classList.add("report__link_active");
        tooltipLink.classList.add("report__link_active");
    }

    /**
     * Renders the report template
     * @param {string} type - type of the chart
     * @param {string} tooltip - tooltip message
     * */
    render(type, tooltip) {
        const root = document.getElementById("root");
        const chartType = type || this.chartType;
        const tooltipType = tooltip || this.tooltipType;

        if(type) this.chartType = type;
        if(tooltip) this.tooltipType = tooltip;

        root.innerHTML = Template();

        this.setActiveLink(chartType, tooltipType);

        const chart = this.renderRequiredChart(chartType, tooltipType);

        Highcharts.chart("report", chart);

        $("a").tooltip();
        $("[data-type]").customTab({self: this, params: [], callback: this.render});
        $("[data-tooltip]").customTab({self: this, params: [chartType], callback: this.render});
    }
}
