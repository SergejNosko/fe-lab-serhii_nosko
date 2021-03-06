/**
 * @module ReportsPageModel
 * */
export class Model{
    /**
   * Initialize the data field by filtering a passed parameter
   * @param {array} data - tasks data array
   * */
    constructor(data){
        this.data = data.filter((item) => {
            return item.isActive === false;
        });
    }

    /**
     * Returns a Date object with which data points to current week beginning
     * @return {Date} - current week beginning
     * */
    getCurrentWeek(){
        let todayDate = new Date();
        const weekDay = todayDate.getDay();

        todayDate.setDate(todayDate.getDate() - weekDay);

        return todayDate;
    }

    /**
     * Finds all tasks that were done this week, sort them into categories, calculates their number
     * @param {string} tooltip - tooltip message
     * @return {array} the number of tasks for each day of the week
     * */
    getWeekData(tooltip){
        const currentWeekStart = this.getCurrentWeek();
        const currentWeekEnd = this.getCurrentWeek();
        currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

        let numberOfTasks = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

        let data = this.data
            .filter((item) => {
                const taskDate = new Date(item.startDate);
                const currentDate = taskDate.getDate();

                return currentDate >= currentWeekStart.getDate();
            })
            .reduce((prev, item) => {
                const taskDay = new Date(item.startDate).getDay();

                if(tooltip === "pomodoro"){
                    prev[item.priority - 1][taskDay] += item.estimationTotal;
                }
                else {
                    prev[item.priority - 1][taskDay]++;
                }

                //prev[item.priority - 1][taskDay]++;

                return prev;
            }, numberOfTasks);

        return data;
    }

    /**
     * Returns the number of days in the current month
     * @return {number} number of days
     * */
    getDaysInMonth(month, year){
        return 32 - new Date(year, month, 32).getDate();
    }

    /**
     * Finds all tasks that was been done this month, sort them into categories, calculates their number
     * @param {string} tooltip - tooltip message
     * @return {array} the number of tasks for each day of the month
     * */
    getMonthData(tooltip){
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getMonth();

        const daysInMonth = this.getDaysInMonth(currentMonth, currentYear);

        let sortArr = [[], [], [], [], []];

        for(let i = 0; i < sortArr.length; i++){
            for(let j = 0; j < daysInMonth; j++){
                sortArr[i][j] = 0;
            }
        }

        let data = this.data
            .filter((item) => {
                const itemMonth = new Date(item.startDate).getMonth();

                return itemMonth === currentMonth;
            })
            .reduce((prev, item) => {
                const itemDate = new Date(item.startDate).getDate();

                if(tooltip === "pomodoro"){
                    sortArr[item.priority - 1][itemDate - 1] += item.estimationTotal;
                }
                else {
                    sortArr[item.priority - 1][itemDate - 1]++;
                }

                return prev;
            }, sortArr);

        return data;
    }

    /**
     * Finds all tasks that was been done this day, sort them into categories, calculates their number
     * @param {string} tooltip - tooltip message
     * @return {array} number of tasks divided into categories
     * */
    getTodayData(tooltip){
        const todayDate = new Date().getDate();
        const currentMonth = new Date().getMonth();

        let data = this.data
            .filter((item) => {
                const taskDate = new Date(item.startDate).getDate();
                const taskMonth = new Date(item.startDate).getMonth();

                return taskDate === todayDate && taskMonth === currentMonth;
            })

            .map((item) => {
                return {
                    priority: +item.priority,
                    estimation: +item.estimationTotal
                };
            })

            .sort()

            .reduce((prev, current) => {
                if(tooltip === "pomodoro"){
                    prev[current.priority - 1] += current.estimation;
                }
                else {
                    prev[current.priority - 1]++;
                }
                return prev;
            }, [0, 0, 0, 0, 0]);

        return data;
    }
}
