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
    const data = this.getWeekData();

    return data;
  }
}
