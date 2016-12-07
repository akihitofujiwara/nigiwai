"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AgreeableBoard = function () {
  function AgreeableBoard() {
    _classCallCheck(this, AgreeableBoard);
  }

  _createClass(AgreeableBoard, [{
    key: "submit",
    value: function submit(event) {
      var newComment = this.newComment,
          user = this.user,
          firebase = this.$.firebase;

      event.preventDefault();
      firebase.ref.push(_extends({}, newComment, { createdBy: user.uid }));
      this.clear();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.set("newComment", {});
    }
  }, {
    key: "is",
    get: function get() {
      return "agreeable-board";
    }
  }, {
    key: "properties",
    get: function get() {
      return {
        newComment: {
          value: {
            body: ""
          }
        }
      };
    }
  }]);

  return AgreeableBoard;
}();

Polymer(AgreeableBoard.prototype);