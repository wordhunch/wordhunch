import React/*, {useState}*/ from 'react'
import './LetterChart.css'
import Letter from '../Letter/Letter'

const LetterChart = ({gameOver, gaveUp}) => {
    
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const lettersMap = letters.map( (e) => {
        return (
            <div>
                {gameOver || gaveUp
                ? <Letter key={e} value={e} className='unknown' />
                : <Letter key={e} value={e} />
                }
            </div>
        )
    })
    
    return (
        <div 
        className='letter-chart' 
        // onClick={click}
        >
            {lettersMap}
        </div>
    )
}

export default LetterChart