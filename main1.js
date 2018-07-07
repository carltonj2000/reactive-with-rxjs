const { interval } = rxjs;
const { map, take, filter, reduce } = rxjs.operators;

(() => {
  console.group("video 1");

  interval(100)
    .pipe(
      take(9),
      map(i => ["1", "1", "foo", "2", "3", "5", "bar", "8", "13"][i]),
      map(x => parseInt(x)),
      filter(x => !isNaN(x)),
      reduce((a, x) => a + x, 0)
    )
    .subscribe(x => console.log(x));
  console.groupEnd();
})();
