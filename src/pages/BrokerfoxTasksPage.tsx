import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import BrokerfoxLayout from '@/brokerfox/components/BrokerfoxLayout'
import Button from '@/components/ui/Button'
import DemoUtilitiesPanel from '@/brokerfox/components/DemoUtilitiesPanel'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { createTask, delegateTask, listClients, listContracts, listTasks, listTenders, listRenewals, updateTaskStatus } from '@/brokerfox/api/brokerfoxApi'
import type { TaskItem, TaskStatus } from '@/brokerfox/types'
import { localizePolicyName, localizeTenderTitle } from '@/brokerfox/utils/localizeDemoValues'

const columns: Array<{ key: TaskStatus; labelKey: string }> = [
  { key: 'todo', labelKey: 'brokerfox.tasks.todo' },
  { key: 'inProgress', labelKey: 'brokerfox.tasks.inProgress' },
  { key: 'done', labelKey: 'brokerfox.tasks.done' }
]

export default function BrokerfoxTasksPage() {
  const { lang, t } = useI18n()
  const ctx = useTenantContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [entityType, setEntityType] = useState<'client' | 'tender' | 'renewal' | 'contract'>('client')
  const [entityId, setEntityId] = useState('')
  const [entityOptions, setEntityOptions] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', description: '', ownerName: '', dueDate: '' })
  const [delegateDraft, setDelegateDraft] = useState<Record<string, string>>({})

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [taskData, clientData, tenderData, renewalData, contractData] = await Promise.all([
          listTasks(ctx),
          listClients(ctx),
          listTenders(ctx),
          listRenewals(ctx),
          listContracts(ctx)
        ])
        if (!mounted) return
        setTasks(taskData)
        setEntityOptions(clientData)
        setEntityId(clientData[0]?.id ?? contractData[0]?.id ?? '')
        setLoading(false)
      } catch {
        if (!mounted) return
        setError(t('brokerfox.state.error'))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [ctx, t])

  useEffect(() => {
    let mounted = true
    async function refreshOptions() {
      const [clientData, tenderData, renewalData, contractData] = await Promise.all([
        listClients(ctx),
        listTenders(ctx),
        listRenewals(ctx),
        listContracts(ctx)
      ])
      if (!mounted) return
      const options = entityType === 'client' ? clientData : entityType === 'tender' ? tenderData : entityType === 'contract' ? contractData : renewalData
      setEntityOptions(options)
      setEntityId(options[0]?.id ?? '')
    }
    refreshOptions()
    return () => { mounted = false }
  }, [ctx, entityType])

  const grouped = useMemo(() => {
    return columns.reduce<Record<string, TaskItem[]>>((acc, column) => {
      acc[column.key] = tasks.filter((task) => task.status === column.key)
      return acc
    }, {})
  }, [tasks])

  async function handleCreate() {
    if (!form.title.trim()) {
      return
    }
    const created = await createTask(ctx, {
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      status: 'todo',
      linkedEntityType: entityType,
      linkedEntityId: entityId || undefined,
      ownerName: form.ownerName.trim() || undefined,
      dueDate: form.dueDate || undefined
    })
    setTasks((prev) => [created, ...prev])
    setForm({ title: '', description: '', ownerName: '', dueDate: '' })
  }

  async function moveTask(taskId: string, status: TaskStatus) {
    const updated = await updateTaskStatus(ctx, taskId, status)
    if (!updated) return
    setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
  }

  async function handleDelegate(taskId: string) {
    const name = delegateDraft[taskId]
    if (!name?.trim()) return
    const updated = await delegateTask(ctx, taskId, name.trim())
    if (!updated) return
    setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
    setDelegateDraft((prev) => ({ ...prev, [taskId]: '' }))
  }

  function getEntityLabel(item: any) {
    if (typeof item.name === 'string') return item.name
    if (typeof item.title === 'string') return localizeTenderTitle(item.title, lang) ?? item.title
    if (typeof item.policyName === 'string') return localizePolicyName(item.policyName, lang) ?? item.policyName
    return item.id
  }

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <BrokerfoxLayout
        title={t('brokerfox.tasks.title')}
        subtitle={t('brokerfox.tasks.subtitle')}
        topLeft={<DemoUtilitiesPanel tenantId={ctx.tenantId} onTenantChange={() => window.location.reload()} />}
      >
        <Card variant="glass" title={t('brokerfox.tasks.createTitle')} subtitle={t('brokerfox.tasks.createSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={t('brokerfox.tasks.fieldTitle')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <input
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder={t('brokerfox.tasks.fieldDescription')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <input
              value={form.ownerName}
              onChange={(event) => setForm((prev) => ({ ...prev, ownerName: event.target.value }))}
              placeholder={t('brokerfox.tasks.owner')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
              placeholder={t('brokerfox.tasks.dueDate')}
              style={{ padding: '0.6rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}
            />
            <select value={entityType} onChange={(event) => setEntityType(event.target.value as any)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              <option value="client">{t('brokerfox.tasks.linkClient')}</option>
              <option value="tender">{t('brokerfox.tasks.linkTender')}</option>
              <option value="renewal">{t('brokerfox.tasks.linkRenewal')}</option>
              <option value="contract">{t('brokerfox.tasks.linkContract')}</option>
            </select>
            <select value={entityId} onChange={(event) => setEntityId(event.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: 10, border: '1px solid #d6d9e0' }}>
              {entityOptions.map((item: any) => (
                <option key={item.id} value={item.id}>{getEntityLabel(item)}</option>
              ))}
            </select>
            <Button size="sm" onClick={handleCreate}>{t('brokerfox.actions.save')}</Button>
          </div>
        </Card>
        {loading ? <p>{t('brokerfox.state.loading')}</p> : null}
        {error ? <p>{error}</p> : null}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {columns.map((column) => (
            <Card key={column.key} variant="glass" title={t(column.labelKey)}>
              {grouped[column.key].length === 0 ? <p>{t('brokerfox.empty.noTasks')}</p> : null}
              {grouped[column.key].map((task) => (
                <div key={task.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                  <strong>{task.title}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{task.description ?? t('brokerfox.tasks.noDescription')}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {task.ownerName ? `${t('brokerfox.tasks.owner')}: ${task.ownerName}` : t('brokerfox.tasks.ownerMissing')}
                  </div>
                  {task.dueDate ? <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{t('brokerfox.tasks.dueDate')}: {new Date(task.dueDate).toLocaleDateString()}</div> : null}
                  <div style={{ display: 'grid', gap: '0.35rem', marginTop: '0.4rem' }}>
                    <input
                      value={delegateDraft[task.id] ?? ''}
                      onChange={(event) => setDelegateDraft((prev) => ({ ...prev, [task.id]: event.target.value }))}
                      placeholder={t('brokerfox.tasks.delegate')}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid #d6d9e0' }}
                    />
                    <Button size="sm" onClick={() => handleDelegate(task.id)}>{t('brokerfox.tasks.delegateAction')}</Button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                    {columns.filter((col) => col.key !== column.key).map((col) => (
                      <button
                        key={col.key}
                        type="button"
                        onClick={() => moveTask(task.id, col.key)}
                        style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', borderRadius: 999, padding: '0.2rem 0.6rem' }}
                      >
                        {t(col.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </BrokerfoxLayout>
    </section>
  )
}
