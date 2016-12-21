Polymer({
  is: "agreeable-comment",
  meToo(e) {
    const {user, $: {firebase: {ref}}} = this
    ref.push({createdBy: user.uid})
  },
  findUser(item, users) {
    return users.find(({uid}) => uid == item.createdBy)
  },
  fromNow(seconds) {
    return moment(seconds).fromNow()
  },
  isZero(agreementsLength) {
    return agreementsLength == 0
  }
})
