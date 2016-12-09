Polymer({
  is: "agreeable-comment",
  meToo(e) {
    const {user, $: {firebase: {ref}}} = this
    ref.push({createdBy: user.uid})
  },
  findUser(agreement, users) {
    return users.find(({uid}) => uid == agreement.createdBy)
  }
})
