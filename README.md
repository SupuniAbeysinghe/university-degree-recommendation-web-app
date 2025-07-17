###Degree Recommendation Web Application###

This Degree Recommendation Web Application is a web-based system designed to assist
Advanced Level (A/L) students in identifying the university degree programs they are eligible to
apply for. The application fetches degree program data from a structured Google Sheet and

provides personalized recommendations based on user input. The system considers a student's Z-
score, subject stream and district to deliver accurate and relevant degree program suggestions.

Key Features
• Eligibility-Based Degree Identification
Allows users to discover university degree programs they are eligible for based on their Z-score,
subject stream and district.
• Z-Score Comparison Charts

Provides visual comparisons of Z-scores for different degree programs to aid informed decision-
making.

• Nearby District Opportunities
Highlights eligible programs available in nearby districts, broadening students' access to
opportunities.
• Responsive Design
The application is fully optimized for use on both desktop and mobile devices, offering an
intuitive and user-friendly interface.

Dataset
All necessary data including information about universities, districts, subject streams and degree
programs is stored in a structured Google Sheet. This sheet serves as the central data source for
the application.

Google sheet link : https://docs.google.com/spreadsheets/d/1ky_E-_eZ2_4IPxvxg1J6-Z7-
RUGqZbho5N230wP2tHQ/edit?usp=sharing

API Endpoints
• GET /api/degrees
Retrieves all available degree programs from the dataset.
• POST /api/recommend
Returns a list of recommended degree programs based on the user's input provided in the
request body.
Example request body:
{
"subjectStream": "Science",
"zScore": 1.5,
"district": "Colombo"
}
