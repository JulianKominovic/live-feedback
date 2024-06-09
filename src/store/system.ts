import { create } from "zustand";
type Task = {
  id: string;
  title: string;
  status: "pending" | "success" | "error";
};
export type SystemType = {
  queue: Task[];
  asyncOperations: {
    pending: number;
    success: number;
    error: number;
  };
  addTask: (task: Pick<Task, "id" | "title">) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (task: Partial<Task> & { id: Task["id"] }) => void;
};
function recalculateAsyncOperations(queue: Task[]) {
  return queue.reduce(
    (acc, task) => {
      return {
        ...acc,
        [task.status]: acc[task.status] + 1,
      };
    },
    {
      pending: 0,
      success: 0,
      error: 0,
    }
  );
}
const useSystemStore = create<SystemType>((set) => ({
  queue: [],
  asyncOperations: {
    pending: 0,
    success: 0,
    error: 0,
  },
  addTask: (task) => {
    set((state) => {
      const updatedQueue: Task[] = [
        ...state.queue,
        { ...task, status: "pending" },
      ];
      return {
        ...state,
        asyncOperations: recalculateAsyncOperations(updatedQueue),
        queue: updatedQueue,
      };
    });
  },
  removeTask: (id) => {
    set((state) => {
      const updatedQueue = state.queue.filter((task) => task.id !== id);
      return {
        ...state,
        asyncOperations: recalculateAsyncOperations(updatedQueue),
        queue: updatedQueue,
      };
    });
  },
  updateTaskStatus: ({ id, status, title }) => {
    set((state) => {
      const updatedQueue = state.queue.map((task) =>
        task.id === id
          ? {
              ...task,
              status: status || task.status,
              title: title || task.title,
            }
          : task
      );

      return {
        ...state,
        asyncOperations: recalculateAsyncOperations(updatedQueue),
        queue: updatedQueue,
      };
    });
  },
}));

export default useSystemStore;
