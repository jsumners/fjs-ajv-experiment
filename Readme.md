This is a simple experiment to determing the memory usage difference between
[`fast-json-stringify`][fjs] that optimizes memory usage by not passing an
AJV instance to each serializer, versus a version that passes an AJV instance
to each serializer. This follows from the discussion in
[https://github.com/fastify/fast-json-stringify/pull/316][316].

This project contains all source code as used during the experiment. The
difference is within each server's `node_modules/fast-json-stringify/index.js`
file. A diff can be done between the two to see the changes made.

Running this experiment on my own system for three runs gives the following
results:

```
server-a stats: {
  rss: 96047104,
  heapTotal: 61014016,
  heapUsed: 29746280,
  external: 1518231,
  arrayBuffers: 26814
}
server-b stats: {
  rss: 101249024,
  heapTotal: 62308352,
  heapUsed: 39576320,
  external: 1518231,
  arrayBuffers: 26814
}

heap delta: 1294336
```

```
server-a stats: {
  rss: 96550912,
  heapTotal: 60227584,
  heapUsed: 27332352,
  external: 1518231,
  arrayBuffers: 26814
}
server-b stats: {
  rss: 101601280,
  heapTotal: 60997632,
  heapUsed: 32420008,
  external: 1518231,
  arrayBuffers: 26814
}

heap delta: 770048
```

```
server-a stats: {
  rss: 95973376,
  heapTotal: 61014016,
  heapUsed: 29521936,
  external: 1518231,
  arrayBuffers: 26814
}
server-b stats: {
  rss: 102592512,
  heapTotal: 60211200,
  heapUsed: 29081512,
  external: 1518231,
  arrayBuffers: 26814
}

heap delta: -802816
```

The delta is calculated by subtracting the heap total of server A from the
heap total of server B.

## System Specs

+ MacBook Pro (16-inch, 2019)
+ 2.3 GHz 8-Core Intel Core i9
+ 32 GB 2667 MHz DDR4

[fjs]: https://github.com/fastify/fast-json-stringify
[316]: https://github.com/fastify/fast-json-stringify/pull/316
