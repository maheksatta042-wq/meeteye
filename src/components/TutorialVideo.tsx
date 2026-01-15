import { Play, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'

export function TutorialVideo() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="
        w-full
        max-w-[520px]        /* ⬅️ MATCHES IMAGE WIDTH */
        rounded-3xl
        overflow-hidden
        bg-white
        shadow-2xl
      "
    >
      {/* TOP VIDEO PREVIEW */}
      <div
        className="
          h-[260px]           {/* ⬅️ MATCHES IMAGE HEIGHT */}
          flex
          flex-col
          items-center
          justify-center
          text-center
          bg-gradient-to-br
          from-blue-100
          via-cyan-100
          to-emerald-100
        "
      >
        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center shadow-xl mb-4">
          <Play className="w-9 h-9 text-white fill-white ml-1" />
        </div>

        <h4 className="text-base font-semibold text-slate-800">
          Getting Started with Tally Connector
        </h4>
        <p className="text-sm text-slate-500 mt-1">
          Duration: 5:32
        </p>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Welcome to Tally Connector Tutorial
        </h3>

        <p className="text-slate-600 leading-relaxed text-sm">
          Learn how to set up your account, configure tracking parameters, and
          start monitoring your assets in just a few minutes.
        </p>

        <a
          href="/tutorials"
          className="
            mt-4
            w-full
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-slate-900
            text-white
            text-sm
            font-semibold
            hover:bg-slate-800
            transition
          "
        >
          Watch Full Tutorial Series
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}