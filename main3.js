const { of } = rxjs;
const { delay, buffer, map, filter, debounceTime } = rxjs.operators;

console.group("video 3");
(() => {
  const a = of(3, 4);
  const b = a.pipe(map(a => 10 * a));

  b.subscribe(v => console.log(v));
})();

console.groupEnd();
