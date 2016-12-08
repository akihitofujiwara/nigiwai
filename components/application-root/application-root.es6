class ApplicationRoot {
  get () { return "application-root" }
  get properties() {
    return {
    }
  }
  get observers() {
    return [
      "setActiveRouteName(route)",
      "registerUser(user, users, users.length)"
    ]
  }
  toggleDrawer() {
    this.$.drawer.toggle()
  }
  signIn() {
    if (!this.signedIn) this.$.firebaseAuth.signInWithPopup()
  }
  setActiveRouteName(route) {
    this.set(
      "activeRouteName",
      Polymer.dom(this.root).querySelectorAll("app-route").find(({active})=> active).getAttribute("name")
    )
  }
  redirectPageRoot() {
    this.set("route.path", "/")
  }
  equals(x, y) {
    return x == y
  }
  registerUser(user, users) {
    // 完璧じゃない。 ユーザー重複登録可能性あり
    this.debounce("registerUser", ()=> {
      if (!user) return
      const {displayName, uid, photoURL, email} = user
      if (users.find((it)=> it.uid == uid)) return
      this.$.firebaseUsers.ref.push({displayName, uid, photoURL, email})
    }, 2000)
  }
  attached() {
    if (this.route.path == "") this.redirectPageRoot()
    setTimeout(this.signIn.bind(this), 1500)
  }
}

Polymer(ApplicationRoot.prototype)
