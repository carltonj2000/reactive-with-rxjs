const { of, from } = rxjs;
const { map, flatMap } = rxjs.operators;

const url = `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`;
console.group("video 5");

(() => {
  const reqStream = of(url);
  const respStream = reqStream.pipe(
    flatMap(u => from(fetch(url)).pipe(flatMap(resp => resp.json())))
  );
  const createSuggestionStream = responseStream => {
    return responseStream.pipe(
      map(listUsers => listUsers[Math.floor(Math.random() * listUsers.length)])
    );
  };

  const suggestionStream1 = createSuggestionStream(respStream);
  const suggestionStream2 = createSuggestionStream(respStream);
  const suggestionStream3 = createSuggestionStream(respStream);

  const renderSuggestion = (user, selector) => {
    const elem = document.querySelector(selector);
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
