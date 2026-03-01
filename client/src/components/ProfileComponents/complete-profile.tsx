import { useNavigate } from "react-router-dom"
import { ClipboardList, ArrowRight } from "lucide-react"

export default function CompleteProfile() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-amber-500/20 overflow-hidden">
        <div className="p-8 md:p-10">
          {/* Icon */}
          <div className="w-14 h-14 border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mb-8">
            <ClipboardList className="w-6 h-6 text-amber-500" />
          </div>

          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Get Started</span>
          </div>

          <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100 mb-3">
            Complete Your Mentor Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Take a moment to set up your professional profile. This will help mentees find and connect with you more easily.
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs tracking-widest uppercase text-gray-400">Profile completion</span>
              <span className="text-xs text-amber-500 font-medium">25%</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-gray-800 h-1">
              <div className="bg-amber-500 h-1 w-1/4 transition-all duration-500" />
            </div>
          </div>

          <button
            onClick={() => navigate("/profile-completion")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-medium tracking-widest uppercase transition-colors duration-200 group"
          >
            Start Profile Setup
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="border-t border-amber-500/20 px-8 py-4 md:px-10 bg-amber-500/5">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Your profile helps you stand out and connect with potential mentees.
          </p>
        </div>
      </div>
    </div>
  )
}

