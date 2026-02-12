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
  header: {
    login: string
    logout: string
    nav: {
      insurance: string
      broker: string
      claimsfox: string
      aiFox: string
      partnerfox: string
      fleetfox: string
    }
  }
  underwriterfox: {
    nav: {
      title: string
      dashboard: string
      cases: string
      documents: string
      rules: string
      rating: string
      ai: string
      reporting: string
      governance: string
    }
    status: {
      intake: string
      screening: string
      manualReview: string
      offer: string
      bound: string
      declined: string
    }
    deadlines: {
      title: string
      subtitle: string
      modalTitle: string
      modalClose: string
      items: {
        review: string
        pricing: string
        cyber: string
        brokerCall: string
        qa: string
      }
      caseItems: {
        committee: {
          title: string
          detail: string
        }
        broker: {
          title: string
          detail: string
        }
        pricing: {
          title: string
          detail: string
        }
        qa: {
          title: string
          detail: string
        }
        decision: {
          title: string
          detail: string
        }
      }
    }
    timeline: {
      title: string
      subtitle: string
      empty: string
      type: {
        statusUpdate: string
        internalNote: string
        externalMessage: string
        system: string
      }
    }
    documents: {
      title: string
      subtitle: string
      empty: string
      statusLabel: string
      status: {
        extracted: string
        needsReview: string
        approved: string
      }
      view: string
    }
    ai: {
      title: string
      subtitle: string
      recommendation: string
      confidence: string
      empty: string
      generate: string
      decision: {
        approve: string
        decline: string
        refer: string
      }
    }
    common: {
      all: string
    }
    labels: {
      broker: string
      segment: string
      premium: string
      status: string
      inception: string
      riskScore: string
    }
    actions: {
      setOffer: string
      bind: string
      decline: string
    }
    messages: {
      offerPrepared: string
      boundAfterReview: string
      declinedInCommittee: string
    }
    state: {
      notFound: string
    }
    rating: {
      title: string
      subtitle: string
      revenue: string
      lossRatio: string
      fleetSize: string
      recalculate: string
      version: string
      techPremium: string
      indicatedRate: string
    }
    rules: {
      title: string
      subtitle: string
      outcome: {
        pass: string
        warn: string
        fail: string
      }
      severity: {
        low: string
        medium: string
        high: string
      }
      saveVersion: string
    }
    dashboard: {
      title: string
      subtitle: string
      needsReview: string
      needsReviewEmpty: string
    }
    cases: {
      title: string
      subtitle: string
      filterStatus: string
      filterProduct: string
      filterAllStatus: string
      filterAllProduct: string
      searchPlaceholder: string
      empty: string
      table: {
        caseNumber: string
        insured: string
        productLine: string
        status: string
        premium: string
      }
    }
    caseDetail: {
      title: string
      subtitle: string
      overview: string
      tabs: {
        overview: string
        documents: string
        timeline: string
        decision: string
      }
      decision: {
        label: string
        none: string
      }
    }
    documentsPage: {
      title: string
      subtitle: string
      filterStatus: string
      filterCase: string
      searchPlaceholder: string
      empty: string
      modalTitle: string
      modalClose: string
    }
    rulesPage: {
      title: string
      subtitle: string
      editorTitle: string
      editorSubtitle: string
    }
    ratingPage: {
      title: string
      subtitle: string
    }
    aiPage: {
      title: string
      subtitle: string
    }
    reporting: {
      title: string
      subtitle: string
      riskDistribution: string
      cycleTime: string
      decisions: string
      cycleBuckets: {
        lt7: string
        d7_14: string
        d15_30: string
        d30plus: string
      }
    }
    governance: {
      title: string
      subtitle: string
      export: string
      decisionTrace: string
      selectCase: string
      exportedTitle: string
      exportedMessage: string
    }
  }
  claimsfox: {
    nav: {
      title: string
      dashboard: string
      claims: string
      intake: string
      triage: string
      documents: string
      mailbox: string
      partners: string
      reporting: string
      tasks: string
      integrations: string
    }
    calendar: {
      title: string
      subtitle: string
      location: string
      participants: string
      description: string
      locationTbd: string
      participantsTbd: string
      descriptionTbd: string
      close: string
      openRelated: string
    }
    dashboard: {
      title: string
      subtitle: string
      kpi: {
        openClaims: string
        slaRisk: string
        fraudFlags: string
        queue: string
      }
      queueTitle: string
      queueSubtitle: string
      mailTitle: string
      mailSubtitle: string
      recentTitle: string
      recentSubtitle: string
    }
    claims: {
      title: string
      subtitle: string
    }
    filters: {
      status: string
      lob: string
      search: string
      searchPlaceholder: string
      all: string
    }
    status: {
      intake: string
      triage: string
      investigation: string
      settlement: string
      closed: string
      denied: string
    }
    severity: {
      low: string
      medium: string
      high: string
      critical: string
    }
    claimDetail: {
      title: string
      subtitle: string
      policy: string
      status: string
      overviewTitle: string
      lossDate: string
      severity: string
      reserve: string
      paid: string
      slaDue: string
      assigned: string
      notePlaceholder: string
      decisionHint: string
      assignmentsTitle: string
      assignmentsSubtitle: string
      tasksLabel: string
      partnerLabel: string
      assignPartner: string
      aiTitle: string
      aiSubtitle: string
      aiRecommendation: string
      aiSummary: string
      aiBullet1: string
      aiBullet2: string
      aiBullet3: string
      aiSources: string
      tabs: {
        overview: string
        documents: string
        timeline: string
        decision: string
      }
      actions: {
        settlement: string
        investigation: string
        deny: string
        addNote: string
      }
      events: {
        noteTitle: string
        noteMessage: string
        partnerAssignedTitle: string
        partnerAssignedMessage: string
        partnerRequestReason: string
      }
    }
    documents: {
      title: string
      subtitle: string
      helper: string
      linkTo: string
      upload: string
      view: string
      approve: string
      previewText: string
      open: string
      status: string
      statusLabels: {
        pending: string
        needsReview: string
        approved: string
      }
    }
    mailbox: {
      title: string
      subtitle: string
      inbox: string
      inboxSubtitle: string
      detail: string
      from: string
      date: string
      attachments: string
      link: string
      noSelection: string
    }
    partners: {
      title: string
      subtitle: string
      assignTo: string
      request: string
      updateStatus: string
      status: {
        active: string
        standby: string
        onHold: string
      }
    }
    triage: {
      title: string
      subtitle: string
      recommendation: string
      sources: string
      score: string
      needsApproval: string
      approve: string
    }
    intake: {
      title: string
      subtitle: string
      claimant: string
      policyRef: string
      lossDate: string
      lossLocation: string
      description: string
      attachmentsHint: string
      back: string
      next: string
      submit: string
    }
    deadlines: {
      title: string
      subtitle: string
      openClaim: string
      items: {
        inspection: string
        inspectionDetail: string
        reserve: string
        reserveDetail: string
        settlement: string
        settlementDetail: string
        broker: string
        brokerDetail: string
        fraud: string
        fraudDetail: string
      }
    }
    reporting: {
      title: string
      subtitle: string
      statusTitle: string
      severityTitle: string
      slaTitle: string
      tasksTitle: string
      slaOnTrack: string
      slaRisk: string
      auditTitle: string
      auditSubtitle: string
      fraudFlags: string
      auditHint: string
      auditExport: string
    }
    tasks: {
      title: string
      subtitle: string
      advance: string
      status: {
        open: string
        inProgress: string
        blocked: string
        done: string
      }
    }
    integrations: {
      title: string
      subtitle: string
      helper: string
      guidewire: string
      duckcreek: string
      email: string
      storage: string
      payments: string
    }
    common: {
      loading: string
    }
  }
  fleetfox: {
    nav: {
      title: string
      dashboard: string
      vehicles: string
      drivers: string
      routes: string
      vision: string
      maintenance: string
      insurance: string
      assistant: string
      reporting: string
      audit: string
    }
    calendar: {
      title: string
      empty: string
      date: string
      location: string
      linked: string
      close: string
      goTo: string
    }
    common: {
      all: string
      loading: string
    }
    dashboard: {
      title: string
      subtitle: string
      heroHint: string
      queueTitle: string
      queueSubtitle: string
      alertTitle: string
      alertSubtitle: string
      kpi: {
        safety: string
        risk: string
        maintenance: string
        claimsProbability: string
        alerts: string
        vehicles: string
      }
    }
    vehicles: {
      title: string
      subtitle: string
      search: string
      empty: string
      status: {
        active: string
        idle: string
        maintenance: string
      }
    }
    vehicleDetail: {
      title: string
      heroHint: string
      vin: string
      licensePlate: string
      weight: string
      mileage: string
      manufacturer: string
      model: string
      serviceStatus: string
      assignedDriver: string
      maintenanceRisk: string
      predictedServiceDate: string
      safety: string
      risk: string
      odometer: string
      nextService: string
      overviewTitle: string
      assignedDrivers: string
      powertrain: string
      tags: string
      activate: string
      toMaintenance: string
      addNote: string
      documentsTitle: string
      documentsSubtitle: string
      downloadTelematics: string
      downloadRisk: string
      openStaticDoc: string
      timelineTitle: string
      timelineEmpty: string
      aiTitle: string
      aiSubtitle: string
    }
    drivers: {
      title: string
      subtitle: string
      search: string
      empty: string
    }
    driverDetail: {
      title: string
      heroHint: string
      profileTitle: string
      address: string
      licenseValidUntil: string
      incidents: string
      currentVehicle: string
      scoresTitle: string
      safety: string
      risk: string
      eco: string
      distraction: string
      speeding: string
      assignedTitle: string
      documentsTitle: string
      downloadProfile: string
      addNote: string
      timelineTitle: string
      timelineEmpty: string
    }
    routes: {
      title: string
      subtitle: string
      search: string
      risk: string
      eta: string
      accept: string
    }
    vision: {
      title: string
      subtitle: string
      uploadTitle: string
      uploadSubtitle: string
      uploadHint: string
      overlay: string
      liveMap: string
      overlayHelp: string
      confidence: string
      eventsTitle: string
      eventsSubtitle: string
      vehicle: string
      severity: string
      approve: string
      override: string
    }
    maintenance: {
      title: string
      subtitle: string
      warningTitle: string
      warningBody: string
      cost: string
      due: string
      schedule: string
    }
    telematics: {
      title: string
      subtitle: string
      speed: string
      idle: string
      fuel: string
      harshBraking: string
      harshAcceleration: string
    }
    risk: {
      title: string
      subtitle: string
      score: string
      category: string
      recommendation: string
      premiumImpact: string
    }
    costs: {
      title: string
      subtitle: string
      total: string
      perVehicle: string
      perKm: string
      fuel: string
      maintenance: string
      insurance: string
    }
    insurance: {
      title: string
      subtitle: string
      listTitle: string
      detailTitle: string
      premium: string
      basePremium: string
      multiplier: string
      claimsProbability: string
      downloadReport: string
      addNote: string
      aiTitle: string
      aiSubtitle: string
    }
    assistant: {
      title: string
      subtitle: string
      actionsTitle: string
      findCritical: string
      reducePremium: string
      routeSummary: string
      resultTitle: string
      resultSubtitle: string
      empty: string
    }
    reporting: {
      title: string
      subtitle: string
      riskChartTitle: string
      statusChartTitle: string
      maintenanceTrend: string
      tableTitle: string
      table: {
        vehicle: string
        region: string
        risk: string
        safety: string
      }
      kpi: {
        safety: string
        risk: string
        maintenance: string
        claims: string
        co2: string
        fuel: string
      }
    }
    audit: {
      title: string
      subtitle: string
      searchTitle: string
      search: string
      empty: string
    }
  }
  partnerfox: {
    nav: {
      title: string
      dashboard: string
      network: string
      cases: string
      rental: string
      towing: string
      subrogation: string
      assistance: string
      reporting: string
      audit: string
    }
    calendar: {
      title: string
      empty: string
      date: string
      location: string
      linked: string
      close: string
      goTo: string
    }
    common: {
      all: string
      loading: string
    }
    dashboard: {
      title: string
      subtitle: string
      networkTitle: string
      casesTitle: string
      kpi: {
        partners: string
        casesOpen: string
        directBilling: string
        subrogation: string
        recoveryRate: string
      }
    }
    network: {
      title: string
      subtitle: string
      search: string
      empty: string
      type: {
        workshop: string
        rental: string
        towing: string
        glass: string
        assistance: string
      }
    }
    partnerDetail: {
      title: string
      subtitle: string
      contact: string
      rating: string
      avgRepairDays: string
      directBillingEnabled: string
      performance: string
      casesHandled: string
      timeline: string
      relatedCases: string
    }
    cases: {
      title: string
      subtitle: string
      search: string
      empty: string
      directBilling: string
      status: {
        FNOL: string
        InRepair: string
        WaitingParts: string
        RentalActive: string
        Closed: string
      }
    }
    caseDetail: {
      title: string
      subtitle: string
      damageSummary: string
      assignedWorkshop: string
      rentalPartner: string
      towingPartner: string
      estimatedCost: string
      repairDuration: string
      trackingLink: string
      documentsTitle: string
      timelineTitle: string
      downloadDocument: string
      timelineNoteTitle: string
      timelineNoteMessage: string
      doc: {
        caseLabel: string
        vehicleLabel: string
        damageSummaryLabel: string
        estimatedCostLabel: string
        repairDurationLabel: string
        aiApprovedLabel: string
        yes: string
        no: string
        footer: string
      }
    }
    rental: {
      title: string
      subtitle: string
      activeRentals: string
      days: string
      cost: string
      slaWarning: string
    }
    towing: {
      title: string
      subtitle: string
      responseTime: string
      active: string
    }
    subrogation: {
      title: string
      subtitle: string
      probability: string
      estimate: string
      projected: string
      status: {
        Open: string
        Negotiation: string
        Recovered: string
        Lost: string
      }
      stageRecommendation: {
        fastTrack: string
        standard: string
        manualReview: string
      }
    }
    assistance: {
      title: string
      subtitle: string
      hotline: string
      responseTime: string
      slaBreach: string
    }
    reporting: {
      title: string
      subtitle: string
      casesByStatus: string
      repairDistribution: string
      recoveryTrend: string
      kpi: {
        avgRepair: string
        directBilling: string
        rentalDays: string
        recoveryRate: string
        networkIndex: string
        costPerClaim: string
      }
    }
    audit: {
      title: string
      subtitle: string
      search: string
      empty: string
    }
    actions: {
      enableDirectBilling: string
      assignRental: string
      markCandidate: string
      saveNote: string
    }
    aiRepair: {
      title: string
      subtitle: string
      plausibility: string
      confidence: string
      recommendation: string
      anomalies: string
      evidence: string
      approve: string
      manualReview: string
    }
  }
  aifox: {
  brokerfox: {
    nav: {
      title: string
      dashboard: string
      clients: string
      contracts: string
      mailbox: string
      tenders: string
      offers: string
      renewals: string
      documents: string
      reporting: string
      integrations: string
      tasks: string
    }
    actions: {
      newClient: string
      newTender: string
      newMessage: string
      uploadDocument: string
      generateSummary: string
      approveAndSend: string
      save: string
      cancel: string
    }
    status: {
      draft: string
      sent: string
      offersReceived: string
      negotiation: string
      won: string
      lost: string
    }
    timeline: {
      title: string
      subtitle: string
      externalMessage: string
      internalNote: string
      statusUpdate: string
      attachment: string
      documentUploaded: string
      documentAssigned: string
      extractionSuggested: string
      extractionApplied: string
      signatureRequested: string
      signatureSigned: string
      commissionReminderSent: string
      integrationSync: string
      taskDelegated: string
      system: string
      searchPlaceholder: string
      messagePlaceholder: string
      composeTitle: string
      composeSubtitle: string
      empty: string
    }
    calendar: {
      title: string
      subtitle: string
      upcoming: string
      addEvent: string
      eventTitle: string
      empty: string
      location: string
      participants: string
      description: string
      locationTbd: string
      participantsTbd: string
      descriptionTbd: string
      openRelated: string
    }
    mailbox: {
      title: string
      subtitle: string
      inboxTitle: string
      detailTitle: string
      from: string
      to: string
      toValue: string
      date: string
      status: {
        unassigned: string
        assigned: string
        done: string
      }
      previewPlaceholder: string
      attachments: string
      assignTo: string
      assignAction: string
      convertTask: string
      markDone: string
      noSelection: string
      assignedTitle: string
      assignedMessage: string
      doneTitle: string
      doneMessage: string
      downloadedTitle: string
      downloadedMessage: string
      taskPrefix: string
      taskCreatedTitle: string
      taskCreatedMessage: string
    }
    reporting: {
      title: string
      subtitle: string
      filtersTitle: string
      range30: string
      range90: string
      range365: string
      allIndustries: string
      kpi: {
        clients: string
        openTenders: string
        offers: string
        renewals: string
        avgOffer: string
        mailboxBacklog: string
      }
      days: string
      timeSeriesTitle: string
      statusTitle: string
      premiumTitle: string
      tasksTitle: string
    }
    ai: {
      suggestionNotice: string
      inputs: string
      inputIndustry: string
      inputRevenue: string
      inputEmployees: string
      inputLocations: string
      inputClaims: string
      inputCoverages: string
      riskAnalysis: {
        title: string
        subtitle: string
      }
      riskBreakdown: string
      risk: {
        property: string
        liability: string
        cyber: string
        businessInterruption: string
        compliance: string
      }
      level: {
        low: string
        medium: string
        high: string
      }
      drivers: string
      missingInfo: string
      policySuggestion: {
        title: string
        coverages: string
        limits: string
        deductibles: string
        endorsements: string
      }
      copyToMessage: string
      createTask: string
      markReviewed: string
      draftTitle: string
      draftSubtitle: string
      draftTemplate: string
      approvalLabel: string
      sendDraft: string
      draftSentTitle: string
      taskCreatedTitle: string
      taskCreatedMessage: string
      reviewedTitle: string
      reviewedMessage: string
    }
    empty: {
      noClients: string
      noTenders: string
      noOffers: string
      noRenewals: string
      noDocuments: string
      noTasks: string
      noIntegrations: string
    }
    state: {
      loading: string
      error: string
      notFound: string
    }
    dashboard: {
      title: string
      subtitle: string
      kpi: {
        clients: string
        tenders: string
        offers: string
        renewals: string
        unread: string
        tasks: string
      }
      quickActions: string
      quickActionsSubtitle: string
      goToClients: string
      goToDocuments: string
    }
    clients: {
      title: string
      subtitle: string
      createTitle: string
      createSubtitle: string
      fieldName: string
      fieldSegment: string
      fieldIndustry: string
      listTitle: string
      listSubtitle: string
      searchPlaceholder: string
      clientUnknown: string
      segmentMissing: string
      industryMissing: string
      viewDetails: string
      back: string
      detailSubtitle: string
      detailSummary: string
      segmentLabel: string
      industryLabel: string
      contactsTitle: string
      noContacts: string
      contactRoleMissing: string
      programsTitle: string
      programsPlaceholder: string
      digitalFolderTitle: string
      digitalFolderSubtitle: string
      folder: {
        offer: string
        loss: string
        policy: string
        kyc: string
        other: string
      }
      folderEmpty: string
      newPlaceholder: string
    }
    tenders: {
      title: string
      subtitle: string
      createTitle: string
      createSubtitle: string
      fieldTitle: string
      fieldDescription: string
      listTitle: string
      listSubtitle: string
      clientMissing: string
      back: string
      detailSubtitle: string
      statusTitle: string
      statusLabel: string
      requirementsTitle: string
      requirementsEmpty: string
      limitLabel: string
      deductibleLabel: string
      none: string
      carriersTitle: string
      carriersEmpty: string
      noEmail: string
      wizardTitle: string
      wizardSubtitle: string
      wizard: {
        requirements: string
        risk: string
        timeline: string
        requirementsHint: string
        requirementsField: string
        riskHint: string
        riskField: string
        timelineHint: string
        timelineField: string
      }
      newPlaceholder: string
    }
    offers: {
      title: string
      subtitle: string
      listTitle: string
      listSubtitle: string
      compareAction: string
      compareLoggedTitle: string
      compareLoggedMessage: string
      aiSummaryTitle: string
      aiSummaryMessage: string
      linesCount: string
      compareTitle: string
      compareSubtitle: string
      aiCompareTitle: string
      aiHint: string
      approvalLabel: string
      compareEmpty: string
      noQuote: string
      clientUnknown: string
      noOfferSelected: string
      summarySentTitle: string
      summarySentMessage: string
    }
    renewals: {
      title: string
      subtitle: string
      bucket: string
      detailTitle: string
      detailSubtitle: string
      back: string
      policyLabel: string
      carrierLabel: string
      premiumLabel: string
      statusLabel: string
      dueDateLabel: string
      linksTitle: string
      clientLabel: string
      contractLabel: string
      contractMissing: string
      documentsTitle: string
      nextStepsTitle: string
      nextSteps: {
        updateLossRuns: string
        confirmExposure: string
        scheduleReview: string
      }
      status: {
        upcoming: string
        inReview: string
        quoted: string
        renewed: string
      }
      selectFirst: string
    }
    documents: {
      title: string
      subtitle: string
      uploadTitle: string
      uploadSubtitle: string
      dragDrop: string
      dragDropHint: string
      entityClient: string
      entityTender: string
      entityOffer: string
      entityRenewal: string
      entityContract: string
      listTitle: string
      listSubtitle: string
      inboxOnly: string
      unassigned: string
      assignAction: string
      download: string
      downloadGenerated: string
      downloaded: string
      downloadedMessage: string
      generated: string
      generatedMessage: string
    }
    demo: {
      title: string
      subtitle: string
      tenant: string
      reset: string
      seedAll: string
    }
    integrations: {
      title: string
      subtitle: string
      actionsTitle: string
      actionsSubtitle: string
      runAction: string
      preview: string
      apply: string
      biproAction: string
      biproHint: string
      gdvAction: string
      gdvHint: string
      portalAction: string
      portalHint: string
      listTitle: string
      listSubtitle: string
      connected: string
      notConnected: string
    }
    tasks: {
      title: string
      subtitle: string
      createTitle: string
      createSubtitle: string
      fieldTitle: string
      fieldDescription: string
      owner: string
      ownerMissing: string
      dueDate: string
      delegate: string
      delegateAction: string
      linkClient: string
      linkTender: string
      linkRenewal: string
      linkContract: string
      todo: string
      inProgress: string
      done: string
      noDescription: string
    }
    contracts: {
      title: string
      subtitle: string
      filtersTitle: string
      filterAllLob: string
      filterAllCarrier: string
      filterAllStatus: string
      listTitle: string
      listSubtitle: string
      empty: string
      heroBadge: string
      viewDetail: string
      back: string
      detailTitle: string
      summaryTitle: string
      clientLabel: string
      lobLabel: string
      carrierLabel: string
      premiumLabel: string
      statusLabel: string
      documentsTitle: string
      tasksTitle: string
      sectionTitle: string
      sectionSubtitle: string
      createAction: string
      status: {
        active: string
        pending: string
        cancelled: string
      }
    }
    commissions: {
      title: string
      chartTitle: string
      byCarrierTitle: string
      outstandingTitle: string
      sendReminder: string
      noneOutstanding: string
      outstanding: string
    }
    extraction: {
      title: string
      suggestionNotice: string
      suggestedClient: string
      suggestedContract: string
      confidence: string
      fieldsTitle: string
      approval: string
      apply: string
    }
    signature: {
      title: string
      statusLabel: string
      requestAction: string
      recipientName: string
      recipientEmail: string
      markSigned: string
      status: {
        DRAFT: string
        SENT: string
        SIGNED: string
      }
    }
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
      sections: {
        overview: string
        processes: string
        internal: string
        internalDocs: string
        governance: string
        presentations: string
        development: string
        projectLanding: string
      }
      internalDocs: {
        title: string
        subtitle: string
      }
      overviewGroups: {
        insurance: string
        fleet: string
        logistics: string
        broker: string
      }
      internalAuth: {
        title: string
        subtitle: string
        username: string
        pin: string
        submit: string
        error: string
      }
    cards: Record<string, { title: string; description: string; cta?: string }>
  }
  mvp: {
    title: string
    subtitle: string
    nextStep: string
    steps: Record<string, { title: string; description: string }>
  }
  profile: {
    title: string
    subtitle: string
    overview: {
      title: string
      subtitle: string
      edit: string
      open: string
      back: string
      reset: string
      summaryTitle: string
      summarySubtitle: string
      sections: {
        title: string
        onboarding: string
        personal: string
        company: string
        insurances: string
        fleet: string
        locations: string
      }
    }
    onboarding: {
      title: string
      subtitle: string
      cardTitle: string
      cardSubtitle: string
      start: string
      resume: string
      completed: string
      incomplete: string
      requiredHint: string
    }
    stepLabel: string
    saved: string
    passwordMismatch: string
    registration: {
      title: string
      emailHint: string
      consentHint: string
    }
    progress: {
      title: string
      caption: string
    }
    steps: {
      personal: {
        title: string
        subtitle: string
      }
      company: {
        title: string
        subtitle: string
      }
    }
    actions: {
      back: string
      next: string
      save: string
      finish: string
      later: string
      skip: string
    }
    fields: {
      email: string
      privacyConsent: string
      companyName: string
      legalForm: string
      street: string
      houseNumber: string
      addressAdditional: string
      zip: string
      city: string
      country: string
      vatId: string
      directorFirstName: string
      directorLastName: string
      salutation: string
      contactFirstName: string
      contactLastName: string
      phoneCountryCode: string
      phone: string
      language: string
      password: string
      passwordConfirm: string
      advisorCode: string
      kycBranch: string
      kycDirector: string
      kycBusiness: string
    }
    options: {
      yes: string
      no: string
      select: string
      language: {
        de: string
        en: string
      }
    }
    placeholders: {
      insurances: string
      fleet: string
      locations: string
    }
  }
  policyPurchase: {
    title: string
    subtitle: string
    placeholder: string
  }
  whitepaper: {
    kicker: string
    heroTitle: string
    heroSubtitle: string
    heroChip: string
    summaryTitle: string
    summarySubtitle: string
    summaryBody: string
    metrics: {
      ai: string
      sovereign: string
      scalable: string
    }
    useCases: {
      title: string
      subtitle: string
      risk: string
      claim: string
      fraud: string
      docs: string
      maintenance: string
      route: string
    }
    sections: {
      context: { title: string; body: string }
      native: { title: string; body: string }
      ecosystem: { title: string; body: string }
      useCases: { title: string; body: string }
      data: { title: string; body: string }
      governance: { title: string; body: string }
      investors: { title: string; body: string }
      conclusion: { title: string; body: string }
    }
    cta: {
      primary: string
      secondary: string
      title: string
      subtitle: string
    }
  }
  identification: {
    title: string
    subtitle: string
    progress: string
    steps: {
      start: string
      capture: string
      verification: string
      selfie: string
      summary: string
    }
    intro: {
      title: string
      body: string
    }
    document: {
      typeId: string
      typePassport: string
      typeOther: string
    }
    capture: {
      title: string
      subtitle: string
      front: string
      back: string
      placeholder: string
    }
    verify: {
      title: string
      subtitle: string
      issuing: string
      authenticity: string
      mrz: string
      failed: string
    }
    selfie: {
      title: string
      subtitle: string
      capture: string
      overlay: string
    }
    summary: {
      title: string
      subtitle: string
      status: string
      docType: string
      country: string
      audit: string
      ocr: string
      notice: string
    }
    status: {
      ok: string
      pending: string
      success: string
      failed: string
    }
    actions: {
      start: string
      back: string
      next: string
      verify: string
      restart: string
    }
    ocr: {
      title: string
      name: string
      number: string
      dob: string
      expiry: string
      nationality: string
    }
    camera: {
      capture: string
      take: string
      guide: string
      slot: string
      error: string
      title: {
        front: string
        back: string
        selfie: string
      }
    }
  }
  nativeAi: {
    kicker: string
    title: string
    subtitle: string
    heroChip: string
    deckTitle: string
    deckSubtitle: string
    slides: Record<number, { title: string; body: string }>
  }
  aiOnboarding: {
    kicker: string
    title: string
    subtitle: string
    heroChip: string
    summaryTitle: string
    summarySubtitle: string
    sections: {
      intent: { title: string; body: string }
      pipeline: { title: string; body: string }
      guardrails: { title: string; body: string }
      tools: { title: string; body: string }
      rollout: { title: string; body: string }
    }
    cta: {
      primary: string
      secondary: string
      title: string
      subtitle: string
    }
    architectureTitle: string
  }
  getQuote: {
    title: string
    subtitle: string
    progress: {
      title: string
      subtitle: string
      step: string
    }
    company: {
      title: string
      subtitle: string
      locationLabel: string
      locationPlaceholder: string
      location: {
        de: string
        eu: string
      }
    }
    vehicles: {
      title: string
      subtitle: string
      primary: string
      additional: string
      count: string
      weight: string
      regionLabel: string
      add: string
      region: {
        de: string
        eu: string
      }
    }
    deductible: {
      title: string
      subtitle: string
      amountLabel: string
      courier: string
      cold: string
    }
    preInsurer: {
      title: string
      subtitle: string
      exists: string
      name: string
      number: string
    }
    summary: {
      title: string
      subtitle: string
      netAnnual: string
      tax: string
      grossAnnual: string
      contract: string
    }
    confirm: {
      title: string
      subtitle: string
      privacy: string
      submit: string
    }
    yes: string
    no: string
  }
    featureTree: {
      title: string
      subtitle: string
      sections: {
        intake: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        partners: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        media: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        finance: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        repair: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        comms: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        analytics: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
        compliance: {
          title: string
          subtitle: string
          items: Record<string, string>
        }
      }
    }
  claimProcess: {
    title: string
    subtitle: string
    chatTitle: string
    chatSubtitle: string
    chatStatus: string
    intro: string
    timeStampMessage: string
    askTime: string
    timeNow: string
    timeOther: string
    timeOtherPlaceholder: string
    confirmTime: string
    askLocationChoice: string
    locationCurrent: string
    locationOther: string
    askLocation: string
    askAddressConfirm: string
    addressConfirmed: string
    confirmAddress: string
    askPhotos: string
    photosUploaded: string
    photosSkipped: string
    skipPhotos: string
    askPersonDetails: string
    confirmPersonDetails: string
    askDescription: string
    firstName: string
    lastName: string
    licensePlate: string
      locationButton: string
    locationPending: string
    locationPendingShort: string
    locationGranted: string
    locationDenied: string
    locationUnknown: string
    nextPrompt: string
    botAck: string
    claimNumberMessage: string
    inputPlaceholder: string
    send: string
    openManager: string
    back: string
    street: string
    houseNumber: string
    postalCode: string
    city: string
      upload: string
      uploadEmpty: string
      uploadCount: string
      valuePending: string
    infoTitle: string
    infoSubtitle: string
    infoLocation: string
    infoDate: string
    infoTime: string
    infoClaimNumber: string
    infoPhotos: string
    infoDescription: string
    infoIncidentTime: string
    infoFirstName: string
    infoLastName: string
    infoLicensePlate: string
      infoStatus: string
      statusOpen: string
      demoHint: string
    }
  marketing: {
    title: string
    subtitle: string
    login: string
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
  logisticsLanding: {
    badge: string
    title: string
    subtitle: string
    login: string
    kpi: Record<string, string>
    kpiValues: Record<string, string>
    cards: Record<string, { title: string; body: string }>
    preview: {
      title: string
      eta: string
      temp: string
      customs: string
      footer: string
    }
    previewValues: {
      eta: string
      temp: string
      customs: string
    }
  }
  logisticsApp: {
    title: string
    subtitle: string
    sections: {
      overview: string
      shipments: string
      coverage: string
      incidents: string
      thirdParty: string
      documents: string
    }
    kpi: {
      activeShipments: string
      delayed: string
      incidents: string
      coverageOk: string
      highRisk: string
      avgEtaDeviation: string
    }
    filters: {
      search: string
      statusLabel: string
      statusAll: string
      statusInTransit: string
      statusDelayed: string
      statusDelivered: string
      statusIncident: string
    }
    table: {
      shipments: {
        title: string
        col: {
          shipment: string
          customer: string
          route: string
          status: string
          eta: string
          coverage: string
          cargo: string
          value: string
          thirdParty: string
          aiHint: string
        }
        empty: string
      }
      statusLabels: {
        inTransit: string
        delayed: string
        delivered: string
        incident: string
      }
      coverageLabels: {
        covered: string
        partial: string
        notCovered: string
      }
    }
    shipmentsCopy: {
      cargo: Record<string, string>
      notes: Record<string, string>
      eta: Record<string, string>
    }
    coverage: {
      title: string
      policyId: string
      limit: string
      deductible: string
      validity: string
      status: string
      covered: string
      partial: string
      notCovered: string
      statusLabels: {
        active: string
        selective: string
        inactive: string
      }
    }
    coverageCards: Record<string, { title: string }>
    incidents: {
      title: string
      subtitle: string
      openIncident: string
      labels: {
        status: string
        cost: string
        documents: string
      }
      statusLabels: {
        open: string
        review: string
        closed: string
      }
      riskLabels: {
        low: string
        medium: string
        high: string
      }
      types: Record<string, string>
    }
    documents: {
      title: string
      upload: string
      download: string
    }
    thirdParty: Record<string, string>
  }
  partnerManagement: {
    title: string
    subtitle: string
    overview: {
      title: string
      subtitle: string
      items: Record<string, { title: string; description: string }>
    }
    actions: {
      addPartner: string
    }
    partnerTypes: {
      workshop: string
      surveyor: string
      towing: string
    }
    selection: {
      title: string
      subtitle: string
      response: string
    }
    claimMedia: {
      title: string
      subtitle: string
      status: {
        review: string
        approved: string
        missing: string
      }
    }
    estimates: {
      title: string
      subtitle: string
      cta: string
    }
    invoices: {
      title: string
      subtitle: string
      cta: string
    }
    repair: {
      title: string
      subtitle: string
      eta: string
      steps: {
        intake: string
        diagnostics: string
        parts: string
        repair: string
        handover: string
      }
    }
    chat: {
      title: string
      subtitle: string
      placeholder: string
      send: string
    }
    questions: {
      title: string
      subtitle: string
      cta: string
    }
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
    emailLabel: string
    emailPlaceholder: string
    emailError: string
    privacyText: string
    privacyLinkText: string
    privacyLink: string
    privacyError: string
    submit: string
    nextStep: string
    success: string
    alreadyRegistered: string
    login: string
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
    voiceActiveLabel: string
    voiceActiveBadge: string
    voiceStartListening: string
    voiceStopListening: string
    voiceNoRecognition: string
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
    messageSource: {
      voice: string
      text: string
      quick: string
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
    trust: {
      crm: string
      tender: string
      ai: string
    }
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
    sectorsBanner: string
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
    header: {
      login: 'Login',
      logout: 'Logout',
      nav: {
        insurance: 'Insurfox',
        broker: 'Makler',
        claimsfox: 'Claimsfox',
        aiFox: 'AI Fox',
        partnerfox: 'Partnerfox',
        fleetfox: 'Fleetfox'
      }
    },
    brokerfox: {
      nav: {
        title: 'Brokerfox',
        dashboard: 'Dashboard',
        clients: 'Kunden',
        contracts: 'Verträge',
        mailbox: 'Mailbox',
        tenders: 'Ausschreibungen',
        offers: 'Angebote',
        renewals: 'Prolongierungen',
        documents: 'Dokumente',
        reporting: 'Reporting',
        integrations: 'Integrationen',
        tasks: 'Aufgaben'
      },
      actions: {
        newClient: 'Neuer Kunde',
        newTender: 'Neue Ausschreibung',
        newMessage: 'Neue Nachricht',
        uploadDocument: 'Dokument hochladen',
        generateSummary: 'Zusammenfassung erzeugen',
        approveAndSend: 'Freigeben & senden',
        save: 'Speichern',
        cancel: 'Abbrechen'
      },
      status: {
        draft: 'Entwurf',
        sent: 'Gesendet',
        offersReceived: 'Angebote erhalten',
        negotiation: 'Verhandlung',
        won: 'Gewonnen',
        lost: 'Verloren'
      },
      timeline: {
        title: '360° Kommunikation',
        subtitle: 'Nachrichten, interne Notizen und Statusupdates in einer Linie.',
        externalMessage: 'Externe Nachricht',
        internalNote: 'Interne Notiz',
        statusUpdate: 'Statusupdate',
        attachment: 'Anhang',
        documentUploaded: 'Dokument hochgeladen',
        documentAssigned: 'Dokument zugeordnet',
        extractionSuggested: 'Extraktion vorgeschlagen',
        extractionApplied: 'Extraktion angewendet',
        signatureRequested: 'Signatur angefordert',
        signatureSigned: 'Signatur abgeschlossen',
        commissionReminderSent: 'Provision erinnert',
        integrationSync: 'Integration synchronisiert',
        taskDelegated: 'Aufgabe delegiert',
        searchPlaceholder: 'Timeline durchsuchen',
        messagePlaceholder: 'Nachricht oder Notiz erfassen …',
        composeTitle: 'Neue Timeline-Aktion',
        composeSubtitle: 'AI-Vorschläge sind assistierend und müssen freigegeben werden.',
        empty: 'Noch keine Timeline-Einträge.'
      },
      calendar: {
        title: 'Kalender',
        subtitle: 'Termine & Fristen im Blick.',
        upcoming: 'Anstehend',
        addEvent: 'Termin hinzufügen',
        eventTitle: 'Titel',
        empty: 'Keine Termine gefunden.',
        location: 'Ort:',
        participants: 'Teilnehmende:',
        description: 'Beschreibung:',
        locationTbd: 'Noch offen',
        participantsTbd: 'Noch offen',
        descriptionTbd: 'Noch offen',
        openRelated: 'Zugehöriges Element öffnen'
      },
      mailbox: {
        title: 'Mailbox',
        subtitle: 'Eingehende Nachrichten & Dokumente.',
        inboxTitle: 'Eingang',
        detailTitle: 'Detailansicht',
        from: 'Von',
        to: 'An',
        toValue: 'Brokerfox Team',
        date: 'Datum',
        status: {
          unassigned: 'Nicht zugeordnet',
          assigned: 'Zugeordnet',
          done: 'Erledigt'
        },
        previewPlaceholder: 'Wähle eine Nachricht, um Details zu sehen.',
        attachments: 'Anhänge',
        assignTo: 'Zuordnen zu',
        assignAction: 'Zuordnen',
        convertTask: 'Als Aufgabe anlegen',
        markDone: 'Erledigt markieren',
        noSelection: 'Keine Nachricht ausgewählt.',
        assignedTitle: 'Mailbox zugeordnet',
        assignedMessage: 'wurde zugeordnet.',
        doneTitle: 'Mailbox erledigt',
        doneMessage: 'Mailbox-Eintrag als erledigt markiert.',
        downloadedTitle: 'Anhang heruntergeladen',
        downloadedMessage: 'Anhang wurde heruntergeladen.',
        taskPrefix: 'Mailbox',
        taskCreatedTitle: 'Aufgabe erstellt',
        taskCreatedMessage: 'Mailbox-Eintrag in Aufgabe umgewandelt.'
      },
      reporting: {
        title: 'Reporting',
        subtitle: 'KPI-Übersicht und Trends.',
        filtersTitle: 'Filter',
        range30: 'Letzte 30 Tage',
        range90: 'Letzte 90 Tage',
        range365: 'Letztes Jahr',
        allIndustries: 'Alle Branchen',
        kpi: {
          clients: 'Aktive Kunden',
          openTenders: 'Offene Ausschreibungen',
          offers: 'Angebote erhalten',
          renewals: 'Prolongierungen',
          avgOffer: 'Ø Tage bis Angebote',
          mailboxBacklog: 'Mailbox Backlog'
        },
        days: 'Tage',
        timeSeriesTitle: 'Zeitverlauf',
        statusTitle: 'Statusverteilung',
        premiumTitle: 'Prämie nach Sparte',
        tasksTitle: 'Aufgaben nach Status'
      },
      ai: {
        suggestionNotice: 'Vorschlag — benötigt menschliche Freigabe.',
        inputs: 'Eingaben',
        inputIndustry: 'Branche',
        inputRevenue: 'Umsatz',
        inputEmployees: 'Mitarbeitende',
        inputLocations: 'Standorte',
        inputClaims: 'Schadenverlauf',
        inputCoverages: 'Deckungen',
        riskAnalysis: {
          title: 'Risikoanalyse',
          subtitle: 'Erklärbare Bewertung & Empfehlungen.'
        },
        riskBreakdown: 'Risikoprofil',
        risk: {
          property: 'Sach',
          liability: 'Haftpflicht',
          cyber: 'Cyber',
          businessInterruption: 'Betriebsunterbrechung',
          compliance: 'Compliance'
        },
        level: {
          low: 'Niedrig',
          medium: 'Mittel',
          high: 'Hoch'
        },
        drivers: 'Treiber',
        missingInfo: 'Fehlende Informationen',
        policySuggestion: {
          title: 'Policy-Empfehlung (Vorschlag)',
          coverages: 'Empfohlene Deckungen',
          limits: 'Limits',
          deductibles: 'Selbstbehalte',
          endorsements: 'Empfohlene Endorsements'
        },
        copyToMessage: 'In Nachricht übernehmen',
        createTask: 'Aufgabe erstellen',
        markReviewed: 'Als geprüft markieren',
        draftTitle: 'Entwurf Nachricht',
        draftSubtitle: 'Bitte prüfen und manuell freigeben.',
        draftTemplate: 'Vorschlag für {{client}}: Wir empfehlen die beigefügten Deckungen und Limits basierend auf der Risikoanalyse.',
        approvalLabel: 'Ich habe geprüft und freigegeben.',
        sendDraft: 'Entwurf senden',
        draftSentTitle: 'Entwurf gesendet',
        taskCreatedTitle: 'Aufgabe angelegt',
        taskCreatedMessage: 'AI-Empfehlung als Aufgabe erfasst.',
        reviewedTitle: 'AI geprüft',
        reviewedMessage: 'AI-Empfehlung wurde geprüft.'
      },
      empty: {
        noClients: 'Noch keine Kunden vorhanden.',
        noTenders: 'Noch keine Ausschreibungen vorhanden.',
        noOffers: 'Noch keine Angebote vorhanden.',
        noRenewals: 'Noch keine Prolongierungen vorhanden.',
        noDocuments: 'Noch keine Dokumente vorhanden.',
        noTasks: 'Noch keine Aufgaben vorhanden.',
        noIntegrations: 'Noch keine Integrationen vorhanden.'
      },
      state: {
        loading: 'Lade …',
        error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
        notFound: 'Eintrag wurde nicht gefunden.'
      },
      dashboard: {
        title: 'Brokerfox Workspace',
        subtitle: 'Makler-Suite mit CRM, Ausschreibungen, Angeboten und 360° Kommunikation.',
        kpi: {
          clients: 'Kunden',
          tenders: 'Offene Ausschreibungen',
          offers: 'Angebote',
          renewals: 'Prolongierungen (30T)',
          unread: 'Ungelesene Nachrichten',
          tasks: 'Offene Aufgaben'
        },
        quickActions: 'Schnellaktionen',
        quickActionsSubtitle: 'Erzeuge neue Datensätze oder starte eine Kommunikation.',
        goToClients: 'Zum Kundenbereich',
        goToDocuments: 'Zum Dokumentenbereich'
      },
      clients: {
        title: 'Kunden & CRM',
        subtitle: 'Kundenübersicht, Kontakte und Programme.',
        createTitle: 'Kunde anlegen',
        createSubtitle: 'Minimaler CRM-Start mit Validierung.',
        fieldName: 'Kundenname',
        fieldSegment: 'Segment',
        fieldIndustry: 'Branche',
        listTitle: 'Kundenliste',
        listSubtitle: 'Durchsuche alle aktiven Mandate.',
        searchPlaceholder: 'Kunden suchen …',
        clientUnknown: 'Kunde unbekannt',
        segmentMissing: 'Segment fehlt',
        industryMissing: 'Branche fehlt',
        viewDetails: 'Details öffnen',
        back: 'Zurück zur Liste',
        detailSubtitle: 'CRM-Details mit 360° Kommunikation.',
        detailSummary: 'Kurzprofil',
        segmentLabel: 'Segment',
        industryLabel: 'Branche',
        contactsTitle: 'Ansprechpartner',
        noContacts: 'Keine Kontakte hinterlegt.',
        contactRoleMissing: 'Rolle offen',
        programsTitle: 'Programme & Policen',
        programsPlaceholder: 'Platzhalter für Programme, Policen und Verträge.',
        digitalFolderTitle: 'Digitale Kundenakte',
        digitalFolderSubtitle: 'Dokumente nach Typ gruppiert.',
        folder: {
          offer: 'Angebote',
          loss: 'Schadenhistorie',
          policy: 'Policen',
          kyc: 'KYC',
          other: 'Sonstiges'
        },
        folderEmpty: 'Keine Dokumente in dieser Kategorie.',
        newPlaceholder: 'z.B. Nordlicht Logistics'
      },
      tenders: {
        title: 'Ausschreibungen',
        subtitle: 'Status, Anforderungen und Carrier-Steuerung.',
        createTitle: 'Ausschreibung erstellen',
        createSubtitle: 'Zuordnung zu einem Kunden erforderlich.',
        fieldTitle: 'Ausschreibungstitel',
        fieldDescription: 'Kurzbeschreibung',
        listTitle: 'Ausschreibungen',
        listSubtitle: 'Aktive Ausschreibungen nach Status.',
        clientMissing: 'Kunde unbekannt',
        back: 'Zurück zu Ausschreibungen',
        detailSubtitle: 'Anforderungen, Carrier und Intake-Wizard.',
        statusTitle: 'Status',
        statusLabel: 'Aktueller Status',
        requirementsTitle: 'Anforderungen & Deckungen',
        requirementsEmpty: 'Keine Anforderungen hinterlegt.',
        limitLabel: 'Limit',
        deductibleLabel: 'Selbstbehalt',
        none: 'Keine Angabe',
        carriersTitle: 'Eingeladene Carrier',
        carriersEmpty: 'Noch keine Carrier eingeladen.',
        noEmail: 'Keine Kontaktadresse',
        wizardTitle: 'Intake Wizard',
        wizardSubtitle: 'Strukturierte Risikoaufnahme (Prototyp).',
        wizard: {
          requirements: 'Anforderungen',
          risk: 'Risiko',
          timeline: 'Timeline',
          requirementsHint: 'Welche Deckungen sind Pflicht?',
          requirementsField: 'Pflichtdeckung eingeben',
          riskHint: 'Wichtigste Risikotreiber notieren.',
          riskField: 'Risiko-Notiz erfassen',
          timelineHint: 'Welche Fristen sind kritisch?',
          timelineField: 'Frist hinzufügen'
        },
        newPlaceholder: 'z.B. Fleet Programm 2026'
      },
      offers: {
        title: 'Angebote',
        subtitle: 'Vergleich, Zusammenfassung und Freigabe.',
        listTitle: 'Angebote pro Ausschreibung',
        listSubtitle: 'Wähle eine Ausschreibung zur Gegenüberstellung.',
        compareAction: 'Vergleich starten',
        compareLoggedTitle: 'Vergleich protokolliert',
        compareLoggedMessage: 'Ein Angebotsvergleich wurde gestartet.',
        aiSummaryTitle: 'AI Zusammenfassung (Vorschlag)',
        aiSummaryMessage: 'AI hat eine Zusammenfassung als Vorschlag erzeugt.',
        linesCount: '{{count}} Leistungsbausteine',
        compareTitle: 'Angebotsvergleich',
        compareSubtitle: 'Nur Unterschiede werden hervorgehoben.',
        aiCompareTitle: 'AI Vergleich (Vorschlag)',
        aiHint: 'AI liefert nur Vorschläge. Entscheidung erfolgt manuell.',
        approvalLabel: 'Ich habe die Zusammenfassung geprüft und freigegeben.',
        compareEmpty: 'Noch kein Vergleich gestartet.',
        noQuote: 'Keine Quote',
        clientUnknown: 'Kunde unbekannt',
        noOfferSelected: 'Kein Angebot ausgewählt.',
        summarySentTitle: 'Zusammenfassung gesendet',
        summarySentMessage: 'Die Angebotszusammenfassung wurde an den Kunden gesendet.'
      },
      renewals: {
        title: 'Prolongierungen',
        subtitle: 'Pipeline nach Fälligkeit.',
        bucket: 'Fällig in {{days}} Tagen',
        detailTitle: 'Prolongierungsdetails',
        detailSubtitle: 'Status und Kommunikation.',
        back: 'Zurück zur Übersicht',
        policyLabel: 'Police',
        carrierLabel: 'Carrier',
        premiumLabel: 'Prämie',
        statusLabel: 'Status',
        dueDateLabel: 'Fällig am',
        linksTitle: 'Verknüpfungen',
        clientLabel: 'Kunde',
        contractLabel: 'Vertrag',
        contractMissing: 'Kein Vertrag verknüpft',
        documentsTitle: 'Dokumente',
        nextStepsTitle: 'Nächste Schritte',
        nextSteps: {
          updateLossRuns: 'Aktuelle Schadenstatistik einholen',
          confirmExposure: 'Exposures und Standorte bestätigen',
          scheduleReview: 'Review-Termin mit Kunde einplanen'
        },
        status: {
          upcoming: 'Anstehend',
          inReview: 'In Prüfung',
          quoted: 'Angeboten',
          renewed: 'Erneuert'
        },
        selectFirst: 'Prolongierung auswählen'
      },
      documents: {
        title: 'Dokumente & Inbox',
        subtitle: 'Dokumente hochladen, zuordnen und verfolgen.',
        uploadTitle: 'Dokument hochladen',
        uploadSubtitle: 'Speichere Metadaten in der Inbox.',
        dragDrop: 'Dateien hierher ziehen',
        dragDropHint: 'Drag & Drop oder Dateiauswahl nutzen.',
        entityClient: 'Kunde',
        entityTender: 'Ausschreibung',
        entityOffer: 'Angebot',
        entityRenewal: 'Prolongierung',
        entityContract: 'Vertrag',
        listTitle: 'Dokumentenliste',
        listSubtitle: 'Inbox und zugeordnete Dokumente.',
        inboxOnly: 'Nur Inbox (nicht zugeordnet)',
        unassigned: 'Nicht zugeordnet',
        assignAction: 'Zuordnen',
        download: 'Download',
        downloadGenerated: 'Download (generiert)',
        downloaded: 'Download protokolliert',
        downloadedMessage: 'heruntergeladen',
        generated: 'Dokument generiert',
        generatedMessage: 'generiert'
      },
      contracts: {
        title: 'Verträge',
        subtitle: 'Bestands- und Vertragsübersicht.',
        filtersTitle: 'Filter',
        filterAllLob: 'Alle Sparten',
        filterAllCarrier: 'Alle Carrier',
        filterAllStatus: 'Alle Status',
        listTitle: 'Vertragsliste',
        listSubtitle: 'Verträge je Mandant.',
        empty: 'Keine Verträge gefunden.',
        heroBadge: 'Hero Contract',
        viewDetail: 'Details',
        back: 'Zurück zu Verträgen',
        detailTitle: 'Vertragsdetail',
        summaryTitle: 'Vertragsdaten',
        clientLabel: 'Kunde',
        lobLabel: 'Sparte',
        carrierLabel: 'Carrier',
        premiumLabel: 'Prämie',
        statusLabel: 'Status',
        documentsTitle: 'Vertragsdokumente',
        tasksTitle: 'Vertragsaufgaben',
        sectionTitle: 'Verträge',
        sectionSubtitle: 'Verträge des Kunden',
        createAction: 'Vertrag erstellen',
        status: {
          active: 'Aktiv',
          pending: 'Ausstehend',
          cancelled: 'Gekündigt'
        }
      },
      commissions: {
        title: 'Provisionen',
        chartTitle: 'Provisionen (Erwartet vs. Bezahlt)',
        byCarrierTitle: 'Offen nach Carrier',
        outstandingTitle: 'Offene Provisionen',
        sendReminder: 'Reminder senden',
        noneOutstanding: 'Keine offenen Provisionen.',
        outstanding: 'Offen'
      },
      extraction: {
        title: 'Extrahierte Daten',
        suggestionNotice: 'Vorschlag — bitte prüfen.',
        suggestedClient: 'Vorgeschlagener Kunde',
        suggestedContract: 'Vorgeschlagener Vertrag',
        confidence: 'Trefferquote',
        fieldsTitle: 'Extrahierte Felder',
        approval: 'Ich habe geprüft und bestätige die Übernahme.',
        apply: 'Extraktion anwenden'
      },
      signature: {
        title: 'E-Signatur',
        statusLabel: 'Status',
        requestAction: 'Signatur anfordern',
        recipientName: 'Empfängername',
        recipientEmail: 'Empfänger E-Mail',
        markSigned: 'Als signiert markieren',
        status: {
          DRAFT: 'Entwurf',
          SENT: 'Gesendet',
          SIGNED: 'Signiert'
        }
      },
      demo: {
        title: 'Demo Utilities',
        subtitle: 'Tenant wechseln oder Demo-Daten neu erzeugen.',
        tenant: 'Tenant',
        reset: 'Demo-Daten zurücksetzen',
        seedAll: 'Alle Demo-Tenants befüllen'
      },
      integrations: {
        title: 'Integrationen',
        subtitle: 'Registry für externe Systeme.',
        actionsTitle: 'Integrationsaktionen',
        actionsSubtitle: 'Simulation von BiPRO, GDV und Portal-Fetch.',
        runAction: 'Ausführen',
        preview: 'Vorschau',
        apply: 'Übernehmen',
        biproAction: 'BiPRO Sync',
        biproHint: 'Synchronisiert Vertragsdaten aus Carrier-Systemen.',
        gdvAction: 'GDV Import',
        gdvHint: 'CSV-Import simulieren und Vertragsdaten prüfen.',
        portalAction: 'Carrier Portal Fetch',
        portalHint: 'Erzeugt neue Mailbox-Einträge mit Angeboten.',
        listTitle: 'Integrationen',
        listSubtitle: 'Status je Schnittstelle verwalten.',
        connected: 'Verbunden',
        notConnected: 'Nicht verbunden'
      },
      tasks: {
        title: 'Aufgaben & Workflows',
        subtitle: 'Leichtgewichtiges Board für Arbeitsschritte.',
        createTitle: 'Aufgabe erstellen',
        createSubtitle: 'Mit optionaler Verknüpfung.',
        fieldTitle: 'Titel',
        fieldDescription: 'Beschreibung',
        owner: 'Verantwortlich',
        ownerMissing: 'Kein Verantwortlicher',
        dueDate: 'Fällig am',
        delegate: 'Delegieren an',
        delegateAction: 'Delegieren',
        linkClient: 'Kunde verknüpfen',
        linkTender: 'Ausschreibung verknüpfen',
        linkRenewal: 'Prolongierung verknüpfen',
        linkContract: 'Vertrag verknüpfen',
        todo: 'To Do',
        inProgress: 'In Bearbeitung',
        done: 'Erledigt',
        noDescription: 'Keine Beschreibung'
      }
    },
    roles: {
      title: 'Insurfox AI IaaS',
      subtitle: 'AI-native Insurance-IaaS-Plattform zur Abbildung zentraler Versicherungsprozesse',
      logout: 'Logout',
      view: 'Ansehen',
      startJourney: 'Starten',
      registrationCardTitle: 'Registrierung',
      registrationCardSubtitle: 'Starte die neue, KI-gestützte Journey und melde Partner oder Kund:innen komfortabel an.',
      brokerPortal: 'Makler CRM',
      sections: {
        overview: 'Rollenübersicht',
        processes: 'Prozesse',
        internal: 'Interne Dokumentation',
        internalDocs: 'Interne Dokumentationen',
        governance: 'Governance',
        presentations: 'Präsentationen',
        development: 'Development',
        projectLanding: 'Projekt Landing Page'
      },
      internalDocs: {
        title: 'Interne Dokumentationen',
        subtitle: 'Übersicht der internen Inhalte und Ressourcen.'
      },
      overviewGroups: {
        insurance: 'Versicherung',
        fleet: 'Flotte',
        logistics: 'Spedition / Logistik',
        broker: 'Makler'
      },
      internalAuth: {
        title: 'Interne Dokumentation',
        subtitle: 'Bitte Zugangsdaten eingeben, um fortzufahren.',
        username: 'Benutzername',
        pin: 'PIN',
        submit: 'Freigeben',
        error: 'Zugangsdaten prüfen.'
      },
      cards: {
        mvp: {
          title: 'MVP Übersicht',
          description: 'Schneller Einstieg in alle Prozessschritte des MVP.'
        },
        claims: {
          title: 'Schadenmanager',
          description: 'Sachbearbeiter-Cockpit für schnelle Entscheidungen, Freigaben, Partnersteuerung und AI-Hinweise.',
          cta: 'Öffnen'
        },
        underwriter: {
          title: 'Underwriter',
          description: 'Portfolio-Steuerung, Underwriting-Korridore und klare Referral-Logik im Carrier-Framework.'
        },
        legal: {
          title: 'Legal',
          description: 'Binder-Wordings, Delegated-Authority-Umfang und Compliance-Kontrollen nach Carrier-Standards.'
        },
        finance: {
          title: 'Finance',
          description: 'Kapital-Effizienz, KPI-Transparenz und disziplinierte Portfolio-Ökonomie.'
        },
        claimProcess: {
          title: 'Schadenmeldung',
          description: 'Demo-Chatbot mit Standortabfrage, automatischem Zeitstempel und strukturierter Erfassung.',
          cta: 'Starten'
        },
        onboarding: {
          title: 'Onboarding',
          description: 'Aktueller Onboarding-Prozess mit Wizard und Fortschrittsanzeige.'
        },
        registration: {
          title: 'Registrierung',
          description: 'Erfassung der E-Mail-Adresse als Startpunkt des Prozesses.'
        },
        profile: {
          title: 'User Profilseite',
          description: 'Übersicht und Pflege der erfassten Nutzer- und Firmendaten.'
        },
        identification: {
          title: 'User Identifikation',
          description: 'Verifizierung von Ausweisdokument und Selfie-Abgleich.'
        },
        regulatoryGovernance: {
          title: 'Regulatory & AI Governance Framework',
          description: 'Regulatorische Präsentation für Aufsicht, Audits und Governance.'
        },
        auditAppendix: {
          title: 'Audit Appendix',
          description: 'Prüfungsnahe Referenz mit Rollen, Kontrollen und Governance-Nachweisen.'
        },
        strategicDeepDive: {
          title: 'Strategic Technology & AI Governance Deep Dive',
          description: 'Strategischer Deep Dive zur Technologie- und Governance-Architektur.'
        },
        insurfoxWhitepaper: {
          title: 'Insurfox Whitepaper',
          description: 'AI-getriebene Versicherungsplattform für Logistik, Transport & Mobility.'
        },
        businessModelAntares: {
          title: 'Business Modell Antares',
          description: 'Insurfox x Antares: Rollen, Wertschöpfung und Revenue-Logik im Co-Branding-Modell.'
        },
        businessModelAntaresTest: {
          title: 'Business Modell Antares (Test)',
          description: 'Testseite für den PDF-Export des Business Modell Antares.'
        },
        marketOverviewLogistics: {
          title: 'Market Overview Logistics',
          description: 'Investor- und Carrier-grade Marktübersicht für Flotte, Logistik und Fracht.'
        },
        requirementsCatalog: {
          title: 'Anforderungskatalog',
          description: 'Short Version für die Zusammenarbeit mit Versicherungen auf der Insurfox AI IaaS Plattform.'
        },
        questionsQic: {
          title: 'Fragen QIC',
          description: 'Questionnaire für die Zusammenarbeit mit Insurfox AI IaaS.'
        },
        setup: {
          title: 'Setup',
          description: 'Zielarchitektur, Plattform-Schichten und Integrationsprinzipien der Insurfox IaaS.'
        },
        landingSitemap: {
          title: 'Sitemap',
          description: 'Sitemap und Navigationsstruktur der Insurfox Landing Page.'
        },
        landingTools: {
          title: 'Toolsliste',
          description: 'Technologie- und Tool-Übersicht der Landing Page.'
        },
        partner: {
          title: 'Partner Networks',
          description: 'Pflege Kontakte zu Gutachtern, Werkstätten und Dienstleistern.'
        },
        brokerPortal: {
          title: 'Broker CRM',
          description: 'CRM- und Backoffice-Workspace für Maklerportfolios und Kundenbeziehungen.'
        },
        featureTree: {
          title: 'Feature Tree',
          description: 'Funktionsübersicht für Claims, Partnernetzwerke und Workflows.',
          cta: 'Öffnen'
        },
        getQuote: {
          title: 'Angebot anfragen',
          description: 'Mehrstufige Anfrage für Frachtführerhaftung und Fahrzeugdaten.',
          cta: 'Öffnen'
        },
        policyPurchase: {
          title: 'Police kaufen',
          description: 'Abschlussstrecke für Policen und Zahlungsinformationen.'
        },
        whitepaper: {
          title: 'KI Whitepaper',
          description: 'Native KI-Systeme auf souveräner IaaS für Versicherer, Logistiker & Investoren.'
        },
        intern: {
          title: 'Intern',
          description: 'Passwortgeschützte Playbooks, Standards und technische Leitlinien.'
        },
        aiOnboarding: {
          title: 'KI Onboarding',
          description: 'Entwickler-Perspektive für KI im Onboarding-Prozess.'
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
        },
        logistics: {
          title: 'Spedition / Logistik',
          description: 'Transporte, Routen, Versicherungen und Schäden zentral steuern – mit Echtzeit-Status und KI-Alerts.',
          cta: 'Ansehen'
        },
        brokerAdmin: {
          title: 'Broker Administration',
          description: 'Verwaltungsdashboard für Makler mit Bestands-, Team- und Compliance-Übersicht.'
        }
      }
    },
    mvp: {
      title: 'MVP Übersicht',
      subtitle: 'Alle Prozessschritte im Überblick – klicke dich durch die MVP-Strecke.',
      nextStep: 'Nächster Schritt',
      steps: {
        registration: {
          title: 'Registrierung',
          description: 'Erfasse die E-Mail-Adresse und starte den Onboarding-Prozess.'
        },
        onboarding: {
          title: 'Onboarding',
          description: 'Wizard zur Erfassung persönlicher und Unternehmensdaten.'
        },
        getQuote: {
          title: 'Angebot anfragen',
          description: 'Mehrstufige Anfrage für Versicherungs- und Fahrzeugdaten.'
        },
        policyPurchase: {
          title: 'Police kaufen',
          description: 'Verbindlicher Abschluss und Zahlungsdetails für die Police.'
        },
        authentication: {
          title: 'User Authentication',
          description: 'Login, Zugriff und Rollenprüfung für die MVP-Strecke.'
        },
        claimProcess: {
          title: 'Schadenmeldung',
          description: 'Chatbasierte Erfassung mit Standort, Zeitstempel und strukturierten Daten.'
        },
        profile: {
          title: 'User Profilseite',
          description: 'Persönliche und organisatorische Angaben im Überblick.'
        },
        aiModules: {
          title: 'KI Module',
          description: 'Automatisierungen, Priorisierung und KI-Insights für Entscheider.'
        },
        dashboards: {
          title: 'Dashboards',
          description: 'KPIs, Reports und Statusübersichten für das MVP.'
        }
      }
    },
    profile: {
      title: 'Profil',
      subtitle: 'Vervollständigen Sie Ihr Profil Schritt für Schritt.',
      overview: {
        title: 'Mein Profil',
        subtitle: 'Verwalten Sie Ihre Daten und greifen Sie auf weitere Bereiche zu.',
        edit: 'Profil bearbeiten',
        open: 'Öffnen',
        back: 'Zurück zur Übersicht',
        reset: 'Daten zurücksetzen',
        summaryTitle: 'Ihre Basisdaten',
        summarySubtitle: 'Ein kurzer Überblick der wichtigsten Angaben.',
        sections: {
          title: 'Bereiche',
          onboarding: 'Onboarding',
          personal: 'Persönliche Daten',
          company: 'Unternehmensdaten',
          insurances: 'Meine Versicherungen',
          fleet: 'Mein Fuhrpark',
          locations: 'Meine Standorte'
        }
      },
      onboarding: {
        title: 'Onboarding',
        subtitle: 'Persönliche und Unternehmensdaten erfassen.',
        cardTitle: 'Onboarding',
        cardSubtitle: 'Erfassen Sie Ihre Daten in zwei Schritten.',
        start: 'Onboarding starten',
        resume: 'Onboarding fortsetzen',
        completed: 'Profil abgeschlossen',
        incomplete: 'Onboarding noch nicht abgeschlossen',
        requiredHint: 'Pflichtfeld'
      },
      stepLabel: 'Schritt {{current}} von {{total}}',
      saved: 'Gespeichert',
      passwordMismatch: 'Die Passwörter stimmen nicht überein.',
      registration: {
        title: 'Registrierung',
        emailHint: 'Diese E-Mail wurde bei der Registrierung erfasst.',
        consentHint: 'Einwilligung zur Datenverarbeitung liegt vor.'
      },
      progress: {
        title: 'Fertigstellungsgrad',
        caption: '{{percent}}% abgeschlossen'
      },
      steps: {
        personal: {
          title: 'Persönliche Daten',
          subtitle: 'Kontaktdaten, Sprache und Sicherheitsangaben.'
        },
        company: {
          title: 'Unternehmensdaten',
          subtitle: 'Firmen- und Adressdaten für den Vertragsabschluss.'
        }
      },
      actions: {
        back: 'Zurück',
        next: 'Weiter',
        save: 'Änderungen speichern',
        finish: 'Profil abschließen',
        later: 'Später fortsetzen',
        skip: 'Überspringen'
      },
      fields: {
        email: 'E-Mail Adresse',
        privacyConsent: 'Datenschutz-Zustimmung',
        companyName: 'Firmenname inkl. Rechtsform',
        legalForm: 'Rechtsform',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        addressAdditional: 'Adresszusatz',
        zip: 'Postleitzahl',
        city: 'Stadt',
        country: 'Land',
        vatId: 'USt-IDNr.',
        directorFirstName: 'Vorname des Geschäftsführers',
        directorLastName: 'Nachname des Geschäftsführers',
        salutation: 'Anrede',
        contactFirstName: 'Vorname',
        contactLastName: 'Nachname',
        phoneCountryCode: 'Ländercode',
        phone: 'Telefon',
        language: 'Sprache',
        password: 'Passwort',
        passwordConfirm: 'Passwort wiederholen',
        advisorCode: 'Beraternummer',
        kycBranch: 'Niederlassung in Sanktionsregion vorhanden?',
        kycDirector: 'Geschäftsführer/Verwaltungsrat wohnhaft in Sanktionsregion?',
        kycBusiness: 'Geschäftsbeziehungen zu sanktionierten Regionen?'
      },
      options: {
        yes: 'Ja',
        no: 'Nein',
        select: 'Bitte auswählen',
        language: {
          de: 'Deutsch',
          en: 'Englisch'
        }
      },
      placeholders: {
        insurances: 'Hier entsteht der Bereich für Ihre Versicherungen.',
        fleet: 'Hier entsteht der Bereich für Ihren Fuhrpark.',
        locations: 'Hier entsteht der Bereich für Ihre Standorte.'
      }
    },
    policyPurchase: {
      title: 'Police kaufen',
      subtitle: 'Abschlussstrecke für Policen und Zahlungsinformationen.',
      placeholder: 'Hier entsteht die Kaufstrecke für Policen.'
    },
    whitepaper: {
      kicker: 'Whitepaper',
      heroTitle: 'Native KI-Systeme auf souveräner IaaS',
      heroSubtitle: 'Zukunftssichere KI-Nutzung für Versicherer, Logistiker & Investoren.',
      heroChip: 'Sovereign AI Layer',
      summaryTitle: 'Executive Summary',
      summarySubtitle: 'Strategische Einordnung für Entscheider.',
      summaryBody:
        'Dieses Whitepaper beschreibt den Einsatz nativer KI-Systeme auf einer souveränen IaaS-Plattform für Versicherer, Logistiker und Investoren. Ziel ist es, KI effizient, regulatorisch sicher und wirtschaftlich skalierbar einzusetzen.',
      metrics: {
        ai: 'Native KI-Stacks',
        sovereign: 'Datenhoheit garantiert',
        scalable: 'Skalierbar & auditierbar'
      },
      useCases: {
        title: 'Zulässige KI-Anwendungsfälle',
        subtitle: 'Fokus auf klare Use Cases mit messbarem Mehrwert und regulatorischer Absicherung.',
        risk: 'Risiko-Scoring',
        claim: 'Schadenprognose',
        fraud: 'Betrugserkennung',
        docs: 'Dokumentenanalyse',
        maintenance: 'Predictive Maintenance',
        route: 'Routenoptimierung'
      },
      sections: {
        context: {
          title: 'Ausgangslage',
          body: 'KI wird zum zentralen Wettbewerbsfaktor in Versicherung und Logistik. Gleichzeitig steigen Anforderungen an Datenschutz, Transparenz und Haftung.'
        },
        native: {
          title: 'Native KI auf IaaS',
          body: 'Native KI-Systeme laufen vollständig innerhalb der Infrastruktur. Daten, Modelle und Entscheidungen bleiben unter Kontrolle der Betreiber und sind auditierbar.'
        },
        ecosystem: {
          title: 'Beteiligte im Ökosystem',
          body: 'Versicherer, Rückversicherer, Flottenbetreiber, Logistikunternehmen und Partner greifen rollenbasiert auf KI-Services zu.'
        },
        useCases: {
          title: 'KI-Anwendungsfälle',
          body: 'Risiko-Scoring, Schadenprognose, Betrugserkennung, Dokumentenanalyse, Predictive Maintenance und Routenoptimierung.'
        },
        data: {
          title: 'Datenbasis',
          body: 'Genutzt werden Fahrzeug-, Telematik-, Wartungs- und Schadendaten. Personenbezogene Daten nur pseudonymisiert und zweckgebunden.'
        },
        governance: {
          title: 'Governance & Compliance',
          body: 'Datensouveränität, Modellversionierung, Audit-Trails und Vorbereitung auf EU AI Act sind integraler Bestandteil.'
        },
        investors: {
          title: 'Investorenperspektive',
          body: 'Hohe Skalierbarkeit, regulatorischer Rückenwind und starke Kundenbindung machen dieses Modell wirtschaftlich attraktiv.'
        },
        conclusion: {
          title: 'Fazit',
          body: 'Native KI auf IaaS verbindet Innovation, Sicherheit und Skalierbarkeit und schafft nachhaltigen Mehrwert.'
        }
      },
      cta: {
        primary: 'Whitepaper anfordern',
        secondary: 'Expertenkontakt',
        title: 'Bereit für souveräne KI?',
        subtitle: 'Erhalten Sie das Whitepaper und sprechen Sie mit unserem Team über Ihren AI-Stack.'
      }
    },
    aiOnboarding: {
      kicker: 'KI Onboarding',
      title: 'KI im Onboarding-Prozess',
      subtitle: 'So nutzt das Entwicklerteam KI, um Datenqualität, Compliance und Geschwindigkeit zu optimieren.',
      heroChip: 'Developer View',
      summaryTitle: 'Überblick',
      summarySubtitle: 'Technische Perspektive auf KI-gestütztes Onboarding.',
      sections: {
        intent: {
          title: 'Zielbild & Nutzen',
          body: 'KI unterstützt das Onboarding mit Validierungen, Vorschlägen und Priorisierungen — ohne autonome Entscheidungen.'
        },
        pipeline: {
          title: 'Datenpipeline',
          body: 'Eingaben werden validiert, pseudonymisiert und in strukturierte Features überführt, bevor Modelle bewertet werden.'
        },
        guardrails: {
          title: 'Guardrails & Compliance',
          body: 'Allowlists, Audit-Trails und Model Approvals sind fest im Code verankert.'
        },
        tools: {
          title: 'Tooling & Monitoring',
          body: 'Model Registry, Feature Store und Logging sorgen für Transparenz und Reproduzierbarkeit.'
        },
        rollout: {
          title: 'Rollout-Strategie',
          body: 'Feature Flags, Shadow Runs und Human-in-the-Loop sichern die Qualität im Live-Betrieb.'
        }
      },
      cta: {
        primary: 'Architektur ansehen',
        secondary: 'Team kontaktieren',
        title: 'Nächster Schritt',
        subtitle: 'Diskutieren Sie den KI-Einsatz im Onboarding mit unserem Entwicklerteam.'
      },
      architectureTitle: 'Architekturübersicht'
    },
    identification: {
      title: 'User Identifikation',
      subtitle: 'Identitätsprüfung mit Dokumenten-Scan, Echtheitsprüfung und Selfie-Abgleich.',
      progress: 'Prozessfortschritt',
      steps: {
        start: 'Start',
        capture: 'Dokument-Scan',
        verification: 'Echtheitsprüfung',
        selfie: 'Selfie-Abgleich',
        summary: 'Abschluss'
      },
      intro: {
        title: 'Identifizierung starten',
        body: 'Wir führen Sie sicher durch die Prüfung. Bitte halten Sie Ihr Ausweisdokument bereit und sorgen Sie für gute Lichtverhältnisse.'
      },
      document: {
        typeId: 'Personalausweis',
        typePassport: 'Reisepass',
        typeOther: 'Anderes Dokument'
      },
      capture: {
        title: 'Dokument scannen',
        subtitle: 'Laden Sie ein Foto der Vorder- und Rückseite hoch.',
        front: 'Vorderseite',
        back: 'Rückseite',
        placeholder: 'Noch kein Bild'
      },
      verify: {
        title: 'Dokument verifizieren',
        subtitle: 'Echtheit, MRZ und Ländercode werden geprüft.',
        issuing: 'Ausstellendes Land',
        authenticity: 'Echtheitsprüfung',
        mrz: 'MRZ-Auslesung',
        failed: 'Verifizierung fehlgeschlagen. Bitte Dokumente erneut prüfen.'
      },
      selfie: {
        title: 'Selfie aufnehmen',
        subtitle: 'Nehmen Sie ein Selfie auf, um den Abgleich zu starten.',
        capture: 'Selfie-Datei',
        overlay: 'Gesicht in die Silhouette setzen'
      },
      summary: {
        title: 'Ergebnis',
        subtitle: 'Dokumentation des Prüfprozesses.',
        status: 'Status',
        docType: 'Dokumenttyp',
        country: 'Ausstellendes Land',
        audit: 'Audit-ID',
        ocr: 'OCR-Auslesung',
        notice: 'Alle Prüfergebnisse wurden protokolliert. Bei Misserfolg wenden Sie sich an den Support.'
      },
      status: {
        ok: 'Bestanden',
        pending: 'Ausstehend',
        success: 'Erfolgreich',
        failed: 'Misserfolg'
      },
      actions: {
        start: 'Prozess starten',
        back: 'Zurück',
        next: 'Weiter',
        verify: 'Jetzt prüfen',
        restart: 'Neu starten'
      },
      ocr: {
        title: 'OCR-Auslesung',
        name: 'Name',
        number: 'Dokumentnummer',
        dob: 'Geburtsdatum',
        expiry: 'Ablaufdatum',
        nationality: 'Nationalität'
      },
      camera: {
        capture: 'Kamera öffnen',
        take: 'Foto aufnehmen',
        guide: 'Dokument innerhalb des Rahmens ausrichten',
        slot: 'Ausweisfeld',
        error: 'Kamera konnte nicht gestartet werden.',
        title: {
          front: 'Vorderseite erfassen',
          back: 'Rückseite erfassen',
          selfie: 'Selfie aufnehmen'
        }
      }
    },
    nativeAi: {
      kicker: 'INSURFOX AI IaaS',
      title: 'Insurfox native AI',
      subtitle: 'Sichere, native KI für Versicherungen, InsurTech & Health-Care',
      heroChip: 'Regulated AI Stack',
      deckTitle: 'Präsentation',
      deckSubtitle: 'Business- und Compliance-Deck für regulierte Märkte.',
      slides: {
        1: {
          title: 'Insurfox AI IaaS',
          body: 'Die KI-native Versicherungsplattform für regulierte Märkte.<br/>Sichere, DSGVO-, GDPR- & BaFin-konforme KI für Insurance, Mobility & Health.'
        },
        2: {
          title: 'Executive Summary',
          body: 'Insurfox ist eine vollintegrierte Insurance-IaaS.<br/>KI ist nativ Teil der Plattform, kein externes Add-on.<br/>Sensible Daten werden sicher, kontrolliert und regulatorisch korrekt verarbeitet.<br/>Keine externen KI-Anbieter, kein Daten- oder Modellabfluss.<br/><strong>Bottom Line:</strong> KI wird bei Insurfox produktiv nutzbar – ohne regulatorisches Risiko.'
        },
        3: {
          title: 'Das Kernproblem im Markt',
          body: 'Fragmentierte Systeme, externe KI-SaaS & Hyperscaler, unklare Datenflüsse, Black-Box-Entscheidungen.<br/><strong>Risiken:</strong> DSGVO-Verstöße, BaFin-Beanstandungen, Kontrollverlust über KI & IP, Reputationsrisiken.'
        },
        4: {
          title: 'Der Insurfox-Ansatz',
          body: 'KI als Infrastruktur – nicht als Tool.<br/>Eine Plattform für alle Versicherungsprozesse.<br/>Integrierte Makler- & Dienstleister-Ökosysteme.<br/>Native KI innerhalb der IaaS.<br/>Klare Trennung von Entscheidungshilfe und Entscheidungshoheit.'
        },
        5: {
          title: 'Gesamtarchitektur (High Level)',
          body: 'INSURFOX IaaS verbindet Versicherer, Broker CRM, Core Engine und Native KI Layer.<br/>Keine externen KI-Systeme, keine Datenweitergabe.'
        },
        6: {
          title: 'Was „Native KI“ bei Insurfox bedeutet',
          body: 'Eigene KI-Modelle, Trainingspipelines, Inferenz-Services und Model-Registries.<br/>Keine externen KI-APIs, kein Fremdtraining, kein Modell-Sharing.'
        },
        7: {
          title: 'KI-Use-Cases (Insurance Core)',
          body: 'Risiko- & Pricing-Berechnung, Fraud Detection & Anomalien, Portfolio- & Loss-Ratio-Analysen, Schaden- & Prozessoptimierung, Prolongations- & Renewal-Hinweise.<br/>Immer entscheidungsunterstützend.'
        },
        8: {
          title: 'Sensible Daten',
          body: '<strong>Insurfox schließt sensible Daten nicht aus – sondern macht sie sicher nutzbar.</strong><br/>Gesundheitsdaten, Biometrische Daten, Bewegungs- & Standortdaten.'
        },
        9: {
          title: 'Rechtliche Grundlage',
          body: 'Verarbeitung sensibler Daten nur bei gesetzlicher Grundlage, expliziter Einwilligung, klar definiertem Versicherungszweck.<br/>Grundsätze: Zweckbindung, Datensparsamkeit, Transparenz, Löschkonzepte.'
        },
        10: {
          title: 'Sensitive-Data-Architektur',
          body: 'Sensitive Data Zone: isolierte Datenräume, eigene KI-Modelle, getrennte Trainingspipelines.'
        },
        11: {
          title: 'KI-Governance (BaFin-konform)',
          body: 'KI gibt Empfehlungen, keine Entscheidungen. Human-in-the-Loop verpflichtend. Erklärbare Ergebnisse. Vollständige Audit-Trails.<br/>Keine automatische Ablehnung oder Kündigung.'
        },
        12: {
          title: 'Datenschutz & Datensicherheit',
          body: 'Mandantentrennung, rollenbasierte Zugriffe, Pseudonymisierung, Verschlüsselung, Protokollierung aller KI-Outputs.<br/>Wichtig: KI-Modelle lernen nicht über Kunden hinweg.'
        },
        13: {
          title: 'Schnittstellen zur Versicherung',
          body: 'Inbound: Vertrags- & Policendaten, Schadenhistorien, Tarif- & Regelwerke, optionale Real-Time-Daten.<br/>Outbound: Risiko-Scores, Preisempfehlungen, Fraud-Hinweise, Entscheidungs-Dashboards.'
        },
        14: {
          title: 'Historische Datenanforderungen',
          body: '<strong>Pflicht:</strong> Policen & Laufzeiten, Schadenarten & -höhen, Abwicklungsverläufe, Objekt- & Risikodaten.<br/><strong>Optional:</strong> Telematik, Prozesszeiten, Ereignisdaten, Health-Programme.'
        },
        15: {
          title: 'Warum keine externe KI?',
          body: 'Externe KI bedeutet Datenabfluss, Kontrollverlust, IP-Risiken, regulatorische Unsicherheit.<br/>Insurfox bedeutet volle Datenhoheit, volle KI-Kontrolle, volle Auditierbarkeit.'
        },
        16: {
          title: 'Vorteile für Versicherungen',
          body: 'Schnellere Underwriting-Prozesse, bessere Loss Ratios, weniger Fraud, saubere BaFin-Kommunikation, zukunftssichere KI-Strategie.'
        },
        17: {
          title: 'Vorteile für Investoren',
          body: 'Tiefer technologischer Burggraben, regulatorische Eintrittsbarriere, skalierbares IaaS-Modell, hohe Kundenbindung, KI + Insurance IP.'
        },
        18: {
          title: 'EU AI Act & Zukunftssicherheit',
          body: 'Vorbereitung auf Hochrisiko-KI, dokumentierte Governance, nachvollziehbare Entscheidungslogik, Audit- & Reporting-Fähigkeit.<br/>Insurfox ist EU-AI-Act-ready.'
        },
        19: {
          title: 'Zusammenfassung',
          body: 'Insurfox macht KI im Versicherungswesen produktiv, sicher und regulatorisch akzeptiert – auch mit sensiblen Daten.'
        },
        20: {
          title: 'Abschluss',
          body: 'Insurfox AI IaaS – die kontrollierte Antwort auf KI im regulierten Versicherungsmarkt.'
        }
      }
    },
    featureTree: {
      title: 'Feature Tree',
      subtitle: 'Strukturierte Übersicht der Plattformfunktionen für Claims und Partnernetzwerke.',
      sections: {
        intake: {
          title: 'Schadenaufnahme',
          subtitle: 'Eingang, Prüfung und Steuerung.',
          items: {
            claimIntake: 'Digitale Schadenaufnahme',
            coverageCheck: 'Deckungsprüfung',
            slaRules: 'SLA- und Eskalationslogik',
            taskRouting: 'Task-Routing & Priorisierung'
          }
        },
        partners: {
          title: 'Partnernetzwerk',
          subtitle: 'Werkstätten, Gutachter, Dienstleister.',
          items: {
            partnerDirectory: 'Partnerverzeichnis',
            onboarding: 'Onboarding & Verträge',
            capacity: 'Kapazitätssteuerung',
            performance: 'Performance & Qualität'
          }
        },
        media: {
          title: 'Medien & Dokumente',
          subtitle: 'Fotos, Belege, Nachweise.',
          items: {
            photoUpload: 'Foto- & Video-Uploads',
            damageAi: 'Schadenbild-AI',
            documentHub: 'Dokumenten-Hub',
            versioning: 'Versionierung & Freigaben'
          }
        },
        finance: {
          title: 'Kosten & Rechnungen',
          subtitle: 'KV, Freigabe, Abrechnung.',
          items: {
            estimates: 'Kostenvoranschläge',
            invoices: 'Rechnungsprüfung',
            approvals: 'Freigabe-Workflows',
            reserves: 'Reservenmanagement'
          }
        },
        repair: {
          title: 'Reparatursteuerung',
          subtitle: 'Status, Teile, Übergabe.',
          items: {
            statusTracking: 'Live-Status',
            parts: 'Teilebeschaffung',
            milestones: 'Meilensteine',
            handover: 'Fahrzeugübergabe'
          }
        },
        comms: {
          title: 'Kommunikation',
          subtitle: 'Abstimmung & Rückfragen.',
          items: {
            liveChat: 'Livechat',
            questions: 'Rückfragen & Aufgaben',
            notifications: 'Benachrichtigungen',
            auditTrail: 'Audit Trail'
          }
        },
        analytics: {
          title: 'Analytics & AI',
          subtitle: 'KPIs, Risiken, Insights.',
          items: {
            kpis: 'KPI-Dashboards',
            trendReports: 'Trend-Reports',
            benchmarks: 'Benchmarking',
            fraudSignals: 'Fraud-Signale'
          }
        },
        compliance: {
          title: 'Compliance',
          subtitle: 'Sicherheit & Governance.',
          items: {
            roles: 'Rollen & Rechte',
            gdpr: 'DSGVO & Privacy',
            accessLogs: 'Zugriffsprotokolle',
            retention: 'Aufbewahrung'
          }
        }
      }
    },
    getQuote: {
      title: 'Angebot anfragen',
      subtitle: 'Bitte machen Sie Ihre Angaben. Wir senden Ihnen Ihr Angebot an Ihre E-Mail-Adresse.',
      progress: {
        title: 'COMPARIOSN',
        subtitle: 'Angebot beantragen',
        step: 'Schritt 1 von 10'
      },
      company: {
        title: 'Ihre Daten',
        subtitle: 'An welchem Standort befindet sich Ihr Unternehmen?',
        locationLabel: 'Bitte wählen Sie ein Land',
        locationPlaceholder: 'Bitte wählen Sie ein Land',
        location: {
          de: 'Deutschland',
          eu: 'Europa'
        }
      },
      vehicles: {
        title: 'Zu versichernde Fahrzeuge',
        subtitle: 'Fahrzeuganzahl, Gewicht und Geltungsgebiet.',
        primary: 'Frachtführerhaftungsversicherung',
        additional: 'Weitere zu versichernde Fahrzeuge',
        count: 'Anzahl der zu versichernden Fahrzeuge',
        weight: 'Zulässiges Gesamtgewicht',
        regionLabel: 'Geltungsgebiet',
        add: 'Weitere Fahrzeuge hinzufügen',
        region: {
          de: 'Deutschland',
          eu: 'Europa'
        }
      },
      deductible: {
        title: 'Selbstbeteiligung und Risiken',
        subtitle: 'Bitte wählen Sie Ihre Optionen.',
        amountLabel: 'Höhe der Selbstbeteiligung',
        courier: 'Mitversicherung der Haftung bei Transport von Kurier-Express Paketen',
        cold: 'Mitversicherung der Haftung bei Transport von Kühlgut mit entsprechenden Fahrzeugen'
      },
      preInsurer: {
        title: 'Vorversicherer',
        subtitle: 'Angaben zum Vorversicherer',
        exists: 'Bestand eine Vorversicherung in den letzten 5 Jahren?',
        name: 'Name des Versicherers',
        number: 'Versicherungsnummer'
      },
      summary: {
        title: 'Prämie',
        subtitle: 'Für ein Kalenderjahr',
        netAnnual: 'Jahresnettoprämie',
        tax: 'Versicherungssteuer (Deutschland 19%)',
        grossAnnual: 'Jahresbruttoprämie',
        contract: 'Vertragslaufzeit'
      },
      confirm: {
        title: 'Angebot beantragen',
        subtitle: 'Ihre Angaben sind unvollständig? Pflichtfelder prüfen.',
        privacy: 'Ich habe die Datenschutzerklärung gelesen und stimme ihr zu.',
        submit: 'Angebot beantragen'
      },
      yes: 'Ja',
      no: 'Nein'
    },
    claimProcess: {
      title: 'Schadenmeldung',
      subtitle: '',
      chatTitle: 'Schadenaufnahme Assistent',
      chatSubtitle: '',
      chatStatus: 'Live',
      intro: 'Guten Tag. Ich helfe Ihnen bei der Schadenmeldung.',
      timeStampMessage: 'Zeitstempel gesetzt: {{date}} · {{time}}.',
      askTime: 'Wann ist der Schaden passiert?',
      timeNow: 'Gerade passiert',
      timeOther: 'Andere Zeit',
      timeOtherPlaceholder: 'Datum und Uhrzeit eingeben …',
      confirmTime: 'Zeit bestätigen',
      askLocationChoice: 'War der Schaden am aktuellen Standort?',
      locationCurrent: 'Aktueller Standort',
      locationOther: 'Anderer Ort',
      askLocation: 'Standort zur Adressprüfung freigeben?',
      askAddressConfirm: 'Adresse prüfen und bestätigen.',
      addressConfirmed: 'Adresse bestätigt.',
      confirmAddress: 'Adresse bestätigen',
      askPhotos: 'Bitte Fotos zum Schaden hochladen.',
      photosUploaded: '{{count}} Foto(s) hochgeladen.',
      photosSkipped: 'Keine Fotos übermittelt.',
      skipPhotos: 'Ohne Fotos fortfahren',
      askPersonDetails: 'Bitte Vorname, Nachname und Kennzeichen ergänzen.',
      confirmPersonDetails: 'Angaben bestätigen',
      askDescription: 'Bitte kurz beschreiben, was passiert ist.',
      firstName: 'Vorname',
      lastName: 'Nachname',
      licensePlate: 'Kennzeichen',
      locationButton: 'Standort freigeben',
      locationPending: 'Standort wird abgefragt …',
      locationPendingShort: 'Wird ermittelt …',
      locationGranted: 'Standort erfasst: {{address}}',
      locationDenied: 'Standort nicht verfügbar – bitte Adresse manuell ergänzen.',
      locationUnknown: 'Nicht erfasst',
      nextPrompt: 'Wir starten mit der Standortabfrage.',
      botAck: 'Danke, ich habe das notiert.',
      claimNumberMessage: 'Ihre Schadennummer: {{claimNumber}}.',
      inputPlaceholder: 'Kurzbeschreibung …',
      openManager: 'Schadenmanager öffnen',
      send: 'Absenden',
      back: 'Zurück',
      street: 'Straße',
      houseNumber: 'Hausnummer',
      postalCode: 'PLZ',
      city: 'Ort',
      upload: 'Bilder hochladen',
      uploadEmpty: 'Keine Bilder ausgewählt',
      uploadCount: '{{count}} Bild(er) ausgewählt',
      valuePending: 'Ausstehend',
      infoTitle: 'Live-Check',
      infoSubtitle: '',
      infoLocation: 'Standort',
      infoDate: 'Datum',
      infoTime: 'Uhrzeit',
      infoClaimNumber: 'Schadennummer',
      infoPhotos: 'Fotos',
      infoDescription: 'Schadenhergang',
      infoIncidentTime: 'Schadenszeit',
      infoFirstName: 'Vorname',
      infoLastName: 'Nachname',
      infoLicensePlate: 'Kennzeichen',
      infoStatus: 'Status',
      statusOpen: 'Offen',
      demoHint: 'Zeitstempel und Standort werden direkt dem Schadenticket zugeordnet.'
    },
    logisticsLanding: {
      badge: 'Insurfox IaaS',
      title: 'IaaS Logistikportal',
      subtitle: 'Echtzeit-Transportstatus, Frachtversicherung und Schadensteuerung – alles in einer Plattform.',
      login: 'Login',
      kpi: {
        liveShipments: 'Live Sendungen',
        coverageRate: 'Deckungsquote',
        openIncidents: 'Offene Incidents',
        etaDeviation: 'Ø ETA Abweichung'
      },
      kpiValues: {
        liveShipments: '128',
        coverageRate: '92 %',
        openIncidents: '7',
        etaDeviation: '18 Min'
      },
      cards: {
        realtime: {
          title: 'Transportstatus in Echtzeit',
          body: 'ETA, Route, Statuswechsel und Alerts – pro Sendung und pro Kunde.'
        },
        coverage: {
          title: 'Frachtversicherung & Deckung',
          body: 'Frachtführerhaftpflicht, Cargo und Zusatzdeckungen je Auftrag – transparent und nachvollziehbar.'
        },
        incidents: {
          title: 'Schäden & Incidents',
          body: 'Diebstahl, Beschädigung, Verzögerung, Temperatur – inkl. Dokumenten, Fotos, Partnern.'
        },
        thirdparty: {
          title: 'Third Party & Auftraggeber',
          body: 'Auftraggeber, Ansprechpartner, SLA und Abrechnung – direkt im Transportkontext.'
        },
        ai: {
          title: 'KI-Empfehlungen & Alerts',
          body: 'Proaktive Hinweise zu Risiko, Betrug, Kosten, Routen und Deckungsbedarf.'
        },
        routes: {
          title: 'Routen & Risiken',
          body: 'Routenprofil, Risikozonen, Wetter- und Stauindikatoren – inklusive Live-Warnungen pro Strecke.'
        }
      },
      preview: {
        title: 'Live Dashboard Preview',
        eta: 'ETA',
        temp: 'Temp',
        customs: 'Zoll',
        footer: 'Demo-Daten mit Live KPI Trend (ETA, Temperatur, Customs).'
      },
      previewValues: {
        eta: '18 Min',
        temp: '+2 °C',
        customs: 'Freigegeben'
      }
    },
    logisticsApp: {
      title: 'Logistik Cockpit',
      subtitle: 'Aufträge, Routen, Versicherungsschutz und Incidents im Überblick',
      sections: {
        overview: 'Übersicht',
        shipments: 'Aktuelle Aufträge',
        coverage: 'Versicherung & Deckung',
        incidents: 'Schäden & Incidents',
        thirdParty: 'Partner & Dritte',
        documents: 'Dokumente'
      },
      kpi: {
        activeShipments: 'Aktive Sendungen',
        delayed: 'Verzögert',
        incidents: 'Offene Incidents',
        coverageOk: 'Deckung OK',
        highRisk: 'Hohes Risiko',
        avgEtaDeviation: 'Ø ETA-Abweichung'
      },
      filters: {
        search: 'Sendungsnummer, Route oder Kunde suchen …',
        statusLabel: 'Status',
        statusAll: 'Alle',
        statusInTransit: 'In Transit',
        statusDelayed: 'Verzögert',
        statusDelivered: 'Zugestellt',
        statusIncident: 'Incident'
      },
      table: {
        shipments: {
          title: 'Live Sendungen',
          col: {
            shipment: 'Auftrag',
            customer: 'Auftraggeber',
            route: 'Route',
            status: 'Status',
            eta: 'ETA',
            coverage: 'Deckung',
            cargo: 'Fracht',
            value: 'Wert',
            thirdParty: 'Third Party',
            aiHint: 'AI Hinweis'
          },
          empty: 'Keine Demo-Daten gefunden.'
        },
        statusLabels: {
          inTransit: 'In Transit',
          delayed: 'Verzögert',
          delivered: 'Zugestellt',
          incident: 'Incident'
        },
        coverageLabels: {
          covered: 'Gedeckt',
          partial: 'Teilgedeckt',
          notCovered: 'Nicht gedeckt'
        }
      },
      shipmentsCopy: {
        cargo: {
          electronics: 'Elektronik',
          pharma: 'Pharma',
          fashion: 'Mode',
          chemicals: 'Chemikalien',
          chilled: 'Lebensmittel (gekühlt)',
          automotive: 'Automotive',
          retailMixed: 'Retail (gemischt)',
          seafood: 'Seafood'
        },
        notes: {
          tempStable: 'Temperatur stabil / SLA OK',
          customsWait: 'Wartet auf Zollslot',
          theftInvestigation: 'Incident: Diebstahl in Bearbeitung',
          podSigned: 'Lieferschein unterschrieben',
          temp3c: 'Temperatur 3 °C',
          ferrySlot: 'Wartet auf Fährenslot',
          borderCrossed: 'Grenze passiert',
          tempDeviation: 'Temperaturabweichung erkannt'
        },
        eta: {
          delayed45: '+45 Min',
          delayed25: '+25 Min',
          investigating: 'In Untersuchung',
          hold: 'Angehalten'
        }
      },
      coverage: {
        title: 'Versicherung & Deckung',
        policyId: 'Police',
        limit: 'Deckungssumme',
        deductible: 'Selbstbehalt',
        validity: 'Laufzeit',
        status: 'Status',
        covered: 'Gedeckt',
        partial: 'Teilgedeckt',
        notCovered: 'Nicht gedeckt',
        statusLabels: {
          active: 'Aktiv',
          selective: 'Selektiv',
          inactive: 'Inaktiv'
        }
      },
      coverageCards: {
        liability: { title: 'Frachtführerhaftpflicht' },
        cargo: { title: 'Cargo Insurance' },
        addons: { title: 'Add-ons' }
      },
      incidents: {
        title: 'Schäden & Incidents',
        subtitle: 'Aktuelle Schäden & Untersuchungen',
        openIncident: 'Incident öffnen',
        labels: {
          status: 'Status',
          cost: 'Kosten',
          documents: 'Dokumente'
        },
        statusLabels: {
          open: 'Offen',
          review: 'In Prüfung',
          closed: 'Geschlossen'
        },
        riskLabels: {
          low: 'Niedrig',
          medium: 'Mittel',
          high: 'Hoch'
        },
        types: {
          theftParking: 'Diebstahl (Parkplatz A14)',
          tempDeviation: 'Temperaturabweichung',
          delay12h: 'Verzögerung > 12h',
          damageForklift: 'Beschädigung (Gabelstapler)'
        }
      },
      documents: {
        title: 'Dokumente',
        upload: 'Hochladen',
        download: 'Herunterladen'
      },
      thirdParty: {
        shipper: 'Auftraggeber',
        consignee: 'Empfänger',
        broker: 'Makler',
        warehouse: 'Lagerhaus'
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



    claimManager: {
      rolesCard: {
        description: 'Sachbearbeiter-Cockpit für schnelle Entscheidungen, Freigaben, Partnersteuerung und AI-Hinweise.',
        cta: 'Öffnen'
      },
      marketing: {
        hero: {
          overline: 'Claims Intelligence',
          title: 'Schadenmanager',
          subtitle:
            'Sachbearbeiter-Cockpit für schnelle Entscheidungen, Freigaben und Partnersteuerung – mit KI, Dokumenten und Deckungsprüfung im Überblick.',
          login: 'Login'
        },
        features: {
          statusTimeline: {
            title: 'Status & Timeline',
            description: 'Alle Stationen der Schadenbearbeitung, Eskalationen und SLAs in einer Ansicht.'
          },
          coverage: {
            title: 'Deckung & Policen',
            description: 'Automatische Policenprüfung, Limits und Selbstbehalte mit KI-Unterstützung.'
          },
          partners: {
            title: 'Partnersteuerung',
            description: 'Werkstatt, Gutachter oder Abschlepper direkt aus dem Schadenfall beauftragen.'
          },
          workflows: {
            title: 'Kostenfreigabe & Workflows',
            description: 'Freigaben mit Checklisten, Kommentaren und Audit-Trail.'
          },
          documents: {
            title: 'Dokumente & Bilder',
            description: 'Polizei, KV, Fotos und Rechnungen sicher im Kontext der Schadenakte.'
          },
          aiInsights: {
            title: 'Insurfox AI Hinweise',
            description: 'Verdachtsmomente, Plausibilitäten und Next-Best-Actions für Sachbearbeiter:innen.'
          }
        },
        preview: {
          title: 'Dashboard Preview',
          subtitle: 'KPIs, Alerts und Timeline – bereit für schnelle Entscheidungen.',
          kpis: {
            active: 'Aktive Schäden',
            sla: 'SLA eingehalten',
            ai: 'AI Alerts'
          },
          chartTitle: 'Kostenentwicklung / Woche',
          notes: 'Demo-Daten: kombinierte KPI-Sicht mit AI Alerts und Status-Clustern.'
        }
      },
      app: {
        listHeader: {
          title: 'Insurfox Schadenmanager',
          subtitle: 'Offene Schadenfälle in Bearbeitung'
        },
        caseHeader: {
          title: 'Schadenakte',
          subtitle: 'Schadenübersicht und Schadenstatus mit KI Entscheidungsvorlagen'
        },
        header: {
          overline: 'Claim file',
          title: 'Schadenakte',
          claimId: 'Schaden-ID',
          claimIdValue: 'CLM-2025-0471',
          date: 'Ereignis',
          dateValue: '12. März 2025',
          status: 'Status'
        },
        caseList: {
          title: 'Gespeicherte Schäden',
          subtitle: 'Wähle einen Schadenfall aus, um die Akte zu öffnen.',
          empty: 'Keine gespeicherten Schäden.',
          columns: {
            claimNumber: 'Schadennummer',
            firstName: 'Vorname',
            lastName: 'Nachname',
            licensePlate: 'Kennzeichen',
            date: 'Ereignis'
          }
        },
        filters: {
          status: 'Status',
          type: 'Schadenart',
          all: 'Alle',
          reset: 'Filter zurücksetzen'
        },
        damageTypes: {
          rearCollision: 'Heckschaden',
          frontCollision: 'Frontschaden',
          sideCollision: 'Seitenschaden',
          parkingDamage: 'Parkschaden',
          glassDamage: 'Glasschaden',
          wildlife: 'Wildunfall',
          mirrorContact: 'Spiegelkontakt',
          hailDamage: 'Hagelschaden',
          theft: 'Diebstahl',
          waterDamage: 'Wasserschaden',
          fireDamage: 'Brandschaden',
          vandalism: 'Vandalismus',
          stormDamage: 'Sturmschaden',
          engineDamage: 'Motorschaden',
          tireDamage: 'Reifenschaden',
          cargoDamage: 'Ladungsschaden',
          liabilityDamage: 'Haftpflichtschaden',
          animalDamage: 'Tierschaden'
        },
        statusOptions: {
          intake: 'Eingang',
          review: 'Prüfung',
          approval: 'Freigabe',
          repair: 'Reparatur',
          closure: 'Abschluss'
        },
        actions: {
          backToList: 'Zurück zur Übersicht',
          approveCosts: 'Kostenfreigabe',
          assignSurveyor: 'Gutachter beauftragen',
          changePartner: 'Partner ändern'
        },
        kpis: {
          totalIncurred: 'Gesamtschaden',
          reserve: 'Reserve',
          approved: 'Freigegeben',
          openItems: 'Offene Positionen',
          deductible: 'Selbstbehalt',
          coverage: 'Deckungsstatus',
          coverageValue: 'Gedeckt',
          fraudRisk: 'Betrugsrisiko',
          handlingTime: 'Bearbeitungszeit'
        },
        kpiValues: {
          totalIncurred: '€ 12.480',
          reserve: '€ 3.200',
          approved: '€ 6.210',
          openItems: '3',
          deductible: '€ 500',
          coverage: 'Gedeckt',
          fraudRisk: 'Mittel',
          handlingTime: '9 T'
        },
        details: {
          title: 'Schadendetails',
          type: 'Schadenart',
          location: 'Ort & Uhrzeit',
          incidentTime: 'Zeitpunkt',
          vehicle: 'Fahrzeug',
          summary: 'Kurzbeschreibung',
          values: {
            type: 'Kasko / Auffahrunfall',
            location: 'Hamburg Hafen, 11:32',
            vehicle: 'HH-CL 2045 • WDD2130041A123456',
            summary: 'Kunde meldet Auffahrunfall an der Zufahrt Tor 4. Sensorwerte + Zeugenbericht vorhanden.'
          }
        },
        timeline: {
          title: 'Timeline & SLA',
          steps: {
            intake: 'Eingang',
            review: 'Prüfung',
            approval: 'Freigabe',
            repair: 'Reparatur',
            closure: 'Abschluss'
          }
        },
        costs: {
          title: 'Kosten & Freigabe',
          confirm: 'Kosten überprüfen',
          table: {
            position: 'Position',
            amount: 'Betrag',
            status: 'Status',
            note: 'Notiz'
          },
          items: {
            bodywork: 'Karosserie',
            paint: 'Lackierung',
            rental: 'Mietwagen'
          },
          status: {
            pending: 'Offen',
            approved: 'Freigegeben',
            rejected: 'Abgelehnt'
          },
          notePlaceholder: 'Kommentar hinzufügen …',
          modal: {
            title: 'Kostenübernahme bestätigen',
            checkbox: 'Policy geprüft & Limits eingehalten',
            confirm: 'Kosten freigeben',
            cancel: 'Abbrechen'
          }
        },
        coverage: {
          title: 'Deckung & Police',
          policyNumber: 'Police',
          policyValue: 'POL-DE-4711',
          term: 'Laufzeit',
          termValue: '01.01.2024 – 31.12.2024',
          limit: 'Deckungssumme',
          limitValue: '€ 15.000',
          exclusion: 'Ausschlüsse',
          exclusionValue: 'Glasbruch ausgeschlossen',
          covered: 'Gedeckt',
          partial: 'Teilgedeckt',
          notCovered: 'Nicht gedeckt',
          note: 'Risikoanalyse zeigt volle Deckung für Reparatur und Mietwagen.'
        },
        partner: {
          title: 'Partnersteuerung',
          changeButton: 'Partner wechseln',
          modalTitle: 'Partnerauswahl',
          confirm: 'Übernehmen',
          options: {
            partner1: { name: 'KFZ Werkstatt Müller GmbH' },
            partner1Address: 'Hamburg, Süderstraße 54',
            partner2: { name: 'Autopartner Nord GmbH' },
            partner2Address: 'Lübeck, Baltic Park 3',
            partner3: { name: 'Karosserie 24' },
            partner3Address: 'Bremerhaven, Dock 2'
          }
        },
        ai: {
          title: 'Insurfox AI Hinweise',
          items: {
            hint1: 'Fraud suspicion: mittleres Risiko – Schadenhöhe +18 % über Benchmark.',
            hint2: 'Fehlender Polizeibericht – Upload anfordern.',
            hint3: 'Ähnliche Schäden in den letzten 12 Monaten (3 Fälle) – Plausibilitätscheck.',
            hint4: 'Empfehlung: Gutachter beauftragen (Severity Score 0.72).',
            hint5: 'Partnerkapazität: Werkstatt Müller frei ab 15.03.'
          }
        },
        documents: {
          title: 'Dokumente',
          media: 'Bilder & Medien',
          mediaLabel: 'Foto',
          damage: {
            title: 'Schadenbilder & KI-Bewertung',
            modalTitle: 'Schadenbild',
            prev: 'Zurück',
            next: 'Weiter',
            riskBadges: {
              low: '🟢 Geringes Risiko',
              medium: '🟠 Mittleres Risiko',
              high: '🔴 Erhöhtes Risiko'
            },
            items: {
              photo1: {
                title: 'Frontschaden Stoßfänger',
                ai: 'KI erkennt einen frontalen Aufprall mit mittlerer Geschwindigkeit. Deformation konsistent mit Auffahrunfall.',
                fraud: 'Schadenbild plausibel zum gemeldeten Unfallhergang.'
              },
              photo2: {
                title: 'Seitenschaden Fahrertür',
                ai: 'Seitliche Eindrückung mit Lackabrieb. Kontakt mit festem Objekt wahrscheinlich.',
                fraud: 'Schadenhöhe leicht über Durchschnitt vergleichbarer Fälle.'
              },
              photo3: {
                title: 'Heckschaden',
                ai: 'Heckaufprall mit klarer Energieübertragung. Keine Anzeichen für Vorschäden.',
                fraud: 'Kein Fraud-Hinweis erkannt.'
              },
              photo4: {
                title: 'Detailaufnahme Lack & Sensor',
                ai: 'Sensorbereich betroffen. Kalibrierung nach Reparatur empfohlen.',
                fraud: 'Unregelmäßige Kratzmuster – manuelle Prüfung empfohlen.'
              }
            }
          },
          list: {
            estimate: 'Kostenvoranschlag.pdf',
            police: 'Polizeibericht.pdf',
            survey: 'Gutachten.pdf',
            invoice: 'Rechnung.pdf'
          },
          previewTitle: 'Vorschau',
          close: 'Schließen'
        },
        surveyor: {
          title: 'Gutachter auswählen',
          mapTitle: 'Einsatzgebiet & Entfernung',
          confirm: 'Bestätigen',
          options: {
            surveyor1: 'MobilExpert GmbH',
            surveyor1Region: 'Region Hamburg',
            surveyor2: 'NordGutachter AG',
            surveyor2Region: 'Region Schleswig-Holstein',
            surveyor3: 'SchnellCheck Service',
            surveyor3Region: 'Region Niedersachsen'
          }
        }
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
      title: 'Registrieren ist einfach.',
      subtitle: 'Geben Sie einfach Ihre E-Mail Adresse ein und wir senden Ihnen einen individuellen Link zu.',
      emailLabel: 'E-Mail Adresse',
      emailPlaceholder: 'Geben Sie Ihre E-Mail Adresse hier ein',
      emailError: 'Bitte geben Sie eine gültige E-Mail Adresse ein.',
      privacyText: 'Ich habe die',
      privacyLinkText: 'Datenschutzerklärung',
      privacyLink: 'https://insurfox.de/de/datenschutz/',
      privacyError: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
      submit: 'Jetzt registrieren',
      nextStep: 'Nächster Schritt',
      success: 'Vielen Dank! Wir senden Ihnen einen Link per E-Mail.',
      alreadyRegistered: 'Schon registriert?',
      login: 'Anmelden',
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
    partnerManagement: {
      title: 'Partner Management',
      subtitle: 'Partnernetzwerke, Dokumente und Live-Kommunikation je Schadenfall.',
      overview: {
        title: 'Partner Management',
        subtitle: 'Übersicht der Netzwerkbereiche mit direktem Zugriff.',
        items: {
          repair: {
            title: 'Reparaturnetzwerke',
            description: 'Werkstattpartner, Status und SLA je Schadenfall.'
          },
          assistance: {
            title: 'Assistenz / Abschleppen / Bergen',
            description: 'Pannenhilfe, Abschlepp- und Bergungspartner.'
          },
          rental: {
            title: 'Mietwagenpartner',
            description: 'Fahrzeugersatz, Verfügbarkeit und Konditionen.'
          },
          surveyors: {
            title: 'Gutachternetzwerke',
            description: 'Sachverständige, Kapazitäten und Berichte.'
          },
          majorLoss: {
            title: 'Partner für Großschäden',
            description: 'Spezialisten für Großschadenereignisse.'
          },
          parts: {
            title: 'Ersatzteilpartner',
            description: 'Teilelieferanten, Lieferzeiten und Verfügbarkeit.'
          }
        }
      },
      network: {
        action: 'Netzwerk verwalten',
        cards: {
          overview: {
            title: 'Netzwerkübersicht',
            subtitle: 'Partnerstruktur, Regionen und Leistungsbereiche.'
          },
          quality: {
            title: 'Qualität & SLA',
            subtitle: 'Reaktionszeiten, KPIs und Compliance.'
          },
          documents: {
            title: 'Dokumente & Nachweise',
            subtitle: 'Rahmenverträge, Zertifikate und Nachweise.'
          },
          billing: {
            title: 'Abrechnung & Kosten',
            subtitle: 'Preise, Konditionen und Status.'
          },
          status: {
            title: 'Status & Auslastung',
            subtitle: 'Kapazitäten und aktuelle Verfügbarkeit.'
          },
          communication: {
            title: 'Kommunikation',
            subtitle: 'Abstimmungen, Rückfragen und Updates.'
          },
          openItems: {
            title: 'Offene Punkte',
            subtitle: 'Klärungen, Freigaben und nächste Schritte.'
          }
        },
        placeholder: 'Inhalte folgen.'
      },
      actions: {
        addPartner: 'Partner hinzufügen'
      },
      partnerTypes: {
        workshop: 'Werkstatt',
        surveyor: 'Gutachter',
        towing: 'Abschleppdienst'
      },
      selection: {
        title: 'Partnerauswahl',
        subtitle: 'Netzwerke, Spezialisierung und Reaktionszeit.',
        response: 'Antwortzeit'
      },
      claimMedia: {
        title: 'Schadenbilder',
        subtitle: 'Status der eingereichten Fotos.',
        status: {
          review: 'In Prüfung',
          approved: 'Freigegeben',
          missing: 'Fehlt'
        }
      },
      estimates: {
        title: 'Kostenvoranschläge',
        subtitle: 'Eingang, Prüfung und Freigaben.',
        cta: 'KV anfordern'
      },
      invoices: {
        title: 'Rechnungen',
        subtitle: 'Prüfung und Freigabe je Partner.',
        cta: 'Rechnung prüfen'
      },
      repair: {
        title: 'Reparaturstatus',
        subtitle: 'Live-Status aus dem Partnernetzwerk.',
        eta: 'Prognose: {{time}}',
        steps: {
          intake: 'Fahrzeugannahme',
          diagnostics: 'Diagnose',
          parts: 'Ersatzteile',
          repair: 'Reparatur',
          handover: 'Übergabe'
        }
      },
      chat: {
        title: 'Livechat',
        subtitle: 'Rückfragen & Abstimmung im Schadenfall.',
        placeholder: 'Nachricht schreiben …',
        send: 'Senden'
      },
      questions: {
        title: 'Rückfragen',
        subtitle: 'Offene Punkte an den Partner.',
        cta: 'Neue Rückfrage'
      }
    },
    brokerPortal: {
      title: 'IaaS Makler CRM'
    },
    brokerLanding: {
      title: 'Makler CRM',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Makler CRM',
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
    },
    claimsfox: {
      nav: {
        title: 'Claimsfox',
        dashboard: 'Dashboard',
        claims: 'Schäden',
        intake: 'FNOL',
        triage: 'Triage',
        documents: 'Dokumente',
        mailbox: 'Postfach',
        partners: 'Partner',
        reporting: 'Reporting',
        tasks: 'Aufgaben',
        integrations: 'Integrationen'
      },
      calendar: {
        title: 'Kalender',
        subtitle: 'Nächste Termine',
        location: 'Ort',
        participants: 'Teilnehmende',
        description: 'Beschreibung',
        locationTbd: 'Ort offen',
        participantsTbd: 'Teilnehmer offen',
        descriptionTbd: 'Details folgen',
        close: 'Schließen',
        openRelated: 'Zum Fall'
      },
      dashboard: {
        title: 'Claimsfox Workspace',
        subtitle: 'Schadenmanagement mit Intake, Triage und Workflow.',
        kpi: {
          openClaims: 'Offene Schäden',
          slaRisk: 'SLA-Risiko',
          fraudFlags: 'Fraud-Flags',
          queue: 'Meine Queue'
        },
        queueTitle: 'Meine Aufgaben',
        queueSubtitle: 'Aktive Zuweisungen',
        mailTitle: 'Postfach',
        mailSubtitle: 'Neue Nachrichten',
        recentTitle: 'Aktuelle Schäden',
        recentSubtitle: 'Zuletzt eröffnet'
      },
      claims: {
        title: 'Schadenliste',
        subtitle: 'Alle offenen und abgeschlossenen Schäden'
      },
      filters: {
        status: 'Status',
        lob: 'Sparte',
        search: 'Suche',
        searchPlaceholder: 'Schadennummer, Versicherter, Police',
        all: 'Alle'
      },
      status: {
        intake: 'Intake',
        triage: 'Triage',
        investigation: 'Prüfung',
        settlement: 'Regulierung',
        closed: 'Abgeschlossen',
        denied: 'Abgelehnt'
      },
      severity: {
        low: 'Niedrig',
        medium: 'Mittel',
        high: 'Hoch',
        critical: 'Kritisch'
      },
      claimDetail: {
        title: 'Schaden',
        subtitle: 'Details',
        policy: 'Police',
        status: 'Status',
        overviewTitle: 'Überblick',
        lossDate: 'Schadendatum',
        severity: 'Schwere',
        reserve: 'Reserve',
        paid: 'Gezahlt',
        slaDue: 'SLA fällig',
        assigned: 'Zuständig',
        notePlaceholder: 'Notiz hinzufügen …',
        decisionHint: 'Entscheidung dokumentieren und nächste Schritte auslösen.',
        assignmentsTitle: 'Zuweisungen',
        assignmentsSubtitle: 'Tasks & Partner',
        tasksLabel: 'Aktive Tasks',
        partnerLabel: 'Partner zuweisen',
        assignPartner: 'Partner anfragen',
        aiTitle: 'AI Assist',
        aiSubtitle: 'Erklärbare Triage',
        aiRecommendation: 'Empfehlung',
        aiSummary: 'Sofortprüfung mit Standardreserve; keine Betrugsindikatoren.',
        aiBullet1: 'Schadenhöhe im erwarteten Bereich',
        aiBullet2: 'Belege vollständig, nur Rechnung fehlt',
        aiBullet3: 'SLA in 8 Tagen, Priorität mittel',
        aiSources: 'Quellen: FNOL, Rechnungen, Historie',
        tabs: {
          overview: 'Übersicht',
          documents: 'Dokumente',
          timeline: 'Timeline',
          decision: 'Entscheidung'
        },
        actions: {
          settlement: 'Regulierung starten',
          investigation: 'In Prüfung',
          deny: 'Ablehnen',
          addNote: 'Notiz hinzufügen'
        },
        events: {
          noteTitle: 'Entscheidungsnotiz',
          noteMessage: 'Regulierungsoptionen geprüft und nächste Schritte abgestimmt.',
          partnerAssignedTitle: 'Partnerzuweisung',
          partnerAssignedMessage: 'Partner {{partner}} für diesen Schaden angefragt.',
          partnerRequestReason: 'Aus der Schadendetailansicht zugewiesen.'
        }
      },
      documents: {
        title: 'Dokumente',
        subtitle: 'Belege & Extraktion',
        helper: 'Extraktion prüfen und freigeben.',
        linkTo: 'Verknüpfen mit Schaden',
        upload: 'Dokument hochladen',
        view: 'Vorschau',
        approve: 'Freigeben',
        previewText: 'Vorschau der extrahierten Inhalte.',
        open: 'Öffnen',
        status: 'Status',
        statusLabels: {
          pending: 'Ausstehend',
          needsReview: 'Prüfen',
          approved: 'Freigegeben'
        }
      },
      mailbox: {
        title: 'Postfach',
        subtitle: 'Eingang & Verknüpfung',
        inbox: 'Eingang',
        inboxSubtitle: 'Neue Nachrichten',
        detail: 'Nachricht',
        from: 'Von',
        date: 'Datum',
        attachments: 'Anhänge',
        link: 'Mit Schaden verknüpfen',
        noSelection: 'Keine Nachricht ausgewählt'
      },
      partners: {
        title: 'Partner',
        subtitle: 'Dienstleister & Netzwerke',
        assignTo: 'Zuweisen zu',
        request: 'Anfragen',
        updateStatus: 'Status ändern',
        status: {
          active: 'Aktiv',
          standby: 'Standby',
          onHold: 'Pausiert'
        }
      },
      triage: {
        title: 'Triage',
        subtitle: 'AI-gestützte Priorisierung',
        recommendation: 'AI Empfehlung: in Prüfung',
        sources: 'Belege, Historie, SLA',
        score: 'Score',
        needsApproval: 'Freigabe erforderlich',
        approve: 'Freigeben'
      },
      intake: {
        title: 'FNOL Intake',
        subtitle: 'Schadenaufnahme in 3 Schritten',
        claimant: 'Versicherter',
        policyRef: 'Police',
        lossDate: 'Schadendatum',
        lossLocation: 'Ort des Schadens',
        description: 'Beschreibung',
        attachmentsHint: 'Anhänge werden im nächsten Schritt ergänzt.',
        back: 'Zurück',
        next: 'Weiter',
        submit: 'Erstellen'
      },
      deadlines: {
        title: 'Fristen',
        subtitle: 'Nächste Meilensteine',
        openClaim: 'Fall öffnen',
        items: {
          inspection: 'Vor-Ort-Inspektion',
          inspectionDetail: 'Besichtigung durch Surveyor bestätigen und Sicherheitscheck.',
          reserve: 'Reserve-Abgleich',
          reserveDetail: 'Reserve basierend auf neuen Rechnungen aktualisieren.',
          settlement: 'Regulierungskomitee',
          settlementDetail: 'Vorschlag im Gremium vorstellen.',
          broker: 'Broker-Update',
          brokerDetail: 'Status und nächste Schritte abstimmen.',
          fraud: 'Fraud-Check',
          fraudDetail: 'Anomalien prüfen und dokumentieren.'
        }
      },
      reporting: {
        title: 'Reporting',
        subtitle: 'KPI & Analysen',
        statusTitle: 'Statusverteilung',
        severityTitle: 'Schweregrad',
        slaTitle: 'SLA Risiko',
        tasksTitle: 'Tasks',
        slaOnTrack: 'Im Plan',
        slaRisk: 'Risiko',
        auditTitle: 'Audit & Compliance',
        auditSubtitle: 'Export & Nachweis',
        fraudFlags: 'Fraud-Flags',
        auditHint: 'Export erstellt eine prüfbare Audit-Spur.',
        auditExport: 'Audit exportieren'
      },
      tasks: {
        title: 'Aufgaben',
        subtitle: 'Queues & SLAs',
        advance: 'Weiter',
        status: {
          open: 'Offen',
          inProgress: 'In Arbeit',
          blocked: 'Blockiert',
          done: 'Erledigt'
        }
      },
      integrations: {
        title: 'Integrationen',
        subtitle: 'Systemverbindungen',
        helper: 'Demo-Integration',
        guidewire: 'Guidewire',
        duckcreek: 'Duck Creek',
        email: 'E-Mail Gateway',
        storage: 'Dokumentenablage',
        payments: 'Payments'
      },
      common: {
        loading: 'Lade Daten ...'
      }
    },
    fleetfox: {
      nav: {
        title: 'Fleetfox',
        dashboard: 'Dashboard',
        vehicles: 'Fahrzeuge',
        drivers: 'Fahrer',
        routes: 'Routen',
        vision: 'Vision',
        maintenance: 'Wartung',
        insurance: 'Versicherung',
        assistant: 'Assistant',
        reporting: 'Reporting',
        audit: 'Audit'
      },
      calendar: {
        title: 'Kalender',
        empty: 'Keine Termine im gewählten Monat.',
        date: 'Datum',
        location: 'Ort',
        linked: 'Verknüpft',
        close: 'Schließen',
        goTo: 'Öffnen'
      },
      common: {
        all: 'Alle',
        loading: 'Lade Daten ...'
      },
      dashboard: {
        title: 'Fleetfox Workspace',
        subtitle: 'AI Fleet Management mit Risikosteuerung und Insurance-Workflows.',
        heroHint: '50 Fahrzeuge, 120 Fahrer und erklärbare AI-Scores im Live-Demo-Modell.',
        queueTitle: 'Kritische Fahrzeuge',
        queueSubtitle: 'Top-Risiko-Einheiten mit Handlungsbedarf',
        alertTitle: 'Safety Alerts',
        alertSubtitle: 'Aktuelle Warnungen aus Telematik und Vision',
        kpi: {
          safety: 'Safety Score Ø',
          risk: 'Risk Score Ø',
          maintenance: 'Wartungsrisiken',
          claimsProbability: 'Schadenwahrscheinlichkeit',
          alerts: 'Safety Alerts',
          vehicles: 'Fahrzeuge'
        }
      },
      vehicles: {
        title: 'Fahrzeugbestand',
        subtitle: 'Flotteneinheiten mit Risiko-, Sicherheits- und Servicekennzahlen.',
        search: 'Suche nach Kennzeichen, VIN oder Region',
        empty: 'Keine Fahrzeuge gefunden.',
        status: {
          active: 'Aktiv',
          idle: 'Inaktiv',
          maintenance: 'Wartung'
        }
      },
      vehicleDetail: {
        title: 'Fahrzeug',
        heroHint: 'Detailansicht mit AI-Erklärung, Timeline und Demo-Dokumenten.',
        vin: 'VIN',
        licensePlate: 'Kennzeichen',
        weight: 'Gewicht',
        mileage: 'Kilometer',
        manufacturer: 'Hersteller',
        model: 'Modell',
        serviceStatus: 'Service-Status',
        assignedDriver: 'Zugeordneter Fahrer',
        maintenanceRisk: 'Wartungsrisiko',
        predictedServiceDate: 'Serviceprognose',
        safety: 'Safety Score',
        risk: 'Risk Score',
        odometer: 'Kilometerstand',
        nextService: 'Nächster Service',
        overviewTitle: 'Übersicht',
        assignedDrivers: 'Zugeordnete Fahrer',
        powertrain: 'Antrieb',
        tags: 'Tags',
        activate: 'Aktiv setzen',
        toMaintenance: 'In Wartung',
        addNote: 'Notiz',
        documentsTitle: 'Demo-Dokumente',
        documentsSubtitle: 'Telematik- und Risikoberichte als Download.',
        downloadTelematics: 'Telematikbericht',
        downloadRisk: 'Risikobericht',
        openStaticDoc: 'Statisches Doku-Beispiel',
        timelineTitle: 'Timeline',
        timelineEmpty: 'Keine Timeline-Einträge vorhanden.',
        aiTitle: 'AI-Erklärung',
        aiSubtitle: 'Risikotreiber, Evidenzen und Konfidenz'
      },
      drivers: {
        title: 'Fahrerübersicht',
        subtitle: 'Fahrerprofile, Safety-Scores und Trainingsstatus.',
        search: 'Suche nach Name oder Standort',
        empty: 'Keine Fahrer gefunden.'
      },
      driverDetail: {
        title: 'Fahrer',
        heroHint: 'Leistungsprofil mit Fahrzeugzuordnung und Compliance-Hinweisen.',
        profileTitle: 'Fahrerprofil',
        address: 'Adresse',
        licenseValidUntil: 'Führerschein gültig bis',
        incidents: 'Vorfälle',
        currentVehicle: 'Aktuelles Fahrzeug',
        scoresTitle: 'Score-Übersicht',
        safety: 'Safety Score',
        risk: 'Risk Score',
        eco: 'Eco Score',
        distraction: 'Ablenkungsereignisse',
        speeding: 'Geschwindigkeitsereignisse',
        assignedTitle: 'Zugeordnete Fahrzeuge',
        documentsTitle: 'Demo-Dokumente',
        downloadProfile: 'Fahrerprofil herunterladen',
        addNote: 'Coaching notieren',
        timelineTitle: 'Timeline',
        timelineEmpty: 'Keine Driver-Timeline vorhanden.'
      },
      routes: {
        title: 'Routenoptimierung',
        subtitle: 'AI-gestützte Vorschläge zu Risiko, ETA, CO2 und Kraftstoff.',
        search: 'Route suchen',
        risk: 'Risiko',
        eta: 'ETA',
        accept: 'Vorschlag übernehmen'
      },
      vision: {
        title: 'Fleet Vision',
        subtitle: 'Dashcam- und VisionAI-Ereignisse mit Explainability.',
        uploadTitle: 'Unfallbild',
        uploadSubtitle: 'Vision-Simulation',
        uploadHint: 'Unfallbild hier ablegen (Demo)',
        overlay: 'Bounding Box Overlay',
        liveMap: 'Live-Detektionskarte',
        overlayHelp: 'Bounding Boxes markieren erkannte Schadenzonen im Gesamtbild. Die Ausschnitte darunter zeigen die jeweiligen Detektionsbereiche mit Konfidenz.',
        confidence: 'Konfidenz',
        eventsTitle: 'Vision Events',
        eventsSubtitle: 'Ereignisse mit Severity und Evidenz',
        vehicle: 'Fahrzeug',
        severity: 'Severity',
        approve: 'Freigeben',
        override: 'Übersteuern'
      },
      maintenance: {
        title: 'Prädiktive Wartung',
        subtitle: 'Ausfallprognosen, Kosten und empfohlene Maßnahmen.',
        warningTitle: 'AI-Warnung: Wartung überfällig',
        warningBody: 'Die aktuelle Laufleistung liegt über dem Service-Schwellenwert. Bitte sofort Wartung einplanen.',
        cost: 'Kosten',
        due: 'Fällig in',
        schedule: 'Slot planen'
      },
      telematics: {
        title: 'Telematik-Timeline',
        subtitle: 'Ereignisse zu Bremsen, Leerlauf, Verbrauch und Standort.',
        speed: 'Geschwindigkeit',
        idle: 'Leerlauf',
        fuel: 'Verbrauch',
        harshBraking: 'Starkes Bremsen',
        harshAcceleration: 'Starkes Beschleunigen'
      },
      risk: {
        title: 'AI Risiko-Panel',
        subtitle: 'Deterministischer Score aus Telematik, Vorfällen und Service-Status.',
        score: 'Risiko-Score',
        category: 'Risikokategorie',
        recommendation: 'Empfehlung',
        premiumImpact: 'Prämien-Impact'
      },
      costs: {
        title: 'Kostenübersicht',
        subtitle: 'Fuel-, Wartungs- und Versicherungskosten mit KPI pro km.',
        total: 'Gesamtkosten',
        perVehicle: 'Kosten pro Fahrzeug',
        perKm: 'Kosten pro km',
        fuel: 'Fuel-Kosten',
        maintenance: 'Wartungskosten',
        insurance: 'Versicherungskosten'
      },
      insurance: {
        title: 'Insurance Risk',
        subtitle: 'Prämien- und Schadenwahrscheinlichkeits-Simulation.',
        listTitle: 'Assessments',
        detailTitle: 'Assessment-Details',
        premium: 'Prämie',
        basePremium: 'Basisprämie',
        multiplier: 'Multiplikator',
        claimsProbability: 'Schadenwahrscheinlichkeit',
        downloadReport: 'Risk Report herunterladen',
        addNote: 'Notiz speichern',
        aiTitle: 'AI-Erklärung',
        aiSubtitle: 'Evidenzbasierte Risikobegründung'
      },
      assistant: {
        title: 'AI Assistant',
        subtitle: 'Deterministische AI-Simulation für operative Entscheidungen.',
        actionsTitle: 'Aktionen',
        findCritical: 'Kritische Fahrzeuge finden',
        reducePremium: 'Prämie durch Training senken',
        routeSummary: 'Routen-Risikozusammenfassung',
        resultTitle: 'Ergebnis',
        resultSubtitle: 'Konfidenz, Gründe und Evidenzen',
        empty: 'Bitte eine Aktion starten.'
      },
      reporting: {
        title: 'Fleet Reporting',
        subtitle: 'KPI, Risikocharts und operative Prioritäten.',
        riskChartTitle: 'Risiko nach Fahrzeugtyp',
        statusChartTitle: 'Statusverteilung',
        maintenanceTrend: 'Wartungskosten-Trend',
        tableTitle: 'Top-Risiko-Fahrzeuge',
        table: {
          vehicle: 'Fahrzeug',
          region: 'Region',
          risk: 'Risiko',
          safety: 'Safety'
        },
        kpi: {
          safety: 'Safety Score Ø',
          risk: 'Risk Score Ø',
          maintenance: 'Wartungsrisiko',
          claims: 'Schadenwahrscheinlichkeit',
          co2: 'CO2 Schätzung',
          fuel: 'Fuel Trend'
        }
      },
      audit: {
        title: 'Fleet Audit',
        subtitle: 'Vollständige AI- und Workflow-Events mit Filter.',
        searchTitle: 'Audit-Log',
        search: 'Suche nach Event, Nachricht oder Entity',
        empty: 'Keine Audit-Einträge gefunden.'
      }
    },
    partnerfox: {
      nav: {
        title: 'Partnerfox',
        dashboard: 'Dashboard',
        network: 'Netzwerk',
        cases: 'Fälle',
        rental: 'Miete',
        towing: 'Abschleppung',
        subrogation: 'Regress',
        assistance: 'Assistance',
        reporting: 'Reporting',
        audit: 'Audit'
      },
      calendar: {
        title: 'Kalender',
        empty: 'Keine Termine im gewählten Monat.',
        date: 'Datum',
        location: 'Ort',
        linked: 'Verknüpft',
        close: 'Schließen',
        goTo: 'Öffnen'
      },
      common: {
        all: 'Alle',
        loading: 'Lade Daten ...'
      },
      dashboard: {
        title: 'Partnerfox Workspace',
        subtitle: 'BPO Partnerorchestrierung für Werkstatt, Miete, Abschleppung und Regress.',
        networkTitle: 'Partnernetzwerk',
        casesTitle: 'Offene Partnerfälle',
        kpi: {
          partners: 'Partner',
          casesOpen: 'Fälle offen',
          directBilling: 'Direktabrechnung',
          subrogation: 'Regressfälle',
          recoveryRate: 'Recovery Rate'
        }
      },
      network: {
        title: 'Partnernetzwerk',
        subtitle: 'Werkstätten, Mietpartner, Abschleppung, Glas und Assistance.',
        search: 'Suche nach Partnername oder Region',
        empty: 'Keine Partner gefunden.',
        type: {
          workshop: 'Werkstatt',
          rental: 'Mietwagen',
          towing: 'Abschleppdienst',
          glass: 'Glas',
          assistance: 'Assistance'
        }
      },
      partnerDetail: {
        title: 'Partner',
        subtitle: 'Partnerprofil',
        contact: 'Kontakt',
        rating: 'Bewertung',
        avgRepairDays: 'Ø Reparaturtage',
        directBillingEnabled: 'Direktabrechnung aktiv',
        performance: 'Performance Score',
        casesHandled: 'Bearbeitete Fälle',
        timeline: 'Partner-Timeline',
        relatedCases: 'Verknüpfte Fälle'
      },
      cases: {
        title: 'Partnerfälle',
        subtitle: 'FNOL bis Abschluss mit AI-Plausibilitätscheck.',
        search: 'Suche nach Schaden- oder Kennzeichenreferenz',
        empty: 'Keine Fälle gefunden.',
        directBilling: 'Direktabrechnung',
        status: {
          FNOL: 'FNOL',
          InRepair: 'In Reparatur',
          WaitingParts: 'Wartet auf Teile',
          RentalActive: 'Mietwagen aktiv',
          Closed: 'Abgeschlossen'
        }
      },
      caseDetail: {
        title: 'Fall',
        subtitle: 'Falldetail',
        damageSummary: 'Schadenbeschreibung',
        assignedWorkshop: 'Zugeordnete Werkstatt',
        rentalPartner: 'Mietpartner',
        towingPartner: 'Abschlepppartner',
        estimatedCost: 'Kostenschätzung',
        repairDuration: 'Reparaturdauer (Tage)',
        trackingLink: 'Kunden-Tracking',
        documentsTitle: 'Demo-Dokumente',
        timelineTitle: 'Fall-Timeline',
        downloadDocument: 'Demo-Falldatei herunterladen',
        timelineNoteTitle: 'FNOL Routing-Notiz',
        timelineNoteMessage: 'FNOL-Paket geprüft und mit Mietwagen-Fallback an Werkstatt übergeben.',
        doc: {
          caseLabel: 'Fall',
          vehicleLabel: 'Fahrzeug',
          damageSummaryLabel: 'Schadenbeschreibung',
          estimatedCostLabel: 'Kostenschätzung',
          repairDurationLabel: 'Reparaturdauer',
          aiApprovedLabel: 'AI freigegeben',
          yes: 'ja',
          no: 'nein',
          footer: 'Dies ist ein generiertes Partnerfox-Demodokument.'
        }
      },
      rental: {
        title: 'Mietkoordination',
        subtitle: 'Aktive Mietfälle, Dauer und SLA-Überwachung.',
        activeRentals: 'Aktiver Mietpartner',
        days: 'Miettage',
        cost: 'Kosten',
        slaWarning: 'SLA-Warnung: Mietdauer kritisch'
      },
      towing: {
        title: 'Abschleppnetzwerk',
        subtitle: 'Dispatch und Reaktionszeiten im Überblick.',
        responseTime: 'Reaktionszeit',
        active: 'Status'
      },
      subrogation: {
        title: 'Regressmanagement',
        subtitle: 'Regresskandidaten, Wahrscheinlichkeit und Recovery-Prognose.',
        probability: 'Recovery-Wahrscheinlichkeit',
        estimate: 'Geschätzte Recovery Summe',
        projected: 'Prognose',
        status: {
          Open: 'Offen',
          Negotiation: 'Verhandlung',
          Recovered: 'Recovered',
          Lost: 'Verloren'
        },
        stageRecommendation: {
          fastTrack: 'Fast-Track Verhandlung',
          standard: 'Standardverhandlung',
          manualReview: 'Manuelle juristische Prüfung'
        }
      },
      assistance: {
        title: 'Assistance',
        subtitle: '24/7 Hotline, Dispatch und SLA-Überwachung.',
        hotline: 'Hotline Partner',
        responseTime: 'Antwortzeit',
        slaBreach: 'SLA-Verstoß'
      },
      reporting: {
        title: 'Partner Reporting',
        subtitle: 'BPO KPI für Kosten, Dauer und Recovery.',
        casesByStatus: 'Fälle nach Status',
        repairDistribution: 'Reparaturdauer-Verteilung',
        recoveryTrend: 'Recovery Trend',
        kpi: {
          avgRepair: 'Ø Reparaturdauer',
          directBilling: 'Direktabrechnung Quote',
          rentalDays: 'Miettage gesamt',
          recoveryRate: 'Recovery Rate',
          networkIndex: 'Netzwerkindex',
          costPerClaim: 'Kosten pro Fall'
        }
      },
      audit: {
        title: 'Partner Audit',
        subtitle: 'Direktabrechnung, AI-Overrides und Regress-Events.',
        search: 'Suche',
        empty: 'Keine Audit-Einträge gefunden.'
      },
      actions: {
        enableDirectBilling: 'Direktabrechnung aktivieren',
        assignRental: 'Mietpartner zuweisen',
        markCandidate: 'Regresskandidat markieren',
        saveNote: 'Notiz speichern'
      },
      aiRepair: {
        title: 'AI Plausibilitätscheck',
        subtitle: 'Kostenprüfung mit Evidenzen und Empfehlung.',
        plausibility: 'Plausibilitäts-Score',
        confidence: 'Konfidenz',
        recommendation: 'Empfehlung',
        anomalies: 'Anomalien',
        evidence: 'Evidenz',
        approve: 'Freigeben',
        manualReview: 'Manuelle Prüfung'
      }
    },
    aifox: {
      nav: {
        title: 'AI.FOX',
        dashboard: 'Dashboard',
        claimsVision: 'Schaden Vision',
        fraud: 'Betrug',
        risk: 'Risiko',
        documentAi: 'Dokumenten-AI',
        chatbot: 'Chatbot',
        governance: 'Governance',
        monitoring: 'Monitoring',
        integrations: 'Integrationen',
        audit: 'Audit'
      },
      dashboard: {
        title: 'AI.FOX Workspace',
        subtitle: 'Erklärbare KI-Module für Versicherungsprozesse.',
        kpi: {
          autoProcessed: 'Automatisch bearbeitet',
          fraudAlerts: 'Betrugsalarme',
          avgConfidence: 'Durchschn. KI-Konfidenz',
          modelDrift: 'Model Drift Risiko',
          modelDriftValue: 'Niedrig',
          aiActRisk: 'EU AI Act Risiko',
          aiActValue: 'Hohes Risiko'
        },
        modulesTitle: 'KI-Module',
        modulesSubtitle: 'Modul öffnen und AI-Workflow ansehen.',
        modules: {
          claimsVision: 'Vision AI für Schadenbilder',
          fraud: 'Betrugsmuster-Erkennung',
          risk: 'Risk & Underwriting Engine',
          documentAi: 'Dokumenten-Extraktion',
          chatbot: 'Conversational AI',
          governance: 'EU AI Act Governance',
          monitoring: 'Model Monitoring',
          integrations: 'Integrationskatalog',
          audit: 'Audit-Log'
        },
        performanceTitle: 'Model Performance',
        performanceSubtitle: 'Accuracy und Durchsatz',
        performanceChart: 'Performance-Chart',
        heatmapTitle: 'Fraud Heatmap',
        heatmapSubtitle: 'Alert-Dichte nach Region',
        heatmapChart: 'Heatmap',
        riskTitle: 'Top Risk Segmente',
        riskSubtitle: 'Höchste Risikoportfolios'
      },
      claimsVision: {
        title: 'Claims Vision AI',
        subtitle: 'Schadenerkennung & Kostenschätzung',
        uploadTitle: 'Unfallbild hochladen',
        uploadSubtitle: 'Tractable-Simulation',
        uploadHint: 'Unfallbild hier ablegen (Demo)',
        overlayLabel: 'Bounding Box Overlay',
        detectedParts: 'Erkannte Teile',
        analysisTitle: 'AI-Analyse',
        analysisSubtitle: 'Reparaturkosten & Konfidenz',
        claimSelect: 'Schadenreferenz',
        estimate: 'Geschätzte Reparaturkosten',
        severity: 'Schweregrad',
        confidence: 'Konfidenzscore',
        explainability: 'Modell erkannte Stoßfänger-Deformation mit 87% Konfidenz basierend auf visuellen Feature-Clustern.',
        approve: 'Freigeben',
        override: 'Übersteuern',
        decisionSaved: 'Entscheidung gespeichert:',
        events: {
          decisionTitle: 'Vision-AI-Entscheidung',
          decisionMessage: '{{action}} für {{claimNumber}} wurde protokolliert.'
        }
      },
      fraud: {
        title: 'Fraud Detection',
        subtitle: 'Shift / Friss Simulation',
        listTitle: 'Betrugsalarme',
        listSubtitle: 'KI-gekennzeichnete Schäden',
        detailTitle: 'Alarmdetails',
        detailSubtitle: 'Verdachtsmuster',
        score: 'Fraud Score',
        riskLevel: 'Risikostufe',
        escalate: 'Eskalieren',
        clear: 'Verdacht löschen'
      },
      risk: {
        title: 'Risk & Underwriting Engine',
        subtitle: 'Gradient AI Simulation',
        inputTitle: 'Eingabedaten',
        inputSubtitle: 'Fahrer- & Fahrzeugprofil',
        outputTitle: 'AI-Output',
        outputSubtitle: 'Risikoscore & Prämie',
        age: 'Fahreralter',
        vehicle: 'Fahrzeug',
        region: 'Region',
        lossHistory: 'Schadenhistorie',
        recalculate: 'Neu berechnen',
        riskScore: 'Risikoscore',
        premium: 'Empfohlene Prämie',
        biasCheck: 'Bias-Check',
        aiActCategory: 'EU AI Act Kategorie'
      },
      documentAi: {
        title: 'Document AI',
        subtitle: 'omni:us / Chisel Simulation',
        uploadTitle: 'Dokument hochladen',
        uploadSubtitle: 'Rechnung, Polizei- oder Policenbericht',
        uploadHint: 'Dokument hier ablegen (Demo)',
        extractionTitle: 'Extraktion',
        extractionSubtitle: 'Felder & Konfidenz',
        confidence: 'Extraktions-Konfidenz',
        gdprWarning: 'DSGVO-Hinweis: Gesundheitsdaten erkannt.',
        approve: 'Felder freigeben',
        reject: 'Ablehnen & korrigieren'
      },
      chatbot: {
        title: 'Conversational AI',
        subtitle: 'LoyJoy Simulation',
        listTitle: 'Konversationen',
        listSubtitle: 'Demo-Dialoge',
        chatTitle: 'Chat-Oberfläche',
        chatSubtitle: 'Kundenkonversation',
        transparency: 'Dies ist ein automatisiertes System.',
        confidence: 'Konfidenz',
        escalate: 'An Mensch übergeben'
      },
      governance: {
        title: 'Governance',
        subtitle: 'EU AI Act Simulation',
        classificationTitle: 'AI-System-Klassifizierung',
        classificationSubtitle: 'Risikokategorie',
        systemType: 'Klassifizierung',
        systemValue: 'Hohes Risiko',
        logging: 'Logging-Status: Aktiv',
        checklistTitle: 'Transparenz-Checkliste',
        checklistSubtitle: 'Compliance-Anforderungen',
        actionsTitle: 'Compliance-Aktionen',
        actionsSubtitle: 'Reports & Checks',
        generateReport: 'AI-Dokumentationsreport erzeugen',
        runCheck: 'Compliance-Check ausführen'
      },
      monitoring: {
        title: 'Monitoring',
        subtitle: 'Model Drift & Bias',
        accuracyTitle: 'Genauigkeit über Zeit',
        accuracySubtitle: 'Rolling 90 Tage',
        accuracyChart: 'Accuracy-Chart',
        driftTitle: 'Drift Detection',
        driftSubtitle: 'Feature-Shift',
        driftAlert: 'Drift-Alarm: Moderate Verschiebung erkannt',
        biasTitle: 'Bias-Verteilung',
        biasSubtitle: 'Nach Region & Segment',
        biasChart: 'Bias-Chart',
        alertTitle: 'Alerts',
        alertSubtitle: 'Empfehlungen',
        alertMessage: 'Alert: Drift-Schwelle überschritten',
        retrainHint: 'Empfehlung: Model-Retrain starten',
        retrain: 'Retrain empfehlen'
      },
      integrations: {
        title: 'Integrationen',
        subtitle: 'AI-Plattform-Anbindungen'
      },
      audit: {
        title: 'Audit Log',
        subtitle: 'AI-Entscheidungen & Overrides'
      },
      common: {
        noSelection: 'Kein Eintrag ausgewählt',
        selectItem: 'Bitte Eintrag auswählen.'
      }
    },

    underwriterfox: {
      nav: {
        title: 'Underwriterfox',
        dashboard: 'Dashboard',
        cases: 'Fälle',
        documents: 'Dokumente',
        rules: 'Regeln',
        rating: 'Rating',
        ai: 'KI',
        reporting: 'Reporting',
        governance: 'Governance'
      },
      status: {
        intake: 'Intake',
        screening: 'Screening',
        manualReview: 'Manuelle Prüfung',
        offer: 'Angebot',
        bound: 'Gebunden',
        declined: 'Abgelehnt'
      },
      deadlines: {
        title: 'Fristen',
        subtitle: 'Nächste Meilensteine',
        modalTitle: 'Fristdetails',
        modalClose: 'Schließen',
        items: {
          review: 'Portfolio-Review vorbereiten',
          pricing: 'Pricing-Freigabe',
          cyber: 'Cyber-Checkliste',
          brokerCall: 'Broker-Rückfrage',
          qa: 'Offer-Qualitätssicherung'
        },
        caseItems: {
          committee: {
            title: 'Portfolio-Committee Vorbereitung',
            detail: 'Risiko- und Loss-Run-Übersicht bereitstellen.'
          },
          broker: {
            title: 'Broker-Rückfrage',
            detail: 'Exposure-Aufteilung und Loss Controls bestätigen.'
          },
          pricing: {
            title: 'Pricing-Abgleich',
            detail: 'Technische Prämie vs. Zielpreis prüfen.'
          },
          qa: {
            title: 'Offer-Qualitätssicherung',
            detail: 'Wording und Endorsements validieren.'
          },
          decision: {
            title: 'Entscheidungsfrist',
            detail: 'Finale Entscheidung treffen und Angebot versenden.'
          }
        }
      },
      timeline: {
        title: 'Aktivitäten',
        subtitle: 'Audit- und Workflow-Historie',
        empty: 'Keine Timeline-Einträge.',
        type: {
          statusUpdate: 'Status',
          internalNote: 'Interne Notiz',
          externalMessage: 'Externe Nachricht',
          system: 'System'
        }
      },
      documents: {
        title: 'Dokumente',
        subtitle: 'Extrahierte Unterlagen',
        empty: 'Keine Dokumente verfügbar.',
        statusLabel: 'Status',
        status: {
          extracted: 'Extrahiert',
          needsReview: 'Prüfen',
          approved: 'Freigegeben'
        },
        view: 'Öffnen'
      },
      ai: {
        title: 'AI-Empfehlung',
        subtitle: 'Assistierende Empfehlung',
        recommendation: 'Empfehlung',
        confidence: 'Sicherheit',
        empty: 'Noch keine Empfehlung.',
        generate: 'Empfehlung erzeugen',
        decision: {
          approve: 'Freigeben',
          decline: 'Ablehnen',
          refer: 'Prüfen'
        }
      },
      common: {
        all: 'Alle'
      },
      labels: {
        broker: 'Broker',
        segment: 'Segment',
        premium: 'Prämie',
        status: 'Status',
        inception: 'Beginn',
        riskScore: 'Risiko-Score'
      },
      actions: {
        setOffer: 'Angebot setzen',
        bind: 'Binden',
        decline: 'Ablehnen'
      },
      messages: {
        offerPrepared: 'Angebot vorbereitet',
        boundAfterReview: 'Nach Prüfung gebunden',
        declinedInCommittee: 'Im Committee abgelehnt'
      },
      state: {
        notFound: 'Fall nicht gefunden.'
      },
      rating: {
        title: 'Rating',
        subtitle: 'Pricing-Inputs',
        revenue: 'Umsatz',
        lossRatio: 'Schadenquote',
        fleetSize: 'Flottengröße',
        recalculate: 'Neu berechnen',
        version: 'Version',
        techPremium: 'Technische Prämie',
        indicatedRate: 'Indizierter Satz'
      },
      rules: {
        title: 'Regelprüfung',
        subtitle: 'Regelwerk-Ergebnisse',
        outcome: {
          pass: 'Bestanden',
          warn: 'Warnung',
          fail: 'Fehlgeschlagen'
        },
        severity: {
          low: 'Niedrig',
          medium: 'Mittel',
          high: 'Hoch'
        },
        saveVersion: 'Version speichern'
      },
      dashboard: {
        title: 'Underwriterfox Workbench',
        subtitle: 'Underwriting-Workflows, Risikoanalyse und Entscheidungen.',
        needsReview: 'Fälle mit Prüfbedarf',
        needsReviewEmpty: 'Keine Fälle in Prüfung.'
      },
      cases: {
        title: 'Fälle',
        subtitle: 'Portfolio & Statusübersicht',
        filterStatus: 'Status',
        filterProduct: 'Produktlinie',
        filterAllStatus: 'Alle Status',
        filterAllProduct: 'Alle Produktlinien',
        searchPlaceholder: 'Suche nach Fall, Broker oder Versicherungsnehmer',
        empty: 'Keine Fälle gefunden.',
        table: {
          caseNumber: 'Fall',
          insured: 'Versicherungsnehmer',
          productLine: 'Produktlinie',
          status: 'Status',
          premium: 'Prämie'
        }
      },
      caseDetail: {
        title: 'Fall',
        subtitle: 'Detailansicht',
        overview: 'Übersicht',
        tabs: {
          overview: 'Übersicht',
          documents: 'Dokumente',
          timeline: 'Timeline',
          decision: 'Entscheidung'
        },
        decision: {
          label: 'Entscheidung',
          none: 'Keine Entscheidung gesetzt.'
        }
      },
      documentsPage: {
        title: 'Dokumente',
        subtitle: 'Alle Dokumente im Portfolio',
        filterStatus: 'Status',
        filterCase: 'Fall',
        searchPlaceholder: 'Suche Dokumente',
        empty: 'Keine Dokumente gefunden.',
        modalTitle: 'Dokumentdetails',
        modalClose: 'Schließen'
      },
      rulesPage: {
        title: 'Regeln',
        subtitle: 'Regelsätze & Versionierung',
        editorTitle: 'Regel-Editor (Read-only)',
        editorSubtitle: 'Änderungen werden als neue Version gespeichert.'
      },
      ratingPage: {
        title: 'Rating',
        subtitle: 'Kalkulation & Szenarien'
      },
      aiPage: {
        title: 'AI',
        subtitle: 'Empfehlungen & Zusammenfassungen'
      },
      reporting: {
        title: 'Reporting',
        subtitle: 'Portfolio-Analysen',
        riskDistribution: 'Risiko-Verteilung',
        cycleTime: 'Durchlaufzeit',
        decisions: 'Entscheidungen',
        cycleBuckets: {
          lt7: '<7T',
          d7_14: '7-14T',
          d15_30: '15-30T',
          d30plus: '30T+'
        }
      },
      governance: {
        title: 'Governance',
        subtitle: 'Audit & Nachvollziehbarkeit',
        export: 'Audit-Export',
        decisionTrace: 'Decision Trace',
        selectCase: 'Fall auswählen',
        exportedTitle: 'Audit-Export erzeugt',
        exportedMessage: 'Governance-Export für die Prüfung erstellt.'
      }
    },
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
    header: {
      login: 'Login',
      logout: 'Logout',
      nav: {
        insurance: 'Insurfox',
        broker: 'Broker',
        claimsfox: 'Claimsfox',
        aiFox: 'AI Fox',
        partnerfox: 'Partnerfox',
        fleetfox: 'Fleetfox'
      }
    },
    brokerfox: {
      nav: {
        title: 'Brokerfox',
        dashboard: 'Dashboard',
        clients: 'Clients',
        contracts: 'Contracts',
        mailbox: 'Mailbox',
        tenders: 'Tenders',
        offers: 'Offers',
        renewals: 'Renewals',
        documents: 'Documents',
        reporting: 'Reporting',
        integrations: 'Integrations',
        tasks: 'Tasks'
      },
      actions: {
        newClient: 'New client',
        newTender: 'New tender',
        newMessage: 'New message',
        uploadDocument: 'Upload document',
        generateSummary: 'Generate summary',
        approveAndSend: 'Approve & send',
        save: 'Save',
        cancel: 'Cancel'
      },
      status: {
        draft: 'Draft',
        sent: 'Sent',
        offersReceived: 'Offers received',
        negotiation: 'Negotiation',
        won: 'Won',
        lost: 'Lost'
      },
      timeline: {
        title: '360° Communication',
        subtitle: 'Messages, internal notes, and status updates in one thread.',
        externalMessage: 'External message',
        internalNote: 'Internal note',
        statusUpdate: 'Status update',
        attachment: 'Attachment',
        documentUploaded: 'Document uploaded',
        documentAssigned: 'Document assigned',
        extractionSuggested: 'Extraction suggested',
        extractionApplied: 'Extraction applied',
        signatureRequested: 'Signature requested',
        signatureSigned: 'Signature signed',
        commissionReminderSent: 'Commission reminder sent',
        integrationSync: 'Integration sync',
        taskDelegated: 'Task delegated',
        searchPlaceholder: 'Search timeline',
        messagePlaceholder: 'Capture a message or note …',
        composeTitle: 'New timeline action',
        composeSubtitle: 'AI suggestions are assistive and require approval.',
        empty: 'No timeline entries yet.'
      },
      calendar: {
        title: 'Calendar',
        subtitle: 'Upcoming deadlines and meetings.',
        upcoming: 'Upcoming',
        addEvent: 'Add event',
        eventTitle: 'Title',
        empty: 'No events found.',
        location: 'Location:',
        participants: 'Participants:',
        description: 'Description:',
        locationTbd: 'TBD',
        participantsTbd: 'TBD',
        descriptionTbd: 'TBD',
        openRelated: 'Open related item'
      },
      mailbox: {
        title: 'Mailbox',
        subtitle: 'Inbound messages and documents.',
        inboxTitle: 'Inbox',
        detailTitle: 'Detail view',
        from: 'From',
        to: 'To',
        toValue: 'Brokerfox Team',
        date: 'Date',
        status: {
          unassigned: 'Unassigned',
          assigned: 'Assigned',
          done: 'Done'
        },
        previewPlaceholder: 'Select a message to see details.',
        attachments: 'Attachments',
        assignTo: 'Assign to',
        assignAction: 'Assign',
        convertTask: 'Convert to task',
        markDone: 'Mark done',
        noSelection: 'No message selected.',
        assignedTitle: 'Mailbox assigned',
        assignedMessage: 'was assigned.',
        doneTitle: 'Mailbox done',
        doneMessage: 'Mailbox item marked as done.',
        downloadedTitle: 'Attachment downloaded',
        downloadedMessage: 'Attachment downloaded.',
        taskPrefix: 'Mailbox',
        taskCreatedTitle: 'Task created',
        taskCreatedMessage: 'Mailbox item converted to task.'
      },
      reporting: {
        title: 'Reporting',
        subtitle: 'KPI overview and trends.',
        filtersTitle: 'Filters',
        range30: 'Last 30 days',
        range90: 'Last 90 days',
        range365: 'Last year',
        allIndustries: 'All industries',
        kpi: {
          clients: 'Active clients',
          openTenders: 'Open tenders',
          offers: 'Offers received',
          renewals: 'Renewals',
          avgOffer: 'Avg days to offers',
          mailboxBacklog: 'Mailbox backlog'
        },
        days: 'days',
        timeSeriesTitle: 'Time series',
        statusTitle: 'Status distribution',
        premiumTitle: 'Premium by line',
        tasksTitle: 'Tasks by status'
      },
      ai: {
        suggestionNotice: 'Suggestion — requires human approval.',
        inputs: 'Inputs',
        inputIndustry: 'Industry',
        inputRevenue: 'Revenue',
        inputEmployees: 'Employees',
        inputLocations: 'Locations',
        inputClaims: 'Claims history',
        inputCoverages: 'Coverages',
        riskAnalysis: {
          title: 'Risk analysis',
          subtitle: 'Explainable assessment and recommendations.'
        },
        riskBreakdown: 'Risk breakdown',
        risk: {
          property: 'Property',
          liability: 'Liability',
          cyber: 'Cyber',
          businessInterruption: 'Business interruption',
          compliance: 'Compliance'
        },
        level: {
          low: 'Low',
          medium: 'Medium',
          high: 'High'
        },
        drivers: 'Drivers',
        missingInfo: 'Missing information',
        policySuggestion: {
          title: 'Policy suggestion (non-binding)',
          coverages: 'Recommended coverages',
          limits: 'Limits',
          deductibles: 'Deductibles',
          endorsements: 'Suggested endorsements'
        },
        copyToMessage: 'Copy to message',
        createTask: 'Create task',
        markReviewed: 'Mark reviewed',
        draftTitle: 'Draft message',
        draftSubtitle: 'Please review and manually approve.',
        draftTemplate: 'Suggestion for {{client}}: We recommend the listed coverages and limits based on the risk analysis.',
        approvalLabel: 'I reviewed and approve.',
        sendDraft: 'Send draft',
        draftSentTitle: 'Draft sent',
        taskCreatedTitle: 'Task created',
        taskCreatedMessage: 'AI recommendation captured as task.',
        reviewedTitle: 'AI reviewed',
        reviewedMessage: 'AI recommendation reviewed.'
      },
      empty: {
        noClients: 'No clients yet.',
        noTenders: 'No tenders yet.',
        noOffers: 'No offers yet.',
        noRenewals: 'No renewals yet.',
        noDocuments: 'No documents yet.',
        noTasks: 'No tasks yet.',
        noIntegrations: 'No integrations yet.'
      },
      state: {
        loading: 'Loading …',
        error: 'Something went wrong. Please try again.',
        notFound: 'Record not found.'
      },
      dashboard: {
        title: 'Brokerfox workspace',
        subtitle: 'Broker suite with CRM, tenders, offers, and 360° communication.',
        kpi: {
          clients: 'Clients',
          tenders: 'Open tenders',
          offers: 'Offers',
          renewals: 'Renewals (30d)',
          unread: 'Unread messages',
          tasks: 'Open tasks'
        },
        quickActions: 'Quick actions',
        quickActionsSubtitle: 'Create records or start communication.',
        goToClients: 'Go to clients',
        goToDocuments: 'Go to documents'
      },
      clients: {
        title: 'Clients & CRM',
        subtitle: 'Client overview, contacts, and programs.',
        createTitle: 'Create client',
        createSubtitle: 'Minimal CRM start with validation.',
        fieldName: 'Client name',
        fieldSegment: 'Segment',
        fieldIndustry: 'Industry',
        listTitle: 'Client list',
        listSubtitle: 'Search all active accounts.',
        searchPlaceholder: 'Search clients …',
        clientUnknown: 'Unknown client',
        segmentMissing: 'Segment missing',
        industryMissing: 'Industry missing',
        viewDetails: 'View details',
        back: 'Back to list',
        detailSubtitle: 'CRM detail with 360° communication.',
        detailSummary: 'Summary',
        segmentLabel: 'Segment',
        industryLabel: 'Industry',
        contactsTitle: 'Contacts',
        noContacts: 'No contacts yet.',
        contactRoleMissing: 'Role missing',
        programsTitle: 'Programs & policies',
        programsPlaceholder: 'Placeholder for programs, policies, and contracts.',
        digitalFolderTitle: 'Digital client folder',
        digitalFolderSubtitle: 'Documents grouped by type.',
        folder: {
          offer: 'Offers',
          loss: 'Loss history',
          policy: 'Policies',
          kyc: 'KYC',
          other: 'Other'
        },
        folderEmpty: 'No documents in this category.',
        newPlaceholder: 'e.g. Nordlicht Logistics'
      },
      tenders: {
        title: 'Tenders',
        subtitle: 'Status, requirements, and carrier steering.',
        createTitle: 'Create tender',
        createSubtitle: 'Client assignment required.',
        fieldTitle: 'Tender title',
        fieldDescription: 'Short description',
        listTitle: 'Tenders',
        listSubtitle: 'Active tenders by status.',
        clientMissing: 'Unknown client',
        back: 'Back to tenders',
        detailSubtitle: 'Requirements, carriers, and intake wizard.',
        statusTitle: 'Status',
        statusLabel: 'Current status',
        requirementsTitle: 'Requirements & coverages',
        requirementsEmpty: 'No requirements added.',
        limitLabel: 'Limit',
        deductibleLabel: 'Deductible',
        none: 'None',
        carriersTitle: 'Invited carriers',
        carriersEmpty: 'No carriers invited yet.',
        noEmail: 'No contact email',
        wizardTitle: 'Intake wizard',
        wizardSubtitle: 'Structured intake (prototype).',
        wizard: {
          requirements: 'Requirements',
          risk: 'Risk',
          timeline: 'Timeline',
          requirementsHint: 'Which coverages are mandatory?',
          requirementsField: 'Add mandatory coverage',
          riskHint: 'Capture primary risk drivers.',
          riskField: 'Add risk note',
          timelineHint: 'Which deadlines are critical?',
          timelineField: 'Add deadline'
        },
        newPlaceholder: 'e.g. Fleet program 2026'
      },
      offers: {
        title: 'Offers',
        subtitle: 'Comparison, summary, and approval.',
        listTitle: 'Offers per tender',
        listSubtitle: 'Select a tender to compare.',
        compareAction: 'Start comparison',
        compareLoggedTitle: 'Comparison logged',
        compareLoggedMessage: 'An offer comparison was started.',
        aiSummaryTitle: 'AI summary (suggestion)',
        aiSummaryMessage: 'AI generated a summary suggestion.',
        linesCount: '{{count}} coverage lines',
        compareTitle: 'Offer comparison',
        compareSubtitle: 'Only differences are highlighted.',
        aiCompareTitle: 'AI comparison (suggestion)',
        aiHint: 'AI provides suggestions only. Decision remains manual.',
        approvalLabel: 'I reviewed and approve this summary.',
        compareEmpty: 'No comparison started yet.',
        noQuote: 'No quote',
        clientUnknown: 'Unknown client',
        noOfferSelected: 'No offer selected.',
        summarySentTitle: 'Summary sent',
        summarySentMessage: 'The offer summary has been sent to the client.'
      },
      renewals: {
        title: 'Renewals',
        subtitle: 'Pipeline by due date.',
        bucket: 'Due in {{days}} days',
        detailTitle: 'Renewal details',
        detailSubtitle: 'Status and communication.',
        back: 'Back to overview',
        policyLabel: 'Policy',
        carrierLabel: 'Carrier',
        premiumLabel: 'Premium',
        statusLabel: 'Status',
        dueDateLabel: 'Due date',
        linksTitle: 'Links',
        clientLabel: 'Client',
        contractLabel: 'Contract',
        contractMissing: 'No contract linked',
        documentsTitle: 'Documents',
        nextStepsTitle: 'Next steps',
        nextSteps: {
          updateLossRuns: 'Request updated loss runs',
          confirmExposure: 'Confirm exposures and locations',
          scheduleReview: 'Schedule client review'
        },
        status: {
          upcoming: 'Upcoming',
          inReview: 'In review',
          quoted: 'Quoted',
          renewed: 'Renewed'
        },
        selectFirst: 'Select a renewal'
      },
      documents: {
        title: 'Documents & inbox',
        subtitle: 'Upload, assign, and track documents.',
        uploadTitle: 'Upload document',
        uploadSubtitle: 'Store metadata in the inbox.',
        dragDrop: 'Drag & drop files',
        dragDropHint: 'Drop files here or use the file picker.',
        entityClient: 'Client',
        entityTender: 'Tender',
        entityOffer: 'Offer',
        entityRenewal: 'Renewal',
        entityContract: 'Contract',
        listTitle: 'Document list',
        listSubtitle: 'Inbox and linked documents.',
        inboxOnly: 'Inbox only (unassigned)',
        unassigned: 'Unassigned',
        assignAction: 'Assign',
        download: 'Download',
        downloadGenerated: 'Download (generated)',
        downloaded: 'Download logged',
        downloadedMessage: 'downloaded',
        generated: 'Document generated',
        generatedMessage: 'generated'
      },
      contracts: {
        title: 'Contracts',
        subtitle: 'Portfolio and contract overview.',
        filtersTitle: 'Filters',
        filterAllLob: 'All lines',
        filterAllCarrier: 'All carriers',
        filterAllStatus: 'All statuses',
        listTitle: 'Contract list',
        listSubtitle: 'Contracts per tenant.',
        empty: 'No contracts found.',
        heroBadge: 'Hero contract',
        viewDetail: 'View',
        back: 'Back to contracts',
        detailTitle: 'Contract detail',
        summaryTitle: 'Contract summary',
        clientLabel: 'Client',
        lobLabel: 'Line of business',
        carrierLabel: 'Carrier',
        premiumLabel: 'Premium',
        statusLabel: 'Status',
        documentsTitle: 'Contract documents',
        tasksTitle: 'Contract tasks',
        sectionTitle: 'Contracts',
        sectionSubtitle: 'Client contracts',
        createAction: 'Create contract',
        status: {
          active: 'Active',
          pending: 'Pending',
          cancelled: 'Cancelled'
        }
      },
      commissions: {
        title: 'Commissions',
        chartTitle: 'Commissions (expected vs paid)',
        byCarrierTitle: 'Outstanding by carrier',
        outstandingTitle: 'Outstanding commissions',
        sendReminder: 'Send reminder',
        noneOutstanding: 'No outstanding commissions.',
        outstanding: 'Outstanding'
      },
      extraction: {
        title: 'Extracted data',
        suggestionNotice: 'Suggestion — please review.',
        suggestedClient: 'Suggested client',
        suggestedContract: 'Suggested contract',
        confidence: 'Confidence',
        fieldsTitle: 'Extracted fields',
        approval: 'I reviewed and approve applying the extraction.',
        apply: 'Apply extraction'
      },
      signature: {
        title: 'E-signature',
        statusLabel: 'Status',
        requestAction: 'Request signature',
        recipientName: 'Recipient name',
        recipientEmail: 'Recipient email',
        markSigned: 'Mark as signed',
        status: {
          DRAFT: 'Draft',
          SENT: 'Sent',
          SIGNED: 'Signed'
        }
      },
      demo: {
        title: 'Demo Utilities',
        subtitle: 'Switch tenant or regenerate demo data.',
        tenant: 'Tenant',
        reset: 'Reset demo data',
        seedAll: 'Seed all demo tenants'
      },
      integrations: {
        title: 'Integrations',
        subtitle: 'Registry for external systems.',
        actionsTitle: 'Integration actions',
        actionsSubtitle: 'Simulate BiPRO, GDV, and portal fetch.',
        runAction: 'Run',
        preview: 'Preview',
        apply: 'Apply',
        biproAction: 'BiPRO sync',
        biproHint: 'Sync contract data from carrier systems.',
        gdvAction: 'GDV import',
        gdvHint: 'Simulate CSV import and verify contract data.',
        portalAction: 'Carrier portal fetch',
        portalHint: 'Creates new mailbox items with offers.',
        listTitle: 'Integrations',
        listSubtitle: 'Manage status per interface.',
        connected: 'Connected',
        notConnected: 'Not connected'
      },
      tasks: {
        title: 'Tasks & workflows',
        subtitle: 'Lightweight board for work items.',
        createTitle: 'Create task',
        createSubtitle: 'Optional entity link.',
        fieldTitle: 'Title',
        fieldDescription: 'Description',
        owner: 'Owner',
        ownerMissing: 'No owner',
        dueDate: 'Due date',
        delegate: 'Delegate to',
        delegateAction: 'Delegate',
        linkClient: 'Link client',
        linkTender: 'Link tender',
        linkRenewal: 'Link renewal',
        linkContract: 'Link contract',
        todo: 'To do',
        inProgress: 'In progress',
        done: 'Done',
        noDescription: 'No description'
      }
    },
    roles: {
      title: 'Insurfox AI IaaS',
      subtitle: 'AI-native Insurance IaaS platform for core insurance processes.',
      logout: 'Logout',
      view: 'View',
      startJourney: 'Start journey',
      registrationCardTitle: 'Registration',
      registrationCardSubtitle: 'Launch the guided, AI-supported journey to onboard partners or customers with ease.',
      brokerPortal: 'Broker CRM',
      sections: {
        overview: 'Role overview',
        processes: 'Processes',
        internal: 'Internal documentation',
        internalDocs: 'Internal documentation',
        governance: 'Governance',
        presentations: 'Presentations',
        development: 'Development',
        projectLanding: 'Project landing page'
      },
      internalDocs: {
        title: 'Internal documentation',
        subtitle: 'Overview of internal materials and resources.'
      },
      overviewGroups: {
        insurance: 'Insurance',
        fleet: 'Fleet',
        logistics: 'Logistics',
        broker: 'Broker'
      },
      internalAuth: {
        title: 'Internal documentation',
        subtitle: 'Enter the credentials to continue.',
        username: 'Username',
        pin: 'PIN',
        submit: 'Unlock',
        error: 'Check your credentials.'
      },
      cards: {
        mvp: {
          title: 'MVP overview',
          description: 'Quick access to the core MVP process steps.'
        },
        claims: {
          title: 'Claims Manager',
          description: 'Claims handler cockpit for fast decisions, approvals, partner orchestration and AI insights.',
          cta: 'Open'
        },
        underwriter: {
          title: 'Underwriter',
          description: 'Portfolio steering, underwriting corridors and clear referral logic within the carrier framework.'
        },
        legal: {
          title: 'Legal',
          description: 'Binder wording, delegated authority scope, and compliance controls aligned to carrier standards.'
        },
        finance: {
          title: 'Finance',
          description: 'Capital efficiency, KPI transparency and disciplined portfolio economics.'
        },
        claimProcess: {
          title: 'Claims Process',
          description: 'Demo chatbot with location capture, automatic timestamps, and structured intake.',
          cta: 'Start'
        },
        onboarding: {
          title: 'Onboarding',
          description: 'Current onboarding flow with wizard steps and progress tracking.'
        },
        registration: {
          title: 'Registration',
          description: 'Capture the email address as the start of the process.'
        },
        profile: {
          title: 'User Profile',
          description: 'Overview and maintenance of captured user and company data.'
        },
        identification: {
          title: 'User Identification',
          description: 'Verify ID document and match with selfie.'
        },
        regulatoryGovernance: {
          title: 'Regulatory & AI Governance Framework',
          description: 'Regulatory deck for supervisors, auditors, and compliance stakeholders.'
        },
        auditAppendix: {
          title: 'Audit Appendix',
          description: 'Audit-ready reference with responsibilities, controls, and governance evidence.'
        },
        strategicDeepDive: {
          title: 'Strategic Technology & AI Governance Deep Dive',
          description: 'Strategic deep dive into architecture and AI governance.'
        },
        insurfoxWhitepaper: {
          title: 'Insurfox Whitepaper',
          description: 'AI-driven insurance platform for logistics, transport, and mobility.'
        },
        businessModelAntares: {
          title: 'Business Model Antares',
          description: 'Insurfox x Antares: roles, value creation, and revenue logic in the co-branding model.'
        },
        businessModelAntaresTest: {
          title: 'Business Model Antares (Test)',
          description: 'Test page for the Business Model Antares PDF export.'
        },
        marketOverviewLogistics: {
          title: 'Market Overview Logistics',
          description: 'Investor and carrier-grade market overview for fleet, logistics, and freight.'
        },
        requirementsCatalog: {
          title: 'Requirements Catalog',
          description: 'Short version for insurer collaboration on the Insurfox AI IaaS platform.'
        },
        questionsQic: {
          title: 'QIC Questions',
          description: 'Questionnaire for collaboration with Insurfox AI IaaS.'
        },
        setup: {
          title: 'Setup',
          description: 'Target architecture, platform layers, and integration principles for Insurfox IaaS.'
        },
        landingSitemap: {
          title: 'Sitemap',
          description: 'Sitemap and navigation structure of the Insurfox landing page.'
        },
        landingTools: {
          title: 'Tools list',
          description: 'Technology and tooling overview of the landing page.'
        },
        partner: {
          title: 'Partner Networks',
          description: 'Nurture relationships with assessors, workshops, and service partners.'
        },
        featureTree: {
          title: 'Feature Tree',
          description: 'Structured overview of the platform capabilities.',
          cta: 'Open'
        },
        getQuote: {
          title: 'Get a Quote',
          description: 'Multi-step quote flow for carrier liability and vehicles.',
          cta: 'Open'
        },
        policyPurchase: {
          title: 'Purchase Policy',
          description: 'Checkout flow for policies and payment details.'
        },
        whitepaper: {
          title: 'AI Whitepaper',
          description: 'Native AI systems on sovereign IaaS for insurers, logistics leaders, and investors.'
        },
        intern: {
          title: 'Internal',
          description: 'Password-protected playbooks, standards, and technical guidelines.'
        },
        aiOnboarding: {
          title: 'AI Onboarding',
          description: 'Developer view of AI usage within onboarding flows.'
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
        },
        brokerPortal: {
          title: 'Broker CRM',
          description: 'CRM and back-office workspace for broker portfolios and client relationships.'
        },
        logistics: {
          title: 'Logistics',
          description: 'Manage transports, routes, coverage and incidents with real-time status and AI alerts.',
          cta: 'View'
        },
        brokerAdmin: {
          title: 'Broker Administration',
          description: 'Admin dashboard for brokers with portfolio, team, and compliance oversight.'
        }
      }
    },
    mvp: {
      title: 'MVP overview',
      subtitle: 'All process steps at a glance — click through the MVP flow.',
      nextStep: 'Next step',
      steps: {
        registration: {
          title: 'Registration',
          description: 'Capture the email address and start onboarding.'
        },
        onboarding: {
          title: 'Onboarding',
          description: 'Wizard to capture personal and company details.'
        },
        getQuote: {
          title: 'Get a quote',
          description: 'Multi-step request for insurance and vehicle details.'
        },
        policyPurchase: {
          title: 'Purchase policy',
          description: 'Binding checkout and payment details for the policy.'
        },
        authentication: {
          title: 'User authentication',
          description: 'Login, access, and role checks for the MVP flow.'
        },
        claimProcess: {
          title: 'Claim intake',
          description: 'Chat-based intake with location, timestamps, and structured data.'
        },
        profile: {
          title: 'User profile',
          description: 'Personal and organization details at a glance.'
        },
        aiModules: {
          title: 'AI modules',
          description: 'Automation, prioritization, and AI insights for decision makers.'
        },
        dashboards: {
          title: 'Dashboards',
          description: 'KPIs, reports, and status overviews for the MVP.'
        }
      }
    },
    profile: {
      title: 'Profile',
      subtitle: 'Complete your profile step by step.',
      overview: {
        title: 'My profile',
        subtitle: 'Manage your data and access additional areas.',
        edit: 'Edit profile',
        open: 'Open',
        back: 'Back to overview',
        reset: 'Reset data',
        summaryTitle: 'Your base data',
        summarySubtitle: 'A quick overview of the key information.',
        sections: {
          title: 'Sections',
          onboarding: 'Onboarding',
          personal: 'Personal details',
          company: 'Company details',
          insurances: 'My insurances',
          fleet: 'My fleet',
          locations: 'My locations'
        }
      },
      onboarding: {
        title: 'Onboarding',
        subtitle: 'Capture personal and company details.',
        cardTitle: 'Onboarding',
        cardSubtitle: 'Complete your data in two steps.',
        start: 'Start onboarding',
        resume: 'Resume onboarding',
        completed: 'Profile completed',
        incomplete: 'Onboarding not completed',
        requiredHint: 'Required field'
      },
      stepLabel: 'Step {{current}} of {{total}}',
      saved: 'Saved',
      passwordMismatch: 'Passwords do not match.',
      registration: {
        title: 'Registration',
        emailHint: 'This email was captured during registration.',
        consentHint: 'Data processing consent is recorded.'
      },
      progress: {
        title: 'Completion',
        caption: '{{percent}}% complete'
      },
      steps: {
        personal: {
          title: 'Personal details',
          subtitle: 'Contact data, language and security settings.'
        },
        company: {
          title: 'Company details',
          subtitle: 'Company and address details for the contract.'
        }
      },
      actions: {
        back: 'Back',
        next: 'Next',
        save: 'Save changes',
        finish: 'Finish profile',
        later: 'Continue later',
        skip: 'Skip'
      },
      fields: {
        email: 'Email address',
        privacyConsent: 'Privacy consent',
        companyName: 'Company name incl. legal form',
        legalForm: 'Legal form',
        street: 'Street',
        houseNumber: 'House number',
        addressAdditional: 'Address line 2',
        zip: 'Postal code',
        city: 'City',
        country: 'Country',
        vatId: 'VAT ID',
        directorFirstName: 'Managing director first name',
        directorLastName: 'Managing director last name',
        salutation: 'Salutation',
        contactFirstName: 'First name',
        contactLastName: 'Last name',
        phoneCountryCode: 'Country code',
        phone: 'Phone',
        language: 'Language',
        password: 'Password',
        passwordConfirm: 'Confirm password',
        advisorCode: 'Advisor code',
        kycBranch: 'Branch in sanctioned region?',
        kycDirector: 'Director or board in sanctioned region?',
        kycBusiness: 'Business with sanctioned regions?'
      },
      options: {
        yes: 'Yes',
        no: 'No',
        select: 'Please select',
        language: {
          de: 'German',
          en: 'English'
        }
      },
      placeholders: {
        insurances: 'This is where your insurances will appear.',
        fleet: 'This is where your fleet will appear.',
        locations: 'This is where your locations will appear.'
      }
    },
    policyPurchase: {
      title: 'Purchase policy',
      subtitle: 'Checkout flow for policies and payment details.',
      placeholder: 'The policy purchase flow will be built here.'
    },
    whitepaper: {
      kicker: 'Whitepaper',
      heroTitle: 'Native AI systems on sovereign IaaS',
      heroSubtitle: 'Future-proof AI adoption for insurers, logistics leaders, and investors.',
      heroChip: 'Sovereign AI Layer',
      summaryTitle: 'Executive summary',
      summarySubtitle: 'Strategic context for decision makers.',
      summaryBody:
        'This whitepaper outlines native AI systems on a sovereign IaaS platform for insurers, logistics operators, and investors. The goal is to deploy AI efficiently, safely, and at scale while staying compliant.',
      metrics: {
        ai: 'Native AI stacks',
        sovereign: 'Data sovereignty',
        scalable: 'Scalable & auditable'
      },
      useCases: {
        title: 'Permitted AI use cases',
        subtitle: 'Focused on high-value, compliant applications with measurable impact.',
        risk: 'Risk scoring',
        claim: 'Claim forecasting',
        fraud: 'Fraud detection',
        docs: 'Document analysis',
        maintenance: 'Predictive maintenance',
        route: 'Route optimization'
      },
      sections: {
        context: {
          title: 'Current situation',
          body: 'AI becomes the key competitive factor in insurance and logistics, while requirements for privacy, transparency, and liability rise.'
        },
        native: {
          title: 'Native AI on IaaS',
          body: 'Native AI runs fully inside the infrastructure. Data, models, and decisions stay controlled and auditable by operators.'
        },
        ecosystem: {
          title: 'Ecosystem participants',
          body: 'Insurers, reinsurers, fleet operators, logistics firms, and partners access AI services through role-based controls.'
        },
        useCases: {
          title: 'AI use cases',
          body: 'Risk scoring, claim forecasting, fraud detection, document analysis, predictive maintenance, and route optimization.'
        },
        data: {
          title: 'Data foundation',
          body: 'Vehicle, telematics, maintenance, and claims data are used. Personal data is pseudonymized and purpose-bound.'
        },
        governance: {
          title: 'Governance & compliance',
          body: 'Data sovereignty, model versioning, audit trails, and readiness for the EU AI Act are built in.'
        },
        investors: {
          title: 'Investor view',
          body: 'High scalability, regulatory tailwinds, and strong customer lock-in make this model attractive.'
        },
        conclusion: {
          title: 'Conclusion',
          body: 'Native AI on IaaS combines innovation, security, and scalability to create sustainable value.'
        }
      },
      cta: {
        primary: 'Request whitepaper',
        secondary: 'Talk to an expert',
        title: 'Ready for sovereign AI?',
        subtitle: 'Get the whitepaper and discuss your AI stack with our team.'
      }
    },
    aiOnboarding: {
      kicker: 'AI Onboarding',
      title: 'AI inside the onboarding flow',
      subtitle: 'How the engineering team uses AI to improve data quality, compliance, and speed.',
      heroChip: 'Developer View',
      summaryTitle: 'Overview',
      summarySubtitle: 'Technical perspective on AI-assisted onboarding.',
      sections: {
        intent: {
          title: 'Intent & value',
          body: 'AI supports onboarding with validation, suggestions, and prioritization — no autonomous decisions.'
        },
        pipeline: {
          title: 'Data pipeline',
          body: 'Inputs are validated, pseudonymized, and transformed into structured features before model scoring.'
        },
        guardrails: {
          title: 'Guardrails & compliance',
          body: 'Allowlists, audit trails, and model approvals are enforced in code.'
        },
        tools: {
          title: 'Tooling & monitoring',
          body: 'Model registry, feature store, and logging provide transparency and reproducibility.'
        },
        rollout: {
          title: 'Rollout strategy',
          body: 'Feature flags, shadow runs, and human-in-the-loop reviews secure quality in production.'
        }
      },
      cta: {
        primary: 'View architecture',
        secondary: 'Contact team',
        title: 'Next step',
        subtitle: 'Discuss AI onboarding with our engineering team.'
      },
      architectureTitle: 'Architecture overview'
    },
    identification: {
      title: 'User identification',
      subtitle: 'Identity verification with document scan, authenticity checks, and selfie match.',
      progress: 'Progress',
      steps: {
        start: 'Start',
        capture: 'Document scan',
        verification: 'Verification',
        selfie: 'Selfie match',
        summary: 'Summary'
      },
      intro: {
        title: 'Start verification',
        body: 'We guide you through the process. Please have your ID ready and ensure good lighting.'
      },
      document: {
        typeId: 'ID card',
        typePassport: 'Passport',
        typeOther: 'Other document'
      },
      capture: {
        title: 'Scan document',
        subtitle: 'Upload a photo of the front and back.',
        front: 'Front side',
        back: 'Back side',
        placeholder: 'No image yet'
      },
      verify: {
        title: 'Verify document',
        subtitle: 'Authenticity, MRZ, and issuing country are checked.',
        issuing: 'Issuing country',
        authenticity: 'Authenticity check',
        mrz: 'MRZ extraction',
        failed: 'Verification failed. Please recheck the document photos.'
      },
      selfie: {
        title: 'Capture selfie',
        subtitle: 'Take a selfie to match against the document.',
        capture: 'Selfie file',
        overlay: 'Align your face inside the frame'
      },
      summary: {
        title: 'Result',
        subtitle: 'Verification record and outcome.',
        status: 'Status',
        docType: 'Document type',
        country: 'Issuing country',
        audit: 'Audit ID',
        ocr: 'OCR extraction',
        notice: 'All verification signals were logged. If it fails, contact support.'
      },
      status: {
        ok: 'Passed',
        pending: 'Pending',
        success: 'Success',
        failed: 'Failed'
      },
      actions: {
        start: 'Start process',
        back: 'Back',
        next: 'Next',
        verify: 'Run verification',
        restart: 'Restart'
      },
      ocr: {
        title: 'OCR extraction',
        name: 'Name',
        number: 'Document number',
        dob: 'Date of birth',
        expiry: 'Expiry date',
        nationality: 'Nationality'
      },
      camera: {
        capture: 'Open camera',
        take: 'Capture photo',
        guide: 'Align the document inside the frame',
        slot: 'ID frame',
        error: 'Camera could not be started.',
        title: {
          front: 'Capture front side',
          back: 'Capture back side',
          selfie: 'Capture selfie'
        }
      }
    },
    nativeAi: {
      kicker: 'INSURFOX AI IaaS',
      title: 'Insurfox native AI',
      subtitle: 'Secure, native AI for insurers, InsurTech & health-care.',
      heroChip: 'Regulated AI Stack',
      deckTitle: 'Presentation',
      deckSubtitle: 'Business and compliance deck for regulated markets.',
      slides: {
        1: {
          title: 'Insurfox AI IaaS',
          body: 'The AI-native insurance platform for regulated markets.<br/>Secure, GDPR- & BaFin-compliant AI for Insurance, Mobility & Health.'
        },
        2: {
          title: 'Executive Summary',
          body: 'Insurfox is a fully integrated Insurance-IaaS.<br/>AI is a native part of the platform, not an external add-on.<br/>Sensitive data is handled securely, controlled, and compliant.<br/>No external AI vendors, no data or model leakage.<br/><strong>Bottom line:</strong> Productive AI without regulatory risk.'
        },
        3: {
          title: 'Core market problem',
          body: 'Fragmented systems, external AI SaaS & hyperscalers, unclear data flows, black-box decisions.<br/><strong>Risks:</strong> GDPR violations, regulatory flags, loss of AI/IP control, reputational risk.'
        },
        4: {
          title: 'Insurfox approach',
          body: 'AI as infrastructure, not a tool.<br/>One platform for all insurance processes.<br/>Integrated broker & partner ecosystems.<br/>Native AI inside the IaaS.<br/>Clear split between decision support and decision authority.'
        },
        5: {
          title: 'High-level architecture',
          body: 'INSURFOX IaaS connects insurers, broker portal, core engine, and native AI layer.<br/>No external AI systems, no data sharing.'
        },
        6: {
          title: 'What “native AI” means',
          body: 'Own AI models, training pipelines, inference services, and model registries.<br/>No external AI APIs, no third-party training, no model sharing.'
        },
        7: {
          title: 'AI use cases (core)',
          body: 'Risk & pricing, fraud detection, portfolio & loss ratio analytics, claims & process optimization, renewal signals.<br/>Always decision support.'
        },
        8: {
          title: 'Sensitive data',
          body: '<strong>Insurfox does not exclude sensitive data – it makes it safely usable.</strong><br/>Health data, biometrics, mobility & telematics data.'
        },
        9: {
          title: 'Legal basis',
          body: 'Sensitive data only under legal basis, explicit consent, and clear insurance purpose.<br/>Principles: purpose limitation, data minimization, transparency, deletion policies.'
        },
        10: {
          title: 'Sensitive data architecture',
          body: 'Sensitive Data Zone with isolated data rooms, own AI models, and separate training pipelines.'
        },
        11: {
          title: 'AI governance (BaFin)',
          body: 'AI recommends, not decides. Human-in-the-loop required. Explainable outcomes. Full audit trails.<br/>No auto rejection or termination.'
        },
        12: {
          title: 'Data protection & security',
          body: 'Tenant isolation, role-based access, pseudonymization, encryption, logging of AI outputs.<br/>Important: models never learn across customers.'
        },
        13: {
          title: 'Interfaces',
          body: 'Inbound: policy data, claims history, tariffs & rules, optional real-time data.<br/>Outbound: risk scores, pricing recommendations, fraud insights, decision dashboards.'
        },
        14: {
          title: 'Historical data requirements',
          body: '<strong>Required:</strong> policies & terms, claim types & amounts, processing history, risk data.<br/><strong>Optional:</strong> telematics, process times, event data, health programs.'
        },
        15: {
          title: 'Why no external AI?',
          body: 'External AI means data leakage, loss of control, IP risks, regulatory uncertainty.<br/>Insurfox means full data sovereignty, full AI control, full auditability.'
        },
        16: {
          title: 'Benefits for insurers',
          body: 'Faster underwriting, better loss ratios, less fraud, clean regulator communication, future-proof AI strategy.'
        },
        17: {
          title: 'Benefits for investors',
          body: 'Deep tech moat, regulatory barrier, scalable IaaS model, strong customer lock-in, AI + insurance IP.'
        },
        18: {
          title: 'EU AI Act readiness',
          body: 'Prepared for high-risk AI, documented governance, traceable decision logic, audit & reporting capability.<br/>Insurfox is EU AI Act ready.'
        },
        19: {
          title: 'Summary',
          body: 'Insurfox makes AI in insurance productive, safe, and regulator-approved — even with sensitive data.'
        },
        20: {
          title: 'Closing',
          body: 'Insurfox AI IaaS — the controlled answer to AI in regulated insurance markets.'
        }
      }
    },
    featureTree: {
      title: 'Feature tree',
      subtitle: 'Structured overview of the platform across claims and partner networks.',
      sections: {
        intake: {
          title: 'Claim intake',
          subtitle: 'Intake, review, and routing.',
          items: {
            claimIntake: 'Digital claim intake',
            coverageCheck: 'Coverage validation',
            slaRules: 'SLA and escalation rules',
            taskRouting: 'Task routing & prioritization'
          }
        },
        partners: {
          title: 'Partner network',
          subtitle: 'Repair shops, surveyors, service vendors.',
          items: {
            partnerDirectory: 'Partner directory',
            onboarding: 'Onboarding & contracts',
            capacity: 'Capacity steering',
            performance: 'Performance & quality'
          }
        },
        media: {
          title: 'Media & documents',
          subtitle: 'Photos, evidence, and files.',
          items: {
            photoUpload: 'Photo & video uploads',
            damageAi: 'Damage AI',
            documentHub: 'Document hub',
            versioning: 'Versioning & approvals'
          }
        },
        finance: {
          title: 'Costs & invoices',
          subtitle: 'Estimates, approvals, payments.',
          items: {
            estimates: 'Estimates',
            invoices: 'Invoice review',
            approvals: 'Approval workflows',
            reserves: 'Reserve management'
          }
        },
        repair: {
          title: 'Repair control',
          subtitle: 'Status, parts, handover.',
          items: {
            statusTracking: 'Live status',
            parts: 'Parts procurement',
            milestones: 'Milestones',
            handover: 'Vehicle handover'
          }
        },
        comms: {
          title: 'Communication',
          subtitle: 'Chat, questions, notifications.',
          items: {
            liveChat: 'Live chat',
            questions: 'Questions & tasks',
            notifications: 'Notifications',
            auditTrail: 'Audit trail'
          }
        },
        analytics: {
          title: 'Analytics & AI',
          subtitle: 'KPIs, risks, insights.',
          items: {
            kpis: 'KPI dashboards',
            trendReports: 'Trend reports',
            benchmarks: 'Benchmarking',
            fraudSignals: 'Fraud signals'
          }
        },
        compliance: {
          title: 'Compliance',
          subtitle: 'Security & governance.',
          items: {
            roles: 'Roles & permissions',
            gdpr: 'GDPR & privacy',
            accessLogs: 'Access logs',
            retention: 'Retention policies'
          }
        }
      }
    },
    getQuote: {
      title: 'Get a quote',
      subtitle: 'Please provide your details. We will email your quote to you.',
      progress: {
        title: 'COMPARIOSN',
        subtitle: 'Request a quote',
        step: 'Step 1 of 10'
      },
      company: {
        title: 'Your details',
        subtitle: 'Where is your company located?',
        locationLabel: 'Select a country',
        locationPlaceholder: 'Select a country',
        location: {
          de: 'Germany',
          eu: 'Europe'
        }
      },
      vehicles: {
        title: 'Insured vehicles',
        subtitle: 'Count, weight, and coverage area.',
        primary: 'Carrier liability insurance',
        additional: 'Additional insured vehicles',
        count: 'Number of insured vehicles',
        weight: 'Gross vehicle weight',
        regionLabel: 'Territory',
        add: 'Add another vehicle group',
        region: {
          de: 'Germany',
          eu: 'Europe'
        }
      },
      deductible: {
        title: 'Deductible and risks',
        subtitle: 'Select your options.',
        amountLabel: 'Deductible amount',
        courier: 'Liability coverage for courier/express parcel transport',
        cold: 'Liability coverage for refrigerated cargo with equipped vehicles'
      },
      preInsurer: {
        title: 'Previous insurer',
        subtitle: 'Previous coverage details',
        exists: 'Were you insured in the last 5 years?',
        name: 'Insurer name',
        number: 'Policy number'
      },
      summary: {
        title: 'Premium',
        subtitle: 'For a calendar year',
        netAnnual: 'Annual net premium',
        tax: 'Insurance tax (Germany 19%)',
        grossAnnual: 'Annual gross premium',
        contract: 'Contract term'
      },
      confirm: {
        title: 'Request a quote',
        subtitle: 'Missing details? Check required fields.',
        privacy: 'I have read the privacy policy and agree.',
        submit: 'Request a quote'
      },
      yes: 'Yes',
      no: 'No'
    },
    claimProcess: {
      title: 'Claims Process',
      subtitle: '',
      chatTitle: 'Claims Intake Assistant',
      chatSubtitle: '',
      chatStatus: 'Live',
      intro: 'Hello. I will help you file your claim.',
      timeStampMessage: 'Timestamp logged: {{date}} · {{time}}.',
      askTime: 'When did it happen?',
      timeNow: 'Just now',
      timeOther: 'Another time',
      timeOtherPlaceholder: 'Enter date and time …',
      confirmTime: 'Confirm time',
      askLocationChoice: 'Did it happen at your current location?',
      locationCurrent: 'Current location',
      locationOther: 'Other location',
      askLocation: 'Share location for address check?',
      askAddressConfirm: 'Review and confirm the address.',
      addressConfirmed: 'Address confirmed.',
      confirmAddress: 'Confirm address',
      askPhotos: 'Please upload damage photos.',
      photosUploaded: '{{count}} photo(s) uploaded.',
      photosSkipped: 'No photos provided.',
      skipPhotos: 'Continue without photos',
      askPersonDetails: 'Please provide first name, last name, and license plate.',
      confirmPersonDetails: 'Confirm details',
      askDescription: 'Briefly describe what happened.',
      firstName: 'First name',
      lastName: 'Last name',
      licensePlate: 'License plate',
      locationButton: 'Share location',
      locationPending: 'Requesting location …',
      locationPendingShort: 'Locating …',
      locationGranted: 'Location captured: {{address}}',
      locationDenied: 'Location unavailable — please add the address manually.',
      locationUnknown: 'Not captured',
      nextPrompt: 'We will start with the location check.',
      botAck: 'Thanks, noted.',
      claimNumberMessage: 'Your claim number: {{claimNumber}}.',
      inputPlaceholder: 'Short description …',
      openManager: 'Open claim manager',
      send: 'Submit',
      back: 'Back',
      street: 'Street',
      houseNumber: 'House number',
      postalCode: 'Postal code',
      city: 'City',
      upload: 'Upload photos',
      uploadEmpty: 'No photos selected',
      uploadCount: '{{count}} photo(s) selected',
      valuePending: 'Pending',
      infoTitle: 'Live check',
      infoSubtitle: '',
      infoLocation: 'Location',
      infoDate: 'Date',
      infoTime: 'Time',
      infoClaimNumber: 'Claim number',
      infoPhotos: 'Photos',
      infoDescription: 'Incident summary',
      infoIncidentTime: 'Incident time',
      infoFirstName: 'First name',
      infoLastName: 'Last name',
      infoLicensePlate: 'License plate',
      infoStatus: 'Status',
      statusOpen: 'Open',
      demoHint: 'Timestamp and location are attached to the claim ticket.'
    },
    logisticsLanding: {
      badge: 'Insurfox IaaS',
      title: 'IaaS Logistics Portal',
      subtitle: 'Real-time transport status, cargo insurance and incident handling – in one platform.',
      login: 'Login',
      kpi: {
        liveShipments: 'Live shipments',
        coverageRate: 'Coverage rate',
        openIncidents: 'Open incidents',
        etaDeviation: 'Avg. ETA deviation'
      },
      kpiValues: {
        liveShipments: '128',
        coverageRate: '92%',
        openIncidents: '7',
        etaDeviation: '18m'
      },
      cards: {
        realtime: {
          title: 'Real-time transport tracking',
          body: 'ETA, route, status changes and alerts per shipment and customer.'
        },
        coverage: {
          title: 'Cargo insurance & coverage',
          body: 'Carrier’s liability, cargo and add-ons per order – transparent and auditable.'
        },
        incidents: {
          title: 'Claims & incidents',
          body: 'Theft, damage, delays, temperature breaches – incl. docs, photos and partners.'
        },
        thirdparty: {
          title: 'Third party & shippers',
          body: 'Shippers, contacts, SLAs and billing – directly within each transport.'
        },
        ai: {
          title: 'AI recommendations & alerts',
          body: 'Proactive signals on risk, fraud, cost, routing and coverage gaps.'
        },
        routes: {
          title: 'Routes & risk',
          body: 'Route profiles, risk zones, weather and traffic indicators – including live alerts per lane.'
        }
      },
      preview: {
        title: 'Live Dashboard Preview',
        eta: 'ETA',
        temp: 'Temp',
        customs: 'Customs',
        footer: 'Demo data with live KPI trend (ETA, temperature, customs).'
      },
      previewValues: {
        eta: '18m',
        temp: '+2°C',
        customs: 'Cleared'
      }
    },
    logisticsApp: {
      title: 'Logistics Cockpit',
      subtitle: 'Orders, routes, coverage and incidents at a glance',
      sections: {
        overview: 'Overview',
        shipments: 'Live shipments',
        coverage: 'Insurance & coverage',
        incidents: 'Claims & incidents',
        thirdParty: 'Third party',
        documents: 'Documents'
      },
      kpi: {
        activeShipments: 'Active shipments',
        delayed: 'Delayed',
        incidents: 'Open incidents',
        coverageOk: 'Coverage OK',
        highRisk: 'High risk',
        avgEtaDeviation: 'Avg. ETA deviation'
      },
      filters: {
        search: 'Search shipment, route or customer …',
        statusLabel: 'Status',
        statusAll: 'All',
        statusInTransit: 'In transit',
        statusDelayed: 'Delayed',
        statusDelivered: 'Delivered',
        statusIncident: 'Incident'
      },
      table: {
        shipments: {
          title: 'Live shipments',
          col: {
            shipment: 'Shipment',
            customer: 'Customer',
            route: 'Route',
            status: 'Status',
            eta: 'ETA',
            coverage: 'Coverage',
            cargo: 'Cargo',
            value: 'Value',
            thirdParty: 'Third party',
            aiHint: 'AI hint'
          },
          empty: 'No demo data found.'
        },
        statusLabels: {
          inTransit: 'In transit',
          delayed: 'Delayed',
          delivered: 'Delivered',
          incident: 'Incident'
        },
      coverageLabels: {
        covered: 'Covered',
        partial: 'Partial',
        notCovered: 'Not covered'
      }
    },
    shipmentsCopy: {
      cargo: {
        electronics: 'Electronics',
        pharma: 'Pharma',
        fashion: 'Fashion',
        chemicals: 'Chemicals',
        chilled: 'Food (chilled)',
        automotive: 'Automotive',
        retailMixed: 'Retail (mixed)',
        seafood: 'Seafood'
      },
      notes: {
        tempStable: 'Temp stable / SLA OK',
        customsWait: 'Waiting for customs slot',
        theftInvestigation: 'Incident: theft under investigation',
        podSigned: 'Proof of delivery signed',
        temp3c: 'Temperature 3 °C',
        ferrySlot: 'Waiting for ferry slot',
        borderCrossed: 'Border crossed',
        tempDeviation: 'Temperature deviation alert'
      },
      eta: {
        delayed45: '+45m',
        delayed25: '+25m',
        investigating: 'Investigating',
        hold: 'On hold'
      }
    },
    coverage: {
      title: 'Insurance & coverage',
      policyId: 'Policy',
      limit: 'Limit',
      deductible: 'Deductible',
      validity: 'Validity',
      status: 'Status',
      covered: 'Covered',
      partial: 'Partial',
      notCovered: 'Not covered',
      statusLabels: {
        active: 'Active',
        selective: 'Selective',
        inactive: 'Inactive'
      }
    },
    coverageCards: {
      liability: { title: 'Carrier’s liability' },
      cargo: { title: 'Cargo insurance' },
      addons: { title: 'Add-ons' }
    },
    incidents: {
      title: 'Incidents & claims',
      subtitle: 'Current incidents & investigations',
      openIncident: 'Open incident',
      labels: {
        status: 'Status',
        cost: 'Cost',
        documents: 'Documents'
      },
      statusLabels: {
        open: 'Open',
        review: 'In review',
        closed: 'Closed'
      },
      riskLabels: {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      },
      types: {
        theftParking: 'Theft (parking A14)',
        tempDeviation: 'Temperature deviation',
        delay12h: 'Delay > 12h',
        damageForklift: 'Damage (forklift)'
      }
    },
    documents: {
      title: 'Documents',
      upload: 'Upload',
      download: 'Download'
    },
    thirdParty: {
      shipper: 'Shipper',
      consignee: 'Consignee',
      broker: 'Broker',
      warehouse: 'Warehouse'
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
    claimsfox: {
      nav: {
        title: 'Claimsfox',
        dashboard: 'Dashboard',
        claims: 'Claims',
        intake: 'FNOL',
        triage: 'Triage',
        documents: 'Documents',
        mailbox: 'Mailbox',
        partners: 'Partners',
        reporting: 'Reporting',
        tasks: 'Tasks',
        integrations: 'Integrations'
      },
      calendar: {
        title: 'Calendar',
        subtitle: 'Upcoming appointments',
        location: 'Location',
        participants: 'Participants',
        description: 'Description',
        locationTbd: 'TBD',
        participantsTbd: 'TBD',
        descriptionTbd: 'Details to follow',
        close: 'Close',
        openRelated: 'Open claim'
      },
      dashboard: {
        title: 'Claimsfox Workspace',
        subtitle: 'Claims intake, triage, and workflow overview.',
        kpi: {
          openClaims: 'Open claims',
          slaRisk: 'SLA risk',
          fraudFlags: 'Fraud flags',
          queue: 'My queue'
        },
        queueTitle: 'My queue',
        queueSubtitle: 'Active assignments',
        mailTitle: 'Mailbox',
        mailSubtitle: 'New inbound messages',
        recentTitle: 'Recent claims',
        recentSubtitle: 'Latest FNOL submissions'
      },
      claims: {
        title: 'Claims list',
        subtitle: 'All open and closed claims'
      },
      filters: {
        status: 'Status',
        lob: 'Line of business',
        search: 'Search',
        searchPlaceholder: 'Claim number, insured, policy',
        all: 'All'
      },
      status: {
        intake: 'Intake',
        triage: 'Triage',
        investigation: 'Investigation',
        settlement: 'Settlement',
        closed: 'Closed',
        denied: 'Denied'
      },
      severity: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        critical: 'Critical'
      },
      claimDetail: {
        title: 'Claim',
        subtitle: 'Details',
        policy: 'Policy',
        status: 'Status',
        overviewTitle: 'Overview',
        lossDate: 'Loss date',
        severity: 'Severity',
        reserve: 'Reserve',
        paid: 'Paid',
        slaDue: 'SLA due',
        assigned: 'Assignee',
        notePlaceholder: 'Add a note …',
        decisionHint: 'Document the decision and trigger next steps.',
        assignmentsTitle: 'Assignments',
        assignmentsSubtitle: 'Tasks & partners',
        tasksLabel: 'Active tasks',
        partnerLabel: 'Assign partner',
        assignPartner: 'Request partner',
        aiTitle: 'AI assist',
        aiSubtitle: 'Explainable triage',
        aiRecommendation: 'Recommendation',
        aiSummary: 'Fast-track review with standard reserve; no fraud indicators.',
        aiBullet1: 'Loss amount within expected range',
        aiBullet2: 'Documents complete, invoice pending',
        aiBullet3: 'SLA due in 8 days, medium priority',
        aiSources: 'Sources: FNOL, invoices, history',
        tabs: {
          overview: 'Overview',
          documents: 'Documents',
          timeline: 'Timeline',
          decision: 'Decision'
        },
        actions: {
          settlement: 'Start settlement',
          investigation: 'Move to investigation',
          deny: 'Deny claim',
          addNote: 'Add note'
        },
        events: {
          noteTitle: 'Decision note',
          noteMessage: 'Reviewed settlement options and aligned on next steps.',
          partnerAssignedTitle: 'Partner assignment',
          partnerAssignedMessage: 'Partner {{partner}} requested for this claim.',
          partnerRequestReason: 'Assigned from claim detail view.'
        }
      },
      documents: {
        title: 'Documents',
        subtitle: 'Evidence & extraction',
        helper: 'Review extraction results and approve.',
        linkTo: 'Link to claim',
        upload: 'Upload document',
        view: 'Preview',
        approve: 'Approve',
        previewText: 'Preview of extracted content.',
        open: 'Open',
        status: 'Status',
        statusLabels: {
          pending: 'Pending',
          needsReview: 'Needs review',
          approved: 'Approved'
        }
      },
      mailbox: {
        title: 'Mailbox',
        subtitle: 'Inbox and linkage',
        inbox: 'Inbox',
        inboxSubtitle: 'Latest messages',
        detail: 'Message',
        from: 'From',
        date: 'Date',
        attachments: 'Attachments',
        link: 'Link to claim',
        noSelection: 'No message selected'
      },
      partners: {
        title: 'Partners',
        subtitle: 'Service providers and network',
        assignTo: 'Assign to',
        request: 'Request',
        updateStatus: 'Update status',
        status: {
          active: 'Active',
          standby: 'Standby',
          onHold: 'On hold'
        }
      },
      triage: {
        title: 'Triage',
        subtitle: 'AI-assisted prioritization',
        recommendation: 'AI recommendation: move to investigation',
        sources: 'Evidence, history, SLA',
        score: 'Score',
        needsApproval: 'Needs approval',
        approve: 'Approve'
      },
      intake: {
        title: 'FNOL intake',
        subtitle: 'Capture a claim in 3 steps',
        claimant: 'Insured',
        policyRef: 'Policy',
        lossDate: 'Loss date',
        lossLocation: 'Loss location',
        description: 'Description',
        attachmentsHint: 'Attachments will be added in the next step.',
        back: 'Back',
        next: 'Next',
        submit: 'Create claim'
      },
      deadlines: {
        title: 'Deadlines',
        subtitle: 'Upcoming milestones',
        openClaim: 'Open claim',
        items: {
          inspection: 'On-site inspection',
          inspectionDetail: 'Confirm surveyor visit and safety review.',
          reserve: 'Reserve calibration',
          reserveDetail: 'Update reserve based on new invoices.',
          settlement: 'Settlement committee',
          settlementDetail: 'Present proposal to the committee.',
          broker: 'Broker update',
          brokerDetail: 'Share status and next steps.',
          fraud: 'Fraud check',
          fraudDetail: 'Complete anomaly review and file notes.'
        }
      },
      reporting: {
        title: 'Reporting',
        subtitle: 'KPIs & analytics',
        statusTitle: 'Status distribution',
        severityTitle: 'Severity',
        slaTitle: 'SLA risk',
        tasksTitle: 'Tasks',
        slaOnTrack: 'On track',
        slaRisk: 'At risk',
        auditTitle: 'Audit & compliance',
        auditSubtitle: 'Export & traceability',
        fraudFlags: 'Fraud flags',
        auditHint: 'Export creates an audit-ready trace.',
        auditExport: 'Export audit'
      },
      tasks: {
        title: 'Tasks',
        subtitle: 'Queues & SLAs',
        advance: 'Advance',
        status: {
          open: 'Open',
          inProgress: 'In progress',
          blocked: 'Blocked',
          done: 'Done'
        }
      },
      integrations: {
        title: 'Integrations',
        subtitle: 'System connections',
        helper: 'Demo integration',
        guidewire: 'Guidewire',
        duckcreek: 'Duck Creek',
        email: 'Email gateway',
        storage: 'Document storage',
        payments: 'Payments'
      },
      common: {
        loading: 'Loading data …'
      }
    },
    fleetfox: {
      nav: {
        title: 'Fleetfox',
        dashboard: 'Dashboard',
        vehicles: 'Vehicles',
        drivers: 'Drivers',
        routes: 'Routes',
        vision: 'Vision',
        maintenance: 'Maintenance',
        insurance: 'Insurance',
        assistant: 'Assistant',
        reporting: 'Reporting',
        audit: 'Audit'
      },
      calendar: {
        title: 'Calendar',
        empty: 'No events in the selected month.',
        date: 'Date',
        location: 'Location',
        linked: 'Linked entity',
        close: 'Close',
        goTo: 'Go to'
      },
      common: {
        all: 'All',
        loading: 'Loading data …'
      },
      dashboard: {
        title: 'Fleetfox Workspace',
        subtitle: 'AI fleet management with insurance risk workflows.',
        heroHint: '50 vehicles, 120 drivers and explainable AI scores in one demo workspace.',
        queueTitle: 'Critical vehicles',
        queueSubtitle: 'Highest-risk units requiring action',
        alertTitle: 'Safety alerts',
        alertSubtitle: 'Current telematics and vision warnings',
        kpi: {
          safety: 'Avg Safety Score',
          risk: 'Avg Risk Score',
          maintenance: 'Maintenance risks',
          claimsProbability: 'Claims probability',
          alerts: 'Safety alerts',
          vehicles: 'Vehicles'
        }
      },
      vehicles: {
        title: 'Vehicle Fleet',
        subtitle: 'Fleet units with risk, safety and service metrics.',
        search: 'Search plate, VIN or region',
        empty: 'No vehicles found.',
        status: {
          active: 'Active',
          idle: 'Idle',
          maintenance: 'Maintenance'
        }
      },
      vehicleDetail: {
        title: 'Vehicle',
        heroHint: 'Detail view with AI explanation, timeline and demo downloads.',
        vin: 'VIN',
        licensePlate: 'License plate',
        weight: 'Weight',
        mileage: 'Mileage',
        manufacturer: 'Manufacturer',
        model: 'Model',
        serviceStatus: 'Service status',
        assignedDriver: 'Assigned driver',
        maintenanceRisk: 'Maintenance risk',
        predictedServiceDate: 'Predicted service date',
        safety: 'Safety score',
        risk: 'Risk score',
        odometer: 'Odometer',
        nextService: 'Next service',
        overviewTitle: 'Overview',
        assignedDrivers: 'Assigned drivers',
        powertrain: 'Powertrain',
        tags: 'Tags',
        activate: 'Set active',
        toMaintenance: 'Set maintenance',
        addNote: 'Add note',
        documentsTitle: 'Demo documents',
        documentsSubtitle: 'Download telematics and risk reports.',
        downloadTelematics: 'Download telematics',
        downloadRisk: 'Download risk report',
        openStaticDoc: 'Open static sample doc',
        timelineTitle: 'Timeline',
        timelineEmpty: 'No timeline entries available.',
        aiTitle: 'AI explanation',
        aiSubtitle: 'Risk drivers, confidence and evidence references'
      },
      drivers: {
        title: 'Driver Directory',
        subtitle: 'Driver profiles, safety signals and training state.',
        search: 'Search by name or location',
        empty: 'No drivers found.'
      },
      driverDetail: {
        title: 'Driver',
        heroHint: 'Performance profile with assigned vehicles and coaching actions.',
        profileTitle: 'Driver profile',
        address: 'Address',
        licenseValidUntil: 'License valid until',
        incidents: 'Incidents',
        currentVehicle: 'Current vehicle',
        scoresTitle: 'Score overview',
        safety: 'Safety score',
        risk: 'Risk score',
        eco: 'Eco score',
        distraction: 'Distraction events',
        speeding: 'Speeding events',
        assignedTitle: 'Assigned vehicles',
        documentsTitle: 'Demo documents',
        downloadProfile: 'Download driver profile',
        addNote: 'Log coaching note',
        timelineTitle: 'Timeline',
        timelineEmpty: 'No driver timeline entries.'
      },
      routes: {
        title: 'Route Optimization',
        subtitle: 'AI suggestions for risk, ETA, fuel and emissions.',
        search: 'Search route',
        risk: 'Risk',
        eta: 'ETA',
        accept: 'Accept suggestion'
      },
      vision: {
        title: 'Fleet Vision',
        subtitle: 'Dashcam and VisionAI event review with explanations.',
        uploadTitle: 'Accident image',
        uploadSubtitle: 'Vision simulation',
        uploadHint: 'Drop accident image here (demo)',
        overlay: 'Bounding box overlay',
        liveMap: 'Live detection map',
        overlayHelp: 'Bounding boxes mark detected damage zones in the full image. The crops below show the corresponding detection areas with confidence.',
        confidence: 'Confidence',
        eventsTitle: 'Vision events',
        eventsSubtitle: 'Severity, clip placeholder and evidence',
        vehicle: 'Vehicle',
        severity: 'Severity',
        approve: 'Approve',
        override: 'Override'
      },
      maintenance: {
        title: 'Predictive Maintenance',
        subtitle: 'Failure forecasts, expected costs and actions.',
        warningTitle: 'AI warning: service overdue',
        warningBody: 'Current mileage is above service threshold. Schedule maintenance immediately.',
        cost: 'Cost',
        due: 'Due in',
        schedule: 'Schedule slot'
      },
      telematics: {
        title: 'Telematics timeline',
        subtitle: 'Events for braking, idle time, consumption and location.',
        speed: 'Speed',
        idle: 'Idle',
        fuel: 'Fuel',
        harshBraking: 'Harsh braking',
        harshAcceleration: 'Harsh acceleration'
      },
      risk: {
        title: 'AI risk panel',
        subtitle: 'Deterministic score based on telematics, incidents and service status.',
        score: 'Risk score',
        category: 'Risk category',
        recommendation: 'Recommendation',
        premiumImpact: 'Premium impact'
      },
      costs: {
        title: 'Cost overview',
        subtitle: 'Fuel, maintenance and insurance costs with per-km KPI.',
        total: 'Total cost',
        perVehicle: 'Cost per vehicle',
        perKm: 'Cost per km',
        fuel: 'Fuel cost',
        maintenance: 'Maintenance cost',
        insurance: 'Insurance cost'
      },
      insurance: {
        title: 'Insurance Risk',
        subtitle: 'Premium and claims probability simulation.',
        listTitle: 'Assessments',
        detailTitle: 'Assessment details',
        premium: 'Premium',
        basePremium: 'Base premium',
        multiplier: 'Multiplier',
        claimsProbability: 'Claims probability',
        downloadReport: 'Download risk report',
        addNote: 'Add note',
        aiTitle: 'AI explanation',
        aiSubtitle: 'Evidence-based risk rationale'
      },
      assistant: {
        title: 'AI Assistant',
        subtitle: 'Deterministic AI simulation for operational decisions.',
        actionsTitle: 'Actions',
        findCritical: 'Find critical vehicles',
        reducePremium: 'Reduce premium by training',
        routeSummary: 'Route risk summary',
        resultTitle: 'Result',
        resultSubtitle: 'Confidence, reasons and evidence',
        empty: 'Run an action to generate an insight.'
      },
      reporting: {
        title: 'Fleet Reporting',
        subtitle: 'KPIs, risk charts and operational priorities.',
        riskChartTitle: 'Risk by vehicle type',
        statusChartTitle: 'Status distribution',
        maintenanceTrend: 'Maintenance cost trend',
        tableTitle: 'Top-risk vehicles',
        table: {
          vehicle: 'Vehicle',
          region: 'Region',
          risk: 'Risk',
          safety: 'Safety'
        },
        kpi: {
          safety: 'Avg Safety Score',
          risk: 'Avg Risk Score',
          maintenance: 'Maintenance risk',
          claims: 'Claims probability',
          co2: 'CO2 estimate',
          fuel: 'Fuel trend'
        }
      },
      audit: {
        title: 'Fleet Audit',
        subtitle: 'Complete AI and workflow events with filtering.',
        searchTitle: 'Audit log',
        search: 'Search event, message or entity',
        empty: 'No audit entries found.'
      }
    },
    partnerfox: {
      nav: {
        title: 'Partnerfox',
        dashboard: 'Dashboard',
        network: 'Network',
        cases: 'Cases',
        rental: 'Rental',
        towing: 'Towing',
        subrogation: 'Subrogation',
        assistance: 'Assistance',
        reporting: 'Reporting',
        audit: 'Audit'
      },
      calendar: {
        title: 'Calendar',
        empty: 'No events in selected month.',
        date: 'Date',
        location: 'Location',
        linked: 'Linked',
        close: 'Close',
        goTo: 'Open'
      },
      common: {
        all: 'All',
        loading: 'Loading data ...'
      },
      dashboard: {
        title: 'Partnerfox Workspace',
        subtitle: 'BPO partner orchestration for workshop, rental, towing and subrogation.',
        networkTitle: 'Partner network',
        casesTitle: 'Open partner cases',
        kpi: {
          partners: 'Partners',
          casesOpen: 'Open cases',
          directBilling: 'Direct billing',
          subrogation: 'Subrogation cases',
          recoveryRate: 'Recovery rate'
        }
      },
      network: {
        title: 'Partner network',
        subtitle: 'Workshops, rental, towing, glass and assistance providers.',
        search: 'Search by partner name or region',
        empty: 'No partners found.',
        type: {
          workshop: 'Workshop',
          rental: 'Rental',
          towing: 'Towing',
          glass: 'Glass',
          assistance: 'Assistance'
        }
      },
      partnerDetail: {
        title: 'Partner',
        subtitle: 'Partner profile',
        contact: 'Contact',
        rating: 'Rating',
        avgRepairDays: 'Avg repair days',
        directBillingEnabled: 'Direct billing enabled',
        performance: 'Performance score',
        casesHandled: 'Cases handled',
        timeline: 'Partner timeline',
        relatedCases: 'Related cases'
      },
      cases: {
        title: 'Partner Cases',
        subtitle: 'FNOL to closure with AI plausibility checks.',
        search: 'Search by claim number or plate',
        empty: 'No cases found.',
        directBilling: 'Direct billing',
        status: {
          FNOL: 'FNOL',
          InRepair: 'In repair',
          WaitingParts: 'Waiting parts',
          RentalActive: 'Rental active',
          Closed: 'Closed'
        }
      },
      caseDetail: {
        title: 'Case',
        subtitle: 'Case detail',
        damageSummary: 'Damage summary',
        assignedWorkshop: 'Assigned workshop',
        rentalPartner: 'Rental partner',
        towingPartner: 'Towing partner',
        estimatedCost: 'Estimated cost',
        repairDuration: 'Repair duration (days)',
        trackingLink: 'Customer tracking link',
        documentsTitle: 'Demo documents',
        timelineTitle: 'Case timeline',
        downloadDocument: 'Download demo case file',
        timelineNoteTitle: 'FNOL routing note',
        timelineNoteMessage: 'FNOL package reviewed and routed to workshop with rental fallback.',
        doc: {
          caseLabel: 'Case',
          vehicleLabel: 'Vehicle',
          damageSummaryLabel: 'Damage summary',
          estimatedCostLabel: 'Estimated cost',
          repairDurationLabel: 'Repair duration',
          aiApprovedLabel: 'AI approved',
          yes: 'yes',
          no: 'no',
          footer: 'This is a generated demo document from Partnerfox.'
        }
      },
      rental: {
        title: 'Rental Coordination',
        subtitle: 'Active rentals, duration and SLA monitoring.',
        activeRentals: 'Active rental partner',
        days: 'Rental days',
        cost: 'Cost',
        slaWarning: 'SLA warning: rental duration critical'
      },
      towing: {
        title: 'Towing Network',
        subtitle: 'Dispatch and response times overview.',
        responseTime: 'Response time',
        active: 'Status'
      },
      subrogation: {
        title: 'Subrogation',
        subtitle: 'Candidates, probability and recovery projection.',
        probability: 'Recovery probability',
        estimate: 'Estimated recovery amount',
        projected: 'Projected',
        status: {
          Open: 'Open',
          Negotiation: 'Negotiation',
          Recovered: 'Recovered',
          Lost: 'Lost'
        },
        stageRecommendation: {
          fastTrack: 'Fast-track negotiation',
          standard: 'Standard negotiation',
          manualReview: 'Manual legal review'
        }
      },
      assistance: {
        title: 'Assistance',
        subtitle: '24/7 hotline, dispatch logs and SLA monitoring.',
        hotline: 'Hotline provider',
        responseTime: 'Response time',
        slaBreach: 'SLA breach'
      },
      reporting: {
        title: 'Partner Reporting',
        subtitle: 'BPO KPIs for cost, duration and recovery.',
        casesByStatus: 'Cases by status',
        repairDistribution: 'Repair duration distribution',
        recoveryTrend: 'Recovery trend',
        kpi: {
          avgRepair: 'Avg repair duration',
          directBilling: 'Direct billing ratio',
          rentalDays: 'Total rental days',
          recoveryRate: 'Recovery rate',
          networkIndex: 'Network performance index',
          costPerClaim: 'Cost per claim'
        }
      },
      audit: {
        title: 'Partner Audit',
        subtitle: 'Direct billing, AI overrides and subrogation events.',
        search: 'Search',
        empty: 'No audit entries found.'
      },
      actions: {
        enableDirectBilling: 'Enable direct billing',
        assignRental: 'Assign rental',
        markCandidate: 'Mark subrogation candidate',
        saveNote: 'Save note'
      },
      aiRepair: {
        title: 'AI Plausibility Check',
        subtitle: 'Estimate quality check with evidence and recommendation.',
        plausibility: 'Plausibility score',
        confidence: 'Confidence',
        recommendation: 'Recommendation',
        anomalies: 'Anomalies',
        evidence: 'Evidence',
        approve: 'Approve',
        manualReview: 'Manual review'
      }
    },
    aifox: {
      nav: {
        title: 'AI.FOX',
        dashboard: 'Dashboard',
        claimsVision: 'Claims Vision',
        fraud: 'Fraud',
        risk: 'Risk',
        documentAi: 'Document AI',
        chatbot: 'Chatbot',
        governance: 'Governance',
        monitoring: 'Monitoring',
        integrations: 'Integrations',
        audit: 'Audit'
      },
      dashboard: {
        title: 'AI.FOX Workspace',
        subtitle: 'Explainable AI modules for insurance operations.',
        kpi: {
          autoProcessed: 'Claims auto-processed',
          fraudAlerts: 'Fraud alerts',
          avgConfidence: 'Average AI confidence',
          modelDrift: 'Model drift risk',
          modelDriftValue: 'Low',
          aiActRisk: 'EU AI Act risk',
          aiActValue: 'High Risk'
        },
        modulesTitle: 'AI Modules',
        modulesSubtitle: 'Open a module to explore the AI workflow.',
        modules: {
          claimsVision: 'Vision AI for damage assessment',
          fraud: 'Fraud pattern detection',
          risk: 'Risk & underwriting engine',
          documentAi: 'Document extraction AI',
          chatbot: 'Conversational AI',
          governance: 'EU AI Act governance',
          monitoring: 'Model monitoring',
          integrations: 'Integration catalog',
          audit: 'Audit log'
        },
        performanceTitle: 'Model Performance',
        performanceSubtitle: 'Accuracy and throughput overview',
        performanceChart: 'Performance chart',
        heatmapTitle: 'Fraud Heatmap',
        heatmapSubtitle: 'Alert density by region',
        heatmapChart: 'Heatmap',
        riskTitle: 'Top Risk Segments',
        riskSubtitle: 'Highest risk portfolios'
      },
      claimsVision: {
        title: 'Claims Vision AI',
        subtitle: 'Damage detection and repair estimation',
        uploadTitle: 'Upload accident image',
        uploadSubtitle: 'Simulated Tractable workflow',
        uploadHint: 'Drop accident image here (demo)',
        overlayLabel: 'Bounding box overlay',
        detectedParts: 'Detected parts',
        analysisTitle: 'AI analysis',
        analysisSubtitle: 'Repair cost & confidence',
        claimSelect: 'Claim reference',
        estimate: 'Estimated repair cost',
        severity: 'Severity level',
        confidence: 'Confidence score',
        explainability: 'Model detected bumper deformation with 87% confidence based on visual feature cluster.',
        approve: 'Approve',
        override: 'Override',
        decisionSaved: 'Decision saved:',
        events: {
          decisionTitle: 'Vision AI decision',
          decisionMessage: '{{action}} recorded for {{claimNumber}}.'
        }
      },
      fraud: {
        title: 'Fraud Detection',
        subtitle: 'Shift / Friss simulation',
        listTitle: 'Fraud alerts',
        listSubtitle: 'AI-flagged claims',
        detailTitle: 'Alert detail',
        detailSubtitle: 'Suspicious pattern explanation',
        score: 'Fraud score',
        riskLevel: 'Risk level',
        escalate: 'Escalate',
        clear: 'Clear suspicion'
      },
      risk: {
        title: 'Risk & Underwriting Engine',
        subtitle: 'Gradient AI simulation',
        inputTitle: 'Input data',
        inputSubtitle: 'Driver & vehicle profile',
        outputTitle: 'AI output',
        outputSubtitle: 'Risk score and premium',
        age: 'Driver age',
        vehicle: 'Vehicle',
        region: 'Region',
        lossHistory: 'Loss history',
        recalculate: 'Recalculate',
        riskScore: 'Risk score',
        premium: 'Suggested premium',
        biasCheck: 'Bias check',
        aiActCategory: 'EU AI Act category'
      },
      documentAi: {
        title: 'Document AI',
        subtitle: 'omni:us / Chisel simulation',
        uploadTitle: 'Upload document',
        uploadSubtitle: 'Medical invoice, police report, policy PDF',
        uploadHint: 'Drop a document here (demo)',
        extractionTitle: 'Extraction',
        extractionSubtitle: 'Fields & confidence',
        confidence: 'Extraction confidence',
        gdprWarning: 'GDPR warning: health data detected.',
        approve: 'Approve fields',
        reject: 'Reject & correct'
      },
      chatbot: {
        title: 'Conversational AI',
        subtitle: 'LoyJoy simulation',
        listTitle: 'Conversations',
        listSubtitle: 'Pre-seeded demos',
        chatTitle: 'Chat interface',
        chatSubtitle: 'Customer conversation',
        transparency: 'This is an automated system.',
        confidence: 'Confidence',
        escalate: 'Escalate to human'
      },
      governance: {
        title: 'Governance',
        subtitle: 'EU AI Act simulation',
        classificationTitle: 'AI system classification',
        classificationSubtitle: 'Risk category overview',
        systemType: 'Classification',
        systemValue: 'High Risk',
        logging: 'Logging status: Enabled',
        checklistTitle: 'Transparency checklist',
        checklistSubtitle: 'Compliance requirements',
        actionsTitle: 'Compliance actions',
        actionsSubtitle: 'Generate reports and checks',
        generateReport: 'Generate AI Documentation Report',
        runCheck: 'Run Compliance Check'
      },
      monitoring: {
        title: 'Monitoring',
        subtitle: 'Model drift & bias detection',
        accuracyTitle: 'Accuracy over time',
        accuracySubtitle: 'Rolling 90 days',
        accuracyChart: 'Accuracy chart',
        driftTitle: 'Drift detection',
        driftSubtitle: 'Feature distribution shift',
        driftAlert: 'Drift alert: Moderate shift detected',
        biasTitle: 'Bias distribution',
        biasSubtitle: 'By region and segment',
        biasChart: 'Bias chart',
        alertTitle: 'Alerts',
        alertSubtitle: 'Operational recommendations',
        alertMessage: 'Alert: Model drift exceeds threshold',
        retrainHint: 'Recommendation: trigger model retrain',
        retrain: 'Recommend retrain'
      },
      integrations: {
        title: 'Integrations',
        subtitle: 'AI platform connections'
      },
      audit: {
        title: 'Audit Log',
        subtitle: 'AI decisions and overrides'
      },
      common: {
        noSelection: 'No item selected',
        selectItem: 'Select an item to view details.'
      }
    },

    claimManager: {
      rolesCard: {
        description: 'Claims handler cockpit for fast decisions, approvals, partner orchestration and AI insights.',
        cta: 'Open'
      },
      marketing: {
        hero: {
          overline: 'Claims intelligence',
          title: 'Claim Manager',
          subtitle:
            'Claims handler cockpit for fast decisions, approvals and partner orchestration – with AI, documents and coverage validation in one place.',
          login: 'Login'
        },
        features: {
          statusTimeline: {
            title: 'Status & timeline',
            description: 'All processing stages, escalations and SLAs in one view.'
          },
          coverage: {
            title: 'Coverage & policies',
            description: 'Automated policy validation, limits and deductibles with AI support.'
          },
          partners: {
            title: 'Partner orchestration',
            description: 'Dispatch workshops, surveyors or towing services directly from the claim file.'
          },
          workflows: {
            title: 'Cost approval & workflows',
            description: 'Approvals with checklists, comments and a full audit trail.'
          },
          documents: {
            title: 'Documents & media',
            description: 'Police reports, estimates and photos managed securely in context.'
          },
          aiInsights: {
            title: 'Insurfox AI insights',
            description: 'Suspicion flags, plausibility checks and next-best-actions for handlers.'
          }
        },
        preview: {
          title: 'Dashboard preview',
          subtitle: 'KPIs, alerts and timeline — built for decisive claims teams.',
          kpis: {
            active: 'Active claims',
            sla: 'SLA adherence',
            ai: 'AI alerts'
          },
          chartTitle: 'Cost progression per week',
          notes: 'Demo data: combined KPI + AI alert view with status clustering.'
        }
      },
      app: {
        listHeader: {
          title: 'Insurfox Claims Manager',
          subtitle: 'Open claims currently in progress'
        },
        caseHeader: {
          title: 'Claim file',
          subtitle: 'Claim overview and status with AI decision templates'
        },
        header: {
          overline: 'Claim file',
          title: 'Claim file',
          claimId: 'Claim ID',
          claimIdValue: 'CLM-2025-0471',
          date: 'Incident',
          dateValue: '12 March 2025',
          status: 'Status'
        },
        caseList: {
          title: 'Saved claims',
          subtitle: 'Select a claim to open the file.',
          empty: 'No saved claims yet.',
          columns: {
            claimNumber: 'Claim number',
            firstName: 'First name',
            lastName: 'Last name',
            licensePlate: 'License plate',
            date: 'Incident'
          }
        },
        filters: {
          status: 'Status',
          type: 'Damage type',
          all: 'All',
          reset: 'Reset filters'
        },
        damageTypes: {
          rearCollision: 'Rear collision',
          frontCollision: 'Front collision',
          sideCollision: 'Side collision',
          parkingDamage: 'Parking damage',
          glassDamage: 'Glass damage',
          wildlife: 'Wildlife impact',
          mirrorContact: 'Mirror contact',
          hailDamage: 'Hail damage',
          theft: 'Theft',
          waterDamage: 'Water damage',
          fireDamage: 'Fire damage',
          vandalism: 'Vandalism',
          stormDamage: 'Storm damage',
          engineDamage: 'Engine damage',
          tireDamage: 'Tire damage',
          cargoDamage: 'Cargo damage',
          liabilityDamage: 'Liability damage',
          animalDamage: 'Animal damage'
        },
        statusOptions: {
          intake: 'Intake',
          review: 'Review',
          approval: 'Approval',
          repair: 'Repair',
          closure: 'Closure'
        },
        actions: {
          backToList: 'Back to overview',
          approveCosts: 'Approve costs',
          assignSurveyor: 'Assign surveyor',
          changePartner: 'Change partner'
        },
        kpis: {
          totalIncurred: 'Total incurred',
          reserve: 'Reserve',
          approved: 'Approved',
          openItems: 'Open items',
          deductible: 'Deductible',
          coverage: 'Coverage status',
          coverageValue: 'Covered',
          fraudRisk: 'Fraud risk',
          handlingTime: 'Handling time'
        },
        kpiValues: {
          totalIncurred: '$12,480',
          reserve: '$3,200',
          approved: '$6,210',
          openItems: '3',
          deductible: '$500',
          coverage: 'Covered',
          fraudRisk: 'Medium',
          handlingTime: '9 d'
        },
        details: {
          title: 'Claim details',
          type: 'Claim type',
          location: 'Location & time',
          incidentTime: 'Timestamp',
          vehicle: 'Vehicle',
          summary: 'Summary',
          values: {
            type: 'Comprehensive / rear impact',
            location: 'Port of Hamburg, 11:32',
            vehicle: 'HH-CL 2045 • WDD2130041A123456',
            summary: 'Driver reports a rear-end collision at Gate 4. Sensor data and witness statement available.'
          }
        },
        timeline: {
          title: 'Timeline & SLA',
          steps: {
            intake: 'Intake',
            review: 'Review',
            approval: 'Approval',
            repair: 'Repair',
            closure: 'Closure'
          }
        },
        costs: {
          title: 'Costs & approval',
          confirm: 'Review costs',
          table: {
            position: 'Line item',
            amount: 'Amount',
            status: 'Status',
            note: 'Note'
          },
          items: {
            bodywork: 'Bodywork',
            paint: 'Paint',
            rental: 'Rental car'
          },
          status: {
            pending: 'Pending',
            approved: 'Approved',
            rejected: 'Rejected'
          },
          notePlaceholder: 'Add comment …',
          modal: {
            title: 'Confirm cost coverage',
            checkbox: 'Policy checked & limits respected',
            confirm: 'Approve costs',
            cancel: 'Cancel'
          }
        },
        coverage: {
          title: 'Coverage & policy',
          policyNumber: 'Policy',
          policyValue: 'POL-DE-4711',
          term: 'Term',
          termValue: '01 Jan 2024 – 31 Dec 2024',
          limit: 'Limit',
          limitValue: '$15,000',
          exclusion: 'Exclusions',
          exclusionValue: 'Glass breakage excluded',
          covered: 'Covered',
          partial: 'Partially covered',
          notCovered: 'Not covered',
          note: 'Coverage analysis confirms repair and rental expenses.'
        },
        partner: {
          title: 'Partner management',
          changeButton: 'Change partner',
          modalTitle: 'Select partner',
          confirm: 'Apply',
          options: {
            partner1: { name: 'Müller Bodyshop' },
            partner1Address: 'Hamburg, Süderstraße 54',
            partner2: { name: 'Autopartner North' },
            partner2Address: 'Lübeck, Baltic Park 3',
            partner3: { name: 'Bodyshop 24' },
            partner3Address: 'Bremerhaven, Dock 2'
          }
        },
        ai: {
          title: 'Insurfox AI insights',
          items: {
            hint1: 'Fraud suspicion medium — claim amount +18% above benchmark.',
            hint2: 'Missing police report — request upload.',
            hint3: 'Repeated pattern: 3 similar claims in 12 months.',
            hint4: 'Recommend surveyor due to severity score 0.72.',
            hint5: 'Workshop capacity: Müller available from Mar 15.'
          }
        },
        documents: {
          title: 'Documents',
          media: 'Media & photos',
          mediaLabel: 'Photo',
          damage: {
            title: 'Damage imagery & AI review',
            modalTitle: 'Damage photo',
            prev: 'Prev',
            next: 'Next',
            riskBadges: {
              low: '🟢 Low risk',
              medium: '🟠 Medium risk',
              high: '🔴 Elevated risk'
            },
            items: {
              photo1: {
                title: 'Front bumper impact',
                ai: 'AI detects a frontal impact at moderate speed. Deformation consistent with a rear-end scenario.',
                fraud: 'Visual evidence matches the reported incident.'
              },
              photo2: {
                title: 'Driver-side door damage',
                ai: 'Side indentation with paint transfer. Contact with a fixed object is likely.',
                fraud: 'Estimated severity slightly above average for comparable cases.'
              },
              photo3: {
                title: 'Rear damage',
                ai: 'Clear rear impact energy transfer. No obvious signs of pre-existing damage.',
                fraud: 'No fraud signal detected.'
              },
              photo4: {
                title: 'Close-up: paint & sensor area',
                ai: 'Sensor area affected. Post-repair calibration is recommended.',
                fraud: 'Irregular scratch patterns — manual review recommended.'
              }
            }
          },
          list: {
            estimate: 'Estimate.pdf',
            police: 'Police-report.pdf',
            survey: 'Survey.pdf',
            invoice: 'Invoice.pdf'
          },
          previewTitle: 'Preview',
          close: 'Close'
        },
        surveyor: {
          title: 'Assign surveyor',
          mapTitle: 'Region & distance',
          confirm: 'Confirm',
          options: {
            surveyor1: 'MobilExpert GmbH',
            surveyor1Region: 'Hamburg region',
            surveyor2: 'NordGutachter AG',
            surveyor2Region: 'Schleswig-Holstein region',
            surveyor3: 'SchnellCheck Service',
            surveyor3Region: 'Lower Saxony region'
          }
        }
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
      title: 'Registering is easy.',
      subtitle: 'Enter your email address and we will send you a personal link.',
      emailLabel: 'Email address',
      emailPlaceholder: 'Enter your email address here',
      emailError: 'Please enter a valid email address.',
      privacyText: 'I have read the',
      privacyLinkText: 'privacy policy',
      privacyLink: 'https://insurfox.de/en/privacy/',
      privacyError: 'Please accept the privacy policy.',
      submit: 'Register now',
      nextStep: 'Next step',
      success: 'Thanks! We will email your personal link shortly.',
      alreadyRegistered: 'Already registered?',
      login: 'Sign in',
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
    partnerManagement: {
      title: 'Partner management',
      subtitle: 'Partner networks, documents, and live claim communication.',
      overview: {
        title: 'Partner management',
        subtitle: 'Network overview with direct access to each area.',
        items: {
          repair: {
            title: 'Repair networks',
            description: 'Workshops, status, and SLAs per claim.'
          },
          assistance: {
            title: 'Assistance / towing / recovery',
            description: 'Roadside help, towing, and recovery partners.'
          },
          rental: {
            title: 'Rental car partners',
            description: 'Replacement vehicles, availability, and rates.'
          },
          surveyors: {
            title: 'Surveyor networks',
            description: 'Experts, capacity, and reporting.'
          },
          majorLoss: {
            title: 'Major loss partners',
            description: 'Specialists for major loss events.'
          },
          parts: {
            title: 'Spare parts partners',
            description: 'Suppliers, lead times, and availability.'
          }
        }
      },
      network: {
        action: 'Manage network',
        cards: {
          overview: {
            title: 'Network overview',
            subtitle: 'Partner structure, regions, and capabilities.'
          },
          quality: {
            title: 'Quality & SLA',
            subtitle: 'Response times, KPIs, and compliance.'
          },
          documents: {
            title: 'Documents & evidence',
            subtitle: 'Framework contracts, certificates, and proof.'
          },
          billing: {
            title: 'Billing & costs',
            subtitle: 'Rates, conditions, and status.'
          },
          status: {
            title: 'Status & utilization',
            subtitle: 'Capacity and availability.'
          },
          communication: {
            title: 'Communication',
            subtitle: 'Alignment, questions, and updates.'
          },
          openItems: {
            title: 'Open items',
            subtitle: 'Clarifications, approvals, and next steps.'
          }
        },
        placeholder: 'Content coming next.'
      },
      actions: {
        addPartner: 'Add partner'
      },
      partnerTypes: {
        workshop: 'Repair shop',
        surveyor: 'Surveyor',
        towing: 'Towing service'
      },
      selection: {
        title: 'Partner selection',
        subtitle: 'Networks, specialization, and response times.',
        response: 'Response time'
      },
      claimMedia: {
        title: 'Claim media',
        subtitle: 'Status of submitted photos.',
        status: {
          review: 'In review',
          approved: 'Approved',
          missing: 'Missing'
        }
      },
      estimates: {
        title: 'Estimates',
        subtitle: 'Intake, review, and approvals.',
        cta: 'Request estimate'
      },
      invoices: {
        title: 'Invoices',
        subtitle: 'Review and approval per partner.',
        cta: 'Review invoice'
      },
      repair: {
        title: 'Repair status',
        subtitle: 'Live updates from the partner network.',
        eta: 'ETA: {{time}}',
        steps: {
          intake: 'Vehicle intake',
          diagnostics: 'Diagnostics',
          parts: 'Parts',
          repair: 'Repair',
          handover: 'Handover'
        }
      },
      chat: {
        title: 'Live chat',
        subtitle: 'Questions and coordination for this claim.',
        placeholder: 'Write a message …',
        send: 'Send'
      },
      questions: {
        title: 'Open questions',
        subtitle: 'Pending items for the partner.',
        cta: 'New question'
      }
    },
    brokerPortal: {
      title: 'IaaS Broker CRM'
    },
    brokerLanding: {
      title: 'Broker CRM',
      login: 'Login',
      heroHeadline: 'Insurfox IaaS Broker CRM',
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
    },
    underwriterfox: {
    nav: {
      title: 'Underwriterfox',
      dashboard: 'Dashboard',
      cases: 'Cases',
      documents: 'Documents',
      rules: 'Rules',
      rating: 'Rating',
      ai: 'AI',
      reporting: 'Reporting',
      governance: 'Governance'
    },
    status: {
      intake: 'Intake',
      screening: 'Screening',
      manualReview: 'Manual review',
      offer: 'Offer',
      bound: 'Bound',
      declined: 'Declined'
    },
    deadlines: {
      title: 'Deadlines',
      subtitle: 'Upcoming milestones',
      modalTitle: 'Deadline details',
      modalClose: 'Close',
      items: {
        review: 'Portfolio review prep',
        pricing: 'Pricing sign-off',
        cyber: 'Cyber checklist',
        brokerCall: 'Broker clarification call',
        qa: 'Offer QA'
      },
      caseItems: {
        committee: {
          title: 'Portfolio committee prep',
          detail: 'Compile risk summary and loss runs.'
        },
        broker: {
          title: 'Broker clarification call',
          detail: 'Confirm exposure split and loss controls.'
        },
        pricing: {
          title: 'Pricing alignment',
          detail: 'Review technical premium vs. target.'
        },
        qa: {
          title: 'Offer doc QA',
          detail: 'Validate endorsements and wording.'
        },
        decision: {
          title: 'Decision deadline',
          detail: 'Final decision and send offer.'
        }
      }
    },
    timeline: {
      title: 'Activity',
      subtitle: 'Audit-ready workflow history',
      empty: 'No timeline entries yet.',
      type: {
        statusUpdate: 'Status',
        internalNote: 'Internal note',
        externalMessage: 'External message',
        system: 'System'
      }
    },
    documents: {
      title: 'Documents',
      subtitle: 'Extracted submission files',
      empty: 'No documents available.',
      statusLabel: 'Status',
      status: {
        extracted: 'Extracted',
        needsReview: 'Needs review',
        approved: 'Approved'
      },
      view: 'View'
    },
    ai: {
      title: 'AI recommendation',
      subtitle: 'Assistive recommendation',
      recommendation: 'Recommendation',
      confidence: 'Confidence',
      empty: 'No recommendation yet.',
      generate: 'Generate recommendation',
      decision: {
        approve: 'Approve',
        decline: 'Decline',
        refer: 'Refer'
      }
    },
    common: {
      all: 'All'
    },
    labels: {
      broker: 'Broker',
      segment: 'Segment',
      premium: 'Premium',
      status: 'Status',
      inception: 'Inception',
      riskScore: 'Risk score'
    },
    actions: {
      setOffer: 'Set offer',
      bind: 'Bind',
      decline: 'Decline'
    },
    messages: {
      offerPrepared: 'Offer prepared',
      boundAfterReview: 'Bound after review',
      declinedInCommittee: 'Declined in committee'
    },
    state: {
      notFound: 'Case not found.'
    },
    rating: {
      title: 'Rating',
      subtitle: 'Pricing inputs',
      revenue: 'Revenue',
      lossRatio: 'Loss ratio',
      fleetSize: 'Fleet size',
      recalculate: 'Recalculate',
      version: 'Version',
      techPremium: 'Technical premium',
      indicatedRate: 'Indicated rate'
    },
    rules: {
      title: 'Rule checks',
      subtitle: 'Ruleset findings',
      outcome: {
        pass: 'Pass',
        warn: 'Warning',
        fail: 'Fail'
      },
      severity: {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      },
      saveVersion: 'Save version'
    },
    dashboard: {
      title: 'Underwriterfox Workbench',
      subtitle: 'Underwriting workflows, risk analysis, and decisions.',
      needsReview: 'Cases needing review',
      needsReviewEmpty: 'No cases in review.'
    },
    cases: {
      title: 'Cases',
      subtitle: 'Portfolio & status overview',
      filterStatus: 'Status',
      filterProduct: 'Product line',
      filterAllStatus: 'All statuses',
      filterAllProduct: 'All product lines',
      searchPlaceholder: 'Search case, broker, or insured',
      empty: 'No cases found.',
      table: {
        caseNumber: 'Case',
        insured: 'Insured',
        productLine: 'Product line',
        status: 'Status',
        premium: 'Premium'
      }
    },
    caseDetail: {
      title: 'Case',
      subtitle: 'Detail view',
      overview: 'Overview',
      tabs: {
        overview: 'Overview',
        documents: 'Documents',
        timeline: 'Timeline',
        decision: 'Decision'
      },
      decision: {
        label: 'Decision',
        none: 'No decision set.'
      }
    },
    documentsPage: {
      title: 'Documents',
      subtitle: 'All documents in the portfolio',
      filterStatus: 'Status',
      filterCase: 'Case',
      searchPlaceholder: 'Search documents',
      empty: 'No documents found.',
      modalTitle: 'Document details',
      modalClose: 'Close'
    },
    rulesPage: {
      title: 'Rules',
      subtitle: 'Rulesets & versioning',
      editorTitle: 'Rules editor (read-only)',
      editorSubtitle: 'Changes are saved as a new version.'
    },
    ratingPage: {
      title: 'Rating',
      subtitle: 'Calculation & scenarios'
    },
    aiPage: {
      title: 'AI',
      subtitle: 'Recommendations & summaries'
    },
    reporting: {
      title: 'Reporting',
      subtitle: 'Portfolio analytics',
      riskDistribution: 'Risk distribution',
      cycleTime: 'Cycle time',
      decisions: 'Decisions',
      cycleBuckets: {
        lt7: '<7d',
        d7_14: '7-14d',
        d15_30: '15-30d',
        d30plus: '30d+'
      }
    },
    governance: {
      title: 'Governance',
      subtitle: 'Audit & traceability',
      export: 'Export audit',
      decisionTrace: 'Decision trace',
      selectCase: 'Select case',
      exportedTitle: 'Audit export generated',
      exportedMessage: 'Governance export generated for audit review.'
    }
  }
  }
}
