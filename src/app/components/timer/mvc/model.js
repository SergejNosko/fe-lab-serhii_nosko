import {EventBus} from "../../../services/eventBus";
import Firebase from "../../../services/firebase";
import Notification from "../../../components/notifications/index";

/**
 *  @module TimerComponentModel
 */
export class Model{
    /**
   * Initialize the data field and add the pomodoro field to the data
   */
    constructor(data){
        this.data = data;

        if(!this.data.pomodoros)
            this.data.pomodoros = [];

        for(let i = 0; i < this.data.estimationTotal; i++) {
            if(!this.data.pomodoros[i])
                this.data.pomodoros[i] = {
                    status: "none"
                };
        }
    }

    /**
     * If pomodoros field length is less then 5 add another item to it
     * @return {boolean} true if success, false if not
     */
    addPomodoro(){
        if(this.data.pomodoros.length < 5 && this.data.estimationTotal < 5) {
            this.data.pomodoros.push({status: "none"});
            this.data.estimationTotal++;

            Firebase.updateValue(this.data).catch((err) => {
                Notification().showMessage("error", "Oops! Error was occurred! " + err.message);
            });

            return true;
        }
        else{
            Notification().showMessage("error", "There can't be more than 5 estimations!");

            return false;
        }
    }

    /**
     * Set the pomodoro items ,that has status 'none', status 'failed'
     */
    fillRemainedPomodoros(){
        for(let i = 0; i < this.data.pomodoros.length; i++){
            if(this.data.pomodoros[i].status === "none")
                this.data.pomodoros[i].status = "failed";
        }

        this.data.estimationUsed = this.data.estimationTotal;
        this.data.isActive = false;

        Firebase.updateValue(this.data).then(() => {
            Notification().showMessage("success", "You completed task!");
        }).catch((err) => {
            Notification().showMessage("error", "Oops! Error was occurred!" + err.message);
        });
    }

    /**
     * Checks all pomodoros to have status not to equal 'none'
     */
    checkPomodoros(){
        return this.data.pomodoros.every((pomodoro) => {
            return pomodoro.status !== "none";
        });
    }

    /**
     * Find first pomodoro item that has status 'none' and change it's status according to the passed data
     */
    setEstimation(data){
        let index;

        this.data.pomodoros.find((pomodoro, i) => {
            if(pomodoro.status === "none"){
                index = i;
                return pomodoro;
            }
        });

        this.data.pomodoros[index].status = data.status;
        this.data.estimationUsed++;

        Firebase.updateValue(this.data).catch((err) => {
            Notification().showMessage("error", "Oops! Error was occurred! " + err.message);
        });
    }

    /**
     * Returns current data
     * @return {object} Timer data
     */
    getData(){
        return this.data;
    }

    /**
     * Change the data field to the passed parameter
     */
    setData(data){
        this.data = {...this.data, ...data};
        EventBus.dispatch("setData", this.data);
    }
}
