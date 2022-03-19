import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin: -40px auto 0;
  text-align: center;
  max-width: 800px;
`;

const Display = styled.div`
  overflow: hidden;
`;

const Img = styled.div`
  border-radius: 50%;
  background: url(${props => props.src}) center center no-repeat;
  width: 150px;
  height: 150px;
  float: left;
  background-size: cover;
  overflow: hidden;
  margin-right: 30px;
`;

const NavImg = Img.extend`
  width: 40px;
  height: 40px;
  margin: 0 8px;
  cursor: pointer;
  box-sizing: border-box;
  border: ${props => props.activeIndex === props.index ? "3px":"0"} solid #03a9f4;
  opacity: ${props => props.activeIndex === props.index ? 1 : 0.5};
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
`;

const Text = styled.div`
  font-size: 20px;
  color: #424242;
`;

const Info = styled.div`
  font-size: 16px;
  color: #bdbdbd; 
`;

const Navigation = styled.div`
  margin: -20px auto 0;
  height: 40px;
  padding: 10px;
  display: inline-block;
`;

const TextWrapper = styled.div`
  padding: 10px;
`;

const Testimonial = styled.div`
  float: left;
  display: inline-block;
  width: ${props => (100 / props.itemsCount)}%;;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
`;

const Scroller = styled.div`
  overflow: hidden;
  display: inline-block;
  width: ${props => (props.itemsCount * 100)}%;
  transform: translateX(-${props => 100 / props.itemsCount * props.activeIndex}%);
  transition-timing-function: ease-in-out;
  transition-duration: 0.8s;
`;

class Testimonials extends Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  handleOnClick = (index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const length = this.props.items.length;
    return (
      <Wrapper>
        <Display>
          <Scroller itemsCount={length} activeIndex={this.state.activeIndex}>
            {this.props.items.map((el, index) => (
              <Testimonial key={index} itemsCount={length}>
                <Img src={el.img} />
                <TextWrapper>
                  <Text>{el.text}</Text>
                  <Info>{el.name} | {el.title}</Info>
                </TextWrapper>
              </Testimonial>
            ))}
          </Scroller>
        </Display>
        <Navigation>
          {this.props.items.map((el, index) =>
            <NavImg key={index} src={el.img} onClick={() => {this.handleOnClick(index);}} index={index} activeIndex={this.state.activeIndex}/>
          )}
        </Navigation>
      </Wrapper>
    );
  }
}

Testimonials.propTypes = {
  items: PropTypes.array.isRequired
};

export default Testimonials;
