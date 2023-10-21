import React, { useState } from 'react';
import { MdOutlineBugReport } from 'react-icons/md';
import Report from '../pages/report';

function NavbarMenu() {
  const [reportScreen, setReportScreen] = useState(false);

  return (
    <>
      {reportScreen && <Report onClickBg={() => setReportScreen(false)} />}

      <div
        style={{
          zIndex: 1000,
          position: 'absolute',
          marginLeft: 245,
          marginTop: 20,
        }}
      >
        <ul
          style={{
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 5px 8px 0 #1f26875e',
            backdropFilter: 'blur(3px)',
            listStyle: 'none',
            textDecoration: ' none',
            padding: 0,
          }}
        >
          <li
            style={{
              width: 80,
              paddingTop: '7px',
              paddingBottom: '7px',
              paddingLeft: '10px',
              fontSize: 12,
              display: 'flex',
              cursor: 'pointer',
            }}
            onClick={() => setReportScreen(true)}
          >
            <MdOutlineBugReport
              size={18}
              style={{
                cursor: 'pointer',
              }}
            />
            Reportar
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarMenu;
