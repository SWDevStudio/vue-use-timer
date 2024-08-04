import {computed, ref} from "vue";

/**
 * @enum
 */
const TimerEvent = {
  Start: 'start',
  Stop: 'stop',
  Pause: 'pause',
  Play: 'play'
}


export function useTimer({ formatter } = {}) {
  const _leftTime = ref(0)

  const time = computed({
    get() {
      if (!_leftTime.value) return 0

      if (formatter)
        return formatter(_leftTime.value)

      return _leftTime.value
    },
    set() {}
  })

  const _timerInterval = ref(0)
  const isPaused = ref(false)

  function _startInterval() {
    _timerInterval.value = setInterval(() => {
      const step = 1000

      if (_leftTime.value - step === 0) {
        initCallback(TimerEvent.Stop)
        _stopInterval()
      }

      _leftTime.value = _leftTime.value - step
    }, 1000)
  }

  function _stopInterval() {
    clearInterval(_timerInterval.value)
  }


  /**
   * @description Start the timer (will reset the current time)
   * @param { number } ms - кол-во секунд в ms
   */
  function start(ms = 0) {
    _leftTime.value = ms

    _startInterval()
    initCallback(TimerEvent.Start)
  }

  /**
   * @description Reset the timer and stop the countdown, also trigger the onStop event
   */
  function stop() {
    _stopInterval()
    _leftTime.value = 0
    initCallback(TimerEvent.Stop)
  }

  /**
   * @description Stop the timer while saving time
   */
  function pause() {
    _stopInterval()
    isPaused.value = true
    initCallback(TimerEvent.Pause)
  }

  /**
   * @description Continue counting
   */
  function play() {
    _startInterval()
    isPaused.value = false
    initCallback(TimerEvent.Play)
  }

  const _callbackList = {
    start: [],
    stop: [],
    pause: [],
    play: []
  }

  function initCallback(key) {
    _callbackList[key]?.forEach(fn => fn())
  }

  function onStart(fn) {
    _callbackList.start.push(fn)
  }

  function onStop(fn) {
    _callbackList.stop.push(fn)
  }

  function onPause(fn) {
    _callbackList.pause.push(fn)
  }

  function onPlay(fn) {
    _callbackList.play.push(fn)
  }

  return {
    time,
    onStop,
    onStart,
    onPause,
    onPlay,
    play,
    pause,
    stop,
    start,
    isPaused
  }
}
