class ApplicationRoot {
  get () { return "application-root" }
  get properties() {
    return {
      room: {
        value: {name: "ぎっさんのドヤ発表"}
      }
    }
  }
  toggleDrawer() {
    this.$.drawer.toggle()
  }
  hoge() {
    alert("hoge")
  }
}
Polymer(ApplicationRoot.prototype)
