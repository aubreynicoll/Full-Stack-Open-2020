import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'butts and you',
    author: 'Pat the Butt',
    url: 'www.buttstuff.com',
    likes: 1,
    user: {
      username: 'bigbuttz69',
      name: 'Pat'
    }
  }
  const currentUser = 'BigButtz69'
  const handleLike = jest.fn()
  const handleRemoveBlog = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        currentUser={currentUser}
        handleLike={handleLike}
        handleRemoveBlog={handleRemoveBlog}
      />
    )
  })

  test('Blog renders title & author by default. Url & likes are hidden.', () => {
    const div = component.container.querySelector('.div')
    const togglableContent = component.container.querySelector('.togglableContent')

    expect(div).toHaveTextContent('butts and you')
    expect(div).toHaveTextContent('Pat the Butt')
    expect(togglableContent).toHaveStyle('display: none')
  })

  test('Url & likes are shown when the button is clicked', () => {
    const togglableContent = component.container.querySelector('.togglableContent')
    const button = component.getByText('show')

    expect(togglableContent).toHaveStyle('display: none')
    fireEvent.click(button)
    expect(togglableContent).not.toHaveStyle('display: none')
  })

  test('The like button calls likeBlog()', () => {
    const button = component.getByText('like')
    const loops = 2

    for (let i = 0; i < loops; i++) {
      fireEvent.click(button)
    }

    expect(handleLike.mock.calls).toHaveLength(loops)
  })
})