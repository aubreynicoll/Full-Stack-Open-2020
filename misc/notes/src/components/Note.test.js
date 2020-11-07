import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

const note = {
  content: 'rendering is done with the react-testing-library',
  important: true
}

test('renders content', () => {
  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent('rendering is done with the react-testing-library')

  const element = component.getByText('rendering is done with the react-testing-library')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent('rendering is done with the react-testing-library')
})

test('clicking the button calls the event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})