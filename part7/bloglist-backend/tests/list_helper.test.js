const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

test('dummy returns blogs', () => {
  expect(dummy([])).toEqual([])
})

describe('total likes', () => {
  const blogs = [
    {
      likes: 1
    },
    {
      likes: 5
    },
    {
      likes: 20
    }
  ]
  test('empty list is 0', () => {
    expect(totalLikes([])).toBe(0)
  })
  test('one is equal to itself', () => {
    expect(totalLikes([{ likes: 1 }])).toBe(1)
  })
  test('longer lists are calculated correctly', () => {
    expect(totalLikes(blogs)).toBe(26)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'blog a',
      author: 'radioblog',
      likes: 10
    },
    {
      title: 'don\'t blog me now',
      author: 'bloggerqueen',
      likes: 100
    },
    {
      title: 'i\'m blog (ba da bee da bo da)',
      author: 'eiffel sixty-blog',
      likes: 0
    }
  ]

  test('an empty list is undefined', () => {
    expect(favoriteBlog([])).toEqual(undefined)
  })
  test('a single blog equals itself', () => {
    const singleBlog = { title: 'a', author: 'b', likes: 1 }
    expect(favoriteBlog([singleBlog])).toEqual(singleBlog)
  })
  test('a longer list is handled correctly', () => {
    expect(favoriteBlog(blogs)).toEqual({ title: 'don\'t blog me now', author: 'bloggerqueen', likes: 100 })
  })
})

describe('most blogs', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('an empty list returns undefined', () => {
    expect(mostBlogs([])).toEqual(undefined)
  })
  test('a single blog is handled correctly', () => {
    const singleBlog = [
      {
        title: 'blog a',
        author: 'radioblog',
        likes: 10
      }
    ]
    expect(mostBlogs(singleBlog)).toEqual({ author: 'radioblog', blogs: 1 })
  })
  test('a longer list is handled correctly', () => {
    expect(mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('an empty list returns undefined', () => {
    expect(mostLikes([])).toEqual(undefined)
  })
  test('a single blog is handled correctly', () => {
    const singleBlog = [
      {
        title: 'blog a',
        author: 'radioblog',
        likes: 10
      }
    ]
    expect(mostLikes(singleBlog)).toEqual({ author: 'radioblog', likes: 10 })
  })
  test('a longer list is handled correctly', () => {
    expect(mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})