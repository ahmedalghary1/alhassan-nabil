import { startTransition, useEffect, useRef, useState } from 'react'
import './App.css'

const portfolioCategories = [
  { key: 'all', label: { en: 'All Work', ar: 'كل الأعمال' } },
  { key: 'ads', label: { en: 'Ads', ar: 'إعلانات' } },
  { key: 'music', label: { en: 'Music Videos', ar: 'فيديوهات موسيقية' } },
  { key: 'youtube', label: { en: 'YouTube Edits', ar: 'مونتاج يوتيوب' } },
  { key: 'cinematic', label: { en: 'Cinematic Projects', ar: 'مشاريع سينمائية' } },
]

const mediaProjects = [
  {
    title: { en: 'Luxury Launch Film', ar: 'فيلم إطلاق فاخر' },
    subtitle: { en: 'Brand launch / cinematic ad', ar: 'إطلاق علامة / إعلان سينمائي' },
    poster:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    video: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  },
  {
    title: { en: 'Neon Performance Cut', ar: 'مونتاج أداء نيوني' },
    subtitle: { en: 'Music video / stylized rhythm', ar: 'فيديو موسيقي / إيقاع بصري' },
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    video: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
  },
  {
    title: { en: 'Creator Story Episode', ar: 'حلقة قصة صانع محتوى' },
    subtitle: { en: 'YouTube documentary / retention cut', ar: 'وثائقي يوتيوب / مونتاج احتفاظ' },
    poster:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    video: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
  },
  {
    title: { en: 'Trailer Teaser Build', ar: 'بناء تريلر تشويقي' },
    subtitle: { en: 'Teaser / dramatic reveal', ar: 'تشويقي / تصاعد درامي' },
    poster:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    video: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
  },
]

const prestigeItems = [
  { en: 'Brand Films', ar: 'أفلام العلامات' },
  { en: 'Commercial Editing', ar: 'مونتاج إعلاني' },
  { en: 'Music Visuals', ar: 'فيديوهات موسيقية' },
  { en: 'Cinematic Trailers', ar: 'تريلرات سينمائية' },
  { en: 'YouTube Story Cuts', ar: 'مونتاج قصصي لليوتيوب' },
]

const signaturePillars = [
  {
    title: { en: 'Story Before Speed', ar: 'القصة قبل السرعة' },
    text: {
      en: 'Every edit starts with a clear emotional objective, so the final film feels intentional, not assembled.',
      ar: 'كل مونتاج يبدأ بهدف عاطفي واضح، حتى تبدو النتيجة النهائية مقصودة ومبنية بعناية لا مجرد تجميع لقطات.',
    },
  },
  {
    title: { en: 'Luxury Finish', ar: 'تشطيب فاخر' },
    text: {
      en: 'Color, sound, transitions, and pacing are polished to make the work feel premium from the very first second.',
      ar: 'التلوين والصوت والانتقالات والإيقاع تُصقل بعناية ليشعر المشاهد بقيمة العمل من أول ثانية.',
    },
  },
  {
    title: { en: 'Retention Driven', ar: 'جاذبية واحتفاظ' },
    text: {
      en: 'The cut is built to hold attention, raise perceived value, and keep the audience emotionally invested.',
      ar: 'المونتاج يُبنى ليشد الانتباه ويرفع قيمة المشروع في عين المشاهد ويحافظ على اندماجه حتى النهاية.',
    },
  },
]

