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

### Functions
<b>start(ms: number):</b> Starts the timer with the specified number of milliseconds.
<br>
<b>stop():</b> Stops the timer and resets the time.
<br>
<b>pause():</b> Pauses the timer.
<br>
<b>play():</b> Resumes the timer from the paused state.


### Events

<b>onStart(callback: Function):</b> Registers a callback for the start event.
<br>
<b>onStop(callback: Function):</b> Registers a callback for the stop event.
<br>
<b>onPause(callback: Function):</b> Registers a callback for the pause event.
<br>
<b>onPlay(callback: Function):</b> Registers a callback for the play event.


### Values
<b>time:</b> The timer's time, in milliseconds, if the formatter does not return another value. Will return 0 if the time has expired.
<br>
<b>isPaused:</b> Returns true if the timer is paused.
