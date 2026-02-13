import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listTasks, updateTaskStatus } from '@/claimsfox/api/claimsfoxApi'
import type { Task } from '@/claimsfox/types'

const columns: Array<{ key: Task['status']; labelKey: string }> = [
  { key: 'open', labelKey: 'claimsfox.tasks.status.open' },
  { key: 'inProgress', labelKey: 'claimsfox.tasks.status.inProgress' },
  { key: 'blocked', labelKey: 'claimsfox.tasks.status.blocked' },
  { key: 'done', labelKey: 'claimsfox.tasks.status.done' }
]

export default function ClaimsfoxTasksPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const locale = lang === 'de' ? 'de-DE' : 'en-US'

  function localizeTaskTitle(value: string) {
    if (lang === 'de') return value.replace(/^Follow-up\b/, 'Nachverfolgung')
    return value.replace(/^Nachverfolgung\b/, 'Follow-up')
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listTasks(ctx)
      if (!mounted) return
      setTasks(data)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const grouped = useMemo(() => {
    const map: Record<string, Task[]> = {}
    tasks.forEach((task) => {
      map[task.status] = map[task.status] ?? []
      map[task.status].push(task)
    })
    return map
  }, [tasks])

  async function advance(task: Task) {
    const nextStatus: Task['status'] = task.status === 'open'
      ? 'inProgress'
      : task.status === 'inProgress'
        ? 'done'
        : task.status === 'blocked'
          ? 'inProgress'
          : 'done'
    await updateTaskStatus(ctx, task.id, nextStatus)
    const data = await listTasks(ctx)
    setTasks(data)
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.tasks.title')} subtitle={t('claimsfox.tasks.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {columns.map((column) => (
          <Card key={column.key} title={t(column.labelKey)}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {(grouped[column.key] ?? []).map((task) => (
                <div key={task.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem', display: 'grid', gap: '0.35rem' }}>
                  <div style={{ fontWeight: 600 }}>{localizeTaskTitle(task.title)}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{task.owner}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{new Date(task.dueAt).toLocaleDateString(locale)}</div>
                  {task.status !== 'done' && (
                    <Button size="sm" variant="secondary" onClick={() => advance(task)}>{t('claimsfox.tasks.advance')}</Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </ClaimsfoxLayout>
  )
}
