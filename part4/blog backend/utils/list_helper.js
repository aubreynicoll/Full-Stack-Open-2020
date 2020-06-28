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
  if (blogs.length === 0) {
    return undefined
  }

  blogs = _.countBy(blogs, 'author')
  blogs = _.toPairs(blogs)
  blogs = blogs.map(blog => {
    return { author: blog[0], blogs: blog[1] }
  })

  return blogs.reduce((rsf, blog) => rsf.blogs >= blog.blogs ? rsf : blog)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let results = []

  blogs.forEach(blog => {
    if (results.length === 0 || !results.some(result => result.author === blog.author)) {
      results = results.concat({ author: blog.author, likes: blog.likes })
    }
    else {
      results = results.map(result => {
        return result.author === blog.author
          ? { author: result.author, likes: result.likes += blog.likes }
          : result
      })
    }
  })

  return results.reduce((rsf, result) => rsf.likes >= result.likes ? rsf : result)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}