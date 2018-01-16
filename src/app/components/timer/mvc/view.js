import Template from "../template/template.hbs";
import "../template/helpers";
import TimerCompleted from "../template/timer-completed.hbs";
import TimerBreak from "../template/timer-break.hbs";
import TimerProcess from "../template/timer-process.hbs";
import {Controller} from "./controller";
import Firebase from "../../../services/firebase";
import $ from "jquery";

/**
 * @module TimerComponentView
 */
export class View {
    /**
   * Initialize controller, timer, totalTime and currentState fields
   */
    constructor(data) {
        this.controller = new Controller(data);
        this.timer = null;
        this.totalTime = null;
        this.currentState = "process";
    }

    /**
     * Calculate how much time is left to finish the stage
     */
    timeLeft(title) {
        const minutes = Math.floor((this.totalTime) / 60),
            seconds = this.totalTime % 60;
        const subString = this.currentState === "break" ? "break" : "";

        if (minutes === 0) {
            title.innerHTML = `${subString}<span class="timer__body-title-number">${seconds}</span> sec`;
        }
        else {
            title.innerHTML = `${subString}<span class="timer__body-title-number">${minutes}</span> min`;
        }

    }

    /**
     * Starts the timer animation and change the timer state
     */
    animationStart() {
        this.totalTime = this.setIterationTime();

        const timerTitle = document.querySelector("[data-title=timer]");
        const timerPomodoros = document.getElementById("timer-pomodoros");

        timerPomodoros.innerHTML += `<li class="timer__pomodoros-item">
        <div class="timer__pomodoros-button timer__pomodoros-button_process icon-add" data-query="addPomodoro"></div>
      </li>`;

        this.timeLeft(timerTitle);
        this.totalTime--;

        this.timer = setInterval(() => {
            this.timeLeft(timerTitle);
            this.totalTime--;
        }, 1000);
    }

    /**
     * Ends the timer animation and change the timer state
     */
    animationEnd(status) {
        clearInterval(this.timer);

        const timer = document.getElementById("timer");
        const data = this.controller.getData();

        this.controller.setEstimation({status: status});

        const isFinished = this.controller.checkPomodoro();

        if (isFinished) {
            timer.innerHTML = TimerCompleted(data);
            this.viewController("visible");
            this.controller.fillRemained();
        }
        else {
            this.currentState = "break";

            timer.innerHTML = TimerBreak(data);

            this.setAnimationProperties();
        }
    }

    /**
     * Fires when timer animation ends and currentState is break
     */
    animationBreakEnd() {
        clearInterval(this.timer);

        const buttonsContainer = document.querySelector("[data-buttons=\"timer-break\"]");
        const timerTitle = document.querySelector("[data-title=timer]");

        timerTitle.innerHTML = "Break<br> is over";
        buttonsContainer.innerHTML += "<button class=\"button-container__item button-container__item_blue\" data-query=\"timerFinish\">Finish Task</button>";

        this.currentState = "process";
    }

    /**
     * Check the current timer iteration, set it to 1 if iteration is equal to settings work iteration property  or increase it by 1 if not
     */
    setCurrentIteration() {
        if (this.settings[4] === this.settings[1]) {
            this.settings[4] = 1;
        }
        else {
            this.settings[4]++;
        }

        Firebase.updateValue(this.settings, "settings");
    }

    /**
     * Returns an iteration time according to currentState and currentIteration
     * @return {number} iteration time
     */
    setIterationTime() {
        if (this.currentState === "process") {
            return this.settings[0];
        }
        else {
            if (this.settings[4] === this.settings[1]) {
                return this.settings[3];
            }
            return this.settings[2];
        }
    }

    /**
     * Sets animation duration property to the timer and define animationstart and animationend events
     */
    setAnimationProperties() {
        const progress = document.querySelector("[data-anim~=\"left\"]"),
            progressHalf = document.querySelector("[data-anim~=\"right\"]"),
            wrapper = document.querySelector("[data-anim~=\"wrapper\"]");

        const time = this.setIterationTime();

        progress.style.animationDuration = time + "s";
        progressHalf.style.animationDuration = time / 2 + "s";
        wrapper.style.animationDelay = time / 2 + "s";

        progress.addEventListener("animationstart", this.animationStart.bind(this));

        if (this.currentState === "process") {
            progress.addEventListener("animationend", this.animationEnd.bind(this, "finished"));
        }
        else {
            progress.addEventListener("animationend", this.animationBreakEnd.bind(this, "finished"));
        }
    }

    /**
     * Show or hide some elements on the page according to the parameter
     * @param {string} overflow - option that tells the function to hide or show some elements on the page
     */
    viewController(overflow) {
        const header = document.getElementById("main-header");
        const timerButtons = document.getElementById("timer-buttons");

        if (overflow === "visible") {
            timerButtons.innerHTML += "<a href=\"#report\" class=\"main-content__back-button icon-arrow-right\" data-title=\"Go to Global List\"></a>";
        }

        header.style.visibility = overflow;
        timerButtons.style.visibility = overflow;
    }

    /**
     * Event handler that fires when user clicks on some elements on the page and reacts properly on these actions
     */
    handleStartTimer(e) {
        const target = e.target;

        if (!target.dataset.query) return;

        const timerData = this.controller.getData();
        const timer = document.getElementById("timer");

        switch (target.dataset.query) {
        case "timerStart": {
            this.viewController("hidden");
            this.currentState = "process";
            this.setCurrentIteration();

            timer.innerHTML = TimerProcess(timerData);

            this.setAnimationProperties();
            break;
        }
        case "finishPomodoro": {
            this.animationEnd.call(this, "finished");
            break;
        }
        case "failPomodoro": {
            this.animationEnd.call(this, "failed");
            break;
        }
        case "timerFinish": {
            const timer = document.getElementById("timer");
            const data = this.controller.getData();

            this.controller.fillRemained();

            timer.innerHTML = TimerCompleted(data);
            break;
        }
        case "addPomodoro": {
            const isAdded = this.controller.addPomodoro();

            if (isAdded) {
                const timerPomodoros = document.getElementById("timer-pomodoros");
                const li = document.createElement("li");

                li.innerHTML += `<li class="timer__pomodoros-item">
               <div class="timer__pomodoros-item_button timer__pomodoros-item_none"></div>
             </li>`;

                timerPomodoros.insertBefore(li, timerPomodoros.lastChild);
            }
        }

        }
    }

    /**
     * Render the timer template
     */
    render() {
        const timer = document.getElementById("timer");
        const data = this.controller.getData();

        /*if(!data.startDate){
            this.controller.setData({startDate: Date.now()});
        }*/

        Firebase.getData("settings").then((settings) => {
            if (data.estimationTotal === data.estimationUsed) {
                timer.innerHTML = TimerCompleted(data);
            }
            else {
                this.settings = settings;
                timer.innerHTML = Template(data);
                document.body.addEventListener("click", this.handleStartTimer.bind(this));
            }

            $("a").tooltip();
        });
    }
}
