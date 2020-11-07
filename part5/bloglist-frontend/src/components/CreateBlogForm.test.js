import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  const handleCreateNew = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <CreateBlogForm
        handleCreateNew={handleCreateNew}
      />
    )
  })

  test('submitting the form calls handleCreateNew() with the proper data', () => {
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#Title')
    const authorInput = component.container.querySelector('#Author')
    const urlInput = component.container.querySelector('#Url')

    fireEvent.change(titleInput, { target: { value: 'buttz' } })
    fireEvent.change(authorInput, { target: { value: 'the dude' } })
    fireEvent.change(urlInput, { target: { value: 'www.buttstuff.com' } })
    fireEvent.submit(form)

    expect(handleCreateNew.mock.calls).toHaveLength(1)
    expect(handleCreateNew.mock.calls[0][0]).toBe('buttz')
    expect(handleCreateNew.mock.calls[0][1]).toBe('the dude')
    expect(handleCreateNew.mock.calls[0][2]).toBe('www.buttstuff.com')
  })
})