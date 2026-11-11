import React, { useState, useEffect } from 'react';
import { supabase } from './components/supabaseClient';

const translations = {
  en: {
    overview: "Overview",
    pricing: "Pricing",
    dashboard: "Customer Dashboard",
    knowledge: "Knowledge Center",
    legal: "Terms & Privacy",
    signIn: "Sign In",
    signOut: "Sign Out",
    getStarted: "Start 7-Day Free Trial — No Card Required",
    badge: "Multi-Industry AI Reputation & Omnichannel Suite",
    heroTitle: "Manage Customer Feedback Before Small Issues Escalate.",
    subtitle: "Protect your reputation across trades, healthcare, legal, retail, hospitality, and professional services. Generate professional draft responses and organize follow-ups with full human oversight.",
    exploreKnowledge: "📚 Explore Knowledge Center",
    howItWorks: "How It Works",
    workflowTitle: "Simple 3-Step Multi-Industry Workflow",
    workflowSubtitle: "Designed for operators across all sectors to maintain absolute control over every customer touchpoint.",
    step1Title: "Review & Feedback Intercept",
    step1Desc: "Incoming ratings, client inquiries, and platform feedback are gathered into your unified multi-channel dashboard.",
    step2Title: "Human-Approved AI Drafting",
    step2Desc: "Kaku drafts professional replies tailored to your specific industry guidelines. You retain final approval before publishing.",
    step3Title: "Omnichannel Follow-Up",
    step3Desc: "Route private resolution links or recovery sequences via SMS, WhatsApp, or Email to resolve client concerns efficiently.",
    demoTitle: "⚡ Interactive Multi-Industry Demo",
    demoSubtitle: "Select your industry and test how Kaku drafts professional private replies.",
    sampleFeedbackLabel: "Sample Feedback",
    generateBtn: "Generate Professional Private-Resolution Draft",
    generatingBtn: "Drafting Response...",
    approvedOutput: "Approved AI Output (Requires Human Review)",
    readyApproval: "Ready for Approval",
    knowledgeHeader: "RevPulse Multi-Industry Knowledge Center",
    knowledgeSubtitle: "Search across HVAC, Healthcare, Construction, Hospitality, E-Commerce, Automotive, Finance, Legal, Wellness, and Veterinary research articles.",
    searchPlaceholder: "🔍 Search HVAC, dental wait times, permit red tags, medical aesthetic reactions, veterinary bills...",
    allIndustries: "All Industries",
    askKakuTitle: "Ask Kaku / Situation Room",
    askKakuSubtitle: "Multi-Industry AI Ready",
    footerRights: "© 2026 RevPulse. All rights reserved. Operator: Imran Mateen (support@revpulse.tools)",
    
    pricingHeader: "Transparent Pricing & Plans",
    pricingSub: "Select your tier to initialize secure checkout and instant workspace activation.",
    starterPlanBadge: "Starter Plan",
    starterPlanTitle: "Single Location",
    starterPrice: "$29",
    starterPeriod: " / month",
    starterFeature1: "✓ Assisted review-response workflow",
    starterFeature2: "✓ Strict human approval controls",
    starterFeature3: "✓ Multi-industry prompt matrices",
    proPlanBadge: "Pro Plan",
    proPlanTitle: "Multi-Location & Scale",
    proPrice: "$79",
    proPeriod: " / month",
    proFeature1: "✓ Up to 3 active locations",
    proFeature2: "✓ Omnichannel SMS, WhatsApp & Email suite",
    proFeature3: "✓ Built-in Testing & Sandbox Lab",
    mostPopular: "Most Popular",

    legalSubtitle: "Legal & Compliance",
    legalTitle: "RevPulse — Terms of Use & Privacy Policy",
    legalMeta: "Effective Date: November 11, 2026 | Operator: Imran Mateen (support@revpulse.tools)",
    part1Title: "Part 1: Privacy Policy",
    part1Desc: "RevPulse is operated by Imran Mateen (“RevPulse,” “we,” “us,” or “our”). This Privacy Policy explains how we collect, use, share, retain, and protect information when you visit www.revpulse.tools, create an account, use the RevPulse workspace, or contact us.",
    p1Heading1: "1. Information We Collect",
    p1Text1: "We collect information you provide directly (name, email, telephone number, business name, credentials, billing info, review text, and support requests). We also collect automatic technical telemetry and integration metadata when you connect business profiles.",
    p1Heading2: "2. How We Use Information",
    p1Text2: "We use information to operate the Service, administer your account and 7-day trial, generate AI-assisted review response drafts, process authorized communication workflows, and send service notices. We do not sell personal information or customer contact lists.",
    p1Heading3: "3. AI-Assisted Features & Human Responsibility",
    p1Text3: "AI-generated suggestions can be imperfect. You are solely responsible for reviewing all drafts before publication, verifying legal compliance, and ensuring no sensitive information is exposed.",
    part2Title: "Part 2: Terms of Use",
    part2Desc: "These Terms of Use govern your access to the RevPulse platform provided by Imran Mateen. By creating an account or starting a trial, you agree to these terms.",
    p2Heading1: "1. Trial, Paid Plans & Billing",
    p2Text1: "RevPulse offers an unrestricted 7-day free trial without requiring a payment card upfront. Paid subscription plans are billed monthly ($29/mo Starter, $79/mo Pro). You may cancel anytime through your account settings or by emailing support@revpulse.tools.",
    p2Heading2: "2. Responsible Communications & Consent",
    p2Text2: "If you use RevPulse for SMS, WhatsApp, or email messaging, you are the sender and are solely responsible for obtaining proper recipient consent, honoring opt-outs, and complying with carrier guidelines and applicable laws.",
    p2Heading3: "3. Contact Information",
    p2Text3: "For any questions regarding these terms or privacy inquiries, contact Imran Mateen directly at",
    backToOverview: "← Back to Overview"
  },
  fr: {
    overview: "Aperçu",
    pricing: "Tarifs",
    dashboard: "Tableau de bord",
    knowledge: "Centre de connaissances",
    legal: "Conditions & Confidentialité",
    signIn: "Connexion",
    signOut: "Déconnexion",
    getStarted: "Commencer l'essai gratuit de 7 jours — Sans carte",
    badge: "Suite IA multi-sectorielle pour la réputation",
    heroTitle: "Gérez les avis clients avant que les petits problèmes ne s'aggravent.",
    subtitle: "Protégez votre réputation dans tous les secteurs (artisanat, santé, juridique, commerce, hôtellerie). Générez des réponses professionnelles et organisez vos suivis avec un contrôle humain total.",
    exploreKnowledge: "📚 Explorer le centre de connaissances",
    howItWorks: "Comment ça marche",
    workflowTitle: "Flux de travail multi-sectoriel simple en 3 étapes",
    workflowSubtitle: "Conçu pour les opérateurs de tous secteurs afin de garder le contrôle absolu sur chaque point de contact.",
    step1Title: "Interception des avis et retours",
    step1Desc: "Les notes reçues, requêtes clients et retours sont centralisés dans votre tableau de bord unifié.",
    step2Title: "Rédaction IA approuvée par l'humain",
    step2Desc: "Kaku rédige des réponses professionnelles adaptées à votre secteur. Vous conservez l'approbation finale.",
    step3Title: "Suivi omnicanal",
    step3Desc: "Acheminez des liens de résolution privée ou des séquences de relance par SMS, WhatsApp ou e-mail.",
    demoTitle: "⚡ Démo interactive multi-sectorielle",
    demoSubtitle: "Sélectionnez votre secteur et testez la rédaction de réponses par Kaku.",
    sampleFeedbackLabel: "Exemple de retour",
    generateBtn: "Générer un projet de résolution privée",
    generatingBtn: "Rédaction en cours...",
    approvedOutput: "Sortie IA approuvée (Révision humaine requise)",
    readyApproval: "Prêt pour approbation",
    knowledgeHeader: "Centre de connaissances RevPulse",
    knowledgeSubtitle: "Recherchez parmi les articles de recherche HVAC, santé, construction, hôtellerie, e-commerce, automobile, finance, juridique, bien-être et vétérinaire.",
    searchPlaceholder: "🔍 Rechercher HVAC, temps d'attente dentaires, permis, vétérinaire...",
    allIndustries: "Toutes les industries",
    askKakuTitle: "Preguntar a Kaku / Sala de Situación",
    askKakuSubtitle: "IA Multiindustria Lista",
    footerRights: "© 2026 RevPulse. Tous droits réservés. Opérateur : Imran Mateen (support@revpulse.tools)",
    
    pricingHeader: "Tarifs et Formules Transparents",
    pricingSub: "Sélectionnez votre formule pour initialiser le paiement sécurisé et l'activation instantanée.",
    starterPlanBadge: "Formule Débutant",
    starterPlanTitle: "Emplacement Unique",
    starterPrice: "29 $",
    starterPeriod: " / mois",
    starterFeature1: "✓ Flux de réponse aux avis assisté",
    starterFeature2: "✓ Contrôles stricts d'approbation humaine",
    starterFeature3: "✓ Matrices de suggestions multi-industries",
    proPlanBadge: "Formule Pro",
    proPlanTitle: "Multi-Emplacements & Échelle",
    proPrice: "79 $",
    proPeriod: " / mois",
    proFeature1: "✓ Jusqu'à 3 emplacements actifs",
    proFeature2: "✓ Suite omnicanale SMS, WhatsApp et e-mail",
    proFeature3: "✓ Laboratoire de test et bac à sable intégré",
    mostPopular: "Le Plus Populaire",

    legalSubtitle: "Juridique & Conformité",
    legalTitle: "RevPulse — Conditions d'utilisation & Politique de confidentialité",
    legalMeta: "Date d'effet : 11 novembre 2026 | Opérateur : Imran Mateen (support@revpulse.tools)",
    part1Title: "Partie 1 : Politique de confidentialité",
    part1Desc: "RevPulse est exploité par Imran Mateen (« RevPulse », « nous », « notre »). Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations.",
    p1Heading1: "1. Informations que nous collectons",
    p1Text1: "Nous collectons les informations que vous fournissez directement (nom, e-mail, téléphone, nom d'entreprise, identifiants, informations de facturation).",
    p1Heading2: "2. Comment nous utilisons les informations",
    p1Text2: "Nous utilisons les informations pour exploiter le Service, administrer votre compte et votre essai de 7 jours, et générer des projets de réponse.",
    p1Heading3: "3. Fonctionnalités assistées par IA et responsabilité humaine",
    p1Text3: "Les suggestions générées par l'IA peuvent être imperfectes. Vous êtes seul responsable de la révision de tous les projets avant publication.",
    part2Title: "Partie 2 : Conditions d'utilisation",
    part2Desc: "Ces conditions d'utilisation régissent votre accès à la plateforme RevPulse fournie par Imran Mateen.",
    p2Heading1: "1. Essai, abonnements payants et facturation",
    p2Text1: "RevPulse offre un essai gratuit de 7 jours sans carte bancaire requise. Les abonnements payants sont facturés mensuellement (29 $/mois Starter, 79 $/mois Pro).",
    p2Heading2: "2. Communications responsables et consentement",
    p2Text2: "Si vous utilisez RevPulse pour des messages SMS, WhatsApp ou e-mail, vous êtes l'expéditeur et seul responsable de l'obtention du consentement.",
    p2Heading3: "3. Coordonnées",
    p2Text3: "Pour toute question concernant ces conditions ou la confidentialité, contactez directement Imran Mateen à",
    backToOverview: "← Retour à l'aperçu"
  },
  es: {
    overview: "Resumen",
    pricing: "Precios",
    dashboard: "Panel de Cliente",
    knowledge: "Centro de Conocimiento",
    legal: "Términos y Privacidad",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    getStarted: "Comenzar prueba gratuita de 7 días — Sin tarjeta",
    badge: "Suite de Reputación IA Multiindustria",
    heroTitle: "Gestione los comentarios de los clientes antes de que los problemas escalen.",
    subtitle: "Proteja su reputación en comercios, salud, legal, retail, hostelería y servicios profesionales. Genere borradores profesionales y organice seguimientos con total supervisión humana.",
    exploreKnowledge: "📚 Explorar Centro de Conocimiento",
    howItWorks: "Cómo Funciona",
    workflowTitle: "Flujo de trabajo multiindustria simple de 3 pasos",
    workflowSubtitle: "Diseñado para operadores en todos los sectores para mantener el control absoluto en cada punto de contacto.",
    step1Title: "Intercepción de Reseñas y Feedback",
    step1Desc: "Las calificaciones y consultas entrantes se agrupan en su panel multicanal unificado.",
    step2Title: "Redacción IA con Supervisión Humana",
    step2Desc: "Kaku redacta respuestas profesionales adaptadas a su industria. Usted mantiene la aprobación final.",
    step3Title: "Seguimiento Omnicanal",
    step3Desc: "Envíe enlaces de resolución privada o secuencias de recuperación por SMS, WhatsApp o Email.",
    demoTitle: "⚡ Demostración Interactiva Multiindustria",
    demoSubtitle: "Seleccione su industria y pruebe cómo Kaku redacta respuestas privadas profesionales.",
    sampleFeedbackLabel: "Comentario de Ejemplo",
    generateBtn: "Generar Borrador de Resolución Privada",
    generatingBtn: "Redactando Respuesta...",
    approvedOutput: "Salida de IA Aprobada (Requiere Revisión Humana)",
    readyApproval: "Listo para Aprobar",
    knowledgeHeader: "Centro de Conocimiento RevPulse",
    knowledgeSubtitle: "Busque artículos de investigación en HVAC, salud, construcción, hostelería, e-commerce, automoción, finanzas, legal, bienestar y veterinaria.",
    searchPlaceholder: "🔍 Buscar HVAC, esperas dentales, permisos, multas, veterinaria...",
    allIndustries: "Todas las industrias",
    askKakuTitle: "Preguntar a Kaku / Sala de Situación",
    askKakuSubtitle: "IA Multiindustria Lista",
    footerRights: "© 2026 RevPulse. Todos los derechos reservados. Operador: Imran Mateen (support@revpulse.tools)",
    
    pricingHeader: "Precios y Planes Transparentes",
    pricingSub: "Seleccione su nivel para iniciar el pago seguro y la activación instantánea.",
    starterPlanBadge: "Plan Inicial",
    starterPlanTitle: "Ubicación Única",
    starterPrice: "$29",
    starterPeriod: " / mes",
    starterFeature1: "✓ Flujo asistido de respuesta a reseñas",
    starterFeature2: "✓ Controles estrictos de aprobación humana",
    starterFeature3: "✓ Matrices de avisos multiindustria",
    proPlanBadge: "Plan Pro",
    proPlanTitle: "Multi-Ubicación y Escala",
    proPrice: "$79",
    proPeriod: " / mes",
    proFeature1: "✓ Hasta 3 ubicaciones activas",
    proFeature2: "✓ Suite omnicanal de SMS, WhatsApp y Email",
    proFeature3: "✓ Laboratorio de pruebas y entorno de pruebas integrado",
    mostPopular: "Más Popular",

    legalSubtitle: "Legal y Cumplimiento",
    legalTitle: "RevPulse — Términos de Uso y Política de Privacidad",
    legalMeta: "Fecha de vigencia: 11 de noviembre de 2026 | Operador: Imran Mateen (support@revpulse.tools)",
    part1Title: "Parte 1: Política de Privacidad",
    part1Desc: "RevPulse es operado por Imran Mateen (“RevPulse”, “nosotros” o “nuestro”). Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos la información.",
    p1Heading1: "1. Información que Recopilamos",
    p1Text1: "Recopilamos información que usted proporciona directamente (nombre, correo electrónico, teléfono, nombre de empresa, credenciales, información de facturación).",
    p1Heading2: "2. Cómo Usamos la Información",
    p1Text2: "Utilizamos la información para operar el Servicio, administrar su cuenta y su prueba de 7 días, y generar borradores de respuesta.",
    p1Heading3: "3. Funciones Asistidas por IA y Responsabilidad Humana",
    p1Text3: "Las sugerencias generadas por IA pueden ser imperfectas. Usted es el único responsable de revisar todos los borradores antes de su publicación.",
    part2Title: "Parte 2: Términos de Uso",
    part2Desc: "Estos Términos de Uso rigen su acceso a la plataforma RevPulse proporcionada por Imran Mateen.",
    p2Heading1: "1. Prueba, Planes de Pago y Facturación",
    p2Text1: "RevPulse ofrece una prueba gratuita de 7 días sin requerir tarjeta por adelantado. Los planes de suscripción se cobran mensualmente ($29/mes Starter, $79/mes Pro).",
    p2Heading2: "2. Comunicaciones Responsables y Consentimiento",
    p2Text2: "Si utiliza RevPulse para mensajería SMS, WhatsApp o correo electrónico, usted es el remitente y único responsable de obtener el consentimiento adecuado.",
    p2Heading3: "3. Información de Contacto",
    p2Text3: "Para cualquier pregunta sobre estos términos o consultas de privacidad, contacte directamente a Imran Mateen en",
    backToOverview: "← Volver al Resumen"
  },
  it: {
    overview: "Panoramica",
    pricing: "Prezzi",
    dashboard: "Dashboard",
    knowledge: "Centro Conoscenze",
    legal: "Termini e Privacy",
    signIn: "Accedi",
    signOut: "Esci",
    getStarted: "Inizia prova gratuita di 7 giorni — Nessuna carta richiesta",
    badge: "Suite IA Multi-Settore per la Reputazione",
    heroTitle: "Gestisci i feedback dei clienti prima che i piccoli problemi degenerino.",
    subtitle: "Proteggi la tua reputazione in tutti i settori con bozze di risposta professionali e monitoraggio umano completo.",
    exploreKnowledge: "📚 Esplora il Centro Conoscenze",
    howItWorks: "Come Funziona",
    workflowTitle: "Semplice flusso di lavoro multi-settore in 3 passaggi",
    workflowSubtitle: "Progettato per gli operatori di tutti i settori per mantenere il controllo assoluto su ogni interazione.",
    step1Title: "Intercettazione Feedback",
    step1Desc: "Valutazioni e richieste in arrivo raccolte nella tua dashboard unificata.",
    step2Title: "Bozze IA approvate dall'uomo",
    step2Desc: "Kaku redige risposte professionali su misura. Mantieni l'approvazione finale.",
    step3Title: "Follow-up Omnicanale",
    step3Desc: "Invia link di risoluzione privata o sequenze via SMS, WhatsApp o Email.",
    demoTitle: "⚡ Demo Interattiva Multi-Settore",
    demoSubtitle: "Seleziona il tuo settore e prova le bozze di risposta di Kaku.",
    sampleFeedbackLabel: "Feedback di Esempio",
    generateBtn: "Genera Bozza di Risoluzione Privata",
    generatingBtn: "Generazione...",
    approvedOutput: "Output IA Approvato (Richiede revisione umana)",
    readyApproval: "Pronto per l'approvazione",
    knowledgeHeader: "Centro Conoscenze RevPulse",
    knowledgeSubtitle: "Cerca tra gli articoli di ricerca per HVAC, sanità, costruzioni, ospitalità, e-commerce, automotive, finanza, legale, benessere e veterinaria.",
    searchPlaceholder: "🔍 Cerca HVAC, attese dentistiche, permessi...",
    allIndustries: "Tutte le industrie",
    askKakuTitle: "Chiedi a Kaku / Sala Situazione",
    askKakuSubtitle: "IA Multi-Settore Pronta",
    footerRights: "© 2026 RevPulse. Tutti i diritti riservati. Operatore: Imran Mateen (support@revpulse.tools)",
    
    pricingHeader: "Prezzi e Piani Trasparenti",
    pricingSub: "Seleziona il tuo piano per avviare il checkout sicuro e l'attivazione immediata.",
    starterPlanBadge: "Piano Base",
    starterPlanTitle: "Sede Singola",
    starterPrice: "$29",
    starterPeriod: " / mese",
    starterFeature1: "✓ Flusso di risposta assistita alle recensioni",
    starterFeature2: "✓ Rigidi controlli di approvazione umana",
    starterFeature3: "✓ Matrici di prompt multi-settore",
    proPlanBadge: "Piano Pro",
    proPlanTitle: "Multi-Sede e Crescita",
    proPrice: "$79",
    proPeriod: " / mese",
    proFeature1: "✓ Fino a 3 sedi attive",
    proFeature2: "✓ Suite omnicanale SMS, WhatsApp ed Email",
    proFeature3: "✓ Laboratorio di test e Sandbox integrato",
    mostPopular: "Più Popolare",

    legalSubtitle: "Legale e Conformità",
    legalTitle: "RevPulse — Termini di Utilizzo e Informativa sulla Privacy",
    legalMeta: "Data di entrata in vigore: 11 novembre 2026 | Operatore: Imran Mateen (support@revpulse.tools)",
    part1Title: "Parte 1: Informativa sulla Privacy",
    part1Desc: "RevPulse è gestito da Imran Mateen (“RevPulse”, “noi”, “nostro”). Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, condividiamo e proteggiamo le informazioni.",
    p1Heading1: "1. Informazioni che Raccogliamo",
    p1Text1: "Raccogliamo le informazioni fornite direttamente (nome, email, numero di telefono, nome dell'azienda, credenziali, dati di fatturazione).",
    p1Heading2: "2. Come Utilizziamo le Informazioni",
    p1Text2: "Utilizziamo le informazioni per far funzionare il Servizio, gestire il tuo account e la prova di 7 giorni, e generare bozze di risposta.",
    p1Heading3: "3. Funzionalità Assistite da IA e Responsabilità Umana",
    p1Text3: "I suggerimenti generati dall'intelligenza artificiale possono essere imperfetti. Sei l'unico responsabile della revisione di tutte le bozze prima della pubblicazione.",
    part2Title: "Parte 2: Termini di Utilizzo",
    part2Desc: "I presenti Termini di Utilizzo regolano l'accesso alla piattaforma RevPulse fornita da Imran Mateen.",
    p2Heading1: "1. Prova, Piani a Pagamento e Fatturazione",
    p2Text1: "RevPulse offre una prova gratuita di 7 giorni senza carta di credito richiesta. I piani di abbonamento sono fatturati mensilmente ($29/mese Starter, $79/mese Pro).",
    p2Heading2: "2. Comunicazioni Responsabili e Consenso",
    p2Text2: "Se utilizzi RevPulse per messaggi SMS, WhatsApp o email, sei il mittente e l'unico responsabile dell'ottenimento del consenso.",
    p2Heading3: "3. Informazioni di Contatto",
    p2Text3: "Per qualsiasi domanda sui presenti termini o richieste di privacy, contatta direttamente Imran Mateen all'indirizzo",
    backToOverview: "← Torna alla Panoramica"
  },
  ar: {
    overview: "نظرة عامة",
    pricing: "الأسعار",
    dashboard: "لوحة التحكم",
    knowledge: "مركز المعرفة",
    legal: "الشروط والخصوصية",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    getStarted: "ابدأ التجربة المجانية لمدة 7 أيام - لا توجد بطاقة مطلوبة",
    badge: "مجموعة الذكاء الاصطناعي للسمعة المتعددة القطاعات",
    heroTitle: "إدارة ملاحظات العملاء قبل تفاقم المشكلات الصغيرة.",
    subtitle: "احمِ سمعتك عبر قطاعات التجارة والرعاية الصحية والخدمات القانونية والتجزئة والضيافة. أنشئ ردود مسودة احترافية ونظم المتابعات بإشراف بشري كامل.",
    exploreKnowledge: "📚 استكشف مركز المعرفة",
    howItWorks: "كيف تعمل المنصة",
    workflowTitle: "سير عمل بسيط متعدد الصناعات من 3 خطوات",
    workflowSubtitle: "مصمم للمشغلين عبر جميع القطاعات للحفاظ على التحكم المطلق في كل نقطة اتصال.",
    step1Title: "اعتراض التقييمات والملاحظات",
    step1Desc: "يتم جمع التقييمات الواردة واستفسارات العملاء في لوحة تحكم موحدة.",
    step2Title: "صياغة بالذكاء الاصطناعي بموافقة بشرية",
    step2Desc: "يقوم كاکو بصياغة ردود احترافية مصممة خصيصاً لإرشادات قطاعك. أنت تحتفظ بالموافقة النهائية.",
    step3Title: "المتابعة عبر القنوات المتعددة",
    step3Desc: "توجيه روابط الحل الخاص أو تسلسلات الاسترداد عبر الرسائل القصيرة أو الواتساب أو البريد الإلكتروني.",
    demoTitle: "⚡ عرض تفاعلي متعدد الصناعات",
    demoSubtitle: "اختر قطاعك واختبر كيف يقوم كاکو بصياغة ردود خاصة احترافية.",
    sampleFeedbackLabel: "نموذج ملاحظات العملاء",
    generateBtn: "إنشاء مسودة حل خاص واحترافي",
    generatingBtn: "جاري صياغة الرد...",
    approvedOutput: "مخرج الذكاء الاصطناعي المعتمد (يتطلب مراجعة بشرية)",
    readyApproval: "جاهز للموافقة",
    knowledgeHeader: "مركز معرفة RevPulse",
    knowledgeSubtitle: "ابحث في مقالات الأبحاث الخاصة بالتكييف، الرعاية الصحية، البناء، الضيافة، التجارة الإلكترونية، السيارات، التمويل، القانون، العناية الشخصية، والطب البيطري.",
    searchPlaceholder: "🔍 ابحث في التكييف، المواعيد الطبية، التصاريح، الفواتير...",
    allIndustries: "جميع الصناعات",
    askKakuTitle: "اسأل كاکو / غرفة العمليات",
    askKakuSubtitle: "الذكاء الاصطناعي جاهز لجميع القطاعات",
    footerRights: "© 2026 RevPulse. جميع الحقوق محفوظة. المشغل: عمران متين (support@revpulse.tools)",
    
    pricingHeader: "أسعار وخطط شفافة",
    pricingSub: "اختر باقتك لبدء الدفع الآمن والتفعيل الفوري للمساحة.",
    starterPlanBadge: "الباقة الأساسية",
    starterPlanTitle: "موقع واحد",
    starterPrice: "$29",
    starterPeriod: " / شهرياً",
    starterFeature1: "✓ سير عمل الرد على المراجعات المدعوم",
    starterFeature2: "✓ ضوابط صارمة للموافقة البشرية",
    starterFeature3: "✓ مصفوفات توجيه متعددة الصناعات",
    proPlanBadge: "الباقة الاحترافية",
    proPlanTitle: "مواقع متعددة والتوسع",
    proPrice: "$79",
    proPeriod: " / شهرياً",
    proFeature1: "✓ ما يصل إلى 3 مواقع نشطة",
    proFeature2: "✓ مجموعة قنوات الرسائل القصيرة، الواتساب والبريد",
    proFeature3: "✓ معمل اختبار Sandbox مدمج",
    mostPopular: "الأكثر طلباً",

    legalSubtitle: "الشؤون القانونية والامتثال",
    legalTitle: "RevPulse — شروط الاستخدام وسياسة الخصوصية",
    legalMeta: "تاريخ النفاذ: 11 نوفمبر 2026 | المشغل: عمران متين (support@revpulse.tools)",
    part1Title: "الجزء 1: سياسة الخصوصية",
    part1Desc: "يتم تشغيل RevPulse بواسطة عمران متين (“RevPulse”، “نحن”، “لنا”). توضح سياسة الخصوصية هذه كيفية جمعنا للمعلومات واستخدامها ومشاركتها وحمايتها.",
    p1Heading1: "1. المعلومات التي نجمعها",
    p1Text1: "نجمع المعلومات التي تقدمها مباشرة (الاسم، البريد الإلكتروني، رقم الهاتف، اسم الشركة، بيانات الاعتماد، معلومات الفوترة).",
    p1Heading2: "2. كيف نستخدم المعلومات",
    p1Text2: "نستخدم المعلومات لتشغيل الخدمة، وإدارة حسابك والتجربة المجانية لمدة 7 أيام، وإنشاء مسودات الردود.",
    p1Heading3: "3. الميزات المدعومة بالذكاء الاصطناعي والمسؤولية البشرية",
    p1Text3: "قد تكون المقترحات الناتجة عن الذكاء الاصطناعي غير كاملة. أنت وحدك المسؤول عن مراجعة جميع المسودات قبل النشر.",
    part2Title: "الجزء 2: شروط الاستخدام",
    part2Desc: "تخضع شروط الاستخدام هذه لاستخدامك لمنصة RevPulse المقدمة من عمران متين.",
    p2Heading1: "1. التجربة، الخطط المدفوعة والفوترة",
    p2Text1: "توفر RevPulse تجربة مجانية لمدة 7 أيام دون الحاجة لبطاقة دفع مقدماً. يتم فوترة خطط الاشتراك شهرياً ($29/شهرياً للأساسية، $79/شهرياً للاحترافية).",
    p2Heading2: "2. الاتصالات المسؤولة والموافقة",
    p2Text2: "إذا كنت تستخدم RevPulse لإرسال الرسائل القصيرة أو الواتساب أو البريد الإلكتروني، فأنت المرسل والمسؤول الوحيد عن الحصول على الموافقة.",
    p2Heading3: "3. معلومات الاتصال",
    p2Text3: "لأية أسئلة بخصوص هذه الشروط أو استفسارات الخصوصية، تواصل مباشرة مع عمران متين عبر",
    backToOverview: "← العودة إلى نظرة عامة"
  },
  ur: {
    overview: "جائزہ",
    pricing: "قیمتیں",
    dashboard: "کسٹمر ڈیش بورڈ",
    knowledge: "نالج سینٹر",
    legal: "شرائط و ضوابط",
    signIn: "سائن ان",
    signOut: "سائن آؤٹ",
    getStarted: "7 دن کا مفت ٹرائل شروع کریں — کسی کارڈ کی ضرورت نہیں",
    badge: "ملٹی انڈسٹری اے آئی ریپوٹیشن اینڈ اومنی چینل سوٹ",
    heroTitle: "چھوٹی چھوٹی مشکلات بڑھنے سے پہلے کسٹمر کے تاثرات کا انتظام کریں۔",
    subtitle: "تجارت، صحت کی دیکھ بھال، قانونی، خوردہ، مہمان نوازی اور پیشہ ورانہ خدمات میں اپنی ساکھ کی حفاظت کریں۔ پیشہ ورانہ ڈرافٹ جوابات تیار کریں۔",
    exploreKnowledge: "📚 نالج سینٹر دریافت کریں",
    howItWorks: "یہ کیسے کام کرتا ہے",
    workflowTitle: "آسان 3 قدمی ملٹی انڈسٹری ورک فلو",
    workflowSubtitle: "تمام شعبوں کے آپریٹرز کے لیے ڈیزائن کیا گیا ہے تاکہ ہر کسٹمر ٹچ پوائنٹ پر مکمل کنٹرول رکھا جا سکےـ",
    step1Title: "ریویو اور فیڈ بیک انٹرسیپٹ",
    step1Desc: "آنے والی ریٹنگز اور کسٹمر انکوائریز کو آپ کے متحد ملٹی چینل ڈیش بورڈ میں اکٹھا کیا جاتا ہے۔",
    step2Title: "انسانی منظوری سے لیس اے آئی ڈرافٹنگ",
    step2Desc: "کاکو آپ کی صنعت کے رہنما اصولوں کے مطابق پیشہ ورانہ جوابات تیار کرتا ہے۔ حتمی منظوری آپ کی ہوتی ہے۔",
    step3Title: "اومنی چینل فولو اپ",
    step3Desc: "ایس ایم ایس، واٹس ایپ یا ای میل کے ذریعے نجی حل کے لنکس بھیجیں۔",
    demoTitle: "⚡ انٹرایکٹو ملٹی انڈسٹری ڈیمو",
    demoSubtitle: "اپنی صنعت کا انتخاب کریں اور جانچیں کہ کاکو نجی جوابات کیسے تیار کرتا ہے۔",
    sampleFeedbackLabel: "نمونہ فیڈ بیک",
    generateBtn: "پروفیشنل پرائیویٹ ریزولوشن ڈرافٹ بنائیں",
    generatingBtn: "جواب تیار کیا جا رہا ہے...",
    approvedOutput: "منظور شدہ اے آئی آؤٹ پٹ (انسانی جائزے کی ضرورت ہے)",
    readyApproval: "منظوری کے لیے تیار",
    knowledgeHeader: "RevPulse ملٹی انڈسٹری نالج سینٹر",
    knowledgeSubtitle: "HVAC، ہیلتھ کیئر، تعمیرات، مہمان نوازی، ای کامرس، آٹوموٹو، فنانس، قانونی، اور ویٹرنری مضامین تلاش کریں۔",
    searchPlaceholder: "🔍 تلاش کریں HVAC، ڈেন্টل انتظار کا وقت، اجازت نامے، ویٹرنری بل...",
    allIndustries: "تمام صنعتیں",
    askKakuTitle: "کاکو سے پوچھیں / سچویشن روم",
    askKakuSubtitle: "ملٹی انڈسٹری اے آئی تیار ہے",
    footerRights: "© 2026 RevPulse. جملہ حقوق محفوظ ہیں۔ آپریٹر: عمران متین (support@revpulse.tools)",
    
    pricingHeader: "شفاف قیمتیں اور پلانز",
    pricingSub: "محفوظ چیک آؤٹ اور فوری ورک اسپیس ایکتیویشن کے لیے اپنا ٹیر منتخب کریں۔",
    starterPlanBadge: "اسارٹر پلان",
    starterPlanTitle: "سنگل لوکیشن",
    starterPrice: "$29",
    starterPeriod: " / مہینہ",
    starterFeature1: "✓ ریویو رسپانس کا تعاون یافتہ ورک فلو",
    starterFeature2: "✓ انسانی منظوری کے سخت کنٹرولز",
    starterFeature3: "✓ ملٹی انڈسٹری پرامپٹ میٹرکس",
    proPlanBadge: "پرو پلان",
    proPlanTitle: "ملٹی لوکیشن اور اسکیل",
    proPrice: "$79",
    proPeriod: " / مہینہ",
    proFeature1: "✓ 3 فعال مقامات تک",
    proFeature2: "✓ اومنی چینل ایس ایم ایس، واٹس ایپ اور ای میل سوٹ",
    proFeature3: "✓ بلٹ ان ٹیسٹنگ اینڈ سینڈ باکس لیب",
    mostPopular: "سب سے زیادہ مقبول",

    legalSubtitle: "قانونی اور تعمیل",
    legalTitle: "RevPulse — استعمال کی شرائط اور پرائیویسی پالیسی",
    legalMeta: "نافذ العمل تاریخ: 11 نومبر 2026 | آپریٹر: عمران متین (support@revpulse.tools)",
    part1Title: "حصہ 1: پرائیویسی پالیسی",
    part1Desc: "RevPulse عمران متین کے ذریعہ چلایا جاتا ہے۔ یہ پرائیویسی پالیسی بتاتی ہے کہ جب آپ تشریف لاتے ہیں تو ہم معلومات کو کیسے جمع اور محفوظ کرتے ہیں۔",
    p1Heading1: "1. جو معلومات ہم جمع کرتے ہیں",
    p1Text1: "ہم وہ معلومات جمع کرتے ہیں جو آپ براہ راست فراہم کرتے ہیں (نام، ای میل، فون نمبر، کاروبار کا نام، بلنگ کی معلومات)۔",
    p1Heading2: "2. ہم معلومات کا استعمال کیسے کرتے ہیں",
    p1Text2: "ہم اس سروس کو چلانے، آپ کے اکاؤنٹ اور 7 دن کے ٹرائل کا انتظام کرنے، اور ریویو رسپانس کے مسودے تیار کرنے کے لیے معلومات کا استعمال کرتے ہیں۔",
    p1Heading3: "3. اے آئی معاون خصوصیات اور انسانی ذمہ داری",
    p1Text3: "اے آئی کے تیار کردہ مشورے نامکمل ہو سکتے ہیں۔ آپ اشاعت سے پہلے تمام مسودات کا جائزہ لینے کے لیے مکمل طور پر ذمہ دار ہیں۔",
    part2Title: "حصہ 2: استعمال کی شرائط",
    part2Desc: "استعمال کی یہ شرائط RevPulse پلیٹ فارم تک آپ کی رسائی کو کنٹرول کرتی ہیں۔",
    p2Heading1: "1. ٹرائل، پیڈ پلانز اور بلنگ",
    p2Text1: "RevPulse بغیر کسی پیشگی کارڈ کے 7 دن کا مفت ٹرائل پیش کرتا ہے۔ سبسکرپشن پلان ماہانہ بل کیے جاتے ہیں۔",
    p2Heading2: "2. ذمہ دارانہ مواصلات اور رضامندی",
    p2Text2: "اگر آپ SMS، WhatsApp یا ای میل کے لیے RevPulse استعمال کرتے ہیں، تو آپ مرسل ہیں اور رضامندی حاصل کرنے کے ذمہ دار ہیں۔",
    p2Heading3: "3. رابطے کی معلومات",
    p2Text3: "ان شرائط سے متعلق کسی بھی سوال یا پرائیویسی کے استفسار کے لیے، براہ راست عمران متین سے رابطہ کریں",
    backToOverview: "← واپس جائزہ پر"
  }
};

