export class Model{
  constructor(data){
    this.data = data.filter((item) => {
      return item.isActive === false
    })
      .map((item) => {
        return +item.priority
    })
      .sort()
      .reduce((prev, current) => {
        prev[current - 1]++;
        return prev;
      }, [0, 0, 0, 0, 0]);
    console.log(this.data)
  }

  sendData(){
    return this.data;
  }
}
