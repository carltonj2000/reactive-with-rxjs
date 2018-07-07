const { interval, fromEvent } = rxjs;
const { delay, buffer, map, filter, debounceTime } = rxjs.operators;

console.group("video 2");
(() => {
  console.group("single click");

  const button = document.getElementById("button");
  const label = document.getElementById("label");

  const clicks = fromEvent(button, "click");
  clicks.subscribe(e => (label.textContent = "clicked"));
  clicks.pipe(delay(1000)).subscribe(e => (label.textContent = ""));
  console.groupEnd();
})();

(() => {
  console.group("double click");

  const button = document.getElementById("button2");
  const label = document.getElementById("label2");

  const clicks = fromEvent(button, "click");
  const doubleClicks = clicks.pipe(
    buffer(clicks.pipe(debounceTime(250))),
    filter(c => c.length === 2)
  );
  doubleClicks.subscribe(e => (label.textContent = "double clicked"));
  doubleClicks.pipe(delay(1000)).subscribe(e => (label.textContent = ""));
  console.groupEnd();
})();
console.groupEnd();
