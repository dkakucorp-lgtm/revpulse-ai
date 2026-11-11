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
    askKakuTitle: "Preguntar a Kaku / Sala de Situación",
    askKakuSubtitle: "IA Multiindustria Lista",
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
      response: "Bonjour. Nous prenons votre satisfaction très au sérieux. Revenez au salon cette semaine