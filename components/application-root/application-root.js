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
    key: "hoge",
    value: function hoge() {
      alert("hoge");
    }
  }, {
    key: "properties",
    get: function get() {
      return {
        room: {
          value: { name: "ぎっさんのドヤ発表" }
        }
      };
    }
  }]);

  return ApplicationRoot;
}();

Polymer(ApplicationRoot.prototype);