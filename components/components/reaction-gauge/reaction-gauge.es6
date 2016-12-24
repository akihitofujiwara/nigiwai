Polymer({
  is: "reaction-gauge",
  maxCount: 500,

  properties: {
    waveIncrement: {
      value: true
    }
  },

  observers: [
    "setReactionCount(room)",
    "render(reactionCount, waveIncrement)"
  ],

  setReactionCount(room = {}) {
    this.debounce("setReactionCount", ()=> {
      let { comments = {}, reactions = {} } = room
      let commentsCount = Object.keys(comments).length;
      let agreementsCount = Object.values(comments).reduce( (pre, current, index, array) => {
        return (current.agreements && Object.keys(current.agreements).length || 0) + pre
      }, 0)
      let reactionsCount = Object.keys(reactions).length;
      this.set("reactionCount", commentsCount + agreementsCount + reactionsCount);
    }, 300)
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

  attached() {
    this.wave()
  },

  detached() {
    this.stopWave()
  },

  wave() {
    this.set("waveId", this.async(()=> {
      this.set("waveIncrement", !this.waveIncrement)
      this.wave()
    }, 1250))
  },

  stopWave() {
    this.cancelAsync(this.waveId)
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
