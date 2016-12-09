class ReactionGauge {
  get is() { return "reaction-gauge" }

  update(reactionCount) {
    d3.select('#bar')
      .transition()
      .attr({
        "y": 400 - reactionCount,
        "height": reactionCount
      })
  }
}

Polymer(ReactionGauge.prototype)

