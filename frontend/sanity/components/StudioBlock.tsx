import React from 'react'

interface StudioBlockProps {
  children?: React.ReactNode;
  value?: { style?: string };
}

export function StudioBlock({ children, value }: StudioBlockProps) {

  if (!value) {
    return <p>{children}</p>
  }

  const {style} = value

  if (style === 'blockquote') {
    return (
      <blockquote style={{borderLeft: '2px solid #ccc', paddingLeft: '1em', marginLeft: 0, fontStyle: 'italic'}}>
        {children}
      </blockquote>
    )
  }

  if (style === 'h1') {
    return <h1>{children}</h1>
  }
  if (style === 'h2') {
    return <h2>{children}</h2>
  }
  if (style === 'h3') {
    return <h3>{children}</h3>
  }
  if (style === 'h4') {
    return <h4>{children}</h4>
  }

  // Fallback for 'normal' and other styles
  return <p>{children}</p>
}