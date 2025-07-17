# Degree Recommendation Backend

This is the backend for the University Degree Recommendation Web Application. It fetches degree program data from a Google Sheet and provides endpoints for recommendations based on student input.

## API Endpoints

- `GET /api/degrees` — Returns all degree programs from the sheet.
- `POST /api/recommend` — Returns recommended degrees based on JSON body:
  ```json
  {
    "subjectStream": "Arts",
    "zScore": 1.5,
    "district": "Colombo"
  }
  ```
