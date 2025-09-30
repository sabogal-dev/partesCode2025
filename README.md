Sistema de Gestión de Partes

Aplicación web desarrollada en React que se conecta a Supabase para gestionar partes de monturas de gafas.
El sistema permite consultar, registrar y actualizar información de inventario de manera sencilla.

🚀 Funcionalidad
Buscar referencias: Consultar partes por código o referencia en la base de datos.
Actualizar cantidades: Sumar o restar unidades disponibles de una referencia.
Crear nuevas referencias: Registrar nuevas partes directamente desde la aplicación.

Toda la información se almacena en Supabase (PostgreSQL administrado en la nube).

🛠️ Tecnologías utilizadas
React 19
Vite
Chakra UI (componentes y diseño)
React Icons
Next Themes (gestión de temas)
Supabase JS (conexión al backend)
📦 Instalación

Clona el repositorio:

git clone https://github.com/usuario/repositorio-partes.git
cd repositorio-partes


Instala las dependencias:

npm install

Variables de entorno

Debes crear un archivo .env en la raíz del proyecto con la configuración de Supabase:

VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_api_key


⚠️ Nota: Las credenciales de Supabase no están incluidas en este repositorio por razones de seguridad.

▶️ Ejecución en modo desarrollo
npm run dev


Esto levantará un servidor local (generalmente en http://localhost:5173/).

🏗️ Generar build de producción
npm run build

✅ Linter y buenas prácticas

Para ejecutar el linter y verificar la calidad del código:

npm run lint

📄 Dependencias principales
react y react-dom: núcleo de la aplicación.
vite: bundler rápido para desarrollo y build.
@chakra-ui/react + @emotion/react: librería de UI y estilos.
react-icons: íconos para la interfaz.
next-themes: soporte de temas (dark/light).
@supabase/supabase-js: conexión con la base de datos.
🔐 Licencia

Este proyecto es de uso privado y exclusivo de la empresa propietaria.
Queda prohibida su copia, modificación o distribución sin autorización expresa.