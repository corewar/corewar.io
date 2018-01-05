import React from 'react'

const RunProgressIndicator = ({ runProgress }) => (
  <div className={`progressBar`} style={{width: runProgress + '%' }}>
    {/* <span>{`${runProgress} %`}</span> */}
  </div>
)

export default RunProgressIndicator