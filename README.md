# binary_search_tree

Monorepo for the Binary Search Tree (BST) assignment — **React (Vite) frontend + Spring Boot backend**.

## Stack
- **Backend:** Java 21, Spring Boot (Web, JPA, H2), Gradle
- **Frontend:** React + Vite
- **Dev Tools:** Node 18+, npm, Git

## Project Structure
```
search_tree_app/
  backend/          # Spring Boot API
  frontend/         # React app (Vite)
  README.md
```
> Code comments are intentionally simple and only describe code behavior.

---

## Quick Start (Dev)

### 1) Backend
```powershell
cd backend
.\gradlew bootRun
```
Health check:
```powershell
Invoke-RestMethod http://localhost:8080/ping
```
Stop with **Ctrl+C** (and `.\gradlew --stop` if needed).

### 2) Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the printed URL (usually `http://localhost:5173`).

---

## API

### `POST /process-numbers`
- **Body:** `{"numbers":"7,3,9,1,5"}` (commas and/or spaces are OK)
- **Action:** Parses input → builds a BST **in insertion order** → serializes to JSON → saves to H2 → returns the saved record.
- **Response (example):**
```json
{
  "id": 1,
  "numbersInput": "7,3,9,1,5",
  "treeJson": "{"value":7,"left":{"value":3,"left":{"value":1},"right":{"value":5}},"right":{"value":9}}",
  "createdAt": "2025-08-16T00:28:41.348660Z"
}
```

### `GET /previous-trees`
- **Action:** Returns all saved records (latest first).

### CORS (dev)
- Allowed origins: `http://localhost:5173`, `http://127.0.0.1:5173`

---

## Frontend Notes
- `.env` in `frontend/`:
  ```env
  VITE_API_BASE=http://localhost:8080
  ```
- **Pages:**
  - `/enter-numbers` – form to send input, shows JSON result **and** a simple tree.
  - `/previous` – shows saved records with formatted timestamps and the tree.

- **Tree Visualization:** a very simple **indented preorder** outline. Indentation encodes depth; it’s fast to read and works well in plain text.

---

## Tests
Run backend tests:
```powershell
cd backend
.\gradlew clean test
```
Expected: **BUILD SUCCESSFUL**.

---

## Troubleshooting

**PowerShell vs curl**  
PowerShell aliases `curl` to `Invoke-WebRequest`. Prefer `Invoke-RestMethod`:
```powershell
# POST
$json = '{"numbers":"7,3,9,1,5"}'
Invoke-RestMethod -Uri http://localhost:8080/process-numbers -Method POST -ContentType 'application/json' -Body $json

# GET
Invoke-RestMethod http://localhost:8080/previous-trees
```
Or force real cURL by calling `curl.exe`.

**Port busy (8080)**  
```powershell
netstat -ano | findstr :8080
taskkill /PID <pid> /F
```

**Gradle toolchain (Java)**  
If Gradle complains about the JDK, ensure **JDK 21** is configured for the project/toolchain.

---

## Git (student flow recap)
At the start of each step:
```powershell
git fetch origin
git checkout main
git pull
git checkout -b <short-branch-name>
```
Keep commit messages simple, e.g.:
- `backend: bst insert`
- `ui: dark theme`
- `fix: ignore gradle/build`

Open a PR to `main`, merge, then:
```powershell
git checkout main
git pull
git branch -d <branch>
```
