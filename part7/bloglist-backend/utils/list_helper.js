
const dummy = (blogs) => {
  return blogs
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => acc + val.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? undefined
    : blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let results = []

  blogs.forEach(blog => {
    if (results.length === 0 || results.every(result => result.author !== blog.author)) {
      results = results.concat({ author: blog.author, blogs: 1 })
    } else {
      results = results.map(result => result.author === blog.author ? { ...result, blogs: result.blogs + 1 } : result)
    }
  })

  return results.reduce((rsf, nextResult) => rsf.blogs > nextResult.blogs ? rsf : nextResult)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let results = []

  blogs.forEach(blog => {
    if (results.length === 0 || results.every(result => result.author !== blog.author)) {
      results = results.concat({ author: blog.author, likes: blog.likes })
    } else {
      results = results.map(result => result.author === blog.author ? { ...result, likes: result.likes + blog.likes } : result)
    }
  })
  return results.reduce((rsf, nextResult) => rsf.likes > nextResult.likes ? rsf : nextResult)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}