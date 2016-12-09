Polymer({
  is: "agreeable-board",
  properties: {
    newComment: {
      value: {
        body: ""
      }
    },
  },
  submit(event) {
    const {newComment, user, $: {firebase}} = this
    event.preventDefault()
    firebase.ref.push({...newComment, createdBy: user.uid})
    this.clear()
  },
  clear() {
    this.set("newComment", {})
  },
  meToo(e) {
    //firebase.ref.push({...newComment, createdBy: user.uid})
    const {newComment, user, $: {firebase}} = this
    console.log(e.target.data.$key)
    console.log(firebase.ref.child(e.target.data.$key))
    firebase.ref.child(e.target.data.$key).child('agreements').push({createdBy: user.uid})
  }
})
