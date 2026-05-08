import Link from 'next/link'
import {
  CodeBracketIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  ArrowUpCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Setup | Health Transformation Review',
}

const PAGES = [
  { href: '/mission',    icon: HeartIcon,          label: 'Mission',    desc: 'Platform mission statement.',              color: 'text-rose-700',   bg: 'bg-rose-50',   border: 'border-rose-200',   hover: 'hover:border-rose-400'   },
  { href: '/values',     icon: BuildingLibraryIcon, label: 'Values',     desc: 'Core values and guiding principles.',      color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:border-violet-400' },
  { href: '/pricing',    icon: CurrencyDollarIcon,  label: 'Pricing',    desc: 'Subscription tiers and pricing.',          color: 'text-emerald-700',bg: 'bg-emerald-50',border: 'border-emerald-200',hover: 'hover:border-emerald-400'},
  { href: '/upgrade',    icon: ArrowUpCircleIcon,   label: 'Upgrade',    desc: 'Subscription upgrade flow.',               color: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200',  hover: 'hover:border-amber-400'  },
  { href: '/htr-index',  icon: ChartBarIcon,        label: 'HTR Index',  desc: 'Health Transformation Readiness Index.',   color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:border-indigo-400' },
  { href: '/developers', icon: CodeBracketIcon,     label: 'Developers', desc: 'Developer API documentation.',             color: 'text-slate-700',  bg: 'bg-slate-50',  border: 'border-slate-200',  hover: 'hover:border-slate-400'  },
]

export default function SetupPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded">Admin Only</span>
        <h1 className="text-3xl font-black text-slate-900 mt-4 mb-2">Setup</h1>
        <p className="text-slate-500 text-sm">Configuration and supporting pages.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {PAGES.map(({ href, icon: Icon, label, desc, color, bg, border, hover }) => (
          <Link key={href} href={href} className={`group flex items-start gap-4 p-5 rounded-2xl border-2 ${border} ${bg} ${hover} transition-all`}>
            <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className={`font-black text-base ${color} mb-0.5`}>{label}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
              <div className={`text-xs font-bold mt-2 ${color} opacity-70`}>{href} →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
