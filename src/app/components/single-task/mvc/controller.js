import {Model} from "./model";

/**
 * @module SingleTaskController
 */
export class Controller {
  /**
   * Creates a Single Task Model instance
   * @param {object} data - information about single task
   */
  constructor(data) {
    this.model = new Model(data);
  }

  /**
   * Call Model setData method
   * @param {object} data - information about single task
   */
  sendData(data) {
    this.model.setData(data);
  }

  /**
   * Call Model sendTaskToRemove method
   */
  setTaskToRemove() {
    this.model.sendTaskToRemove();
  }

  /**
   * Call Model sendTaskToRemove and removeTask methods
   */
  immediateRemove() {
    this.model.sendTaskToRemove();
    this.model.removeTask();
  }

  /**
   * Call Model getData method
   * @return {object} Task data
   */
  receiveData() {
    return this.model.getData();
  }
}
