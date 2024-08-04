# vue-use-timer

[English Version](README.md) | [Русская версия](README.ru.md)

Хук useTimer — это пользовательская функция API композиции Vue для управления таймером. Он предоставляет функции для запуска, остановки, паузы и продолжения таймера, а также возможность регистрации обратных вызовов для каждого события таймера.

## Импортирование
Чтобы использовать хук useTimer, просто импортируйте его в свой компонент Vue.

```js
import { useTimer } from "vue-use-timer"

const timer = reactive(useTimer())
```

## Пример использования 

```js

export default {
  setup() {
    const { time, onStop, onStart, onPause, onPlay, play, pause, stop, start, isPaused } = useTimer({
      formatter: (ms) => `${Math.floor(ms / 1000)} секунд`
    });

    onStart(() => {
      console.log('Таймер запущен');
    });

    onStop(() => {
      console.log('Таймер остановлен');
    });

    onPause(() => {
      console.log('Таймер на паузе');
    });

    onPlay(() => {
      console.log('Таймер продолжен');
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

Или в таком формате

```js
export default {
  setup() {
    const timer = reactive(useTimer({
      formatter: (ms) => `${Math.floor(ms / 1000)} секунд`
    }))
    
    timer.onStop(() => { '...' })
    timer.start(5000)
  }
}
```

## Интерфейс

### Функции
```
start(ms: number): Запускает таймер с указанным количеством миллисекунд.
stop(): Останавливает таймер и сбрасывает время.
pause(): Приостанавливает таймер.
play(): Возобновляет таймер с паузы.
```

### События
```
onStart(callback: Function): Регистрирует обратный вызов для события начала.
onStop(callback: Function): Регистрирует обратный вызов для события остановки.
onPause(callback: Function): Регистрирует обратный вызов для события паузы.
onPlay(callback: Function): Регистрирует обратный вызов для события продолжения.
```


