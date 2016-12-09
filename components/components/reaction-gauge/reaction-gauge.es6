Polymer({
  is: "reaction-gauge",
  maxCount: 500,

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
      .duration(1250)
      .attr({
        "y": waveIncrement ? this.calY(reactionCount) : this.calY(reactionCount + 5),
        "height": waveIncrement ? this.calHeight(reactionCount) : this.calHeight(reactionCount + 5)
      })
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
