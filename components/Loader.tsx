// components/Loader.tsx
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent" />
    </div>
  )
}
