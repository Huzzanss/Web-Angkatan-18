# API Documentation - Website Angkatan 18

## Base URL
```
http://localhost:5000
```

## Authentication
Currently using simple token-based authentication. JWT implementation coming soon.

---

## Endpoints

### Students API

#### GET /api/students
Get all students with optional filters.

**Query Parameters:**
- `gender` (string): Filter by gender - "male" or "female"
- `class` (string): Filter by class - "7A", "7B", "7C", or "7D"

**Example:**
```bash
curl http://localhost:5000/api/students
curl http://localhost:5000/api/students?gender=male
curl http://localhost:5000/api/students?class=7A
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 79,
    "male": 37,
    "female": 42,
    "students": [...],
    "count": 79
  },
  "timestamp": "2026-09-05T10:00:00Z"
}
```

#### GET /api/students/:id
Get a specific student by ID.

#### GET /api/students/stats/overview
Get student statistics.

---

### Admin API

#### POST /api/admin/login
Authenticate admin user.

**Request Body:**
```json
{
  "id": "admin",
  "password": "Angkatan18!"
}
```

#### GET /api/admin/dashboard
Get admin dashboard data (requires auth token).

#### POST /api/admin/change-password
Change admin password.

---

### Gallery API

#### GET /api/gallery
Get all gallery items.

#### GET /api/gallery/:id
Get specific gallery item.

#### POST /api/gallery
Add new gallery item (admin only).

#### DELETE /api/gallery/:id
Delete gallery item (admin only).

---

### Announcements API

#### GET /api/announcements
Get all announcements with sorting options.

#### GET /api/announcements/:id
Get specific announcement.

#### POST /api/announcements
Create new announcement (admin only).

#### DELETE /api/announcements/:id
Delete announcement (admin only).

---

## Error Responses

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

### Common Error Codes
- **400** - Bad Request (missing or invalid parameters)
- **401** - Unauthorized (invalid credentials)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error