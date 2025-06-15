const jobs = [
  {
    title: "Senior Frontend Developer",
    candidates: 32,
    pipeline: 8,
    daysOpen: 12,
    progress: 75,
  },
  {
    title: "Product Manager",
    candidates: 28,
    pipeline: 5,
    daysOpen: 8,
    progress: 50,
  },
]

export function TopActiveJobs() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Active Jobs</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
      </div>

      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{job.title}</h3>
              <span className="text-sm text-blue-600">{job.daysOpen} days open</span>
            </div>
            <p className="text-sm text-gray-600">
              {job.candidates} candidates • {job.pipeline} in pipeline
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${job.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{job.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
