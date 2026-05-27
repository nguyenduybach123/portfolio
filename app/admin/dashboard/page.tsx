import { LearningActivityChart, ScoreActivityChart, StatisticsCards } from './_components'

const DashboardPage = () => {
  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl space-y-6 px-6 py-8'>
        {/* Statistics Cards */}
        <StatisticsCards />

        {/* Charts Section */}
        <LearningActivityChart />

        {/* Score Activity Chart */}
        <ScoreActivityChart />
      </div>
    </main>
  )
}

export default DashboardPage
