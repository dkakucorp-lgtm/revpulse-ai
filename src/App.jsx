import React, { useState } from 'react';
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
    footerRights: "© 2026 RevPulse. All rights reserved. Operator: Imran Mateen (support@revpulse.tools)"
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
    askKakuTitle: "Demander à Kaku / Salle de situation",
    askKakuSubtitle: "IA multi-sectorielle prête",
    footerRights: "© 2026 RevPulse. Tous droits réservés. Opérateur : Imran Mateen (support@revpulse.tools)"
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
    footerRights: "© 2026 RevPulse. Todos los derechos reservados. Operador: Imran Mateen (support@revpulse.tools)"
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
    footerRights: "© 2026 RevPulse. Tutti i diritti riservati. Operatore: Imran Mateen (support@revpulse.tools)"
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
    footerRights: "© 2026 RevPulse. جميع الحقوق محفوظة. المشغل: عمران متين (support@revpulse.tools)"
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
    workflowSubtitle: "تمام شعبوں کے آپریٹرز کے لیے ڈیزائن کیا گیا ہے تاکہ ہر کسٹمر ٹچ پوائنٹ پر مکمل کنٹرول برقرار رکھا جا سکےـ",
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
    footerRights: "© 2026 RevPulse. جملہ حقوق محفوظ ہیں۔ آپریٹر: عمران متین (support@revpulse.tools)"
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
      response: "ہیلو۔ ہم آپ کے سکون کے لیے وقت پر مواصلات کی اہمیت کو سمجھتے ہیں۔ ہماری ٹیم آپ کی فائل کا جائزہ لے رہی ہے۔"
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

