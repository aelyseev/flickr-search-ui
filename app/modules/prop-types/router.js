import PropTypes from 'prop-types';

export const history = {
    length: PropTypes.number,
    action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']),
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
        hash: PropTypes.string,
        state: PropTypes.string
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func
};

export const match = {
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.object
};
