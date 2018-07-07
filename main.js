const { of, from } = rxjs;
const { map, flatMap, tap, finalize } = rxjs.operators;

const cid = github.carltonj2000.cjHomeResolutions.clientId;
const cs = github.carltonj2000.cjHomeResolutions.clientSecret;

const url = `https://api.github.com/users?client_id=${cid}&client_secret=${cs}`;
console.group("video 4");
(() => {
  const requestStream = of(url);
  const responseStream = requestStream
    .pipe(
      flatMap(req => from(fetch(req))),
      tap(x => console.log("t", x))
    )
    .subscribe(x => console.log("s", x), undefined, x =>
      console.log("completed", x)
    );
})();

fetch(url)
  .then(r => r.json())
  .then(r => console.log(r));
console.groupEnd();
