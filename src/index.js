import React from "react";
import Bubbles from "./bubbles";
import PropTypes from "prop-types";

class ReactBubbleChart extends React.Component {
  render() {
    const {
      data,
      width,
      height,
      center,
      onClick,
      forceStrength,
      keepPositionIntactMultiplier
    } = this.props;
    return (
      <svg width={width} height={height}>
        <Bubbles
          data={data}
          forceStrength={forceStrength}
          center={center}
          keepPositionIntactMultiplier={keepPositionIntactMultiplier}
          onClick={d => onClick(d)}
        />
      </svg>
    );
  }
}

ReactBubbleChart.defaultProps = {
  data: [
    {
      index: 0,
      name: "A",
      value: "0",
      tooltip: "A",
      color: "#f48fb1",
      radius: 56
    },
    {
      index: 1,
      name: "B",
      value: "1",
      tooltip: "B",
      color: "#ffab91",
      radius: 34
    },
    {
      index: 2,
      name: "C",
      value: 2,
      tooltip: "C",
      color: "#b87fe9",
      radius: 32
    },
    {
      index: 3,
      name: "D",
      value: 3,
      tooltip: "D",
      color: "#64b5f6",
      radius: 32
    },
    {
      index: 4,
      name: "E",
      value: 4,
      tooltip: "E",
      color: "#4dd0e1",
      radius: 31.5
    },
    {
      index: 5,
      name: "F",
      value: 5,
      tooltip: "F",
      color: "#f48fb1",
      radius: 31
    },
    {
      index: 6,
      name: "G",
      value: 6,
      tooltip: "G",
      color: "#81c784",
      radius: 28
    },
    {
      index: 7,
      name: "H",
      value: 7,
      tooltip: "H",
      color: "#f48fb1",
      radius: 24
    },
    {
      index: 8,
      name: "I",
      value: 8,
      tooltip: "I",
      color: "#64b5f6",
      radius: 32
    }
  ],
  width: 400,
  height: 250,
  center: { x: 200, y: 125 },
  title: "React Bubble Chart",
  forceStrength: 0.06,
  keepPositionIntactMultiplier: 2.09
};
ReactBubbleChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  center: PropTypes.object,
  title: PropTypes.string.isRequired,
  forceStrength: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};
export default ReactBubbleChart;
