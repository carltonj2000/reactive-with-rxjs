const { Observable, Subject, of } = rxjs;
const { takeUntil, delay } = rxjs.operators;

console.group("rxjs observable");
(() => {
  const observable = Observable.create(observer =>
    observer.next(Math.random())
  );

  observable.subscribe(data => console.log(data));
  observable.subscribe(data => console.log(data));
})();
console.groupEnd();

console.group("rxjs subject");
(() => {
  const subject = new Subject();

  subject.subscribe(data => console.log(data));
  subject.subscribe(data => console.log(data));

  subject.next(Math.random());
})();
console.groupEnd();

console.group("multi case observable");
(() => {
  const observable = Observable.create(observer =>
    observer.next(Math.random())
  );

  const subject = new Subject();

  subject.subscribe(data => console.log(data));
  subject.subscribe(data => console.log(data));

  observable.subscribe(subject);
})();
console.groupEnd();

console.group("takeUntil delay order 1");
(() => {
  const timeout$ = new Subject();

  of(1)
    .pipe(
      takeUntil(timeout$),
      delay(2000)
    )
    .subscribe(x => console.log("order 1", x));
  timeout$.next();
  timeout$.complete();
})();
console.groupEnd();

console.group("takeUntil delay order 2");
(() => {
  const timeout$ = new Subject();

  of(1)
    .pipe(
      delay(2000),
      takeUntil(timeout$)
    )
    .subscribe(x => console.log("order 2", x));
  timeout$.next();
  timeout$.complete();
})();
console.groupEnd();

console.group("takeUntil delay order 3");
(() => {
  const timeout$ = new Subject();
  timeout$.next();
  timeout$.complete();

  of(1)
    .pipe(
      takeUntil(timeout$),
      delay(2000)
    )
    .subscribe(x => console.log("order 3", x));
})();
console.groupEnd();
