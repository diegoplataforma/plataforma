import { Observable } from 'rxjs';

export interface UseCase<T, S> {
    execute(param: T): Observable<S>;
}

export interface UseCaseWithNoParams<S> {
    execute(): Observable<S>;
}