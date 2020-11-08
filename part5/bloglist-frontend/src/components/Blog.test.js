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
  const likeBlog = jest.fn()
  const removeBlog = jest.fn()
  const createdByUser = true
  let component

  beforeEach(() => {
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
})