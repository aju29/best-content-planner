const HOOK_CATEGORIES = [
  {
    emoji: '🚨',
    label: 'Mistake Hooks',
    desc: 'Very powerful — call out the error',
    color: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
    hooks: [
      'Stop saying this wrong! ❌',
      '90% Nepali say this wrong!',
      "You're making this mistake every day!",
      'This English sentence is WRONG!',
      "Don't say this in English!",
      'Big mistake Nepali students make!',
      'This sounds correct… but it\'s not!',
      'If you say this, people will laugh 😅',
      'Common English mistake!',
      'You learned this wrong!',
    ],
  },
  {
    emoji: '⚡',
    label: 'Upgrade Hooks',
    desc: 'Before → after transformation',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    hooks: [
      'Don\'t say this ❌ say this instead ✅',
      'Say this to sound smart 😎',
      'Upgrade your English in 10 seconds!',
      'Instead of this… use this!',
      'Speak better English instantly!',
      'Replace this word today!',
      'Make your English sound natural',
      'Simple change, big difference!',
      'Sound like a pro with this',
      'From basic to advanced in 5 seconds',
    ],
  },
  {
    emoji: '🇳🇵',
    label: 'Relatable Nepali Hooks',
    desc: 'Local language = instant connection',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    hooks: [
      'Nepali ma yesari vanchhau… but English ma wrong!',
      'Nepali bata direct translate garda mistake huncha!',
      'Yo mistake almost sabai Nepali le garchan!',
      '+2 padhne haru, yo dhyan deu!',
      'Interview ma yo nabhannu!',
      'Abroad jana lai yo English chaincha!',
      'School ma yo sikayena!',
      'Yo kura teacher le pani clear gardainan!',
      'Real life English sikna parcha!',
      'Book ma yo hudaina!',
    ],
  },
  {
    emoji: '🎯',
    label: 'Situation Hooks',
    desc: 'Real-life context makes it stick',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    hooks: [
      'Phone ma yesari nabhannu!',
      'Interview ma yesari bolnu!',
      'Restaurant ma English kasari bolne?',
      'Office ma use garne English',
      'Girlfriend/boyfriend sanga English 😄',
      'Boss sanga bolne English',
      'Travel garda use garne English',
      'Friend sanga natural English',
      'Customer sanga kasari bolne?',
      'Teacher lai English ma kasari sodhne?',
    ],
  },
  {
    emoji: '🧠',
    label: 'Curiosity Hooks',
    desc: 'Create the "need to know" feeling',
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    hooks: [
      "You've been saying this wrong your whole life!",
      'This one word will change your English!',
      'Nobody tells you this!',
      'This is why your English sounds awkward!',
      'Small mistake, big problem!',
      'This trick will fix your English!',
      "You won't believe this!",
      'This sounds weird to native speakers!',
      'One sentence you must learn today!',
      'Learn this and thank me later!',
    ],
  },
]

