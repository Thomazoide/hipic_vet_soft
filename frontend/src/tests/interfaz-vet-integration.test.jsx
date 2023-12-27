import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import InterfazVet from './InterfazVet';

// Configurar el cliente de consulta para React Query
const queryClient = new QueryClient();

test('renderiza el componente InterfazVet con la sección "vetHome" por defecto', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/vet-user']}>
        <InterfazVet />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar fichas/i));

  // Verificar que el componente VetHome se renderice inicialmente
  expect(screen.getByTestId('vet-home')).toBeInTheDocument();
});

test('cambia de sección cuando se hace click en uno de los botones de navegación', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/vet-user']}>
        <InterfazVet />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar fichas/i));

  // Verificar que el componente VetHome se renderice inicialmente
  expect(screen.getByTestId('vet-home')).toBeInTheDocument();

  // Hacer clic en el enlace "Ver notificaciones" y verificar que se cambie a la sección de notificaciones
  userEvent.click(screen.getByText(/Ver notificaciones/i));
  await waitFor(() => screen.getByTestId('ver-nots'));
  expect(screen.getByTestId('ver-nots')).toBeInTheDocument();
});