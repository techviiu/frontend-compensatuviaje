const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const USE_MOCK = true; // Cambiar a false cuando el backend esté disponible

class AuthService {
  // Login de usuario
  async login(email, password) {
    // MODO MOCK - Sin backend
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: '123',
            email: email,
            firstName: 'Usuario',
            lastName: 'Demo',
            role: 'user'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          resolve({
            token: mockToken,
            user: mockUser,
            message: 'Login exitoso (modo demo)'
          });
        }, 500); // Simular delay de red
      });
    }

    // MODO REAL - Con backend
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      // Guardar token y datos del usuario
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Registro de usuario
  async register(userData) {
    // MODO MOCK - Sin backend
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: '123',
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'user'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          resolve({
            token: mockToken,
            user: mockUser,
            message: 'Registro exitoso (modo demo)'
          });
        }, 500);
      });
    }

    // MODO REAL - Con backend
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Guardar token y datos del usuario
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Obtener token
  getToken() {
    return localStorage.getItem('token');
  }

  // Verificar si está autenticado
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  // Verificar token con el backend
  async verifyToken() {
    // MODO MOCK - Sin backend
    if (USE_MOCK) {
      const token = this.getToken();
      const user = this.getCurrentUser();
      return !!(token && user); // Retorna true si hay token y usuario
    }

    // MODO REAL - Con backend
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // Recuperar contraseña
  async forgotPassword(email) {
    // MODO MOCK - Sin backend
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Se ha enviado un email con instrucciones (modo demo)',
            success: true
          });
        }, 500);
      });
    }

    // MODO REAL - Con backend
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar email');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Resetear contraseña
  async resetPassword(token, password) {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al resetear contraseña');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
