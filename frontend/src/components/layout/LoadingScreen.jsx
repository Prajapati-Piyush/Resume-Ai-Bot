import Logo from './Logo'

export default function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 bg-aurora px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="animate-float"><Logo to={null} /></div>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-400" />
        <p className="text-sm text-ink-400">{message}</p>
      </div>
    </div>
  )
}
