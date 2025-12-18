export type Lang = 'de' | 'en'

type TranslationTree = {
  login: {
    title: string
    username: string
    password: string
    submit: string
    submitting: string
    required: string
    invalid: string
  }
  roles: {
    title: string
    subtitle: string
    logout: string
    view: string
    startJourney: string
    registrationCardTitle: string
    registrationCardSubtitle: string
    brokerPortal: string
    cards: Record<string, { title: string; description: string }>
  }
  marketing: {
    title: string
    subtitle: string
    highlights: {
      title: string
      ai: string
      workflows: string
      insights: string
    }
    modules: {
      title: string
      backoffice: string
      tenders: string
      fleetReporting: string
      fleetManagement: string
      registration: string
      compliance: string
    }
    why: {
      title: string
      fast: string
      ai: string
      scale: string
    }
    cta: string
  }
  marketingFleet: {
    hero: {
      title: string
      subtitle: string
      login: string
      illustrationTitle: string
      illustrationValue: string
      illustrationDescription: string
    }
    kpi: {
      realTime: string
      ai: string
      tuv: string
      claims: string
      docs: string
      compliance: string
    }
    manage: {
      title: string
      features: Record<
        string,
        {
          title: string
          description: string
        }
      >
    }
    preview: {
      title: string
      subtitle: string
      kpis: {
        uptime: string
        openClaims: string
        downtime: string
      }
      incidentsTitle: string
      downtimeTitle: string
      table: {
        columns: {
          date: string
          vehicle: string
          type: string
          status: string
          cost: string
          ai: string
        }
        typeLabels: Record<string, string>
        statusLabels: Record<string, string>
        aiLabels: Record<string, string>
        rows: Record<
          string,
          {
            date: string
            vehicle: string
            typeKey: string
            statusKey: string
            cost: string
            aiKey: string
          }
        >
      }
    }
    usecases: {
      title: string
      items: Record<
        string,
        {
          title: string
          description: string
        }
      >
    }
    cta: {
      primary: string
      secondary: string
    }
  }
  registration: {
    title: string
    subtitle: string
    inputPlaceholder: string
    send: string
    restart: string
    back: string
    modeWrite: string
    modeSpeak: string
    voiceLabel: string
    voicePlaceholder: string
    voiceLoading: string
    voiceStart: string
    bot: {
      welcome: string
      mode: string
      name: string
      email: string
      emailInvalid: string
      phone: string
      skip: string
      role: string
      roleCustomer: string
      rolePartner: string
      roleInternal: string
      privacy: string
      privacyYes: string
      privacyNo: string
      privacyNoStop: string
      summary: string
      submit: string
      edit: string
      success: string
      voiceConfirm: string
      voiceSelect: string
      voiceNotSupported: string
      voiceInputNotSupported: string
      listening: string
    }
  }
  brokerLanding: {
    title: string
    login: string
    heroHeadline: string
    heroSubline: string
    valueLine1: string
    valueLine2: string
    valueLine3: string
    heroStats: {
      coverage: string
      automation: string
      retention: string
    }
    heroCTAPrimary: string
    heroCTASecondary: string
    featureSectionTitle: string
    featureSectionSubtitle: string
    features: {
      crm: string
      tender: string
      ai: string
      insights: string
      workflows: string
      compliance: string
    }
    sectorsTitle: string
    sectorsSubtitle: string
    sectorsList: {
      carriers: string
      fleet: string
      cargo: string
      logistics: string
      contents: string
      liability: string
      photovoltaic: string
      cyber: string
      do: string
      legal: string
      electronics: string
      machinery: string
      tradeCredit: string
    }
    whyTitle: string
    whySubtitle: string
    whyItems: {
      relationship: string
      automation: string
      compliance: string
    }
  }
  brokerCrm: {
    title: string
    subtitle: string
    ai: {
      title: string
      subtitle: string
      labels: {
        probability: string
        volume: string
        recommendation: string
      }
      items: Record<
        string,
        {
          name: string
          type: string
          value: string
          action: string
        }
      >
    }
    kpi: {
      activeCustomers: string
      openLeads: string
      dealsMonth: string
      premiumVolume: string
    }
    charts: {
      revenueTitle: string
      revenueSubtitle: string
      leadsTitle: string
      leadsSubtitle: string
      revenueLegendCurrent: string
      revenueLegendPrevious: string
      leadsLegendOpen: string
      leadsLegendWon: string
      leadsLegendLost: string
    }
    table: {
      title: string
      name: string
      status: string
      lastContact: string
      potential: string
      nextStep: string
      statusLabels: {
        prospect: string
        active: string
        onboarding: string
        dormant: string
      }
      potentialLabels: {
        high: string
        medium: string
        low: string
      }
      nextSteps: {
        call: string
        meeting: string
        proposal: string
        onboarding: string
        renewal: string
      }
    }
    activities: {
      title: string
      followUp: string
      proposal: string
      documents: string
      audit: string
      training: string
    }
  }
}

