const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? undefined
    : blogs.reduce((rsf, blog) => rsf.likes >= blog.likes ? rsf : blog)
}

const mostBlogs = (blogs) => {
  blogs = _.countBy(blogs, 'author')
  blogs = _.toPairs(blogs)
  blogs = blogs.map(blog => {return { author: blog[0], blogs: blog[1] }})

  return blogs.length === 0
    ? undefined
    : blogs.reduce((rsf, blog) => rsf.blogs >= blog.blogs ? rsf : blog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}