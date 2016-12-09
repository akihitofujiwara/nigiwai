class PageRooms {
  get is() { return "page-rooms" }
  openEditor() {
    this.set("isOpeningEditor", true)
  }
  onEditorOpened() {
    this.set("newRoom", {})
  }
  onEditorClosed({detail: {canceled}}) {
    if (canceled) return
    const {ref} = this.$$("#firebaseRooms")
    const {newRoom, user} = this
    ref.push({...newRoom, createdBy: user.uid})
  }
  countReaction(x) {
    if (!(x && x.reactions && x.comments)) return
    var reactions = Object.values(x.reactions).length;
    var comments = Object.values(x.comments).length; 
    return reactions + comments
  }
}
Polymer(PageRooms.prototype)
