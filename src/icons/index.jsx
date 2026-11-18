const paths = {
  fish: 'M2 8l3 4-3 4M5 12c2.5-3.5 6-5.5 9.5-5.5S20 9 22 12c-2 3-4 5.5-7.5 5.5S7.5 15.5 5 12zM16 11.5h.01',
  farm: 'M3 10l9-6 9 6v10H3zM9 20v-6h6v6',
  sausage: 'M5 19c-2-2-1-5 2-8l4-4c3-3 6-4 8-2s1 5-2 8l-4 4c-3 3-6 4-8 2zM4 20l-1 1M20 4l1-1',
  dumpling: 'M3 14c0-4 4-8 9-8s9 4 9 8c0 2-2 3-9 3s-9-1-9-3zM8 7l1 3M12 6v4M16 7l-1 3',
  egg: 'M12 3c4 0 7 6 7 11a7 7 0 0 1-14 0c0-5 3-11 7-11z',
  leaf: 'M5 20c0-9 5-15 15-15 0 10-6 15-14 15M5 20l8-8',
  sack: 'M8 4h8l-2 4h-4zM10 8c-4 2-6 6-6 9a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3c0-3-2-7-6-9',
  apple: 'M12 7c-3-2-8-1-8 5 0 5 3 9 5 9 1 0 2-1 3-1s2 1 3 1c2 0 5-4 5-9 0-6-5-7-8-5zM12 7c0-2 1-4 3-4',
  milk: 'M8 3h8v3l2 3v12H6V9l2-3zM6 12h12M8 6h8',
  cake: 'M4 21h16v-9H4zM4 15c2 1 4 1 6 0s4-1 6 0 4 1 4 0M12 12V8M12 5v.01',
  candy: 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0M8.5 9.5L4 6l-1 4 3 1M15.5 14.5L20 18l1-4-3-1',
  icecream: 'M7 11a5 5 0 0 1 10 0zM7 11l5 11 5-11',
  coffee: 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3',
  chips: 'M6 3h12l-1 3 1 3-1 3 1 3-1 3 1 3H6l1-3-1-3 1-3-1-3 1-3z',
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4-4',
  arrow: 'M7 17L17 7M8 7h9v9',
  chevron: 'M6 9l6 6 6-6',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
  sun: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M17.5 6.5h.01',
  youtube: 'M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zM10 9l5 3-5 3z',
  star: 'M12 3l2.5 6 6.5.5-5 4.3 1.6 6.4L12 16.8 6.4 20.2 8 13.8 3 9.5l6.4-.5z',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  team: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6M3 20c0-3 3-5 6-5s6 2 6 5M15 15c3 0 6 2 6 5',
  check: 'M5 12l5 5 9-10',
}

export function Icon({ name, className = 'size-5', strokeWidth = 1.7, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
      <path d={paths[name]} />
    </svg>
  )
}