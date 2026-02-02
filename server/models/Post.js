const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Please add content']
    },
    excerpt: {
      type: String,
      required: [true, 'Please add an excerpt'],
      maxlength: [300, 'Excerpt cannot be more than 300 characters']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Security', 'Product Development', 'Industry Insights', 'Company News']
    },
    author: {
      type: String,
      default: 'Itara Pathos IT'
    },
    published: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);