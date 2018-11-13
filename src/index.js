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
      onClickCallBack,
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
          onClickCallBack={d => onClickCallBack(d)}
        />
      </svg>
    );
  }
}

ReactBubbleChart.defaultProps = {
  data: [],
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