const portfolioProjects = [
  {
    category: 'ads',
    title: { en: 'Obsidian Fragrance Campaign', ar: 'حملة عطر أوبسيديان' },
    summary: {
      en: 'A luxury ad cut like a trailer, built around silence, texture, and desire.',
      ar: 'إعلان فاخر بُني بإيقاع تريلر سينمائي يعتمد على الصمت والملمس البصري وصناعة الترقب.',
    },
    result: {
      en: 'Premium launch positioning',
      ar: 'تموضع إطلاق فاخر',
    },
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'music',
    title: { en: 'Midnight Pulse', ar: 'نبض منتصف الليل' },
    summary: {
      en: 'Performance footage turned into a hypnotic visual rhythm with glitch accents.',
      ar: 'تحويل لقطات الأداء إلى إيقاع بصري منوّم مع لمسات جليتش محسوبة.',
    },
    result: {
      en: 'Memorable visual identity',
      ar: 'هوية بصرية لا تُنسى',
    },
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'youtube',
    title: { en: 'Atlas Creator Documentary', ar: 'وثائقي صانع المحتوى أطلس' },
    summary: {
      en: 'Long-form pacing designed to retain attention through emotional chaptering.',
      ar: 'إيقاع طويل المدى يحافظ على الانتباه عبر بناء عاطفي للفصول والمشاهد.',
    },
    result: {
      en: 'Stronger watch retention',
      ar: 'احتفاظ أعلى بالمشاهدة',
    },
    image:
      'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'cinematic',
    title: { en: 'Ember Short Film Trailer', ar: 'تريلر الفيلم القصير إمبر' },
    summary: {
      en: 'A haunting trailer shaped to sell emotion before plot.',
      ar: 'تريلر يحمل أثرًا عاطفيًا عميقًا ويبيع الإحساس قبل أن يشرح الحبكة.',
    },
    result: {
      en: 'Cinematic emotional impact',
      ar: 'أثر عاطفي سينمائي',
    },
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'ads',
    title: { en: 'Velocity Automotive Spot', ar: 'إعلان فيلوسيتي للسيارات' },
    summary: {
      en: 'Mechanical power translated into sharp cuts, restrained grade, and tension.',
      ar: 'ترجمة قوة الآلة إلى قطعات حادة، وتلوين متزن، وتوتر بصري مدروس.',
    },
    result: {
      en: 'Sharper commercial impact',
      ar: 'أثر إعلاني أقوى',
    },
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'music',
    title: { en: 'Echoes Live Session', ar: 'جلسة إيكوز الحية' },
    summary: {
      en: 'Concert energy shaped into an intimate cinematic performance story.',
      ar: 'طاقة الحفل صيغت في سرد أدائي سينمائي حميم وقريب من المشاعر.',
    },
    result: {
      en: 'Stronger audience recall',
      ar: 'تذكر أعلى لدى الجمهور',
    },
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'youtube',
    title: { en: 'Northline Travel Series', ar: 'سلسلة السفر نورثلاين' },
    summary: {
      en: 'Travel storytelling built with retention hooks, breathing room, and elevated polish.',
      ar: 'سرد رحلات يعتمد على نقاط جذب للمشاهدة ومساحات تنفس ولمسة إنهاء راقية.',
    },
    result: {
      en: 'Cleaner premium storytelling',
      ar: 'سرد أنظف وأكثر فخامة',
    },
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'cinematic',
    title: { en: 'Nocturne Title Sequence', ar: 'تتر نوكتورن الافتتاحي' },
    summary: {
      en: 'Typography, sound, and light leaks fused into a moody opening sequence.',
      ar: 'امتزاج الطباعة والصوت وتسربات الضوء في افتتاحية مزاجية ذات حضور قوي.',
    },
    result: {
      en: 'High-end screen presence',
      ar: 'حضور بصري رفيع',
    },
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
  },
]

const skills = [
  {
    tool: 'Adobe Premiere Pro',
    level: '96%',
    value: 96,
    detail: {
      en: 'Story structure, dialogue shaping, and performance rhythm.',
      ar: 'بناء السرد، وصياغة الحوار، وضبط إيقاع الأداء.',
    },
  },
  {
    tool: 'After Effects',
    level: '90%',
    value: 90,
    detail: {
      en: 'Titles, subtle motion systems, glitch textures, and finishing accents.',
      ar: 'العناوين، وأنظمة الحركة الخفيفة، وملامس الجليتش، ولمسات الإنهاء.',
    },
  },
  {
    tool: 'DaVinci Resolve',
    level: '93%',
    value: 93,
    detail: {
      en: 'Color contrast, cinematic tone, and filmic atmosphere.',
      ar: 'التباين اللوني، والنبرة السينمائية، وبناء الجو الفيلمي.',
    },
  },
]

