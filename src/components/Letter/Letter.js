import React from 'react'
import './Letter.css'
import {connect} from 'react-redux'
import { setClass, resetClass } from '../../redux/reducers/letterReducer'

const Letter = props => {

    // const [cssClass, setClass] = useState('unknown')
    const {setClass} = props

    const click = () => {
        switch (props.letter[props.value]){
            case 'unknown':
                setClass('no', props.value)
            break
            case 'no':
                setClass('yes', props.value)
            break
            case 'yes':
                setClass('unknown', props.value)
            break
            default:
                return null
        }
    }

    return (
        <h6 className={`letter-${props.letter[props.value]}`} onClick={click}>
            {props.value}
        </h6>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {setClass, resetClass})(Letter)