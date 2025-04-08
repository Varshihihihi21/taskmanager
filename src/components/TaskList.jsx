import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaTrash, FaCheck, FaPlay } from 'react-icons/fa';
import Timer from './Timer';

const TaskListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const TimerInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  margin: 0 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  color: #495057;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #a5d8ff;
    box-shadow: 0 0 0 3px rgba(165, 216, 255, 0.25);
  }
`;

const TaskText = styled.span`
  flex: 1;
  font-size: 1rem;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#adb5bd' : '#495057'};
  transition: color 0.2s;
`;

const TaskButton = styled.button`
  background: none;
  border: none;
  margin-left: 0.75rem;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.delete ? '#ff6b6b' : '#748ffc'};
  opacity: 0.8;
  transition: all 0.2s;
  border-radius: 6px;

  &:hover {
    opacity: 1;
    background: ${props => props.delete ? 'rgba(255, 107, 107, 0.1)' : 'rgba(116, 143, 252, 0.1)'};
  }
`;

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onSetTimer, onTimerExpire }) => {
  const [timerInput, setTimerInput] = useState({});
  const handleToggle = useCallback((taskId) => {
    onToggleTask(taskId);
  }, [onToggleTask]);

  const handleDelete = useCallback((taskId) => {
    onDeleteTask(taskId);
  }, [onDeleteTask]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [tasks]);

  const handleTimerStart = useCallback((taskId) => {
    const minutes = parseInt(timerInput[taskId] || '0', 10);
    if (minutes > 0) {
      onSetTimer(taskId, minutes * 60);
      setTimerInput(prev => ({ ...prev, [taskId]: '' }));
    }
  }, [timerInput, onSetTimer]);

  return (
    <TaskListContainer>
      {sortedTasks.map(task => (
        <TaskItem key={task.id}>
          <TaskText completed={task.completed}>{task.text}</TaskText>
          {task.duration > 0 && task.isRunning ? (
            <Timer
              duration={task.duration}
              isRunning={task.isRunning}
              onExpire={() => onTimerExpire(task.id)}
            />
          ) : (
            <>
              <TimerInput
                type="number"
                min="1"
                max="180"
                placeholder="Min"
                value={timerInput[task.id] || ''}
                onChange={(e) => setTimerInput(prev => ({ ...prev, [task.id]: e.target.value }))}
              />
              <TaskButton onClick={() => handleTimerStart(task.id)}>
                <FaPlay />
              </TaskButton>
            </>
          )}
          <TaskButton onClick={() => handleToggle(task.id)}>
            <FaCheck />
          </TaskButton>
          <TaskButton delete onClick={() => handleDelete(task.id)}>
            <FaTrash />
          </TaskButton>
        </TaskItem>
      ))}
    </TaskListContainer>
  );
};

export default React.memo(TaskList);