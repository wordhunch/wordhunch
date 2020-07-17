import React/*, {useState}*/ from 'react'
import './LetterChart.css'
import Letter from '../Letter/Letter'

const LetterChart = () => {
    
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const lettersMap = letters.map( (e, i) => {
        return <Letter key={e} value={e} />
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