export const translations: Record<Lang, TranslationTree> = {
  de: {
    login: {
      title: 'IaaS-Portal',
      username: 'Benutzername',
      password: 'Passwort',
      submit: 'Anmelden',
      submitting: 'Anmeldung läuft …',
      required: 'Bitte Benutzername und Passwort eingeben.',
      invalid: 'Ungültige Anmeldedaten.'
    },
    roles: {
      title: 'Rollenübersicht',
      subtitle: 'Wähle eine Rolle aus, um die Demo weiterzuführen. Alle Inhalte sind statisch und dienen nur der Illustration.',
      logout: 'Logout',
      view: 'Ansehen',
      startJourney: 'Journey starten',
      registrationCardTitle: 'Registrierung',
      registrationCardSubtitle: 'Starte die neue, KI-gestützte Journey und melde Partner oder Kund:innen komfortabel an.',
      brokerPortal: 'Maklerportal',
      cards: {
        claims: {
          title: 'Schadenmanager',
          description: 'Verwalte offene Schadenfälle und priorisiere neue Aufgaben.'
        },
        partner: {
          title: 'Partner Manager',
          description: 'Pflege Kontakte zu Gutachtern, Werkstätten und Dienstleistern.'
        },
        reporting: {
          title: 'Fleet Reporting',
          description: 'Fuhrpark-Kennzahlen, KPIs und Schadenreports bereitstellen.'
        },
        fleetManagement: {
          title: 'Fuhrparkverwaltung',
          description: 'Verwalte Fahrzeuge, Termine, Dokumente und Fahrerzuordnung.'
        },
        marketing: {
          title: 'Marketing',
          description: 'Präsentiere die Insurfox Plattform für Vertrieb und Stakeholder.'
        }
      }
    },
    marketing: {
      title: 'Insurfox Plattform',
      subtitle: 'Digitale Front- und Backend-Lösungen für Makler, MGAs und Flotten.',
      login: 'Login',
      highlights: {
        title: 'Highlights',
        ai: 'KI-gestützte Prozesse',
        workflows: 'End-to-End Workflows',
        insights: 'Reporting & Insights'
      },
      modules: {
        title: 'Module',
        backoffice: 'Backoffice & CRM',
        tenders: 'Tender & Ausschreibungen',
        fleetReporting: 'Fleet Reporting',
        fleetManagement: 'Fuhrparkverwaltung',
        registration: 'Registrierungsassistent',
        compliance: 'Compliance'
      },
      why: {
        title: 'Warum Insurfox?',
        fast: 'Schneller arbeiten – weniger manuell.',
        ai: 'Bessere Entscheidungen durch KI-Insights.',
        scale: 'Skalierbar für wachsende Portfolios.'
      },
      cta: 'Zur Übersicht'
    },
    marketingFleet: {
      hero: {
        title: 'IaaS Fuhrparkmanagement',
        subtitle:
          'Steuern Sie Fahrzeuge, Schäden, Termine, Dokumente und Policen – mit KI-Empfehlungen und Real-Time Insights.',
        login: 'Login',
        illustrationTitle: 'AI Live Alerts',
        illustrationValue: '12 aktive Signale',
        illustrationDescription: 'Live-Incidents, Prüfkapazitäten und Downtime-Prognosen im Überblick.'
      },
      kpi: {
        realTime: 'Real-time Status & Alerts',
        ai: 'KI-gestützte Priorisierung',
        tuv: 'TÜV & Wartungsplanung',
        claims: 'Schaden- & Kostenkontrolle',
        docs: 'Dokumente & Policen',
        compliance: 'Compliance & Reporting'
      },
      manage: {
        title: 'Was Sie managen können',
        features: {
          vehiclesMaster: {
            title: 'Fahrzeuge & Stammdaten',
            description: 'VIN, Ausstattung, GPS, Sensor- und Nutzungshistorie auf einen Blick.'
          },
          realTime: {
            title: 'Real-time Status & Alerts',
            description: 'Live-Überblick über Statusmeldungen, Alerts und Ereignisse je Fahrzeug.'
          },
          aiPrioritization: {
            title: 'KI-gestützte Priorisierung',
            description: 'KI bewertet Risiken, Schäden und Maßnahmen automatisch nach Impact.'
          },
          tuvPlanning: {
            title: 'TÜV & Wartungsplanung',
            description: 'TÜV-, Wartungs- und Werkstattkapazitäten koordinieren – inklusive Ersatzfahrzeuge.'
          },
          claimsControl: {
            title: 'Schaden- & Kostenkontrolle',
            description: 'Schadenstatus, Reparaturaufträge und Kostenprognosen zentral steuern.'
          },
          docsPolicies: {
            title: 'Dokumente & Policen',
            description: 'Verträge, Policen und Compliance-Nachweise revisionssicher verwalten.'
          }
        }
      },
      preview: {
        title: 'Real-Time Dashboard Preview',
        subtitle: 'Echtzeit-KPIs, Alerts und Incident-Daten – bereit für Ihr Team.',
        kpis: {
          uptime: 'Verfügbarkeit',
          openClaims: 'Offene Schäden',
          downtime: 'Ø Ausfalltage (Monat)'
        },
        incidentsTitle: 'Incidents pro Monat',
        downtimeTitle: 'Downtime-Trend',
        table: {
          columns: {
            date: 'Datum',
            vehicle: 'Fahrzeug',
            type: 'Typ',
            status: 'Status',
            cost: 'Kosten',
            ai: 'AI-Flag'
          },
          typeLabels: {
            motor: 'Motor',
            cargo: 'Cargo',
            liability: 'Haftpflicht'
          },
          statusLabels: {
            open: 'Offen',
            repair: 'In Reparatur',
            monitoring: 'Monitoring'
          },
          aiLabels: {
            alert: 'Alert',
            watch: 'Watch',
            info: 'Info'
          },
          rows: {
            row1: {
              date: '03.03.2025',
              vehicle: 'DE-789-XY',
              typeKey: 'motor',
              statusKey: 'repair',
              cost: '€ 8.450',
              aiKey: 'alert'
            },
            row2: {
              date: '02.03.2025',
              vehicle: 'HH-CARGO-12',
              typeKey: 'cargo',
              statusKey: 'open',
              cost: '€ 5.870',
              aiKey: 'watch'
            },
            row3: {
              date: '01.03.2025',
              vehicle: 'M-FL-2045',
              typeKey: 'liability',
              statusKey: 'monitoring',
              cost: '€ 2.180',
              aiKey: 'info'
            },
            row4: {
              date: '27.02.2025',
              vehicle: 'K-TR-330',
              typeKey: 'motor',
              statusKey: 'open',
              cost: '€ 1.260',
              aiKey: 'watch'
            },
            row5: {
              date: '25.02.2025',
              vehicle: 'B-DEL-901',
              typeKey: 'cargo',
              statusKey: 'repair',
              cost: '€ 9.120',
              aiKey: 'alert'
            }
          }
        }
      },
      usecases: {
        title: 'Für wen?',
        items: {
          logistics: {
            title: 'Logistikunternehmen',
            description: 'Komplexe LKW-, Trailer- und Cargo-Flotten mit europaweiten Standorten.'
          },
          delivery: {
            title: 'Service- & Lieferflotten',
            description: 'City- und Regionalflotten mit hohem Termindruck und Service-Leveln.'
          },
          industrial: {
            title: 'Industrie & Mischflotten',
            description: 'PKW, Transporter und Spezialfahrzeuge inklusive Bau- und Energieflotten.'
          }
        }
      },
      cta: {
        primary: 'Demo ansehen',
        secondary: 'Fleet Reporting öffnen'
      }
    },
    fleetReporting: {
      title: 'Fuhrpark-Reporting-Dashboard',
      subtitle: 'Kennzahlen, Auffälligkeiten und Schadenüberblick für Ihren Fuhrpark',
      kpi: {
        totalClaims: 'Schäden gesamt (12 Monate)',
        openClaims: 'Offene Schäden',
        lossRatio: 'Schadenquote',
        avgCost: 'Ø Schadenkosten',
        coverageRate: 'Deckungsquote',
        activeVehicles: 'Aktive Fahrzeuge',
        downtime: 'Ø Ausfalltage / Monat',
        topCause: 'Top-Schadenursache'
      },
      kpiValues: {
        topCause: 'Auffahrunfall'
      },
      charts: {
        monthlyTitle: 'Schäden pro Monat',
        monthlySubtitle: 'Zwölf Monate Demo-Daten',
        coverageTitle: 'Deckungsstatus',
        coverageSubtitle: 'Anteil gedeckt vs. nicht gedeckt',
        severityTitle: 'Schadenhöhe-Verteilung',
        severitySubtitle: 'Anteile nach Kategorie'
      },
      coverageLabels: {
        covered: 'Gedeckt',
        uncovered: 'Nicht gedeckt'
      },
      severityLabels: {
        high: 'Hoch',
        medium: 'Mittel',
        low: 'Niedrig'
      },
      ai: {
        title: 'Insurfox AI – Fuhrpark-Auffälligkeiten & Insights',
        subtitle: 'Automatische Signale aus historischen und Echtzeit-Daten',
        items: {
          item1: 'Fahrzeug DE-789-XY zeigt 40 % höhere Schadenfrequenz als der Fuhrpark-Durchschnitt.',
          item2: 'Region Berlin verzeichnet 25 % mehr Vorfälle in Q4. Wetterkorrelation erkannt.',
          item3: 'Fahrerschulung für Team Nord empfohlen – wiederkehrende Unfallmuster.',
          item4: 'Cargo-Schäden steigen im November um 15 %. Routenoptimierung empfohlen.',
          item5: 'Trailer-Cluster Süd zeigt gehäufte Rangierschäden. Parkplatz-/Routenführung prüfen.',
          item6: 'Werkstattkosten steigen bei “Delivery Vans” um 12 %. Präventivwartung empfohlen.'
        }
      },
      vehicles: {
        title: 'Fahrzeuge',
        filters: {
          typeLabel: 'Fahrzeugtyp',
          statusLabel: 'Status',
          searchPlaceholder: 'Kennzeichen oder VIN suchen …',
          typeOptions: {
            all: 'Alle',
            car: 'PKW',
            truck: 'LKW',
            trailer: 'Trailer',
            delivery: 'Delivery Vans'
          },
          statusOptions: {
            all: 'Alle',
            active: 'Aktiv',
            maintenance: 'In Werkstatt',
            down: 'Ausfall'
          }
        },
        cards: {
          type: 'Typ',
          status: 'Status',
          location: 'Standort',
          inspection: 'Nächster TÜV',
          maintenance: 'Nächste Wartung',
          downtime: 'Ausfalltage YTD',
          open: 'Öffnen'
        },
        statusBadges: {
          active: 'Aktiv',
          maintenance: 'Werkstatt',
          down: 'Ausfall'
        }
      },
      filters: {
        typeLabel: 'Schadenart',
        typeOptions: {
          all: 'Alle',
          motor: 'Motor',
          liability: 'Haftpflicht',
          cargo: 'Cargo'
        },
        rangeLabel: 'Zeitraum',
        rangeOptions: {
          last30: 'Letzte 30 Tage',
          last12: 'Letzte 12 Monate'
        }
      },
      table: {
        title: 'Fuhrpark-Schäden',
        columns: {
          date: 'Datum',
          vehicle: 'Fahrzeug',
          vin: 'FIN',
          location: 'Route / Standort',
          type: 'Typ',
          coverage: 'Deckung',
          status: 'Status',
          cost: 'Kosten',
          ai: 'AI-Hinweis',
          note: 'Notiz'
        },
        types: {
          motor: 'Motor',
          liability: 'Haftpflicht',
          cargo: 'Cargo'
        },
        coverageBadges: {
          covered: 'Gedeckt',
          uncovered: 'Nicht gedeckt'
        },
        statusBadges: {
          open: 'Offen',
          review: 'In Prüfung',
          closed: 'Geschlossen'
        },
        aiBadges: {
          alert: 'Auffällig',
          watch: 'Beobachten',
          normal: 'Normal'
        },
        rows: {
          row1: {
            location: 'Berlin → Leipzig (A9)',
            ai: 'Telematik meldet abruptes Bremsen + Sensor-Fehler'
          },
          row2: {
            location: 'Hamburg Hafen',
            ai: 'Ladungssicherung prüfen – wiederkehrende Schäden'
          },
          row3: {
            location: 'München → Salzburg',
            ai: 'Versicherung fordert Fotodokumentation nach'
          },
          row4: {
            location: 'Köln Innenstadt',
            ai: 'Unfallhäufung an gleicher Kreuzung'
          },
          row5: {
            location: 'Frankfurt Air Cargo Hub',
            ai: 'Temperaturabweichung + verspätete Meldung'
          }
        }
      }
    },
    fleetManagement: {
      title: 'Fuhrparkverwaltung',
      subtitle: 'Fahrzeuge, Dokumente, Versicherungen und Fahrer zentral steuern.',
      kpi: {
        active: 'Aktive Fahrzeuge',
        workshop: 'In Werkstatt',
        inspectionDue: 'TÜV fällig (30 Tage)',
        openTasks: 'Offene Aufgaben'
      },
      filters: {
        typeLabel: 'Fahrzeugtyp',
        statusLabel: 'Status',
        searchPlaceholder: 'Kennzeichen oder VIN suchen …',
        typeOptions: {
          all: 'Alle',
          car: 'PKW',
          truck: 'LKW',
          trailer: 'Trailer',
          delivery: 'Delivery Vans'
        },
        statusOptions: {
          all: 'Alle',
          active: 'Aktiv',
          maintenance: 'In Werkstatt',
          down: 'Ausfall'
        }
      },
      list: {
        title: 'Fahrzeugliste',
        open: 'Öffnen',
        statusBadges: {
          active: 'Aktiv',
          maintenance: 'Werkstatt',
          down: 'Ausfall'
        }
      },
      detail: {
        title: 'Fahrzeugdetails',
        overview: 'Stammdaten',
        usage: 'Einsatz',
        usageLabels: {
          longhaul: 'Fernverkehr',
          regional: 'Regionale Distribution',
          city: 'City Delivery',
          cargo: 'Cargo & Trailer'
        },
        schedule: 'Termine & Wartung',
        inspection: 'TÜV Termin',
        inspectionStatus: {
          ok: 'OK',
          dueSoon: 'Fällig bald',
          overdue: 'Überfällig'
        },
        maintenance: 'Nächste Wartung',
        downtime: 'Ausfalltage (12 Monate)',
        documents: 'Dokumente',
        documentsList: {
          registration: 'Fahrzeugschein.pdf',
          leasing: 'Leasingvertrag.pdf',
          maintenance: 'Wartungsnachweise.zip'
        },
        upload: 'Upload',
        policies: 'Versicherungspolicen',
        policiesColumns: {
          number: 'Police',
          line: 'Sparte',
          sum: 'Deckungssumme',
          deductible: 'Selbstbehalt',
          term: 'Laufzeit',
          status: 'Status'
        },
        policyLines: {
          liability: 'Haftpflicht',
          casco: 'Kasko',
          cargo: 'Cargo'
        },
        policyStatus: {
          active: 'Aktiv',
          pending: 'Ausstehend'
        },
        drivers: 'Fahrerzuordnung',
        primaryDriver: 'Primärfahrer',
        addDriver: 'Fahrer hinzufügen',
        licenses: 'Führerscheinklassen',
        licenseValidity: 'Gültig bis',
        licenseStatus: {
          valid: 'Gültig',
          expiring: 'Läuft bald ab',
          expired: 'Abgelaufen'
        }
      },
      driverPicker: {
        title: 'Verfügbare Fahrer',
        assign: 'Zuweisen'
      }
    },
    registration: {
      title: 'Registrierungsassistent',
      subtitle: 'Unser Bot speichert deinen Fortschritt lokal und führt dich Schritt für Schritt durch die Journey.',
      inputPlaceholder: 'Nachricht eingeben …',
      send: 'Senden',
      restart: 'Neu starten',
      back: 'Zurück zur Übersicht',
      modeWrite: '✍️ Schreiben',
      modeSpeak: '🎙️ Sprechen',
      voiceLabel: 'Stimme auswählen',
      voicePlaceholder: 'Bitte Stimme wählen',
      voiceLoading: 'Stimmen werden geladen …',
      voiceStart: 'Starten',
      voiceActiveLabel: 'Aktive Stimme',
      voiceActiveBadge: 'Aktiv',
      voiceStartListening: '🎙️ Aufnahme starten',
      voiceStopListening: '⏹️ Aufnahme stoppen',
      voiceNoRecognition: 'Voice input wird auf diesem Gerät nicht unterstützt – bitte tippe Deine Antworten.',
      messageSource: {
        voice: 'Sprechen',
        text: 'Eingabe',
        quick: 'Schnellantwort'
      },
      bot: {
        welcome: '👋 Willkommen bei Claimfox. Ich begleite dich Schritt für Schritt durch die Registrierung.',
        mode: 'Möchtest du die Daten selbst eingeben oder mit mir sprechen?',
        name: 'Wie lautet dein vollständiger Name?',
        email: 'Bitte gib deine E-Mail-Adresse ein. Wir verwenden sie nur für Updates zur Registrierung.',
        emailInvalid: 'Diese E-Mail-Adresse sieht nicht korrekt aus. Prüfe sie bitte noch einmal.',
        phone: 'Möchtest du zusätzlich eine Telefonnummer angeben? Du kannst auch „Skip“ schreiben.',
        skip: 'Alles klar, ich überspringe die Telefonnummer.',
        role: 'Wofür möchtest du Claimfox nutzen? Lass mich kurz wissen, was du vorhast.',
        roleCustomer: '• Kunden & Fahrer, z. B. für Schäden oder Anfragen',
        rolePartner: '• Partner & Netzwerk wie Gutachter oder Werkstätten',
        roleInternal: '• Interne Teams für Steuerung und Reporting',
        privacy: 'Bitte bestätige, dass du unserer Datenschutzerklärung zustimmst.',
        privacyYes: 'Danke für deine Zustimmung. Ich fasse alles kurz zusammen.',
        privacyNo: 'Ohne Zustimmung können wir leider nicht fortfahren.',
        privacyNoStop: 'Du kannst den Prozess jederzeit neu starten, sobald du bereit bist.',
        summary: 'Hier ist deine Zusammenfassung:\nName: {{name}}\nE-Mail: {{email}}\nTelefon: {{phone}}\nRolle: {{role}}',
        submit: 'Registrierung abschicken',
        edit: 'Angaben bearbeiten',
        success: '🎉 Vielen Dank! Deine Registrierung wurde erfasst. Wir melden uns in Kürze bei dir.',
        voiceConfirm: 'Ist das so richtig?',
        voiceSelect: 'Wähle zuerst die Stimme Deines Claimsfox aus.',
        voiceNotSupported: 'Dein Browser unterstützt leider keine Sprachausgabe. Lass uns schriftlich weitermachen.',
        voiceInputNotSupported: 'Ich kann in diesem Browser nicht zuhören. Bitte tippe deine Antwort.',
        listening: '🎙️ Ich höre zu …'
      }
    },
    brokerPortal: {
      title: 'IaaS Maklerportal'
    },
    brokerLanding: {
      title: 'Maklerportal',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Maklerportal',
      heroSubline: 'Digitale Front- und Backend-Lösungen für Maklerhäuser, MGAs und Coverholder in Europa.',
      valueLine1: 'Backoffice & CRM speziell für mittelständische Makler und Industrieversicherungen.',
      valueLine2: 'Ausschreibungs- und Tenderplattform für komplexe Industrieprogramme.',
      valueLine3: 'KI-gestützte Tools für Bestand, Portfolio und Kundenkommunikation.',
      trust: {
        crm: 'CRM-Backoffice',
        tender: 'Tender-Plattform',
        ai: 'KI-Tools'
      },
      heroStats: {
        coverage: '12+ Industrie- & Spezialsparten',
        automation: '80% automatisierte Workflows',
        retention: '98% Renewal Rate bei Bestandskunden'
      },
      heroCTAPrimary: 'Demo ansehen',
      heroCTASecondary: 'Login',
      featureSectionTitle: 'Alles, was moderne Makler brauchen',
      featureSectionSubtitle: 'Ein Plattform-Stack für Vertrieb, Service und Underwriting.',
      features: {
        crm: 'Backoffice & CRM',
        tender: 'Tender & Ausschreibungen',
        ai: 'KI-Tools für Bestand & Portfolio',
        insights: 'Portfolio Insights & Reporting',
        workflows: 'Automatisierte Workflows',
        compliance: 'Compliance & Dokumentation'
      },
      sectorsTitle: 'Sparten & Produkte',
      sectorsSubtitle: 'Einheitliche Prozesse für europäische Industrie- und Spezialsparten.',
      sectorsBanner: 'Einheitliche Prozesse für Industrie- und Spezialsparten.',
      sectorsList: {
        carriers: 'Verkehrshaftungsversicherung',
        fleet: 'Flottenversicherung',
        cargo: 'Transport- und Warenversicherung',
        logistics: 'Logistik-Komposit',
        contents: 'Inhaltsversicherung',
        liability: 'Betriebshaftpflicht',
        photovoltaic: 'Photovoltaikversicherung',
        cyber: 'Cyberversicherung',
        do: 'D&O-Versicherung',
        legal: 'Rechtsschutzversicherung',
        electronics: 'Elektronikversicherung',
        machinery: 'Maschinenversicherung',
        tradeCredit: 'Warenkreditversicherung'
      },
      whyTitle: 'Warum Insurfox?',
      whySubtitle: 'Wir kombinieren Versicherungsexpertise, Technologie und regulatorisches Know-how.',
      whyItems: {
        relationship: 'Dedizierte Teams begleiten eure Transformation – von Migration bis Betrieb.',
        automation: 'Plattform-Übergreifende Prozesse mit KI, Automatisierung und offenen APIs.',
        compliance: 'Hosting & Datenhaltung in der EU inkl. Audit, Compliance und DORA-Readiness.'
      }
    },
    brokerCrm: {
      title: 'CRM & Reporting',
      subtitle: 'Gewinne Transparenz über Leads, Kund:innen und Aktivitäten in deinem Maklernetzwerk.',
      ai: {
        title: 'KI-Auswertung',
        subtitle: 'Empfohlene Prioritäten basierend auf Abschlusswahrscheinlichkeit und Volumen.',
        labels: {
          probability: 'Abschlusswahrscheinlichkeit',
          volume: 'Volumen',
          recommendation: 'Empfehlung'
        },
        items: {
          item1: {
            name: 'Müller Logistik GmbH',
            type: 'Hohe Abschlusswahrscheinlichkeit',
            value: '92%',
            action: 'Heute anrufen'
          },
          item2: {
            name: 'NordCargo AG',
            type: 'Hohes Volumen',
            value: '€ 185.000',
            action: 'Angebot finalisieren'
          },
          item3: {
            name: 'AlpenFleet KG',
            type: 'Hohe Abschlusswahrscheinlichkeit',
            value: '88%',
            action: 'Follow-up E-Mail senden'
          },
          item4: {
            name: 'RheinTech Industrie',
            type: 'Hohes Volumen',
            value: '€ 240.000',
            action: 'Risiko-Check anstoßen'
          },
          item5: {
            name: 'Hansea Spedition GmbH',
            type: 'Hohe Abschlusswahrscheinlichkeit',
            value: '84%',
            action: 'Unterlagen anfordern'
          },
          item6: {
            name: 'Baltic Freight Solutions',
            type: 'Hohes Volumen',
            value: '€ 310.000',
            action: 'Konditionen verhandeln'
          }
        }
      },
      kpi: {
        activeCustomers: 'Aktive Kund:innen',
        openLeads: 'Offene Leads',
        dealsMonth: 'Abschlüsse (Monat)',
        premiumVolume: 'Prämienvolumen'
      },
      charts: {
        revenueTitle: 'Prämienentwicklung',
        revenueSubtitle: 'Letzte 6 Monate',
        leadsTitle: 'Leads nach Status',
        leadsSubtitle: 'Aktueller Monat',
        revenueLegendCurrent: 'Aktuelles Jahr',
        revenueLegendPrevious: 'Vorjahr',
        leadsLegendOpen: 'Offen',
        leadsLegendWon: 'Gewonnen',
        leadsLegendLost: 'Verloren'
      },
      table: {
        title: 'Kunden & Leads',
        name: 'Name',
        status: 'Status',
        lastContact: 'Letzter Kontakt',
        potential: 'Potenzial',
        nextStep: 'Nächster Schritt',
        statusLabels: {
          prospect: 'Interessent',
          active: 'Aktiv',
          onboarding: 'Onboarding',
          dormant: 'Inaktiv'
        },
        potentialLabels: {
          high: 'Hoch',
          medium: 'Mittel',
          low: 'Gering'
        },
        nextSteps: {
          call: 'Telefonat planen',
          meeting: 'Vor-Ort Termin',
          proposal: 'Angebot senden',
          onboarding: 'Onboarding starten',
          renewal: 'Vertrag verlängern'
        }
      },
      activities: {
        title: 'Aktivitäten',
        followUp: 'Follow-up mit Müller Versicherung vorbereiten',
        proposal: 'Angebot für FleetSecure versenden',
        documents: 'Unterlagen für Contora prüfen',
        audit: 'Audit-Termin mit Atlas Maklerwerk vereinbaren',
        training: 'Digitales Training für neues Partner-Team planen'
      }
    }
  },
  en: {
    login: {
      title: 'IaaS Portal',
      username: 'Username',
      password: 'Password',
      submit: 'Sign in',
      submitting: 'Signing in …',
      required: 'Please enter username and password.',
      invalid: 'Invalid credentials.'
    },
    roles: {
      title: 'Role overview',
      subtitle: 'Pick a role to continue the experience. The content is static and meant for demonstration only.',
      logout: 'Logout',
      view: 'View',
      startJourney: 'Start journey',
      registrationCardTitle: 'Registration',
      registrationCardSubtitle: 'Launch the guided, AI-supported journey to onboard partners or customers with ease.',
      brokerPortal: 'Broker Portal',
      cards: {
        claims: {
          title: 'Claims Manager',
          description: 'Manage open claims and prioritize the next actions.'
        },
        partner: {
          title: 'Partner Manager',
          description: 'Nurture relationships with assessors, workshops, and service partners.'
        },
        reporting: {
          title: 'Fleet Reporting',
          description: 'Deliver fleet KPIs, dashboards, and claims reporting.'
        },
        fleetManagement: {
          title: 'Fleet Management',
          description: 'Manage vehicles, schedules, documentation, and driver assignments.'
        },
        marketing: {
          title: 'Marketing',
          description: 'Showcase the Insurfox platform for sales and stakeholders.'
        }
      }
    },
    marketing: {
      title: 'Insurfox Platform',
      subtitle: 'Digital front- and back-office solutions for brokers, MGAs, and fleets.',
      login: 'Login',
      highlights: {
        title: 'Highlights',
        ai: 'AI-powered processes',
        workflows: 'End-to-end workflows',
        insights: 'Reporting & insights'
      },
      modules: {
        title: 'Modules',
        backoffice: 'Backoffice & CRM',
        tenders: 'Tenders & submissions',
        fleetReporting: 'Fleet reporting',
        fleetManagement: 'Fleet management',
        registration: 'Registration assistant',
        compliance: 'Compliance'
      },
      why: {
        title: 'Why Insurfox?',
        fast: 'Work faster — less manual effort.',
        ai: 'Better decisions with AI insights.',
        scale: 'Scales with growing portfolios.'
      },
      cta: 'Go to overview'
    },
    marketingFleet: {
      hero: {
        title: 'IaaS Fleet Management',
        subtitle:
          'Manage vehicles, claims, schedules, documents and policies – powered by AI recommendations and real-time insights.',
        login: 'Login',
        illustrationTitle: 'AI live alerts',
        illustrationValue: '12 active signals',
        illustrationDescription: 'Live incidents, inspection load and downtime forecasts in one view.'
      },
      kpi: {
        realTime: 'Real-time status & alerts',
        ai: 'AI-powered prioritization',
        tuv: 'Inspection & maintenance planning',
        claims: 'Claims & cost control',
        docs: 'Documents & policies',
        compliance: 'Compliance & reporting'
      },
      manage: {
        title: 'What you can manage',
        features: {
          vehiclesMaster: {
            title: 'Vehicles & master data',
            description: 'VIN, equipment, GPS, sensor and usage history at a glance.'
          },
          realTime: {
            title: 'Real-time status & alerts',
            description: 'Live view of fleet notifications, alerts and incidents by asset.'
          },
          aiPrioritization: {
            title: 'AI-powered prioritization',
            description: 'AI ranks risks, claims and actions automatically by impact.'
          },
          tuvPlanning: {
            title: 'Inspection & maintenance planning',
            description: 'Coordinate inspections, maintenance capacity and replacement vehicles.'
          },
          claimsControl: {
            title: 'Claims & cost control',
            description: 'Track claim status, repair orders and cost forecasts centrally.'
          },
          docsPolicies: {
            title: 'Documents & policies',
            description: 'Manage contracts, policies and compliance records in one place.'
          }
        }
      },
      preview: {
        title: 'Real-time dashboard preview',
        subtitle: 'Live KPIs, alerts and incident context for your teams.',
        kpis: {
          uptime: 'Availability',
          openClaims: 'Open claims',
          downtime: 'Avg. downtime (month)'
        },
        incidentsTitle: 'Incidents per month',
        downtimeTitle: 'Downtime trend',
        table: {
          columns: {
            date: 'Date',
            vehicle: 'Vehicle',
            type: 'Type',
            status: 'Status',
            cost: 'Cost',
            ai: 'AI flag'
          },
          typeLabels: {
            motor: 'Motor',
            cargo: 'Cargo',
            liability: 'Liability'
          },
          statusLabels: {
            open: 'Open',
            repair: 'In repair',
            monitoring: 'Monitoring'
          },
          aiLabels: {
            alert: 'Alert',
            watch: 'Watch',
            info: 'Info'
          },
          rows: {
            row1: {
              date: 'Mar 03, 2025',
              vehicle: 'DE-789-XY',
              typeKey: 'motor',
              statusKey: 'repair',
              cost: '€8,450',
              aiKey: 'alert'
            },
            row2: {
              date: 'Mar 02, 2025',
              vehicle: 'HH-CARGO-12',
              typeKey: 'cargo',
              statusKey: 'open',
              cost: '€5,870',
              aiKey: 'watch'
            },
            row3: {
              date: 'Mar 01, 2025',
              vehicle: 'M-FL-2045',
              typeKey: 'liability',
              statusKey: 'monitoring',
              cost: '€2,180',
              aiKey: 'info'
            },
            row4: {
              date: 'Feb 27, 2025',
              vehicle: 'K-TR-330',
              typeKey: 'motor',
              statusKey: 'open',
              cost: '€1,260',
              aiKey: 'watch'
            },
            row5: {
              date: 'Feb 25, 2025',
              vehicle: 'B-DEL-901',
              typeKey: 'cargo',
              statusKey: 'repair',
              cost: '€9,120',
              aiKey: 'alert'
            }
          }
        }
      },
      usecases: {
        title: 'Who benefits?',
        items: {
          logistics: {
            title: 'Logistics operators',
            description: 'Complex truck, trailer and cargo fleets across Europe.'
          },
          delivery: {
            title: 'Delivery & service fleets',
            description: 'City and regional fleets with tight schedules and SLAs.'
          },
          industrial: {
            title: 'Industrial & mixed fleets',
            description: 'Cars, vans and special-purpose vehicles for construction or energy.'
          }
        }
      },
      cta: {
        primary: 'View demo',
        secondary: 'Open Fleet Reporting'
      }
    },
    fleetReporting: {
      title: 'Fleet Reporting Dashboard',
      subtitle: 'KPIs, anomalies and claims overview for your fleet',
      kpi: {
        totalClaims: 'Total claims (12 months)',
        openClaims: 'Open claims',
        lossRatio: 'Loss ratio',
        avgCost: 'Avg. claim cost',
        coverageRate: 'Coverage rate',
        activeVehicles: 'Active vehicles',
        downtime: 'Avg. downtime days / month',
        topCause: 'Top claim cause'
      },
      kpiValues: {
        topCause: 'Rear-end collision'
      },
      charts: {
        monthlyTitle: 'Claims per month',
        monthlySubtitle: 'Twelve months of demo data',
        coverageTitle: 'Coverage status',
        coverageSubtitle: 'Share of covered vs. uncovered',
        severityTitle: 'Claim severity distribution',
        severitySubtitle: 'Share per category'
      },
      coverageLabels: {
        covered: 'Covered',
        uncovered: 'Not covered'
      },
      severityLabels: {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      ai: {
        title: 'Insurfox AI – Fleet Insights',
        subtitle: 'Automated signals from historical and real-time data',
        items: {
          item1: 'Vehicle DE-789-XY shows a 40% higher claim frequency than the fleet average.',
          item2: 'Region Berlin reports 25% more incidents in Q4. Weather correlation detected.',
          item3: 'Driver coaching recommended for Team North based on recurring accident patterns.',
          item4: 'Cargo claims up 15% in November. Route optimization suggested.',
          item5: 'Trailer cluster South shows increased maneuvering damage. Review yard routing.',
          item6: 'Repair costs for “Delivery Vans” up 12%. Recommend preventive maintenance.'
        }
      },
      vehicles: {
        title: 'Vehicles',
        filters: {
          typeLabel: 'Vehicle type',
          statusLabel: 'Status',
          searchPlaceholder: 'Search license plate or VIN …',
          typeOptions: {
            all: 'All',
            car: 'Cars',
            truck: 'Trucks',
            trailer: 'Trailers',
            delivery: 'Delivery vans'
          },
          statusOptions: {
            all: 'All',
            active: 'Active',
            maintenance: 'In workshop',
            down: 'Out of service'
          }
        },
        cards: {
          type: 'Type',
          status: 'Status',
          location: 'Location',
          inspection: 'Next inspection',
          maintenance: 'Next maintenance',
          downtime: 'Downtime YTD',
          open: 'Open'
        },
        statusBadges: {
          active: 'Active',
          maintenance: 'Workshop',
          down: 'Out'
        }
      },
      filters: {
        typeLabel: 'Claim type',
        typeOptions: {
          all: 'All',
          motor: 'Motor',
          liability: 'Liability',
          cargo: 'Cargo'
        },
        rangeLabel: 'Time range',
        rangeOptions: {
          last30: 'Last 30 days',
          last12: 'Last 12 months'
        }
      },
      table: {
        title: 'Fleet claims',
        columns: {
          date: 'Date',
          vehicle: 'Vehicle',
          vin: 'VIN',
          location: 'Route / Location',
          type: 'Type',
          coverage: 'Coverage',
          status: 'Status',
          cost: 'Cost',
          ai: 'AI note',
          note: 'Notes'
        },
        types: {
          motor: 'Motor',
          liability: 'Liability',
          cargo: 'Cargo'
        },
        coverageBadges: {
          covered: 'Covered',
          uncovered: 'Not covered'
        },
        statusBadges: {
          open: 'Open',
          review: 'In review',
          closed: 'Closed'
        },
        aiBadges: {
          alert: 'Anomaly',
          watch: 'Watch',
          normal: 'Normal'
        },
        rows: {
          row1: {
            location: 'Berlin → Leipzig (A9)',
            ai: 'Telematics flagged harsh braking + sensor fault'
          },
          row2: {
            location: 'Hamburg port',
            ai: 'Re-check cargo lashing – recurring damage pattern'
          },
          row3: {
            location: 'Munich → Salzburg',
            ai: 'Insurer requested additional photo evidence'
          },
          row4: {
            location: 'Cologne city center',
            ai: 'Incident cluster at the same intersection'
          },
          row5: {
            location: 'Frankfurt air cargo hub',
            ai: 'Temperature deviation + delayed notification'
          }
        }
      }
    },
    fleetManagement: {
      title: 'Fleet Management',
      subtitle: 'Manage vehicles, documentation, insurance policies, and driver assignments.',
      kpi: {
        active: 'Active vehicles',
        workshop: 'In workshop',
        inspectionDue: 'Inspection due (30 days)',
        openTasks: 'Open tasks'
      },
      filters: {
        typeLabel: 'Vehicle type',
        statusLabel: 'Status',
        searchPlaceholder: 'Search license plate or VIN …',
        typeOptions: {
          all: 'All',
          car: 'Cars',
          truck: 'Trucks',
          trailer: 'Trailers',
          delivery: 'Delivery vans'
        },
        statusOptions: {
          all: 'All',
          active: 'Active',
          maintenance: 'In workshop',
          down: 'Out of service'
        }
      },
      list: {
        title: 'Vehicle list',
        open: 'Open',
        statusBadges: {
          active: 'Active',
          maintenance: 'Workshop',
          down: 'Out'
        }
      },
      detail: {
        title: 'Vehicle details',
        overview: 'Profile',
        usage: 'Usage',
        usageLabels: {
          longhaul: 'Long-haul',
          regional: 'Regional distribution',
          city: 'City delivery',
          cargo: 'Cargo & trailer'
        },
        schedule: 'Schedule & maintenance',
        inspection: 'Inspection',
        inspectionStatus: {
          ok: 'OK',
          dueSoon: 'Due soon',
          overdue: 'Overdue'
        },
        maintenance: 'Next maintenance',
        downtime: 'Downtime (12 months)',
        documents: 'Documents',
        documentsList: {
          registration: 'Registration.pdf',
          leasing: 'Leasing-agreement.pdf',
          maintenance: 'Maintenance-records.zip'
        },
        upload: 'Upload',
        policies: 'Insurance policies',
        policiesColumns: {
          number: 'Policy',
          line: 'Line',
          sum: 'Sum insured',
          deductible: 'Deductible',
          term: 'Term',
          status: 'Status'
        },
        policyLines: {
          liability: 'Liability',
          casco: 'Comprehensive',
          cargo: 'Cargo'
        },
        policyStatus: {
          active: 'Active',
          pending: 'Pending'
        },
        drivers: 'Driver assignment',
        primaryDriver: 'Primary driver',
        addDriver: 'Add driver',
        licenses: 'License classes',
        licenseValidity: 'Valid until',
        licenseStatus: {
          valid: 'Valid',
          expiring: 'Expiring soon',
          expired: 'Expired'
        }
      },
      driverPicker: {
        title: 'Available drivers',
        assign: 'Assign'
      }
    },
    registration: {
      title: 'Registration assistant',
      subtitle: 'Our bot keeps your progress locally and guides you through the journey step by step.',
      inputPlaceholder: 'Type your reply …',
      send: 'Send',
      restart: 'Restart',
      back: 'Back to overview',
      modeWrite: '✍️ Type',
      modeSpeak: '🎙️ Speak',
      voiceLabel: 'Choose a voice',
      voicePlaceholder: 'Select a voice',
      voiceLoading: 'Loading available voices …',
      voiceStart: 'Start',
      voiceActiveLabel: 'Active voice',
      voiceActiveBadge: 'Preferred',
      voiceStartListening: '🎙️ Start recording',
      voiceStopListening: '⏹️ Stop recording',
      voiceNoRecognition: 'Voice input is not supported on this device – please type your replies.',
      messageSource: {
        voice: 'Voice',
        text: 'Input',
        quick: 'Quick reply'
      },
      bot: {
        welcome: '👋 Welcome to Claimfox. I will guide you through the registration.',
        mode: 'Would you like to type the answers yourself or talk to me?',
        name: 'What is your full name?',
        email: 'Please enter your email address. We only use it for updates about the registration.',
        emailInvalid: 'That email address looks invalid. Please check it again.',
        phone: 'Would you like to add a phone number? You can also type “Skip”.',
        skip: 'No problem, I will skip the phone number.',
        role: 'How would you like to use Claimfox? Give me a short hint.',
        roleCustomer: '• Customers & drivers, e.g. for claims or inquiries',
        rolePartner: '• Partners & network such as assessors or repair shops',
        roleInternal: '• Internal teams for steering and reporting',
        privacy: 'Please confirm that you agree to our privacy policy.',
        privacyYes: 'Thanks for confirming. Let me summarize everything.',
        privacyNo: 'Without your consent we cannot continue.',
        privacyNoStop: 'You can restart the process anytime once you are ready.',
        summary: 'Here is your summary:\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nRole: {{role}}',
        submit: 'Submit registration',
        edit: 'Edit information',
        success: '🎉 Thank you! We have received your registration and will get back to you shortly.',
        voiceConfirm: 'Did I understand that correctly?',
        voiceSelect: 'Please choose the voice for your Claimsfox first.',
        voiceNotSupported: 'Your browser does not support speech output. Let us continue by typing.',
        voiceInputNotSupported: 'Listening is not available in this browser. Please type your response.',
        listening: '🎙️ Listening …'
      }
    },
    brokerPortal: {
      title: 'IaaS Broker Portal'
    },
    brokerLanding: {
      title: 'Broker Portal',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Broker Portal',
      heroSubline: 'Digital front- and back-office operations for European brokers, MGAs, and coverholders.',
      valueLine1: 'Back-office & CRM tailored to mid-sized commercial brokers.',
      valueLine2: 'Tender and placement platform for complex industrial programs.',
      valueLine3: 'AI-powered portfolio tools for retention, upsell, and client experience.',
      trust: {
        crm: 'CRM back office',
        tender: 'Tender platform',
        ai: 'AI tools'
      },
      heroStats: {
        coverage: '12+ industrial & specialty lines',
        automation: '80% automated workflows',
        retention: '98% renewal rate on core accounts'
      },
      heroCTAPrimary: 'View demo',
      heroCTASecondary: 'Login',
      featureSectionTitle: 'Everything brokers need to scale',
      featureSectionSubtitle: 'One platform for sales, service, and underwriting orchestration.',
      features: {
        crm: 'Back-office & CRM',
        tender: 'Tender & placements',
        ai: 'AI tools for portfolio & renewal',
        insights: 'Portfolio insights & reporting',
        workflows: 'Automated workflows',
        compliance: 'Compliance & documentation'
      },
      sectorsTitle: 'Lines & products',
      sectorsSubtitle: 'Unified processes for industrial and specialty lines across Europe.',
      sectorsBanner: 'Unified workflows for industrial and specialty lines.',
      sectorsList: {
        carriers: 'Carrier’s liability insurance',
        fleet: 'Fleet insurance',
        cargo: 'Cargo insurance',
        logistics: 'Logistics composite',
        contents: 'Contents insurance',
        liability: 'General liability',
        photovoltaic: 'Photovoltaic insurance',
        cyber: 'Cyber insurance',
        do: 'D&O insurance',
        legal: 'Legal expenses insurance',
        electronics: 'Electronics insurance',
        machinery: 'Machinery insurance',
        tradeCredit: 'Trade credit insurance'
      },
      whyTitle: 'Why Insurfox?',
      whySubtitle: 'We blend insurance DNA, technology, and regulatory readiness.',
      whyItems: {
        relationship: 'Dedicated experts guide your transformation from migration to run mode.',
        automation: 'Cross-platform processes with AI, automation, and open APIs.',
        compliance: 'EU hosting, auditing, and compliance for DORA-ready operations.'
      }
    },
    brokerCrm: {
      title: 'CRM & Reporting',
      subtitle: 'Stay on top of leads, customers, and daily broker activities at a glance.',
      ai: {
        title: 'AI insights',
        subtitle: 'Suggested priorities based on close probability and deal volume.',
        labels: {
          probability: 'Close probability',
          volume: 'Volume',
          recommendation: 'Recommendation'
        },
        items: {
          item1: {
            name: 'Miller Logistics GmbH',
            type: 'High close probability',
            value: '92%',
            action: 'Call today'
          },
          item2: {
            name: 'NordCargo AG',
            type: 'Highest volume',
            value: '€ 185k',
            action: 'Finalize proposal'
          },
          item3: {
            name: 'AlpenFleet KG',
            type: 'High close probability',
            value: '88%',
            action: 'Send follow-up email'
          },
          item4: {
            name: 'RheinTech Industries',
            type: 'Highest volume',
            value: '€ 240k',
            action: 'Initiate risk review'
          },
          item5: {
            name: 'Hansea Spedition GmbH',
            type: 'High close probability',
            value: '84%',
            action: 'Request documents'
          },
          item6: {
            name: 'Baltic Freight Solutions',
            type: 'Highest volume',
            value: '€ 310k',
            action: 'Negotiate terms'
          }
        }
      },
      kpi: {
        activeCustomers: 'Active customers',
        openLeads: 'Open leads',
        dealsMonth: 'Deals (month)',
        premiumVolume: 'Premium volume'
      },
      charts: {
        revenueTitle: 'Premium trend',
        revenueSubtitle: 'Last 6 months',
        leadsTitle: 'Leads by status',
        leadsSubtitle: 'Current month',
        revenueLegendCurrent: 'Current year',
        revenueLegendPrevious: 'Previous year',
        leadsLegendOpen: 'Open',
        leadsLegendWon: 'Won',
        leadsLegendLost: 'Lost'
      },
      table: {
        title: 'Customers & leads',
        name: 'Name',
        status: 'Status',
        lastContact: 'Last contact',
        potential: 'Potential',
        nextStep: 'Next step',
        statusLabels: {
          prospect: 'Prospect',
          active: 'Active',
          onboarding: 'Onboarding',
          dormant: 'Dormant'
        },
        potentialLabels: {
          high: 'High',
          medium: 'Medium',
          low: 'Low'
        },
        nextSteps: {
          call: 'Schedule call',
          meeting: 'On-site meeting',
          proposal: 'Send proposal',
          onboarding: 'Kick off onboarding',
          renewal: 'Renew contract'
        }
      },
      activities: {
        title: 'Activities',
        followUp: 'Prepare follow-up for Miller Insurance',
        proposal: 'Send proposal to FleetSecure',
        documents: 'Review documents for Contora',
        audit: 'Schedule audit with Atlas Brokerage',
        training: 'Plan digital training for new partner team'
      }
    }
  }
}
