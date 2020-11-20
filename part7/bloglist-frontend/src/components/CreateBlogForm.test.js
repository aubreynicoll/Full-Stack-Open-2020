import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  let createBlog
  let component

  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      <CreateBlogForm 
        createBlog={createBlog}
      />
    )
  })

  test('createBlog is called with the correct details', () => {
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, { target: { value: 'moshpit mishaps' } })
    fireEvent.change(authorInput, { target: { value: 'hogan' } })
    fireEvent.change(urlInput, { target: { value: 'www.com' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0]).toHaveLength(3)
    expect(createBlog.mock.calls[0][0]).toBe('moshpit mishaps')
    expect(createBlog.mock.calls[0][1]).toBe('hogan')
    expect(createBlog.mock.calls[0][2]).toBe('www.com')
  })
})