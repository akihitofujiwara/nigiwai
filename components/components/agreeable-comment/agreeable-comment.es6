Polymer({
  is: "agreeable-comment",
  meToo(e) {
    const {user, $: {firebase}} = this
    firebase.ref.child(e.target.data.$key).child('agreements').push({createdBy: user.uid})
  },
  userPhoto(agreement, users) {
    return users.find(({uid}) => uid == agreement.createdBy).photoURL
  }
})
