# 🏢 MÓDULO ONBOARDING - Documentación Completa

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Funcionalidades Implementadas](#funcionalidades-implementadas)
4. [Componentes Principales](#componentes-principales)
5. [Servicios y API](#servicios-y-api)
6. [Validaciones Chilenas](#validaciones-chilenas)
7. [Flujo de Usuario](#flujo-de-usuario)
8. [Rutas](#rutas)
9. [Cómo Usar](#cómo-usar)
10. [Próximos Pasos](#próximos-pasos)

---

## 📖 Descripción General

El módulo de **Onboarding Empresarial** permite a las empresas completar su proceso de registro y verificación en la plataforma Compensa tu Viaje. Incluye un wizard de registro multi-paso y un dashboard para seguimiento del estado.

### Características Principales:
- ✅ Wizard de 5 pasos con validación en tiempo real
- ✅ Validación de RUT chileno (Módulo 11)
- ✅ Formateo automático de RUT (ej: 12.345.678-9)
- ✅ Carga de documentos con validación (PDF, JPG, PNG - max 5MB)
- ✅ Dashboard de estado con timeline de progreso
- ✅ Información de contacto y asignación de gerente
- ✅ Datos específicos de Chile (regiones, industrias)
- ✅ Responsive design móvil/tablet/desktop

---

## 📁 Estructura de Archivos

```
client/src/
├── services/
│   └── onboarding/
│       └── onboardingService.js          # Servicio API onboarding
│
├── components/
│   └── onboarding/
│       ├── CompanyOnboardingWizard.js    # Wizard de registro (5 pasos)
│       ├── CompanyOnboardingWizard.css   # Estilos del wizard
│       ├── OnboardingStatus.js           # Dashboard de estado
│       └── OnboardingStatus.css          # Estilos del dashboard
│
└── App.js                                # Rutas actualizadas
```

---

## 🎯 Funcionalidades Implementadas

### ✅ ONBOARD-F-001: Wizard de Registro Empresarial

#### **Paso 1: Información de la Empresa**
- Nombre de la empresa (obligatorio)
- RUT (obligatorio, validación Módulo 11)
- Tipo de empresa (SpA, SRL, SA, etc.)
- Industria (Tecnología, Logística, Turismo, etc.)
- Número de empleados (rangos)

#### **Paso 2: Información de Contacto**
- Nombre del contacto (obligatorio)
- Cargo (obligatorio)
- Email corporativo (obligatorio, validación)
- Teléfono (obligatorio, formato chileno)
- Dirección (obligatorio)
- Región (16 regiones de Chile)
- Ciudad (obligatoria)

#### **Paso 3: Información Operacional**
- Rango de ingresos anuales
- Frecuencia de viajes corporativos
- Estimación de huella de CO₂ anual
- Objetivos de sostenibilidad (opcional)

#### **Paso 4: Carga de Documentos**
- Licencia Comercial (PDF/JPG/PNG, max 5MB)
- Certificado de RUT (PDF/JPG/PNG, max 5MB)
- Poder Notarial (PDF/JPG/PNG, max 5MB)
- Validación de tipo y tamaño de archivo

#### **Paso 5: Revisión y Confirmación**
- Resumen completo de todos los datos
- Botones "Editar" para volver a cualquier paso
- Confirmación final y envío

---

### ✅ ONBOARD-F-002: Dashboard de Estado

#### **Indicador de Progreso General**
- Barra de progreso visual (0-100%)
- Fecha de solicitud
- Última actualización
- Finalización estimada

#### **Timeline de Pasos**
1. **Registro Inicial** (Completado)
2. **Carga de Documentos** (Completado)
3. **Revisión de Documentos** (En Progreso)
4. **Aprobación Final** (Pendiente)
5. **Configuración de Cuenta** (Pendiente)

Cada paso muestra:
- ✅ Estado (completado/en progreso/pendiente/rechazado)
- 📅 Fecha de completado (si aplica)
- 👤 Revisor asignado
- 📝 Notas y comentarios

#### **Estado de Documentos**
Tabla con:
- Nombre del documento
- Estado (Aprobado/En Revisión/Rechazado/Pendiente)
- Fecha de carga
- Fecha de revisión
- Revisor
- Tamaño del archivo
- Notas adicionales

#### **Información de Contacto**
- Datos del contacto de la empresa
- Gerente asignado de Compensa tu Viaje
- Email y teléfono de soporte

---

## 🧩 Componentes Principales

### 1️⃣ `CompanyOnboardingWizard.js`

**Props:** Ninguno (lee de AuthContext)

**Estados principales:**
```javascript
- currentStep: número del paso actual (1-5)
- formData: objeto con todos los datos del formulario
- errors: objeto con errores de validación
- documents: array con archivos cargados
```

**Métodos clave:**
```javascript
- validateStep(): Valida el paso actual
- handleNext(): Avanza al siguiente paso
- handleBack(): Retrocede al paso anterior
- handleFileUpload(): Maneja carga de archivos
- handleSubmit(): Envía el formulario completo
```

**Validaciones:**
- RUT chileno (Módulo 11 + formateo)
- Email corporativo (formato válido)
- Teléfono chileno (+56 9 XXXX XXXX)
- Archivos (tipo PDF/JPG/PNG, max 5MB)
- Campos requeridos por paso

---

### 2️⃣ `OnboardingStatus.js`

**Props:** Ninguno (lee de onboardingService)

**Estados principales:**
```javascript
- status: objeto con estado completo del onboarding
- loading: booleano para spinner
- error: mensaje de error si falla la carga
```

**Datos mock incluidos:**
```javascript
- Progreso: 75%
- Paso actual: Revisión de Documentos
- 3 documentos (2 aprobados, 1 en revisión)
- Timeline de 5 pasos
- Información de contacto y gerente asignado
```

---

## 🔧 Servicios y API

### `onboardingService.js`

#### **Métodos disponibles:**

```javascript
// Crear nuevo onboarding
createCompanyOnboarding(companyData)
  → POST /api/onboarding
  → Returns: { onboardingId, status, message }

// Obtener estado del onboarding
getOnboardingStatus(onboardingId)
  → GET /api/onboarding/:id
  → Returns: { status, steps, documents, progress }

// Actualizar paso específico
updateOnboardingStep(onboardingId, stepData)
  → PUT /api/onboarding/:id/step
  → Returns: { success, updatedStep }

// Subir documento
uploadDocument(onboardingId, documentType, file)
  → POST /api/onboarding/:id/documents
  → FormData: { type, file }
  → Returns: { documentId, status, url }

// Obtener documentos
getDocuments(onboardingId)
  → GET /api/onboarding/:id/documents
  → Returns: [{ id, type, status, url }]

// Validar RUT (Módulo 11)
validateRUT(rut)
  → Local validation
  → Returns: boolean

// Formatear RUT (12.345.678-9)
formatRUT(rut)
  → Local formatting
  → Returns: string formatted
```

---

## 🇨🇱 Validaciones Chilenas

### **Validación de RUT (Módulo 11)**

Implementado según normativa chilena:

```javascript
// Algoritmo:
1. Limpiar RUT (solo números y K)
2. Separar cuerpo y dígito verificador
3. Multiplicar dígitos por serie 2,3,4,5,6,7 (repetir)
4. Sumar productos
5. Calcular módulo 11
6. Verificar dígito (11-módulo, 11→0, 10→K)

// Ejemplo válido: 12.345.678-9
```

**Función:** `onboardingService.validateRUT(rut)`

---

### **Formateo Automático de RUT**

```javascript
// Input: "123456789"
// Output: "12.345.678-9"

// Auto-formatea mientras el usuario escribe
// Agrega puntos cada 3 dígitos y guión antes del dígito verificador
```

**Función:** `onboardingService.formatRUT(rut)`

---

### **Regiones de Chile (16 regiones)**

```javascript
const regions = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta',
  'Atacama', 'Coquimbo', 'Valparaíso',
  'Metropolitana de Santiago', "O'Higgins", 'Maule',
  'Ñuble', 'Biobío', 'Araucanía',
  'Los Ríos', 'Los Lagos', 'Aysén',
  'Magallanes y Antártica Chilena'
]
```

---

### **Tipos de Empresa**

```javascript
const businessTypes = [
  'SpA (Sociedad por Acciones)',
  'SRL (Sociedad de Responsabilidad Limitada)',
  'SA (Sociedad Anónima)',
  'EIRL (Empresa Individual de Responsabilidad Limitada)',
  'Empresa Unipersonal'
]
```

---

## 🚀 Flujo de Usuario

### **Flujo Completo:**

```
1. Usuario inicia sesión
   ↓
2. Va al Dashboard
   ↓
3. Click en "Registrar Empresa" (Quick Actions)
   ↓
4. Wizard de Onboarding (5 pasos):
   - Paso 1: Datos de empresa
   - Paso 2: Contacto
   - Paso 3: Operaciones
   - Paso 4: Documentos
   - Paso 5: Revisión
   ↓
5. Envío del formulario
   ↓
6. Redirección a OnboardingStatus
   ↓
7. Ver progreso y estado de documentos
   ↓
8. Esperar revisión y aprobación
   ↓
9. Cuenta empresarial activada
```

---

## 🛣️ Rutas

### **Rutas Privadas** (requieren autenticación):

```javascript
// Wizard de registro
/onboarding/wizard
  → Componente: CompanyOnboardingWizard
  → Protected: ✅ (PrivateRoute)

// Dashboard de estado
/onboarding/status
  → Componente: OnboardingStatus
  → Protected: ✅ (PrivateRoute)
```

### **Navegación:**

```javascript
// Desde Dashboard
<Link to="/onboarding/wizard">Registrar Empresa</Link>
<Link to="/onboarding/status">Estado Onboarding</Link>

// Desde OnboardingStatus
<Link to="/dashboard">Volver al Dashboard</Link>

// Desde CompanyOnboardingWizard (al completar)
navigate('/onboarding/status')
```

---

## 📚 Cómo Usar

### **1. Iniciar el servidor de desarrollo:**

```bash
cd client
npm start
```

### **2. Navegar al wizard:**

1. Ingresar con usuario autenticado
2. Ir al Dashboard
3. Click en "Registrar Empresa"

### **3. Completar el wizard:**

- **Paso 1:** Llenar datos de la empresa con RUT válido
- **Paso 2:** Ingresar información de contacto
- **Paso 3:** Completar datos operacionales
- **Paso 4:** Subir documentos (PDF/JPG/PNG, max 5MB cada uno)
- **Paso 5:** Revisar y confirmar

### **4. Ver estado:**

1. Desde Dashboard, click en "Estado Onboarding"
2. O navegar directamente a `/onboarding/status`
3. Ver progreso, documentos y timeline

---

## 🔄 Próximos Pasos

### **Integración con Backend:**

```javascript
// TODO: Conectar onboardingService con API real
// Actualmente usa datos mock

// Endpoints necesarios:
POST   /api/onboarding              # Crear onboarding
GET    /api/onboarding/:id          # Obtener estado
PUT    /api/onboarding/:id/step     # Actualizar paso
POST   /api/onboarding/:id/documents # Subir documento
GET    /api/onboarding/:id/documents # Listar documentos
```

### **Mejoras Futuras:**

- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Historial de cambios y auditoría
- [ ] Chat con el gerente asignado
- [ ] Descarga de certificados de onboarding
- [ ] Firma digital de documentos
- [ ] Multi-idioma (inglés/español)
- [ ] Temas claro/oscuro

### **Validaciones Adicionales:**

- [ ] Verificación de RUT con SII (Servicio de Impuestos Internos)
- [ ] Validación de dirección con Google Maps API
- [ ] OCR para extracción automática de datos de documentos
- [ ] Verificación de duplicados (RUT ya registrado)

---

## 📞 Soporte

Para dudas o problemas:
- **Email:** soporte@compensatuviaje.cl
- **Teléfono:** +56 9 8765 4321
- **GitHub Issues:** [Link al repositorio]

---

## 📝 Notas Técnicas

### **Dependencias:**
- React 18.3.1
- React Router DOM 6.30.1
- AuthContext (Context API)
- onboardingService (API layer)

### **Compatibilidad:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### **Accesibilidad:**
- ✅ Teclado navigation (Tab, Enter)
- ✅ Labels semánticos
- ✅ ARIA attributes
- ✅ Contraste de colores WCAG AA

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025  
**Autor:** Equipo Compensa tu Viaje
