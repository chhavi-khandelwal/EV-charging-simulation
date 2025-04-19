import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Represents a single chargepoint type configuration
export type ChargepointConfig = {
	count: number;
	power: number; // in kW
	id: string;
};

// Input provided by the user
export type SimulationInput = {
	arrivalMultiplier: number; // percentage, default 100
	consumptionPerKm: number; // in kWh/km, default 0.18
	chargePoints: ChargepointConfig[];
	aggregation: AggregationLevel;
	selectedDate: string;
};

// Charging session entry
export type ChargingEvent = {
	timestamp: number;
	energy: number; // in kWh
	power: number; // in kW
	chargepointId: string;
};

// Daily or monthly view toggle
export type AggregationLevel = 'day' | 'month' | 'year';

interface SimulationContextType {
	settings: SimulationInput;
	events: ChargingEvent[];
	setSettings: (settings: SimulationInput) => void;
	setEvents: (events: ChargingEvent[]) => void;
	loading: boolean;
	setFormSubmitted: (val: boolean) => void;
}

const defaultSettings: SimulationInput = {
	arrivalMultiplier: 100,
	consumptionPerKm: 0.18,
	chargePoints: [{ count: 5, power: 11, id: uuidv4() }],
	aggregation: 'day',
	selectedDate: new Date().toISOString().split('T')[0],
};

const SimulationContext = createContext<SimulationContextType | undefined>(
	undefined
);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [settings, setSettings] = useState<SimulationInput>(defaultSettings);
	const [events, setEvents] = useState<ChargingEvent[]>([]);
	const [loading, setLoading] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	useEffect(() => {
		//Here data from API must be set to plot the charts
		// setEvents(data);
		if (!formSubmitted) {
			return;
		}
		const apiCall = async () => {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 2000);
			});
		};
		setLoading(true);

		apiCall().finally(() => setLoading(false));
	}, [settings, formSubmitted]);

	return (
		<SimulationContext.Provider
			value={{
				settings,
				events,
				setSettings,
				setEvents,
				loading,
				setFormSubmitted,
			}}
		>
			{children}
		</SimulationContext.Provider>
	);
};

export const useSimulation = (): SimulationContextType => {
	const context = useContext(SimulationContext);
	if (!context) {
		throw new Error('useSimulation must be used within a SimulationProvider');
	}
	return context;
};
