import { EventEmitter } from 'tseep'

/**
 * Глобальные события
 */
export type EventMap = {
    init: () => void
    ready: () => void
    error: (msg: string, code?: number) => void
    popupCloseAll: () => void
}

const event = new EventEmitter<EventMap>()
export const dispatch = <EventKey extends keyof EventMap>(ev: EventKey, ...args: Parameters<EventMap[EventKey]>) => () => event.emit(ev, ...args)
export default event
