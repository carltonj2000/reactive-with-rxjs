const { of, from, fromEvent } = rxjs;
const {
  tap,
  map,
  flatMap,
  merge,
  startWith,
  shareReplay,
  withLatestFrom
} = rxjs.operators;

const url = `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`;
console.group("video 6");

(() => {
  const close1 = document.querySelector(".close1");
  const close2 = document.querySelector(".close2");
  const close3 = document.querySelector(".close3");
  const close1click = fromEvent(close1, "click");
  const close2click = fromEvent(close2, "click");
  const close3click = fromEvent(close3, "click");

  const startup = of(url);
  const refresh = document.querySelector(".refresh");
  const refClick = fromEvent(refresh, "click");

  const reqRefeshStream = refClick.pipe(
    map(e => {
      const rmndOfst = Math.floor(Math.random() * 500);
      return of(`${url}&since=${rmndOfst}`);
    })
  );
  const reqStream = reqRefeshStream.pipe(merge(startup));
  const respStream = reqStream.pipe(
    flatMap(u => from(fetch(url)).pipe(flatMap(resp => resp.json()))),
    shareReplay(1)
  );
  const getRandomUser = listUsers =>
    listUsers[Math.floor(Math.random() * listUsers.length)];
  const createSuggestionStream = (responseStream, closeClick) => {
    return responseStream.pipe(
      map(listUsers => getRandomUser(listUsers)),
      startWith(null),
      merge(reqRefeshStream.pipe(map(e => null))),
      merge(
        closeClick.pipe(
          withLatestFrom(respStream, (ev, us) => getRandomUser(us))
        )
      )
    );
  };

  const suggestionStream1 = createSuggestionStream(respStream, close1click);
  const suggestionStream2 = createSuggestionStream(respStream, close2click);
  const suggestionStream3 = createSuggestionStream(respStream, close3click);

  const renderSuggestion = (user, selector) => {
    const elem = document.querySelector(selector);
    if (user === null) return (elem.style.visibility = "hidden");
    elem.style.visibility = "visible";
    const userelem = elem.querySelector(".username");
    userelem.href = user.html_url;
    userelem.textContent = user.login;
    const imgelem = elem.querySelector("img");
    imgelem.src = user.avatar_url;
  };
  suggestionStream1.subscribe(u => renderSuggestion(u, ".suggestion1"));
  suggestionStream2.subscribe(u => renderSuggestion(u, ".suggestion2"));
  suggestionStream3.subscribe(u => renderSuggestion(u, ".suggestion3"));
})();

console.groupEnd();
