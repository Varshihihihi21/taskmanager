import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #f5f3ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const AppHeader = styled.h1`
  text-align: center;
  color: #5c6bc0;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = useCallback((text) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now(),
        text,
        completed: false,
        duration: 0,
        isRunning: false
      }
    ]);
  }, []);

  const handleToggleTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const handleSetTaskTimer = useCallback((taskId, duration) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, duration, isRunning: true }
          : task
      )
    );
  }, []);

  const handleTimerExpire = useCallback((taskId) => {
    if (Notification.permission === 'granted') {
      new Notification('Task Timer Expired', {
        body: `Time's up for your task!`,
        icon: '/vite.svg'
      });
    }
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, isRunning: false }
          : task
      )
    );
  }, []);

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <AppContainer>
      <AppHeader>Task Manager</AppHeader>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onSetTimer={handleSetTaskTimer}
        onTimerExpire={handleTimerExpire}
      />
    </AppContainer>
  );
};

export default App;