export default function RevPulsePlatform() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedVertical, setSelectedVertical] = useState('hvac');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showSituationRoom, setShowSituationRoom] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dashboardSubTab, setDashboardSubTab] = useState('overview');

  const t = translations[selectedLanguage] || translations.en;
  const vt = verticalTranslations[selectedLanguage] || verticalTranslations.en;
  const ct = categoryTranslations[selectedLanguage] || categoryTranslations.en;
  const dt = (demoContentTranslations[selectedLanguage] || demoContentTranslations.en)[selectedVertical] || verticalData[selectedVertical];

  // Knowledge Center State
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeArticles = [
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
      content: 'Always provide written, itemized treatment estimates and obtain explicit approval before running diagnostic tests. Pair medical care with profound emotional validation.'
    }
  ];

  const filteredArticles = knowledgeArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) || art.summary.toLowerCase().includes(knowledgeSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sandbox State
  const [sandboxChannel, setSandboxChannel] = useState('sms');
  const [sandboxPhone, setSandboxPhone] = useState('+13212763473');
  const [sandboxReviewRating, setSandboxReviewRating] = useState('1');
  const [sandboxLog, setSandboxLog] = useState(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  const [twilioConfig, setTwilioConfig] = useState({
    accountSid: '',
    authToken: '',
    phoneNumber: '',
    isLive: false
  });

  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [credentialInput, setCredentialInput] = useState('');
  
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    google: { connected: true, details: 'Google Business Profile #8821' },
    yelp: { connected: false, details: '' },
    facebook: { connected: false, details: '' }
  });

  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'kaku', text: 'Hello! I am Kaku, your AI reputation and multi-industry assistant. Ask me anything across HVAC, Medical, Legal, Veterinary, Restaurant, or E-Commerce operations!' }
  ]);

  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGenerateResponse = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiResponse(dt.response);
      setIsGenerating(false);
    }, 800);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert(`Account created successfully! 📧 Welcome confirmation email sent to ${email}. Your 7-Day Free Trial is now active.`);
        setAuthMode('signin');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setCurrentUser(data.user);
        setShowAuthModal(false);
        setActiveTab('dashboard');
      }
    } catch (error) {
      alert(`Authentication Error: ${error.message}`);
    }
  };

  const handleStripeCheckout = (planType) => {
    const stripeLinks = {
      starter: "https://buy.stripe.com/test_starter_29",
      pro: "https://buy.stripe.com/test_pro_79"
    };
    window.location.href = stripeLinks[planType] || "https://stripe.com";
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!credentialInput.trim()) {
      alert("Please enter your page link or ID.");
      return;
    }
    setConnectedPlatforms(prev => ({
      ...prev,
      [connectingPlatform]: { connected: true, details: credentialInput }
    }));
    setConnectingPlatform(null);
    setCredentialInput('');
  };

  const handleRunSandboxTest = (e) => {
    e.preventDefault();
    setIsSandboxRunning(true);
    setSandboxLog(null);

    setTimeout(() => {
      setIsSandboxRunning(false);
      setSandboxLog({
        status: "SUCCESS (SANDBOX SIMULATION)",
        channel: sandboxChannel.toUpperCase(),
        recipient: sandboxPhone,
        ratingSimulated: `${sandboxReviewRating} Stars`,
        timestamp: new Date().toLocaleTimeString(),
        payload: sandboxChannel === 'sms' 
          ? `[Twilio Sandbox] Sent to ${sandboxPhone}: "Hi! We saw your ${sandboxReviewRating}-star feedback. Our manager wants to resolve this privately. Tap to connect: https://revpulse.tools/resolve/sandbox-token"`
          : `[WhatsApp Sandbox Template] Dispatched to ${sandboxPhone}: Template #REV_RECOVERY_V2 rendered successfully with business variables.`
      });
    }, 900);
  };

  const handleSaveTwilioConfig = (e) => {
    e.preventDefault();
    setTwilioConfig(prev => ({ ...prev, isLive: true }));
    alert("Twilio & WhatsApp API credentials saved! Your workspace is now operating in Live Production Mode.");
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userText = chatMessage;
    setChatLogs(prev => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');
    
    setTimeout(() => {
      setChatLogs(prev => [...prev, { 
        sender: 'kaku', 
        text: `I've cross-referenced your query across our multi-industry Knowledge Center. Here is the verified operational framework.` 
      }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans relative selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <header className="border-b border-gray-800/80 bg-gray-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }} className="flex items-center space-x-2.5 group py-2 text-left bg-transparent border-none cursor-pointer">
              <img 
                src="/logo.png" 
                alt="RevPulse Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain shadow-lg border border-purple-500/30 bg-purple-950/40" 
                onError={(e)=>{
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-xl bg-purple-600 border border-purple-400/40 items-center justify-center text-white font-bold hidden shadow-md">✨</div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition">RevPulse</span>
            </button>
            <nav className="hidden lg:flex space-x-5 text-sm text-gray-300 font-medium">
              <button onClick={() => setActiveTab('landing')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'landing' ? 'text-blue-400 font-semibold' : ''}`}>{t.overview}</button>
              <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'pricing' ? 'text-blue-400 font-semibold' : ''}`}>{t.pricing}</button>
              {currentUser && (
                <button onClick={() => setActiveTab('dashboard')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : ''}`}>{t.dashboard}</button>
              )}
              <button onClick={() => setActiveTab('knowledge')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'knowledge' ? 'text-blue-400 font-semibold' : ''}`}>{t.knowledge}</button>
              <button onClick={() => setActiveTab('legal')} className={`hover:text-white transition bg-transparent border-none cursor-pointer ${activeTab === 'legal' ? 'text-blue-400 font-semibold' : ''}`}>{t.legal}</button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-gray-900 text-gray-300 text-xs rounded-xl px-2.5 py-2 border border-gray-800 focus:outline-none focus:border-blue-500 cursor-pointer">
              <option value="en">🌐 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ar">🇦🇪 العربية</option>
              <option value="ur">🇵🇰 اردو</option>
            </select>

            <div className="hidden lg:flex items-center space-x-3">
              {currentUser ? (
                <button 
                  onClick={() => { supabase.auth.signOut(); setCurrentUser(null); setActiveTab('landing'); }}
                  className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition font-medium px-2.5 py-2 bg-transparent border-none cursor-pointer">
                  {t.signOut} ({currentUser.email})
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
                    className="text-xs sm:text-sm text-gray-300 hover:text-white transition font-medium px-2.5 py-2 whitespace-nowrap bg-transparent border-none cursor-pointer">
                    {t.signIn}
                  </button>
                  <button 
                    onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                    className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-600/25 whitespace-nowrap border-none cursor-pointer">
                    {t.getStarted}
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none bg-gray-900 border border-gray-800 rounded-xl cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 px-6 py-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 font-medium text-sm">
              <button onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">{t.overview}</button>
              <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">{t.pricing}</button>
              {currentUser && (
                <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">{t.dashboard}</button>
              )}
              <button onClick={() => { setActiveTab('knowledge'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">{t.knowledge}</button>
              <button onClick={() => { setActiveTab('legal'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">{t.legal}</button>
            </div>
            
            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              {currentUser ? (
                <button 
                  onClick={() => { supabase.auth.signOut(); setCurrentUser(null); setActiveTab('landing'); setMobileMenuOpen(false); }}
                  className="text-left text-red-400 hover:text-red-300 font-medium py-2 bg-transparent border-none cursor-pointer">
                  {t.signOut} ({currentUser.email})
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => { setAuthMode('signin'); setShowAuthModal(true); setMobileMenuOpen(false); }}
                    className="text-left text-gray-300 hover:text-white font-medium py-2 bg-transparent border-none cursor-pointer">
                    {t.signIn}
                  </button>
                  <button 
                    onClick={() => { setAuthMode('signup'); setShowAuthModal(true); setMobileMenuOpen(false); }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-center shadow-lg border-none cursor-pointer">
                    {t.getStarted}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {activeTab === 'landing' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-24 space-y-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>{t.badge}</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                {t.heroTitle}
              </h1>
              
              <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 text-xs sm:text-sm border-none cursor-pointer">
                  <span>{t.getStarted}</span>
                  <span>→</span>
                </button>
                <button 
                  onClick={() => setActiveTab('knowledge')}
                  className="px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-semibold rounded-xl transition flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer">
                  <span>{t.exploreKnowledge}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30 bg-gray-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                  alt="RevPulse SaaS Dashboard Preview" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 opacity-90" 
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white">Secure Workspace Active</span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Human-in-the-Loop</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Simple Workflow */}
          <section className="space-y-8 pt-8 border-t border-gray-800/80">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{t.howItWorks}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t.workflowTitle}</h2>
              <p className="text-xs text-gray-400 max-w-lg mx-auto">{t.workflowSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-extrabold flex items-center justify-center text-sm">1</div>
                <h3 className="text-lg font-bold text-white">{t.step1Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t.step1Desc}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-extrabold flex items-center justify-center text-sm">2</div>
                <h3 className="text-lg font-bold text-white">{t.step2Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t.step2Desc}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-4 relative">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-extrabold flex items-center justify-center text-sm">3</div>
                <h3 className="text-lg font-bold text-white">{t.step3Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t.step3Desc}</p>
              </div>
            </div>
          </section>

          {/* Interactive Demo Section with Kaku Mascot */}
          <section id="sandbox-demo" className="max-w-4xl mx-auto pt-4">
            <div className="bg-gray-900/90 border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative mt-8">
              <div className="absolute -top-10 left-6 flex items-center space-x-3 bg-gray-900 border border-blue-500/50 px-4 py-2.5 rounded-2xl shadow-2xl z-20">
                <img 
                  src="/kaku-mascot.png" 
                  alt="Kaku AI Mascot" 
                  className="w-10 h-10 rounded-xl object-cover shadow-md border border-blue-400/40 bg-gray-950"
                  onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>Kaku Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[11px] text-gray-400">Test industry response templates</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 pt-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{t.demoTitle}</h3>
                  <p className="text-xs text-gray-400">{t.demoSubtitle}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 max-w-full justify-start md:justify-end">
                  {Object.keys(verticalData).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedVertical(key);
                        setAiResponse('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                        selectedVertical === key 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {vt[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    {t.sampleFeedbackLabel} ({vt[selectedVertical]})
                  </label>
                  <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 text-sm text-gray-200 h-28 overflow-y-auto shadow-inner">
                    {dt.review}
                  </div>
                </div>

                <button 
                  onClick={handleGenerateResponse}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 text-xs sm:text-sm border-none cursor-pointer">
                  {isGenerating ? <span>{t.generatingBtn}</span> : <span>{t.generateBtn}</span>}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-gray-950 border border-blue-900/50 rounded-2xl p-5 animate-fadeIn">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>{t.approvedOutput}</span>
                    <span className="text-emerald-400 text-[11px]">{t.readyApproval}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'knowledge' && (
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Comprehensive Enterprise Hub</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{t.knowledgeHeader}</h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">{t.knowledgeSubtitle}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <input 
              type="text" 
              value={knowledgeSearch}
              onChange={(e) => setKnowledgeSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-xs text-white focus:outline-none focus:border-blue-500 shadow-inner"
            />
            
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { id: 'all', label: ct.all },
                { id: 'hvac', label: ct.hvac },
                { id: 'dental', label: ct.dental },
                { id: 'contractors', label: ct.contractors },
                { id: 'hospitality', label: ct.hospitality },
                { id: 'hotels', label: ct.hotels },
                { id: 'ecommerce', label: ct.ecommerce },
                { id: 'automotive', label: ct.automotive },
                { id: 'financial', label: ct.financial },
                { id: 'legal', label: ct.legal },
                { id: 'wellness', label: ct.wellness },
                { id: 'veterinary', label: ct.veterinary }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <div key={article.id} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-3 hover:border-blue-500/50 transition">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">{article.category}</span>
                  <h3 className="text-base font-bold text-white">{article.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{article.summary}</p>
                  <div className="pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed bg-gray-950 p-4 rounded-2xl">
                    {article.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 text-center py-16 text-gray-500 text-xs bg-gray-900 border border-gray-800 rounded-3xl">
                No matching articles found. Try searching with different keywords or ask Kaku in the Situation Room!
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'legal' && (
        <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-gray-800 pb-6">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Legal & Compliance</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">RevPulse — Terms of Use & Privacy Policy</h1>
            <p className="text-xs text-gray-400 mt-2">Effective Date: November 11, 2026 | Operator: Imran Mateen (support@revpulse.tools)</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Part 1: Privacy Policy</h2>
            <p className="text-gray-400">
              RevPulse is operated by Imran Mateen (“RevPulse,” “we,” “us,” or “our”). This Privacy Policy explains how we collect, use, share, retain, and protect information when you visit www.revpulse.tools, create an account, use the RevPulse workspace, or contact us.
            </p>
            <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
            <p className="text-gray-400">
              We collect information you provide directly (name, email, telephone number, business name, credentials, billing info, review text, and support requests). We also collect automatic technical telemetry and integration metadata when you connect business profiles.
            </p>
            <h3 className="text-base font-bold text-white">2. How We Use Information</h3>
            <p className="text-gray-400">
              We use information to operate the Service, administer your account and 7-day trial, generate AI-assisted review response drafts, process authorized communication workflows, and send service notices. We do not sell personal information or customer contact lists.
            </p>
            <h3 className="text-base font-bold text-white">3. AI-Assisted Features & Human Responsibility</h3>
            <p className="text-gray-400">
              AI-generated suggestions can be imperfect. You are solely responsible for reviewing all drafts before publication, verifying legal compliance, and ensuring no sensitive information is exposed.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white">Part 2: Terms of Use</h2>
            <p className="text-gray-400">
              These Terms of Use govern your access to the RevPulse platform provided by Imran Mateen. By creating an account or starting a trial, you agree to these terms.
            </p>
            <h3 className="text-base font-bold text-white">1. Trial, Paid Plans & Billing</h3>
            <p className="text-gray-400">
              RevPulse offers an unrestricted 7-day free trial without requiring a payment card upfront. Paid subscription plans are billed monthly ($29/mo Starter, $79/mo Pro). You may cancel anytime through your account settings or by emailing support@revpulse.tools.
            </p>
            <h3 className="text-base font-bold text-white">2. Responsible Communications & Consent</h3>
            <p className="text-gray-400">
              If you use RevPulse for SMS, WhatsApp, or email messaging, you are the sender and are solely responsible for obtaining proper recipient consent, honoring opt-outs, and complying with carrier guidelines and applicable laws.
            </p>
            <h3 className="text-base font-bold text-white">3. Contact Information</h3>
            <p className="text-gray-400">
              For any questions regarding these terms or privacy inquiries, contact Imran Mateen directly at <strong>support@revpulse.tools</strong>.
            </p>
          </div>

          <button onClick={() => setActiveTab('landing')} className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold rounded-xl transition border-none cursor-pointer">
            ← Back to Overview
          </button>
        </section>
      )}

      {activeTab === 'dashboard' && (
        <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active 7-Day Free Trial — No Card Required</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${twilioConfig.isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                  {twilioConfig.isLive ? '🟢 Live Production Mode' : '🟡 Sandbox Testing Mode'}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">Customer & Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">Welcome back, {currentUser ? currentUser.email : 'Operator'}.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setDashboardSubTab('overview')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                📊 Overview
              </button>
              <button 
                onClick={() => setDashboardSubTab('sandbox')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'sandbox' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                🧪 Testing & Sandbox Lab
              </button>
              <button 
                onClick={() => setDashboardSubTab('trial-lifecycle')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'trial-lifecycle' ? 'bg-amber-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                📧 Trial & Email Lifecycle
              </button>
              <button 
                onClick={() => setDashboardSubTab('settings')} 
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition border-none cursor-pointer ${dashboardSubTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:text-white'}`}>
                ⚙️ Integrations & Gateway
              </button>
            </div>
          </div>

          {dashboardSubTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-gray-900 border border-gray-800 px-6 py-4 rounded-2xl">
                <div className="text-xs text-gray-300">Need to link more business profiles or test your messaging sequences?</div>
                <div className="flex space-x-3">
                  <button onClick={() => setShowConnectModal(true)} className="px-3.5 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl border-none cursor-pointer">
                    🔗 Connect Business Pages
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Monitored Locations</div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {Object.values(connectedPlatforms).filter(p => p.connected).length} Active
                  </div>
                  <div className="text-xs text-blue-400 mt-2">Google, Yelp & FB Channels Linked</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Feedback Items Pending</div>
                  <div className="text-3xl font-extrabold text-white mt-2">0 Pending</div>
                  <div className="text-xs text-emerald-400 mt-2">All pipelines protected</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Trial Status</div>
                  <div className="text-3xl font-extrabold text-white mt-2">7 Days Free</div>
                  <div className="text-xs text-amber-400 mt-2">Automated email nudges active</div>
                </div>
              </div>
            </div>
          )}

          {dashboardSubTab === 'sandbox' && (
            <div className="bg-gray-900 border border-purple-500/40 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Safe Testing Window</span>
                <h3 className="text-xl font-bold text-white mt-1">Omnichannel Sandbox & Simulation Lab</h3>
                <p className="text-xs text-gray-400 mt-1">Test your SMS recovery texts and WhatsApp templates in a sandbox environment.</p>
              </div>

              <form onSubmit={handleRunSandboxTest} className="grid md:grid-cols-2 gap-6 bg-gray-950 p-6 rounded-2xl border border-gray-800">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Select Channel to Test</label>
                    <select 
                      value={sandboxChannel}
                      onChange={(e) => setSandboxChannel(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                      <option value="sms">💬 Twilio SMS Recovery Text</option>
                      <option value="whatsapp">📗 WhatsApp Business Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Test Recipient Phone / SIM</label>
                    <input 
                      type="text" 
                      value={sandboxPhone} 
                      onChange={(e) => setSandboxPhone(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSandboxRunning}
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                    {isSandboxRunning ? 'Simulating Dispatch...' : '🧪 Run Sandbox Simulation'}
                  </button>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Sandbox Terminal Log</div>
                    {sandboxLog ? (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="text-emerald-400 font-bold">{sandboxLog.status}</div>
                        <div className="p-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-300 mt-2">
                          {sandboxLog.payload}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 italic py-12 text-center">
                        Configure your test parameters on the left and click "Run Sandbox Simulation".
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          {dashboardSubTab === 'trial-lifecycle' && (
            <div className="bg-gray-900 border border-amber-500/40 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Automated Conversion Funnel</span>
                <h3 className="text-xl font-bold text-white mt-1">7-Day Free Trial & Email Lifecycle Automation</h3>
                <p className="text-xs text-gray-400 mt-1">Manage the automated welcome confirmation and Days 4, 5, and 6 trial reminder emails.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">📧 Day 0: Account Setup Confirmation</span>
                  <p className="text-xs text-gray-400 leading-relaxed">Dispatched instantly upon registration with unrestricted 7-day trial access.</p>
                </div>
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">📧 Days 4, 5 & 6: Trial Nudge Sequence</span>
                  <p className="text-xs text-gray-400 leading-relaxed">Automated reminders highlighting plan options ($29 Starter or $79 Pro).</p>
                </div>
              </div>
            </div>
          )}

          {dashboardSubTab === 'settings' && (
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Production Setup</span>
                <h3 className="text-xl font-bold text-white mt-1">Twilio & WhatsApp API Gateway Credentials</h3>
              </div>

              <form onSubmit={handleSaveTwilioConfig} className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Account SID</label>
                  <input 
                    type="text" 
                    value={twilioConfig.accountSid} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, accountSid: e.target.value})} 
                    placeholder="ACxxxxxxxxxxxxxxxx"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Auth Token</label>
                  <input 
                    type="password" 
                    value={twilioConfig.authToken} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, authToken: e.target.value})} 
                    placeholder="••••••••••••••••"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Twilio Phone Number</label>
                  <input 
                    type="text" 
                    value={twilioConfig.phoneNumber} 
                    onChange={(e) => setTwilioConfig({...twilioConfig, phoneNumber: e.target.value})} 
                    placeholder="+1 (321) 000-0000"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                    Save Gateway Credentials
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      )}

      {activeTab === 'pricing' && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-white mb-4">Transparent Pricing & Plans</h1>
            <p className="text-gray-400">Select your tier to initialize secure checkout and instant workspace activation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Starter Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Single Location</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$29<span className="text-sm text-gray-400 font-normal"> / month</span></div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center">✓ Assisted review-response workflow</li>
                  <li className="flex items-center">✓ Strict human approval controls</li>
                  <li className="flex items-center">✓ Multi-industry prompt matrices</li>
                </ul>
              </div>
              <button onClick={() => handleStripeCheckout('starter')} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                Start 7-Day Free Trial — No Card Required
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-950/50 to-gray-900 border border-blue-600/50 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">Most Popular</div>
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Pro Plan</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Multi-Location & Scale</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$79<span className="text-sm text-gray-400 font-normal"> / month</span></div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  <li className="flex items-center">✓ Up to 3 active locations</li>
                  <li className="flex items-center">✓ Omnichannel SMS, WhatsApp & Email suite</li>
                  <li className="flex items-center">✓ Built-in Testing & Sandbox Lab</li>
                </ul>
              </div>
              <button onClick={() => handleStripeCheckout('pro')} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg border-none cursor-pointer">
                Start 7-Day Free Trial — No Card Required
              </button>
            </div>
          </div>
        </section>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-bold bg-transparent border-none cursor-pointer">✕</button>
            <h3 className="text-xl font-bold text-white mb-2">{authMode === 'signin' ? 'Sign In to RevPulse' : 'Start 7-Day Free Trial — No Card Required'}</h3>
            <p className="text-xs text-gray-400 mb-6">Unrestricted workspace access. No payment card required upfront.</p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@company.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg text-xs border-none cursor-pointer">
                {authMode === 'signin' ? 'Sign In' : 'Activate 7-Day Free Trial'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showConnectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-purple-500/40 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-6">
            <button onClick={() => setShowConnectModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm font-bold bg-transparent border-none cursor-pointer">✕</button>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Connect Business Profiles</h3>
              <p className="text-xs text-gray-400">Link your review channels via secure API token & URL handshake.</p>
            </div>

            {connectingPlatform ? (
              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <input 
                  type="text"
                  value={credentialInput}
                  onChange={(e) => setCredentialInput(e.target.value)}
                  placeholder={`https://${connectingPlatform}.com/your-business`}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
                <button type="submit" className="w-full py-3 bg-purple-600 text-white text-xs font-semibold rounded-xl border-none cursor-pointer shadow-lg">Verify & Link</button>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-2xl">
                  <span className="text-xs font-bold text-white">Google Business Profile</span>
                  <button onClick={() => setConnectingPlatform('google')} className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-xl border-none cursor-pointer">Connect</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showSituationRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-blue-500/40 rounded-3xl max-w-2xl w-full h-[650px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-950/60">
              <div className="flex items-center space-x-3">
                <img 
                  src="/kaku-mascot.png" 
                  alt="Kaku" 
                  className="w-8 h-8 rounded-lg object-cover border border-blue-400/40 bg-gray-950" 
                  onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
                />
                <span className="text-sm font-bold text-white">Kaku Assistant & Situation Room</span>
              </div>
              <button onClick={() => setShowSituationRoom(false)} className="text-gray-400 hover:text-white text-sm font-bold px-2.5 py-1 bg-gray-800 rounded-lg border-none cursor-pointer">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatLogs.map((log, idx) => (
                <div key={idx} className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${log.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 border border-gray-700'}`}>
                    {log.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-950/80">
              <form onSubmit={handleSendChatMessage} className="flex space-x-2">
                <input 
                  type="text" 
                  value={chatMessage} 
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask Kaku anything across HVAC, Dental, Legal, Retail, Veterinary..." 
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition border-none cursor-pointer">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Kaku Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowSituationRoom(true)}
          className="flex items-center space-x-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl transition transform hover:scale-105 border border-blue-400/40 group cursor-pointer">
          <img 
            src="/kaku-mascot.png" 
            alt="Kaku" 
            className="w-10 h-10 rounded-xl object-cover border border-white/30 bg-gray-950 shadow-md" 
            onError={(e)=>{e.target.onerror=null; e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";}} 
          />
          <div className="text-left">
            <div className="text-xs font-extrabold flex items-center space-x-1.5">
              <span>{t.askKakuTitle}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-blue-100 font-medium">{t.askKakuSubtitle}</div>
          </div>
        </button>
      </div>

      <footer className="border-t border-gray-800/80 py-10 px-6 mt-28 text-center text-xs text-gray-400 space-y-3 bg-gray-950">
        <div className="flex justify-center space-x-6 font-medium pb-2">
          <button onClick={() => setActiveTab('landing')} className="hover:text-white transition bg-transparent border-none cursor-pointer">{t.overview}</button>
          <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition bg-transparent border-none cursor-pointer">{t.pricing}</button>
          <button onClick={() => setActiveTab('knowledge')} className="hover:text-white transition bg-transparent border-none cursor-pointer">{t.knowledge}</button>
          <button onClick={() => setActiveTab('legal')} className="hover:text-white transition bg-transparent border-none cursor-pointer">{t.legal}</button>
        </div>
        <p>{t.footerRights}</p>
      </footer>
    </div>
  );
}