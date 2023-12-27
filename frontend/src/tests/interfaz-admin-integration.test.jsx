import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import InterfazAdmin from './InterfazAdmin';

// Configurar el cliente de consulta para React Query
const queryClient = new QueryClient();

test('renderiza el componente InterfazAdmin con la sección "Home" por defecto', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/admin-user']}>
        <InterfazAdmin />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar equipos/i));

  // Verificar que el componente AdminHome se renderice inicialmente
  expect(screen.getByTestId('admin-home')).toBeInTheDocument();
});

test('Cambia de sección cuando se hace click en uno de los botones de navegación', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/admin-user']}>
        <InterfazAdmin />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar equipos/i));

  // Verificar que el componente AdminHome se renderice inicialmente
  expect(screen.getByTestId('admin-home')).toBeInTheDocument();

  // Hacer clic en el enlace "Gestionar notificaciones" y verificar que se cambie a la sección de notificaciones
  userEvent.click(screen.getByText(/Gestionar notificaciones/i));
  await waitFor(() => screen.getByTestId('admin-nots'));
  expect(screen.getByTestId('admin-nots')).toBeInTheDocument();
});