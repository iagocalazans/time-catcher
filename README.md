# Time Catcher

## What it does?

This module is a simple console printer that only works with Express and shows your SERVER INFO, EVENT LOOP INFO and REQUEST Process Time spent (duration) to end.

# How to use

### There are four important steps:

1. Install it

```
npm i time-catcher
```

2. Import it
3. app.use it

```
import timeCatcher from 'time-catcher';
...

app.use(timeCatcher);
```

```
const timeCatcher = require('time-catcher').default;
...

app.use(timeCatcher)
```

4. check your console out for logs!

### Your output will be like this:

```
 ------  HTTP SERVER INFO  ------

[CPU] 4x Intel(R) Core(TM) i7-7500U CPU @ 2.70GHz
[RAM] 7.93 MB
[RSS] 32.88 MB


 ------  EVENT LOOP INFO  ------
 < These values take into account all the time since the server was started >

[% TIME] 2021-1-15 22:00:59 - 16%
[TOTAL USE] 2021-1-15 22:00:59 - 5648ms


 ------  REQUEST PROCESS INFO  ------

[DURATION] 2021-1-15 22:00:59 - 449ms


[CLOSE] 2021-1-15 22:00:59 - Request Process Ended
```


It is still too simple, but some features will come in future.
