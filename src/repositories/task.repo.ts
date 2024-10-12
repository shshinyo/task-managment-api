import { Task } from "../models";
import { ICreateTaskDto, IGetTasksDto, IUpdateTaskDto } from "./DTOs";

export class TaskRepoService {
  static async createTask(createTaskCriteria :ICreateTaskDto) {
    const { title, description ,userId } = createTaskCriteria;

    try {
      const task = new Task({ title, description, userId });
      await task.save();
      return task 
    } catch (error) {
      const errorMessage = (error as Error).message;
        throw new Error(errorMessage)
    }
  }

  static async getTasks(getTasksCriteria :IGetTasksDto) {
    const {userId,page,size,skip} = getTasksCriteria;

    try {

      const totalTasks = await Task.countDocuments({ userId });
      const tasks = await Task.find({ userId }).skip(+skip).limit(size);

      const result = {
        page,
        size,
        totalTasks,
        totalPages: Math.ceil(totalTasks / size),
        tasks,
      };
    return result;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage)
    }
  }

  static async getTaskById(getTaskCriteria :{ userId:string | undefined,id:string}) {
    const { id , userId} = getTaskCriteria;

    try {
      const task = await Task.findOne({ _id: id, userId });
      if (!task) {
      throw new Error("Task not found")
      }
     return  task ;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage)

    }
  }

  static async updateTask(updateTaskCriteria :IUpdateTaskDto) {
    const {id, title, description, status , userId } = updateTaskCriteria;

    try {
      const task = await Task.findOneAndUpdate(
        { _id: id, userId },
        { title, description, status },
        { new: true }
      );
      if (!task) {
        throw new Error("Task not found")

      }
     return  task ;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage)
    }
  }

  static async deleteTask(deleteTaskCriteria :{id:string, userId:string | undefined}) {
    const { id, userId } = deleteTaskCriteria;

    try {
      const task = await Task.findOneAndDelete({ _id: id, userId });
      if (!task) {
        throw new Error("Task not found")

      }
     return task;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage)
    }
  }
}
