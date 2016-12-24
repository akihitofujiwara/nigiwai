Polymer({
  is: "application-root",
  observers: [
    "setActiveRouteName(route.path)",
    "registerUser(authUser)"
  ],
  toggleDrawer() {
    this.$.drawer.toggle()
  },
  signIn() {
    if (!this.signedIn) this.$.firebaseAuth.signInWithPopup()
  },
  setActiveRouteName(path) {
    if (!path) return
    this.set(
      "activeRouteName",
      Polymer.dom(this.root).querySelectorAll("app-route").find(({active})=> active).getAttribute("name")
    )
  },
  redirectPageRoot() {
    this.set("route.path", "/")
  },
  equals(x, y) {
    return x == y
  },
  registerUser(authUser) {
    if (!authUser) return
    const {displayName, uid, photoURL, email} = authUser
    this.set("user", {displayName, uid, photoURL, email})
  },
  attached() {
    if (this.route.path == "") this.redirectPageRoot()
    setTimeout(this.signIn.bind(this), 1500)
  }
})
