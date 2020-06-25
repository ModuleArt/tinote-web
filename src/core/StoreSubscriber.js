import {isEqual} from "./utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(listeners) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          listeners.forEach(listener => {
            if (listener.isWatching(key)) {
              const changes = {[key]: state[key]}
              listener.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = state
    })
  }

  unsubscribeComponents() {
    this.sub.unsubscribe()
  }
}
