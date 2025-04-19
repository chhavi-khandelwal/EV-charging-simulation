import { lazy, Suspense } from 'react';
import ChargePointForm from '../containers/ChargePointForm';
import { SimulationProvider } from '../context/SimulationContext';
import { Loader } from '../components/Loader';

const DashboardCharts = lazy(() => import('../containers/DashboardCharts'));

const Dashboard: React.FC = () => (
	<SimulationProvider>
		<main
			className='min-h-screen  p-6 flex flex-col items-center gap-6 bg-neutral-800
'
		>
			<h1 className='text-3xl font-bold text-white'>EV Charging Simulation</h1>
			<ChargePointForm />
			<Suspense fallback={<Loader />}>
				<DashboardCharts />
			</Suspense>
		</main>
	</SimulationProvider>
);

export default Dashboard;
