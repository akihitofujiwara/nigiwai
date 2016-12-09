Polymer({
  is: "reaction-gauge",

  observers: [
    "setReactionCount(room)",
    "render(reactionCount, waveIncrement)"
  ],

  setReactionCount(room) {
    if (!(room && room.reactions)) return
    this.set("reactionCount", Object.values(room.reactions).length)
  },

  render(reactionCount, waveIncrement) {
    d3.select('#bar')
      .transition()
      .duration(1000)
      .attr({
        "y": waveIncrement ? this.calY(reactionCount) : this.calY(reactionCount + 10),
        "height": waveIncrement ? this.calHeight(reactionCount) : this.calHeight(reactionCount + 10)
      })
  },

  attached(){
    this.waveIncrement = true;
    setInterval(()=>{
      this.set("waveIncrement", !this.waveIncrement)
    }, 1000);
  },

  calY(count){
    return 400 - (count / 500.0) * 400.0;
  },

  calHeight(count){
    return (count / 500.0) * 400.0
  },
})