const workflow = [
  {
    step: '01',
    title: { en: 'Discover the Story', ar: 'اكتشاف القصة' },
    text: {
      en: 'I begin with the emotional core: what should the audience feel when the screen cuts to black?',
      ar: 'أبدأ من القلب العاطفي للعمل: ما الإحساس الذي يجب أن يبقى بعد أن تنطفئ الشاشة؟',
    },
  },
  {
    step: '02',
    title: { en: 'Build the Rough Cut', ar: 'بناء النسخة الأولى' },
    text: {
      en: 'The first cut organizes footage into rhythm, tension, and narrative flow before decoration.',
      ar: 'النسخة الأولى تنظّم اللقطات داخل إيقاع وتوتر ومسار سردي واضح قبل أي زينة إضافية.',
    },
  },
  {
    step: '03',
    title: { en: 'Shape Sound and Color', ar: 'صياغة الصوت واللون' },
    text: {
      en: 'Sound design, contrast, and grading turn footage into atmosphere and memory.',
      ar: 'تصميم الصوت والتباين والتلوين يحوّلون اللقطات إلى جوّ حي وذكرى لا تُنسى.',
    },
  },
  {
    step: '04',
    title: { en: 'Deliver the Final Master', ar: 'تسليم النسخة النهائية' },
    text: {
      en: 'Every format is finished with precision, whether it lives in cinema, social, or long-form platforms.',
      ar: 'كل نسخة تُسلَّم بدقة كاملة، سواء كانت للسينما أو المنصات الاجتماعية أو المحتوى الطويل.',
    },
  },
]

const testimonials = [
  {
    quote: {
      en: 'He turned a polished campaign into a premium film. The brand suddenly felt bigger, sharper, and far more expensive.',
      ar: 'حوّل حملة جيدة إلى فيلم فاخر بحق. فجأة بدت العلامة أكبر وأكثر حدة وذات قيمة أعلى بكثير.',
    },
    author: { en: 'Creative Director, Maison Orphic', ar: 'المدير الإبداعي - ميزون أورفيك' },
  },
  {
    quote: {
      en: 'We expected an editor. What we got was someone who understood positioning, emotion, and how to make people keep watching.',
      ar: 'كنا نبحث عن محرر، لكننا وجدنا شخصًا يفهم التموضع والعاطفة وكيف يجعل المشاهد يكمل حتى النهاية.',
    },
    author: { en: 'Founder, Northline Media', ar: 'المؤسس - نورثلاين ميديا' },
  },
  {
    quote: {
      en: 'Every cut felt intentional. Every pause had authority. The final piece looked and sounded like a studio-level release.',
      ar: 'كل قطْعة كانت مقصودة، وكل صمت كان له هيبة، والنسخة النهائية بدت كإصدار على مستوى الاستوديوهات.',
    },
    author: { en: 'Producer, Ember', ar: 'المنتج - إمبر' },
  },
]

