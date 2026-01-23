import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { markets } from '@/data/markets'
import { leads } from '@/data/leads'
import { buildLeadRows } from '@/lib/calc'
import { formatMoneyCompactEUR, formatMoneyExactEUR, formatPercent } from '@/lib/format'
import { enterpriseStrings } from '@/i18n/strings'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PosterAntares from '@/assets/images/Poster-Antares.png'

type Lang = 'de' | 'en'

const defaultLang: Lang = 'de'

function getLang(params: URLSearchParams): Lang {
  const value = params.get('lang')
  return value === 'en' ? 'en' : 'de'
}

function buildDocRaptorUrl(route: string, filename: string) {
  return `/.netlify/functions/pdf?${new URLSearchParams({ route, filename }).toString()}`
}

export default function EnterpriseLeadsPage() {
  const [searchParams] = useSearchParams()
  const lang = getLang(searchParams)
  const isPrint = searchParams.get('print') === '1'
  const locale = lang === 'de' ? 'de-DE' : 'en-GB'
  const copy = enterpriseStrings[lang]

  const { rows, totals } = useMemo(() => buildLeadRows(leads), [])

  const totalExposurePercentDE = totals.exposureDE / markets.DE
  const totalExposurePercentEU = totals.exposureEU / markets.EU

  const topLeadsEU = rows.slice(0, 10).map((lead) => ({
    name: lead.name,
    value: lead.exposureEU
  }))

  const marketChart = [
    { label: 'DE', value: markets.DE },
    { label: 'EEA', value: markets.EU }
  ]

  function exportPdf() {
    const route = lang === 'de'
      ? '/enterprise-leads-intelligence/print/de'
      : '/enterprise-leads-intelligence/print/en'
    const filename = lang === 'de'
      ? 'insurfox-business-plan-part1-de.pdf'
      : 'insurfox-business-plan-part1-en.pdf'
    window.location.href = buildDocRaptorUrl(route, filename)
  }

  return (
    <section className={`page enterprise-plan ${isPrint ? 'is-print' : ''}`}>
      <header className="enterprise-header no-print">
        <div className="enterprise-header-title">Business Plan – Part 1</div>
        <div className="enterprise-header-actions">
          <button type="button" className="enterprise-download" onClick={exportPdf}>
            {copy.header.export}
          </button>
        </div>
      </header>

      <section className="slide slide-cover enterprise-section">
        <div className="enterprise-hero">
          <div className="enterprise-hero-copy">
            <h1>{copy.cover.title}</h1>
            <p className="hero-summary">
              Im Fokus steht ein strukturierter Marktüberblick für gewerbliche Flotten- und
              Logistikrisiken in Deutschland und der EEA, mit Zielsegmenten in Spedition,
              Kontrakt- und Speziallogistik sowie Automotive- und Transportflotten. Das
              modellierte Markt-Exposure beträgt rund 24 Mrd. € in Deutschland und rund
              250 Mrd. € in der EEA. Exposure ist ausdrücklich nicht gleich Prämie, Umsatz
              oder Beitrag. Die Modellierung basiert auf risikorelevanten Treibern wie
              Fahrzeugbeständen, Transport- und Warenwerten, Einsatzprofilen sowie
              Schadenfrequenz und -höhe. Ziel ist Transparenz über Risikoprofile als
              Grundlage für Portfolio-Steuerung, Kapazitätsallokation und
              Zeichnungsentscheidungen in einer partnerschaftlichen Zusammenarbeit
              zwischen Versicherer und Insurfox.
            </p>
            <div className="kpi-grid">
              <div className="card">
                <span>{copy.kpis.deMarket}</span>
                <strong title={formatMoneyExactEUR(markets.DE, locale)}>
                  {formatMoneyCompactEUR(markets.DE, locale)}
                </strong>
              </div>
              <div className="card">
                <span>{copy.kpis.euMarket}</span>
                <strong title={formatMoneyExactEUR(markets.EU, locale)}>
                  {formatMoneyCompactEUR(markets.EU, locale)}
                </strong>
              </div>
              <div className="card">
                <span>{copy.kpis.leads}</span>
                <strong>{rows.length}</strong>
              </div>
              <div className="card">
                <span>{copy.kpis.totalExposureEU}</span>
                <strong title={formatMoneyExactEUR(totals.exposureEU, locale)}>
                  {formatMoneyCompactEUR(totals.exposureEU, locale)}
                </strong>
              </div>
            </div>
          </div>
          <div className="enterprise-hero-media">
            <img src={PosterAntares} alt="Insurfox Poster" />
          </div>
        </div>
        <div className="chart-card enterprise-hero-chart">
          <h3>{copy.charts.marketScale}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={marketChart}>
              <XAxis dataKey="label" />
              <YAxis hide />
              <Tooltip formatter={(value: number) => formatMoneyCompactEUR(value, locale)} />
              <Bar dataKey="value" fill="var(--ix-chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="slide enterprise-section">
        <h2>{copy.marketAnchors.title}</h2>
        <p className="section-intro">{copy.marketAnchors.intro}</p>
        <div className="card table-card">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>{copy.marketAnchors.columns.region}</th>
                <th className="num">{copy.marketAnchors.columns.market}</th>
                <th>{copy.marketAnchors.columns.definition}</th>
                <th>{copy.marketAnchors.columns.note}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{copy.marketAnchors.rows.de.region}</td>
                <td className="num">{formatMoneyCompactEUR(markets.DE, locale)}</td>
                <td>{copy.marketAnchors.rows.de.definition}</td>
                <td>{copy.marketAnchors.rows.de.note}</td>
              </tr>
              <tr>
                <td>{copy.marketAnchors.rows.eu.region}</td>
                <td className="num">{formatMoneyCompactEUR(markets.EU, locale)}</td>
                <td>{copy.marketAnchors.rows.eu.definition}</td>
                <td>{copy.marketAnchors.rows.eu.note}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="bullets">
          {copy.marketAnchors.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="slide enterprise-section">
        <h2>{copy.leads.title}</h2>
        <div className="card table-card">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>{copy.leads.columns.lead}</th>
                <th>{copy.leads.columns.category}</th>
                <th className="num">{copy.leads.columns.shareDE}</th>
                <th className="num">{copy.leads.columns.exposureDE}</th>
                <th className="num">{copy.leads.columns.shareEU}</th>
                <th className="num">{copy.leads.columns.exposureEU}</th>
                <th>{copy.leads.columns.type}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td><span className="badge">{lead.category}</span></td>
                  <td className="num">{formatPercent(lead.shareDE, locale)}</td>
                  <td className="num">{formatMoneyCompactEUR(lead.exposureDE, locale)}</td>
                  <td className="num">{formatPercent(lead.shareEU, locale)}</td>
                  <td className="num">{formatMoneyCompactEUR(lead.exposureEU, locale)}</td>
                  <td><span className="badge">{lead.exposureType}</span></td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={3}>{copy.leads.total}</td>
                <td className="num">
                  {formatMoneyCompactEUR(totals.exposureDE, locale)}
                  <span className="muted">{formatPercent(totalExposurePercentDE, locale)}</span>
                </td>
                <td />
                <td className="num">
                  {formatMoneyCompactEUR(totals.exposureEU, locale)}
                  <span className="muted">{formatPercent(totalExposurePercentEU, locale)}</span>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="chart-card">
          <h3>{copy.charts.topLeads}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topLeadsEU} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={160} />
              <Tooltip formatter={(value: number) => formatMoneyCompactEUR(value, locale)} />
              <Bar dataKey="value" fill="var(--ix-chart-2)" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="slide enterprise-section">
        <h2>{copy.methodology.title}</h2>
        <ul className="bullets">
          {copy.methodology.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <footer className="footer">{copy.footer}</footer>
      </section>
    </section>
  )
}
