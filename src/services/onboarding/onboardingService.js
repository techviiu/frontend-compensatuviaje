const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class OnboardingService {
  // Crear solicitud de onboarding empresarial
  async createCompanyOnboarding(data) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/onboarding/company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al crear onboarding');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Obtener estado del onboarding
  async getOnboardingStatus(companyId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/onboarding/company/${companyId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener estado');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar paso del onboarding
  async updateOnboardingStep(companyId, step, data) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/onboarding/company/${companyId}/step/${step}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar paso');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Subir documento
  async uploadDocument(companyId, documentType, file) {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', documentType);

      const response = await fetch(`${API_URL}/onboarding/company/${companyId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al subir documento');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Obtener documentos subidos
  async getDocuments(companyId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/onboarding/company/${companyId}/documents`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener documentos');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Validar RUT chileno
  validateRUT(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    
    if (rut.length < 2) return false;

    const rutBody = rut.slice(0, -1);
    const rutVerifier = rut.slice(-1).toUpperCase();

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = rutBody.length - 1; i >= 0; i--) {
      sum += parseInt(rutBody[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedVerifier = 11 - (sum % 11);
    let expectedVerifier;

    if (calculatedVerifier === 11) {
      expectedVerifier = '0';
    } else if (calculatedVerifier === 10) {
      expectedVerifier = 'K';
    } else {
      expectedVerifier = calculatedVerifier.toString();
    }

    return rutVerifier === expectedVerifier;
  }

  // Formatear RUT
  formatRUT(rut) {
    // Eliminar todo excepto números y K
    rut = rut.replace(/[^0-9kK]/g, '');
    
    if (rut.length === 0) return '';

    // Separar cuerpo y dígito verificador
    const rutBody = rut.slice(0, -1);
    const rutVerifier = rut.slice(-1);

    // Formatear con puntos
    let formattedBody = '';
    let counter = 0;

    for (let i = rutBody.length - 1; i >= 0; i--) {
      formattedBody = rutBody[i] + formattedBody;
      counter++;
      if (counter === 3 && i !== 0) {
        formattedBody = '.' + formattedBody;
        counter = 0;
      }
    }

    return `${formattedBody}-${rutVerifier}`;
  }
}

const onboardingService = new OnboardingService();
export default onboardingService;
