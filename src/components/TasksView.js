import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { mapUserResourceDispatchToProps } from '../actions/index';
import * as timeUtils from '../util/time';
import * as dataUtils from '../util/data';
import ExternalLinks from '../util/external-links';

class TasksView extends React.Component {
  render() {
    let { user, entries, tasks, momentDate, makeEntryFromTask, undeleteEntry } = this.props;
    const makeOrReuseEntryFromTask = (task) => {
      const deletedEntry = dataUtils.findEntryForTask(
        entries, user.id, task,
        momentDate.format(timeUtils.LINK_DATEFORMAT),
        {findDeleted: true});
      if (deletedEntry) {
        undeleteEntry(deletedEntry);
      }
      else {
        makeEntryFromTask(user.id, task, momentDate);
      }
    };
    const taskItems = _.map(tasks, (task) => {
        return (
          <li key={task.workspace + ':' + task.origin_id} className="list-group-item">
              <TaskItem task={task} makeEntryFromTask={makeOrReuseEntryFromTask} momentDate={momentDate} user={user}/>
          </li>);
    });
    return (
      <div className="panel panel-default task-listing-view">
          <div className="panel-body">
              <h4>Tasks assigned to you<br/>
                  <small>You have { _.size(tasks) } active tasks that can be selected for this date.</small></h4>
              <ul className="list-group">
                  { taskItems }
              </ul>
          </div>
      </div>
    );
  }
}

export const TaskItem = ({task, makeEntryFromTask, workspaces}) => {
  const onClick = () => {
    makeEntryFromTask(task);
  };
  const { workspace } = task;
  let taskLink='#!';
  if (workspace.system !== undefined) {
    taskLink = ExternalLinks[workspace.system].link(task);
  }
  return (
    <div className="task-listing-item row">
      <div className="task-listing-item-content col-xs-10">
        <div className="task-source">
          <a href={taskLink} tabIndex="-1">
            <span className="glyphicon glyphicon-tree-deciduous task-source-icon"></span>
            <span className="task-source-header">{ task.workspace.system }/{ task.workspace.id }/{ task.workspace.organization }/{ task.origin_id }</span>
          </a>
        </div>
        <div className="task-description">{ task.description }</div>
      </div>
      <div className="task-listing-item-actions col-xs-2 text-right">
        <a className="btn btn-default btn-lg time-task-button" href="#" onClick={onClick} role="button" data-toggle="tooltip" data-placement="left" title="Add to day">
          <span className="glyphicon glyphicon-time"></span>
        </a>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const { user } = ownProps;
  const date = ownProps.routeParams.date || timeUtils.today();
  if (!user) {
    return {tasks: []};
  }
  const tasks = _.pickBy(state.data.task, (task) => {
    return (
      task.assigned == user.id &&
        !dataUtils.findEntryForTask(state.data.entry, user.id, task, date));
  });
  return {
    user: user,
    tasks: _.map(tasks, (task) => {
      const workspace = state.data.workspace[task.workspace] || task.workspace;
      return task.merge({workspace});
    }),
    momentDate: moment(date),
    workspaces: state.data.workspace
  };
}



export default connect(mapStateToProps, mapUserResourceDispatchToProps)(TasksView);
