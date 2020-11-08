import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'React is fun!',
    author: 'The Zuck',
    url: 'www.facebook.com',
    likes: 1,
    user: {
      username: 'zuckburger',
      name: 'morpheus'
    }
  }
  let likeBlog
  let removeBlog
  let createdByUser
  let component

  beforeEach(() => {
    likeBlog = jest.fn()
    removeBlog = jest.fn()
    createdByUser = true
    
    component = render(
      <Blog 
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        createdByUser={createdByUser}
      />
    )
  })

  test('renders title and author by default', () => {
    const div = component.container.querySelector('.div')
    const togglableContent = component.container.querySelector('.togglableContent')

    expect(div).toHaveTextContent('React is fun!')
    expect(div).toHaveTextContent('The Zuck')

    expect(togglableContent).toHaveStyle('display: none')
  })

  test('renders url and likes when the toggle button is clicked', () => {
    const togglableContent = component.container.querySelector('.togglableContent')
    const toggleButton = component.container.querySelector('.toggleBlogDetailsButton')

    expect(togglableContent).toHaveStyle('display: none')
    fireEvent.click(toggleButton)
    expect(togglableContent).not.toHaveStyle('display: none')
  })

  test('when like button is clicked n times, handler is called n times', () => {
    const n = 2
    const likeButton = component.container.querySelector('.likeBlogButton')

    for (let count = 0; count < n; count++) {
      fireEvent.click(likeButton)
    }
    expect(likeBlog.mock.calls).toHaveLength(n)
  })
})