const verticalTranslations = {
  en: {
    hvac: "HVAC & Trades",
    dental: "Dental Practices",
    contractors: "General Contractors",
    hospitality: "Restaurants & Dining",
    hotels: "Hotels & Rentals",
    ecommerce: "E-Commerce Retail",
    automotive: "Auto Repair",
    financial: "Financial Services / CPA",
    legal: "Legal & Consulting",
    wellness: "Health & Beauty",
    veterinary: "Veterinary & Pets"
  },
  fr: {
    hvac: "CVC & Métiers",
    dental: "Cabinets Dentaires",
    contractors: "Entrepreneurs Généraux",
    hospitality: "Restaurants & Gastronomie",
    hotels: "Hôtels & Locations",
    ecommerce: "Vente en Ligne",
    automotive: "Réparation Auto",
    financial: "Services Financiers / Expert-Comptable",
    legal: "Juridique & Conseil",
    wellness: "Santé & Beauté",
    veterinary: "Vétérinaire & Animaux"
  },
  es: {
    hvac: "HVAC y Oficios",
    dental: "Prácticas Dentales",
    contractors: "Contratistas Generales",
    hospitality: "Restaurantes y Cenas",
    hotels: "Hoteles y Alquileres",
    ecommerce: "Comercio Electrónico",
    automotive: "Reparación de Autos",
    financial: "Servicios Financieros / CPA",
    legal: "Legal y Consultoría",
    wellness: "Salud y Belleza",
    veterinary: "Veterinaria y Mascotas"
  },
  it: {
    hvac: "HVAC e Impianti",
    dental: "Studi Dentistici",
    contractors: "Imprese Edili",
    hospitality: "Ristoranti e Bar",
    hotels: "Hotel e Affitti",
    ecommerce: "E-Commerce",
    automotive: "Riparazione Auto",
    financial: "Servizi Finanziari / Commercialista",
    legal: "Legale e Consulenza",
    wellness: "Salute e Bellezza",
    veterinary: "Veterinaria e Animali"
  },
  ar: {
    hvac: "التكييف والمهن",
    dental: "عيادات الأسنان",
    contractors: "المقاولون العامون",
    hospitality: "المطاعم والضيافة",
    hotels: "الفنادق والشقق",
    ecommerce: "التجارة الإلكترونية",
    automotive: "إصلاح السيارات",
    financial: "الخدمات المالية / المحاسب",
    legal: "الشؤون القانونية والاستشارات",
    wellness: "الصحة والجمال",
    veterinary: "الطب البيطري والحيوانات"
  },
  ur: {
    hvac: "ایچ وی اے سی اور ٹریڈز",
    dental: "ڈেন্টل پریکٹسز",
    contractors: "جنرل کنٹریکٹرز",
    hospitality: "ریسٹورنٹس اور ڈائننگ",
    hotels: "ہوٹلز اور رینٹلز",
    ecommerce: "ای کامرس ریٹیل",
    automotive: "آٹو مرمت",
    financial: "فنانشل سروسز / سی پی اے",
    legal: "قانونی اور مشاورت",
    wellness: "صحت اور خوبصورتی",
    veterinary: "ویٹرنری اور پیٹس"
  }
};

