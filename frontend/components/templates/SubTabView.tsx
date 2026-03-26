'use client'

/**
 * SubTabView — secondary tab nav that exactly matches HubPageTemplate's tab
 * button style, for use inside a HubPageTemplate tab content area.
 */

import { useState } from 'react'
import React from 'react'

export interface SubTab {
  id: string
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

interface SubTabViewProps {
  tabs: SubTab[]
  defaultTab?: string
}

export default function SubTabView({ tabs, defaultTab }: SubTabViewProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '')

  const activeTab = tabs.find(t => t.id === active) ?? tabs[0]

  return (
    <div>
      {/* Tab nav — identical button style to HubPageTemplate */}
      <nav
        className="flex flex-wrap justify-center items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 backdrop-blur-sm pt-2 gap-y-1"
        aria-label="Tool tabs"
      >
        {tabs.map(tab => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`
                relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold
                transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-2 mb-0
                ${isActive
                  ? 'bg-slate-100 border-black text-slate-900 z-10 -mb-px'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          )
        })}
      </nav>

      {/* Content area — connected to nav via border-t-0 */}
      <div className="border border-slate-200 border-t-0 rounded-b-xl bg-white p-6">
        {activeTab?.content}
      </div>
    </div>
  )
}