const THEME_CATEGORIES = [
  {
    emoji: '💘',
    label: 'Relationship (GF/BF)',
    desc: 'Highly Viral',
    themes: [
      "GF testing BF's English 😏",
      'BF trying to impress GF in English 😂',
      'GF angry → BF apologizing in English 😬',
      '"Do you really love me?" in English ❤️',
      'Jealous GF conversation in English 😤',
      'Breakup line in English 💔',
      'Patch-up conversation in English 🥺',
      'Flirting in broken vs smart English 😉',
      'Late reply excuse in English 📱',
      '"Who is she?" moment in English 😳',
    ],
  },
  {
    emoji: '😂',
    label: 'Friends & Daily Life',
    desc: 'Highly relatable',
    themes: [
      'Friend asking for money in English 💸',
      'Group chat English vs real life 😂',
      'Best friend roasting in English 🔥',
      'Making plans in English (plan cancel twist) 😆',
      'Asking for notes in English 📚',
      'Awkward silence → start convo in English 😅',
      'Gossip in English 🤫',
      'Lying to friend in English 😬',
      'Borrowing charger drama 🔌',
      '"I\'m outside" vs reality 😂',
    ],
  },
  {
    emoji: '🏫',
    label: 'Student Life',
    desc: 'Very relatable for target audience',
    themes: [
      'Teacher calling suddenly → English panic 😨',
      'Viva/Oral exam डर in English 🎤',
      'Homework not done excuse 😭',
      'Attendance shortage explanation 😅',
      'English presentation struggle 📊',
      'Backbencher answering in English 😂',
      'Crush in class → talking in English 😍',
      'Group project fight in English 😤',
      'Asking for extra marks 😏',
      'First day introduction 😬',
    ],
  },
  {
    emoji: '🧠',
    label: 'Smart vs Basic English',
    desc: 'Quick upgrade format',
    themes: [
      '"I love you" → 3 better ways ❤️',
      '"I\'m tired" → smarter ways 😴',
      '"Sorry" → different situations 🙏',
      '"Thank you" → upgrade your English 😎',
      '"No" → polite vs rude ❌',
      '"I don\'t understand" → better ways 🤔',
      '"Wait" → natural English ⏳',
      '"Come fast" → correct way 😂',
      '"What?" → polite version 😅',
      '"Okay" → 5 stylish replies 😎',
    ],
  },
  {
    emoji: '🌍',
    label: 'Real-Life Situations',
    desc: 'Practical, shareable content',
    themes: [
      'Ordering food in English 🍔',
      'Talking to customer/client 😎',
      'Phone call in English 📞',
      'Asking for directions 🗺️',
      'Job interview basic answers 💼',
      'Talking to foreigner 😳',
      'Hotel/restaurant conversation 🏨',
      'Shopping bargain in English 🛍️',
      'Airport/travel English ✈️',
      'Talking to boss politely 😬',
    ],
  },
]

const HOOK_MATCH = [
  { content: 'Mistake video', hook: 'Stop saying this wrong!' },
  { content: 'Vocabulary upgrade', hook: 'Upgrade this word' },
  { content: 'Situational video', hook: 'Interview ma yesari bolnu' },
]

export default function ResourcesPage() {
  return (
    <main className="text-gray-900 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resource Bank</h1>
          <p className="text-gray-500 mt-1">EnglishGyan — viral hooks & content themes for TikTok</p>
        </div>

        {/* Pro tip banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-4">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-bold text-amber-800 mb-1">Pro Strategy</p>
            <p className="text-amber-700 text-sm">When a hook style goes viral (e.g. <span className="font-semibold">"90% Nepali say this wrong"</span>), reuse it for 10+ more videos. That's how you scale content.</p>
          </div>
        </div>

        {/* Section 1 — Hook Bank */}
        <h2 className="text-xl font-bold mb-4">🎣 Viral Hook Bank <span className="text-gray-400 font-normal text-base ml-1">(50 hooks)</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {HOOK_CATEGORIES.map((cat) => (
            <div key={cat.label} className={`rounded-2xl border p-5 ${cat.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <span className="font-bold text-gray-900">{cat.label}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${cat.badge}`}>{cat.desc}</span>
                </div>
              </div>
              <ol className="space-y-1.5">
                {cat.hooks.map((hook, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                    <span>{hook}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Hook match guide */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-10">
          <p className="font-bold text-indigo-800 mb-3">💡 Match Hook to Content</p>
          <div className="space-y-2">
            {HOOK_MATCH.map((m) => (
              <div key={m.content} className="flex items-center gap-3 text-sm">
                <span className="text-indigo-600 font-medium w-44 flex-shrink-0">{m.content}</span>
                <span className="text-gray-400">→</span>
                <span className="text-gray-700 italic">"{m.hook}"</span>
              </div>
            ))}
          </div>
          <p className="text-indigo-700 text-xs mt-3 font-medium">Always: speak hook with energy · big subtitle text · keep it under 3 seconds</p>
        </div>

        {/* Section 2 — Content Themes */}
        <h2 className="text-xl font-bold mb-4">🎬 Content Themes <span className="text-gray-400 font-normal text-base ml-1">(50 ideas)</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {THEME_CATEGORIES.map((cat) => (
            <div key={cat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <span className="font-bold text-gray-900">{cat.label}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{cat.desc}</span>
                </div>
              </div>
              <ol className="space-y-1.5">
                {cat.themes.map((theme, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