const categoryTranslations = {
  en: {
    all: "All Industries",
    hvac: "HVAC & Trades",
    dental: "Dental & Healthcare",
    contractors: "Contractors & Permits",
    hospitality: "Restaurants & Dining",
    hotels: "Hotels & Rentals",
    ecommerce: "E-Commerce",
    automotive: "Auto Repair",
    financial: "Finance & CPAs",
    legal: "Legal & Consulting",
    wellness: "Health & Beauty",
    veterinary: "Veterinary & Pets"
  },
  fr: {
    all: "Toutes les industries",
    hvac: "CVC & Métiers",
    dental: "Santé & Dentaire",
    contractors: "Construction & Permis",
    hospitality: "Restaurants",
    hotels: "Hôtels & Locations",
    ecommerce: "E-Commerce",
    automotive: "Réparation Auto",
    financial: "Finance & Compta",
    legal: "Juridique & Conseil",
    wellness: "Santé & Beauté",
    veterinary: "Vétérinaire & Animaux"
  },
  es: {
    all: "Todas las industrias",
    hvac: "HVAC y Oficios",
    dental: "Salud y Dental",
    contractors: "Contratistas y Permisos",
    hospitality: "Restaurantes",
    hotels: "Hoteles y Alquileres",
    ecommerce: "Comercio Electrónico",
    automotive: "Reparación de Autos",
    financial: "Finanzas y CPA",
    legal: "Legal y Consultoría",
    wellness: "Salud y Belleza",
    veterinary: "Veterinaria y Mascotas"
  },
  it: {
    all: "Tutte le industrie",
    hvac: "HVAC e Impianti",
    dental: "Sanità e Dentale",
    contractors: "Edilizia e Permessi",
    hospitality: "Ristoranti",
    hotels: "Hotel e Affitti",
    ecommerce: "E-Commerce",
    automotive: "Riparazione Auto",
    financial: "Finanza e Commercialista",
    legal: "Legale e Consulenza",
    wellness: "Salute e Bellezza",
    veterinary: "Veterinaria e Animali"
  },
  ar: {
    all: "جميع الصناعات",
    hvac: "التكييف والمهن",
    dental: "الرعاية الصحية والأسنان",
    contractors: "المقاولون والتصاريح",
    hospitality: "المطاعم",
    hotels: "الفنادق والشقق",
    ecommerce: "التجارة الإلكترونية",
    automotive: "إصلاح السيارات",
    financial: "التمويل والمحاسبة",
    legal: "الشؤون القانونية",
    wellness: "الصحة والجمال",
    veterinary: "الطب البيطري والحيوانات"
  },
  ur: {
    all: "تمام صنعتیں",
    hvac: "ایچ وی اے سی اور ٹریڈز",
    dental: "صحت اور ڈেন্টل",
    contractors: "کنٹریکٹرز اور پرمٹس",
    hospitality: "ریسٹورنٹس",
    hotels: "ہوٹلز اور رینٹلز",
    ecommerce: "ای کامرس",
    automotive: "آٹو مرمت",
    financial: "فنانس اور سی پی اے",
    legal: "قانونی اور مشاورت",
    wellness: "صحت اور خوبصورتی",
    veterinary: "ویٹرنری اور پیٹس"
  }
};

