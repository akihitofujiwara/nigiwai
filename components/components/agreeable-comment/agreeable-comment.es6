Polymer({
  is: "agreeable-comment",
  observers: [
    "setAgreements(comment.agreements)",
  ],
  setAgreements(agreements = {}) {
    const {keys} = Object
    this.set("agreements", keys(agreements).map(($key)=> {
      return {...agreements[$key], $key: $key}
    }))
  },
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
