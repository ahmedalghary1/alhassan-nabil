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

const portfolioProjects = [
  {
    category: 'ads',
    title: { en: 'Obsidian Fragrance Campaign', ar: 'حملة عطر أوبسيديان' },
    summary: {
      en: 'A luxury ad cut like a trailer, built around silence, texture, and desire.',
      ar: 'إعلان فاخر بُني بإيقاع تريلر سينمائي يعتمد على الصمت والملمس البصري وصناعة الترقب.',
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
      en: 'He made our campaign feel like a trailer people wanted to live inside.',
      ar: 'حوّل حملتنا إلى تريلر يشعر الناس أنهم يريدون العيش داخله.',
    },
    author: { en: 'Creative Director, Maison Orphic', ar: 'المدير الإبداعي، ميزون أورفيك' },
  },
  {
    quote: {
      en: 'We hired an editor. What we got was a storyteller with studio-level control.',
      ar: 'ظننّا أننا نتعاقد مع محرر، لكننا حصلنا على حكّاء يمتلك تحكمًا بمستوى الاستوديوهات.',
    },
    author: { en: 'Founder, Northline Media', ar: 'المؤسس، نورثلاين ميديا' },
  },
  {
    quote: {
      en: 'Every cut had intent. Every pause had weight. The final film felt expensive.',
      ar: 'كل قطْعة كانت مقصودة، وكل صمت كان له وزن، والنتيجة بدت فاخرة بحق.',
    },
    author: { en: 'Producer, Ember', ar: 'المنتج، إمبر' },
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
    heroEyebrow: 'Premium Video Editor / Ads, Music Videos, Brand Films',
    heroTitle: 'I don’t edit videos. I craft stories.',
    heroCopy:
      'I turn raw footage into premium films that hold attention, raise perceived value, and make brands feel unforgettable. Every cut is built to sell emotion before it sells the message.',
    watch: 'Watch Showreel',
    hire: 'Book Your Project',
    portraitBadge: 'Creative Editor Portrait',
    heroStats: [
      { value: '120+', label: 'projects shaped for brands, artists, and premium digital campaigns' },
      { value: '9 yrs', label: 'of story-first editing, sound shaping, and cinematic finishing' },
      { value: '4 formats', label: 'delivery across social, vertical, web, and master campaign cuts' },
    ],
    showreelEyebrow: 'Featured Showreel',
    showreelTitle: 'Selected edits built to stop the scroll and instantly elevate the brand.',
    showreelCopy:
      'From launch films to music visuals and creator documentaries, every edit is shaped for retention, emotion, and a polished cinematic finish clients can feel from the first seconds.',
    showreelPoints: ['Premium pacing', 'Luxury-grade color and sound', 'Cuts designed for retention'],
    reelGridTitle: 'Video previews',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle:
      'Projects crafted to make products, people, and stories feel premium from the first second.',
    portfolioCta: 'Open Project',
    aboutEyebrow: 'About',
    aboutTitle: 'I edit to make people feel, remember, and take action.',
    aboutBody: [
      'The strongest edits do more than look good. They create trust, raise value, and pull the viewer deeper into the story without wasting a second.',
      'That is how I approach every project. Whether it is a luxury ad, a music video, or a YouTube documentary, the edit is built to feel expensive, emotionally precise, and impossible to ignore.',
    ],
    skillsEyebrow: 'Skills',
    skillsTitle: 'A premium post-production toolkit, guided by taste and strategy.',
    workflowEyebrow: 'Workflow',
    workflowTitle: 'A clear process that moves fast without losing cinematic quality.',
    testimonialsEyebrow: 'Testimonials',
    testimonialsTitle: 'What clients say after the cut lands and the results start showing.',
    contactEyebrow: 'Contact',
    contactTitle: 'Need a film that looks premium and sells the idea fast?',
    contactCopy:
      'Send the brief, the audience, and the goal. I will shape an edit that feels cinematic, builds trust quickly, and helps the project make a strong first impression.',
    form: {
      name: 'Name',
      email: 'Email',
      project: 'Project Type',
      message: 'Brief',
      submit: 'Start The Conversation',
      placeholders: {
        name: 'Your name',
        email: 'you@example.com',
        project: 'Trailer, ad, documentary, YouTube series...',
        message: 'Tell me about the story, the footage, the tone, and the delivery goals.',
      },
      success:
        'Your brief is in. I will come back with a sharp creative direction, pacing approach, and delivery plan.',
    },
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
    heroEyebrow: 'محرر فيديو احترافي / إعلانات، فيديوهات موسيقية، أفلام علامات تجارية',
    heroTitle: 'أنا لا أحرر الفيديوهات، بل أصنع قصصًا.',
    heroCopy:
      'أحوّل اللقطات الخام إلى أفلام تبدو فاخرة، تشد الانتباه سريعًا، وترفع قيمة العلامة في عين المشاهد. كل قطْعة مصممة لتبيع الإحساس قبل أن تشرح الرسالة.',
    watch: 'شاهد الأعمال',
    hire: 'احجز مشروعك',
    portraitBadge: 'بورتريه احترافي للمحرر',
    heroStats: [
      { value: '+120', label: 'مشروعًا للعلامات التجارية والفنانين والحملات الرقمية الراقية' },
      { value: '9 سنوات', label: 'من المونتاج المبني على القصة والصوت والتشطيب السينمائي' },
      { value: '4 صيغ', label: 'تسليم للسوشيال والعمودي والويب ونسخ الحملات الرئيسية' },
    ],
    showreelEyebrow: 'الأعمال المختارة',
    showreelTitle: 'أعمال مختارة صُممت لتوقف التمرير وترفع قيمة المشروع من أول ثانية.',
    showreelCopy:
      'من أفلام الإطلاق إلى الفيديوهات الموسيقية والوثائقيات الرقمية، كل مونتاج هنا مبني على جذب الانتباه، وصناعة الإحساس، وإنهاء بصري وصوتي يشعر العميل بقيمته فورًا.',
    showreelPoints: ['إيقاع فاخر', 'تلوين وصوت بمستوى احترافي', 'مونتاج يخدم الاحتفاظ بالمشاهد'],
    reelGridTitle: 'معاينات فيديو',
    portfolioEyebrow: 'المعرض',
    portfolioTitle: 'مشاريع صُممت لتجعل المنتج والشخص والقصة يبدون أكثر قيمة من أول لحظة.',
    portfolioCta: 'فتح المشروع',
    aboutEyebrow: 'نبذة',
    aboutTitle: 'أمنتج ليشعر الناس، ويتذكروا، ويتخذوا خطوة.',
    aboutBody: [
      'أفضل المونتاجات ليست فقط جميلة بصريًا، بل تجعل المشاهد يثق أكثر، ويتفاعل أسرع، ويشعر أن المشروع أمامه أعلى قيمة من المعتاد.',
      'لهذا أتعامل مع كل مشروع كتصميم سردي كامل. سواء كان إعلانًا فاخرًا أو فيديو موسيقيًا أو وثائقيًا رقميًا، فالهدف أن يبدو العمل قويًا، أنيقًا، ومغريًا للمشاهدة حتى النهاية.',
    ],
    skillsEyebrow: 'المهارات',
    skillsTitle: 'عدة ما بعد الإنتاج الاحترافية، لكن القرار دائمًا للذوق والاستراتيجية.',
    workflowEyebrow: 'آلية العمل',
    workflowTitle: 'خطوات واضحة وسريعة تحافظ على الجودة السينمائية من البداية للنهاية.',
    testimonialsEyebrow: 'آراء العملاء',
    testimonialsTitle: 'ما يقوله العملاء بعد نزول النسخة وظهور الأثر الحقيقي.',
    contactEyebrow: 'تواصل',
    contactTitle: 'هل تريد فيديو يبدو فاخرًا ويبيع الفكرة بسرعة؟',
    contactCopy:
      'أرسل فكرة المشروع، والجمهور المستهدف، والنتيجة التي تريد الوصول إليها، وسأبني لك معالجة تحريرية تجعل العمل أكثر جاذبية وقيمة وتأثيرًا.',
    form: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      project: 'نوع المشروع',
      message: 'النبذة',
      submit: 'ابدأ المحادثة',
      placeholders: {
        name: 'اسمك',
        email: 'you@example.com',
        project: 'تريلر، إعلان، وثائقي، سلسلة يوتيوب...',
        message: 'احكِ لي عن القصة، واللقطات، والنبرة، وأهداف التسليم.',
      },
      success:
        'وصلني طلبك. سأعود إليك برؤية إبداعية واضحة، وإيقاع مناسب، وخطة تنفيذ احترافية.',
    },
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
            <div className="hero-stats">
              {content.heroStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
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
    </main>
  )
}

export default App
