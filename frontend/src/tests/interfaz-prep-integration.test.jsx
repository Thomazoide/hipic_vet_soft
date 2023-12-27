import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import InterfazPrep from './InterfazPrep';

// Configurar el cliente de consulta para React Query
const queryClient = new QueryClient();

test('renderiza el componente InterfazPrep con la sección "home" por defecto', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/prep-user']}>
        <InterfazPrep />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar veterinarios/i));

  // Verificar que el componente PrepHome se renderice inicialmente
  expect(screen.getByTestId('prep-home')).toBeInTheDocument();
});

test('Cambia de sección cuando se hace click en uno de los botones de navegación', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/prep-user']}>
        <InterfazPrep />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Esperar a que se complete la carga de datos 
  await waitFor(() => screen.getByText(/Gestionar veterinarios/i));

  // Verificar que el componente PrepHome se renderice inicialmente
  expect(screen.getByTestId('prep-home')).toBeInTheDocument();

  // Hacer clic en el enlace "Gestionar caballos" y verificar que se cambie a la sección de caballos
  userEvent.click(screen.getByText(/Gestionar caballos/i));
  await waitFor(() => screen.getByTestId('prep-horses'));
  expect(screen.getByTestId('prep-horses')).toBeInTheDocument();
});