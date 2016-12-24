Polymer({
  is: "user-icon",
  observers: [
    "setTitle(user.displayName)"
  ],
  setTitle(userName) {
    this.setAttribute("title", userName)
  }
})

