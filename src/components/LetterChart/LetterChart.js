import React from 'react'
import {useSelector} from 'react-redux'
import './LetterChart.css'
import Letter from '../Letter/Letter'

const LetterChart = ({ displayLC }) => {


    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const lettersMap = letters.map(e => {
        return <Letter key={e} value={e} />
    })

    const game = useSelector(state => state.game)

    return (
        <div>
            {displayLC && !game.gaveUp && !game.gameOver ? <div className='letter-chart'>
                {lettersMap}
            </div> : null}
        </div>
    )
}

export default LetterChart