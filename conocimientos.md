# Conocimientos base — Modelos de datos, nodos, tareas, procesos resolutorios y subprocesos (Gestiona)

## Propósito del documento
Este documento consolida conocimiento funcional y de diseño de tramitación para que cualquier agente que cree, edite o rediseñe contenidos de **slides/presentaciones** en este repositorio mantenga precisión conceptual, coherencia operativa y lenguaje homogéneo.

> Regla operativa para agentes: ante cualquier solicitud de creación o modificación de presentaciones, revisar primero este archivo y utilizar explícitamente estos conceptos como base narrativa.

---

## 1) Tesauros — Modelo de datos (PPT 1)

### 1.1 Concepto clave
Los tesauros son **activos semánticos reutilizables** que encapsulan:
- datos,
- metadatos,
- y comportamiento.

No son “campos sueltos”. En la práctica, un tesauro representa una **entidad de datos tipada** y con impacto funcional.

#### Implicaciones funcionales
- Se define una vez y se reutiliza en múltiples puntos.
- Mantiene independencia respecto al procedimiento concreto.
- Se aplica en formularios, documentos y expedientes.
- Habilita búsqueda avanzada, analítica y automatización.

### 1.2 Tipologías y tipado fuerte
El sistema usa tipado estricto. El tipo no es estético: determina validaciones y comportamiento.

**Tipos básicos**
- Texto
- Número
- Fecha
- Moneda
- Porcentaje
- URL
- Check/booleano

**Tipos especializados con validación**
- NIF / NIE / CIF
- IBAN
- Referencia catastral
- Dirección postal
- IAE

#### Riesgo crítico
Una selección incorrecta del tipo puede romper lógica posterior del expediente (validaciones, automatismos, dependencias de flujo).

### 1.3 Niveles de configuración
**Nivel entidad (preferente)**
- Minimiza duplicidades.
- Favorece reutilización.
- Centraliza gobernanza del dato.

**Nivel actividad**
- Más rápido para salir del paso.
- Menor control y menor consistencia global.

#### Regla de oro
Si ya existe un campo/tesauro válido, **no recrearlo**: reutilizar.

### 1.4 Metodología de configuración
Pipeline recomendado:
1. Identificar variables de información.
2. Verificar si ya existen en repositorio global.
3. Definir tipología correcta.
4. Establecer agrupación funcional.
5. Asignar referencia (nombre técnico).
6. Clasificar.
7. Marcar obligatorio / asunto cuando proceda.

### 1.5 Campos obligatorios
Un campo es obligatorio cuando su ausencia compromete el sistema:
- activa lógica de tramitación,
- genera textos condicionales,
- define circuitos de resolución.

**Principio**: “obligatorio” equivale a “dependencia lógica real”, no preferencia editorial.

### 1.6 Clasificación vs agrupación
Son capas distintas:

**Clasificación (objetiva)**
- Basada en catálogo de procedimientos.
- Orden funcional global.
- Menor criticidad (editable).

**Agrupación (subjetiva/operativa)**
- Organiza datos relacionados dentro del expediente.
- Suele estructurarse con numeración (01, 02, …).
- Influye en lectura de formulario y UX.

### 1.7 Momento de captura
Define:
- cuándo se solicita un dato,
- y en qué fase se hace visible o exigible.

Impacta en:
- secuencia del expediente,
- experiencia de usuario,
- dependencias de lógica.

### 1.8 Estados de tramitación
Los estados son listas reutilizables:
- a nivel entidad (reutilización amplia),
- o a nivel actividad (uso puntual específico).

Aportan soporte a:
- búsqueda avanzada,
- automatizaciones,
- control del ciclo de vida.

---

## 2) Procesos — Modelo de ejecución (PPT 2)

### 2.1 Concepto base
La tramitación se ejecuta mediante tareas regladas.
Cada procedimiento se implementa como un flujo de tareas con transiciones.

### 2.2 Tipos de tareas y su semántica funcional
Cada tipo de tarea implica comportamiento propio:
- **Libre**: actuación sin estructura cerrada.
- **Formulario**: captura estructurada de datos.
- **Documento**: generación/gestión documental.
- **Circuito de resolución**: decisión formal administrativa.
- **Plazo**: temporización y control temporal.
- **Operación externa**: integración con sistemas terceros.
- **Aviso**: notificación o recordatorio.
- **Expediente derivado**: ramificación vinculada.
- **Subproceso**: encapsulación de lógica reutilizable.

### 2.3 Lógicas de salida (núcleo del flujo)
Cada tarea define transiciones de salida (qué ocurre después).
Ejemplos:
- Solicitud → resolución
- Requerimiento → subsanación
- Informe → archivo
- Denegación / concesión

Estas transiciones constituyen el comportamiento real del procedimiento.

### 2.4 Automatización
El sistema soporta:
- finalización automática de tareas,
- ejecución condicional,
- gestión automática de plazos.

Motores de disparo habituales:
- datos (tesauros),
- estados,
- eventos.

### 2.5 Subprocesos
Los subprocesos permiten:
- modularizar tramitaciones complejas,
- reutilizar bloques de lógica,
- reducir duplicidad de diseño.

Analogía práctica: un subproceso actúa como una función reutilizable dentro del flujo.

### 2.6 Circuitos de resolución
Pieza crítica en el plano jurídico-administrativo:
- formalizan decisiones,
- consolidan resultado final,
- fijan efectos sobre estado del expediente.

Resultados típicos:
- Concedido
- Denegado
- Caducidad

---

## 3) Guía editorial para presentaciones (cómo trasladar este conocimiento a slides)

### 3.1 Mensajes obligatorios que deben quedar claros
1. El dato está vivo: tipado + validación + impacto en lógica.
2. El flujo no es dibujo: es red de tareas con salidas y reglas.
3. Subprocesos y estados no son accesorios: son palancas de escalabilidad y automatización.
4. Los circuitos de resolución conectan técnica, procedimiento y seguridad jurídica.

### 3.2 Errores a evitar en contenidos formativos
- Tratar tesauros como campos planos sin comportamiento.
- Explicar tipologías sin consecuencias de negocio.
- Confundir clasificación con agrupación.
- Omitir condiciones de obligatoriedad.
- Dibujar tareas sin transiciones de salida.
- Presentar subprocesos como “pasos extra” en lugar de reutilización estructural.

### 3.3 Checklist previo a diseñar o editar slides
- ¿Se explicita tipado fuerte y validación?
- ¿Se distingue entidad vs actividad?
- ¿Se incluye criterio para campos obligatorios?
- ¿Se separa clasificación de agrupación?
- ¿Se visualizan lógicas de salida por tarea?
- ¿Se explica automatización basada en datos/estados/eventos?
- ¿Se sitúan subprocesos como módulo reutilizable?
- ¿Se conecta circuito de resolución con resultado jurídico?

---

## 4) Instrucción operativa para agentes de este repositorio
Cuando se solicite crear, ajustar o rediseñar presentaciones:
1. Revisar este archivo `conocimientos.md` al inicio.
2. Integrar estos conceptos en estructura, titulares y desarrollo.
3. Mantener coherencia con `AGENTS.md` y con `instrucciones para la incorporación de recursos gráficos.md`.
4. Si existe ambigüedad conceptual, priorizar la formulación de este documento como referencia base.

