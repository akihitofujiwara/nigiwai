Polymer({
  is: "reaction-gauge",
  maxCount: 500,

  observers: [
    "setReactionCount(room)",
    "render(reactionCount, waveIncrement)"
  ],

  setReactionCount(room) {
    if (!(room && room.reactions)) return
    let _this = this
    let ref = firebase.database().ref(`/rooms/${this.roomId}/`)
    ref.on("value", function(snapshot) {
      let { comments, reactions } = snapshot.val()
      let commentsCount = Object.keys(comments).length;
      let agreementsCount = Object.values(comments).reduce( (pre, current, index, array) => {
        return (current.agreements && Object.keys(current.agreements).length || 0) + pre
      }, 0)
      let reactionsCount = Object.keys(reactions).length;
      _this.set("reactionCount", commentsCount + agreementsCount + reactionsCount);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },

  render(reactionCount, waveIncrement) {
    d3.select('#bar')
      .transition()
      .duration(1250)
      .attr({
        "y": waveIncrement ? this.calY(reactionCount) : this.calY(reactionCount + 5),
        "height": waveIncrement ? this.calHeight(reactionCount) : this.calHeight(reactionCount + 5)
      })
  },

  flash() {
    d3.select('#barFlash')
      .transition().duration(200)
        .attr({'fill-opacity': 0.5})
      .transition().duration(200)
        .attr({'fill-opacity': 0.0});
  },

  attached(){
    this.waveIncrement = true;
    setInterval(()=>{
      this.set("waveIncrement", !this.waveIncrement)
    }, 1250);
  },

  calY(count){
    return 400 - (count / this.maxCount) * 400.0;
  },

  calHeight(count){
    return (count / this.maxCount) * 400.0
  },

  gaugeTopPosition(){
    const gaugeRect = this.getBoundingClientRect();
    const t = Math.min(this.reactionCount / this.maxCount, this.maxCount);
    return {
      x: (gaugeRect.left + gaugeRect.right) * 0.5,
      y: gaugeRect.bottom * (1 - t) + gaugeRect.top * t,
    };
  }

})
