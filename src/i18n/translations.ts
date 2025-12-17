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
      title: 'Maklerportal'
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
      title: 'Broker Portal'
    }
  }
}
