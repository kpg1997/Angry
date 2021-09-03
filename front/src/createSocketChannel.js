import { eventChannel, buffers } from 'redux-saga';
import socket from './socket';

// 기본 matcher, buffer
const defaultMatchers = () => true;
const defalutBuffer = buffers.none();

// 소켓 이벤트채널 생성 팩토리함수
export function createSocketChannel(eventType, buffer = defalutBuffer, matchers = defaultMatchers) {
    return eventChannel(
        (emit) => {
            const emitter = (message) => {
                emit(message);
            };
            socket.on(eventType, emitter);
            // 항상 unsubscribe 함수를 반환해야한다.소스코드가 종료되기전에 socket.off 시키고있다
            // .
            return () => {
                socket.off(eventType, emitter);
            };
        },
        buffer,
        matchers
    );
}

export function closeChannel(channel) {
    if (channel) {
        channel.close();
    }
}
