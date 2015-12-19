var SizePicker = function (id) {
  this.sizePickerCanvas = document.getElementById(id);
  this.sizePickerContext = this.sizePickerCanvas.getContext('2d');
  var pickerImg = new Image();
  pickerImg.src = './triangle.png';
  pickerImg.onload = function() {
    this.sizePickerContext.drawImage(pickerImg, 0, 0);
  }.bind(this);
};

SizePicker.prototype.pickSize = function (e) {
  var x = e.clientX - this.sizePickerCanvas.offsetLeft - this.sizePickerCanvas.offsetParent.offsetParent.offsetLeft
                    - this.sizePickerCanvas.offsetParent.offsetLeft - this.sizePickerCanvas.offsetParent.offsetParent.offsetParent.offsetLeft;
  console.log(x);
  return (x-35) * 52 / 423;
};


module.exports = SizePicker;
