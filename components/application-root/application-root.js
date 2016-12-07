"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationRoot = function () {
  function ApplicationRoot() {
    _classCallCheck(this, ApplicationRoot);
  }

  _createClass(ApplicationRoot, [{
    key: "get",
    value: function get() {
      return "application-root";
    }
  }, {
    key: "toggleDrawer",
    value: function toggleDrawer() {
      this.$.drawer.toggle();
    }
  }, {
    key: "signIn",
    value: function signIn() {
      if (!this.signedIn) this.$.firebaseAuth.signInWithPopup();
    }
  }, {
    key: "redirectPageRoot",
    value: function redirectPageRoot() {
      this.set("route.path", "/");
    }
  }, {
    key: "equals",
    value: function equals(x, y) {
      return x == y;
    }
  }, {
    key: "registerUser",
    value: function registerUser(user, users) {
      var _this = this;

      // 完璧じゃない。 ユーザー重複登録可能性あり
      this.debounce("registerUser", function () {
        if (!user) return;
        var displayName = user.displayName,
            uid = user.uid,
            photoURL = user.photoURL,
            email = user.email;

        if (users.find(function (it) {
          return it.uid == uid;
        })) return;
        _this.$.firebaseUsers.ref.push({ displayName: displayName, uid: uid, photoURL: photoURL, email: email });
      }, 2000);
    }
  }, {
    key: "attached",
    value: function attached() {
      if (this.route.path == "") this.redirectPageRoot();
      setTimeout(this.signIn.bind(this), 1500);
    }
  }, {
    key: "properties",
    get: function get() {
      return {};
    }
  }, {
    key: "observers",
    get: function get() {
      return ["registerUser(user, users, users.length)"];
    }
  }]);

  return ApplicationRoot;
}();

Polymer(ApplicationRoot.prototype);