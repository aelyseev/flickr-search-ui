/* eslint-disable prefer-promise-reject-errors */
export default function cancellable(promise) {
    let isCancelled = false;
    if (promise && promise.isCancellable) {
        return promise;
    }
    const p = new Promise((resolve, reject) => {
        promise.then(
            data => (isCancelled ? reject({isCancelled: true, data}) : resolve(data)),
            err => (isCancelled ? reject({isCancelled: true, err}) : reject(err))
        );
    });

    return {
        isCancellable: true,
        then: p.then.bind(p),
        catch: p.catch.bind(p),
        cancel() {
            isCancelled = true;
        }
    };
}
