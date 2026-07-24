import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'

/** Last line of defence — keeps a render crash from blanking the whole app. */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center bg-ink-950 bg-aurora px-6">
        <div className="max-w-md rounded-2xl glass p-8 text-center">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-rose-400/25 bg-rose-500/10 text-rose-400">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <h1 className="text-lg font-semibold text-white">Something broke</h1>
          <p className="mt-2 text-sm text-ink-400">
            An unexpected error stopped this page from rendering. Reloading usually clears it.
          </p>
          <Button className="mt-6" onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      </div>
    )
  }
}