const copy = {
  en: {
    dir: 'ltr',
    brand: 'NOIRFRAME',
    nav: [
      { href: '#about', label: 'About' },
      { href: '#showreel', label: 'Showreel' },
      { href: '#portfolio', label: 'Portfolio' },
      { href: '#skills', label: 'Skills' },
      { href: '#contact', label: 'Contact' },
    ],
    menu: 'Menu',
    languageLabel: 'Language',
    heroEyebrow: 'High-End Video Editor / Campaign Films, Music Visuals, Premium Post',
    heroTitle: 'I don’t cut footage. I build films people remember.',
    heroCopy:
      'I help brands, artists, and ambitious creators look more premium on screen. From the first frame to the final sound hit, every detail is shaped to elevate perception, sharpen emotion, and make the work impossible to ignore.',
    watch: 'Watch The Reel',
    hire: 'Start A Premium Project',
    portraitBadge: 'Creative Editor Portrait',
    heroCaption: 'Editorial direction, cinematic finishing, and brand-led storytelling.',
    heroStats: [
      { value: '120+', label: 'premium edits delivered across campaigns, launches, music, and digital storytelling' },
      { value: '9 yrs', label: 'of shaping narrative rhythm, emotional tone, and refined post-production finish' },
      { value: '4 formats', label: 'campaign masters prepared for social, vertical, widescreen, and long-form delivery' },
    ],
    pillarsEyebrow: 'Why Clients Choose This Style',
    pillarsTitle: 'Creative precision that makes the work look expensive, strategic, and unforgettable.',
    showreelEyebrow: 'Featured Showreel',
    showreelTitle: 'A showreel designed to communicate taste, control, and screen presence in seconds.',
    showreelCopy:
      'These edits are not assembled for volume. They are built for impact. Each piece is shaped to control tempo, hold attention, and give the client a sharper, more premium visual identity.',
    showreelPoints: ['Controlled pacing with tension', 'Color and sound polished for premium perception', 'Cinematic finishing that increases audience trust'],
    reelGridTitle: 'Selected motion previews',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle:
      'Projects engineered to raise perceived value, sharpen the message, and make every frame work harder.',
    portfolioCta: 'View Project',
    aboutEyebrow: 'About',
    aboutTitle: 'The goal is simple: make the audience feel the difference immediately.',
    aboutBody: [
      'Strong editing is not decoration. It is positioning. It tells the audience how seriously they should take the brand, the artist, or the story in front of them.',
      'That is why I treat editing as a strategic layer of filmmaking, not only a technical stage. Every decision in timing, texture, sound, and contrast exists to make the final piece feel elevated, cohesive, and commercially powerful.',
    ],
    skillsEyebrow: 'Skills',
    skillsTitle: 'A premium post-production stack, led by taste, restraint, and sharp editorial judgment.',
    workflowEyebrow: 'Workflow',
    workflowTitle: 'A disciplined process that protects quality while moving with commercial speed.',
    testimonialsEyebrow: 'Testimonials',
    testimonialsTitle: 'What collaborators say when the final cut does more than just look good.',
    contactEyebrow: 'Contact',
    contactTitle: 'Need a film that feels premium the second it starts?',
    contactCopy:
      'If the project matters, the edit should carry authority. Share the brief, the audience, and the objective, and I will shape a version that feels cinematic, controlled, and commercially persuasive.',
    form: {
      name: 'Name',
      email: 'Email',
      project: 'Project Type',
      message: 'Brief',
      submit: 'Send Project Brief',
      placeholders: {
        name: 'Your name',
        email: 'you@example.com',
        project: 'Campaign film, launch ad, music video, creator documentary...',
        message: 'Tell me what the audience should feel, what footage exists, and what the edit needs to achieve commercially.',
      },
      success:
        'The brief is received. I will return with a strong creative direction, editorial approach, and a delivery path that fits the project properly.',
    },
    footer: 'Premium editorial crafted for brands, artists, and stories that need real screen presence.',
  },
  ar: {
    dir: 'rtl',
    brand: 'NOIRFRAME',
    nav: [
      { href: '#about', label: 'نبذة' },
      { href: '#showreel', label: 'الأعمال' },
      { href: '#portfolio', label: 'المعرض' },
      { href: '#skills', label: 'المهارات' },
      { href: '#contact', label: 'تواصل' },
    ],
    menu: 'القائمة',
    languageLabel: 'اللغة',
    heroEyebrow: 'محرر فيديو رفيع المستوى / أفلام حملات، فيديوهات موسيقية، تشطيب سينمائي فاخر',
    heroTitle: 'أنا لا أرتب اللقطات فقط، بل أبني أفلامًا تترك أثرًا.',
    heroCopy:
      'أساعد العلامات التجارية والفنانين وصناع المحتوى الطموحين على الظهور بصورة أرفع وأكثر تأثيرًا على الشاشة. من أول كادر إلى آخر ضربة صوت، كل تفصيلة تُبنى لرفع القيمة، وشحذ الإحساس، وجعل العمل صعب التجاهل.',
    watch: 'شاهد الريل',
    hire: 'ابدأ مشروعًا فاخرًا',
    portraitBadge: 'بورتريه احترافي للمحرر',
    heroCaption: 'رؤية تحريرية، تشطيب سينمائي، وسرد يخدم قيمة البراند.',
    heroStats: [
      { value: '+120', label: 'مونتاجًا احترافيًا للحملات والإطلاقات والأغاني والسرد الرقمي الرفيع' },
      { value: '9 سنوات', label: 'من صناعة الإيقاع السردي والنبرة العاطفية والتشطيب البصري والصوتي' },
      { value: '4 صيغ', label: 'نسخ جاهزة للسوشيال والعمودي والعريض والمحتوى الطويل باحتراف كامل' },
    ],
    pillarsEyebrow: 'لماذا يختار العملاء هذا المستوى',
    pillarsTitle: 'دقة إبداعية تجعل العمل يبدو أغلى، أذكى، وأكثر حضورًا من أول ثانية.',
    showreelEyebrow: 'الأعمال المختارة',
    showreelTitle: 'ريل صُمم ليُظهر الذوق، والتحكم، والحضور البصري خلال ثوانٍ قليلة.',
    showreelCopy:
      'هذه الأعمال لم تُجمع لمجرد العرض، بل صُممت لتصنع أثرًا واضحًا. كل قطعة هنا مبنية للتحكم في الإيقاع، وشد الانتباه، ومنح العميل هوية بصرية أكثر رقيًا وقوة.',
    showreelPoints: ['إيقاع مضبوط يصنع التوتر', 'تلوين وصوت يرفعان الإحساس بالقيمة', 'تشطيب سينمائي يعزز ثقة المشاهد'],
    reelGridTitle: 'معاينات حركية مختارة',
    portfolioEyebrow: 'المعرض',
    portfolioTitle: 'مشاريع صُممت لرفع القيمة الظاهرة، وشحذ الرسالة، وجعل كل كادر يعمل لصالح المشروع.',
    portfolioCta: 'عرض المشروع',
    aboutEyebrow: 'نبذة',
    aboutTitle: 'الهدف واضح: أن يشعر المشاهد بفرق المستوى فورًا.',
    aboutBody: [
      'المونتاج القوي ليس مجرد شكل جميل، بل هو تموضع. هو ما يخبر المشاهد بشكل غير مباشر أن هذا البراند أو هذا الفنان أو هذه القصة تستحق الانتباه والثقة.',
      'لهذا أتعامل مع المونتاج كطبقة استراتيجية من صناعة الفيلم، لا كمرحلة تقنية فقط. التوقيت، والملمس، والصوت، والتباين، كلها قرارات موجودة لتجعل النتيجة النهائية أرفع، وأشد تماسكًا، وأكثر تأثيرًا تجاريًا.',
    ],
    skillsEyebrow: 'المهارات',
    skillsTitle: 'عدة ما بعد إنتاج قوية، لكن الفارق الحقيقي في الذوق والانضباط التحريري.',
    workflowEyebrow: 'آلية العمل',
    workflowTitle: 'منهج منضبط يحافظ على الجودة العالية مع سرعة تناسب المشاريع التجارية.',
    testimonialsEyebrow: 'آراء العملاء',
    testimonialsTitle: 'ما يقوله المتعاونون حين تتجاوز النسخة النهائية فكرة أنها جميلة فقط.',
    contactEyebrow: 'تواصل',
    contactTitle: 'هل تريد فيلمًا يشعر المشاهد بفخامته منذ اللحظة الأولى؟',
    contactCopy:
      'إذا كان المشروع مهمًا، فيجب أن يحمل المونتاج هيبة واضحة. أرسل الفكرة والجمهور والهدف، وسأبني لك نسخة تبدو سينمائية، متزنة، ومقنعة تجاريًا من أول مشاهدة.',
    form: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      project: 'نوع المشروع',
      message: 'النبذة',
      submit: 'أرسل تفاصيل المشروع',
      placeholders: {
        name: 'اسمك',
        email: 'you@example.com',
        project: 'فيلم حملة، إعلان إطلاق، فيديو موسيقي، وثائقي رقمي...',
        message: 'احكِ لي ما الذي يجب أن يشعر به المشاهد، وما اللقطات المتاحة، وما الهدف التجاري الذي يجب أن يحققه المونتاج.',
      },
      success:
        'وصلت تفاصيل المشروع. سأعود إليك برؤية إبداعية قوية، ونهج تحريري واضح، ومسار تنفيذ مناسب لطبيعة العمل.',
    },
    footer: 'مونتاج فاخر صُمم للعلامات التجارية والفنانين والقصص التي تحتاج حضورًا بصريًا حقيقيًا.',
  },
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Behance', href: 'https://behance.net/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
]

