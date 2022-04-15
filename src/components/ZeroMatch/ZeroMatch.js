import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { PAGE_NOT_FOUND } from '../../utilities/NotFound';

function ZeroMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { state: { reason: PAGE_NOT_FOUND } });
  }, [navigate]);

  return (
    <div></div>
  );
}

export default ZeroMatch;