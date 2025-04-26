import { getContext, setContext } from 'svelte';

interface CounterState {
	count: number;
	increment: () => void;
	decrement: () => void;
}

class CounterStateClass implements CounterState {
	count = $state(0);
	increment = () => {
		this.count++;
	};
	decrement = () => {
		this.count--;
	};
}

const DEFAULT_KEY = '$_counter_state';

export const getCounterState = (key = DEFAULT_KEY) => {
	return getContext<CounterState>(key);
};

export const setCounterState = (key = DEFAULT_KEY) => {
	const counterState = new CounterStateClass();
	return setContext(key, counterState);
};
