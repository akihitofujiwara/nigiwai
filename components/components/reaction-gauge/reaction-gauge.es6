class ReactionGauge {
  get is() { return "reaction-gauge" }

  update(reactionCount) {
    this.reactionCount = reactionCount
  }

  attached(){
    this.reactionCount = 0;
    this.waveIncrement = true;
    setInterval(()=>{
      d3.select('#bar')
        .transition()
        .duration(1000)
        .attr({
          "y": this.waveIncrement ? this.calY(this.reactionCount) : this.calY(this.reactionCount + 10),
          "height": this.waveIncrement ? this.calHeight(this.reactionCount) : this.calHeight(this.reactionCount + 10)
        })
      this.waveIncrement = !this.waveIncrement
    }, 1000);
  }

  calY(count){
    return 400 - (count / 500.0) * 400.0;
  }

  calHeight(count){
    return (count / 500.0) * 400.0
  }
}

Polymer(ReactionGauge.prototype)