const verticalData = {
  hvac: {
    review: "Called for an AC repair on Tuesday, technician arrived late, and the bill was higher than quoted.",
    response: "Hello. Thank you for sharing your feedback. We regret that your service timing and billing clarity did not meet our standard. Please reach out to our service manager directly so we can review your account."
  },
  dental: {
    review: "Wait time in the lobby was over 45 minutes past my scheduled appointment slot.",
    response: "Hello, thank you for your feedback. We strive to respect your time and apologize for the delay during your visit. Please contact our practice manager so we can assist you."
  },
  contractors: {
    review: "County inspector flagged our project for an unpermitted patio enclosure. Very stressed!",
    response: "Hello. We take building compliance seriously and are coordinating directly with the county office to resolve this permit inspection item immediately. Let's review the paperwork together today."
  },
  hospitality: {
    review: "Ordered takeout online, drove home, and realized two entrees were completely missing.",
    response: "Hello. We apologize for the missing items in your takeout order. Please reach out to our manager directly so we can issue an immediate refund and arrange a complimentary meal for your next visit."
  },
  hotels: {
    review: "Arrived at the rental property and the smart lock code didn't work for 30 minutes in the cold.",
    response: "Hello. We sincerely apologize for the lockbox delay upon your arrival. That is not the seamless experience we strive for. Please contact us directly so we can make this right."
  },
  ecommerce: {
    review: "My package tracking number has been stuck on 'Label Created' for 5 days with no update.",
    response: "Hello. Thank you for bringing this fulfillment delay to our attention. We are investigating with the carrier immediately and will send you a priority replacement or tracking update today."
  },
  automotive: {
    review: "Brought my car in for a squeak, and was told I needed $1,200 in extra unneeded flushes.",
    response: "Hello. We want you to feel completely confident in our recommendations. Let's review the digital inspection photos together so we can clarify what service is truly necessary right now."
  },
  financial: {
    review: "Dropped off my corporate tax documents two months ago and haven't heard a single update.",
    response: "Hello. We apologize for the communication gap during our filing queue. Your return is currently in final review, and our senior partner will call you by 2 PM today with a complete status update."
  },
  legal: {
    review: "My attorney hasn't returned my phone calls in three weeks regarding my case status.",
    response: "Hello. We understand how critical timely communication is for your peace of mind. Our team is pulling your case file right now to provide a comprehensive update before end of business today."
  },
  wellness: {
    review: "Booked a balayage appointment and left with hair that turned out bright orange and damaged.",
    response: "Hello. We take your hair health and satisfaction extremely seriously. Please come back into the salon this week so our master stylist can perform a complimentary corrective treatment."
  },
  veterinary: {
    review: "Was hit with a massive surprise bill at discharge without anyone discussing costs beforehand.",
    response: "Hello. We regret the lack of financial clarity regarding your pet's treatment charges. Please speak with our practice director directly so we can review the itemized statement together."
  }
};

