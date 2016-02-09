var React = require('react');
var ApiUtil = require('../util/apiUtil');
var StampListItem = require('./stampListItem');
var StampStore = require('../stores/stampStore');
var getStampsTour = require('../util/getStampsTour');

var StampIndex = React.createClass({
  getInitialState: function() {
    return({
      stamps: null,
      comparator:
        function(a, b) {
          if (a.stamp_uses.length < b.stamp_uses.length) {
            return 1;
          } else if (a.stamp_uses.length === b.stamp_uses.length) {
            return 0;
          } else {
            return -1;
          }
        },
      selectedTab: "popularity"
    });
  },
  componentDidMount: function() {
    this.listener = StampStore.addListener(this._onChange);
    ApiUtil.fetchAllStamps();

    if (window.wholeDamnTour.currentStep && window.wholeDamnTour.currentStep.id === 'get-stamps') {
      window.setTimeout(function() {
        window.wholeDamnTour.next();
      }, 200);
    }

    this.setState({drawingsList: this.loader()})
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _onChange: function() {
    var allStamps = StampStore.all().reverse();
    this.setState({stamps: allStamps});
  },
  sortByNewest: function() {
    this.setState({drawingsList: this.loader()})
    var comparator =
      function(a, b) {
        if (a.created_at < b.created_at) {
          return 1;
        } else if (a.created_at === b.created_at) {
          return 0;
        } else {
          return -1;
        }
      };
    this.setState({
      comparator: comparator,
      selectedTab: "newest"
    });
  },
  sortByPopularity: function(e) {
    this.setState({drawingsList: this.loader()})
    var comparator =
      function(a, b) {
        if (a.stamp_uses.length < b.stamp_uses.length) {
          return 1;
        } else if (a.stamp_uses.length === b.stamp_uses.length) {
          return 0;
        } else {
          return -1;
        }
      };
    this.setState({
      comparator: comparator,
      selectedTab: "popularity"
    });
  },

  loader: function() {
    return (
      <div className="cssload-loading">
        <div className="cssload-dot"></div>
        <div className="cssload-dot2"></div>
      </div>
    )
  },

  render: function() {
    var popularitySelected =
      this.state.selectedTab === "popularity" ? "selected-tab" : "";
    var newestSelected =
      this.state.selectedTab === "newest" ? "selected-tab" : "";
    var stampsList = "";
    if (this.state.stamps) {
      var sortedStamps = this.state.stamps.sort(this.state.comparator);
      stampsList = sortedStamps.map(function(stamp, idx){
        return (
          <StampListItem
            key={idx}
            stampId={stamp.id}
            imageUrl={stamp.image_url}
            size={150}
            stamp={stamp}/>
        );
      });
    }
    return(
      <div className="index">
        <h1 className="index-header">
          <span
            className="index-tab"
            onClick={this.sortByPopularity}
            id={popularitySelected}>
            <span>
              Most Popular Stamps
            </span>
          </span>
          <span
            className="index-tab"
            onClick={this.sortByNewest}
            id={newestSelected}>
            <span>
              Newest Stamps
            </span>
          </span>
        </h1>
        <div className="index-contents">
          {stampsList}
        </div>
      </div>
    );
  }

});

module.exports = StampIndex;
