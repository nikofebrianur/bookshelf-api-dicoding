import React, { useState } from 'react'
import { quiz as quizData } from '../components/quiz/fakeQuiz.js'
import './Quiz.css'


const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quiz, setQuiz] = useState(quizData)
    const { id, question, options } = quiz[currentIndex];

    const nextQuestion = () => {
        if (quiz.length - 1 === currentIndex) return;
        setCurrentIndex(currentIndex + 1);
    }

    const prevQuestion = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    }

    const selectOption = (indexSelected, indexOptionSelected) => {
        setQuiz(
            quiz.map((item, index) =>
                index === indexSelected
                    ? {
                        ...item,
                        selected: true,
                        options: options.map((item, index) =>
                            index === indexOptionSelected
                                ? { ...item, selected: true }
                                : { ...item, selected: false }
                        ),
                    }
                    : item
            )
        )
    }

    return (
        <div className='quiz-box'>
            <h2 className='text-center mb-3 mt-3'>Xeratic Quiz</h2>
            <div className='card'>
                <div className='card-header bg-white'>{question}</div>
                <div className='card-body'>
                    {options.map((item, index) => (
                        <div
                        style={{
                          display: "flex",
                          justifyItems: "center",
                          alignItems: "center",
                          fontSize: 18,
                          margin:15,
                        }}
                        key={index}
                      >
                        <div 
                          style={{
                            height: 30,
                            width: 30,
                            backgroundColor: item?.selected ? "blue" : 'grey',
                            cursor: "pointer",
                            marginRight: 5,
                          }}
                          onClick={() => selectOption(currentIndex, index)}
                        />
                        {item.title}
                      </div>
                    ))}
                </div>
            </div>
            <div className='btn'>
                <button
                    className='btn-prev btn-info col-sm2' onClick={() => prevQuestion()}
                >
                    Previous
                </button>
                <button
                    className='btn-next btn-primary col-sm2' onClick={() => nextQuestion()}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Quiz