const demoContentTranslations = {
  en: verticalData,
  fr: {
    hvac: {
      review: "Appel pour une réparation de climatisation mardi, le technicien est arrivé en retard et la facture était plus élevée que prévu.",
      response: "Bonjour. Merci d'avoir partagé votre avis. Nous regrettons que le délai et la clarté de la facture n'aient pas répondu à nos normes. Veuillez contacter notre responsable."
    },
    dental: {
      review: "Le temps d'attente dans le hall dépassait 45 minutes par rapport à l'heure prévue.",
      response: "Bonjour, merci pour votre commentaire. Nous nous efforçons de respecter votre temps et vous prions d'excuser ce retard. Contactez notre responsable de cabinet."
    },
    contractors: {
      review: "L'inspecteur du comté a signalé notre projet pour une clôture de patio non autorisée. Très stressant !",
      response: "Bonjour. Nous prenons la conformité au sérieux et coordonnons avec le bureau du comté pour résoudre ce problème de permis. Examinons les documents ensemble."
    },
    hospitality: {
      review: "Commande à emporter en ligne, rentré chez moi, et j'ai réalisé que deux plats principaux manquaient.",
      response: "Bonjour. Nous nous excusons pour les articles manquants. Contactez notre responsable directement pour un remboursement immédiat et un repas offert."
    },
    hotels: {
      review: "Arrivé à la location et le code de la serrure connectée n'a pas fonctionné pendant 30 minutes dans le froid.",
      response: "Bonjour. Nous nous excusons sincèrement pour ce problème de retard à l'arrivée. Contactez-nous directement pour rectifier la situation."
    },
    ecommerce: {
      review: "Mon numéro de suivi de colis est bloqué sur 'Étiquette créée' depuis 5 jours sans mise à jour.",
      response: "Bonjour. Merci d'avoir signalé ce retard. Nous enquêtons immédiatement auprès du transporteur et vous enverrons une mise à jour ou un remplacement."
    },
    automotive: {
      review: "J'ai apporté ma voiture pour un grincement et on m'a dit que j'avais besoin de 1200 $ de purges supplémentaires inutiles.",
      response: "Bonjour. Nous voulons que vous ayez totale confiance en nos recommandations. Examinons ensemble les photos d'inspection numérique."
    },
    financial: {
      review: "J'ai déposé mes documents fiscaux d'entreprise il y a deux mois et je n'ai reçu aucune nouvelle.",
      response: "Bonjour. Nous nous excusons pour cette lacune de communication. Votre déclaration est en cours de révision finale."
    },
    legal: {
      review: "Mon avocat n'a pas répondu à mes appels depuis trois semaines concernant mon dossier.",
      response: "Bonjour. Nous comprenons l'importance d'une communication rapide. Notre équipe consulte votre dossier pour vous donner une mise à jour."
    },
    wellness: {
      review: "Rendez-vous balayage réservé et je suis repartie avec des cheveux orange vif et abîmés.",
      response: "Bonjour. Nous prenons votre satisfaction très au sérieux. Revenez au salon cette semaine pour un soin correctif gracieux."
    },
    veterinary: {
      review: "Facture surprise énorme à la sortie sans que personne n'en discute au préalable.",
      response: "Bonjour. Nous regrettons le manque de clarté financière. Veuillez parler directement à notre directeur de pratique."
    }
  },
  es: {
    hvac: {
      review: "Llamé para reparar el aire acondicionado el martes, el técnico llegó tarde y la factura fue mayor a la cotizada.",
      response: "Hola. Gracias por compartir sus comentarios. Lamentamos que el tiempo y la claridad de la factura no cumplieran con nuestro estándar. Comuníquese con nuestro gerente."
    },
    dental: {
      review: "El tiempo de espera en el vestíbulo fue de más de 45 minutos pasada mi cita programada.",
      response: "Hola, gracias por sus comentarios. Nos esforzamos por respetar su tiempo y nos disculpamos por la demora. Contacte al gerente de la práctica."
    },
    contractors: {
      review: "El inspector del condado marcó nuestro proyecto por un cierre de patio sin permiso. ¡Muy estresante!",
      response: "Hola. Tomamos el cumplimiento de códigos muy en serio y estamos coordinando con la oficina del condado para resolver esto. Revisemos los documentos hoy."
    },
    hospitality: {
      review: "Pedí comida para llevar en línea, llegué a casa y me di cuenta de que faltaban dos platos principales.",
      response: "Hola. Nos disculpamos por los artículos faltantes en su pedido. Comuníquese con nuestro gerente para emitir un reembolso inmediato y una comida de cortesía."
    },
    hotels: {
      review: "Llegué a la propiedad de alquiler y el código de la cerradura inteligente no funcionó durante 30 minutos en el frío.",
      response: "Hola. Nos disculpamos sinceramente por el retraso en la caja de seguridad. Contáctenos directamente para solucionar esto."
    },
    ecommerce: {
      review: "Mi número de seguimiento de paquete lleva 5 días atascado en 'Etiqueta creada' sin actualizaciones.",
      response: "Hola. Gracias por informarnos sobre este retraso. Estamos investigando con la empresa de transporte inmediatamente y le enviaremos un reemplazo."
    },
    automotive: {
      review: "Llevé mi auto por un chirrido y me dijeron que necesitaba $1,200 en lavados adicionales innecesarios.",
      response: "Hola. Queremos que se sienta completamente seguro en nuestras recomendaciones. Revisemos juntos las fotos de inspección digital."
    },
    financial: {
      review: "Dejé mis documentos de impuestos corporativos hace dos meses y no he recibido ninguna actualización.",
      response: "Hola. Nos disculpamos por la brecha de comunicación. Su declaración está en revisión final y nuestro socio principal lo llamará hoy."
    },
    legal: {
      review: "Mi abogado no ha devuelto mis llamadas en tres semanas sobre el estado de mi caso.",
      response: "Hola. Entendemos lo crucial que es la comunicación oportuna. Nuestro equipo está revisando su expediente para darle una actualización."
    },
    wellness: {
      review: "Reservé una cita de balayage y salí con el cabello naranja brillante y dañado.",
      response: "Hola. Tomamos la salud de su cabello muy en serio. Vuelva al salón esta semana para que nuestro estilista realice un tratamiento corrector."
    },
    veterinary: {
      review: "Recibí una factura sorpresa enorme al dar de alta a mi mascota sin que nadie discutiera los costos antes.",
      response: "Hola. Lamentamos la falta de claridad financiera sobre los cargos. Hable directamente con nuestro director de práctica."
    }
  },
  it: {
    hvac: {
      review: "Chiamato per riparazione AC martedì, tecnico arrivato in ritardo e conto più alto del preventivo.",
      response: "Salve. Grazie per il feedback. Ci dispiace che i tempi e la fatturazione non siano stati chiari. Contatti il nostro responsabile."
    },
    dental: {
      review: "Tempo di attesa in sala d'attesa oltre 45 minuti rispetto all'orario fissato.",
      response: "Salve, grazie per il feedback. Ci scusiamo per il ritardo. Contatti il nostro responsabile dello studio."
    },
    contractors: {
      review: "L'ispettore ha bloccato il nostro cantiere per un patio senza permessi. Molto stressante!",
      response: "Salve. Prendiamo sul serio la conformità edilizia e stiamo coordinando con gli uffici comunali per risolvere."
    },
    hospitality: {
      review: "Ordinato d'asporto online, arrivato a casa mancavano due piatti principali.",
      response: "Salve. Ci scusiamo per gli articoli mancanti nel vostro ordine. Contattate il nostro gestore per un rimborso immediato."
    },
    hotels: {
      review: "Arrivato all'alloggio e il codice della serratura smart non ha funzionato per 30 minuti al freddo.",
      response: "Salve. Ci scusiamo sinceramente per il disagio all'arrivo. Contattateci direttamente per rimediare."
    },
    ecommerce: {
      review: "Il mio numero di tracciamento è bloccato su 'Etichetta creata' da 5 giorni.",
      response: "Salve. Grazie per aver segnalato il ritardo. Stiamo verificando con il corriere e invieremo un aggiornamento."
    },
    automotive: {
      review: "Portato l'auto per un cigolio, mi è stato detto che servivano 1.200$ di lavaggi non necessari.",
      response: "Salve. Vogliamo che si fidi delle nostre raccomandazioni. Rivediamo insieme le foto dell'ispezione digitale."
    },
    financial: {
      review: " Consegnato i documenti fiscali due mesi fa e non ho ricevuto alcuna notizia.",
      response: "Salve. Ci scusiamo per la mancanza di comunicazione. La vostra dichiarazione è in fase di revisione finale."
    },
    legal: {
      review: "Il mio avvocato non risponde alle chiamate da tre settimane sullo stato del caso.",
      response: "Salve. Comprendiamo l'importanza della comunicazione tempestiva. Il nostro team sta esaminando la pratica."
    },
    wellness: {
      review: "Prenotato appuntamento balayage, capelli usciti arancioni accesi e rovinati.",
      response: "Salve. Prendiamo molto sul serio la vostra soddisfazione. Tornate in salone per un trattamento correttivo gratuito."
    },
    veterinary: {
      review: "Maxi bolletta a sorpresa al momento delle dimissioni senza previa discussione dei costi.",
      response: "Salve. Ci dispiace per la mancanza di trasparenza finanziaria. Parlate direttamente con il direttore."
    }
  },
  ar: {
    hvac: {
      review: "اتصلت لإصلاح المكيف يوم الثلاثاء، وصل الفني متأخراً وكانت الفاتورة أعلى من المتوقع.",
      response: "مرحباً. شكراً لمشاركتك ملاحظاتك. نأسف لأن توقيت الخدمة ووضوح الفواتير لم يرقيا إلى مستوانا. يرجى التواصل مع مدير الخدمة مباشرة لمراجعة حسابك."
    },
    dental: {
      review: "وقت الانتظار في الاستقبال تجاوز 45 دقيقة بعد موعدي المحدد.",
      response: "مرحباً، شكراً لملاحظاتك. نساهم في احترام وقتك ونعتذر عن التأخير. يرجى الاتصال بمدير عيادتنا لمساعدتك."
    },
    contractors: {
      review: "مفتش المقاطعة قام بمخالفة مشروعنا بسبب بناء فناء غير مرخص. أمر مزعج للغاية!",
      response: "مرحباً. نحن نأخذ الامتثال البناء على محمل الجد ونسق مع مكتب المقاطعة لحل هذه المشكلة فوراً."
    },
    hospitality: {
      review: "طلبت طعاماً عبر الإنترنت، وعندما وصلت إلى المنزل وجدت وجبتين مفقودتين تماماً.",
      response: "مرحباً. نعتذر عن العناصر المفقودة في طلبك. يرجى التواصل مع مديرنا مباشرة لنتمكن من إصدار استرداد فوري."
    },
    hotels: {
      review: "وصلت إلى مكان الإقامة ولم يعمل رمز القفل الذكي لمدة 30 دقيقة في البرد.",
      response: "مرحباً. نعتذر بصدق عن تأخير صندوق المفاتيح عند وصولك. يرجى الاتصال بنا مباشرة لنصلح هذا الأمر."
    },
    ecommerce: {
      review: "رقم تتبع الشحنة الخاص بي عالق في حالة 'تم إنشاء الملصق' منذ 5 أيام دون تحديث.",
      response: "مرحباً. شكراً لتنبيهنا بتأخير الشحن هذا. نحن نحقق مع شركة الشحن فوراً وسنرسل لك تحديثاً أو بديلاً."
    },
    automotive: {
      review: "أحضفت سيارتي بسبب صوت صرير، وأخبروني أنني بحاجة إلى 1200 دولار كخدمات إضافية غير ضرورية.",
      response: "مرحباً. نريد أن تشعر بالثقة الكاملة في توصياتنا. دعنا نراجع صور الفحص الرقمي معاً لنوضح الخدمات الضرورية حقاً."
    },
    financial: {
      review: "سلمت مستندات ضرائب الشركات الخاصة بي قبل شهرين ولم أسمع أي تحديث.",
      response: "مرحباً. نعتذر عن الفجوة في الاتصالات أثناء صف الانتظار. إقرارك حالياً في المراجعة النهائية وسيتصل بك شريكنا."
    },
    legal: {
      review: "محامي لم يرد على مكالماتي الهاتفية منذ ثلاثة أسابيع بخصوص حالة قضيتي.",
      response: "مرحباً. نحن نتفهم مدى أهمية التواصل في الوقت المناسب لراحة بالك. يقوم فريقنا بسحب ملف قضيتك الآن."
    },
    wellness: {
      review: "حجزت موعداً لصبغة الشعر وخرجت بشعر برتقالي فاقع وتالف.",
      response: "مرحباً. نحن نأخذ صحة شعرك ورضاك على محمل الجد. يرجى العودة إلى الصالون هذا الأسبوع ليقوم خبيرنا بالعلاج."
    },
    veterinary: {
      review: "فاجأوني بفاتورة ضخمة للغاية عند الخروج دون مناقشة التكاليف مسبقاً.",
      response: "مرحباً. نأسف لعدم الوضوح المالي فيما يتعلق برسوم علاج حيوانك الأليف. يرجى التحدث مع مدير العيادة مباشرة."
    }
  },
  ur: {
    hvac: {
      review: "منگل کو اے سی کی مرمت کے لیے کال کی، ٹیکنیشین دیر سے آیا اور بل بتائے گئے تخمینے سے زیادہ تھا۔",
      response: "ہیلو۔ آپ کے تاثرات کا شکریہ۔ ہمیں افسوس ہے کہ سروس کا وقت اور بلنگ کا معیار ہمارے مطابق نہیں تھا۔ براہ کرم ہمارے سروس مینیجر سے رابطہ کریں۔"
    },
    dental: {
      review: "لاؤنج میں انتظار کا وقت میرے مقررہ وقت سے 45 منٹ زیادہ تھا۔",
      response: "ہیلو، آپ کے تاثرات کا شکریہ۔ ہم آپ کے وقت کا احترام کرنے کی کوشش کرتے ہیں اور تاخیر پر معذرت خواہ ہیں۔ براہ کرم ہمارے مینیجر سے رابطہ کریں۔"
    },
    contractors: {
      review: "کاؤنٹی انسپکٹر نے بغیر اجازت نامے کے پیٹیو انکلوزر پر ہمارے پروجیکٹ پر اعتراض کیا۔ بہت پریشانی ہوئی!",
      response: "ہیلو۔ ہم عمارت کے ضوابط کو سنجیدگی سے لیتے ہیں اور پرمٹ کے اس مسئلے کو حل کرنے کے لیے کاؤنٹی کے دفتر سے رابطہ کر رہے ہیں۔"
    },
    hospitality: {
      review: "آن لائن کھانا آرڈر کیا، گھر پہنچے تو معلوم ہوا کہ دو مین کورس غائب ہیں۔",
      response: "ہیلو۔ ہم آپ کے آرڈر میں غائب اشیاء پر معذرت خواہ ہیں۔ براہ کرم ہمارے مینیجر سے رابطہ کریں تاکہ فوری ریفنڈ جاری کیا جا سکےـ"
    },
    hotels: {
      review: "رینٹل پراپرٹی پر پہنچے تو سمارٹ لاک کا کوڈ سردی میں 30 منٹ تک کام نہیں کرتا رہا۔",
      response: "ہیلو۔ آمد پر لاک باکس میں تاخیر پر ہمیں مخلصانہ معذرت ہے۔ براہ کرم ہم سے براہ راست رابطہ کریں تاکہ ہم اس کو درست کر سکیں۔"
    },
    ecommerce: {
      review: "میرے پیکیج کا ٹریکنگ نمبر 5 دن سے 'لیبل تخلیق' پر پھنسا ہوا ہے۔",
      response: "ہیلو۔ اس تاخیر کی طرف ہماری توجہ مبذول کرانے کا شکریہ۔ ہم فوری طور پر کورئیر کے ساتھ تحقیقات کر رہے ہیں۔"
    },
    automotive: {
      review: "گاڑی ایک آواز پر لایا، اور کہا گیا کہ مجھے 1200 ڈالر کے اضافی فالتو فلاشز کی ضرورت ہے۔",
      response: "ہیلو۔ ہم چاہتے ہیں کہ آپ ہماری سفارشات پر مکمل اعتماد کریں۔ آئیے ڈیجیٹل انسپیکشن کی تصاویر کا جائزہ لیں۔"
    },
    financial: {
      review: "دو ماہ پہلے کارپوریٹ ٹیکس کے کاغذات جمع کرائے تھے اور کوئی اپ ڈیٹ نہیں ملی۔",
      response: "ہیلو۔ ہم فائلنگ کی قطار کے دوران مواصلاتی وقفے پر معذرت خواہ ہیں۔ آپ کا ریٹرن حتمی مرحلے میں ہے۔"
    },
    legal: {
      review: "میرے وکیل نے میرے کیس کے بارے میں تین ہفتوں سے میری کالز کا جواب نہیں دیا۔",
      response: "ہیلو۔ آپ کے سکون کے لیے وقت پر مواصلات کی اہمیت کو سمجھتے ہیں۔ ہماری ٹیم آپ کی فائل کا جائزہ لے رہی ہے۔"
    },
    wellness: {
      review: "بالوں کے رنگ کی بکنگ کی اور جب باہر آئے تو بال چمکدار نارنجی اور خراب ہو چکے تھے۔",
      response: "ہیلو۔ ہم آپ کے بالوں کی صحت اور اطمینان کو بہت سنجیدگی سے لیتے ہیں۔ براہ کرم اس ہفتے سلون واپس آئیں۔"
    },
    veterinary: {
      review: "ڈسچارج کے وقت بغیر کسی پیشگی بحث کے بھاری بھرکم بل تھما دیا گیا۔",
      response: "ہیلو۔ ہمیں آپ کے پالتو جانوروں کے علاج کے اخراجات میں مالی وضاحت کی کمی پر افسوس ہے۔ براہ کرم ڈائریکٹر سے بات کریں۔"
    }
  }
};

