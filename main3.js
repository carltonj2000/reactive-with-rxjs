const { of } = rxjs;
const { map, flatMap } = rxjs.operators;

console.group("video 3");
(() => {
  const a = of(3, 4);

  const b = a.pipe(map(a => 10 * a));
  b.subscribe(v => console.log(v));

  const a2 = of(6, 7);
  const b2 = a.pipe(map(a => a2));
  b2.subscribe(v => console.log(v));

  const a3 = of(6, 7);
  const b3 = a.pipe(flatMap(a => a2));
  b3.subscribe(v => console.log(v));
})();

console.groupEnd();
