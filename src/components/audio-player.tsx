"use client";
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react'

const formatTime = (seconds = 0) => {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const CustomSlider = ({ value, onChange }) => (
  <motion.div
    style={{
      position: 'relative', width: '100%', height: '4px',
      background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', cursor: 'pointer',
    }}
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const pct = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100)
      onChange(pct)
    }}
  >
    <motion.div
      style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#fff', borderRadius: '9999px' }}
      animate={{ width: `${value}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  </motion.div>
)

const iconBtn = (active = false) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '32px', height: '32px', borderRadius: '50%', border: 'none',
  cursor: 'pointer',
  background: active ? 'rgba(17,17,17,0.82)' : 'transparent',
  color: '#fff', flexShrink: 0,
})

export default function AudioPlayer({ tracks, audioRef, album, artist }) {
  const [idx, setIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const isPlayingRef = useRef(false)

  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = tracks[idx].src
    audio.load()
    setProgress(0); setCurrentTime(0); setDuration(0)
    if (isPlayingRef.current) audio.play().catch(() => setIsPlaying(false))
  }, [idx]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play() }
      else if (idx < tracks.length - 1) setIdx(i => i + 1)
      else { setIsPlaying(false); setProgress(0); setCurrentTime(0) }
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioRef, idx, isRepeat, tracks.length])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { try { await audio.play(); setIsPlaying(true) } catch (_) {} }
  }

  const handleSeek = (value) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const time = (value / 100) * audio.duration
    if (isFinite(time)) { audio.currentTime = time; setProgress(value) }
  }

  const selectTrack = (i) => {
    if (i === idx) togglePlay()
    else { setIsPlaying(true); setIdx(i) }
  }

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          borderRadius: '24px', overflow: 'hidden',
          background: 'rgba(17,17,17,0.6)',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(8px)',
          padding: '12px',
          width: '100%',
        }}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1, type: 'spring' }}
        layout
      >
        <audio ref={audioRef} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* Album + artist */}
          {album && (
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', textAlign: 'center', margin: '4px 0 0' }}>
              {album}
            </h3>
          )}
          {artist && (
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>
              {artist}
            </p>
          )}

          {/* Slider + time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
            <CustomSlider value={progress} onChange={handleSeek} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontSize: '0.8125rem' }}>{formatTime(currentTime)}</span>
              <span style={{ color: '#fff', fontSize: '0.8125rem' }}>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(17,17,17,0.6)', borderRadius: '16px', padding: '8px',
            }}>
              {[
                { icon: <Shuffle size={20} />, onClick: () => setIsShuffle(s => !s), active: isShuffle },
                { icon: <SkipBack size={20} />, onClick: () => setIdx(i => Math.max(0, i - 1)) },
                { icon: isPlaying ? <Pause size={20} /> : <Play size={20} />, onClick: togglePlay },
                { icon: <SkipForward size={20} />, onClick: () => setIdx(i => Math.min(tracks.length - 1, i + 1)) },
                { icon: <Repeat size={20} />, onClick: () => setIsRepeat(r => !r), active: isRepeat },
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); btn.onClick() }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={iconBtn(btn.active)}
                >
                  {btn.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Track list */}
        <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          {tracks.map((t, i) => (
            <button
              key={i}
              onClick={() => selectTrack(i)}
              style={{
                width: '100%', border: 'none', cursor: 'pointer',
                padding: '8px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '10px',
                background: i === idx ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                color: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem', minWidth: '16px', textAlign: 'center',
              }}>
                {i === idx && isPlaying ? '▶' : i + 1}
              </span>
              <span style={{
                color: i === idx ? '#fff' : 'rgba(255,255,255,0.55)',
                fontSize: '0.8125rem', fontWeight: i === idx ? 600 : 400,
                flex: 1, textAlign: 'left',
              }}>
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
