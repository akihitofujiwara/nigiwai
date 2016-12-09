Polymer({
  is: "room-editor",
  behaviors: [Polymer.PaperDialogBehavior],
  observers: [
    "setTitle(opened)"
  ],
  setTitle(opened) {
    this.set("title", `ルーム${this.isNew ? "作成" : "編集"}`)
  },
  submit(event) {
    event.preventDefault()
    this.close()
  }
})
