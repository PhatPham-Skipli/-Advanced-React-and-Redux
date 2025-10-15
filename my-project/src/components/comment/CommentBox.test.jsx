import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CommentBox from './CommentBox'
import CommentContext from '../../context/CommentContext'

describe('CommentBox', () => {
  it('renders textarea and button', () => {
    render(
      <CommentContext.Provider value={{ addComment: jest.fn() }}>
        <CommentBox />
      </CommentContext.Provider>
    )
    expect(screen.getByPlaceholderText(/write a comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add comment/i })).toBeInTheDocument()
  })

  it('calls addComment with correct data and clears textarea', () => {
    const addComment = jest.fn()
    render(
      <CommentContext.Provider value={{ addComment }}>
        <CommentBox />
      </CommentContext.Provider>
    )
    const textarea = screen.getByPlaceholderText(/write a comment/i)
    fireEvent.change(textarea, { target: { value: 'Hello world' } })
    fireEvent.click(screen.getByRole('button', { name: /add comment/i }))
    expect(addComment).toHaveBeenCalledWith(expect.objectContaining({ text: 'Hello world' }))
    expect(textarea.value).toBe('')
  })

  it('does not call addComment if textarea is empty', () => {
    const addComment = jest.fn()
    render(
      <CommentContext.Provider value={{ addComment }}>
        <CommentBox />
      </CommentContext.Provider>
    )
    fireEvent.click(screen.getByRole('button', { name: /add comment/i }))
    expect(addComment).not.toHaveBeenCalled()
  })
})