"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NigiYakashi = function () {
  function NigiYakashi() {
    _classCallCheck(this, NigiYakashi);
  }

  _createClass(NigiYakashi, [{
    key: "categorize",
    value: function categorize(reactions) {
      var _this = this;

      this.debounce("categorize", function () {
        _this.set("claps", reactions.filter(function (_ref) {
          var type = _ref.type;
          return type == "clap";
        }));
      }, 200);
    }
  }, {
    key: "effect",
    value: function effect(type) {
      var user = this.user,
          ref = this.$.firebaseReactions.ref;

      ref.push({ type: type, autoplay: true, createdBy: user.uid });
    }
  }, {
    key: "clap",
    value: function clap() {
      this.effect("clap");
    }
  }, {
    key: "like",
    value: function like() {
      this.effect("like");
    }
  }, {
    key: "interesting",
    value: function interesting() {
      this.effect("interesting");
    }
  }, {
    key: "is",
    get: function get() {
      return "nigi-yakashi";
    }
  }, {
    key: "observers",
    get: function get() {
      return ["categorize(reactions, reactions.length)"];
    }
  }]);

  return NigiYakashi;
}();

Polymer(NigiYakashi.prototype);