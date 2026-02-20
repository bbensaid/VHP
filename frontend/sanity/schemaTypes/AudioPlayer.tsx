interface AudioProps {
  value: {
    title?: string
    url?: string
    summary?: string
  }
}

export default function AudioPlayer({ value }: AudioProps) {
  // If no URL is provided, don't render anything
  if (!value?.url) return null

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <div className="mb-4">
        {value.title && <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>}
        {value.summary && <p className="mt-1 text-sm text-gray-600">{value.summary}</p>}
      </div>
      <audio controls className="w-full focus:outline-none">
        <source src={value.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}