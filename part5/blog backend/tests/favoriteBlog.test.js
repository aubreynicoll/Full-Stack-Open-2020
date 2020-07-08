const { favoriteBlog } = require('../utils/list_helper')

describe('favorite blog', () => {
  test('of a single blog', () => {
    const blogs = [
      {
        _id: '5ef1c2871f8112401ed1466e',
        title: '11 Music Blogs You Should Follow in 2019',
        author: 'some dude',
        url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
        likes: 5,
        __v: 0
      }
    ]

    const fav = {
      _id: '5ef1c2871f8112401ed1466e',
      title: '11 Music Blogs You Should Follow in 2019',
      author: 'some dude',
      url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
      likes: 5,
      __v: 0
    }

    expect(favoriteBlog(blogs)).toEqual(fav)
  })

  test('of many blogs', () => {
    const blogs = [
      {
        _id: '5ef1c2871f8112401ed1466e',
        title: '11 Music Blogs You Should Follow in 2019',
        author: 'some dude',
        url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
        likes: 5,
        __v: 0
      },
      {
        _id: '5ef1cbe713f58b433106112b',
        title: 'Buxom Babes Strike Back Against The Machine',
        author: 'me',
        url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
        likes: 9001,
        __v: 0
      }
    ]

    const fav = {
      _id: '5ef1cbe713f58b433106112b',
      title: 'Buxom Babes Strike Back Against The Machine',
      author: 'me',
      url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
      likes: 9001,
      __v: 0
    }

    expect(favoriteBlog(blogs)).toEqual(fav)
  })

  test('of empty array', () => {
    const blogs = []
    const fav = undefined

    expect(favoriteBlog(blogs)).toEqual(fav)
  })
})