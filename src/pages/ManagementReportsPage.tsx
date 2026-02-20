import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ManagementReportsPage() {
  const navigate = useNavigate()

  return (
    <section className="page" style={{ gap: '1.25rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card title="Management Reports" subtitle="Executive intelligence workspace">
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <p style={{ margin: 0, color: '#475569' }}>Open executive strategy and competitor reports.</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={() => navigate('/transport-market-report')}>
                Allianz/VHV
              </Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/strategy/loadsure-analysis')}>
                Loadsure
              </Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/strategy/wtw-analysis')}>
                WTW
              </Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/strategy/nmip-analysis')}>
                NMIP
              </Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/analysis/fbspl')}>
                FBSPL AI
              </Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/analysis/kairos')}>
                Kairos RS
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
