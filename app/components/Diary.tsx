import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';

interface DiaryProps {
    initialNotes: { [date: string]: string };
}

const PageTurnAnimation = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const PageTurnReverseAnimation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const DiaryContainer = styled.div`
  width: 500px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Header = styled.div`
  background-color: #3498db;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #2980b9;
`;

const PageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const DateDisplay = styled.h2`
  margin-bottom: 15px;
  color: #555;
`;

const NotesTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  background-color: white;
  color: #333;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const PageWrapper = styled.div<{ $isAnimatingOut: boolean; $isAnimatingIn: boolean }>`
  position: relative;
  overflow: hidden;

  animation: ${({ $isAnimatingOut }) => ($isAnimatingOut ? PageTurnAnimation : 'none')} 0.5s ease-in-out forwards,
    ${({ $isAnimatingIn }) => ($isAnimatingIn ? PageTurnReverseAnimation : 'none')} 0.5s ease-in-out forwards;
`;


const Diary: React.FC<DiaryProps> = ({ initialNotes }) => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [notes, setNotes] = useState(initialNotes?.[currentDate.format('YYYY-MM-DD')] ?? '');
    const [allNotes, setAllNotes] = useState(initialNotes);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);

    const notesRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setNotes(allNotes?.[currentDate.format('YYYY-MM-DD')] ?? '');
    }, [currentDate, allNotes]);

    const handlePreviousDay = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setCurrentDate(moment(currentDate).subtract(1, 'day'));
            setIsAnimatingOut(false);
            setIsAnimatingIn(true);
            setTimeout(() => setIsAnimatingIn(false), 500); // Duration of animation
        }, 500); // Duration of animation
    };

    const handleNextDay = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setCurrentDate(moment(currentDate).add(1, 'day'));
            setIsAnimatingOut(false);
            setIsAnimatingIn(true);
            setTimeout(() => setIsAnimatingIn(false), 500); // Duration of animation
        }, 500); // Duration of animation
    };


    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };


    useEffect(() => {
        const dateKey = currentDate.format('YYYY-MM-DD');
        setAllNotes(prevNotes => ({ ...prevNotes, [dateKey]: notes }));
    }, [notes, currentDate]);

    return (
        <DiaryContainer>
            <Header>My Diary</Header>
            <PageWrapper $isAnimatingOut={isAnimatingOut} $isAnimatingIn={isAnimatingIn}>
                <PageContainer>
                    <DateDisplay>{currentDate.format('MMMM D, YYYY')}</DateDisplay>
                    <NotesTextArea
                        ref={notesRef}
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Write your thoughts here..."
                    />
                </PageContainer>
            </PageWrapper>
            <Navigation>
                <Button onClick={handlePreviousDay} disabled={isAnimatingOut || isAnimatingIn}>Previous</Button>
                <Button onClick={handleNextDay} disabled={isAnimatingOut || isAnimatingIn}>Next</Button>
            </Navigation>
        </DiaryContainer>
    );
};

export default Diary;