var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil');

var DrawingListItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return({
      hover: false
    });
  },
  goToShow: function() {
    this.history.push('drawings/' + this.props.drawingId);
  },
  deleteDrawing: function() {
    $.ajax({
      url: "api/drawings/" + this.props.drawingId,
      method: "DELETE",
      success: function(message) {
        console.log(message.message);
        console.log("delete successful");
      },
      error: function(message) {
        console.log(message.message);
      }
    });
  },
  enhover: function() {
    this.setState({hover: true});
  },
  dehover: function() {
    this.setState({hover: false});
  },
  goToUser: function(e) {
    e.stopPropagation();
    var username = this.props.drawing.username;
    this.history.push('users/' + username);
  },
  toggleLike: function(e) {
    e.stopPropagation();
    if (!this.props.drawing.liked_by_current_user){
      ApiUtil.likeDrawing(this.props.drawing.id);
    }
    if (this.props.drawing.liked_by_current_user) {
      ApiUtil.unlikeDrawing(this.props.drawing.current_like_id);
    }
  },
  render: function() {
    var drawingAuthor = (this.state.hover ? "drawing-author" : "hidden");
    var drawingLikesCount = (this.state.hover ? "drawing-likes-count" : "hidden");
    var likeDrawingClass = (this.state.hover ? "like-drawing-class" : "hidden");
    var likeText = (this.props.drawing.liked_by_current_user ? "Unlike" : "Like");
    var timeAgo = this.props.drawing.time_ago;
    if (timeAgo.slice(0,5) === "about") {
      timeAgo = timeAgo.slice(6);
    }
    var url = "http://res.cloudinary.com/ddhru3qpb/image/upload/w_500,h_500/" + this.props.imageUrl + ".png";
    return (
      <div className="index-element"
            onClick={this.goToShow}
            onMouseEnter={this.enhover}
            onMouseLeave={this.dehover}>
        <img src={url}/>
        <div
          className={drawingAuthor}
          onClick={this.goToUser}>
          {this.props.drawing.username}
          <br/>
          {timeAgo}
        </div>
        <div className="drawing-likes-box">
          <div
            className={drawingLikesCount}>
            {this.props.drawing.likes.length} Likes
          </div>
          <div
            className={likeDrawingClass}
            onClick={this.toggleLike}>
            {likeText}
          </div>
        </div>

        <div className="delete"
          onClick={this.deleteDrawing}>
          Delete
        </div>
      </div>
    );
  }
});

module.exports = DrawingListItem;
