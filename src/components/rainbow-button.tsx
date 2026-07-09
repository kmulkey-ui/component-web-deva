"use client";
import './rainbow-button.css'

export default function RainbowButton({ href, children, target = '_blank', rel = 'noopener noreferrer', onClick }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      onClick={onClick}
      className="rainbow-border"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '0 28px',
        height: '48px',
        background: '#000',
        borderRadius: '12px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: '0.9rem',
        textDecoration: 'none',
        letterSpacing: '0.02em',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Tag>
  )
}
