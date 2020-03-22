import { useEffect, useState } from 'react';
import Tabletop from 'tabletop';

export default function useChangers() {
  const [changers, setChangers] = useState({});

  useEffect(() => {
    Tabletop.init({
      key: process.env.REACT_APP_GOOGLE_KEY,
      callback: googleData => {
        const filteredData = googleData.filter(
          data => data.ready === 'TRUE' && data.name.length > 0
        );
        setChangers(filteredData);
      },
      simpleSheet: true
    });
  }, []);

  return changers;
}
