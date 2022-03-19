import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageTitle from 'components/PageTitle';
import Masonry from 'components/Mansonry';
import TargetPieChart from 'components/TargetPieChart';
import ResourceItem from 'components/ResourceItem';
import { scoreActions } from 'actions/scoreActions';

class ResourcesPage extends React.Component {

  componentDidMount() {
    this.props.actions.getScore();
  }

  render() {
      return (
          <React.Fragment>
            <PageTitle>RESOURCES</PageTitle>
            <Masonry>
              <TargetPieChart type="big" levelValue={10} score={this.props.score}/>
              <ResourceItem status={true} points={1} text={"Get the Gro Chrome Plugin."}/>
              <ResourceItem points={1} text={"Maintain three months in a row of at least $5,000 in revenue."}/>
              <ResourceItem points={1} text={"Have a key team member who has launched a company before"}/>
              <ResourceItem points={2} status={true} text={"Get your company's Instagram account to 10,000 or more followers."}/>
              <ResourceItem points={1} text={"Having a functioning prototype in the market."}/>
              <ResourceItem points={10} text={"Get a patent on IP."}/>
              <ResourceItem points={3} text={"Some really long, complicated task that you need to complete so that you can see that cards get longer if the text gets longer."}/>
              <ResourceItem points={1} text={"Maintain three months in a row of at least $2.500 in revenue."}/>
              <ResourceItem points={1} text={"Another really long, complicated task that you need to complete so that you can see that cards get longer even when green."}/>
              <ResourceItem points={1} text={"A short milestone."}/>
              <ResourceItem points={1} text={"Have a trademark on your company's name and logo"}/>
            </Masonry>
          </React.Fragment>
        );
    }
}

ResourcesPage.propTypes = {
  score: PropTypes.number,
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    score: state.score.value
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...scoreActions };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesPage);
