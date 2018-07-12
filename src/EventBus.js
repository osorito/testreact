import events from 'events';
class EventBus {
    static eventEmiter = new events.EventEmitter();
    static getEventEmitter(){
        return this.eventEmiter;
    }
}
export default EventBus;