import { useState } from 'react';
import './ProgressBar.css';

function ProgressBar({ value }) {
  const [percentage, setPercentage] = useState(null);

  setTimeout(() => {
    setPercentage(value);
  }, 200);

  return (
    <div className="progress-bar">
      <div
        className={`progress-bar-filled centered-content ${percentage === 0 ? 'no-value' : ''}`}
        style={{ width: percentage !== 0 ? `${percentage}%` : '' }}
      >
        {`${percentage?.toFixed(2)}%`}
      </div>
    </div>
  )
}

export default ProgressBar;