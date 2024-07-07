import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${({ theme }) => theme.text}; ;
`

const Help = () => {
  return (
    <Container>
      <h1>
        HELP IS COMING...
        HOLD ON!
      </h1>
    </Container>
  )
}

export default Help
