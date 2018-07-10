const { of, from, fromEvent } = rxjs;
const { tap, map, flatMap, merge, startWith } = rxjs.operators;

const url = `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`;
console.group("video 6");

(() => {
  const startup = of(url);
  const refresh = document.querySelector(".refresh");
  const refClick = fromEvent(refresh, "click");

  const reqRefeshStream = refClick.pipe(
    map(e => {
      const rmndOfst = Math.floor(Math.random() * 500);
      return of(`${url}&since=${rmndOfst}`);
    })
  );
  const respStream = reqRefeshStream.pipe(
    merge(startup),
    flatMap(u => from(fetch(url)).pipe(flatMap(resp => resp.json())))
  );
  const createSuggestionStream = responseStream => {
    return responseStream.pipe(
      map(listUsers => listUsers[Math.floor(Math.random() * listUsers.length)]),
      startWith(null),
      merge(reqRefeshStream.pipe(map(e => null)))
    );
  };

  const suggestionStream1 = createSuggestionStream(respStream);
  const suggestionStream2 = createSuggestionStream(respStream);
  const suggestionStream3 = createSuggestionStream(respStream);

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
