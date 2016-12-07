"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageRoom = function () {
  function PageRoom() {
    _classCallCheck(this, PageRoom);
  }

  _createClass(PageRoom, [{
    key: "effect",
    value: function effect(type) {
      this.push(type + "s", { autoplay: true });
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
    key: "openDialogForNewRoom",
    value: function openDialogForNewRoom() {
      this.set("isNewEdited", true);
      this.set("newRoom", {});
      this.openDialog();
    }
  }, {
    key: "is",
    get: function get() {
      return "page-room";
    }
  }, {
    key: "properties",
    get: function get() {
      return {
        isNewEdited: {
          value: false
        },
        comments: {
          value: [{ value: "すげーいいよ！" }, { value: "たまんねぇよ！" }]
        },
        claps: {
          value: []
        },
        likes: {
          value: []
        },
        interestings: {
          value: []
        }
      };
    }
  }]);

  return PageRoom;
}();

Polymer(PageRoom.prototype);