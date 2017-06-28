
export default {
  github: {
    link: (task) => {
      return `https://github.com/${task.workspace.origin_id}/issues/${task.origin_id}`;
    }
  },
  trello: {
    link: (task) => {
      return `https://trello.com/c/${task.origin_id}`;
    }
  }
};
