export const loadSidebarData = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/loadsidebar', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Si el token expiró o es inválido (403 o 401)
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token'); // Limpia token inválido
        window.location.href = '/login';  // Redirige al login
        return null;
      }

      throw new Error('No autorizado o sesión expirada');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error cargando sidebar:', error.message);
    return null;
  }
};
  