export class Task {
  static id: Task;
  constructor(
    public title: string,
    public date: Date,
    public priority: string,
    public status: string) {

  }
}
