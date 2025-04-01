# Challenge Fullstack - Gestión de Tareas

## Tecnologías Utilizadas
- **Frontend**: Angular 17 con Angular Material
- **Backend**: .NET 8 Web API
- **Base de datos**: SQL Server (LocalDB para desarrollo)
- **Hosting**: Firebase Hosting (Frontend)

## Decisiones de Diseño
1. **Arquitectura**:
   - Frontend con componentes standalone
   - Backend con patrón Repository
2. **Autenticación**: Simple por email (sin passwords para el challenge)
3. **Estado**: Gestión reactiva con servicios Angular

## Configuración del Entorno

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Backend
```bash
cd backend
dotnet restore
dotnet run
```
