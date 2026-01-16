"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/i18n/translations.ts
var translations_exports = {};
__export(translations_exports, {
  translations: () => translations
});
module.exports = __toCommonJS(translations_exports);
var translations = {
  de: {
    login: {
      title: "IaaS-Portal",
      username: "Benutzername",
      password: "Passwort",
      submit: "Anmelden",
      submitting: "Anmeldung l\xE4uft \u2026",
      required: "Bitte Benutzername und Passwort eingeben.",
      invalid: "Ung\xFCltige Anmeldedaten."
    },
    header: {
      login: "Login",
      logout: "Logout"
    },
    roles: {
      title: "Insurfox AI IaaS",
      subtitle: "AI-native Insurance-IaaS-Plattform zur Abbildung zentraler Versicherungsprozesse",
      logout: "Logout",
      view: "Ansehen",
      startJourney: "Starten",
      registrationCardTitle: "Registrierung",
      registrationCardSubtitle: "Starte die neue, KI-gest\xFCtzte Journey und melde Partner oder Kund:innen komfortabel an.",
      brokerPortal: "Maklerportal",
      sections: {
        overview: "Rollen\xFCbersicht",
        processes: "Prozesse",
        internal: "Interne Dokumentation",
        internalDocs: "Interne Dokumentationen",
        governance: "Governance",
        presentations: "Pr\xE4sentationen",
        development: "Development",
        projectLanding: "Projekt Landing Page"
      },
      internalDocs: {
        title: "Interne Dokumentationen",
        subtitle: "\xDCbersicht der internen Inhalte und Ressourcen."
      },
      overviewGroups: {
        insurance: "Versicherung",
        fleet: "Flotte",
        logistics: "Spedition / Logistik",
        broker: "Makler"
      },
      internalAuth: {
        title: "Interne Dokumentation",
        subtitle: "Bitte Zugangsdaten eingeben, um fortzufahren.",
        username: "Benutzername",
        pin: "PIN",
        submit: "Freigeben",
        error: "Zugangsdaten pr\xFCfen."
      },
      cards: {
        mvp: {
          title: "MVP \xDCbersicht",
          description: "Schneller Einstieg in alle Prozessschritte des MVP."
        },
        claims: {
          title: "Schadenmanager",
          description: "Sachbearbeiter-Cockpit f\xFCr schnelle Entscheidungen, Freigaben, Partnersteuerung und AI-Hinweise.",
          cta: "\xD6ffnen"
        },
        claimProcess: {
          title: "Schadenmeldung",
          description: "Demo-Chatbot mit Standortabfrage, automatischem Zeitstempel und strukturierter Erfassung.",
          cta: "Starten"
        },
        onboarding: {
          title: "Onboarding",
          description: "Aktueller Onboarding-Prozess mit Wizard und Fortschrittsanzeige."
        },
        registration: {
          title: "Registrierung",
          description: "Erfassung der E-Mail-Adresse als Startpunkt des Prozesses."
        },
        profile: {
          title: "User Profilseite",
          description: "\xDCbersicht und Pflege der erfassten Nutzer- und Firmendaten."
        },
        identification: {
          title: "User Identifikation",
          description: "Verifizierung von Ausweisdokument und Selfie-Abgleich."
        },
        regulatoryGovernance: {
          title: "Regulatory & AI Governance Framework",
          description: "Regulatorische Pr\xE4sentation f\xFCr Aufsicht, Audits und Governance."
        },
        auditAppendix: {
          title: "Audit Appendix",
          description: "Pr\xFCfungsnahe Referenz mit Rollen, Kontrollen und Governance-Nachweisen."
        },
        strategicDeepDive: {
          title: "Strategic Technology & AI Governance Deep Dive",
          description: "Strategischer Deep Dive zur Technologie- und Governance-Architektur."
        },
        insurfoxWhitepaper: {
          title: "Insurfox Whitepaper",
          description: "AI-getriebene Versicherungsplattform f\xFCr Logistik, Transport & Mobility."
        },
        requirementsCatalog: {
          title: "Anforderungskatalog",
          description: "Short Version f\xFCr die Zusammenarbeit mit Versicherungen auf der Insurfox AI IaaS Plattform."
        },
        questionsQic: {
          title: "Fragen QIC",
          description: "Questionnaire f\xFCr die Zusammenarbeit mit Insurfox AI IaaS."
        },
        setup: {
          title: "Setup",
          description: "Zielarchitektur, Plattform-Schichten und Integrationsprinzipien der Insurfox IaaS."
        },
        landingSitemap: {
          title: "Sitemap",
          description: "Sitemap und Navigationsstruktur der Insurfox Landing Page."
        },
        landingTools: {
          title: "Toolsliste",
          description: "Technologie- und Tool-\xDCbersicht der Landing Page."
        },
        partner: {
          title: "Partner Manager",
          description: "Pflege Kontakte zu Gutachtern, Werkst\xE4tten und Dienstleistern."
        },
        featureTree: {
          title: "Feature Tree",
          description: "Funktions\xFCbersicht f\xFCr Claims, Partnernetzwerke und Workflows.",
          cta: "\xD6ffnen"
        },
        getQuote: {
          title: "Angebot anfragen",
          description: "Mehrstufige Anfrage f\xFCr Frachtf\xFChrerhaftung und Fahrzeugdaten.",
          cta: "\xD6ffnen"
        },
        policyPurchase: {
          title: "Police kaufen",
          description: "Abschlussstrecke f\xFCr Policen und Zahlungsinformationen."
        },
        whitepaper: {
          title: "KI Whitepaper",
          description: "Native KI-Systeme auf souver\xE4ner IaaS f\xFCr Versicherer, Logistiker & Investoren."
        },
        intern: {
          title: "Intern",
          description: "Passwortgesch\xFCtzte Playbooks, Standards und technische Leitlinien."
        },
        aiOnboarding: {
          title: "KI Onboarding",
          description: "Entwickler-Perspektive f\xFCr KI im Onboarding-Prozess."
        },
        reporting: {
          title: "Fleet Reporting",
          description: "Fuhrpark-Kennzahlen, KPIs und Schadenreports bereitstellen."
        },
        fleetManagement: {
          title: "Fuhrparkverwaltung",
          description: "Verwalte Fahrzeuge, Termine, Dokumente und Fahrerzuordnung."
        },
        marketing: {
          title: "Marketing",
          description: "Pr\xE4sentiere die Insurfox Plattform f\xFCr Vertrieb und Stakeholder."
        },
        logistics: {
          title: "Spedition / Logistik",
          description: "Transporte, Routen, Versicherungen und Sch\xE4den zentral steuern \u2013 mit Echtzeit-Status und KI-Alerts.",
          cta: "Ansehen"
        }
      }
    },
    mvp: {
      title: "MVP \xDCbersicht",
      subtitle: "Alle Prozessschritte im \xDCberblick \u2013 klicke dich durch die MVP-Strecke.",
      nextStep: "N\xE4chster Schritt",
      steps: {
        registration: {
          title: "Registrierung",
          description: "Erfasse die E-Mail-Adresse und starte den Onboarding-Prozess."
        },
        onboarding: {
          title: "Onboarding",
          description: "Wizard zur Erfassung pers\xF6nlicher und Unternehmensdaten."
        },
        getQuote: {
          title: "Angebot anfragen",
          description: "Mehrstufige Anfrage f\xFCr Versicherungs- und Fahrzeugdaten."
        },
        policyPurchase: {
          title: "Police kaufen",
          description: "Verbindlicher Abschluss und Zahlungsdetails f\xFCr die Police."
        },
        authentication: {
          title: "User Authentication",
          description: "Login, Zugriff und Rollenpr\xFCfung f\xFCr die MVP-Strecke."
        },
        claimProcess: {
          title: "Schadenmeldung",
          description: "Chatbasierte Erfassung mit Standort, Zeitstempel und strukturierten Daten."
        },
        profile: {
          title: "User Profilseite",
          description: "Pers\xF6nliche und organisatorische Angaben im \xDCberblick."
        },
        aiModules: {
          title: "KI Module",
          description: "Automatisierungen, Priorisierung und KI-Insights f\xFCr Entscheider."
        },
        dashboards: {
          title: "Dashboards",
          description: "KPIs, Reports und Status\xFCbersichten f\xFCr das MVP."
        }
      }
    },
    profile: {
      title: "Profil",
      subtitle: "Vervollst\xE4ndigen Sie Ihr Profil Schritt f\xFCr Schritt.",
      overview: {
        title: "Mein Profil",
        subtitle: "Verwalten Sie Ihre Daten und greifen Sie auf weitere Bereiche zu.",
        edit: "Profil bearbeiten",
        open: "\xD6ffnen",
        back: "Zur\xFCck zur \xDCbersicht",
        reset: "Daten zur\xFCcksetzen",
        summaryTitle: "Ihre Basisdaten",
        summarySubtitle: "Ein kurzer \xDCberblick der wichtigsten Angaben.",
        sections: {
          title: "Bereiche",
          onboarding: "Onboarding",
          personal: "Pers\xF6nliche Daten",
          company: "Unternehmensdaten",
          insurances: "Meine Versicherungen",
          fleet: "Mein Fuhrpark",
          locations: "Meine Standorte"
        }
      },
      onboarding: {
        title: "Onboarding",
        subtitle: "Pers\xF6nliche und Unternehmensdaten erfassen.",
        cardTitle: "Onboarding",
        cardSubtitle: "Erfassen Sie Ihre Daten in zwei Schritten.",
        start: "Onboarding starten",
        resume: "Onboarding fortsetzen",
        completed: "Profil abgeschlossen",
        incomplete: "Onboarding noch nicht abgeschlossen",
        requiredHint: "Pflichtfeld"
      },
      stepLabel: "Schritt {{current}} von {{total}}",
      saved: "Gespeichert",
      passwordMismatch: "Die Passw\xF6rter stimmen nicht \xFCberein.",
      registration: {
        title: "Registrierung",
        emailHint: "Diese E-Mail wurde bei der Registrierung erfasst.",
        consentHint: "Einwilligung zur Datenverarbeitung liegt vor."
      },
      progress: {
        title: "Fertigstellungsgrad",
        caption: "{{percent}}% abgeschlossen"
      },
      steps: {
        personal: {
          title: "Pers\xF6nliche Daten",
          subtitle: "Kontaktdaten, Sprache und Sicherheitsangaben."
        },
        company: {
          title: "Unternehmensdaten",
          subtitle: "Firmen- und Adressdaten f\xFCr den Vertragsabschluss."
        }
      },
      actions: {
        back: "Zur\xFCck",
        next: "Weiter",
        save: "\xC4nderungen speichern",
        finish: "Profil abschlie\xDFen",
        later: "Sp\xE4ter fortsetzen",
        skip: "\xDCberspringen"
      },
      fields: {
        email: "E-Mail Adresse",
        privacyConsent: "Datenschutz-Zustimmung",
        companyName: "Firmenname inkl. Rechtsform",
        legalForm: "Rechtsform",
        street: "Stra\xDFe",
        houseNumber: "Hausnummer",
        addressAdditional: "Adresszusatz",
        zip: "Postleitzahl",
        city: "Stadt",
        country: "Land",
        vatId: "USt-IDNr.",
        directorFirstName: "Vorname des Gesch\xE4ftsf\xFChrers",
        directorLastName: "Nachname des Gesch\xE4ftsf\xFChrers",
        salutation: "Anrede",
        contactFirstName: "Vorname",
        contactLastName: "Nachname",
        phoneCountryCode: "L\xE4ndercode",
        phone: "Telefon",
        language: "Sprache",
        password: "Passwort",
        passwordConfirm: "Passwort wiederholen",
        advisorCode: "Beraternummer",
        kycBranch: "Niederlassung in Sanktionsregion vorhanden?",
        kycDirector: "Gesch\xE4ftsf\xFChrer/Verwaltungsrat wohnhaft in Sanktionsregion?",
        kycBusiness: "Gesch\xE4ftsbeziehungen zu sanktionierten Regionen?"
      },
      options: {
        yes: "Ja",
        no: "Nein",
        select: "Bitte ausw\xE4hlen",
        language: {
          de: "Deutsch",
          en: "Englisch"
        }
      },
      placeholders: {
        insurances: "Hier entsteht der Bereich f\xFCr Ihre Versicherungen.",
        fleet: "Hier entsteht der Bereich f\xFCr Ihren Fuhrpark.",
        locations: "Hier entsteht der Bereich f\xFCr Ihre Standorte."
      }
    },
    policyPurchase: {
      title: "Police kaufen",
      subtitle: "Abschlussstrecke f\xFCr Policen und Zahlungsinformationen.",
      placeholder: "Hier entsteht die Kaufstrecke f\xFCr Policen."
    },
    whitepaper: {
      kicker: "Whitepaper",
      heroTitle: "Native KI-Systeme auf souver\xE4ner IaaS",
      heroSubtitle: "Zukunftssichere KI-Nutzung f\xFCr Versicherer, Logistiker & Investoren.",
      heroChip: "Sovereign AI Layer",
      summaryTitle: "Executive Summary",
      summarySubtitle: "Strategische Einordnung f\xFCr Entscheider.",
      summaryBody: "Dieses Whitepaper beschreibt den Einsatz nativer KI-Systeme auf einer souver\xE4nen IaaS-Plattform f\xFCr Versicherer, Logistiker und Investoren. Ziel ist es, KI effizient, regulatorisch sicher und wirtschaftlich skalierbar einzusetzen.",
      metrics: {
        ai: "Native KI-Stacks",
        sovereign: "Datenhoheit garantiert",
        scalable: "Skalierbar & auditierbar"
      },
      useCases: {
        title: "Zul\xE4ssige KI-Anwendungsf\xE4lle",
        subtitle: "Fokus auf klare Use Cases mit messbarem Mehrwert und regulatorischer Absicherung.",
        risk: "Risiko-Scoring",
        claim: "Schadenprognose",
        fraud: "Betrugserkennung",
        docs: "Dokumentenanalyse",
        maintenance: "Predictive Maintenance",
        route: "Routenoptimierung"
      },
      sections: {
        context: {
          title: "Ausgangslage",
          body: "KI wird zum zentralen Wettbewerbsfaktor in Versicherung und Logistik. Gleichzeitig steigen Anforderungen an Datenschutz, Transparenz und Haftung."
        },
        native: {
          title: "Native KI auf IaaS",
          body: "Native KI-Systeme laufen vollst\xE4ndig innerhalb der Infrastruktur. Daten, Modelle und Entscheidungen bleiben unter Kontrolle der Betreiber und sind auditierbar."
        },
        ecosystem: {
          title: "Beteiligte im \xD6kosystem",
          body: "Versicherer, R\xFCckversicherer, Flottenbetreiber, Logistikunternehmen und Partner greifen rollenbasiert auf KI-Services zu."
        },
        useCases: {
          title: "KI-Anwendungsf\xE4lle",
          body: "Risiko-Scoring, Schadenprognose, Betrugserkennung, Dokumentenanalyse, Predictive Maintenance und Routenoptimierung."
        },
        data: {
          title: "Datenbasis",
          body: "Genutzt werden Fahrzeug-, Telematik-, Wartungs- und Schadendaten. Personenbezogene Daten nur pseudonymisiert und zweckgebunden."
        },
        governance: {
          title: "Governance & Compliance",
          body: "Datensouver\xE4nit\xE4t, Modellversionierung, Audit-Trails und Vorbereitung auf EU AI Act sind integraler Bestandteil."
        },
        investors: {
          title: "Investorenperspektive",
          body: "Hohe Skalierbarkeit, regulatorischer R\xFCckenwind und starke Kundenbindung machen dieses Modell wirtschaftlich attraktiv."
        },
        conclusion: {
          title: "Fazit",
          body: "Native KI auf IaaS verbindet Innovation, Sicherheit und Skalierbarkeit und schafft nachhaltigen Mehrwert."
        }
      },
      cta: {
        primary: "Whitepaper anfordern",
        secondary: "Expertenkontakt",
        title: "Bereit f\xFCr souver\xE4ne KI?",
        subtitle: "Erhalten Sie das Whitepaper und sprechen Sie mit unserem Team \xFCber Ihren AI-Stack."
      }
    },
    aiOnboarding: {
      kicker: "KI Onboarding",
      title: "KI im Onboarding-Prozess",
      subtitle: "So nutzt das Entwicklerteam KI, um Datenqualit\xE4t, Compliance und Geschwindigkeit zu optimieren.",
      heroChip: "Developer View",
      summaryTitle: "\xDCberblick",
      summarySubtitle: "Technische Perspektive auf KI-gest\xFCtztes Onboarding.",
      sections: {
        intent: {
          title: "Zielbild & Nutzen",
          body: "KI unterst\xFCtzt das Onboarding mit Validierungen, Vorschl\xE4gen und Priorisierungen \u2014 ohne autonome Entscheidungen."
        },
        pipeline: {
          title: "Datenpipeline",
          body: "Eingaben werden validiert, pseudonymisiert und in strukturierte Features \xFCberf\xFChrt, bevor Modelle bewertet werden."
        },
        guardrails: {
          title: "Guardrails & Compliance",
          body: "Allowlists, Audit-Trails und Model Approvals sind fest im Code verankert."
        },
        tools: {
          title: "Tooling & Monitoring",
          body: "Model Registry, Feature Store und Logging sorgen f\xFCr Transparenz und Reproduzierbarkeit."
        },
        rollout: {
          title: "Rollout-Strategie",
          body: "Feature Flags, Shadow Runs und Human-in-the-Loop sichern die Qualit\xE4t im Live-Betrieb."
        }
      },
      cta: {
        primary: "Architektur ansehen",
        secondary: "Team kontaktieren",
        title: "N\xE4chster Schritt",
        subtitle: "Diskutieren Sie den KI-Einsatz im Onboarding mit unserem Entwicklerteam."
      },
      architectureTitle: "Architektur\xFCbersicht"
    },
    identification: {
      title: "User Identifikation",
      subtitle: "Identit\xE4tspr\xFCfung mit Dokumenten-Scan, Echtheitspr\xFCfung und Selfie-Abgleich.",
      progress: "Prozessfortschritt",
      steps: {
        start: "Start",
        capture: "Dokument-Scan",
        verification: "Echtheitspr\xFCfung",
        selfie: "Selfie-Abgleich",
        summary: "Abschluss"
      },
      intro: {
        title: "Identifizierung starten",
        body: "Wir f\xFChren Sie sicher durch die Pr\xFCfung. Bitte halten Sie Ihr Ausweisdokument bereit und sorgen Sie f\xFCr gute Lichtverh\xE4ltnisse."
      },
      document: {
        typeId: "Personalausweis",
        typePassport: "Reisepass",
        typeOther: "Anderes Dokument"
      },
      capture: {
        title: "Dokument scannen",
        subtitle: "Laden Sie ein Foto der Vorder- und R\xFCckseite hoch.",
        front: "Vorderseite",
        back: "R\xFCckseite",
        placeholder: "Noch kein Bild"
      },
      verify: {
        title: "Dokument verifizieren",
        subtitle: "Echtheit, MRZ und L\xE4ndercode werden gepr\xFCft.",
        issuing: "Ausstellendes Land",
        authenticity: "Echtheitspr\xFCfung",
        mrz: "MRZ-Auslesung",
        failed: "Verifizierung fehlgeschlagen. Bitte Dokumente erneut pr\xFCfen."
      },
      selfie: {
        title: "Selfie aufnehmen",
        subtitle: "Nehmen Sie ein Selfie auf, um den Abgleich zu starten.",
        capture: "Selfie-Datei",
        overlay: "Gesicht in die Silhouette setzen"
      },
      summary: {
        title: "Ergebnis",
        subtitle: "Dokumentation des Pr\xFCfprozesses.",
        status: "Status",
        docType: "Dokumenttyp",
        country: "Ausstellendes Land",
        audit: "Audit-ID",
        ocr: "OCR-Auslesung",
        notice: "Alle Pr\xFCfergebnisse wurden protokolliert. Bei Misserfolg wenden Sie sich an den Support."
      },
      status: {
        ok: "Bestanden",
        pending: "Ausstehend",
        success: "Erfolgreich",
        failed: "Misserfolg"
      },
      actions: {
        start: "Prozess starten",
        back: "Zur\xFCck",
        next: "Weiter",
        verify: "Jetzt pr\xFCfen",
        restart: "Neu starten"
      },
      ocr: {
        title: "OCR-Auslesung",
        name: "Name",
        number: "Dokumentnummer",
        dob: "Geburtsdatum",
        expiry: "Ablaufdatum",
        nationality: "Nationalit\xE4t"
      },
      camera: {
        capture: "Kamera \xF6ffnen",
        take: "Foto aufnehmen",
        guide: "Dokument innerhalb des Rahmens ausrichten",
        slot: "Ausweisfeld",
        error: "Kamera konnte nicht gestartet werden.",
        title: {
          front: "Vorderseite erfassen",
          back: "R\xFCckseite erfassen",
          selfie: "Selfie aufnehmen"
        }
      }
    },
    nativeAi: {
      kicker: "INSURFOX AI IaaS",
      title: "Insurfox native AI",
      subtitle: "Sichere, native KI f\xFCr Versicherungen, InsurTech & Health-Care",
      heroChip: "Regulated AI Stack",
      deckTitle: "Pr\xE4sentation",
      deckSubtitle: "Business- und Compliance-Deck f\xFCr regulierte M\xE4rkte.",
      slides: {
        1: {
          title: "Insurfox AI IaaS",
          body: "Die KI-native Versicherungsplattform f\xFCr regulierte M\xE4rkte.<br/>Sichere, DSGVO-, GDPR- & BaFin-konforme KI f\xFCr Insurance, Mobility & Health."
        },
        2: {
          title: "Executive Summary",
          body: "Insurfox ist eine vollintegrierte Insurance-IaaS.<br/>KI ist nativ Teil der Plattform, kein externes Add-on.<br/>Sensible Daten werden sicher, kontrolliert und regulatorisch korrekt verarbeitet.<br/>Keine externen KI-Anbieter, kein Daten- oder Modellabfluss.<br/><strong>Bottom Line:</strong> KI wird bei Insurfox produktiv nutzbar \u2013 ohne regulatorisches Risiko."
        },
        3: {
          title: "Das Kernproblem im Markt",
          body: "Fragmentierte Systeme, externe KI-SaaS & Hyperscaler, unklare Datenfl\xFCsse, Black-Box-Entscheidungen.<br/><strong>Risiken:</strong> DSGVO-Verst\xF6\xDFe, BaFin-Beanstandungen, Kontrollverlust \xFCber KI & IP, Reputationsrisiken."
        },
        4: {
          title: "Der Insurfox-Ansatz",
          body: "KI als Infrastruktur \u2013 nicht als Tool.<br/>Eine Plattform f\xFCr alle Versicherungsprozesse.<br/>Integrierte Makler- & Dienstleister-\xD6kosysteme.<br/>Native KI innerhalb der IaaS.<br/>Klare Trennung von Entscheidungshilfe und Entscheidungshoheit."
        },
        5: {
          title: "Gesamtarchitektur (High Level)",
          body: "INSURFOX IaaS verbindet Versicherer, Broker Portal, Core Engine und Native KI Layer.<br/>Keine externen KI-Systeme, keine Datenweitergabe."
        },
        6: {
          title: "Was \u201ENative KI\u201C bei Insurfox bedeutet",
          body: "Eigene KI-Modelle, Trainingspipelines, Inferenz-Services und Model-Registries.<br/>Keine externen KI-APIs, kein Fremdtraining, kein Modell-Sharing."
        },
        7: {
          title: "KI-Use-Cases (Insurance Core)",
          body: "Risiko- & Pricing-Berechnung, Fraud Detection & Anomalien, Portfolio- & Loss-Ratio-Analysen, Schaden- & Prozessoptimierung, Prolongations- & Renewal-Hinweise.<br/>Immer entscheidungsunterst\xFCtzend."
        },
        8: {
          title: "Sensible Daten",
          body: "<strong>Insurfox schlie\xDFt sensible Daten nicht aus \u2013 sondern macht sie sicher nutzbar.</strong><br/>Gesundheitsdaten, Biometrische Daten, Bewegungs- & Standortdaten."
        },
        9: {
          title: "Rechtliche Grundlage",
          body: "Verarbeitung sensibler Daten nur bei gesetzlicher Grundlage, expliziter Einwilligung, klar definiertem Versicherungszweck.<br/>Grunds\xE4tze: Zweckbindung, Datensparsamkeit, Transparenz, L\xF6schkonzepte."
        },
        10: {
          title: "Sensitive-Data-Architektur",
          body: "Sensitive Data Zone: isolierte Datenr\xE4ume, eigene KI-Modelle, getrennte Trainingspipelines."
        },
        11: {
          title: "KI-Governance (BaFin-konform)",
          body: "KI gibt Empfehlungen, keine Entscheidungen. Human-in-the-Loop verpflichtend. Erkl\xE4rbare Ergebnisse. Vollst\xE4ndige Audit-Trails.<br/>Keine automatische Ablehnung oder K\xFCndigung."
        },
        12: {
          title: "Datenschutz & Datensicherheit",
          body: "Mandantentrennung, rollenbasierte Zugriffe, Pseudonymisierung, Verschl\xFCsselung, Protokollierung aller KI-Outputs.<br/>Wichtig: KI-Modelle lernen nicht \xFCber Kunden hinweg."
        },
        13: {
          title: "Schnittstellen zur Versicherung",
          body: "Inbound: Vertrags- & Policendaten, Schadenhistorien, Tarif- & Regelwerke, optionale Real-Time-Daten.<br/>Outbound: Risiko-Scores, Preisempfehlungen, Fraud-Hinweise, Entscheidungs-Dashboards."
        },
        14: {
          title: "Historische Datenanforderungen",
          body: "<strong>Pflicht:</strong> Policen & Laufzeiten, Schadenarten & -h\xF6hen, Abwicklungsverl\xE4ufe, Objekt- & Risikodaten.<br/><strong>Optional:</strong> Telematik, Prozesszeiten, Ereignisdaten, Health-Programme."
        },
        15: {
          title: "Warum keine externe KI?",
          body: "Externe KI bedeutet Datenabfluss, Kontrollverlust, IP-Risiken, regulatorische Unsicherheit.<br/>Insurfox bedeutet volle Datenhoheit, volle KI-Kontrolle, volle Auditierbarkeit."
        },
        16: {
          title: "Vorteile f\xFCr Versicherungen",
          body: "Schnellere Underwriting-Prozesse, bessere Loss Ratios, weniger Fraud, saubere BaFin-Kommunikation, zukunftssichere KI-Strategie."
        },
        17: {
          title: "Vorteile f\xFCr Investoren",
          body: "Tiefer technologischer Burggraben, regulatorische Eintrittsbarriere, skalierbares IaaS-Modell, hohe Kundenbindung, KI + Insurance IP."
        },
        18: {
          title: "EU AI Act & Zukunftssicherheit",
          body: "Vorbereitung auf Hochrisiko-KI, dokumentierte Governance, nachvollziehbare Entscheidungslogik, Audit- & Reporting-F\xE4higkeit.<br/>Insurfox ist EU-AI-Act-ready."
        },
        19: {
          title: "Zusammenfassung",
          body: "Insurfox macht KI im Versicherungswesen produktiv, sicher und regulatorisch akzeptiert \u2013 auch mit sensiblen Daten."
        },
        20: {
          title: "Abschluss",
          body: "Insurfox AI IaaS \u2013 die kontrollierte Antwort auf KI im regulierten Versicherungsmarkt."
        }
      }
    },
    featureTree: {
      title: "Feature Tree",
      subtitle: "Strukturierte \xDCbersicht der Plattformfunktionen f\xFCr Claims und Partnernetzwerke.",
      sections: {
        intake: {
          title: "Schadenaufnahme",
          subtitle: "Eingang, Pr\xFCfung und Steuerung.",
          items: {
            claimIntake: "Digitale Schadenaufnahme",
            coverageCheck: "Deckungspr\xFCfung",
            slaRules: "SLA- und Eskalationslogik",
            taskRouting: "Task-Routing & Priorisierung"
          }
        },
        partners: {
          title: "Partnernetzwerk",
          subtitle: "Werkst\xE4tten, Gutachter, Dienstleister.",
          items: {
            partnerDirectory: "Partnerverzeichnis",
            onboarding: "Onboarding & Vertr\xE4ge",
            capacity: "Kapazit\xE4tssteuerung",
            performance: "Performance & Qualit\xE4t"
          }
        },
        media: {
          title: "Medien & Dokumente",
          subtitle: "Fotos, Belege, Nachweise.",
          items: {
            photoUpload: "Foto- & Video-Uploads",
            damageAi: "Schadenbild-AI",
            documentHub: "Dokumenten-Hub",
            versioning: "Versionierung & Freigaben"
          }
        },
        finance: {
          title: "Kosten & Rechnungen",
          subtitle: "KV, Freigabe, Abrechnung.",
          items: {
            estimates: "Kostenvoranschl\xE4ge",
            invoices: "Rechnungspr\xFCfung",
            approvals: "Freigabe-Workflows",
            reserves: "Reservenmanagement"
          }
        },
        repair: {
          title: "Reparatursteuerung",
          subtitle: "Status, Teile, \xDCbergabe.",
          items: {
            statusTracking: "Live-Status",
            parts: "Teilebeschaffung",
            milestones: "Meilensteine",
            handover: "Fahrzeug\xFCbergabe"
          }
        },
        comms: {
          title: "Kommunikation",
          subtitle: "Abstimmung & R\xFCckfragen.",
          items: {
            liveChat: "Livechat",
            questions: "R\xFCckfragen & Aufgaben",
            notifications: "Benachrichtigungen",
            auditTrail: "Audit Trail"
          }
        },
        analytics: {
          title: "Analytics & AI",
          subtitle: "KPIs, Risiken, Insights.",
          items: {
            kpis: "KPI-Dashboards",
            trendReports: "Trend-Reports",
            benchmarks: "Benchmarking",
            fraudSignals: "Fraud-Signale"
          }
        },
        compliance: {
          title: "Compliance",
          subtitle: "Sicherheit & Governance.",
          items: {
            roles: "Rollen & Rechte",
            gdpr: "DSGVO & Privacy",
            accessLogs: "Zugriffsprotokolle",
            retention: "Aufbewahrung"
          }
        }
      }
    },
    getQuote: {
      title: "Angebot anfragen",
      subtitle: "Bitte machen Sie Ihre Angaben. Wir senden Ihnen Ihr Angebot an Ihre E-Mail-Adresse.",
      progress: {
        title: "COMPARIOSN",
        subtitle: "Angebot beantragen",
        step: "Schritt 1 von 10"
      },
      company: {
        title: "Ihre Daten",
        subtitle: "An welchem Standort befindet sich Ihr Unternehmen?",
        locationLabel: "Bitte w\xE4hlen Sie ein Land",
        locationPlaceholder: "Bitte w\xE4hlen Sie ein Land",
        location: {
          de: "Deutschland",
          eu: "Europa"
        }
      },
      vehicles: {
        title: "Zu versichernde Fahrzeuge",
        subtitle: "Fahrzeuganzahl, Gewicht und Geltungsgebiet.",
        primary: "Frachtf\xFChrerhaftungsversicherung",
        additional: "Weitere zu versichernde Fahrzeuge",
        count: "Anzahl der zu versichernden Fahrzeuge",
        weight: "Zul\xE4ssiges Gesamtgewicht",
        regionLabel: "Geltungsgebiet",
        add: "Weitere Fahrzeuge hinzuf\xFCgen",
        region: {
          de: "Deutschland",
          eu: "Europa"
        }
      },
      deductible: {
        title: "Selbstbeteiligung und Risiken",
        subtitle: "Bitte w\xE4hlen Sie Ihre Optionen.",
        amountLabel: "H\xF6he der Selbstbeteiligung",
        courier: "Mitversicherung der Haftung bei Transport von Kurier-Express Paketen",
        cold: "Mitversicherung der Haftung bei Transport von K\xFChlgut mit entsprechenden Fahrzeugen"
      },
      preInsurer: {
        title: "Vorversicherer",
        subtitle: "Angaben zum Vorversicherer",
        exists: "Bestand eine Vorversicherung in den letzten 5 Jahren?",
        name: "Name des Versicherers",
        number: "Versicherungsnummer"
      },
      summary: {
        title: "Pr\xE4mie",
        subtitle: "F\xFCr ein Kalenderjahr",
        netAnnual: "Jahresnettopr\xE4mie",
        tax: "Versicherungssteuer (Deutschland 19%)",
        grossAnnual: "Jahresbruttopr\xE4mie",
        contract: "Vertragslaufzeit"
      },
      confirm: {
        title: "Angebot beantragen",
        subtitle: "Ihre Angaben sind unvollst\xE4ndig? Pflichtfelder pr\xFCfen.",
        privacy: "Ich habe die Datenschutzerkl\xE4rung gelesen und stimme ihr zu.",
        submit: "Angebot beantragen"
      },
      yes: "Ja",
      no: "Nein"
    },
    claimProcess: {
      title: "Schadenmeldung",
      subtitle: "",
      chatTitle: "Schadenaufnahme Assistent",
      chatSubtitle: "",
      chatStatus: "Live",
      intro: "Guten Tag. Ich helfe Ihnen bei der Schadenmeldung.",
      timeStampMessage: "Zeitstempel gesetzt: {{date}} \xB7 {{time}}.",
      askTime: "Wann ist der Schaden passiert?",
      timeNow: "Gerade passiert",
      timeOther: "Andere Zeit",
      timeOtherPlaceholder: "Datum und Uhrzeit eingeben \u2026",
      confirmTime: "Zeit best\xE4tigen",
      askLocationChoice: "War der Schaden am aktuellen Standort?",
      locationCurrent: "Aktueller Standort",
      locationOther: "Anderer Ort",
      askLocation: "Standort zur Adresspr\xFCfung freigeben?",
      askAddressConfirm: "Adresse pr\xFCfen und best\xE4tigen.",
      addressConfirmed: "Adresse best\xE4tigt.",
      confirmAddress: "Adresse best\xE4tigen",
      askPhotos: "Bitte Fotos zum Schaden hochladen.",
      photosUploaded: "{{count}} Foto(s) hochgeladen.",
      photosSkipped: "Keine Fotos \xFCbermittelt.",
      skipPhotos: "Ohne Fotos fortfahren",
      askPersonDetails: "Bitte Vorname, Nachname und Kennzeichen erg\xE4nzen.",
      confirmPersonDetails: "Angaben best\xE4tigen",
      askDescription: "Bitte kurz beschreiben, was passiert ist.",
      firstName: "Vorname",
      lastName: "Nachname",
      licensePlate: "Kennzeichen",
      locationButton: "Standort freigeben",
      locationPending: "Standort wird abgefragt \u2026",
      locationPendingShort: "Wird ermittelt \u2026",
      locationGranted: "Standort erfasst: {{address}}",
      locationDenied: "Standort nicht verf\xFCgbar \u2013 bitte Adresse manuell erg\xE4nzen.",
      locationUnknown: "Nicht erfasst",
      nextPrompt: "Wir starten mit der Standortabfrage.",
      botAck: "Danke, ich habe das notiert.",
      claimNumberMessage: "Ihre Schadennummer: {{claimNumber}}.",
      inputPlaceholder: "Kurzbeschreibung \u2026",
      openManager: "Schadenmanager \xF6ffnen",
      send: "Absenden",
      back: "Zur\xFCck",
      street: "Stra\xDFe",
      houseNumber: "Hausnummer",
      postalCode: "PLZ",
      city: "Ort",
      upload: "Bilder hochladen",
      uploadEmpty: "Keine Bilder ausgew\xE4hlt",
      uploadCount: "{{count}} Bild(er) ausgew\xE4hlt",
      valuePending: "Ausstehend",
      infoTitle: "Live-Check",
      infoSubtitle: "",
      infoLocation: "Standort",
      infoDate: "Datum",
      infoTime: "Uhrzeit",
      infoClaimNumber: "Schadennummer",
      infoPhotos: "Fotos",
      infoDescription: "Schadenhergang",
      infoIncidentTime: "Schadenszeit",
      infoFirstName: "Vorname",
      infoLastName: "Nachname",
      infoLicensePlate: "Kennzeichen",
      infoStatus: "Status",
      statusOpen: "Offen",
      demoHint: "Zeitstempel und Standort werden direkt dem Schadenticket zugeordnet."
    },
    logisticsLanding: {
      badge: "Insurfox IaaS",
      title: "IaaS Logistikportal",
      subtitle: "Echtzeit-Transportstatus, Frachtversicherung und Schadensteuerung \u2013 alles in einer Plattform.",
      login: "Login",
      kpi: {
        liveShipments: "Live Sendungen",
        coverageRate: "Deckungsquote",
        openIncidents: "Offene Incidents",
        etaDeviation: "\xD8 ETA Abweichung"
      },
      kpiValues: {
        liveShipments: "128",
        coverageRate: "92 %",
        openIncidents: "7",
        etaDeviation: "18 Min"
      },
      cards: {
        realtime: {
          title: "Transportstatus in Echtzeit",
          body: "ETA, Route, Statuswechsel und Alerts \u2013 pro Sendung und pro Kunde."
        },
        coverage: {
          title: "Frachtversicherung & Deckung",
          body: "Frachtf\xFChrerhaftpflicht, Cargo und Zusatzdeckungen je Auftrag \u2013 transparent und nachvollziehbar."
        },
        incidents: {
          title: "Sch\xE4den & Incidents",
          body: "Diebstahl, Besch\xE4digung, Verz\xF6gerung, Temperatur \u2013 inkl. Dokumenten, Fotos, Partnern."
        },
        thirdparty: {
          title: "Third Party & Auftraggeber",
          body: "Auftraggeber, Ansprechpartner, SLA und Abrechnung \u2013 direkt im Transportkontext."
        },
        ai: {
          title: "KI-Empfehlungen & Alerts",
          body: "Proaktive Hinweise zu Risiko, Betrug, Kosten, Routen und Deckungsbedarf."
        },
        routes: {
          title: "Routen & Risiken",
          body: "Routenprofil, Risikozonen, Wetter- und Stauindikatoren \u2013 inklusive Live-Warnungen pro Strecke."
        }
      },
      preview: {
        title: "Live Dashboard Preview",
        eta: "ETA",
        temp: "Temp",
        customs: "Zoll",
        footer: "Demo-Daten mit Live KPI Trend (ETA, Temperatur, Customs)."
      },
      previewValues: {
        eta: "18 Min",
        temp: "+2 \xB0C",
        customs: "Freigegeben"
      }
    },
    logisticsApp: {
      title: "Logistik Cockpit",
      subtitle: "Auftr\xE4ge, Routen, Versicherungsschutz und Incidents im \xDCberblick",
      sections: {
        overview: "\xDCbersicht",
        shipments: "Aktuelle Auftr\xE4ge",
        coverage: "Versicherung & Deckung",
        incidents: "Sch\xE4den & Incidents",
        thirdParty: "Partner & Dritte",
        documents: "Dokumente"
      },
      kpi: {
        activeShipments: "Aktive Sendungen",
        delayed: "Verz\xF6gert",
        incidents: "Offene Incidents",
        coverageOk: "Deckung OK",
        highRisk: "Hohes Risiko",
        avgEtaDeviation: "\xD8 ETA-Abweichung"
      },
      filters: {
        search: "Sendungsnummer, Route oder Kunde suchen \u2026",
        statusLabel: "Status",
        statusAll: "Alle",
        statusInTransit: "In Transit",
        statusDelayed: "Verz\xF6gert",
        statusDelivered: "Zugestellt",
        statusIncident: "Incident"
      },
      table: {
        shipments: {
          title: "Live Sendungen",
          col: {
            shipment: "Auftrag",
            customer: "Auftraggeber",
            route: "Route",
            status: "Status",
            eta: "ETA",
            coverage: "Deckung",
            cargo: "Fracht",
            value: "Wert",
            thirdParty: "Third Party",
            aiHint: "AI Hinweis"
          },
          empty: "Keine Demo-Daten gefunden."
        },
        statusLabels: {
          inTransit: "In Transit",
          delayed: "Verz\xF6gert",
          delivered: "Zugestellt",
          incident: "Incident"
        },
        coverageLabels: {
          covered: "Gedeckt",
          partial: "Teilgedeckt",
          notCovered: "Nicht gedeckt"
        }
      },
      shipmentsCopy: {
        cargo: {
          electronics: "Elektronik",
          pharma: "Pharma",
          fashion: "Mode",
          chemicals: "Chemikalien",
          chilled: "Lebensmittel (gek\xFChlt)",
          automotive: "Automotive",
          retailMixed: "Retail (gemischt)",
          seafood: "Seafood"
        },
        notes: {
          tempStable: "Temperatur stabil / SLA OK",
          customsWait: "Wartet auf Zollslot",
          theftInvestigation: "Incident: Diebstahl in Bearbeitung",
          podSigned: "Lieferschein unterschrieben",
          temp3c: "Temperatur 3 \xB0C",
          ferrySlot: "Wartet auf F\xE4hrenslot",
          borderCrossed: "Grenze passiert",
          tempDeviation: "Temperaturabweichung erkannt"
        },
        eta: {
          delayed45: "+45 Min",
          delayed25: "+25 Min",
          investigating: "In Untersuchung",
          hold: "Angehalten"
        }
      },
      coverage: {
        title: "Versicherung & Deckung",
        policyId: "Police",
        limit: "Deckungssumme",
        deductible: "Selbstbehalt",
        validity: "Laufzeit",
        status: "Status",
        covered: "Gedeckt",
        partial: "Teilgedeckt",
        notCovered: "Nicht gedeckt",
        statusLabels: {
          active: "Aktiv",
          selective: "Selektiv",
          inactive: "Inaktiv"
        }
      },
      coverageCards: {
        liability: { title: "Frachtf\xFChrerhaftpflicht" },
        cargo: { title: "Cargo Insurance" },
        addons: { title: "Add-ons" }
      },
      incidents: {
        title: "Sch\xE4den & Incidents",
        subtitle: "Aktuelle Sch\xE4den & Untersuchungen",
        openIncident: "Incident \xF6ffnen",
        labels: {
          status: "Status",
          cost: "Kosten",
          documents: "Dokumente"
        },
        statusLabels: {
          open: "Offen",
          review: "In Pr\xFCfung",
          closed: "Geschlossen"
        },
        riskLabels: {
          low: "Niedrig",
          medium: "Mittel",
          high: "Hoch"
        },
        types: {
          theftParking: "Diebstahl (Parkplatz A14)",
          tempDeviation: "Temperaturabweichung",
          delay12h: "Verz\xF6gerung > 12h",
          damageForklift: "Besch\xE4digung (Gabelstapler)"
        }
      },
      documents: {
        title: "Dokumente",
        upload: "Hochladen",
        download: "Herunterladen"
      },
      thirdParty: {
        shipper: "Auftraggeber",
        consignee: "Empf\xE4nger",
        broker: "Makler",
        warehouse: "Lagerhaus"
      }
    },
    marketing: {
      title: "Insurfox Plattform",
      subtitle: "Digitale Front- und Backend-L\xF6sungen f\xFCr Makler, MGAs und Flotten.",
      login: "Login",
      highlights: {
        title: "Highlights",
        ai: "KI-gest\xFCtzte Prozesse",
        workflows: "End-to-End Workflows",
        insights: "Reporting & Insights"
      },
      modules: {
        title: "Module",
        backoffice: "Backoffice & CRM",
        tenders: "Tender & Ausschreibungen",
        fleetReporting: "Fleet Reporting",
        fleetManagement: "Fuhrparkverwaltung",
        registration: "Registrierungsassistent",
        compliance: "Compliance"
      },
      why: {
        title: "Warum Insurfox?",
        fast: "Schneller arbeiten \u2013 weniger manuell.",
        ai: "Bessere Entscheidungen durch KI-Insights.",
        scale: "Skalierbar f\xFCr wachsende Portfolios."
      },
      cta: "Zur \xDCbersicht"
    },
    marketingFleet: {
      hero: {
        title: "IaaS Fuhrparkmanagement",
        subtitle: "Steuern Sie Fahrzeuge, Sch\xE4den, Termine, Dokumente und Policen \u2013 mit KI-Empfehlungen und Real-Time Insights.",
        login: "Login",
        illustrationTitle: "AI Live Alerts",
        illustrationValue: "12 aktive Signale",
        illustrationDescription: "Live-Incidents, Pr\xFCfkapazit\xE4ten und Downtime-Prognosen im \xDCberblick."
      },
      kpi: {
        realTime: "Real-time Status & Alerts",
        ai: "KI-gest\xFCtzte Priorisierung",
        tuv: "T\xDCV & Wartungsplanung",
        claims: "Schaden- & Kostenkontrolle",
        docs: "Dokumente & Policen",
        compliance: "Compliance & Reporting"
      },
      manage: {
        title: "Was Sie managen k\xF6nnen",
        features: {
          vehiclesMaster: {
            title: "Fahrzeuge & Stammdaten",
            description: "VIN, Ausstattung, GPS, Sensor- und Nutzungshistorie auf einen Blick."
          },
          realTime: {
            title: "Real-time Status & Alerts",
            description: "Live-\xDCberblick \xFCber Statusmeldungen, Alerts und Ereignisse je Fahrzeug."
          },
          aiPrioritization: {
            title: "KI-gest\xFCtzte Priorisierung",
            description: "KI bewertet Risiken, Sch\xE4den und Ma\xDFnahmen automatisch nach Impact."
          },
          tuvPlanning: {
            title: "T\xDCV & Wartungsplanung",
            description: "T\xDCV-, Wartungs- und Werkstattkapazit\xE4ten koordinieren \u2013 inklusive Ersatzfahrzeuge."
          },
          claimsControl: {
            title: "Schaden- & Kostenkontrolle",
            description: "Schadenstatus, Reparaturauftr\xE4ge und Kostenprognosen zentral steuern."
          },
          docsPolicies: {
            title: "Dokumente & Policen",
            description: "Vertr\xE4ge, Policen und Compliance-Nachweise revisionssicher verwalten."
          }
        }
      },
      preview: {
        title: "Real-Time Dashboard Preview",
        subtitle: "Echtzeit-KPIs, Alerts und Incident-Daten \u2013 bereit f\xFCr Ihr Team.",
        kpis: {
          uptime: "Verf\xFCgbarkeit",
          openClaims: "Offene Sch\xE4den",
          downtime: "\xD8 Ausfalltage (Monat)"
        },
        incidentsTitle: "Incidents pro Monat",
        downtimeTitle: "Downtime-Trend",
        table: {
          columns: {
            date: "Datum",
            vehicle: "Fahrzeug",
            type: "Typ",
            status: "Status",
            cost: "Kosten",
            ai: "AI-Flag"
          },
          typeLabels: {
            motor: "Motor",
            cargo: "Cargo",
            liability: "Haftpflicht"
          },
          statusLabels: {
            open: "Offen",
            repair: "In Reparatur",
            monitoring: "Monitoring"
          },
          aiLabels: {
            alert: "Alert",
            watch: "Watch",
            info: "Info"
          },
          rows: {
            row1: {
              date: "03.03.2025",
              vehicle: "DE-789-XY",
              typeKey: "motor",
              statusKey: "repair",
              cost: "\u20AC 8.450",
              aiKey: "alert"
            },
            row2: {
              date: "02.03.2025",
              vehicle: "HH-CARGO-12",
              typeKey: "cargo",
              statusKey: "open",
              cost: "\u20AC 5.870",
              aiKey: "watch"
            },
            row3: {
              date: "01.03.2025",
              vehicle: "M-FL-2045",
              typeKey: "liability",
              statusKey: "monitoring",
              cost: "\u20AC 2.180",
              aiKey: "info"
            },
            row4: {
              date: "27.02.2025",
              vehicle: "K-TR-330",
              typeKey: "motor",
              statusKey: "open",
              cost: "\u20AC 1.260",
              aiKey: "watch"
            },
            row5: {
              date: "25.02.2025",
              vehicle: "B-DEL-901",
              typeKey: "cargo",
              statusKey: "repair",
              cost: "\u20AC 9.120",
              aiKey: "alert"
            }
          }
        }
      },
      usecases: {
        title: "F\xFCr wen?",
        items: {
          logistics: {
            title: "Logistikunternehmen",
            description: "Komplexe LKW-, Trailer- und Cargo-Flotten mit europaweiten Standorten."
          },
          delivery: {
            title: "Service- & Lieferflotten",
            description: "City- und Regionalflotten mit hohem Termindruck und Service-Leveln."
          },
          industrial: {
            title: "Industrie & Mischflotten",
            description: "PKW, Transporter und Spezialfahrzeuge inklusive Bau- und Energieflotten."
          }
        }
      },
      cta: {
        primary: "Demo ansehen",
        secondary: "Fleet Reporting \xF6ffnen"
      }
    },
    claimManager: {
      rolesCard: {
        description: "Sachbearbeiter-Cockpit f\xFCr schnelle Entscheidungen, Freigaben, Partnersteuerung und AI-Hinweise.",
        cta: "\xD6ffnen"
      },
      marketing: {
        hero: {
          overline: "Claims Intelligence",
          title: "Schadenmanager",
          subtitle: "Sachbearbeiter-Cockpit f\xFCr schnelle Entscheidungen, Freigaben und Partnersteuerung \u2013 mit KI, Dokumenten und Deckungspr\xFCfung im \xDCberblick.",
          login: "Login"
        },
        features: {
          statusTimeline: {
            title: "Status & Timeline",
            description: "Alle Stationen der Schadenbearbeitung, Eskalationen und SLAs in einer Ansicht."
          },
          coverage: {
            title: "Deckung & Policen",
            description: "Automatische Policenpr\xFCfung, Limits und Selbstbehalte mit KI-Unterst\xFCtzung."
          },
          partners: {
            title: "Partnersteuerung",
            description: "Werkstatt, Gutachter oder Abschlepper direkt aus dem Schadenfall beauftragen."
          },
          workflows: {
            title: "Kostenfreigabe & Workflows",
            description: "Freigaben mit Checklisten, Kommentaren und Audit-Trail."
          },
          documents: {
            title: "Dokumente & Bilder",
            description: "Polizei, KV, Fotos und Rechnungen sicher im Kontext der Schadenakte."
          },
          aiInsights: {
            title: "Insurfox AI Hinweise",
            description: "Verdachtsmomente, Plausibilit\xE4ten und Next-Best-Actions f\xFCr Sachbearbeiter:innen."
          }
        },
        preview: {
          title: "Dashboard Preview",
          subtitle: "KPIs, Alerts und Timeline \u2013 bereit f\xFCr schnelle Entscheidungen.",
          kpis: {
            active: "Aktive Sch\xE4den",
            sla: "SLA eingehalten",
            ai: "AI Alerts"
          },
          chartTitle: "Kostenentwicklung / Woche",
          notes: "Demo-Daten: kombinierte KPI-Sicht mit AI Alerts und Status-Clustern."
        }
      },
      app: {
        listHeader: {
          title: "Insurfox Schadenmanager",
          subtitle: "Offene Schadenf\xE4lle in Bearbeitung"
        },
        caseHeader: {
          title: "Schadenakte",
          subtitle: "Schaden\xFCbersicht und Schadenstatus mit KI Entscheidungsvorlagen"
        },
        header: {
          overline: "Claim file",
          title: "Schadenakte",
          claimId: "Schaden-ID",
          claimIdValue: "CLM-2025-0471",
          date: "Ereignis",
          dateValue: "12. M\xE4rz 2025",
          status: "Status"
        },
        caseList: {
          title: "Gespeicherte Sch\xE4den",
          subtitle: "W\xE4hle einen Schadenfall aus, um die Akte zu \xF6ffnen.",
          empty: "Keine gespeicherten Sch\xE4den.",
          columns: {
            claimNumber: "Schadennummer",
            firstName: "Vorname",
            lastName: "Nachname",
            licensePlate: "Kennzeichen",
            date: "Ereignis"
          }
        },
        filters: {
          status: "Status",
          type: "Schadenart",
          all: "Alle",
          reset: "Filter zur\xFCcksetzen"
        },
        damageTypes: {
          rearCollision: "Heckschaden",
          frontCollision: "Frontschaden",
          sideCollision: "Seitenschaden",
          parkingDamage: "Parkschaden",
          glassDamage: "Glasschaden",
          wildlife: "Wildunfall",
          mirrorContact: "Spiegelkontakt",
          hailDamage: "Hagelschaden",
          theft: "Diebstahl",
          waterDamage: "Wasserschaden",
          fireDamage: "Brandschaden",
          vandalism: "Vandalismus",
          stormDamage: "Sturmschaden",
          engineDamage: "Motorschaden",
          tireDamage: "Reifenschaden",
          cargoDamage: "Ladungsschaden",
          liabilityDamage: "Haftpflichtschaden",
          animalDamage: "Tierschaden"
        },
        statusOptions: {
          intake: "Eingang",
          review: "Pr\xFCfung",
          approval: "Freigabe",
          repair: "Reparatur",
          closure: "Abschluss"
        },
        actions: {
          backToList: "Zur\xFCck zur \xDCbersicht",
          approveCosts: "Kostenfreigabe",
          assignSurveyor: "Gutachter beauftragen",
          changePartner: "Partner \xE4ndern"
        },
        kpis: {
          totalIncurred: "Gesamtschaden",
          reserve: "Reserve",
          approved: "Freigegeben",
          openItems: "Offene Positionen",
          deductible: "Selbstbehalt",
          coverage: "Deckungsstatus",
          coverageValue: "Gedeckt",
          fraudRisk: "Betrugsrisiko",
          handlingTime: "Bearbeitungszeit"
        },
        kpiValues: {
          totalIncurred: "\u20AC 12.480",
          reserve: "\u20AC 3.200",
          approved: "\u20AC 6.210",
          openItems: "3",
          deductible: "\u20AC 500",
          coverage: "Gedeckt",
          fraudRisk: "Mittel",
          handlingTime: "9 T"
        },
        details: {
          title: "Schadendetails",
          type: "Schadenart",
          location: "Ort & Uhrzeit",
          incidentTime: "Zeitpunkt",
          vehicle: "Fahrzeug",
          summary: "Kurzbeschreibung",
          values: {
            type: "Kasko / Auffahrunfall",
            location: "Hamburg Hafen, 11:32",
            vehicle: "HH-CL 2045 \u2022 WDD2130041A123456",
            summary: "Kunde meldet Auffahrunfall an der Zufahrt Tor 4. Sensorwerte + Zeugenbericht vorhanden."
          }
        },
        timeline: {
          title: "Timeline & SLA",
          steps: {
            intake: "Eingang",
            review: "Pr\xFCfung",
            approval: "Freigabe",
            repair: "Reparatur",
            closure: "Abschluss"
          }
        },
        costs: {
          title: "Kosten & Freigabe",
          confirm: "Kosten \xFCberpr\xFCfen",
          table: {
            position: "Position",
            amount: "Betrag",
            status: "Status",
            note: "Notiz"
          },
          items: {
            bodywork: "Karosserie",
            paint: "Lackierung",
            rental: "Mietwagen"
          },
          status: {
            pending: "Offen",
            approved: "Freigegeben",
            rejected: "Abgelehnt"
          },
          notePlaceholder: "Kommentar hinzuf\xFCgen \u2026",
          modal: {
            title: "Kosten\xFCbernahme best\xE4tigen",
            checkbox: "Policy gepr\xFCft & Limits eingehalten",
            confirm: "Kosten freigeben",
            cancel: "Abbrechen"
          }
        },
        coverage: {
          title: "Deckung & Police",
          policyNumber: "Police",
          policyValue: "POL-DE-4711",
          term: "Laufzeit",
          termValue: "01.01.2024 \u2013 31.12.2024",
          limit: "Deckungssumme",
          limitValue: "\u20AC 15.000",
          exclusion: "Ausschl\xFCsse",
          exclusionValue: "Glasbruch ausgeschlossen",
          covered: "Gedeckt",
          partial: "Teilgedeckt",
          notCovered: "Nicht gedeckt",
          note: "Risikoanalyse zeigt volle Deckung f\xFCr Reparatur und Mietwagen."
        },
        partner: {
          title: "Partnersteuerung",
          changeButton: "Partner wechseln",
          modalTitle: "Partnerauswahl",
          confirm: "\xDCbernehmen",
          options: {
            partner1: { name: "KFZ Werkstatt M\xFCller GmbH" },
            partner1Address: "Hamburg, S\xFCderstra\xDFe 54",
            partner2: { name: "Autopartner Nord GmbH" },
            partner2Address: "L\xFCbeck, Baltic Park 3",
            partner3: { name: "Karosserie 24" },
            partner3Address: "Bremerhaven, Dock 2"
          }
        },
        ai: {
          title: "Insurfox AI Hinweise",
          items: {
            hint1: "Fraud suspicion: mittleres Risiko \u2013 Schadenh\xF6he +18 % \xFCber Benchmark.",
            hint2: "Fehlender Polizeibericht \u2013 Upload anfordern.",
            hint3: "\xC4hnliche Sch\xE4den in den letzten 12 Monaten (3 F\xE4lle) \u2013 Plausibilit\xE4tscheck.",
            hint4: "Empfehlung: Gutachter beauftragen (Severity Score 0.72).",
            hint5: "Partnerkapazit\xE4t: Werkstatt M\xFCller frei ab 15.03."
          }
        },
        documents: {
          title: "Dokumente",
          media: "Bilder & Medien",
          mediaLabel: "Foto",
          damage: {
            title: "Schadenbilder & KI-Bewertung",
            modalTitle: "Schadenbild",
            prev: "Zur\xFCck",
            next: "Weiter",
            riskBadges: {
              low: "\u{1F7E2} Geringes Risiko",
              medium: "\u{1F7E0} Mittleres Risiko",
              high: "\u{1F534} Erh\xF6htes Risiko"
            },
            items: {
              photo1: {
                title: "Frontschaden Sto\xDFf\xE4nger",
                ai: "KI erkennt einen frontalen Aufprall mit mittlerer Geschwindigkeit. Deformation konsistent mit Auffahrunfall.",
                fraud: "Schadenbild plausibel zum gemeldeten Unfallhergang."
              },
              photo2: {
                title: "Seitenschaden Fahrert\xFCr",
                ai: "Seitliche Eindr\xFCckung mit Lackabrieb. Kontakt mit festem Objekt wahrscheinlich.",
                fraud: "Schadenh\xF6he leicht \xFCber Durchschnitt vergleichbarer F\xE4lle."
              },
              photo3: {
                title: "Heckschaden",
                ai: "Heckaufprall mit klarer Energie\xFCbertragung. Keine Anzeichen f\xFCr Vorsch\xE4den.",
                fraud: "Kein Fraud-Hinweis erkannt."
              },
              photo4: {
                title: "Detailaufnahme Lack & Sensor",
                ai: "Sensorbereich betroffen. Kalibrierung nach Reparatur empfohlen.",
                fraud: "Unregelm\xE4\xDFige Kratzmuster \u2013 manuelle Pr\xFCfung empfohlen."
              }
            }
          },
          list: {
            estimate: "Kostenvoranschlag.pdf",
            police: "Polizeibericht.pdf",
            survey: "Gutachten.pdf",
            invoice: "Rechnung.pdf"
          },
          previewTitle: "Vorschau",
          close: "Schlie\xDFen"
        },
        surveyor: {
          title: "Gutachter ausw\xE4hlen",
          mapTitle: "Einsatzgebiet & Entfernung",
          confirm: "Best\xE4tigen",
          options: {
            surveyor1: "MobilExpert GmbH",
            surveyor1Region: "Region Hamburg",
            surveyor2: "NordGutachter AG",
            surveyor2Region: "Region Schleswig-Holstein",
            surveyor3: "SchnellCheck Service",
            surveyor3Region: "Region Niedersachsen"
          }
        }
      }
    },
    fleetReporting: {
      title: "Fuhrpark-Reporting-Dashboard",
      subtitle: "Kennzahlen, Auff\xE4lligkeiten und Schaden\xFCberblick f\xFCr Ihren Fuhrpark",
      kpi: {
        totalClaims: "Sch\xE4den gesamt (12 Monate)",
        openClaims: "Offene Sch\xE4den",
        lossRatio: "Schadenquote",
        avgCost: "\xD8 Schadenkosten",
        coverageRate: "Deckungsquote",
        activeVehicles: "Aktive Fahrzeuge",
        downtime: "\xD8 Ausfalltage / Monat",
        topCause: "Top-Schadenursache"
      },
      kpiValues: {
        topCause: "Auffahrunfall"
      },
      charts: {
        monthlyTitle: "Sch\xE4den pro Monat",
        monthlySubtitle: "Zw\xF6lf Monate Demo-Daten",
        coverageTitle: "Deckungsstatus",
        coverageSubtitle: "Anteil gedeckt vs. nicht gedeckt",
        severityTitle: "Schadenh\xF6he-Verteilung",
        severitySubtitle: "Anteile nach Kategorie"
      },
      coverageLabels: {
        covered: "Gedeckt",
        uncovered: "Nicht gedeckt"
      },
      severityLabels: {
        high: "Hoch",
        medium: "Mittel",
        low: "Niedrig"
      },
      ai: {
        title: "Insurfox AI \u2013 Fuhrpark-Auff\xE4lligkeiten & Insights",
        subtitle: "Automatische Signale aus historischen und Echtzeit-Daten",
        items: {
          item1: "Fahrzeug DE-789-XY zeigt 40\u202F% h\xF6here Schadenfrequenz als der Fuhrpark-Durchschnitt.",
          item2: "Region Berlin verzeichnet 25\u202F% mehr Vorf\xE4lle in Q4. Wetterkorrelation erkannt.",
          item3: "Fahrerschulung f\xFCr Team Nord empfohlen \u2013 wiederkehrende Unfallmuster.",
          item4: "Cargo-Sch\xE4den steigen im November um 15\u202F%. Routenoptimierung empfohlen.",
          item5: "Trailer-Cluster S\xFCd zeigt geh\xE4ufte Rangiersch\xE4den. Parkplatz-/Routenf\xFChrung pr\xFCfen.",
          item6: "Werkstattkosten steigen bei \u201CDelivery Vans\u201D um 12\u202F%. Pr\xE4ventivwartung empfohlen."
        }
      },
      vehicles: {
        title: "Fahrzeuge",
        filters: {
          typeLabel: "Fahrzeugtyp",
          statusLabel: "Status",
          searchPlaceholder: "Kennzeichen oder VIN suchen \u2026",
          typeOptions: {
            all: "Alle",
            car: "PKW",
            truck: "LKW",
            trailer: "Trailer",
            delivery: "Delivery Vans"
          },
          statusOptions: {
            all: "Alle",
            active: "Aktiv",
            maintenance: "In Werkstatt",
            down: "Ausfall"
          }
        },
        cards: {
          type: "Typ",
          status: "Status",
          location: "Standort",
          inspection: "N\xE4chster T\xDCV",
          maintenance: "N\xE4chste Wartung",
          downtime: "Ausfalltage YTD",
          open: "\xD6ffnen"
        },
        statusBadges: {
          active: "Aktiv",
          maintenance: "Werkstatt",
          down: "Ausfall"
        }
      },
      filters: {
        typeLabel: "Schadenart",
        typeOptions: {
          all: "Alle",
          motor: "Motor",
          liability: "Haftpflicht",
          cargo: "Cargo"
        },
        rangeLabel: "Zeitraum",
        rangeOptions: {
          last30: "Letzte 30 Tage",
          last12: "Letzte 12 Monate"
        }
      },
      table: {
        title: "Fuhrpark-Sch\xE4den",
        columns: {
          date: "Datum",
          vehicle: "Fahrzeug",
          vin: "FIN",
          location: "Route / Standort",
          type: "Typ",
          coverage: "Deckung",
          status: "Status",
          cost: "Kosten",
          ai: "AI-Hinweis",
          note: "Notiz"
        },
        types: {
          motor: "Motor",
          liability: "Haftpflicht",
          cargo: "Cargo"
        },
        coverageBadges: {
          covered: "Gedeckt",
          uncovered: "Nicht gedeckt"
        },
        statusBadges: {
          open: "Offen",
          review: "In Pr\xFCfung",
          closed: "Geschlossen"
        },
        aiBadges: {
          alert: "Auff\xE4llig",
          watch: "Beobachten",
          normal: "Normal"
        },
        rows: {
          row1: {
            location: "Berlin \u2192 Leipzig (A9)",
            ai: "Telematik meldet abruptes Bremsen + Sensor-Fehler"
          },
          row2: {
            location: "Hamburg Hafen",
            ai: "Ladungssicherung pr\xFCfen \u2013 wiederkehrende Sch\xE4den"
          },
          row3: {
            location: "M\xFCnchen \u2192 Salzburg",
            ai: "Versicherung fordert Fotodokumentation nach"
          },
          row4: {
            location: "K\xF6ln Innenstadt",
            ai: "Unfallh\xE4ufung an gleicher Kreuzung"
          },
          row5: {
            location: "Frankfurt Air Cargo Hub",
            ai: "Temperaturabweichung + versp\xE4tete Meldung"
          }
        }
      }
    },
    fleetManagement: {
      title: "Fuhrparkverwaltung",
      subtitle: "Fahrzeuge, Dokumente, Versicherungen und Fahrer zentral steuern.",
      kpi: {
        active: "Aktive Fahrzeuge",
        workshop: "In Werkstatt",
        inspectionDue: "T\xDCV f\xE4llig (30 Tage)",
        openTasks: "Offene Aufgaben"
      },
      filters: {
        typeLabel: "Fahrzeugtyp",
        statusLabel: "Status",
        searchPlaceholder: "Kennzeichen oder VIN suchen \u2026",
        typeOptions: {
          all: "Alle",
          car: "PKW",
          truck: "LKW",
          trailer: "Trailer",
          delivery: "Delivery Vans"
        },
        statusOptions: {
          all: "Alle",
          active: "Aktiv",
          maintenance: "In Werkstatt",
          down: "Ausfall"
        }
      },
      list: {
        title: "Fahrzeugliste",
        open: "\xD6ffnen",
        statusBadges: {
          active: "Aktiv",
          maintenance: "Werkstatt",
          down: "Ausfall"
        }
      },
      detail: {
        title: "Fahrzeugdetails",
        overview: "Stammdaten",
        usage: "Einsatz",
        usageLabels: {
          longhaul: "Fernverkehr",
          regional: "Regionale Distribution",
          city: "City Delivery",
          cargo: "Cargo & Trailer"
        },
        schedule: "Termine & Wartung",
        inspection: "T\xDCV Termin",
        inspectionStatus: {
          ok: "OK",
          dueSoon: "F\xE4llig bald",
          overdue: "\xDCberf\xE4llig"
        },
        maintenance: "N\xE4chste Wartung",
        downtime: "Ausfalltage (12 Monate)",
        documents: "Dokumente",
        documentsList: {
          registration: "Fahrzeugschein.pdf",
          leasing: "Leasingvertrag.pdf",
          maintenance: "Wartungsnachweise.zip"
        },
        upload: "Upload",
        policies: "Versicherungspolicen",
        policiesColumns: {
          number: "Police",
          line: "Sparte",
          sum: "Deckungssumme",
          deductible: "Selbstbehalt",
          term: "Laufzeit",
          status: "Status"
        },
        policyLines: {
          liability: "Haftpflicht",
          casco: "Kasko",
          cargo: "Cargo"
        },
        policyStatus: {
          active: "Aktiv",
          pending: "Ausstehend"
        },
        drivers: "Fahrerzuordnung",
        primaryDriver: "Prim\xE4rfahrer",
        addDriver: "Fahrer hinzuf\xFCgen",
        licenses: "F\xFChrerscheinklassen",
        licenseValidity: "G\xFCltig bis",
        licenseStatus: {
          valid: "G\xFCltig",
          expiring: "L\xE4uft bald ab",
          expired: "Abgelaufen"
        }
      },
      driverPicker: {
        title: "Verf\xFCgbare Fahrer",
        assign: "Zuweisen"
      }
    },
    registration: {
      title: "Registrieren ist einfach.",
      subtitle: "Geben Sie einfach Ihre E-Mail Adresse ein und wir senden Ihnen einen individuellen Link zu.",
      emailLabel: "E-Mail Adresse",
      emailPlaceholder: "Geben Sie Ihre E-Mail Adresse hier ein",
      emailError: "Bitte geben Sie eine g\xFCltige E-Mail Adresse ein.",
      privacyText: "Ich habe die",
      privacyLinkText: "Datenschutzerkl\xE4rung",
      privacyLink: "https://insurfox.de/de/datenschutz/",
      privacyError: "Bitte stimmen Sie der Datenschutzerkl\xE4rung zu.",
      submit: "Jetzt registrieren",
      nextStep: "N\xE4chster Schritt",
      success: "Vielen Dank! Wir senden Ihnen einen Link per E-Mail.",
      alreadyRegistered: "Schon registriert?",
      login: "Anmelden",
      inputPlaceholder: "Nachricht eingeben \u2026",
      send: "Senden",
      restart: "Neu starten",
      back: "Zur\xFCck zur \xDCbersicht",
      modeWrite: "\u270D\uFE0F Schreiben",
      modeSpeak: "\u{1F399}\uFE0F Sprechen",
      voiceLabel: "Stimme ausw\xE4hlen",
      voicePlaceholder: "Bitte Stimme w\xE4hlen",
      voiceLoading: "Stimmen werden geladen \u2026",
      voiceStart: "Starten",
      voiceActiveLabel: "Aktive Stimme",
      voiceActiveBadge: "Aktiv",
      voiceStartListening: "\u{1F399}\uFE0F Aufnahme starten",
      voiceStopListening: "\u23F9\uFE0F Aufnahme stoppen",
      voiceNoRecognition: "Voice input wird auf diesem Ger\xE4t nicht unterst\xFCtzt \u2013 bitte tippe Deine Antworten.",
      messageSource: {
        voice: "Sprechen",
        text: "Eingabe",
        quick: "Schnellantwort"
      },
      bot: {
        welcome: "\u{1F44B} Willkommen bei Claimfox. Ich begleite dich Schritt f\xFCr Schritt durch die Registrierung.",
        mode: "M\xF6chtest du die Daten selbst eingeben oder mit mir sprechen?",
        name: "Wie lautet dein vollst\xE4ndiger Name?",
        email: "Bitte gib deine E-Mail-Adresse ein. Wir verwenden sie nur f\xFCr Updates zur Registrierung.",
        emailInvalid: "Diese E-Mail-Adresse sieht nicht korrekt aus. Pr\xFCfe sie bitte noch einmal.",
        phone: "M\xF6chtest du zus\xE4tzlich eine Telefonnummer angeben? Du kannst auch \u201ESkip\u201C schreiben.",
        skip: "Alles klar, ich \xFCberspringe die Telefonnummer.",
        role: "Wof\xFCr m\xF6chtest du Claimfox nutzen? Lass mich kurz wissen, was du vorhast.",
        roleCustomer: "\u2022 Kunden & Fahrer, z. B. f\xFCr Sch\xE4den oder Anfragen",
        rolePartner: "\u2022 Partner & Netzwerk wie Gutachter oder Werkst\xE4tten",
        roleInternal: "\u2022 Interne Teams f\xFCr Steuerung und Reporting",
        privacy: "Bitte best\xE4tige, dass du unserer Datenschutzerkl\xE4rung zustimmst.",
        privacyYes: "Danke f\xFCr deine Zustimmung. Ich fasse alles kurz zusammen.",
        privacyNo: "Ohne Zustimmung k\xF6nnen wir leider nicht fortfahren.",
        privacyNoStop: "Du kannst den Prozess jederzeit neu starten, sobald du bereit bist.",
        summary: "Hier ist deine Zusammenfassung:\nName: {{name}}\nE-Mail: {{email}}\nTelefon: {{phone}}\nRolle: {{role}}",
        submit: "Registrierung abschicken",
        edit: "Angaben bearbeiten",
        success: "\u{1F389} Vielen Dank! Deine Registrierung wurde erfasst. Wir melden uns in K\xFCrze bei dir.",
        voiceConfirm: "Ist das so richtig?",
        voiceSelect: "W\xE4hle zuerst die Stimme Deines Claimsfox aus.",
        voiceNotSupported: "Dein Browser unterst\xFCtzt leider keine Sprachausgabe. Lass uns schriftlich weitermachen.",
        voiceInputNotSupported: "Ich kann in diesem Browser nicht zuh\xF6ren. Bitte tippe deine Antwort.",
        listening: "\u{1F399}\uFE0F Ich h\xF6re zu \u2026"
      }
    },
    partnerManagement: {
      title: "Partner Management",
      subtitle: "Partnernetzwerke, Dokumente und Live-Kommunikation je Schadenfall.",
      actions: {
        addPartner: "Partner hinzuf\xFCgen"
      },
      partnerTypes: {
        workshop: "Werkstatt",
        surveyor: "Gutachter",
        towing: "Abschleppdienst"
      },
      selection: {
        title: "Partnerauswahl",
        subtitle: "Netzwerke, Spezialisierung und Reaktionszeit.",
        response: "Antwortzeit"
      },
      claimMedia: {
        title: "Schadenbilder",
        subtitle: "Status der eingereichten Fotos.",
        status: {
          review: "In Pr\xFCfung",
          approved: "Freigegeben",
          missing: "Fehlt"
        }
      },
      estimates: {
        title: "Kostenvoranschl\xE4ge",
        subtitle: "Eingang, Pr\xFCfung und Freigaben.",
        cta: "KV anfordern"
      },
      invoices: {
        title: "Rechnungen",
        subtitle: "Pr\xFCfung und Freigabe je Partner.",
        cta: "Rechnung pr\xFCfen"
      },
      repair: {
        title: "Reparaturstatus",
        subtitle: "Live-Status aus dem Partnernetzwerk.",
        eta: "Prognose: {{time}}",
        steps: {
          intake: "Fahrzeugannahme",
          diagnostics: "Diagnose",
          parts: "Ersatzteile",
          repair: "Reparatur",
          handover: "\xDCbergabe"
        }
      },
      chat: {
        title: "Livechat",
        subtitle: "R\xFCckfragen & Abstimmung im Schadenfall.",
        placeholder: "Nachricht schreiben \u2026",
        send: "Senden"
      },
      questions: {
        title: "R\xFCckfragen",
        subtitle: "Offene Punkte an den Partner.",
        cta: "Neue R\xFCckfrage"
      }
    },
    brokerPortal: {
      title: "IaaS Maklerportal"
    },
    brokerLanding: {
      title: "Maklerportal",
      login: "Login",
      heroHeadline: "Insurfox IaaS Maklerportal",
      heroSubline: "Digitale Front- und Backend-L\xF6sungen f\xFCr Maklerh\xE4user, MGAs und Coverholder in Europa.",
      valueLine1: "Backoffice & CRM speziell f\xFCr mittelst\xE4ndische Makler und Industrieversicherungen.",
      valueLine2: "Ausschreibungs- und Tenderplattform f\xFCr komplexe Industrieprogramme.",
      valueLine3: "KI-gest\xFCtzte Tools f\xFCr Bestand, Portfolio und Kundenkommunikation.",
      trust: {
        crm: "CRM-Backoffice",
        tender: "Tender-Plattform",
        ai: "KI-Tools"
      },
      heroStats: {
        coverage: "12+ Industrie- & Spezialsparten",
        automation: "80% automatisierte Workflows",
        retention: "98% Renewal Rate bei Bestandskunden"
      },
      heroCTAPrimary: "Demo ansehen",
      heroCTASecondary: "Login",
      featureSectionTitle: "Alles, was moderne Makler brauchen",
      featureSectionSubtitle: "Ein Plattform-Stack f\xFCr Vertrieb, Service und Underwriting.",
      features: {
        crm: "Backoffice & CRM",
        tender: "Tender & Ausschreibungen",
        ai: "KI-Tools f\xFCr Bestand & Portfolio",
        insights: "Portfolio Insights & Reporting",
        workflows: "Automatisierte Workflows",
        compliance: "Compliance & Dokumentation"
      },
      sectorsTitle: "Sparten & Produkte",
      sectorsSubtitle: "Einheitliche Prozesse f\xFCr europ\xE4ische Industrie- und Spezialsparten.",
      sectorsBanner: "Einheitliche Prozesse f\xFCr Industrie- und Spezialsparten.",
      sectorsList: {
        carriers: "Verkehrshaftungsversicherung",
        fleet: "Flottenversicherung",
        cargo: "Transport- und Warenversicherung",
        logistics: "Logistik-Komposit",
        contents: "Inhaltsversicherung",
        liability: "Betriebshaftpflicht",
        photovoltaic: "Photovoltaikversicherung",
        cyber: "Cyberversicherung",
        do: "D&O-Versicherung",
        legal: "Rechtsschutzversicherung",
        electronics: "Elektronikversicherung",
        machinery: "Maschinenversicherung",
        tradeCredit: "Warenkreditversicherung"
      },
      whyTitle: "Warum Insurfox?",
      whySubtitle: "Wir kombinieren Versicherungsexpertise, Technologie und regulatorisches Know-how.",
      whyItems: {
        relationship: "Dedizierte Teams begleiten eure Transformation \u2013 von Migration bis Betrieb.",
        automation: "Plattform-\xDCbergreifende Prozesse mit KI, Automatisierung und offenen APIs.",
        compliance: "Hosting & Datenhaltung in der EU inkl. Audit, Compliance und DORA-Readiness."
      }
    },
    brokerCrm: {
      title: "CRM & Reporting",
      subtitle: "Gewinne Transparenz \xFCber Leads, Kund:innen und Aktivit\xE4ten in deinem Maklernetzwerk.",
      ai: {
        title: "KI-Auswertung",
        subtitle: "Empfohlene Priorit\xE4ten basierend auf Abschlusswahrscheinlichkeit und Volumen.",
        labels: {
          probability: "Abschlusswahrscheinlichkeit",
          volume: "Volumen",
          recommendation: "Empfehlung"
        },
        items: {
          item1: {
            name: "M\xFCller Logistik GmbH",
            type: "Hohe Abschlusswahrscheinlichkeit",
            value: "92%",
            action: "Heute anrufen"
          },
          item2: {
            name: "NordCargo AG",
            type: "Hohes Volumen",
            value: "\u20AC 185.000",
            action: "Angebot finalisieren"
          },
          item3: {
            name: "AlpenFleet KG",
            type: "Hohe Abschlusswahrscheinlichkeit",
            value: "88%",
            action: "Follow-up E-Mail senden"
          },
          item4: {
            name: "RheinTech Industrie",
            type: "Hohes Volumen",
            value: "\u20AC 240.000",
            action: "Risiko-Check ansto\xDFen"
          },
          item5: {
            name: "Hansea Spedition GmbH",
            type: "Hohe Abschlusswahrscheinlichkeit",
            value: "84%",
            action: "Unterlagen anfordern"
          },
          item6: {
            name: "Baltic Freight Solutions",
            type: "Hohes Volumen",
            value: "\u20AC 310.000",
            action: "Konditionen verhandeln"
          }
        }
      },
      kpi: {
        activeCustomers: "Aktive Kund:innen",
        openLeads: "Offene Leads",
        dealsMonth: "Abschl\xFCsse (Monat)",
        premiumVolume: "Pr\xE4mienvolumen"
      },
      charts: {
        revenueTitle: "Pr\xE4mienentwicklung",
        revenueSubtitle: "Letzte 6 Monate",
        leadsTitle: "Leads nach Status",
        leadsSubtitle: "Aktueller Monat",
        revenueLegendCurrent: "Aktuelles Jahr",
        revenueLegendPrevious: "Vorjahr",
        leadsLegendOpen: "Offen",
        leadsLegendWon: "Gewonnen",
        leadsLegendLost: "Verloren"
      },
      table: {
        title: "Kunden & Leads",
        name: "Name",
        status: "Status",
        lastContact: "Letzter Kontakt",
        potential: "Potenzial",
        nextStep: "N\xE4chster Schritt",
        statusLabels: {
          prospect: "Interessent",
          active: "Aktiv",
          onboarding: "Onboarding",
          dormant: "Inaktiv"
        },
        potentialLabels: {
          high: "Hoch",
          medium: "Mittel",
          low: "Gering"
        },
        nextSteps: {
          call: "Telefonat planen",
          meeting: "Vor-Ort Termin",
          proposal: "Angebot senden",
          onboarding: "Onboarding starten",
          renewal: "Vertrag verl\xE4ngern"
        }
      },
      activities: {
        title: "Aktivit\xE4ten",
        followUp: "Follow-up mit M\xFCller Versicherung vorbereiten",
        proposal: "Angebot f\xFCr FleetSecure versenden",
        documents: "Unterlagen f\xFCr Contora pr\xFCfen",
        audit: "Audit-Termin mit Atlas Maklerwerk vereinbaren",
        training: "Digitales Training f\xFCr neues Partner-Team planen"
      }
    }
  },
  en: {
    login: {
      title: "IaaS Portal",
      username: "Username",
      password: "Password",
      submit: "Sign in",
      submitting: "Signing in \u2026",
      required: "Please enter username and password.",
      invalid: "Invalid credentials."
    },
    header: {
      login: "Login",
      logout: "Logout"
    },
    roles: {
      title: "Insurfox AI IaaS",
      subtitle: "AI-native Insurance IaaS platform for core insurance processes.",
      logout: "Logout",
      view: "View",
      startJourney: "Start journey",
      registrationCardTitle: "Registration",
      registrationCardSubtitle: "Launch the guided, AI-supported journey to onboard partners or customers with ease.",
      brokerPortal: "Broker Portal",
      sections: {
        overview: "Role overview",
        processes: "Processes",
        internal: "Internal documentation",
        internalDocs: "Internal documentation",
        governance: "Governance",
        presentations: "Presentations",
        development: "Development",
        projectLanding: "Project landing page"
      },
      internalDocs: {
        title: "Internal documentation",
        subtitle: "Overview of internal materials and resources."
      },
      overviewGroups: {
        insurance: "Insurance",
        fleet: "Fleet",
        logistics: "Logistics",
        broker: "Broker"
      },
      internalAuth: {
        title: "Internal documentation",
        subtitle: "Enter the credentials to continue.",
        username: "Username",
        pin: "PIN",
        submit: "Unlock",
        error: "Check your credentials."
      },
      cards: {
        mvp: {
          title: "MVP overview",
          description: "Quick access to the core MVP process steps."
        },
        claims: {
          title: "Claims Manager",
          description: "Claims handler cockpit for fast decisions, approvals, partner orchestration and AI insights.",
          cta: "Open"
        },
        claimProcess: {
          title: "Claims Process",
          description: "Demo chatbot with location capture, automatic timestamps, and structured intake.",
          cta: "Start"
        },
        onboarding: {
          title: "Onboarding",
          description: "Current onboarding flow with wizard steps and progress tracking."
        },
        registration: {
          title: "Registration",
          description: "Capture the email address as the start of the process."
        },
        profile: {
          title: "User Profile",
          description: "Overview and maintenance of captured user and company data."
        },
        identification: {
          title: "User Identification",
          description: "Verify ID document and match with selfie."
        },
        regulatoryGovernance: {
          title: "Regulatory & AI Governance Framework",
          description: "Regulatory deck for supervisors, auditors, and compliance stakeholders."
        },
        auditAppendix: {
          title: "Audit Appendix",
          description: "Audit-ready reference with responsibilities, controls, and governance evidence."
        },
        strategicDeepDive: {
          title: "Strategic Technology & AI Governance Deep Dive",
          description: "Strategic deep dive into architecture and AI governance."
        },
        insurfoxWhitepaper: {
          title: "Insurfox Whitepaper",
          description: "AI-driven insurance platform for logistics, transport, and mobility."
        },
        requirementsCatalog: {
          title: "Requirements Catalog",
          description: "Short version for insurer collaboration on the Insurfox AI IaaS platform."
        },
        questionsQic: {
          title: "QIC Questions",
          description: "Questionnaire for collaboration with Insurfox AI IaaS."
        },
        setup: {
          title: "Setup",
          description: "Target architecture, platform layers, and integration principles for Insurfox IaaS."
        },
        landingSitemap: {
          title: "Sitemap",
          description: "Sitemap and navigation structure of the Insurfox landing page."
        },
        landingTools: {
          title: "Tools list",
          description: "Technology and tooling overview of the landing page."
        },
        partner: {
          title: "Partner Manager",
          description: "Nurture relationships with assessors, workshops, and service partners."
        },
        featureTree: {
          title: "Feature Tree",
          description: "Structured overview of the platform capabilities.",
          cta: "Open"
        },
        getQuote: {
          title: "Get a Quote",
          description: "Multi-step quote flow for carrier liability and vehicles.",
          cta: "Open"
        },
        policyPurchase: {
          title: "Purchase Policy",
          description: "Checkout flow for policies and payment details."
        },
        whitepaper: {
          title: "AI Whitepaper",
          description: "Native AI systems on sovereign IaaS for insurers, logistics leaders, and investors."
        },
        intern: {
          title: "Internal",
          description: "Password-protected playbooks, standards, and technical guidelines."
        },
        aiOnboarding: {
          title: "AI Onboarding",
          description: "Developer view of AI usage within onboarding flows."
        },
        reporting: {
          title: "Fleet Reporting",
          description: "Deliver fleet KPIs, dashboards, and claims reporting."
        },
        fleetManagement: {
          title: "Fleet Management",
          description: "Manage vehicles, schedules, documentation, and driver assignments."
        },
        marketing: {
          title: "Marketing",
          description: "Showcase the Insurfox platform for sales and stakeholders."
        },
        logistics: {
          title: "Logistics",
          description: "Manage transports, routes, coverage and incidents with real-time status and AI alerts.",
          cta: "View"
        }
      }
    },
    mvp: {
      title: "MVP overview",
      subtitle: "All process steps at a glance \u2014 click through the MVP flow.",
      nextStep: "Next step",
      steps: {
        registration: {
          title: "Registration",
          description: "Capture the email address and start onboarding."
        },
        onboarding: {
          title: "Onboarding",
          description: "Wizard to capture personal and company details."
        },
        getQuote: {
          title: "Get a quote",
          description: "Multi-step request for insurance and vehicle details."
        },
        policyPurchase: {
          title: "Purchase policy",
          description: "Binding checkout and payment details for the policy."
        },
        authentication: {
          title: "User authentication",
          description: "Login, access, and role checks for the MVP flow."
        },
        claimProcess: {
          title: "Claim intake",
          description: "Chat-based intake with location, timestamps, and structured data."
        },
        profile: {
          title: "User profile",
          description: "Personal and organization details at a glance."
        },
        aiModules: {
          title: "AI modules",
          description: "Automation, prioritization, and AI insights for decision makers."
        },
        dashboards: {
          title: "Dashboards",
          description: "KPIs, reports, and status overviews for the MVP."
        }
      }
    },
    profile: {
      title: "Profile",
      subtitle: "Complete your profile step by step.",
      overview: {
        title: "My profile",
        subtitle: "Manage your data and access additional areas.",
        edit: "Edit profile",
        open: "Open",
        back: "Back to overview",
        reset: "Reset data",
        summaryTitle: "Your base data",
        summarySubtitle: "A quick overview of the key information.",
        sections: {
          title: "Sections",
          onboarding: "Onboarding",
          personal: "Personal details",
          company: "Company details",
          insurances: "My insurances",
          fleet: "My fleet",
          locations: "My locations"
        }
      },
      onboarding: {
        title: "Onboarding",
        subtitle: "Capture personal and company details.",
        cardTitle: "Onboarding",
        cardSubtitle: "Complete your data in two steps.",
        start: "Start onboarding",
        resume: "Resume onboarding",
        completed: "Profile completed",
        incomplete: "Onboarding not completed",
        requiredHint: "Required field"
      },
      stepLabel: "Step {{current}} of {{total}}",
      saved: "Saved",
      passwordMismatch: "Passwords do not match.",
      registration: {
        title: "Registration",
        emailHint: "This email was captured during registration.",
        consentHint: "Data processing consent is recorded."
      },
      progress: {
        title: "Completion",
        caption: "{{percent}}% complete"
      },
      steps: {
        personal: {
          title: "Personal details",
          subtitle: "Contact data, language and security settings."
        },
        company: {
          title: "Company details",
          subtitle: "Company and address details for the contract."
        }
      },
      actions: {
        back: "Back",
        next: "Next",
        save: "Save changes",
        finish: "Finish profile",
        later: "Continue later",
        skip: "Skip"
      },
      fields: {
        email: "Email address",
        privacyConsent: "Privacy consent",
        companyName: "Company name incl. legal form",
        legalForm: "Legal form",
        street: "Street",
        houseNumber: "House number",
        addressAdditional: "Address line 2",
        zip: "Postal code",
        city: "City",
        country: "Country",
        vatId: "VAT ID",
        directorFirstName: "Managing director first name",
        directorLastName: "Managing director last name",
        salutation: "Salutation",
        contactFirstName: "First name",
        contactLastName: "Last name",
        phoneCountryCode: "Country code",
        phone: "Phone",
        language: "Language",
        password: "Password",
        passwordConfirm: "Confirm password",
        advisorCode: "Advisor code",
        kycBranch: "Branch in sanctioned region?",
        kycDirector: "Director or board in sanctioned region?",
        kycBusiness: "Business with sanctioned regions?"
      },
      options: {
        yes: "Yes",
        no: "No",
        select: "Please select",
        language: {
          de: "German",
          en: "English"
        }
      },
      placeholders: {
        insurances: "This is where your insurances will appear.",
        fleet: "This is where your fleet will appear.",
        locations: "This is where your locations will appear."
      }
    },
    policyPurchase: {
      title: "Purchase policy",
      subtitle: "Checkout flow for policies and payment details.",
      placeholder: "The policy purchase flow will be built here."
    },
    whitepaper: {
      kicker: "Whitepaper",
      heroTitle: "Native AI systems on sovereign IaaS",
      heroSubtitle: "Future-proof AI adoption for insurers, logistics leaders, and investors.",
      heroChip: "Sovereign AI Layer",
      summaryTitle: "Executive summary",
      summarySubtitle: "Strategic context for decision makers.",
      summaryBody: "This whitepaper outlines native AI systems on a sovereign IaaS platform for insurers, logistics operators, and investors. The goal is to deploy AI efficiently, safely, and at scale while staying compliant.",
      metrics: {
        ai: "Native AI stacks",
        sovereign: "Data sovereignty",
        scalable: "Scalable & auditable"
      },
      useCases: {
        title: "Permitted AI use cases",
        subtitle: "Focused on high-value, compliant applications with measurable impact.",
        risk: "Risk scoring",
        claim: "Claim forecasting",
        fraud: "Fraud detection",
        docs: "Document analysis",
        maintenance: "Predictive maintenance",
        route: "Route optimization"
      },
      sections: {
        context: {
          title: "Current situation",
          body: "AI becomes the key competitive factor in insurance and logistics, while requirements for privacy, transparency, and liability rise."
        },
        native: {
          title: "Native AI on IaaS",
          body: "Native AI runs fully inside the infrastructure. Data, models, and decisions stay controlled and auditable by operators."
        },
        ecosystem: {
          title: "Ecosystem participants",
          body: "Insurers, reinsurers, fleet operators, logistics firms, and partners access AI services through role-based controls."
        },
        useCases: {
          title: "AI use cases",
          body: "Risk scoring, claim forecasting, fraud detection, document analysis, predictive maintenance, and route optimization."
        },
        data: {
          title: "Data foundation",
          body: "Vehicle, telematics, maintenance, and claims data are used. Personal data is pseudonymized and purpose-bound."
        },
        governance: {
          title: "Governance & compliance",
          body: "Data sovereignty, model versioning, audit trails, and readiness for the EU AI Act are built in."
        },
        investors: {
          title: "Investor view",
          body: "High scalability, regulatory tailwinds, and strong customer lock-in make this model attractive."
        },
        conclusion: {
          title: "Conclusion",
          body: "Native AI on IaaS combines innovation, security, and scalability to create sustainable value."
        }
      },
      cta: {
        primary: "Request whitepaper",
        secondary: "Talk to an expert",
        title: "Ready for sovereign AI?",
        subtitle: "Get the whitepaper and discuss your AI stack with our team."
      }
    },
    aiOnboarding: {
      kicker: "AI Onboarding",
      title: "AI inside the onboarding flow",
      subtitle: "How the engineering team uses AI to improve data quality, compliance, and speed.",
      heroChip: "Developer View",
      summaryTitle: "Overview",
      summarySubtitle: "Technical perspective on AI-assisted onboarding.",
      sections: {
        intent: {
          title: "Intent & value",
          body: "AI supports onboarding with validation, suggestions, and prioritization \u2014 no autonomous decisions."
        },
        pipeline: {
          title: "Data pipeline",
          body: "Inputs are validated, pseudonymized, and transformed into structured features before model scoring."
        },
        guardrails: {
          title: "Guardrails & compliance",
          body: "Allowlists, audit trails, and model approvals are enforced in code."
        },
        tools: {
          title: "Tooling & monitoring",
          body: "Model registry, feature store, and logging provide transparency and reproducibility."
        },
        rollout: {
          title: "Rollout strategy",
          body: "Feature flags, shadow runs, and human-in-the-loop reviews secure quality in production."
        }
      },
      cta: {
        primary: "View architecture",
        secondary: "Contact team",
        title: "Next step",
        subtitle: "Discuss AI onboarding with our engineering team."
      },
      architectureTitle: "Architecture overview"
    },
    identification: {
      title: "User identification",
      subtitle: "Identity verification with document scan, authenticity checks, and selfie match.",
      progress: "Progress",
      steps: {
        start: "Start",
        capture: "Document scan",
        verification: "Verification",
        selfie: "Selfie match",
        summary: "Summary"
      },
      intro: {
        title: "Start verification",
        body: "We guide you through the process. Please have your ID ready and ensure good lighting."
      },
      document: {
        typeId: "ID card",
        typePassport: "Passport",
        typeOther: "Other document"
      },
      capture: {
        title: "Scan document",
        subtitle: "Upload a photo of the front and back.",
        front: "Front side",
        back: "Back side",
        placeholder: "No image yet"
      },
      verify: {
        title: "Verify document",
        subtitle: "Authenticity, MRZ, and issuing country are checked.",
        issuing: "Issuing country",
        authenticity: "Authenticity check",
        mrz: "MRZ extraction",
        failed: "Verification failed. Please recheck the document photos."
      },
      selfie: {
        title: "Capture selfie",
        subtitle: "Take a selfie to match against the document.",
        capture: "Selfie file",
        overlay: "Align your face inside the frame"
      },
      summary: {
        title: "Result",
        subtitle: "Verification record and outcome.",
        status: "Status",
        docType: "Document type",
        country: "Issuing country",
        audit: "Audit ID",
        ocr: "OCR extraction",
        notice: "All verification signals were logged. If it fails, contact support."
      },
      status: {
        ok: "Passed",
        pending: "Pending",
        success: "Success",
        failed: "Failed"
      },
      actions: {
        start: "Start process",
        back: "Back",
        next: "Next",
        verify: "Run verification",
        restart: "Restart"
      },
      ocr: {
        title: "OCR extraction",
        name: "Name",
        number: "Document number",
        dob: "Date of birth",
        expiry: "Expiry date",
        nationality: "Nationality"
      },
      camera: {
        capture: "Open camera",
        take: "Capture photo",
        guide: "Align the document inside the frame",
        slot: "ID frame",
        error: "Camera could not be started.",
        title: {
          front: "Capture front side",
          back: "Capture back side",
          selfie: "Capture selfie"
        }
      }
    },
    nativeAi: {
      kicker: "INSURFOX AI IaaS",
      title: "Insurfox native AI",
      subtitle: "Secure, native AI for insurers, InsurTech & health-care.",
      heroChip: "Regulated AI Stack",
      deckTitle: "Presentation",
      deckSubtitle: "Business and compliance deck for regulated markets.",
      slides: {
        1: {
          title: "Insurfox AI IaaS",
          body: "The AI-native insurance platform for regulated markets.<br/>Secure, GDPR- & BaFin-compliant AI for Insurance, Mobility & Health."
        },
        2: {
          title: "Executive Summary",
          body: "Insurfox is a fully integrated Insurance-IaaS.<br/>AI is a native part of the platform, not an external add-on.<br/>Sensitive data is handled securely, controlled, and compliant.<br/>No external AI vendors, no data or model leakage.<br/><strong>Bottom line:</strong> Productive AI without regulatory risk."
        },
        3: {
          title: "Core market problem",
          body: "Fragmented systems, external AI SaaS & hyperscalers, unclear data flows, black-box decisions.<br/><strong>Risks:</strong> GDPR violations, regulatory flags, loss of AI/IP control, reputational risk."
        },
        4: {
          title: "Insurfox approach",
          body: "AI as infrastructure, not a tool.<br/>One platform for all insurance processes.<br/>Integrated broker & partner ecosystems.<br/>Native AI inside the IaaS.<br/>Clear split between decision support and decision authority."
        },
        5: {
          title: "High-level architecture",
          body: "INSURFOX IaaS connects insurers, broker portal, core engine, and native AI layer.<br/>No external AI systems, no data sharing."
        },
        6: {
          title: "What \u201Cnative AI\u201D means",
          body: "Own AI models, training pipelines, inference services, and model registries.<br/>No external AI APIs, no third-party training, no model sharing."
        },
        7: {
          title: "AI use cases (core)",
          body: "Risk & pricing, fraud detection, portfolio & loss ratio analytics, claims & process optimization, renewal signals.<br/>Always decision support."
        },
        8: {
          title: "Sensitive data",
          body: "<strong>Insurfox does not exclude sensitive data \u2013 it makes it safely usable.</strong><br/>Health data, biometrics, mobility & telematics data."
        },
        9: {
          title: "Legal basis",
          body: "Sensitive data only under legal basis, explicit consent, and clear insurance purpose.<br/>Principles: purpose limitation, data minimization, transparency, deletion policies."
        },
        10: {
          title: "Sensitive data architecture",
          body: "Sensitive Data Zone with isolated data rooms, own AI models, and separate training pipelines."
        },
        11: {
          title: "AI governance (BaFin)",
          body: "AI recommends, not decides. Human-in-the-loop required. Explainable outcomes. Full audit trails.<br/>No auto rejection or termination."
        },
        12: {
          title: "Data protection & security",
          body: "Tenant isolation, role-based access, pseudonymization, encryption, logging of AI outputs.<br/>Important: models never learn across customers."
        },
        13: {
          title: "Interfaces",
          body: "Inbound: policy data, claims history, tariffs & rules, optional real-time data.<br/>Outbound: risk scores, pricing recommendations, fraud insights, decision dashboards."
        },
        14: {
          title: "Historical data requirements",
          body: "<strong>Required:</strong> policies & terms, claim types & amounts, processing history, risk data.<br/><strong>Optional:</strong> telematics, process times, event data, health programs."
        },
        15: {
          title: "Why no external AI?",
          body: "External AI means data leakage, loss of control, IP risks, regulatory uncertainty.<br/>Insurfox means full data sovereignty, full AI control, full auditability."
        },
        16: {
          title: "Benefits for insurers",
          body: "Faster underwriting, better loss ratios, less fraud, clean regulator communication, future-proof AI strategy."
        },
        17: {
          title: "Benefits for investors",
          body: "Deep tech moat, regulatory barrier, scalable IaaS model, strong customer lock-in, AI + insurance IP."
        },
        18: {
          title: "EU AI Act readiness",
          body: "Prepared for high-risk AI, documented governance, traceable decision logic, audit & reporting capability.<br/>Insurfox is EU AI Act ready."
        },
        19: {
          title: "Summary",
          body: "Insurfox makes AI in insurance productive, safe, and regulator-approved \u2014 even with sensitive data."
        },
        20: {
          title: "Closing",
          body: "Insurfox AI IaaS \u2014 the controlled answer to AI in regulated insurance markets."
        }
      }
    },
    featureTree: {
      title: "Feature tree",
      subtitle: "Structured overview of the platform across claims and partner networks.",
      sections: {
        intake: {
          title: "Claim intake",
          subtitle: "Intake, review, and routing.",
          items: {
            claimIntake: "Digital claim intake",
            coverageCheck: "Coverage validation",
            slaRules: "SLA and escalation rules",
            taskRouting: "Task routing & prioritization"
          }
        },
        partners: {
          title: "Partner network",
          subtitle: "Repair shops, surveyors, service vendors.",
          items: {
            partnerDirectory: "Partner directory",
            onboarding: "Onboarding & contracts",
            capacity: "Capacity steering",
            performance: "Performance & quality"
          }
        },
        media: {
          title: "Media & documents",
          subtitle: "Photos, evidence, and files.",
          items: {
            photoUpload: "Photo & video uploads",
            damageAi: "Damage AI",
            documentHub: "Document hub",
            versioning: "Versioning & approvals"
          }
        },
        finance: {
          title: "Costs & invoices",
          subtitle: "Estimates, approvals, payments.",
          items: {
            estimates: "Estimates",
            invoices: "Invoice review",
            approvals: "Approval workflows",
            reserves: "Reserve management"
          }
        },
        repair: {
          title: "Repair control",
          subtitle: "Status, parts, handover.",
          items: {
            statusTracking: "Live status",
            parts: "Parts procurement",
            milestones: "Milestones",
            handover: "Vehicle handover"
          }
        },
        comms: {
          title: "Communication",
          subtitle: "Chat, questions, notifications.",
          items: {
            liveChat: "Live chat",
            questions: "Questions & tasks",
            notifications: "Notifications",
            auditTrail: "Audit trail"
          }
        },
        analytics: {
          title: "Analytics & AI",
          subtitle: "KPIs, risks, insights.",
          items: {
            kpis: "KPI dashboards",
            trendReports: "Trend reports",
            benchmarks: "Benchmarking",
            fraudSignals: "Fraud signals"
          }
        },
        compliance: {
          title: "Compliance",
          subtitle: "Security & governance.",
          items: {
            roles: "Roles & permissions",
            gdpr: "GDPR & privacy",
            accessLogs: "Access logs",
            retention: "Retention policies"
          }
        }
      }
    },
    getQuote: {
      title: "Get a quote",
      subtitle: "Please provide your details. We will email your quote to you.",
      progress: {
        title: "COMPARIOSN",
        subtitle: "Request a quote",
        step: "Step 1 of 10"
      },
      company: {
        title: "Your details",
        subtitle: "Where is your company located?",
        locationLabel: "Select a country",
        locationPlaceholder: "Select a country",
        location: {
          de: "Germany",
          eu: "Europe"
        }
      },
      vehicles: {
        title: "Insured vehicles",
        subtitle: "Count, weight, and coverage area.",
        primary: "Carrier liability insurance",
        additional: "Additional insured vehicles",
        count: "Number of insured vehicles",
        weight: "Gross vehicle weight",
        regionLabel: "Territory",
        add: "Add another vehicle group",
        region: {
          de: "Germany",
          eu: "Europe"
        }
      },
      deductible: {
        title: "Deductible and risks",
        subtitle: "Select your options.",
        amountLabel: "Deductible amount",
        courier: "Liability coverage for courier/express parcel transport",
        cold: "Liability coverage for refrigerated cargo with equipped vehicles"
      },
      preInsurer: {
        title: "Previous insurer",
        subtitle: "Previous coverage details",
        exists: "Were you insured in the last 5 years?",
        name: "Insurer name",
        number: "Policy number"
      },
      summary: {
        title: "Premium",
        subtitle: "For a calendar year",
        netAnnual: "Annual net premium",
        tax: "Insurance tax (Germany 19%)",
        grossAnnual: "Annual gross premium",
        contract: "Contract term"
      },
      confirm: {
        title: "Request a quote",
        subtitle: "Missing details? Check required fields.",
        privacy: "I have read the privacy policy and agree.",
        submit: "Request a quote"
      },
      yes: "Yes",
      no: "No"
    },
    claimProcess: {
      title: "Claims Process",
      subtitle: "",
      chatTitle: "Claims Intake Assistant",
      chatSubtitle: "",
      chatStatus: "Live",
      intro: "Hello. I will help you file your claim.",
      timeStampMessage: "Timestamp logged: {{date}} \xB7 {{time}}.",
      askTime: "When did it happen?",
      timeNow: "Just now",
      timeOther: "Another time",
      timeOtherPlaceholder: "Enter date and time \u2026",
      confirmTime: "Confirm time",
      askLocationChoice: "Did it happen at your current location?",
      locationCurrent: "Current location",
      locationOther: "Other location",
      askLocation: "Share location for address check?",
      askAddressConfirm: "Review and confirm the address.",
      addressConfirmed: "Address confirmed.",
      confirmAddress: "Confirm address",
      askPhotos: "Please upload damage photos.",
      photosUploaded: "{{count}} photo(s) uploaded.",
      photosSkipped: "No photos provided.",
      skipPhotos: "Continue without photos",
      askPersonDetails: "Please provide first name, last name, and license plate.",
      confirmPersonDetails: "Confirm details",
      askDescription: "Briefly describe what happened.",
      firstName: "First name",
      lastName: "Last name",
      licensePlate: "License plate",
      locationButton: "Share location",
      locationPending: "Requesting location \u2026",
      locationPendingShort: "Locating \u2026",
      locationGranted: "Location captured: {{address}}",
      locationDenied: "Location unavailable \u2014 please add the address manually.",
      locationUnknown: "Not captured",
      nextPrompt: "We will start with the location check.",
      botAck: "Thanks, noted.",
      claimNumberMessage: "Your claim number: {{claimNumber}}.",
      inputPlaceholder: "Short description \u2026",
      openManager: "Open claim manager",
      send: "Submit",
      back: "Back",
      street: "Street",
      houseNumber: "House number",
      postalCode: "Postal code",
      city: "City",
      upload: "Upload photos",
      uploadEmpty: "No photos selected",
      uploadCount: "{{count}} photo(s) selected",
      valuePending: "Pending",
      infoTitle: "Live check",
      infoSubtitle: "",
      infoLocation: "Location",
      infoDate: "Date",
      infoTime: "Time",
      infoClaimNumber: "Claim number",
      infoPhotos: "Photos",
      infoDescription: "Incident summary",
      infoIncidentTime: "Incident time",
      infoFirstName: "First name",
      infoLastName: "Last name",
      infoLicensePlate: "License plate",
      infoStatus: "Status",
      statusOpen: "Open",
      demoHint: "Timestamp and location are attached to the claim ticket."
    },
    logisticsLanding: {
      badge: "Insurfox IaaS",
      title: "IaaS Logistics Portal",
      subtitle: "Real-time transport status, cargo insurance and incident handling \u2013 in one platform.",
      login: "Login",
      kpi: {
        liveShipments: "Live shipments",
        coverageRate: "Coverage rate",
        openIncidents: "Open incidents",
        etaDeviation: "Avg. ETA deviation"
      },
      kpiValues: {
        liveShipments: "128",
        coverageRate: "92%",
        openIncidents: "7",
        etaDeviation: "18m"
      },
      cards: {
        realtime: {
          title: "Real-time transport tracking",
          body: "ETA, route, status changes and alerts per shipment and customer."
        },
        coverage: {
          title: "Cargo insurance & coverage",
          body: "Carrier\u2019s liability, cargo and add-ons per order \u2013 transparent and auditable."
        },
        incidents: {
          title: "Claims & incidents",
          body: "Theft, damage, delays, temperature breaches \u2013 incl. docs, photos and partners."
        },
        thirdparty: {
          title: "Third party & shippers",
          body: "Shippers, contacts, SLAs and billing \u2013 directly within each transport."
        },
        ai: {
          title: "AI recommendations & alerts",
          body: "Proactive signals on risk, fraud, cost, routing and coverage gaps."
        },
        routes: {
          title: "Routes & risk",
          body: "Route profiles, risk zones, weather and traffic indicators \u2013 including live alerts per lane."
        }
      },
      preview: {
        title: "Live Dashboard Preview",
        eta: "ETA",
        temp: "Temp",
        customs: "Customs",
        footer: "Demo data with live KPI trend (ETA, temperature, customs)."
      },
      previewValues: {
        eta: "18m",
        temp: "+2\xB0C",
        customs: "Cleared"
      }
    },
    logisticsApp: {
      title: "Logistics Cockpit",
      subtitle: "Orders, routes, coverage and incidents at a glance",
      sections: {
        overview: "Overview",
        shipments: "Live shipments",
        coverage: "Insurance & coverage",
        incidents: "Claims & incidents",
        thirdParty: "Third party",
        documents: "Documents"
      },
      kpi: {
        activeShipments: "Active shipments",
        delayed: "Delayed",
        incidents: "Open incidents",
        coverageOk: "Coverage OK",
        highRisk: "High risk",
        avgEtaDeviation: "Avg. ETA deviation"
      },
      filters: {
        search: "Search shipment, route or customer \u2026",
        statusLabel: "Status",
        statusAll: "All",
        statusInTransit: "In transit",
        statusDelayed: "Delayed",
        statusDelivered: "Delivered",
        statusIncident: "Incident"
      },
      table: {
        shipments: {
          title: "Live shipments",
          col: {
            shipment: "Shipment",
            customer: "Customer",
            route: "Route",
            status: "Status",
            eta: "ETA",
            coverage: "Coverage",
            cargo: "Cargo",
            value: "Value",
            thirdParty: "Third party",
            aiHint: "AI hint"
          },
          empty: "No demo data found."
        },
        statusLabels: {
          inTransit: "In transit",
          delayed: "Delayed",
          delivered: "Delivered",
          incident: "Incident"
        },
        coverageLabels: {
          covered: "Covered",
          partial: "Partial",
          notCovered: "Not covered"
        }
      },
      shipmentsCopy: {
        cargo: {
          electronics: "Electronics",
          pharma: "Pharma",
          fashion: "Fashion",
          chemicals: "Chemicals",
          chilled: "Food (chilled)",
          automotive: "Automotive",
          retailMixed: "Retail (mixed)",
          seafood: "Seafood"
        },
        notes: {
          tempStable: "Temp stable / SLA OK",
          customsWait: "Waiting for customs slot",
          theftInvestigation: "Incident: theft under investigation",
          podSigned: "Proof of delivery signed",
          temp3c: "Temperature 3 \xB0C",
          ferrySlot: "Waiting for ferry slot",
          borderCrossed: "Border crossed",
          tempDeviation: "Temperature deviation alert"
        },
        eta: {
          delayed45: "+45m",
          delayed25: "+25m",
          investigating: "Investigating",
          hold: "On hold"
        }
      },
      coverage: {
        title: "Insurance & coverage",
        policyId: "Policy",
        limit: "Limit",
        deductible: "Deductible",
        validity: "Validity",
        status: "Status",
        covered: "Covered",
        partial: "Partial",
        notCovered: "Not covered",
        statusLabels: {
          active: "Active",
          selective: "Selective",
          inactive: "Inactive"
        }
      },
      coverageCards: {
        liability: { title: "Carrier\u2019s liability" },
        cargo: { title: "Cargo insurance" },
        addons: { title: "Add-ons" }
      },
      incidents: {
        title: "Incidents & claims",
        subtitle: "Current incidents & investigations",
        openIncident: "Open incident",
        labels: {
          status: "Status",
          cost: "Cost",
          documents: "Documents"
        },
        statusLabels: {
          open: "Open",
          review: "In review",
          closed: "Closed"
        },
        riskLabels: {
          low: "Low",
          medium: "Medium",
          high: "High"
        },
        types: {
          theftParking: "Theft (parking A14)",
          tempDeviation: "Temperature deviation",
          delay12h: "Delay > 12h",
          damageForklift: "Damage (forklift)"
        }
      },
      documents: {
        title: "Documents",
        upload: "Upload",
        download: "Download"
      },
      thirdParty: {
        shipper: "Shipper",
        consignee: "Consignee",
        broker: "Broker",
        warehouse: "Warehouse"
      }
    },
    marketing: {
      title: "Insurfox Platform",
      subtitle: "Digital front- and back-office solutions for brokers, MGAs, and fleets.",
      login: "Login",
      highlights: {
        title: "Highlights",
        ai: "AI-powered processes",
        workflows: "End-to-end workflows",
        insights: "Reporting & insights"
      },
      modules: {
        title: "Modules",
        backoffice: "Backoffice & CRM",
        tenders: "Tenders & submissions",
        fleetReporting: "Fleet reporting",
        fleetManagement: "Fleet management",
        registration: "Registration assistant",
        compliance: "Compliance"
      },
      why: {
        title: "Why Insurfox?",
        fast: "Work faster \u2014 less manual effort.",
        ai: "Better decisions with AI insights.",
        scale: "Scales with growing portfolios."
      },
      cta: "Go to overview"
    },
    marketingFleet: {
      hero: {
        title: "IaaS Fleet Management",
        subtitle: "Manage vehicles, claims, schedules, documents and policies \u2013 powered by AI recommendations and real-time insights.",
        login: "Login",
        illustrationTitle: "AI live alerts",
        illustrationValue: "12 active signals",
        illustrationDescription: "Live incidents, inspection load and downtime forecasts in one view."
      },
      kpi: {
        realTime: "Real-time status & alerts",
        ai: "AI-powered prioritization",
        tuv: "Inspection & maintenance planning",
        claims: "Claims & cost control",
        docs: "Documents & policies",
        compliance: "Compliance & reporting"
      },
      manage: {
        title: "What you can manage",
        features: {
          vehiclesMaster: {
            title: "Vehicles & master data",
            description: "VIN, equipment, GPS, sensor and usage history at a glance."
          },
          realTime: {
            title: "Real-time status & alerts",
            description: "Live view of fleet notifications, alerts and incidents by asset."
          },
          aiPrioritization: {
            title: "AI-powered prioritization",
            description: "AI ranks risks, claims and actions automatically by impact."
          },
          tuvPlanning: {
            title: "Inspection & maintenance planning",
            description: "Coordinate inspections, maintenance capacity and replacement vehicles."
          },
          claimsControl: {
            title: "Claims & cost control",
            description: "Track claim status, repair orders and cost forecasts centrally."
          },
          docsPolicies: {
            title: "Documents & policies",
            description: "Manage contracts, policies and compliance records in one place."
          }
        }
      },
      preview: {
        title: "Real-time dashboard preview",
        subtitle: "Live KPIs, alerts and incident context for your teams.",
        kpis: {
          uptime: "Availability",
          openClaims: "Open claims",
          downtime: "Avg. downtime (month)"
        },
        incidentsTitle: "Incidents per month",
        downtimeTitle: "Downtime trend",
        table: {
          columns: {
            date: "Date",
            vehicle: "Vehicle",
            type: "Type",
            status: "Status",
            cost: "Cost",
            ai: "AI flag"
          },
          typeLabels: {
            motor: "Motor",
            cargo: "Cargo",
            liability: "Liability"
          },
          statusLabels: {
            open: "Open",
            repair: "In repair",
            monitoring: "Monitoring"
          },
          aiLabels: {
            alert: "Alert",
            watch: "Watch",
            info: "Info"
          },
          rows: {
            row1: {
              date: "Mar 03, 2025",
              vehicle: "DE-789-XY",
              typeKey: "motor",
              statusKey: "repair",
              cost: "\u20AC8,450",
              aiKey: "alert"
            },
            row2: {
              date: "Mar 02, 2025",
              vehicle: "HH-CARGO-12",
              typeKey: "cargo",
              statusKey: "open",
              cost: "\u20AC5,870",
              aiKey: "watch"
            },
            row3: {
              date: "Mar 01, 2025",
              vehicle: "M-FL-2045",
              typeKey: "liability",
              statusKey: "monitoring",
              cost: "\u20AC2,180",
              aiKey: "info"
            },
            row4: {
              date: "Feb 27, 2025",
              vehicle: "K-TR-330",
              typeKey: "motor",
              statusKey: "open",
              cost: "\u20AC1,260",
              aiKey: "watch"
            },
            row5: {
              date: "Feb 25, 2025",
              vehicle: "B-DEL-901",
              typeKey: "cargo",
              statusKey: "repair",
              cost: "\u20AC9,120",
              aiKey: "alert"
            }
          }
        }
      },
      usecases: {
        title: "Who benefits?",
        items: {
          logistics: {
            title: "Logistics operators",
            description: "Complex truck, trailer and cargo fleets across Europe."
          },
          delivery: {
            title: "Delivery & service fleets",
            description: "City and regional fleets with tight schedules and SLAs."
          },
          industrial: {
            title: "Industrial & mixed fleets",
            description: "Cars, vans and special-purpose vehicles for construction or energy."
          }
        }
      },
      cta: {
        primary: "View demo",
        secondary: "Open Fleet Reporting"
      }
    },
    claimManager: {
      rolesCard: {
        description: "Claims handler cockpit for fast decisions, approvals, partner orchestration and AI insights.",
        cta: "Open"
      },
      marketing: {
        hero: {
          overline: "Claims intelligence",
          title: "Claim Manager",
          subtitle: "Claims handler cockpit for fast decisions, approvals and partner orchestration \u2013 with AI, documents and coverage validation in one place.",
          login: "Login"
        },
        features: {
          statusTimeline: {
            title: "Status & timeline",
            description: "All processing stages, escalations and SLAs in one view."
          },
          coverage: {
            title: "Coverage & policies",
            description: "Automated policy validation, limits and deductibles with AI support."
          },
          partners: {
            title: "Partner orchestration",
            description: "Dispatch workshops, surveyors or towing services directly from the claim file."
          },
          workflows: {
            title: "Cost approval & workflows",
            description: "Approvals with checklists, comments and a full audit trail."
          },
          documents: {
            title: "Documents & media",
            description: "Police reports, estimates and photos managed securely in context."
          },
          aiInsights: {
            title: "Insurfox AI insights",
            description: "Suspicion flags, plausibility checks and next-best-actions for handlers."
          }
        },
        preview: {
          title: "Dashboard preview",
          subtitle: "KPIs, alerts and timeline \u2014 built for decisive claims teams.",
          kpis: {
            active: "Active claims",
            sla: "SLA adherence",
            ai: "AI alerts"
          },
          chartTitle: "Cost progression per week",
          notes: "Demo data: combined KPI + AI alert view with status clustering."
        }
      },
      app: {
        listHeader: {
          title: "Insurfox Claims Manager",
          subtitle: "Open claims currently in progress"
        },
        caseHeader: {
          title: "Claim file",
          subtitle: "Claim overview and status with AI decision templates"
        },
        header: {
          overline: "Claim file",
          title: "Claim file",
          claimId: "Claim ID",
          claimIdValue: "CLM-2025-0471",
          date: "Incident",
          dateValue: "12 March 2025",
          status: "Status"
        },
        caseList: {
          title: "Saved claims",
          subtitle: "Select a claim to open the file.",
          empty: "No saved claims yet.",
          columns: {
            claimNumber: "Claim number",
            firstName: "First name",
            lastName: "Last name",
            licensePlate: "License plate",
            date: "Incident"
          }
        },
        filters: {
          status: "Status",
          type: "Damage type",
          all: "All",
          reset: "Reset filters"
        },
        damageTypes: {
          rearCollision: "Rear collision",
          frontCollision: "Front collision",
          sideCollision: "Side collision",
          parkingDamage: "Parking damage",
          glassDamage: "Glass damage",
          wildlife: "Wildlife impact",
          mirrorContact: "Mirror contact",
          hailDamage: "Hail damage",
          theft: "Theft",
          waterDamage: "Water damage",
          fireDamage: "Fire damage",
          vandalism: "Vandalism",
          stormDamage: "Storm damage",
          engineDamage: "Engine damage",
          tireDamage: "Tire damage",
          cargoDamage: "Cargo damage",
          liabilityDamage: "Liability damage",
          animalDamage: "Animal damage"
        },
        statusOptions: {
          intake: "Intake",
          review: "Review",
          approval: "Approval",
          repair: "Repair",
          closure: "Closure"
        },
        actions: {
          backToList: "Back to overview",
          approveCosts: "Approve costs",
          assignSurveyor: "Assign surveyor",
          changePartner: "Change partner"
        },
        kpis: {
          totalIncurred: "Total incurred",
          reserve: "Reserve",
          approved: "Approved",
          openItems: "Open items",
          deductible: "Deductible",
          coverage: "Coverage status",
          coverageValue: "Covered",
          fraudRisk: "Fraud risk",
          handlingTime: "Handling time"
        },
        kpiValues: {
          totalIncurred: "\u20AC12,480",
          reserve: "\u20AC3,200",
          approved: "\u20AC6,210",
          openItems: "3",
          deductible: "\u20AC500",
          coverage: "Covered",
          fraudRisk: "Medium",
          handlingTime: "9 d"
        },
        details: {
          title: "Claim details",
          type: "Claim type",
          location: "Location & time",
          incidentTime: "Timestamp",
          vehicle: "Vehicle",
          summary: "Summary",
          values: {
            type: "Comprehensive / rear impact",
            location: "Port of Hamburg, 11:32",
            vehicle: "HH-CL 2045 \u2022 WDD2130041A123456",
            summary: "Driver reports a rear-end collision at Gate 4. Sensor data and witness statement available."
          }
        },
        timeline: {
          title: "Timeline & SLA",
          steps: {
            intake: "Intake",
            review: "Review",
            approval: "Approval",
            repair: "Repair",
            closure: "Closure"
          }
        },
        costs: {
          title: "Costs & approval",
          confirm: "Review costs",
          table: {
            position: "Line item",
            amount: "Amount",
            status: "Status",
            note: "Note"
          },
          items: {
            bodywork: "Bodywork",
            paint: "Paint",
            rental: "Rental car"
          },
          status: {
            pending: "Pending",
            approved: "Approved",
            rejected: "Rejected"
          },
          notePlaceholder: "Add comment \u2026",
          modal: {
            title: "Confirm cost coverage",
            checkbox: "Policy checked & limits respected",
            confirm: "Approve costs",
            cancel: "Cancel"
          }
        },
        coverage: {
          title: "Coverage & policy",
          policyNumber: "Policy",
          policyValue: "POL-DE-4711",
          term: "Term",
          termValue: "01 Jan 2024 \u2013 31 Dec 2024",
          limit: "Limit",
          limitValue: "\u20AC15,000",
          exclusion: "Exclusions",
          exclusionValue: "Glass breakage excluded",
          covered: "Covered",
          partial: "Partially covered",
          notCovered: "Not covered",
          note: "Coverage analysis confirms repair and rental expenses."
        },
        partner: {
          title: "Partner management",
          changeButton: "Change partner",
          modalTitle: "Select partner",
          confirm: "Apply",
          options: {
            partner1: { name: "M\xFCller Bodyshop" },
            partner1Address: "Hamburg, S\xFCderstra\xDFe 54",
            partner2: { name: "Autopartner North" },
            partner2Address: "L\xFCbeck, Baltic Park 3",
            partner3: { name: "Bodyshop 24" },
            partner3Address: "Bremerhaven, Dock 2"
          }
        },
        ai: {
          title: "Insurfox AI insights",
          items: {
            hint1: "Fraud suspicion medium \u2014 claim amount +18% above benchmark.",
            hint2: "Missing police report \u2014 request upload.",
            hint3: "Repeated pattern: 3 similar claims in 12 months.",
            hint4: "Recommend surveyor due to severity score 0.72.",
            hint5: "Workshop capacity: M\xFCller available from Mar 15."
          }
        },
        documents: {
          title: "Documents",
          media: "Media & photos",
          mediaLabel: "Photo",
          damage: {
            title: "Damage imagery & AI review",
            modalTitle: "Damage photo",
            prev: "Prev",
            next: "Next",
            riskBadges: {
              low: "\u{1F7E2} Low risk",
              medium: "\u{1F7E0} Medium risk",
              high: "\u{1F534} Elevated risk"
            },
            items: {
              photo1: {
                title: "Front bumper impact",
                ai: "AI detects a frontal impact at moderate speed. Deformation consistent with a rear-end scenario.",
                fraud: "Visual evidence matches the reported incident."
              },
              photo2: {
                title: "Driver-side door damage",
                ai: "Side indentation with paint transfer. Contact with a fixed object is likely.",
                fraud: "Estimated severity slightly above average for comparable cases."
              },
              photo3: {
                title: "Rear damage",
                ai: "Clear rear impact energy transfer. No obvious signs of pre-existing damage.",
                fraud: "No fraud signal detected."
              },
              photo4: {
                title: "Close-up: paint & sensor area",
                ai: "Sensor area affected. Post-repair calibration is recommended.",
                fraud: "Irregular scratch patterns \u2014 manual review recommended."
              }
            }
          },
          list: {
            estimate: "Estimate.pdf",
            police: "Police-report.pdf",
            survey: "Survey.pdf",
            invoice: "Invoice.pdf"
          },
          previewTitle: "Preview",
          close: "Close"
        },
        surveyor: {
          title: "Assign surveyor",
          mapTitle: "Region & distance",
          confirm: "Confirm",
          options: {
            surveyor1: "MobilExpert GmbH",
            surveyor1Region: "Hamburg region",
            surveyor2: "NordGutachter AG",
            surveyor2Region: "Schleswig-Holstein region",
            surveyor3: "SchnellCheck Service",
            surveyor3Region: "Lower Saxony region"
          }
        }
      }
    },
    fleetReporting: {
      title: "Fleet Reporting Dashboard",
      subtitle: "KPIs, anomalies and claims overview for your fleet",
      kpi: {
        totalClaims: "Total claims (12 months)",
        openClaims: "Open claims",
        lossRatio: "Loss ratio",
        avgCost: "Avg. claim cost",
        coverageRate: "Coverage rate",
        activeVehicles: "Active vehicles",
        downtime: "Avg. downtime days / month",
        topCause: "Top claim cause"
      },
      kpiValues: {
        topCause: "Rear-end collision"
      },
      charts: {
        monthlyTitle: "Claims per month",
        monthlySubtitle: "Twelve months of demo data",
        coverageTitle: "Coverage status",
        coverageSubtitle: "Share of covered vs. uncovered",
        severityTitle: "Claim severity distribution",
        severitySubtitle: "Share per category"
      },
      coverageLabels: {
        covered: "Covered",
        uncovered: "Not covered"
      },
      severityLabels: {
        high: "High",
        medium: "Medium",
        low: "Low"
      },
      ai: {
        title: "Insurfox AI \u2013 Fleet Insights",
        subtitle: "Automated signals from historical and real-time data",
        items: {
          item1: "Vehicle DE-789-XY shows a 40% higher claim frequency than the fleet average.",
          item2: "Region Berlin reports 25% more incidents in Q4. Weather correlation detected.",
          item3: "Driver coaching recommended for Team North based on recurring accident patterns.",
          item4: "Cargo claims up 15% in November. Route optimization suggested.",
          item5: "Trailer cluster South shows increased maneuvering damage. Review yard routing.",
          item6: "Repair costs for \u201CDelivery Vans\u201D up 12%. Recommend preventive maintenance."
        }
      },
      vehicles: {
        title: "Vehicles",
        filters: {
          typeLabel: "Vehicle type",
          statusLabel: "Status",
          searchPlaceholder: "Search license plate or VIN \u2026",
          typeOptions: {
            all: "All",
            car: "Cars",
            truck: "Trucks",
            trailer: "Trailers",
            delivery: "Delivery vans"
          },
          statusOptions: {
            all: "All",
            active: "Active",
            maintenance: "In workshop",
            down: "Out of service"
          }
        },
        cards: {
          type: "Type",
          status: "Status",
          location: "Location",
          inspection: "Next inspection",
          maintenance: "Next maintenance",
          downtime: "Downtime YTD",
          open: "Open"
        },
        statusBadges: {
          active: "Active",
          maintenance: "Workshop",
          down: "Out"
        }
      },
      filters: {
        typeLabel: "Claim type",
        typeOptions: {
          all: "All",
          motor: "Motor",
          liability: "Liability",
          cargo: "Cargo"
        },
        rangeLabel: "Time range",
        rangeOptions: {
          last30: "Last 30 days",
          last12: "Last 12 months"
        }
      },
      table: {
        title: "Fleet claims",
        columns: {
          date: "Date",
          vehicle: "Vehicle",
          vin: "VIN",
          location: "Route / Location",
          type: "Type",
          coverage: "Coverage",
          status: "Status",
          cost: "Cost",
          ai: "AI note",
          note: "Notes"
        },
        types: {
          motor: "Motor",
          liability: "Liability",
          cargo: "Cargo"
        },
        coverageBadges: {
          covered: "Covered",
          uncovered: "Not covered"
        },
        statusBadges: {
          open: "Open",
          review: "In review",
          closed: "Closed"
        },
        aiBadges: {
          alert: "Anomaly",
          watch: "Watch",
          normal: "Normal"
        },
        rows: {
          row1: {
            location: "Berlin \u2192 Leipzig (A9)",
            ai: "Telematics flagged harsh braking + sensor fault"
          },
          row2: {
            location: "Hamburg port",
            ai: "Re-check cargo lashing \u2013 recurring damage pattern"
          },
          row3: {
            location: "Munich \u2192 Salzburg",
            ai: "Insurer requested additional photo evidence"
          },
          row4: {
            location: "Cologne city center",
            ai: "Incident cluster at the same intersection"
          },
          row5: {
            location: "Frankfurt air cargo hub",
            ai: "Temperature deviation + delayed notification"
          }
        }
      }
    },
    fleetManagement: {
      title: "Fleet Management",
      subtitle: "Manage vehicles, documentation, insurance policies, and driver assignments.",
      kpi: {
        active: "Active vehicles",
        workshop: "In workshop",
        inspectionDue: "Inspection due (30 days)",
        openTasks: "Open tasks"
      },
      filters: {
        typeLabel: "Vehicle type",
        statusLabel: "Status",
        searchPlaceholder: "Search license plate or VIN \u2026",
        typeOptions: {
          all: "All",
          car: "Cars",
          truck: "Trucks",
          trailer: "Trailers",
          delivery: "Delivery vans"
        },
        statusOptions: {
          all: "All",
          active: "Active",
          maintenance: "In workshop",
          down: "Out of service"
        }
      },
      list: {
        title: "Vehicle list",
        open: "Open",
        statusBadges: {
          active: "Active",
          maintenance: "Workshop",
          down: "Out"
        }
      },
      detail: {
        title: "Vehicle details",
        overview: "Profile",
        usage: "Usage",
        usageLabels: {
          longhaul: "Long-haul",
          regional: "Regional distribution",
          city: "City delivery",
          cargo: "Cargo & trailer"
        },
        schedule: "Schedule & maintenance",
        inspection: "Inspection",
        inspectionStatus: {
          ok: "OK",
          dueSoon: "Due soon",
          overdue: "Overdue"
        },
        maintenance: "Next maintenance",
        downtime: "Downtime (12 months)",
        documents: "Documents",
        documentsList: {
          registration: "Registration.pdf",
          leasing: "Leasing-agreement.pdf",
          maintenance: "Maintenance-records.zip"
        },
        upload: "Upload",
        policies: "Insurance policies",
        policiesColumns: {
          number: "Policy",
          line: "Line",
          sum: "Sum insured",
          deductible: "Deductible",
          term: "Term",
          status: "Status"
        },
        policyLines: {
          liability: "Liability",
          casco: "Comprehensive",
          cargo: "Cargo"
        },
        policyStatus: {
          active: "Active",
          pending: "Pending"
        },
        drivers: "Driver assignment",
        primaryDriver: "Primary driver",
        addDriver: "Add driver",
        licenses: "License classes",
        licenseValidity: "Valid until",
        licenseStatus: {
          valid: "Valid",
          expiring: "Expiring soon",
          expired: "Expired"
        }
      },
      driverPicker: {
        title: "Available drivers",
        assign: "Assign"
      }
    },
    registration: {
      title: "Registering is easy.",
      subtitle: "Enter your email address and we will send you a personal link.",
      emailLabel: "Email address",
      emailPlaceholder: "Enter your email address here",
      emailError: "Please enter a valid email address.",
      privacyText: "I have read the",
      privacyLinkText: "privacy policy",
      privacyLink: "https://insurfox.de/en/privacy/",
      privacyError: "Please accept the privacy policy.",
      submit: "Register now",
      nextStep: "Next step",
      success: "Thanks! We will email your personal link shortly.",
      alreadyRegistered: "Already registered?",
      login: "Sign in",
      inputPlaceholder: "Type your reply \u2026",
      send: "Send",
      restart: "Restart",
      back: "Back to overview",
      modeWrite: "\u270D\uFE0F Type",
      modeSpeak: "\u{1F399}\uFE0F Speak",
      voiceLabel: "Choose a voice",
      voicePlaceholder: "Select a voice",
      voiceLoading: "Loading available voices \u2026",
      voiceStart: "Start",
      voiceActiveLabel: "Active voice",
      voiceActiveBadge: "Preferred",
      voiceStartListening: "\u{1F399}\uFE0F Start recording",
      voiceStopListening: "\u23F9\uFE0F Stop recording",
      voiceNoRecognition: "Voice input is not supported on this device \u2013 please type your replies.",
      messageSource: {
        voice: "Voice",
        text: "Input",
        quick: "Quick reply"
      },
      bot: {
        welcome: "\u{1F44B} Welcome to Claimfox. I will guide you through the registration.",
        mode: "Would you like to type the answers yourself or talk to me?",
        name: "What is your full name?",
        email: "Please enter your email address. We only use it for updates about the registration.",
        emailInvalid: "That email address looks invalid. Please check it again.",
        phone: "Would you like to add a phone number? You can also type \u201CSkip\u201D.",
        skip: "No problem, I will skip the phone number.",
        role: "How would you like to use Claimfox? Give me a short hint.",
        roleCustomer: "\u2022 Customers & drivers, e.g. for claims or inquiries",
        rolePartner: "\u2022 Partners & network such as assessors or repair shops",
        roleInternal: "\u2022 Internal teams for steering and reporting",
        privacy: "Please confirm that you agree to our privacy policy.",
        privacyYes: "Thanks for confirming. Let me summarize everything.",
        privacyNo: "Without your consent we cannot continue.",
        privacyNoStop: "You can restart the process anytime once you are ready.",
        summary: "Here is your summary:\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nRole: {{role}}",
        submit: "Submit registration",
        edit: "Edit information",
        success: "\u{1F389} Thank you! We have received your registration and will get back to you shortly.",
        voiceConfirm: "Did I understand that correctly?",
        voiceSelect: "Please choose the voice for your Claimsfox first.",
        voiceNotSupported: "Your browser does not support speech output. Let us continue by typing.",
        voiceInputNotSupported: "Listening is not available in this browser. Please type your response.",
        listening: "\u{1F399}\uFE0F Listening \u2026"
      }
    },
    partnerManagement: {
      title: "Partner management",
      subtitle: "Partner networks, documents, and live claim communication.",
      actions: {
        addPartner: "Add partner"
      },
      partnerTypes: {
        workshop: "Repair shop",
        surveyor: "Surveyor",
        towing: "Towing service"
      },
      selection: {
        title: "Partner selection",
        subtitle: "Networks, specialization, and response times.",
        response: "Response time"
      },
      claimMedia: {
        title: "Claim media",
        subtitle: "Status of submitted photos.",
        status: {
          review: "In review",
          approved: "Approved",
          missing: "Missing"
        }
      },
      estimates: {
        title: "Estimates",
        subtitle: "Intake, review, and approvals.",
        cta: "Request estimate"
      },
      invoices: {
        title: "Invoices",
        subtitle: "Review and approval per partner.",
        cta: "Review invoice"
      },
      repair: {
        title: "Repair status",
        subtitle: "Live updates from the partner network.",
        eta: "ETA: {{time}}",
        steps: {
          intake: "Vehicle intake",
          diagnostics: "Diagnostics",
          parts: "Parts",
          repair: "Repair",
          handover: "Handover"
        }
      },
      chat: {
        title: "Live chat",
        subtitle: "Questions and coordination for this claim.",
        placeholder: "Write a message \u2026",
        send: "Send"
      },
      questions: {
        title: "Open questions",
        subtitle: "Pending items for the partner.",
        cta: "New question"
      }
    },
    brokerPortal: {
      title: "IaaS Broker Portal"
    },
    brokerLanding: {
      title: "Broker Portal",
      login: "Login",
      heroHeadline: "Insurfox IaaS Broker Portal",
      heroSubline: "Digital front- and back-office operations for European brokers, MGAs, and coverholders.",
      valueLine1: "Back-office & CRM tailored to mid-sized commercial brokers.",
      valueLine2: "Tender and placement platform for complex industrial programs.",
      valueLine3: "AI-powered portfolio tools for retention, upsell, and client experience.",
      trust: {
        crm: "CRM back office",
        tender: "Tender platform",
        ai: "AI tools"
      },
      heroStats: {
        coverage: "12+ industrial & specialty lines",
        automation: "80% automated workflows",
        retention: "98% renewal rate on core accounts"
      },
      heroCTAPrimary: "View demo",
      heroCTASecondary: "Login",
      featureSectionTitle: "Everything brokers need to scale",
      featureSectionSubtitle: "One platform for sales, service, and underwriting orchestration.",
      features: {
        crm: "Back-office & CRM",
        tender: "Tender & placements",
        ai: "AI tools for portfolio & renewal",
        insights: "Portfolio insights & reporting",
        workflows: "Automated workflows",
        compliance: "Compliance & documentation"
      },
      sectorsTitle: "Lines & products",
      sectorsSubtitle: "Unified processes for industrial and specialty lines across Europe.",
      sectorsBanner: "Unified workflows for industrial and specialty lines.",
      sectorsList: {
        carriers: "Carrier\u2019s liability insurance",
        fleet: "Fleet insurance",
        cargo: "Cargo insurance",
        logistics: "Logistics composite",
        contents: "Contents insurance",
        liability: "General liability",
        photovoltaic: "Photovoltaic insurance",
        cyber: "Cyber insurance",
        do: "D&O insurance",
        legal: "Legal expenses insurance",
        electronics: "Electronics insurance",
        machinery: "Machinery insurance",
        tradeCredit: "Trade credit insurance"
      },
      whyTitle: "Why Insurfox?",
      whySubtitle: "We blend insurance DNA, technology, and regulatory readiness.",
      whyItems: {
        relationship: "Dedicated experts guide your transformation from migration to run mode.",
        automation: "Cross-platform processes with AI, automation, and open APIs.",
        compliance: "EU hosting, auditing, and compliance for DORA-ready operations."
      }
    },
    brokerCrm: {
      title: "CRM & Reporting",
      subtitle: "Stay on top of leads, customers, and daily broker activities at a glance.",
      ai: {
        title: "AI insights",
        subtitle: "Suggested priorities based on close probability and deal volume.",
        labels: {
          probability: "Close probability",
          volume: "Volume",
          recommendation: "Recommendation"
        },
        items: {
          item1: {
            name: "Miller Logistics GmbH",
            type: "High close probability",
            value: "92%",
            action: "Call today"
          },
          item2: {
            name: "NordCargo AG",
            type: "Highest volume",
            value: "\u20AC 185k",
            action: "Finalize proposal"
          },
          item3: {
            name: "AlpenFleet KG",
            type: "High close probability",
            value: "88%",
            action: "Send follow-up email"
          },
          item4: {
            name: "RheinTech Industries",
            type: "Highest volume",
            value: "\u20AC 240k",
            action: "Initiate risk review"
          },
          item5: {
            name: "Hansea Spedition GmbH",
            type: "High close probability",
            value: "84%",
            action: "Request documents"
          },
          item6: {
            name: "Baltic Freight Solutions",
            type: "Highest volume",
            value: "\u20AC 310k",
            action: "Negotiate terms"
          }
        }
      },
      kpi: {
        activeCustomers: "Active customers",
        openLeads: "Open leads",
        dealsMonth: "Deals (month)",
        premiumVolume: "Premium volume"
      },
      charts: {
        revenueTitle: "Premium trend",
        revenueSubtitle: "Last 6 months",
        leadsTitle: "Leads by status",
        leadsSubtitle: "Current month",
        revenueLegendCurrent: "Current year",
        revenueLegendPrevious: "Previous year",
        leadsLegendOpen: "Open",
        leadsLegendWon: "Won",
        leadsLegendLost: "Lost"
      },
      table: {
        title: "Customers & leads",
        name: "Name",
        status: "Status",
        lastContact: "Last contact",
        potential: "Potential",
        nextStep: "Next step",
        statusLabels: {
          prospect: "Prospect",
          active: "Active",
          onboarding: "Onboarding",
          dormant: "Dormant"
        },
        potentialLabels: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        nextSteps: {
          call: "Schedule call",
          meeting: "On-site meeting",
          proposal: "Send proposal",
          onboarding: "Kick off onboarding",
          renewal: "Renew contract"
        }
      },
      activities: {
        title: "Activities",
        followUp: "Prepare follow-up for Miller Insurance",
        proposal: "Send proposal to FleetSecure",
        documents: "Review documents for Contora",
        audit: "Schedule audit with Atlas Brokerage",
        training: "Plan digital training for new partner team"
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  translations
});
