import { Observable } from 'rxjs';

export interface UseCase<T, S> {
    execute(param: T): Observable<S>;
}

export interface UseCaseWithNoParams<S> {
    execute(): Observable<S>;
}

export interface UseCasePromise<T, S> {
    execute(param: T): Promise<S>;
}

export interface UseCasePromiseWithNoParams<S> {
    execute(): Promise<S>;
}