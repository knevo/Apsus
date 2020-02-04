export default {
    on,
    emit,
    callModal
};

function on(eventName, listener) {
    const callListener = ({
        detail
    }) => listener(detail);

    window.addEventListener(eventName, callListener);

    return () => window.removeEventListener(eventName, callListener);
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

function callModal(modalType, props) {
    return emit('callModal', { modalType, props });
}