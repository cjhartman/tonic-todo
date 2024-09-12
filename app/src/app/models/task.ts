export interface Task {
  id: number;
  title: string;
  completedAt: Date | null;
  deletedAt: Date | null;
}
