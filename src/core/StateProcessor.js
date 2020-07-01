import {debounce} from "./utils"

export class StateProcessor {
  constructor(client, delay = 500) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    return this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
