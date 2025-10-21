# 🔐 Módulo de Autenticación - Compensa tu Viaje

## Descripción General

Sistema completo de autenticación y autorización implementado para la aplicación Compensa tu Viaje. Incluye registro, login, recuperación de contraseña, rutas protegidas y gestión de sesiones.

## 📁 Estructura de Archivos

```
src/
├── context/
│   └── AuthContext.js          # Context API para estado global de autenticación
├── services/
│   └── authService.js          # Servicio para comunicación con API de auth
├── utils/
│   └── helpers.js              # Utilidades y validadores
├── components/
│   └── auth/
│       ├── Login.js            # Componente de inicio de sesión
│       ├── Login.css           # Estilos de login
│       ├── Register.js         # Componente de registro
│       ├── Register.css        # Estilos de registro
│       ├── ForgotPassword.js   # Recuperación de contraseña
│       ├── ForgotPassword.css  # Estilos de forgot password
│       ├── Dashboard.js        # Panel de usuario autenticado
│       ├── Dashboard.css       # Estilos de dashboard
│       ├── PrivateRoute.js     # HOC para rutas protegidas
│       └── PublicRoute.js      # HOC para rutas públicas
```

## 🚀 Características Implementadas

### AUTH-F-001: Login/Logout UI Components ✅

**Componentes creados:**
- ✅ `Login.js` - Formulario de inicio de sesión
- ✅ `Register.js` - Formulario de registro de usuarios
- ✅ `ForgotPassword.js` - Recuperación de contraseña
- ✅ `Dashboard.js` - Panel principal para usuarios autenticados

**Funcionalidades:**
- Validación de formularios en tiempo real
- Manejo de estados de carga
- Mensajes de error personalizados
- Toggle para mostrar/ocultar contraseña
- Diseño responsive
- Animaciones y transiciones suaves

### AUTH-F-002: Protected Routes y Auth Guards ✅

**Componentes creados:**
- ✅ `PrivateRoute.js` - Guard para rutas que requieren autenticación
- ✅ `PublicRoute.js` - Guard para rutas públicas (redirige si ya está autenticado)
- ✅ `AuthContext.js` - Context provider para gestión de estado de autenticación

**Funcionalidades:**
- Redirección automática según estado de autenticación
- Preservación de ruta original después del login
- Verificación de token en cada carga de página
- Logout automático si el token es inválido
- Loading states durante verificación

### AUTH-F-003: Error Handling y User Feedback ✅

**Funcionalidades implementadas:**
- ✅ Mensajes de error contextuales
- ✅ Validación de campos en tiempo real
- ✅ Indicadores de carga (spinners)
- ✅ Mensajes de éxito
- ✅ Feedback visual en botones
- ✅ Manejo de errores de API
- ✅ Estados de deshabilitado durante operaciones

## 🔧 Servicios y Utilidades

### AuthService (`authService.js`)

Servicio centralizado para todas las operaciones de autenticación:

**Métodos disponibles:**
```javascript
- login(email, password)           // Iniciar sesión
- register(userData)                // Registrar nuevo usuario
- logout()                          // Cerrar sesión
- getCurrentUser()                  // Obtener usuario actual
- getToken()                        // Obtener token de autenticación
- isAuthenticated()                 // Verificar si está autenticado
- verifyToken()                     // Verificar validez del token
- forgotPassword(email)             // Solicitar reset de contraseña
- resetPassword(token, password)    // Resetear contraseña
```

### AuthContext (`AuthContext.js`)

Context API para gestión de estado global:

**Estados:**
- `user` - Datos del usuario autenticado
- `loading` - Estado de carga
- `error` - Mensajes de error
- `isAuthenticated` - Boolean de autenticación

**Métodos:**
- `login(email, password)` - Wrapper del servicio
- `register(userData)` - Wrapper del servicio
- `logout()` - Wrapper del servicio
- `clearError()` - Limpiar errores
- `forgotPassword(email)` - Wrapper del servicio
- `resetPassword(token, password)` - Wrapper del servicio

### Helpers (`helpers.js`)

Utilidades y funciones auxiliares:

