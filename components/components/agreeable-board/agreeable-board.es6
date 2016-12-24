Polymer({
  is: "agreeable-board",
  properties: {
    newComment: {
      value: {
        body: ""
      }
    },
  },
  observers: [
    "setComments(room.comments)",
  ],
  setComments(comments = {}) {
    const {keys} = Object
    this.set("comments", keys(comments).map(($key)=> {
      return {...comments[$key], $key: $key}
    }))
  },
  sortComments(x, y) {
    return (y.createdAt || 0) - (x.createdAt || 0)
  },
  submit(event) {
    const {newComment, user, $: {firebase: {ref}}} = this
    event.preventDefault()
    ref.push({...newComment, createdBy: user.uid, createdAt: firebase.database.ServerValue.TIMESTAMP})
    this.clear()
  },
  clear() {
    this.set("newComment", {})
  },
  meToo(e) {
    const {newComment, user, $: {firebase}} = this
    firebase.ref.child(e.target.data.$key).child('agreements').push({createdBy: user.uid})
  }
})