const knowledgeArticlesTranslations = {
  en: [
    {
      id: 1,
      category: 'hvac',
      title: 'Handling Severe 1-Star Billing & Delay Disputes (HVAC)',
      summary: 'Framework for intercepting arrival delays and invoice disputes before they impact local search rankings.',
      content: 'When an HVAC customer leaves a low rating regarding arrival timing or pricing, Kaku instantly intercepts the public post. Acknowledge friction privately, offer a manager callback within 15 minutes, and provide a direct secure resolution link via SMS.'
    },
    {
      id: 2,
      category: 'hvac',
      title: 'Extreme Weather Dispatch & Safety Hazard Triage',
      summary: 'Managing high-panic heatwave/freeze breakdowns and communicating safety findings transparently.',
      content: 'During weather extremes, homeowners face high vulnerability. Frame safety discoveries (like cracked heat exchangers) with transparent documentation, photos, and clear explanation to avoid accusations of manufactured sales.'
    },
    {
      id: 3,
      category: 'dental',
      title: 'Managing Lobby Wait Times & Patient Sentiment (Dental)',
      summary: 'Automating apology workflows and re-booking appointments when clinical delays exceed 30 minutes.',
      content: 'When lobby wait times exceed 30 minutes, automated SMS notifications should offer complimentary parking vouchers or priority scheduling while maintaining a calm, empathetic tone.'
    },
    {
      id: 4,
      category: 'dental',
      title: 'Surprise Billing & Insurance Opacity Resolution',
      summary: 'Providing transparent, plain-language financial estimates prior to major procedures to prevent chargebacks.',
      content: 'Proactively clarify out-of-network costs and coding breakdowns. Transparent communication before treatment drastically reduces patient anxiety and post-procedure billing disputes.'
    },
    {
      id: 5,
      category: 'contractors',
      title: 'Navigating Red-Tag Stop-Work Orders & Permitting',
      summary: 'Immediate action plan when code enforcement halts construction due to permit or setback issues.',
      content: 'Address red tags immediately by coordinating directly with county plan reviewers, pulling required permits as the licensed contractor (avoiding owner-builder liability), and communicating timelines transparently to the property owner.'
    },
    {
      id: 6,
      category: 'contractors',
      title: 'Managing Hidden Condition Code Upgrades & Change Orders',
      summary: 'Handling unexpected structural rot, outdated wiring, or plumbing code traps mid-project.',
      content: 'Use digital change-order documentation with photo evidence before opening walls or performing code-mandated upgrades, ensuring the homeowner approves costs before work proceeds.'
    },
    {
      id: 7,
      category: 'hospitality',
      title: 'Preventing the Silent Churn & Off-Premise Order Errors',
      summary: 'Resolving missing takeout items and long table wait times before guests quietly stop returning.',
      content: 'Implement double-check packing protocols for delivery/takeout and rapid manager table visits when wait times exceed quotes to salvage guest retention.'
    },
    {
      id: 8,
      category: 'hospitality',
      title: 'Severe Allergy Protocols & Dietary Mishap Recovery',
      summary: 'Immediate crisis response when cross-contamination or allergen oversights occur during service.',
      content: 'Mandate immediate kitchen accountability, direct general manager involvement, and immediate medical assistance if necessary. Follow up within 2 hours with a sincere, documented apology.'
    },
    {
      id: 9,
      category: 'hotels',
      title: 'Short-Term Rental Midnight Lockouts & Cleanliness Recovery',
      summary: 'Resolving smart-lock failures and cleaning discrepancies within the critical 15-minute window.',
      content: 'Keep emergency locksmith contacts on standby, maintain backup key lockboxes, and provide instant partial refunds or amenity credits within 15 minutes of reported cleaning lapses to secure 5-star reviews.'
    },
    {
      id: 10,
      category: 'hotels',
      title: 'Transparency in Resort Fees & Direct Booking Retention',
      summary: 'Eliminating hidden fee shock through upfront disclosure across all digital booking channels.',
      content: 'Disclose all parking, resort, and cleaning fees transparently prior to checkout to eliminate negative reviews driven by fee shock and increase direct repeat bookings.'
    },
    {
      id: 11,
      category: 'ecommerce',
      title: 'Proactive Fulfillment Communication & Return Fee Management',
      summary: 'Mitigating ghost tracking, delivery delays, and return friction to protect customer lifetime value.',
      content: 'Notify customers proactively via automated SMS/email when carriers experience transit bottlenecks. Offer transparent, effortless return portals to drive long-term brand loyalty.'
    },
    {
      id: 12,
      category: 'automotive',
      title: 'Digital Inspections & Eliminating the "Ghost Repair" Stigma',
      summary: 'Using high-resolution photo and video text links to build absolute transparency in auto repair.',
      content: 'Send visual inspection links of worn brake pads or leaking gaskets directly to customers before beginning repairs. Complete transparency eliminates customer skepticism and boosts approval rates.'
    },
    {
      id: 13,
      category: 'financial',
      title: 'Tax Season Communication Cadence & Loan Underwriting Updates',
      summary: 'Preventing the black-hole client experience through structured weekly status reporting.',
      content: 'Implement automated weekly progress updates during loan underwriting or tax filing season so clients never experience radio silence regarding their capital or filings.'
    },
    {
      id: 14,
      category: 'legal',
      title: 'Billable Hour Transparency & Proactive Client Check-Ins',
      summary: 'Eliminating cryptic invoices and communication blackouts in law firms and advisory consultancies.',
      content: 'Send detailed, value-focused itemized invoices alongside a brief Friday afternoon status summary email, ensuring clients understand the tangible progress being delivered.'
    },
    {
      id: 15,
      category: 'wellness',
      title: 'Managing Result Discrepancies & Cancellation Fee Disputes',
      summary: 'Handling color corrections, med-spa skin reactions, and strict cancellation policies professionally.',
      content: 'Maintain signed pre-treatment consent forms, clear patch-testing protocols, and compassionate, flexible conflict resolution for genuine personal emergencies.'
    },
    {
      id: 16,
      category: 'veterinary',
      title: 'Itemized Treatment Estimates & ER Triage Empathy',
      summary: 'Eliminating veterinary bill shock and soothing panicked pet owners during emergency visits.',
      content: 'Always provide written,My apologies for missing those! Looking closely at the screenshot you provided (`image_c0f15c.jpg`), I see that your hero section layout is designed to use an image slider (`heroSlides`) referencing external filenames (`A69AF971-CB4D-48CF-B7D1-95D2345645C6.PNG`, `EADDB785-F8BD-42CC-9F68-72FD955953DC.PNG`, etc.), but those images are currently rendering as transparent or blank backgrounds behind your text overlay.

To fix this so your hero background images display correctly on Vercel:

1. **Verify Asset Placement:** Ensure that your image files (e.g., `A69AF971-CB4D-48CF-B7D1-95D2345645C6.PNG`) are placed inside your project's `public/` directory so they can be loaded directly from the root path (`/A69AF971-CB4D-48CF-B7D1-95D2345645C6.PNG`).
2. **Check File Paths & Naming:** Confirm that the filenames in your `heroSlides` array in `src/App.jsx` exactly match the filenames in your public folder (including capitalization and extensions).
3. **Adjust CSS Opacity/Z-Index:** In the code provided previously, the image tag has `opacity-85` and is positioned `absolute inset-0`. If the images are still not showing, verify that your CSS or container div isn't overriding the image display.

Let me know if you need me to adjust the slider implementation or asset paths in the code!