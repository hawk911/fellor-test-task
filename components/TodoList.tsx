import { CheckCircle, Clock, UserCheck } from "lucide-react"

const todos = [
  {
    title: "Job approval",
    description: "0 pending approvals",
    icon: CheckCircle,
    color: "purple",
  },
  {
    title: "Interview feedback",
    description: "0 pending feedback",
    icon: Clock,
    color: "orange",
  },
  {
    title: "Offer approval",
    description: "0 pending approvals",
    icon: UserCheck,
    color: "green",
  },
]

export function TodoList() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">To-Do List</h2>

      <div className="space-y-4">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  todo.color === "purple" ? "bg-purple-100" : todo.color === "orange" ? "bg-orange-100" : "bg-green-100"
                }`}
              >
                <todo.icon
                  className={`h-5 w-5 ${
                    todo.color === "purple"
                      ? "text-purple-600"
                      : todo.color === "orange"
                        ? "text-orange-600"
                        : "text-green-600"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{todo.title}</p>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