```javascript
- authFetch(url, options)      // Fetch con autenticación automática
- isValidEmail(email)           // Validar formato de email
- isValidPassword(password)     // Validar contraseña
- isValidName(name)             // Validar nombre
- formatApiError(error)         // Formatear errores de API
- debounce(func, wait)          // Debounce para optimización
- getInitials(first, last)      // Obtener iniciales de nombre
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Verde Principal:** `#22C55E` - Acciones positivas, botones primarios
- **Verde Oscuro:** `#16A34A` - Hover states
- **Rojo Error:** `#EF4444` - Mensajes de error
- **Verde Success:** `#D1FAE5` - Mensajes de éxito
- **Gris:** `#6B7280` - Texto secundario

### Componentes UI
- Formularios con diseño limpio y espaciado consistente
- Botones con estados hover, active y disabled
- Iconos SVG inline para mejor rendimiento
- Animaciones suaves en transiciones
- Loading spinners durante operaciones asíncronas

## 🔌 Integración

### App.js
```javascript
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Wrap app with AuthProvider
<Router>
  <AuthProvider>
    <App />
  </AuthProvider>
</Router>
```

### Rutas Protegidas
```javascript
import PrivateRoute from './components/auth/PrivateRoute';

<Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

### Rutas Públicas
```javascript
import PublicRoute from './components/auth/PublicRoute';

<Route 
  path="/login" 
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  } 
/>
```

### Usar Hook de Auth
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Usar métodos y estados
}
```

## 🔐 Seguridad

### Implementado:
- ✅ Tokens JWT almacenados en localStorage
- ✅ Verificación de token en cada request
- ✅ Logout automático si token inválido
- ✅ Headers de autorización en requests
- ✅ Validación de inputs en frontend
- ✅ Protección contra inyección XSS
- ✅ HTTPS ready (configuración de API)

### Pendiente (Backend):
- ⏳ Rate limiting en endpoints de auth
- ⏳ Hash de contraseñas con bcrypt
- ⏳ Refresh tokens
- ⏳ 2FA (autenticación de dos factores)
- ⏳ Política de expiración de tokens

## 📝 Variables de Entorno

Crear archivo `.env` en la raíz de `/client`:

```env
REACT_APP_API_URL=http://localhost:5000/api
NODE_ENV=development
```

## 🧪 Testing

### Casos de Prueba Manual:

**Login:**
1. ✅ Login exitoso con credenciales válidas
2. ✅ Error con credenciales inválidas
3. ✅ Validación de campos vacíos
4. ✅ Validación de formato de email
5. ✅ Redirección a dashboard después de login

**Register:**
1. ✅ Registro exitoso con datos válidos
2. ✅ Validación de contraseñas coincidentes
3. ✅ Validación de campos requeridos
4. ✅ Validación de formato de email
5. ✅ Checkbox de términos y condiciones

**Protected Routes:**
1. ✅ Acceso permitido si está autenticado
2. ✅ Redirección a login si no está autenticado
3. ✅ Preservación de ruta después de login
4. ✅ Logout funcional desde cualquier página

**Session Management:**
1. ✅ Persistencia de sesión en reload
2. ✅ Logout al cerrar sesión
3. ✅ Verificación de token en carga inicial

## 🐛 Troubleshooting

### Error: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### Error: "AuthContext is undefined"
Asegúrate de que tu App esté envuelto en `<AuthProvider>`

### Token no se envía en requests
Verifica que estés usando `authFetch` de `utils/helpers.js`

### Redirección infinita
Verifica que las rutas públicas y privadas estén bien configuradas

## 🚀 Próximos Pasos

1. Implementar backend de autenticación (endpoints faltantes)
2. Agregar refresh tokens
3. Implementar 2FA
4. Agregar OAuth (Google, Facebook)
5. Mejorar manejo de errores
6. Agregar tests unitarios
7. Implementar recordar sesión (remember me)

## 📚 Dependencias

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x"
}
```

## 👥 Responsables

- Frontend Development: Implementación completa ✅
- Backend Integration: Pendiente ⏳
- Testing: Pendiente ⏳

---

**Estado del Módulo:** ✅ COMPLETADO - Frontend
**Fecha de Implementación:** Octubre 2025
**Versión:** 1.0.0
