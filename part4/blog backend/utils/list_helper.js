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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}