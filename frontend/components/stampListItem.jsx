var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');
var ApiActions = require('../actions/apiActions');

var StampListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({

    });
  },
  setStamp: function() {
    ApiUtil.addToMyStamp(this.props.stampId);
  },
  render: function() {
    var size = this.props.size;
    var sizeString = "w_"+size+",h_"+size+"/";
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/" + sizeString + this.props.imageUrl + ".png";
    return (
      <div className="index-element">
        <img src={url}
          onClick={this.setStamp}/>
      </div>
    );
  }
});

module.exports = StampListItem;
