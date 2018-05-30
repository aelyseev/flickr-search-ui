export function namespace(name) {
    return action => `${name}/${action}`;
}
