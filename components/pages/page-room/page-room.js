"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageRoom = function () {
  function PageRoom() {
    _classCallCheck(this, PageRoom);
  }

  _createClass(PageRoom, [{
    key: "openDialog",
    value: function openDialog() {
      this.$.dialog.open();
    }
  }, {
    key: "onEditorOpened",
    value: function onEditorOpened() {
      this.set("_room", _extends({}, this.room));
    }
  }, {
    key: "onEditorClosed",
    value: function onEditorClosed(_ref) {
      var confirmed = _ref.detail.confirmed;

      if (!confirmed) this.set("room", this._room);
    }
  }, {
    key: "is",
    get: function get() {
      return "page-room";
    }
  }, {
    key: "properties",
    get: function get() {
      return {};
    }
  }]);

  return PageRoom;
}();

Polymer(PageRoom.prototype);