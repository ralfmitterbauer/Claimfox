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
          title: 'Reporting',
          description: 'Erstelle Kennzahlen und Auswertungen für das Controlling.'
        }
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
    brokerLanding: {
      title: 'Maklerportal',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Maklerportal',
      heroSubline: 'Digitale Front- und Backend-Lösungen für Maklerhäuser, MGAs und Coverholder in Europa.',
      valueLine1: 'Backoffice & CRM speziell für mittelständische Makler und Industrieversicherungen.',
      valueLine2: 'Ausschreibungs- und Tenderplattform für komplexe Industrieprogramme.',
      valueLine3: 'KI-gestützte Tools für Bestand, Portfolio und Kundenkommunikation.',
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
      sectorsList: {
        carriers: 'Carrier’s Liability / Verkehrshaftung',
        fleet: 'Fleet / Flotte',
        cargo: 'Cargo / Transport & Waren',
        logistics: 'Logistics Composite / Logistik-Komposit',
        contents: 'Contents / Inhalt',
        liability: 'General Liability / Betriebshaftpflicht',
        photovoltaic: 'Photovoltaic / Photovoltaik',
        cyber: 'Cyber / Cyber',
        do: 'D&O / D&O',
        legal: 'Legal Expenses / Rechtsschutz',
        electronics: 'Electronics / Elektronik',
        machinery: 'Machinery / Maschinen',
        tradeCredit: 'Trade Credit / Warenkredit'
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
          title: 'Reporting',
          description: 'Create KPIs and dashboards for controlling.'
        }
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
    brokerLanding: {
      title: 'Broker Portal',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Broker Portal',
      heroSubline: 'Digital front- and back-office operations for European brokers, MGAs, and coverholders.',
      valueLine1: 'Back-office & CRM tailored to mid-sized commercial brokers.',
      valueLine2: 'Tender and placement platform for complex industrial programs.',
      valueLine3: 'AI-powered portfolio tools for retention, upsell, and client experience.',
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
      sectorsList: {
        carriers: 'Carrier’s liability',
        fleet: 'Fleet',
        cargo: 'Cargo & transport',
        logistics: 'Logistics composite',
        contents: 'Contents',
        liability: 'General liability',
        photovoltaic: 'Photovoltaic',
        cyber: 'Cyber',
        do: 'D&O',
        legal: 'Legal expenses',
        electronics: 'Electronics',
        machinery: 'Machinery',
        tradeCredit: 'Trade credit'
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
