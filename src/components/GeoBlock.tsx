import { useEffect, useState } from 'react'

export function GeoBlock({ children }: { children: React.ReactNode }) {
  const [blocked, setBlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code === 'IN') {
          setBlocked(true)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return null

  if (blocked) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#FAFAFA',
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '40px' }}>
          <img src="/polytrade_favicon.svg" width="48" style={{ marginBottom: '24px' }} />
          <h1 style={{ color: '#1D1D1D', fontSize: '22px', marginBottom: '12px' }}>
            Not Available in Your Region
          </h1>
          <p style={{ color: '#6B6B6B', fontSize: '15px', lineHeight: '1.6' }}>
            Polytrade is not currently available in India.
            We hope to expand to your region in the future.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
