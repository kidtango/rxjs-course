import { Observable } from 'rxjs';

export function createHttpObserbale(url: string) {
  return Observable.create(observer => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
