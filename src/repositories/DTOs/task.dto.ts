export interface ICreateTaskDto {
  title: string;
  description: string;
  userId: string|undefined;
}

export interface IGetTasksDto {
  userId: string|undefined;
  page: number;
  size: number;
  skip: number;
}

export interface IUpdateTaskDto {
  id: string;
  status: string;
  title: string;
  description: string;
  userId: string|undefined;
}
