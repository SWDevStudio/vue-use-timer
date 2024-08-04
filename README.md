# vue-use-timer

[English Version](README.md) | [Русская версия](README.ru.md)

The `useTimer` hook is a custom Vue composition API function for managing a timer. It provides functionalities to start, stop, pause, and play the timer, along with the ability to register callbacks for each timer event.

## Importing
To use the `useTimer` hook, simply import it into your Vue component.

```js
import { useTimer } from "vue-use-timer"

const timer = reactive(useTimer())
```

## Example usage 

```js
export default {
  setup() {
    const { time, onStop, onStart, onPause, onPlay, play, pause, stop, start, isPaused } = useTimer({
      formatter: (ms) => `${Math.floor(ms / 1000)} seconds`
    });

    onStart(() => {
      console.log('Timer started');
    });

    onStop(() => {
      console.log('Timer stopped');
    });

    onPause(() => {
      console.log('Timer paused');
    });

    onPlay(() => {
      console.log('Timer resumed');
    });

    return {
      time,
      play,
      pause,
      stop,
      start,
      isPaused
    }
  }
}

```

Or in the following format

```js

export default {
  setup() {
    const timer = reactive(useTimer({
      formatter: (ms) => `${Math.floor(ms / 1000)} seconds`
    }))
    
    timer.onStop(() => { '...' })
    timer.start(5000)
  }
}
```

## API

### Function

```
start(ms: number): Starts the timer with the given number of milliseconds.
stop(): Stops the timer and resets the time.
pause(): Pauses the timer.
play(): Resumes the timer from the pause.
```

### Events

```
onStart(callback: Function): Registers a callback for the start event.
onStop(callback: Function): Registers a callback for the stop event.
onPause(callback: Function): Registers a callback for the pause event.
onPlay(callback: Function): Registers a callback for the play event.
```