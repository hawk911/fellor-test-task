import { Video, MapPin } from "lucide-react"

const interviews = [
  {
    time: "Today, 2:00 PM",
    candidate: "John Smith",
    position: "Senior Developer",
    type: "Video Interview",
    icon: Video,
  },
  {
    time: "Tomorrow, 10:00 AM",
    candidate: "Emily Brown",
    position: "UX Designer",
    type: "On-site Interview",
    icon: MapPin,
  },
  {
    time: "Tomorrow, 10:00 AM",
    candidate: "Emily Brown",
    position: "UX Designer",
    type: "On-site Interview",
    icon: MapPin,
  },
]

export function UpcomingInterviews() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
      </div>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div key={index} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <interview.icon className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{interview.time}</p>
              <p className="font-medium text-gray-900">
                {interview.candidate} - {interview.position}
              </p>
              <p className="text-sm text-gray-600">{interview.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
