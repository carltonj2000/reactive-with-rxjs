const { of, from } = rxjs;
const { map, flatMap, tap, finalize } = rxjs.operators;

const url = `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`;
console.group("video 4");

(() => {
  console.group("static fetch");
  from(fetch(url))
    .pipe(flatMap(resp => resp.json()))
    .subscribe(r => console.log("static", r));
  console.groupEnd();
})();

(() => {
  console.group("stream fetch");
  const reqStream = of(url);
  const respStream = reqStream.pipe(
    flatMap(u => from(fetch(url)).pipe(flatMap(resp => resp.json())))
  );
  respStream.subscribe(u => console.log("stream", u));
  console.groupEnd();
})();

console.groupEnd();
