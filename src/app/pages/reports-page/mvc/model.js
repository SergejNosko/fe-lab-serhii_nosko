export class Model{
  constructor(data){
    this.data = data.filter((item) => {
      return item.isActive === false
    });
  }

  getCurrentWeek(){
    let todayDate = new Date();
    const weekDay = todayDate.getDay();

    todayDate.setDate(todayDate.getDate() - weekDay);

    return todayDate;
  }

  getWeekData(){
    const currentWeekStart = this.getCurrentWeek();
    const currentWeekEnd = this.getCurrentWeek();
    currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

    let numberOfTasks = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

    let data = this.data
      .filter((item) => {
        const taskDate = new Date(item.startDate);

        return taskDate >= currentWeekStart && taskDate <= currentWeekEnd;
      })
      .reduce((prev, item) => {
        const taskDay = new Date(item.startDate).getDate();

        prev[item.priority - 1][taskDay]++;

        return prev;
      }, numberOfTasks);

    return data;
  }

  getDaysInMonth(month, year){
    const date = new Date();

    return 32 - new Date(year, month, 32).getDate();
  }

  getMonthData(){
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

        sortArr[item.priority - 1][itemDate - 1]++;

        return prev;
      }, sortArr);

    return data;
  }

  getTodayData(){
    const todayDate = new Date().getDate();
    const currentMonth = new Date().getMonth();

    let data = this.data
      .filter((item) => {
        const taskDate = new Date(item.startDate).getDate();
          const taskMonth = new Date(item.startDate).getMonth();

        return taskDate === todayDate && taskMonth === currentMonth;
      })

      .map((item) => {
        return +item.priority
      })

      .sort()

      .reduce((prev, current) => {
        prev[current - 1]++;
        return prev;
      }, [0, 0, 0, 0, 0]);

    return data;
  }

  sendData(){
    const data = this.getMonthData();

    return data;
  }
}
