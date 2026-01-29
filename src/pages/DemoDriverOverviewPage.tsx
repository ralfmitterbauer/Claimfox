import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'

const stateKey = 'DEMO_DRIVER_STATE'
const auditKey = 'DEMO_DRIVER_AUDIT'
const animKey = 'DEMO_DRIVER_ANIM_DONE'
const chatKey = 'DEMO_DRIVER_CHAT'

const resetDemo = () => {
  sessionStorage.removeItem(stateKey)
  sessionStorage.removeItem(auditKey)
  sessionStorage.removeItem(animKey)
  sessionStorage.removeItem(chatKey)
}

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/demo-driver/step/register', { replace: true })
  }, [navigate])

  return null
}
