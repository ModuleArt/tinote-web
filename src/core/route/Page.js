export class Page {
  getRoot() {
    throw new Error("No getRoot method provided for page " + this.route)
  }

  destroy() {}
}