const showreelVideo =
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4'

const portraitImage =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80'

function App() {
  const [language, setLanguage] = useState('ar')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formStatus, setFormStatus] = useState('')
  const touchStartX = useRef(0)

  const content = copy[language]

  const filteredPortfolio =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = content.dir
    document.title =
      language === 'en'
        ? 'NOIRFRAME | Cinematic Video Editor Portfolio'
        : 'NOIRFRAME | بورتفوليو محرر فيديو سينمائي'
  }, [content.dir, language])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveTestimonial((current) => (current + 1) % testimonials.length)
      })
    }, 6000)

    return () => window.clearInterval(intervalId)
  }, [])

  function handleLanguageChange(nextLanguage) {
    startTransition(() => {
      setLanguage(nextLanguage)
      setIsMenuOpen(false)
      setFormStatus('')
    })
  }

  function handleCategoryChange(category) {
    startTransition(() => {
      setActiveCategory(category)
    })
  }

  function handleTouchStart(event) {
    touchStartX.current = event.changedTouches[0].clientX
  }

  function handleTouchEnd(event) {
    const delta = event.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(delta) < 50) {
      return
    }

    startTransition(() => {
      setActiveTestimonial((current) => {
        if (delta < 0) {
          return (current + 1) % testimonials.length
        }

        return current === 0 ? testimonials.length - 1 : current - 1
      })
    })
  }

  function goToTestimonial(index) {
    startTransition(() => {
      setActiveTestimonial(index)
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setFormStatus(content.form.success)
  }

  return (
    <main className="page-shell" dir={content.dir}>
      <div className="ambient ambient-one" aria-hidden="true"></div>
      <div className="ambient ambient-two" aria-hidden="true"></div>
      <div className="global-grain" aria-hidden="true"></div>

      <header className="site-header">
        <a className="brand-mark" href="#top">
          {content.brand}
        </a>

        <div className="header-actions">
          <nav className="desktop-nav" aria-label={content.menu}>
            {content.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="language-switcher" aria-label={content.languageLabel}>
            <button
              className={language === 'en' ? 'lang-button active' : 'lang-button'}
              onClick={() => handleLanguageChange('en')}
              type="button"
            >
              EN
            </button>
            <button
              className={language === 'ar' ? 'lang-button active' : 'lang-button'}
              onClick={() => handleLanguageChange('ar')}
              type="button"
            >
              AR
            </button>
          </div>

          <button
            className="menu-button"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={content.menu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={isMenuOpen ? 'mobile-panel open' : 'mobile-panel'}>
        <nav className="mobile-nav" aria-label={content.menu}>
          {content.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <section className="hero-section section-shell" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{content.heroEyebrow}</p>
            <h1>{content.heroTitle}</h1>
            <p className="section-copy">{content.heroCopy}</p>
            <div className="hero-actions">
              <a className="button primary" href="#showreel">
                {content.watch}
              </a>
              <a className="button secondary" href="#contact">
                {content.hire}
              </a>
            </div>
            <p className="hero-caption">{content.heroCaption}</p>
            <div className="hero-stats">
              {content.heroStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
            <div className="prestige-strip" aria-label="Capabilities">
              {prestigeItems.map((item) => (
                <span key={item.en}>{item[language]}</span>
              ))}
            </div>
          </div>

          <div className="hero-portrait">
            <div className="portrait-frame">
              <img src={portraitImage} alt={content.portraitBadge} loading="eager" />
              <div className="portrait-overlay" aria-hidden="true"></div>
            </div>
            <span className="portrait-badge">{content.portraitBadge}</span>
          </div>
        </div>
      </section>

      <section className="section-shell content-section signature-section">
        <div className="section-head">
          <p className="eyebrow">{content.pillarsEyebrow}</p>
          <h2>{content.pillarsTitle}</h2>
        </div>

        <div className="signature-grid">
          {signaturePillars.map((pillar) => (
            <article className="signature-card" key={pillar.title.en}>
              <span className="meta-line">{pillar.title[language]}</span>
              <p>{pillar.text[language]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="showreel">
        <div className="section-head">
          <p className="eyebrow">{content.showreelEyebrow}</p>
          <h2>{content.showreelTitle}</h2>
        </div>

        <div className="showreel-layout">
          <div className="featured-video-card">
            <video
              className="featured-video"
              controls
              preload="metadata"
              poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80"
            >
              <source src={showreelVideo} type="video/mp4" />
            </video>
          </div>

          <div className="showreel-copy">
            <p className="section-copy">{content.showreelCopy}</p>
            <ul className="accent-list">
              {content.showreelPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-minihead">
          <span>{content.reelGridTitle}</span>
        </div>

        <div className="media-grid">
          {mediaProjects.map((project) => (
            <article className="media-card" key={project.title.en}>
              <div className="media-thumb">
                <video
                  className="media-video"
                  controls
                  preload="metadata"
                  poster={project.poster}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                <button className="play-button" type="button" aria-label={content.watch}>
                  <span></span>
                </button>
              </div>
              <div className="media-card-copy">
                <strong>{project.title[language]}</strong>
                <span>{project.subtitle[language]}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="portfolio">
        <div className="section-head">
          <p className="eyebrow">{content.portfolioEyebrow}</p>
          <h2>{content.portfolioTitle}</h2>
        </div>

        <div className="filter-row" role="tablist" aria-label={content.portfolioEyebrow}>
          {portfolioCategories.map((category) => (
            <button
              key={category.key}
              className={activeCategory === category.key ? 'filter-chip active' : 'filter-chip'}
              onClick={() => handleCategoryChange(category.key)}
              type="button"
            >
              {category.label[language]}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredPortfolio.map((project) => (
            <article className="portfolio-card" key={`${project.category}-${project.title.en}`}>
              <div className="portfolio-thumb">
                <img src={project.image} alt={project.title[language]} loading="lazy" />
              </div>
              <div className="portfolio-copy">
                <span className="meta-line">
                  {
                    portfolioCategories.find((category) => category.key === project.category)?.label[
                      language
                    ]
                  }
                </span>
                <h3>{project.title[language]}</h3>
                <p>{project.summary[language]}</p>
                <span className="result-pill">{project.result[language]}</span>
                <button className="text-link" type="button">
                  {content.portfolioCta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="about">
        <div className="about-layout">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1200&q=80"
              alt={content.aboutTitle}
              loading="lazy"
            />
          </div>
          <div className="about-copy-block">
            <p className="eyebrow">{content.aboutEyebrow}</p>
            <h2>{content.aboutTitle}</h2>
            <div className="about-text">
              {content.aboutBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell content-section" id="skills">
        <div className="section-head">
          <p className="eyebrow">{content.skillsEyebrow}</p>
          <h2>{content.skillsTitle}</h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.tool}>
              <div className="skill-header">
                <div className="skill-icon" aria-hidden="true"></div>
                <div>
                  <h3>{skill.tool}</h3>
                  <p>{skill.detail[language]}</p>
                </div>
              </div>
              <div className="skill-meter">
                <span>{skill.level}</span>
                <div className="meter-track" aria-hidden="true">
                  <div className="meter-fill" style={{ width: `${skill.value}%` }}></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="workflow">
        <div className="section-head">
          <p className="eyebrow">{content.workflowEyebrow}</p>
          <h2>{content.workflowTitle}</h2>
        </div>

        <div className="workflow-timeline">
          {workflow.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="timeline-step">{item.step}</span>
              <h3>{item.title[language]}</h3>
              <p>{item.text[language]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="testimonials">
        <div className="section-head">
          <p className="eyebrow">{content.testimonialsEyebrow}</p>
          <h2>{content.testimonialsTitle}</h2>
        </div>

        <div
          className="testimonial-slider"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.author.en}>
                <p>{testimonial.quote[language]}</p>
                <span>{testimonial.author[language]}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="testimonial-controls">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.author.en}
              className={activeTestimonial === index ? 'testimonial-dot active' : 'testimonial-dot'}
              onClick={() => goToTestimonial(index)}
              type="button"
              aria-label={`${content.testimonialsEyebrow} ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="contact">
        <div className="contact-layout">
          <div className="contact-copy-block">
            <p className="eyebrow">{content.contactEyebrow}</p>
            <h2>{content.contactTitle}</h2>
            <p className="section-copy">{content.contactCopy}</p>

            <div className="social-links">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {content.form.name}
              <input name="name" type="text" placeholder={content.form.placeholders.name} required />
            </label>
            <label>
              {content.form.email}
              <input
                name="email"
                type="email"
                placeholder={content.form.placeholders.email}
                dir="ltr"
                required
              />
            </label>
            <label>
              {content.form.project}
              <input
                name="project"
                type="text"
                placeholder={content.form.placeholders.project}
                required
              />
            </label>
            <label>
              {content.form.message}
              <textarea
                name="message"
                rows="5"
                placeholder={content.form.placeholders.message}
                required
              ></textarea>
            </label>
            <button className="button primary full-width" type="submit">
              {content.form.submit}
            </button>
            {formStatus ? <p className="form-status">{formStatus}</p> : null}
          </form>
        </div>
      </section>

      <footer className="section-shell site-footer">
        <strong>{content.brand}</strong>
        <p>{content.footer}</p>
      </footer>
    </main>
  )
}

export default App
