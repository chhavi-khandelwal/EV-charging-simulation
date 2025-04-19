import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimulationProvider } from '../src/context/SimulationContext';
import ChargePointForm from '../src/containers/ChargePointForm';
import '@testing-library/jest-dom';

const renderForm = () => {
	render(
		<SimulationProvider>
			<ChargePointForm />
		</SimulationProvider>
	);
};

describe('ChargePointForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders inputs and chargepoint fields', () => {
		renderForm();

		expect(
			screen.getByLabelText(/Arrival Probability Multiplier/i)
		).toBeInTheDocument();
		expect(screen.getByLabelText(/Car Consumption/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Power/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Count/i)).toBeInTheDocument();
	});

	it('adds a new chargepoint on clicking add button', async () => {
		renderForm();
		const addButton = screen.getByLabelText(/Add Charging Point/i);
		await userEvent.click(addButton);

		const powerInputs = screen.getAllByLabelText(/Power/i);
		expect(powerInputs.length).toBe(2); // One existing, one added
	});

	it('removes a chargepoint on clicking remove', async () => {
		renderForm();
		const addButton = screen.getByLabelText(/Add Charging Point/i);
		await userEvent.click(addButton);

		const removeButtons = screen.getAllByLabelText(/Remove Charging Point/i);
		await userEvent.click(removeButtons[0]);

		const powerInputs = screen.getAllByLabelText(/Power/i);
		expect(powerInputs.length).toBe(1);
	});

	it('submits the form', async () => {
		renderForm();
		const submitButton = screen.getByRole('button', {
			name: /Run Simulation/i,
		});

		await userEvent.click(submitButton);

		// Since this is context based, you might want to assert if form submission sets loading or not
		expect(submitButton).toBeDisabled();
	});
});
