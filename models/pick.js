var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});


var pickSchema = new Schema({
  picker: {
    type: String
  },
  title: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  }, mpaaRating: String,
  nowShowing: { type: Boolean, default: false },
  reviews: [reviewSchema],
  cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}]
}, {
  timestamps: true
});


module.exports = mongoose.model('Pick', pickSchema);