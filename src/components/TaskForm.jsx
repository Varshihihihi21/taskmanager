import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const FormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(10px);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  color: #495057;
  transition: all 0.2s;

  &::placeholder {
    color: #adb5bd;
  }

  &:focus {
    outline: none;
    border-color: #a5d8ff;
    box-shadow: 0 0 0 3px rgba(165, 216, 255, 0.25);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #748ffc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5c7cfa;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(92, 124, 250, 0.2);
  }

  &:disabled {
    background: #dee2e6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  }, [taskText, onAddTask]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
        maxLength={100}
      />
      <AddButton type="submit" disabled={!taskText.trim()}>
        <FaPlus /> Add Task
      </AddButton>
    </FormContainer>
  );
};

export default React.memo(TaskForm);