import React from 'react';
import Counter from '../components/Counter';
import {useSelector,useDispatch} from 'react-redux';
import { decrease, decreaseAsync, increase, increaseAsync } from '../modules/counter';

function CounterContainer() {
    const number = useSelector(state => state.counter);
    const dispacth = useDispatch();

    const onIncrease = () => {
        dispacth(increaseAsync());
    }
    const onDecrease = () => {
        dispacth(decreaseAsync());
    }

    return(
        <Counter 
            number={number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
}

export default CounterContainer;