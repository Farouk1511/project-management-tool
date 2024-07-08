export const TODO_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    ARCHIVED: 'Archived',
  };
  
  export const TASK_PRIORITY = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  };

  export const STATUS_COLORS = {
  [TODO_STATUS.PENDING]: '#FFD700', // Gold
  [TODO_STATUS.IN_PROGRESS]: '#00BFFF', // Deep Sky Blue
  [TODO_STATUS.COMPLETED]: '#32CD32', // Lime Green
  [TODO_STATUS.ARCHIVED]: '#808080', // Gray
};

export const PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: '#32CD32', // Lime Green
  [TASK_PRIORITY.MEDIUM]: '#FFD700', // Gold
  [TASK_PRIORITY.HIGH]: '#FF6347', // Tomato
  [TASK_PRIORITY.CRITICAL]: '#8B0000', // Dark Red
};