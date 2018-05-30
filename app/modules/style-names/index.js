import classNames from 'classnames';
import get from 'lodash/get';

export default function (styles) {
    return function style(...names) {
        return classNames(...names).split(' ').map(name => get(styles, name, '')).join(' ');
    };
}
