import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaClock } from 'react-icons/fa';
import soundManager from '../utils/soundManager';

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${props => props.isExpired ? '#ff6b6b' : '#748ffc'};
  padding: 0.5rem 0.75rem;
  background: ${props => props.isExpired ? 'rgba(255, 107, 107, 0.1)' : 'rgba(116, 143, 252, 0.1)'};
  border-radius: 8px;
  transition: all 0.3s ease;
`;

const TimerDisplay = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0.25rem;
`;

const Timer = ({ duration, onExpire, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      soundManager.playBackgroundMusic();
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExpired(true);
            soundManager.stopBackgroundMusic();
            if (onExpire) {
              soundManager.playAlarm();
              onExpire();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onExpire]);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <TimerContainer isExpired={isExpired}>
      <FaClock />
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
    </TimerContainer>
  );
};

export default React.memo(Timer);