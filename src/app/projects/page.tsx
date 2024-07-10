export default function Projects() {
  return (
    <div
      id="projects"
      className="min-h-screen bg-[#111110] text-white p-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold font-robotoMono mb-8">Projects</h2>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold">Project Title 1</h3>
          <p className="mt-2 text-gray-400">
            Brief description of the project. Highlight the technologies used
            and the purpose of the project.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold">Project Title 2</h3>
          <p className="mt-2 text-gray-400">
            Brief description of the project. Highlight the technologies used
            and the purpose of the project.
          </p>
        </div>
        {/* Add more project entries as needed */}
      </div>
    </div>
  );
}
