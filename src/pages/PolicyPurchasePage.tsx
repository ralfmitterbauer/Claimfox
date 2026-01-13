import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export default function PolicyPurchasePage() {
  const { t } = useI18n()

  return (
    <section className="page policy-purchase-page">
      <div className="policy-purchase-shell">
        <div className="policy-purchase-hero">
          <Header title={t('policyPurchase.title')} subtitle={t('policyPurchase.subtitle')} subtitleColor="#65748b" />
          <div className="policy-purchase-hero-meta">
            <div>
              <span className="policy-purchase-kicker">Ausgewähltes Versicherungsprodukt</span>
              <h2>Frachtführerhaftungsversicherung</h2>
              <p>
                Auf unsere Frachtführerhaftungsversicherung können Sie zählen, denn die Haftungssumme deckt einen
                Rundum-Schutz für die häufigsten Schäden, denen Frachtführer bei Ihrer Arbeit ausgesetzt sind.
              </p>
              <ul>
                <li>Haftung für Transporte wahlweise innerhalb Deutschlands oder geografisches Europa</li>
                <li>Deckungssumme: Güterschäden bis 2,5 Mio. Euro, Vermögensschäden bis 500.000 Euro</li>
                <li>Schäden an fremden Aufliegern, Wechselbrücken und Containern bis 75.000 Euro je Einheit inkludiert</li>
                <li>Ersatzleistungen pro Jahr bis zu 6 Mio. Euro</li>
              </ul>
              <Button variant="secondary">Mehr erfahren</Button>
            </div>
            <div className="policy-purchase-insurer">
              <span>Versicherer</span>
              <strong>Helvetia</strong>
              <p>Ihre Schweizer Versicherung</p>
            </div>
          </div>
        </div>

        <div className="policy-purchase-section policy-purchase-section-muted">
          <div className="policy-purchase-grid">
            <Card className="policy-purchase-form-card">
              <h3>Selbstbeteiligung und Risiken</h3>
              <label className="form-field">
                Anzahl der versicherten Fahrzeuge
                <input className="text-input" defaultValue="2" />
              </label>
              <label className="form-field">
                Wie hoch ist Ihre gewünschte Selbstbeteiligung (je Schadenereignis)?
                <input className="text-input" defaultValue="750 EUR" />
              </label>
              <div className="policy-purchase-toggle">
                <span>Mitversicherung der Haftung bei Transport von Kurier-Express-Paketen</span>
                <div>
                  <label><input type="radio" name="kurier" defaultChecked /> Ja</label>
                  <label><input type="radio" name="kurier" /> Nein</label>
                </div>
              </div>
              <div className="policy-purchase-toggle">
                <span>Mitversicherung der Haftung bei Transport von Kühlgut mit entsprechenden Fahrzeugen</span>
                <div>
                  <label><input type="radio" name="kuehlgut" /> Ja</label>
                  <label><input type="radio" name="kuehlgut" defaultChecked /> Nein</label>
                </div>
              </div>
            </Card>
            <div className="policy-purchase-side">
              <Card className="policy-purchase-summary">
                <h4>Jahresprämie</h4>
                <div>
                  <span>Jahresnettoprämie</span>
                  <strong>693,38 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>131,73 €</strong>
                </div>
                <div>
                  <span>Jahresbruttoprämie</span>
                  <strong>825,11 €</strong>
                </div>
              </Card>
              <Card className="policy-purchase-summary">
                <h4>Gesamtprämie</h4>
                <div>
                  <span>Vertragslaufzeit vom 17.11.2025 bis 01.01.2027</span>
                </div>
                <div>
                  <span>Nettoprämie</span>
                  <strong>764,21 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>145,20 €</strong>
                </div>
                <div>
                  <span>Bruttoprämie</span>
                  <strong>909,41 €</strong>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="policy-purchase-section">
          <Card className="policy-purchase-form-card">
            <h3>Vorversicherer</h3>
            <div className="policy-purchase-toggle">
              <span>Bestand eine Vorversicherung in den letzten 5 Jahren?</span>
              <div>
                <label><input type="radio" name="vorversicherer" defaultChecked /> Ja</label>
                <label><input type="radio" name="vorversicherer" /> Nein</label>
              </div>
            </div>
          </Card>
        </div>

        <div className="policy-purchase-section policy-purchase-section-muted">
          <Card className="policy-purchase-form-card">
            <h3>Beginn des Versicherungsschutzes</h3>
            <div className="policy-purchase-toggle">
              <label><input type="radio" name="beginn" defaultChecked /> Gültig sofort nach dem Kauf</label>
              <label><input type="radio" name="beginn" /> Gültig ab einem bestimmten Datum</label>
            </div>
          </Card>
        </div>

        <div className="policy-purchase-section">
          <div className="policy-purchase-grid">
            <Card className="policy-purchase-form-card">
              <h3>Informationen zu den Fahrzeugen</h3>
              <div className="policy-purchase-vehicle">
                <strong>Fahrzeug 1</strong>
                <input className="text-input" defaultValue="HH-UK 8765" />
                <div className="policy-purchase-inline">
                  <input className="text-input" defaultValue="Bis zu 3,5 Tonnen" />
                  <input className="text-input" defaultValue="Deutschland" />
                  <input className="text-input" defaultValue="LKW" />
                </div>
              </div>
              <div className="policy-purchase-vehicle">
                <strong>Fahrzeug 2</strong>
                <input className="text-input" defaultValue="HH-UV 8760" />
                <div className="policy-purchase-inline">
                  <input className="text-input" defaultValue="Bis zu 3,5 Tonnen" />
                  <input className="text-input" defaultValue="Europa" />
                  <input className="text-input" defaultValue="LKW" />
                </div>
              </div>
            </Card>
            <div className="policy-purchase-side">
              <Card className="policy-purchase-summary">
                <h4>Gesamtprämie</h4>
                <div>
                  <span>Nettoprämie</span>
                  <strong>764,21 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>145,20 €</strong>
                </div>
                <div>
                  <span>Bruttoprämie</span>
                  <strong>909,41 €</strong>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="policy-purchase-section policy-purchase-section-muted">
          <div className="policy-purchase-grid">
            <Card className="policy-purchase-form-card">
              <h3>Prämie</h3>
              <p style={{ color: '#64748b' }}>
                Auf der Grundlage der von Ihnen gemachten Angaben können wir Ihnen das folgende Angebot unterbreiten:
              </p>
              <div className="policy-purchase-banner">Der Versicherungsschutz tritt sofort in Kraft.</div>
            </Card>
            <div className="policy-purchase-side">
              <Card className="policy-purchase-summary">
                <h4>Jahresprämie</h4>
                <div>
                  <span>Jahresnettoprämie</span>
                  <strong>693,38 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>131,73 €</strong>
                </div>
                <div>
                  <span>Jahresbruttoprämie</span>
                  <strong>825,11 €</strong>
                </div>
              </Card>
              <Card className="policy-purchase-summary">
                <h4>Gesamtprämie</h4>
                <div>
                  <span>Nettoprämie</span>
                  <strong>764,21 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>145,20 €</strong>
                </div>
                <div>
                  <span>Bruttoprämie</span>
                  <strong>909,41 €</strong>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="policy-purchase-section">
          <Card className="policy-purchase-form-card">
            <h3>Versicherungsbedingungen</h3>
            <div className="policy-purchase-conditions">
              <div>
                <strong>Der Download der Versicherungsbedingungen ist verpflichtend</strong>
                <p>Um unser Angebot anzunehmen, überprüfen Sie bitte die Versicherungsunterlagen und akzeptieren Sie diese, um fortzufahren.</p>
              </div>
              <Button>Dokument herunterladen (pdf)</Button>
            </div>
            <div className="policy-purchase-checkboxes">
              <label><input type="checkbox" /> Ich bestätige hiermit, dass ich die Versicherungsbedingungen gelesen habe und akzeptiere diese.</label>
              <label><input type="checkbox" /> Insurfox ist Versicherungsmakler im Sinne von §34d Abs. 1 der Gewerbeordnung. Hiermit bestätige ich den Erhalt des Vermittlungsauftrages.</label>
              <label><input type="checkbox" /> Hiermit bestätige ich, dass ich kein Versicherungsmakler, Versicherungsvertreter oder sonstiger Vermittler von Versicherungsschutz bin.</label>
            </div>
            <Button>Weiter zum Kauf</Button>
          </Card>
        </div>

        <div className="policy-purchase-section policy-purchase-section-muted">
          <div className="policy-purchase-grid">
            <Card className="policy-purchase-form-card">
              <h3>SEPA-Lastschriftmandat</h3>
              <div className="policy-purchase-sepa">
                <p><strong>Zahlungsempfänger:</strong> Helvetia Versicherungs-Aktiengesellschaft</p>
                <p>Berliner Str. 56-58, 60311 Frankfurt am Main</p>
                <p>Gläubiger-Identifikationsnummer (Creditor Identifier): DE90ZZZ00000068771</p>
                <p>Mandatsreferenz: Wird mit der ersten Rechnung zur Verfügung gestellt</p>
                <p><strong>Ermächtigung:</strong> Ich ermächtige/Wir ermächtigen die Helvetia Schweizerische Versicherungsgesellschaft AG, Zahlungen von meinem/unserem Konto mittels Lastschrift einzuziehen.</p>
                <p><strong>Hinweis:</strong> Ich kann/Wir können innerhalb von 8 Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen.</p>
              </div>

              <h3>Anschrift Zahlungspflichtiger</h3>
              <label className="form-field">Name Zahlungspflichtiger<input className="text-input" /></label>
              <label className="form-field">Geben Sie Ihre Adresse für die Suche ein<input className="text-input" /></label>
              <div className="policy-purchase-inline">
                <input className="text-input" placeholder="Straße" />
                <input className="text-input" placeholder="Hausnummer" />
              </div>
              <label className="form-field">Adresszusatz<input className="text-input" /></label>
              <label className="form-field">Postleitzahl<input className="text-input" /></label>
              <label className="form-field">Stadt<input className="text-input" /></label>
              <label className="form-field">Land<input className="text-input" /></label>

              <h3>Kontodaten</h3>
              <label className="form-field">IBAN<input className="text-input" /></label>
              <label className="form-field">BIC<input className="text-input" /></label>
              <label className="form-field">Name der Bank<input className="text-input" /></label>

              <div className="policy-purchase-actions">
                <Button>Zahlungspflichtig kaufen</Button>
                <Button variant="secondary">Zurück zur vorherigen Seite</Button>
              </div>
            </Card>
            <div className="policy-purchase-side">
              <Card className="policy-purchase-summary">
                <h4>Ihre Daten</h4>
                <div>
                  <span>Anzahl der versicherten Fahrzeuge: 2</span>
                </div>
                <div>
                  <span>Transport von Kühlgut: Nein</span>
                </div>
                <div>
                  <span>Transport von Kurier-Express-Paketen: Nein</span>
                </div>
                <div>
                  <span>Selbstbehalt (pro Schadensfall): 300 EUR</span>
                </div>
              </Card>
              <Card className="policy-purchase-summary">
                <h4>Jahresprämie</h4>
                <div>
                  <span>Jahresnettoprämie</span>
                  <strong>393,75 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>74,81 €</strong>
                </div>
                <div>
                  <span>Jahresbruttoprämie</span>
                  <strong>468,56 €</strong>
                </div>
              </Card>
              <Card className="policy-purchase-summary">
                <h4>Gesamtprämie</h4>
                <div>
                  <span>Nettoprämie</span>
                  <strong>441,88 €</strong>
                </div>
                <div>
                  <span>Versicherungssteuer (Deutschland 19%)</span>
                  <strong>83,96 €</strong>
                </div>
                <div>
                  <span>Bruttoprämie</span>
                  <strong>525,84 €</strong>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
