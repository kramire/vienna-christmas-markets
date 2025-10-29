import React from 'react'

const ResultsListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul
      className="m-0 grid list-none justify-between gap-4 p-0 sm:gap-7 sm:gap-y-9"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', // TODO - need this responsive rather than auto-fit
      }}
    >
      {children}
    </ul>
  )
}

export default ResultsListWrapper
