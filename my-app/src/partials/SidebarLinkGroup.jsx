import React, { useState } from 'react';

const SidebarLinkGroup = ({ children, activecondition }) => {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li 
      className={`
        pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 
        transition-all duration-150 ease-in-out
        ${activecondition ? 
          'bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200' : 
          'hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-violet-500/5 dark:hover:from-violet-500/20 dark:hover:to-violet-500/10'
        }
      `}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;