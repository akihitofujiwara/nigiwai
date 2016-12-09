Polymer({
  is: "room-editor",
  behaviors: [Polymer.PaperDialogBehavior],
  submit(event) {
    event.preventDefault()
    this.close()
  }
})
