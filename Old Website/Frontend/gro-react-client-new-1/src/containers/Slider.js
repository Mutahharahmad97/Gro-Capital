import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sliderActions } from 'actions/sliderActions';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: 20px;
`;

const List = styled.div`
  width: ${props => (props.initWidth * props.count)}px;
  transform: translateX(-${props => (props.width * props.active)}px);
  transition-timing-function: ease-in-out;
  transition-duration: 0.8s;
`;

const Item = styled.div`
  display: inline-block;
  position: relative;
  float: left;
  padding: 0 30px;
  width: ${props => props.width}px;
  min-width: 315px;
  min-height: 600px;
`;

const Display = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${props => props.width || "560"}px;
  padding: 1px;
`;

const BgLayer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 10;
  display: ${props => props.active ? 'none' : 'block'};
`;

class Slider extends Component {
  constructor(props) {
    super();
    this.state = {
      itemWidth: props.itemWidth
    };
    this.initWidth = props.itemWidth;
    this.countItems = props.children.length;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    window.addEventListener('resize', this.windowResize);
    this.windowResize(); // init resize
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResize);
  }

  windowResize = () => {
    if (window.innerWidth < this.initWidth) {
      this.setState({
        itemWidth: window.innerWidth
      });
    }
    if (this.state.itemWidth < this.initWidth && window.innerWidth > this.initWidth) {
      this.setState({
        itemWidth: this.initWidth
      });
    }
  };

  navigate = (direction) => {
    this.props.actions.updateSlide(this.props.activeSlide + (direction === 'next' ? 1 : -1), this.props.page);
  };

  applyNavEvents = (children) => {
    // Add the navigation function for the next and prev elements
    return React.Children.map(children, child => {
      let childProps = {};
      if (child.props && child.props['dataNav']) {
        childProps = {
          onClick: () => {
            this.navigate(child.props['dataNav']);
            if ('handleOnClick' in child.props) {
              child.props.handleOnClick();
            }
          }
        };
      }
      if (child.props) {
        childProps.children = this.applyNavEvents(child.props.children);
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  };


  handleKeyDown = evt => {
    // Disable tab key
    if (evt.keyCode === 9) {
      evt.preventDefault();
    }
  };

  render() {
    const children = this.applyNavEvents(this.props.children);
    return (
      <Container onKeyDown={this.handleKeyDown}>
        <Display width={this.state.itemWidth}>
          <List width={this.state.itemWidth} active={this.props.activeSlide} initWidth={this.initWidth} count={this.countItems} onKeyDown={this.handleKeyDown}>
            {children.map((child, index) => (
              <Item key={index} width={this.state.itemWidth} onKeyDown={this.handleKeyDown}>
                <BgLayer active={index === this.props.activeSlide} />
                {child}
              </Item>
            ))}
            <div style={{ clear: "both" }} />
          </List>
        </Display>
      </Container>
    );
  }
}

Slider.propTypes = {
  children: PropTypes.array.isRequired,
  actions: PropTypes.object,
  activeSlide: PropTypes.number,
  itemWidth: PropTypes.number,
  page: PropTypes.string.isRequired
};

function mapStateToProps({ slider }, ownProps) {
  return {
    activeSlide: slider[ownProps.page].currentSlide
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sliderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
