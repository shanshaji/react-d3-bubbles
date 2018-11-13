import React from "react";
import * as d3 from "d3";
import tooltip from "./tooltip";

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.renderBubbles = this.renderBubbles.bind(this);
    this.simulation = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(center.x)
      )
      .force(
        "y",
        d3
          .forceY()
          .strength(forceStrength)
          .y(center.y)
      )
      .force("charge", d3.forceManyBody().strength(this.charge.bind(this)))
      .on("tick", this.ticked.bind(this))
      .stop();
  }

  state = {
    g: null
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  onRef = ref => {
    this.setState(
      {
        g: d3.select(ref)
      },
      () => this.renderBubbles()
    );
  };

  ticked = () => {
    this.state.g
      .selectAll(".bubble")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    this.state.g
      .selectAll(".label")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);
  };

  charge = d => {
    let { keepPositionIntactMultiplier } = this.props,
      multiplier = Math.random() * (2.2 - 2.1) + 2.1;
    if (keepPositionIntactMultiplier) multiplier = keepPositionIntactMultiplier;

    return -this.props.forceStrength * d.radius ** multiplier;

    // return -this.props.forceStrength * d.radius ** 2.06;
  };

  renderBubbles() {
    const bubbles = this.state.g
      .selectAll(".bubble")
      .data(this.props.data, d => d.id);

    bubbles.exit().remove();

    const bubblesE = bubbles
      .enter()
      .append("a")
      .attr("xlink:href", d => d.link)
      .append("circle")
      .classed("bubble", true)
      .attr("r", 0)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.color)
      .on("mouseover", showDetail)
      .on("mouseout", hideDetail)
      .on(
        "click",
        function(d) {
          this.props.onClickCallBack(d);
        }.bind(this)
      );
    const labels = bubbles
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .classed("label", true)
      .html(function(d) {
        if (d.value && d.name) {
          return `<tspan x=0 y=-20 dy="1em" font-weight='bold'>${
            d.value
          }</tspan>
                  <tspan x=0 y=-4 dy="1.2em">${d.name}</tspan>`;
        }
        if (d.value && !d.name) {
          return `<tspan x=0 y=-6 dy="1em" font-weight='bold'>${
            d.value
          }</tspan>`;
        }
        if (d.name && !d.value) {
          return `<tspan x=0 y=-6 dy="1em">${d.name}</tspan>`;
        }
      })
      .on("mouseover", (d, i) => showDetailLabelHover(d, i, this.state.g))
      .on("mouseout", hideDetailLabelHover);
    labels.transition().duration(0);
    bubblesE
      .transition()
      .duration(0)
      .attr("r", d => d.radius)
      .on("end", () => {
        this.simulation
          .nodes(this.props.data)
          .alpha(1)
          .restart();
      });
  }

  render() {
    return <g ref={this.onRef} className="bubbles" />;
  }
}

export function showDetail(d) {
  d3.select(this).attr("fill", d3.rgb(d.color).darker(0.5));
  if (!d.tooltip) return;
  const content = `<span class="value">${d.tooltip}</span><br/>`;
  tooltip.showTooltip(content, d3.event);
}

export function hideDetail(d) {
  d3.select(this).attr("fill", d3.rgb(d.color));
  if (!d.tooltip) return;
  tooltip.hideTooltip();
}
export function showDetailLabelHover(d, index, g) {
  let elem = g.selectAll(".bubble").filter(function(d, i) {
    return i === index;
  });
  elem.attr("fill", d3.rgb(d.color).darker(0.5));
  if (!d.tooltip) return;
  const content = `<span class="value">${d.tooltip}</span><br/>`;
  tooltip.showTooltip(content, d3.event);
}

export function hideDetailLabelHover(d) {
  if (!d.tooltip) return;
  tooltip.hideTooltip();
}
