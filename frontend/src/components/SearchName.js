import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchName = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='mb-5'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Book name'
        className='mr-sm-2 ml-sm-5 w-sm-auto'
        style={{width: "120px"}}
      ></Form.Control>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Author'
        className='mr-sm-2 ml-sm-5 w-sm-auto'
        style={{width: "120px"}}
      ></Form.Control>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Genre'
        className='mr-sm-2 ml-sm-5 w-sm-auto'
        style={{width: "120px"}}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2' hidden>
      </Button>
    </Form>
  )
}

export default SearchName
